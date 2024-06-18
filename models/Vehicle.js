import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    name: String,
    number: String,
    category: String,
    model: String,
    fuelTankCapacity: Number
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
