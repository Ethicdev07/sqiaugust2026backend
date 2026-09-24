const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoute = require("./src/routes/authRoutes");
const errorHandler = require("./src/middleware/error");
const userRoute = require('./src/routes/userRoutes')
const productRoute = require('./src/routes/productRoutes')


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}))

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"]
    .filter(Boolean)
    .map((url) => url.replace(/\/+$/, ""));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin.replace(/\/+$/, ""))) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
}));
app.use(morgan("dev"))



app.get("/api/v1", (req, res)=>{
    res.status(200).json({
        staus: "successful",
        message: 'Welcome to Ecommerce owned by August cohort'
    })
});

//endpoint

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/product", productRoute)




app.use(errorHandler)


module.exports = app;