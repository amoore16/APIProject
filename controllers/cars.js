const Car = require('../models/car');
const User = require('../models/user');

module.exports = {
    index: async (req, res, next) => {
        // get all the cars!
        const cars = await Car.find({});
        res.status(200).json(cars);
    },

    newCar: async (req, res, next) => {
        // 1. find the actual seller
        const seller = await User.findById(req.value.body.seller);
        
        // 2. create a new car
        const newCar = req.value.body;
        delete newCar.seller
        // <-- newCar will contain all info except seller now
        
        const car = new Car(newCar);
        car.seller = seller;
        
        await car.save();
        
        // 3. add newley created car to the actual seller
        seller.cars.push(car);
        await seller.save();

        //all done!
        res.status(200).json(car);
    },

    getCar: async (req, res, next) => {
        const car = await Car.findById(req.value.params.carId);
        res.status(200).json(car);
    },

    replaceCar: async (req, res, next) => {
        const { carId } = req.value.params;
        const newCar = req.value.body;

        const result = await Car.findByIdAndUpdate(carId, newCar);
        res.status(200).json({ success: true});
    },

    updateCar: async (req, res, next) => {
        const { carId } = req.value.params;
        const newCar = req.value.body;
        const result = await Car.findByIdAndUpdate(carId, newCar);
        res.status(200).json({ message: true });
    },

    deleteCar: async (req, res, next) => {
        const { carId } = req.value.params; 
        //get car
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({error:'Car doesn\'t exit' });
        }
        // get seller
        const sellerId = car.seller;
        const seller = await User.findById(sellerId);
        //Remove car
        await car.remove();
        //remove car from seller's list
        seller.cars.pull(car);
        await seller.save();
        res.status(200).json({ success: true});

    }
}