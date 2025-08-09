import userModel from '../models/userModel.js';

//add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId); // <-- use req.userId
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) 
        {
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.userId, {cartData}); // <-- use req.userId
        res.json({success: true, message: "Item added to cart successfully"});
    }catch (error) {
        console.log(error);
        res.json({success: false, message: "Error adding item to cart"});
    }   
}


//remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId); // <-- use req.userId
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.userId, {cartData}); // <-- use req.userId
        res.json({success: true, message: "Item removed from cart successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error removing item from cart"});
    }
}


//fetch user cart data
const getCart = async (req, res) => {
     try {
        let userData = await userModel.findById(req.userId);
        let cartData = await userData.cartData;
        res.json({success: true,cartData});
     } catch (error) {  
        console.log(error);
        res.json({success: false, message: "Error fetching cart data"});
        
     }
}

//clear all items from user cart
const clearCart = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.userId, {cartData: {}});
        res.json({success: true, message: "Cart cleared successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error clearing cart"});
    }
}

export {
    addToCart,
    removeFromCart,
    getCart,
    clearCart
};