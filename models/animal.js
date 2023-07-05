const mongoose = require("./connection.js")


const animalSchema = new mongoose.Schema({

    species:String,
    extinct:Boolean,
    location:String,
    lifeExpectancy:Number,
    gender:String
})

const AnimalModel = mongoose.model("animal", animalSchema)
module.exports = AnimalModel