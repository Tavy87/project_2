const Campaign = require('../models/campaign');
const Character = require('../models/character');

module.exports = {
  new: newCampaign,
  create,
  addToGame
};

async function addToGame(req, res) {
  const character = await Character.findById(req.params.id);
  // The cast array holds the performer's ObjectId (referencing)
  character.game.push(req.body.campaignId);
  await character.save();
  res.redirect(`/characters/${character._id}`);
}

async function newCampaign(req, res) {
  //Sort performers by their name
  const campaigns = await Campaign.find({}).sort('name');
  res.render('campaigns/new', { title: 'Add Campaign', campaigns });
}

async function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  // Fix by either reformatting to "MM-DD-YYYY" or by 
  // appending a "time" fragment like this... 
  console.log(req.body)
  req.body.start = 'T00:00';
  try {
    await Campaign.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/campaigns/new');
}