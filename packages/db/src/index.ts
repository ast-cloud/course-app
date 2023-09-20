import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username:String,
    password:String
  });
  
  const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    price: String,
    discountedPrice: String,
    imageLink: String,
    published: Boolean,
    featured: Boolean
  });
  
  const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    image: String,
    purchasedCourses: [{type:mongoose.Schema.Types.ObjectId, ref:'Course'}]
  });

export const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);