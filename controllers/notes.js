const Character = require('../models/character');

module.exports = {
  create,
  delete: deleteNote
};

async function deleteNote(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const character = await Character.findOne({ 'notes._id': req.params.id, 'notes.user': req.user._id });
  // Rogue user!
  if (!character) return res.redirect('/characters');
  // Remove the review using the remove method available on Mongoose arrays
  character.notes.remove(req.params.id);
  // Save the updated movie doc
  await character.save();
  // Redirect back to the movie's show view
  res.redirect(`/characters/${character._id}`);
}

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