import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }

        //create token
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error logging in user" });
    }
}

const createToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
    });
}

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //checking is user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });

        //saving user to database
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token});

    }catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error registering user" });
    }
}

export { loginUser, registerUser };