import { getTrackingData } from "../axios/index.js";
import excelmport from "../excel/excelmport.js";
import searchNumbers from "../excel/searchOptions.js";
import excelExport from "../excel/excelExport.js"

(async ()=>{
const importDhlWb = excelmport(`./dhl.xlsx`) //import to js with dhl file

const apiData = await getTrackingData(searchNumbers(importDhlWb).slice(1),`DHL API KEY`,"dhl") // take data from api

await excelExport(apiData,importDhlWb,`dhl`) // exportData
}

)()