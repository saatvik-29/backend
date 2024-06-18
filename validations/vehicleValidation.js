import { z } from 'zod';

const vehicleSchema = z.object({
    name: z.string().nonempty({ message: 'Vehicle name is required' }),
    number: z.string().nonempty({ message: 'Vehicle number is required' }),
    category: z.string().nonempty({ message: 'Vehicle category is required' }),
    model: z.string().nonempty({ message: 'Vehicle model is required' }),
    fuelTankCapacity: z.number().nonnegative({ message: 'Fuel tank capacity must be a number' }),
});

export const validateVehicle = (req, res, next) => {
    try {
        vehicleSchema.parse(req.body);
        next();
    } catch (e) {
        res.status(400).json({ errors: e.errors });
    }
};
