const mongoose = require("./connection.js")
const animalData = require("./seedData.js")
const AnimalModel = require("./animal.js")

mongoose.connection.on("open", async()=>{

    const scrubbedData = animalData.map((v)=>{

        return{
            species: v.species,
            extinct: v.extinct,
            location: v.location,
            lifeExpectancy: v.lifeExpectancy
    
        }
    })
    await AnimalModel.deleteMany({})
    await AnimalModel.create(scrubbedData)
    mongoose.connection.close()

    // console.log(scrubbedData[0]);
})
