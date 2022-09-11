const searchNumbers = (sheetData) =>{ 
   
   
const dataArray= Object.entries(sheetData) // take object data than conver array

let array = []
for (let index = 0; index < dataArray.length; index++) {
if(dataArray[index][0].includes(`F`)){ // if convert array include F
   array.push(dataArray[index][1][`v`]) // push  arrayArray v  inside to array
}
    
}
return array
}




export default searchNumbers