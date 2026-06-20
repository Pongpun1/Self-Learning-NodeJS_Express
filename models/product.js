// ใช้งาน mongoose
const mongoose = require('mongoose')

// เชื่อมไปยัง mongo
const dbUrl = 'mongodb://localhost:27017/productDB'
mongoose.connect(dbUrl).catch(err=>console.log(err))

// ออกแบบ schema
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String
})

// สร้าง model
let Product = mongoose.model("products",productSchema)


// ส่งออก model
module.exports = Product

// ออกแบบฟังชันก์บันทึกข้อมูล
module.exports.saveProduct = async function(model){
    return await model.save()
}