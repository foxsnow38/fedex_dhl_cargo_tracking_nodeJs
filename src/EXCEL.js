import * as XLSX from "xlsx"
import fs from "fs"
// we dont use anymore


const instance = {
    t: 's',
    v: 'FEDEX',
    r: '<t xml:space="preserve">FEDEX</t>',
    h: 'FEDEX',
    w: 'FEDEX'
  }


const fedexRaw = fs.readFileSync("./fedex.xlsx") //RAW FILE TO XLSX ITS CODING TYPE IS BUFFER
let  fedexRawFile =  XLSX.read(fedexRaw) // FEDEX COMPILE WORDBOOK DATA
const fedexData =  XLSX.read(fedexRaw).Sheets // FEDEX COMPILE DATA


const fedexPage =   fedexData.Sayfa1 // FEDEX PAGE
const fedexLenght =  Object.keys(fedexPage)[Object.keys(fedexPage).length-2]

const addData = () =>{
const lastRow = parseInt( fedexLenght.match(/\d+/)[0])

let dataObject = {
[`A${lastRow+1}`]:{
    t: 's',
    v: 'FEDEX',
    r: '<t xml:space="preserve">FEDEX</t>',
    h: 'FEDEX',
    w: 'FEDEX'
  },
  [`B${lastRow+1}`]:{
    t: 's',
    v: 'FEDEX',
    r: '<t xml:space="preserve">FEDEX</t>',
    h: 'FEDEX',
    w: 'FEDEX'
  },
  [`C${lastRow+1}`]:{
    t: 's',
    v: 'FEDEX',
    r: '<t xml:space="preserve">FEDEX</t>',
    h: 'FEDEX',
    w: 'FEDEX'
  },
  [`D${lastRow+1}`]:{
    t: 's',
    v: 'FEDEX',
    r: '<t xml:space="preserve">FEDEX</t>',
    h: 'FEDEX',
    w: 'FEDEX'
  },
  [`E${lastRow+1}`]:{
    t: 's',
    v: 'FEDEX',
    r: '<t xml:space="preserve">FEDEX</t>',
    h: 'FEDEX',
    w: 'FEDEX'
  },
  [`F${lastRow+1}`]:{
    t: 's',
    v: 'FEDEX',
    r: '<t xml:space="preserve">FEDEX</t>',
    h: 'FEDEX',
    w: 'FEDEX'
  }
}

return dataObject

}
let fedexNewData = addData()
let fedexNewDataPage = {...fedexPage,...fedexNewData,"!ref":`A1:${Object.keys(fedexNewData)[Object.keys(fedexNewData).length-1]}`}
let fedexNewDataSheets = {...fedexData,Sayfa1:{...fedexNewDataPage}}
let fedexNewRawData = {...fedexRawFile,Sheets:{...fedexNewDataSheets}}


// console.log(fedexNewDataPage)
// console.log(

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, fedexNewDataPage, 'Sayfa1');

const a =  XLSX.writeFile(wb, "fedex3.xlsx", {
    bookType: 'xlsx',
    type: 'file'
});


