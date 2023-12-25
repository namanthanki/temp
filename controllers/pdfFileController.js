// controllers/pdfFileController.js

const PdfFile = require('../models/PdfFile');
const Subject = require('../models/Subject');
const fs = require('fs');

const pdfFileController = {
  getAllPdfFiles: async (req, res) => {
    try {
      const pdfFiles = await PdfFile.find();
      const subjectName = await Subject.findById(pdfFiles.subject);
      res.render('pdfFiles/index', { pdfFiles, subjectName });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getPdfFileById: async (req, res) => {
    const { id } = req.params;
    try {
      const pdfFile = await PdfFile.findById(id);
      res.render('pdfFiles/show', { pdfFile });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderCreateForm: async (req, res) => {
    try {
      const subjects = await Subject.find();
      res.render('pdfFiles/create', { subjects });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  createPdfFile: async (req, res) => {
    // Assuming you have configured Multer to handle file uploads
    const { originalname, filename, path } = req.file;
    const { subjectId } = req.body;
    console.log("FILE: ", req.file);
    console.log("BODY: ", req.body);

    try {
      const pdfFile = await PdfFile.create({ name: originalname, filename, filePath: path, subjectId: subjectId });
      res.redirect(`/pdf-files/${pdfFile._id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderUpdateForm: async (req, res) => {
    const { id } = req.params;
    try {
      const pdfFile = await PdfFile.findById(id);
      res.render('pdfFiles/update', { pdfFile });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  updatePdfFile: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      await PdfFile.findByIdAndUpdate(id, { name });
      res.redirect(`/pdf-files/${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  deletePdfFile: async (req, res) => {
    const { id } = req.params;
    try {
      await PdfFile.findByIdAndDelete(id);
      res.redirect('/pdf-files');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  downloadPdfFile: async (req, res) => {
    const { id } = req.params;

    try {
      const pdfFile = await PdfFile.findById(id);

      if (!pdfFile) {
        return res.status(404).send('PDF File not found');
      }

      const filePath = pdfFile.filePath;
      const fileName = pdfFile.name;

      // Set Content-Disposition headers to force download
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      
      // Read the file and stream it to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
};

module.exports = pdfFileController;