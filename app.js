const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const router = require('./routes/myrouter')
const app = express()

app.set('views',path.join(__dirname,'views')) // เป็นรูปแบบ Dynamic ที่มีความยืดหยุ่น สามารถเปลี่ยนแปลงข้อมูลได้ เก็บใน public เท่านั้น
app.set('view engine','ejs' )
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(session({secret:"mysession",resave:false,saveUninitialized:false}))
app.use((req, res, next) => {
  res.locals.isLogin = req.session.login === true;
  next();
});
app.use(router)
app.use(express.static(path.join(__dirname,'public'))) // เป็นรูปแบบ Static ที่จะเป็นไฟล์หรือค่าคงที่ ไม่มีการเปลี่ยนแปลง เก็บใน views เท่านั้น


app.listen(3000,()=>{
  console.log("Server run in 3000")
})

// ไฟล์นี้เป็นตัว RUN เซิฟเวอร์