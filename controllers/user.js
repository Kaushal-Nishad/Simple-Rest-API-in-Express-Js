const {userModel}= require('../models/user');

async function getUsers(req, res){
    const allDbUsers = await userModel.find({});
    return res.json(allDbUsers);
}
async function createUser(req, res){
    const createUser = await userModel.create(req.body);
    if(!createUser)  return res.status(400).json({error: "Oh! Something went wrong."});
    return res.json({
        id:createUser.id,
        msg:"User created Successfully!"
    });
}
async function getUserById(req, res){
    const user = await userModel.findById(req.params.id);
    if(!user)  return res.status(404).json({error: "User Not Found!"});
    return res.json(user);
}
async function updateUserById(req, res){
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
    if(!user)  return res.status(404).json({error: "User Not Found!"});
    return res.json({
        id:user.id,
        msg:"User Updated Successfully!"
    });
}
async function deleteUserById(req, res){
    const user = await userModel.findByIdAndDelete(req.params.id);
    if(!user)  return res.status(404).json({error: "User Not Found!"});
    return res.json({
        id:user.id,
        msg:"User deleted Successfully!"
    });
}

module.exports ={
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
}