// import the connection file
const mongoose = require('./connection');

//the variable holds a schema. 
//holds the properties and data types to be put into our db
const animalSchema = new mongoose.Schema({
    name: String,
    color: String, 
    readyToEat: Boolean
});

// now that we have a schema (properties and data type directions for the db), we want to create a model to be passed into the our db
// the variable should be in Caps by convention
// the 'fruit' is the name of the collection
// the fruitSchema is the direction or the SCHEMA of the object that will be passed into the collection
const Animals = mongoose.model('animal', animalSchema);

module.exports = Animals;