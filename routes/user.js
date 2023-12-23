const express = require('express');
const { 
    getUsers,
    getUserById, 
    createUser, 
    updateUserById, 
    deleteUserById 
} = require('../controllers/user');

const router = express.Router();

router.route('/')
    .get(getUsers)
    .post(createUser);
router.route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById);

module.exports = router;