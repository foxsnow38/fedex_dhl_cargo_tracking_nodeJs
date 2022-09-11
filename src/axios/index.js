
import { error } from "delivery-tracker"
import fetch from "node-fetch"
import delay from "../utils/delay.js"

const getAuth = (clientID,secretID) =>{ // AUTH FOR FEDEX


    const config={  // config for api
        method:"post",
      
        headers: // learn api pattern with header
        {
            "Content-Type":'application/x-www-form-urlencoded',
           
        },
        body:new URLSearchParams(  {
            'grant_type':'client_credentials',
            'client_id':`${clientID}`,
            'client_secret':`${secretID}`
        }   )
    }

    
    
  return  fetch(`https://apis-sandbox.fedex.com/oauth/token`,config) // post to data with fetch
  .then(response => response.json()) // response data convert to object to js lang
  .then(res => res['access_token'])  // than take it inside to acsees toekn object
}


const getTrackingData = async  (trackingNumberArray,authWithBearer,brand=(`fedex`||`dhl`)) =>{

    let array = []
    let result =[]
    if (brand == `fedex`)
    {
        
 await   trackingNumberArray.forEach(item => { // for eacy array object
    array.push( // pushing ti this object [[{}],[{}]]
        {
            "shipDateBegin": null,
            "shipDateEnd": null,
            "trackingNumberInfo": {
                "trackingNumber": `${item}`,
                "carrierCode": null,
                "trackingNumberUniqueId": null
            }
        }

    )
});

const splitArrayTo30Piece = () => {  // CONVERT TO [[...30],[...30]]
    let arrayLength= array.length
    let newArray =[]
    const chunkSize = 29;
    for (let i = 0; i < array.length; i += chunkSize) {  // LEARN FOR
        const chunk = array.slice(i, i + chunkSize); // JS LEARN SLICE METHOD YOU WILL GET THAT
        newArray.push(chunk)
    }
   
    return newArray
}

const newArray = splitArrayTo30Piece()

for (let index = 0; index < newArray.length; index++) {

const config={
    method:"post",
  
    headers:
    {   "authorization" : `${authWithBearer}`,
        "Content-Type":'application/json',
        "X-locale": "tr_TR",
    },
    body:  JSON.stringify({
        "includeDetailedScans": true,
        "trackingInfo": [...newArray[index]]})
}


await fetch(`https://apis-sandbox.fedex.com/track/v1/trackingnumbers`,config).then(response => response.json())
.then(res => {
    let array  = res.output.completeTrackResults
    result = [...result,...res.output.completeTrackResults]  // [insideDataResult,array]

})


}



    }
    else if (brand == `dhl`) {
       for (let index = 0; index < trackingNumberArray.length; index++) {
        

        const config={
            method:"get",
          
            headers:
            {
                "Content-Type":'application/json',
                "DHL-API-Key":`${authWithBearer}`,
                
            },
           
        }
        
        await delay(500)
      await  fetch(`https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumberArray[index]}`,config).then(response => response.json())
        .then(res => result = [...result,res]     )

        
       }

    // result=array

    }
    else throw error(400,`Wrong Brand`)


    return result

}




export  {getTrackingData,getAuth} // export funtion himself not inkove return