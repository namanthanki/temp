const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pdfFiles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PdfFile',
  }],
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;