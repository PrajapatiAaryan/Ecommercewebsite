const Whishlist = require('../models/Wishlistmodel')


const addtowhishlist =async(req,res)=>{
  const { productid, quantity } = req.body;
  const userid = req.user.id;
  try {
    let whishlist = await Whishlist.findOne({userid});
    if(!whishlist){
      whishlist = new Whishlist({userid , items:[]})
    }
    const existingitem = whishlist.items.find(
      (item)=>item.productid.toString()===productid
    );

    if(existingitem){
      existingitem.quantity += quantity
    }
    else{
      whishlist.items.push({productid ,quantity})
    }
    await whishlist.save()
    res.status(200).json({message:"item added in whishlist" , whishlist})

  } catch (error) {
    res.status(201).json({message:"addtowhislist error" , error});
    console.log("addtowhishlist error")
  }
}

const removefromwhishlist =async(req,res)=>{
  const userid = req.user.id;
  const productid = req.params.id;
 try {
  const whishlist = await Whishlist.findOne({ userid });
    if (!whishlist) return res.status(201).json({ message: "whishlist not found" });

    whishlist.items = whishlist.items.filter(
      (item) => item.productid.toString() !== productid
    );
    await whishlist.save();
    res.status(200).json({ message: "product is removed from whishlist", whishlist });
 } catch (error) {
  res.status(201).json({message:"removefromwhislist error" , error})
  console.log("removefromwhislist error" , error)
 }
}

const getwhishlist = async (req, res) => {
  const userid = req.user.id;
  try {
    const whishlist = await Whishlist.findOne({ userid }).populate("items.productid");
    res.json({ message: "here is your whishlist", whishlist });
  } catch (error) {
    res.status(201).json({ message: "getwhislist error", error });
    console.log("getwhislist error", error);
  }
};

module.exports ={ addtowhishlist ,removefromwhishlist ,getwhishlist}