import express from "express";
import { Login, Register, logout, addDriver, addVehicle } from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";
import { validateDriver } from '../validations/driverValidation.js';
import { validateVehicle } from "../validations/vehicleValidation.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route('/drivers').post(isAuthenticated, validateDriver, addDriver);
router.route('/vehicles').post(isAuthenticated, validateVehicle, addVehicle);
export default router;