const express = require('express');
const fs = require('fs');
const users= require('./MOCK_DATA.json');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.send('This is Home page');
});
app.get('/api/users', (req, res) => {
    res.json(users);
});
app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({id:users.length+1,...body});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err, data)=>{
        if(err) throw err;
        return res.json({status:"Success", id : users.length});
    });
});
app.route('/api/user/:id')
.get((req, res) => {
    //Get the user by id.
    const id=Number(req.params.id);
    const user = users.find(user=>user.id===id);
    return res.json(user);
})
.patch((req, res) => {
    //Edit the user.
    return res.json({status:"pending.."});
})
.delete((req, res) => {
    //delete the user.
    return res.json({status:"pending.."});
});
app.listen(8080, () => {
    console.log(`Server is running on ${process.env.HOST_NAME}:${process.env.PORT}`);
})