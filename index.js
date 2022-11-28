const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const path = require("path");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log('Connected to MongoDB');
});

const app = express();

// middlewares

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json({ limit: '50mb' }));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

if (process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
//        res.sendFile(path.join(__dirname,"index.html"));
        res.sendFile(path.join(__dirname,"client","build","index.html"));

    });
}

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});