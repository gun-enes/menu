const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dish_route = require('./routes/dish_routes');
const image_route = require('./routes/image_routes');
const category_route = require('./routes/category_routes');
const type_route = require('./routes/type_routes');
const cors = require('cors');
const category = require('./models/category');



// Initialize the app
const app = express();
app.use(bodyParser.json());

app.use(cors())

//mongoose.connect('mongodb://mongo:27017/my_database');

mongoose.connect('mongodb://localhost:27017/my_database');



// Check the connection status
mongoose.connection.on('connected', () => {
    console.log('Successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});


// Use the user routes
app.use('/dishes', dish_route);
app.use('/categories', category_route);
app.use('/images', image_route)
app.use('/types', type_route);



// Start the HTTP server
const server = app.listen(4000, '0.0.0.0', () => {
    console.log('Server is running on port 4000');
});