const Character = require('../models/character');
const Campaign = require('../models/campaign');

module.exports = {
    index,
    show,
    new: newCharacter,
    create
  };

async function index(req, res) {
    const characters = await Character.find({});
    res.render("characters/index", { title: "Dashboard", characters });
}

async function show(req, res) {
    // Populate the cast array with performer docs instead of ObjectIds
    const character = await Character.findById(req.params.id).populate('game');
    //if character
    // Mongoose query builder approach to retrieve performers not the movie:
      // Performer.find({}).where('_id').nin(movie.cast)
    // The native MongoDB approach uses a query object to find 
    // performer docs whose _ids are not in the movie.cast array like this:
    const campaigns = await Campaign.find({_id: { $nin: character.game }}).sort((a,b)=>a.name-b.name);
    res.render("characters/show", { title: "Characters Details", character, campaigns });
} 

function newCharacter(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('characters/new', { title: 'Add Character', errorMsg: '' });
}    

async function create(req, res) {
    // convert nowShowing's checkbox of nothing or "on" to boolean
    req.body.campaignReady = !!req.body.campaignReady;
    // Remove empty properties so that defaults will be applied
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    try {
      const character = await Character.create(req.body);
      // Always redirect after CUDing data
      // We'll refactor to redirect to the movies index after we implement it
      res.redirect(`/characters/${character._id}`);  // Update this line
    } catch (err) {
      // Typically some sort of validation error
      console.log(err);
      res.render('characters/new', { errorMsg: err.message });
    }
  }