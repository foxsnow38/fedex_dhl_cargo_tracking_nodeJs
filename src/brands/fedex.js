import {getTrackingData,getAuth} from "../axios/index.js"
import fedexExport from "../excel/excelExport.js"
import importExcel from "../excel/excelmport.js"
import searchNumbers from "../excel/searchOptions.js"



(async ()=>{


    const authData =   await getAuth(`CLIENTID`,`SECRETID`) //auth Fedex
  const apiData =await  getTrackingData(searchNumbers(importExcel(`./fedex.xlsx`)).slice(1), `Bearer ${authData}`,`fedex`) // take data from api
    await    fedexExport(apiData,importExcel(),`fedex`) // exportData


})()