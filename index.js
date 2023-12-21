const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse JSON requests
app.use((req,res,next)=>{
   fs.appendFile('logfile.txt',`\n [${new Date().toString()}], path - ${req.url}, Request Method - ${req.method} , Ip - ${req.ip}\n`, (err,data)=>{console.log(err)});
   next();
});

app.get('/', (req, res) => {
    res.send('This is Home page');
});
app.get('/api/users', (req, res) => {
    res.json(users);
});
app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({ id: users.length + 1, ...body });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) throw err;
        return res.json({ status: "Success", id: users.length });
    });
});
app.route('/api/user/:id')
    .get((req, res) => {
        //Get the user by id.
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        //Edit the user.
        const userIdToUpdate = Number(req.params.id); // Replace with the actual user ID
        const updatedDetails = req.body;
        console.log(req.body);
        //return res.json({ 'msg': 'ok' });
        // Find the index of the user with the specified userId
        const userIndex = users.findIndex(user => user.id === userIdToUpdate);
        console.log(userIndex);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updatedDetails };
            console.log(users[userIndex]);
            // Write the updated data back to the file
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err, data) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).json({ status: "Error", error: err });
                } else {
                    console.log('User details updated successfully.');
                    return res.json({ status: "Success" });
                }
            });
        } else {
            console.log('User not found.');
            return res.status(404).json({ status: "Error", error: "User not found" });
        }
    })
    .delete((req, res) => {
        //delete the user.
        return res.json({ status: "pending.." });
    });
app.listen(8080, () => {
    console.log(`Server is running on ${process.env.HOST_NAME}:${process.env.PORT}`);
})