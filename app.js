const express = require('express');
const dbConnect = require('./config/db');
const ProductRoutes = require('./routes/productsRoute');

// Use express
const app = express();


// MongoDB Connect
dbConnect();

// Middlewares
app.use(express.json());


// Routes
app.use('/api/', ProductRoutes);


// Listen to server
const PORT = 5000;
app.listen(
    PORT, 
    () => console.log(`Server running at http://127.0.0.1:${PORT}`)
);