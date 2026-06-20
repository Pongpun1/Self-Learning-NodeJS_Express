// const util = require('./modules/mymodule.js')
const fs = require('fs')

// const number = 5000000
// console.log(util.formatNumber(number))
// console.log(util.getCurrentTime())
// console.log(util.add(5,5))

//Synchronus การอ่านไฟล์และเขียนไฟล์
// const file = fs.readFileSync('./myfile/input.txt','utf-8')
// console.log(file)
// const outputText = `Hello NodeJs \n ${file} ไฟล์ถูกเขียนเมื่อ ${new Date()}`
// fs.writeFileSync('./myfile/output.txt',outputText)
// console.log("เขียนไฟล์เรียบร้อย")

// Asynchronus การอ่านไฟล์และเขียนไฟล์
fs.readFile('./myfile/input.txt','utf-8',(err,data)=>{
    console.log(data)
    const outputText = `Hello NodeJs \n ${data} ไฟล์ถูกเขียนเมื่อ ${new Date()}`
    fs.writeFile('./myfile/output.txt',outputText,err=>{
        if(err) return console.log(`เกิดข้อผิดพลาด ${err}`)
        console.log("จบการทำงาน")
    })
})