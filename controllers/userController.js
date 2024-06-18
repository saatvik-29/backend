import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Driver from "../models/Driver.js";
import Vehicle from "../models/vehicle.js";

export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exist.",
                success: false
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 16);

        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            })
        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorect email or password",
                success: false
            });
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        return res.status(201).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "user logged out successfully.",
        success: true
    })
}


export const addVehicle = async (req, res) => {
    try {
        const { name, number, category, model, fuelTankCapacity } = req.body;
        const vehicle = new Vehicle({ name, number, category, model, fuelTankCapacity });
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error adding vehicle', error });
    }
};

export const addDriver = async (req, res) => {
    try {
        const { name, phoneNumber, email, vehicleNumber } = req.body;

        // Find the Vehicle document by vehicleNumber
        const vehicle = await Vehicle.findOne({ number: vehicleNumber });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Create a new driver with the assigned vehicle
        const driver = new Driver({ name, phoneNumber, email, vehicleAssigned: vehicle._id });
        await driver.save();

        res.status(201).json(driver);
    } catch (error) {
        res.status(500).json({ message: 'Error adding driver', error });
    }
};