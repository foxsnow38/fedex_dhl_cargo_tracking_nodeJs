import * as XLSX from "xlsx"
import fs from "fs"
import dateFormat, { masks } from "dateformat";


const fedexExport = (apiData,oldXLSXData,brand=(`fedex`||`dhl`)) =>{

let compileData = {}

Array.from(apiData).forEach((item,index) => // for each for array inside item and which index
 {
    
    try{
        
     
 let countryCode = brand == `fedex` // if
? item.trackResults[0].recipientInformation.address.countryCode // true
: item.shipments[0].destination.address.addressLocality // false


let lastStatus = brand == `fedex`
? item.trackResults[0].latestStatusDetail.statusByLocale
: item.shipments[0].status.status

let startedTime = brand == `fedex`
? dateFormat(new Date(item.trackResults[0].scanEvents[item.trackResults[0].scanEvents.length-1].date), "dd/mm/yyyy")
: dateFormat(new Date(item.shipments[0].events[item.shipments[0].events.length-1].timestamp), "dd/mm/yyyy")

let lastTime = brand == `fedex`
? dateFormat(new Date(item.trackResults[0].scanEvents[0].date), "dd/mm/yyyy")
: dateFormat(new Date(item.shipments[0].events[0].timestamp), "dd/mm/yyyy")


let trackingNumber =brand == `fedex`
? item.trackingNumber
:item.shipments[0].id

compileData = {

...oldXLSXData,

"!ref": "A1:I10000",
"!margins": {
    "left": 0.7,
    "right": 0.7,
    "top": 0.75,
    "bottom": 0.75,
    "header": 0.511811023622047,
    "footer": 0.511811023622047
},
...compileData,
        "G1": {
            "t": "s",
            "v":`ILK ZAMAN`,
            "r": `<t xml:space=\"preserve\">ILK ZAMAN</t>`,
            "h":`ILK ZAMAN`,
            "w":`ILK ZAMAN`
        },
        "H1": {
            "t": "s",
            "v":`SON ZAMAN`,
            "r": `<t xml:space=\"preserve\">SON ZAMAN</t>`,
            "h":`SON ZAMAN`,
            "w":`SON ZAMAN`
        },
        "I1": {
            "t": "s",
            "v":`SON DURUM`,
            "r": `<t xml:space=\"preserve\">SON DURUM</t>`,
            "h":`SON DURUM`,
            "w":`SON DURUM`
        },



// YORUM SATIRLARINI SILENI TTEN
// [`A${index+2}`]: {
//         "t": "s",
//         "v":`${countryCode}`,
//         "r": `<t xml:space=\"preserve\">${countryCode}</t>`,
//         "h":`${countryCode}`,
//         "w":`${countryCode}`
//     },
    // [`B${index+2}`]: {
    //     "t": "s",
    //     "v": "FEDEX",
    //     "r": "<t xml:space=\"preserve\">FEDEX</t>",
    //     "h": "FEDEX",
    //     "w": "FEDEX"
    // },
    // [`C${index+2}`]: {
    //     "t": "s",
    //     "v": `${lastStatus.toUpperCase()}`,
    //     "r": `<t xml:space=\"preserve\">${lastStatus.toUpperCase()}</t>`,
    //     "h": `${lastStatus.toUpperCase()}`,
    //     "w": `${lastStatus.toUpperCase()}`
    // },
    // [`D${index+2}`]: {
    //     "t": "n",
    //     "v": 44812,
    //     "w": "9/8/2022"
    // },
    // [`E${index+2}`]: {
    //     "t": "n",
    //     "v": 44812,
    //     "w": "9/8/2022"
    // },
    // [`F${index+2}`]: {
    //     "t": "s",
    //     "v": `${trackingNumber}`,
    //     "r": `<t xml:space=\"preserve\">${trackingNumber}</t>`,
    //     "h": `${trackingNumber}`,
    //     "w": `${trackingNumber}`
    // },
    [`G${index+2}`]: {
        "t": "s",
        "v":  `${startedTime}`,
        "w": `${startedTime}`
    },
    [`H${index+2}`]: {
        "t": "s",
        "v":  `${lastTime}`,
        "w": `${lastTime}`
    },
    [`I${index+2}`]: {
        "t": "s",
        "v": `${lastStatus.toUpperCase()}`,
        "r": `<t xml:space=\"preserve\">${lastStatus.toUpperCase()}</t>`,
        "h": `${lastStatus.toUpperCase()}`,
        "w": `${lastStatus.toUpperCase()}`
    },
}
// learn js [...]
}
catch(err){
    // console.log(err)
    compileData = {

        ...oldXLSXData,
        
        "!ref": "A1:I10000",
        "!margins": {
            "left": 0.7,
            "right": 0.7,
            "top": 0.75,
            "bottom": 0.75,
            "header": 0.511811023622047,
            "footer": 0.511811023622047
        },
        ...compileData,
        
        // YORUM SATIRLARINI SILENI TTEN
        // [`A${index+2}`]: {
        //         "t": "s",
        //         "v":`${countryCode}`,
        //         "r": `<t xml:space=\"preserve\">${countryCode}</t>`,
        //         "h":`${countryCode}`,
        //         "w":`${countryCode}`
        //     },
            // [`B${index+2}`]: {
            //     "t": "s",
            //     "v": "FEDEX",
            //     "r": "<t xml:space=\"preserve\">FEDEX</t>",
            //     "h": "FEDEX",
            //     "w": "FEDEX"
            // },
            // [`C${index+2}`]: {
            //     "t": "s",
            //     "v": `${lastStatus.toUpperCase()}`,
            //     "r": `<t xml:space=\"preserve\">${lastStatus.toUpperCase()}</t>`,
            //     "h": `${lastStatus.toUpperCase()}`,
            //     "w": `${lastStatus.toUpperCase()}`
            // },
            // [`D${index+2}`]: {
            //     "t": "n",
            //     "v": 44812,
            //     "w": "9/8/2022"
            // },
            // [`E${index+2}`]: {
            //     "t": "n",
            //     "v": 44812,
            //     "w": "9/8/2022"
            // },
         
            [`G${index+2}`]: {
                "t": "s",
                "v":  `ERROR`,
                "w": `ERROR`
            },
            [`H${index+2}`]: {
                "t": "s",
                "v":  `ERROR`,
                "w": `ERROR`
            },
            [`I${index+2}`]: {
                "t": "s",
                "v": `ERROR`,
                "r": `<t xml:space=\"preserve\">ERROR</t>`,
                "h": `ERROR`,
                "w": `ERROR`
            },
        }

}
}


)


console.log(`CREATED ${brand==`fedex`?"FEDEXRESULT":"DHLRESULT"}.XLSX WITH SUCCES`)

    
const fedexRaw = fs.readFileSync(`./${brand==`fedex`?"fedex":"dhl"}.xlsx`) //RAW FILE TO XLSX ITS CODING TYPE IS BUFFER
let  fedexRawFile =  XLSX.read(fedexRaw) // FEDEX COMPILE WORDBOOK DATA
const fedexData =  XLSX.read(fedexRaw).Sheets // FEDEX COMPILE DATA
let fedexNewDataPage = {...compileData} // take inside to compileData datas
let fedexNewDataSheets = {...fedexData,Sayfa1:{...fedexNewDataPage}} // then append  with wb
let fedexNewRawData = {...fedexRawFile,Sheets:{...fedexNewDataSheets}} // then append with sheets
const wb = XLSX.utils.book_new(); // create wordbook with xlsx lib I search on internet
XLSX.utils.book_append_sheet(wb, fedexNewDataPage, 'Sayfa1'); // than  create new wordBook called with Sayfa1
    
 const result =  XLSX.writeFile(wb, `${brand==`fedex`?"fedex":"dhl"}Result.xlsx`, { // than if  print result.xlsx
        bookType: 'xlsx',
        type: 'file'
    }); 
    
}

export default fedexExport // export functiom himselft