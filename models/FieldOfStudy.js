const mongoose = require('mongoose');

const fieldOfStudySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  branches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
  }],
});

const FieldOfStudy = mongoose.model('FieldOfStudy', fieldOfStudySchema);

module.exports = FieldOfStudy;
