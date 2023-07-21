const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    name: { type: String, required: true, unique: true 
    },
    edition: {
        type: String,
        enum: [ '1st', '2nd', '2nd revised', '3rd', '3rd revised', '4th', '5th' ]
      },
    dm: { type: String, required: true },  
     }, {
    timestamps: true
  });

  module.exports = mongoose.model('Campaign', campaignSchema);