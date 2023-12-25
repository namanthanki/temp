// controllers/subjectController.js

const Subject = require('../models/Subject');

const subjectController = {
  getAllSubjects: async (req, res) => {
    try {
      const subjects = await Subject.find();
      res.render('subjects/index', { subjects });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getSubjectById: async (req, res) => {
    const { id } = req.params;
    try {
      const subject = await Subject.findById(id);
      res.render('subjects/show', { subject });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderCreateForm: (req, res) => {
    res.render('subjects/create');
  },

  createSubject: async (req, res) => {
    const { name } = req.body;
    try {
      await Subject.create({ name });
      res.redirect('/subjects');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderUpdateForm: async (req, res) => {
    const { id } = req.params;
    try {
      const subject = await Subject.findById(id);
      res.render('subjects/update', { subject });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  updateSubject: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      await Subject.findByIdAndUpdate(id, { name });
      res.redirect(`/subjects/${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteSubject: async (req, res) => {
    const { id } = req.params;
    try {
      await Subject.findByIdAndDelete(id);
      res.redirect('/subjects');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = subjectController;