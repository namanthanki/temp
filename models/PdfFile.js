// models/PdfFile.js

const mongoose = require('mongoose');

const pdfFileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject', // Assuming you have a Subject model
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
});

const PdfFile = mongoose.model('PdfFile', pdfFileSchema);

module.exports = PdfFile;