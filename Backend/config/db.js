const mongoose = require("mongoose");

const connectDB = async ()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGOURI);
    console.log(`database connected succssfully ${conn.connection.host}`)
  } catch (error) {
    console.log(`database connection error: ${error}`)
  }
}
 
module.exports = connectDB