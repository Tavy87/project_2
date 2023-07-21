const Character = require('../models/character');

module.exports = {
  create
};

async function create(req, res) {
  const character = await Character.findById(req.params.id);
  // We can push (or unshift) subdocs into Mongoose arrays
  
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  character.notes.push(req.body);
  try {
    // Save any changes made to the movie doc
    await character.save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/characters/${character._id}`);
}