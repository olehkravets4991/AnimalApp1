// 
// import dependencies
const express = require("express")
const Animals = require('../models/animals');

// create a router
const router = express.Router()


router.get("/",  (req, res) => {



  Animals.find({}).then(animals => {
    res.render("animals/index.ejs", { animals })
  })

})

// NEW - GET - SHOW A FORM TO CREATE A FRUIT
router.get("/new", (req, res) => {
  // render the new template
  res.render("animals/new.ejs")
})


// DESTROY - DELETE - DELETE A FRUIT
router.delete("/:id", async (req, res) => {
  // grab the id from the url
  const id = req.params.id
 
  await Animals.findByIdAndDelete(id)

  // redirect user back to index
  res.redirect("/animal")
})

// UPDATE - PUT - UPDATE A FRUIT
router.put("/:id", async (req, res) => {
  // get the id from the url
  const id = req.params.id
  // make sure readyToEat is a boolean
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  

  await Animals.findByIdAndUpdate(id, req.body)

  res.redirect("/animal")
})

// CREATE - POST - CREATE A FRUIT
router.post("/", (req, res) => {
  
  req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  

  Animals.create(req.body).then(()=>{
    res.redirect("/animal")
  })

})


// EDIT - GET - RENDER FORM TO UPDATE A FRUIT
router.get("/:id/edit", async (req, res) => {
  const id = req.params.id
  

  const animal = await Animals.findById(id)
  res.render("animals/edit.ejs", { animal, id })
})


// SHOW - GET - SHOWS ONE Animal - /animal/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id

  const animal = await Animals.findById(id)
  console.log(animal)
  const readyClass = animal.readyToEat ? "green" : "red"
  res.render("animals/show.ejs", { animal, readyClass, id })
})


module.exports = router
