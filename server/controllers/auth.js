import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic Field Validation 
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Username validation
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                message: "Username must be 3-20 characters long and contain only letters and numbers."
            });
        }
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
            });
        }

        // Check if user already exists by email OR username
        const existingUser = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email is already registered" });
            }
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Username is already taken" });
            }
        }

        // convert password to hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });

        // Save user to DB
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic Field Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        // If user not found
        if (!user) return res.status(404).json({ message: "User not found" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

        // Create Token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Send user info and token excluding password
        const { password: pw, ...others } = user._doc;
        res.status(200).json({ ...others, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

