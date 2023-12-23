const express = require('express');
const { connectMongoDB } = require('./connection');
const { logReqRes } = require('./middlewares');
const userRouter = require('./routes/user');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectMongoDB(process.env.DB_NAME).then(()=>{
    console.log('Connected!');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse JSON requests
app.use(logReqRes('logfile.txt'));

app.use('/api/users', userRouter);

app.listen(8080, () => {
    console.log(`Server is running on ${process.env.HOST_NAME}:${process.env.PORT}`);
})