const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  fieldsOfStudy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FieldOfStudy',
  }],
});

const University = mongoose.model('University', universitySchema);

module.exports = University;