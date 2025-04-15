const Product = require("../models/productmodel");
const path = require("path");
const multer = require("multer")

// const addproduct = async (req, res) => {
//   try {
//     const {
//       title,
//       titleDescription,
//       stars,
//       actualPrice,
//       offerPrice,
//       shortDescription,
//       color,
//       availableSizes,
//       image,
//       longDescription,
//       additionalInformation,
//       reviews,
//     } = req.body;
//     const newproduct = {
//       title,
//       titleDescription,
//       stars,
//       actualPrice,
//       offerPrice,
//       shortDescription,
//       color,
//       availableSizes,
//       image,
//       longDescription,
//       additionalInformation,
//       reviews,
//     };
//     const prduct = await Product.create(newproduct);
//     res.status(201).json({ message: "product added sucessfully", Product });
//     console.log("product is added succussfully");
//   } catch (error) {
//     res.status(201).json({ message: "add product error", error });
//     console.log("addproduct error", error);
//   }
// };

const addProduct = async (req, res) => {
  try {
    const {
      title,
      titleDescription,
      stars,
      actualPrice,
      offerPrice,
      shortDescription,
      color,
      category,
      subcategory,
      availableSizes,
      longDescription,
      additionalInformation,
    } = req.body;

    const image = req.file ? `http://localhost:4000/uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      title,
      titleDescription,
      stars,
      actualPrice,
      offerPrice,
      category,
      subcategory,
      shortDescription,
      color,
      availableSizes,
      // color: color ? color.split(",") : [],
      // availableSizes: availableSizes ? availableSizes.split(",") : [],
      image,
      longDescription,
      additionalInformation,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};



const getproduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) return res.status(201).json({ message: "prduct not found" });
    res.json({ message: "this your all products " ,products});
  } catch (error) {
    res.status(201).json({ message: "get prduct error", error });
    console.log("getproduct error", error);
  }
};

const deleteproduct = async (req, res) => {
  console.log(req.params);
  try {
    const productid = req.params.id;
    const chekproducct = await Product.findById(productid);
    if (!chekproducct) return res.json({ message: "invalid product id" });

    await Product.deleteOne({ _id: productid });
    res.status(200).json({ message: "product delted successfully" });
    console.log("product is deleted successfully");
  } catch (error) {
    res.status(201).json({ message: "delete product error", error });
    console.log("delete product error");
  }
};

const productdetail = async(req,res)=>{
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(200).json({message:"this is the details of this products" , product})
    // console.log("product detail is here")
  } catch (error) {
    res.status(201).json({message:"product detail error" , error})
  }
}

module.exports = { addProduct, deleteproduct ,getproduct ,productdetail};
