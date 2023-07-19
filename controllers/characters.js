const Character = require('../models/character');

module.exports = {
    index,
    show,
    new: newCharacter
  };

async function index(req, res) {
    let characters = Character.find({});
    console.log(characters);
    res.render("characters/index", { title: "All Characters", characters });
}

async function show(req, res) {
    res.render("characters/show", { title: "Characters Details", characters });
} 

function newCharacter(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('characters/new', { title: 'Add Character', errorMsg: '' });
}    
