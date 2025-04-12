const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const connectDB = require("./config/db");
const userroutes = require("./routes/user.routes")
const cookieparser = require("cookie-parser")
const otproutes = require('./routes/otp.routes')
const productroutes = require('./routes/product.routes')
const cartroutes = require('./routes/cart.routes')
const whihslistroutes = require('./routes/whislist.routes')
const paymentroutes = require('./Payment/payment.routes')
const orderroutes = require('./routes/orders.routes')
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieparser())
// database connection
connectDB()

app.use('/uploads', express.static('public/uploads'));
// routes handling
app.use('/user' , userroutes)
app.use('/user/auth', otproutes)
app.use('/product', productroutes)
app.use('/cart', cartroutes)
app.use('/whishlist', whihslistroutes)

// orders routes
app.use('/order' , orderroutes)

// payment handling
app.use('/payment' ,paymentroutes)


app.get("/", (req,res)=>{
  res.send("Ecommerce backend")
})



app.listen(4000, ()=>{
  console.log(`server is listing on http:/localhost:4000`)
})