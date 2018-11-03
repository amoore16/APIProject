const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();
//handeler
const UsersController = require('../controllers/users');
//validators
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
    .get(UsersController.index)
    .post(validateBody(schemas.userSchema), UsersController.newUser);

router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUser)
    .put([validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.userSchema)],
        UsersController.replaceUser)
    .patch(UsersController.updateUser);

router.route('/:userId/cars')
    .get(UsersController.getUserCars)
    .post(UsersController.newUserCar);


module.exports = router;

