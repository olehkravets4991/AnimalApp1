// IMPORT DEPEDENCIES & SETUP
require("dotenv").config() // loads the variables in the .env into the process.env object
const express = require("express") // importing the express library
const morgan = require("morgan") // importing the morgan library
const PORT = process.env.PORT // GETTING THE PORT FROM OUR .ENV FILE
const app = express() // express application
const methodOverride = require("method-override") // import middleware for overriding for puts and deletes
const fruitsRouter = require("./controllers/animals")


// MIDDLEWARE (Functions that run between the request and response)
app.use(morgan("dev")) 
app.use(express.static("public")) 
app.use(express.urlencoded({extended: false})) 
app.use(methodOverride("_method")) 
app.use("/animal", animalsRouter) 



// LISTENER
app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})