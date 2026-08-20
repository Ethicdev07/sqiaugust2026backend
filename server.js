require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 5000;

const connectDB = require('./src/config/db');

connectDB();

app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`);
    
})

