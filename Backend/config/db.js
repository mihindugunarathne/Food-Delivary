import mongoose from "mongoose";

export const connectDB = async () => {
   await mongoose.connect('mongodb+srv://Gunarathne:HHY9W2Su2JhmeY@cluster0.uxymxkj.mongodb.net/food-del').then(()=>console.log('Connected to DB'));
}