const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  content: {
    type: String,
    required: true
  },
 }, {
  timestamps: true
});

const characterSchema = new Schema({
    name: { type: String, required: true },
    race: {
        type: String,
        enum: ['Dwarf', 'Elf', 'Halfling', 'Human', 'Drangonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling' ]
      },
    class: {
        type: String,
        enum: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Warlock', 'Wizard' ]
      },
      notes: [noteSchema]
     }, {
    timestamps: true
  });
  // ref campaign id to link to character

// Compile the schema into a model and export it
module.exports = mongoose.model('Character', characterSchema);