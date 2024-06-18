import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    vehicleAssigned: { type: String, required: true, unique: true } // Assuming vehicleNumber is unique
});

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;
