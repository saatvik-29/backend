import { z } from 'zod';

const driverSchema = z.object({
    name: z.string().nonempty({ message: 'Driver name is required' }),
    phoneNumber: z.string().nonempty({ message: 'Phone number is required' }),
    email: z.string().email({ message: 'Valid email is required' }),
    vehicleNumber: z.string().nonempty({ message: 'Vehicle number is required' }), // Update to vehicleNumber
});

export const validateDriver = (req, res, next) => {
    try {
        driverSchema.parse(req.body);
        next();
    } catch (e) {
        res.status(400).json({ errors: e.errors });
    }
};

