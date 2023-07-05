// // 
// // import dependencies
// const express = require("express")
// const Animals = require('../models/animal');

// // create a router
// const router = express.Router()


// router.get("/",  (req, res) => {



//   Animals.find({}).then(animals => {
//     res.render("animals/index.ejs", { animals })
//   })

// })

// // NEW - GET - SHOW A FORM TO CREATE A FRUIT
// router.get("/new", (req, res) => {
//   // render the new template
//   res.render("animals/new.ejs")
// })


// // DESTROY - DELETE - DELETE A FRUIT
// router.delete("/:id", async (req, res) => {
//   // grab the id from the url
//   const id = req.params.id
 
//   await Animals.findByIdAndDelete(id)

//   // redirect user back to index
//   res.redirect("/animal")
// })

// // UPDATE - PUT - UPDATE A FRUIT
// router.put("/:id", async (req, res) => {
//   // get the id from the url
//   const id = req.params.id
//   // make sure readyToEat is a boolean
//   req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  

//   await Animals.findByIdAndUpdate(id, req.body)

//   res.redirect("/animal")
// })

// // CREATE - POST - CREATE A FRUIT
// router.post("/", (req, res) => {
  
//   req.body.readyToEat = req.body.readyToEat === "on" ? true : false
  

//   Animals.create(req.body).then(()=>{
//     res.redirect("/animal")
//   })

// })


// // EDIT - GET - RENDER FORM TO UPDATE A FRUIT
// router.get("/:id/edit", async (req, res) => {
//   const id = req.params.id
  

//   const animal = await Animals.findById(id)
//   res.render("animals/edit.ejs", { animal, id })
// })


// // SHOW - GET - SHOWS ONE Animal - /animal/:id
// router.get("/:id", async (req, res) => {
//   const id = req.params.id

//   const animal = await Animals.findById(id)
//   console.log(animal)
//   const readyClass = animal.readyToEat ? "green" : "red"
//   res.render("animals/show.ejs", { animal, readyClass, id })
// })


// module.exports = router


const express = require("express")
const AnimalModel = require("../models/animal.js")

const router = express.Router()

//INDEX
router.get("/", async (req, res) => {
   const allAnimals = await AnimalModel.find({})
   res.render("animals/index.ejs",{allAnimals}) 
})

// NEW
router.get("/new", (req, res)=>{
    res.render("animals/new.ejs")
} )

//DELETE
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const oneAnimal = await AnimalModel.findByIdAndDelete(id, req.body);
    res.redirect('/animal')
})
///UPDATE
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    req.body.extinct = req.body.extinct === 'on' ? true : false;
    const oneAnimal = await AnimalModel.findByIdAndUpdate(id, req.body);
    res.redirect('/animal')
})
//CREATE
router.post('/', async (req, res) => {
    if(req.body.extinct === 'on'){
        req.body.extinct = true;
    }else {
        req.body.readyToEat = false;
    }
   const addAnimal= await AnimalModel.create(req.body);
    res.redirect('/animal');
})

/// EDIT
router.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const oneAnimal = await AnimalModel.findById(id);
    res.render('animals/edit.ejs', {oneAnimal})
})

/////////////////////////////////////////////////////////////////////////////////////////SHOW
router.get("/:id", async (req, res)=>{
    const id = req.params.id
    const oneAnimal =  await AnimalModel.findById(id)
    res.render("animals/show.ejs", {oneAnimal, id})
})

module.exports= router