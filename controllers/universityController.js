// controllers/universityController.js

const University = require('../models/University');

const universityController = {
  getAllUniversities: async (req, res) => {
    try {
      const universities = await University.find();
      res.render('universities/index', { universities });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getUniversityById: async (req, res) => {
    const { id } = req.params;
    try {
      const university = await University.findById(id);
      res.render('universities/show', { university });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderCreateForm: (req, res) => {
    res.render('universities/create');
  },

  createUniversity: async (req, res) => {
    const { name } = req.body;
    try {
      await University.create({ name });
      res.redirect('/universities');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderUpdateForm: async (req, res) => {
    const { id } = req.params;
    try {
      const university = await University.findById(id);
      res.render('universities/update', { university });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  updateUniversity: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      await University.findByIdAndUpdate(id, { name });
      res.redirect(`/universities/${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteUniversity: async (req, res) => {
    const { id } = req.params;
    try {
      await University.findByIdAndDelete(id);
      res.redirect('/universities');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = universityController;