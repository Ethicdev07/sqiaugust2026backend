const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoute = require("./src/routes/authRoutes");


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(morgan())


app.get('/', (req, res)=>{
    res.status(200).json({
        staus: 'succesful',
        message: "Welcome to August backend class"

    })
});

app.get("/api/v1", (req, res)=>{
    res.status(200).json({
        staus: "successful",
        message: 'Welcome to Ecommerce owned by August cohort'
    })
});

app.use("/api/v1", authRoute)


module.exports = app;