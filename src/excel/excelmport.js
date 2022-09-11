import * as XLSX from "xlsx"
import fs from "fs"

 const importExcel = (path=`./fedex.xlsx`,pageName=`Sayfa1`)=>{

    const fedexRaw = fs.readFileSync(`${path}`) //RAW FILE TO XLSX ITS CODING TYPE IS BUFFER
    let  fedexRawFile =  XLSX.read(fedexRaw) // FEDEX COMPILE WORDBOOK DATA
    const fedexData =  XLSX.read(fedexRaw).Sheets // FEDEX COMPILE DATA
    const fedexPage =   fedexData[pageName] // FEDEX PAGE
    return fedexPage 
}

export default importExcel