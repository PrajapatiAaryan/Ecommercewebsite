const Cart = require("../models/Cartmodel");

const addtocart = async (req, res) => {
  const { productid, quantity ,size,color } = req.body;
  const userid = req.user.id;
  // console.log(req.body)
  // console.log({userid,productid, quantity })
  try {
    let cart = await Cart.findOne({ userid });
    if (!cart) {
      cart = new Cart({ userid, items: [] });
    }
    const existingitem = cart.items.find(
      (item) => item.productid.toString() === productid
    );

    if (existingitem) {
      existingitem.quantity += quantity;
    } else {
      cart.items.push({ productid, quantity ,size ,color });
    }
    await cart.save();
    res.status(200).json({ messge: "product is added to cart", cart });
  } catch (error) {
    res.status(201).json({ message: "addtocart error", error });
    console.log("addtocart error", error);
  }
};

const getcart = async (req, res) => {
  const userid = req.user.id;
  try {
    const cart = await Cart.findOne({ userid }).populate("items.productid");
    res.json({ message: "here is your cart", cart });
  } catch (error) {
    res.status(201).json({ message: "getcart error", error });
    console.log("getcart error", error);
  }
};

const removefromcart = async (req, res) => {
  const userid = req.user.id;
  const productid = req.params.id;
  try {
    const cart = await Cart.findOne({ userid });
    if (!cart) return res.status(201).json({ message: "cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productid.toString() !== productid
    );
    await cart.save();
    res.status(200).json({ message: "product is removed from cart", cart });
  } catch (error) {
    res.status(201).json({ message: "removefromcart", error });
    console.log("remvoefromcart error", error);
  }
};

const decreseqty = async (req, res) => {
  const userid = req.user.id;
  const productid = req.params.id;
  try {
    const cart = await Cart.findOne({ userid });
    if (!cart) return res.status(201).json({ message: "cart not found" });
    const itemindex = cart.items.findIndex(
      (item) => item.productid.toString() === productid
    );

    if (itemindex === -1) {
      return res.json({ message: "item is not in cart" });
    }
     
    console.log("itemindex = " , itemindex)
    if(cart.items[itemindex].quantity > 1){
      cart.items[itemindex].quantity -= 1;
    }else{
      cart.items.splice(itemindex , 1)
    }
    await cart.save();
    res.status(200).json({message:"item qty is decresed" , cart})

  } catch (error) {
    res.status(201).json({ message: "decreseqty error", error });
    console.log("decreseqty error", error);
  }
};

const clearcart = async(req,res)=>{
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({userid:userId});
    if(!cart) return res.json({message:"cart not found"});
    cart.items = [];
    await cart.save()
    res.status(200).json({message:"your cart is empty now" , cart})
 
  } catch (error) {
    res.status(401).json({message:"clearcart error" , error})
    console.log("clear cart error" , error)
  }
}

module.exports = { addtocart, getcart, removefromcart, decreseqty ,clearcart};
