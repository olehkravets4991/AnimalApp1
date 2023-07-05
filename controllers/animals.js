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