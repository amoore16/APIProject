const Car = require('../models/car');
const User = require('../models/user');

module.exports = {
    index: async (req, res, next) => {
        // get all the cars!
        const cars = await Car.find({});
        res.status(200).json(cars);
    },

    newCar: async (req, res, next) => {
        console.log('req', req.value);
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
        const car = await Car.findById(req.params.carId);
        res.stats(200).json(car);
    }
}