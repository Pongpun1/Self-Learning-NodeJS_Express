const express = require("express");
const router = express.Router();

// เรียกใช้งาน model
const Product = require("../models/product");

// Upload ไฟล์
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg"); // เปลี่ยนชื่อไฟล์ ป้องกันชื่อซ้ำ
  },
});

// เริ่มต้น upload
const upload = multer({
  storage: storage,
});

// ใช้งาน EJS
router.get("/", async (req, res) => {
  try {
    const doc = await Product.find().exec();
    res.render("index.ejs", { products: doc });
  } catch (err) {
    console.log(err);
    res.status(500).send("เกิดข้อผิดพลาด");
  }
});

router.get("/add-product", (req, res) => {
  // if (req.cookies.login) {
  //   res.render("form.ejs");
  // } else {
  //   res.render("admin.ejs");
  // }
  if (req.session.login) {
    res.render("form.ejs");
  } else {
    res.render("admin.ejs");
  }
});

router.get("/manage", async (req, res) => {
  if (req.session.login) {
    try {
      const doc = await Product.find().exec();
      res.render("manage.ejs", { products: doc });
    } catch (err) {
      console.log(err);
      res.status(500).send("เกิดข้อผิดพลาด");
    }
  } else {
    res.render("admin.ejs");
  }
});

router.post("/insert", upload.single("image"), async (req, res) => {
  let data = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.file.filename,
    description: req.body.description,
  });

  try {
    await Product.saveProduct(data);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    await Product.findByIdAndDelete(req.params.id, {
      useFindAndModify: false,
    }).exec();
    res.redirect("/manage");
  } catch (err) {
    console.log(err);
    res.redirect("/manage");
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    const doc = await Product.findOne({ _id: product_id }).exec();
    res.render("product.ejs", { products: doc });
  } catch (err) {
    console.log(err);
    res.redirect("/manage");
  }
});

// นำข้อมูลที่ต้องการแก้ไขไปแสดงในแบบฟอร์ม
router.post("/edit", async (req, res) => {
  try {
    const edit_id = req.body.edit_id;
    const doc = await Product.findOne({ _id: edit_id }).exec();

    res.render("edit.ejs", { product: doc });
  } catch (err) {
    console.log(err);
  }
});

// อัพเดทแบบฟอร์มเข้า Database
router.post("/update", async (req, res) => {
  // ข้อมูลใหม่
  try {
    const update_id = req.body.update_id;
    let data = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };
    await Product.findByIdAndUpdate(update_id, data, {
      useFindAndModify: false,
    });
    res.redirect("/manage");
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const timeExpire = 10000;

  if (username === "admin" && password === "123456") {
    // res.cookie("username", username, { maxAge: timeExpire }); // ชื่อคุกกี้, ชื่อตัวแปร
    // res.cookie("password", password, { maxAge: timeExpire });
    // res.cookie("login", true, { maxAge: timeExpire });
    req.session.username = username;
    req.session.password = password;
    req.session.login = true;
    req.session.cookie.maxAge = timeExpire;
    res.redirect("/manage");
  } else {
    res.render("404.ejs");
  }
});

router.get("/logout", (req, res) => {
  // res.clearCookie("username");
  // res.clearCookie("password");
  // res.clearCookie("login");
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

// router.get("/home", (req, res) => {
//   res.status(200);
//   res.type("text/html");
//   res.sendFile(path.join(__dirname, "../templates/HomePage.html"));
// });

// router.get("/product/:id", (req, res) => {
//   //   res.sendFile(path.join(__dirname,'../templates/product1.html'))
//   const productId = req.params.id;
//   if (productId == 1) {
//     res.sendFile(path.join(__dirname, "../templates/product1.html"));
//   } else if (productId == 2) {
//     res.sendFile(path.join(__dirname, "../templates/product2.html"));
//   } else {
//     res.redirect('/home')
//   }
// });

module.exports = router;
