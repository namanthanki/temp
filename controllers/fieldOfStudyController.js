// controllers/fieldOfStudyController.js

const FieldOfStudy = require('../models/FieldOfStudy');

const fieldOfStudyController = {
  getAllFieldsOfStudy: async (req, res) => {
    try {
      const fieldsOfStudy = await FieldOfStudy.find();
      res.render('fieldsOfStudy/index', { fieldsOfStudy });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getFieldOfStudyById: async (req, res) => {
    const { id } = req.params;
    try {
      const fieldOfStudy = await FieldOfStudy.findById(id);
      res.render('fieldsOfStudy/show', { fieldOfStudy });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderCreateForm: (req, res) => {
    res.render('fieldsOfStudy/create');
  },

  createFieldOfStudy: async (req, res) => {
    const { name } = req.body;
    try {
      await FieldOfStudy.create({ name });
      res.redirect('/fields-of-study');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderUpdateForm: async (req, res) => {
    const { id } = req.params;
    try {
      const fieldOfStudy = await FieldOfStudy.findById(id);
      res.render('fieldsOfStudy/update', { fieldOfStudy });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  updateFieldOfStudy: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      await FieldOfStudy.findByIdAndUpdate(id, { name });
      res.redirect(`/fields-of-study/${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteFieldOfStudy: async (req, res) => {
    const { id } = req.params;
    try {
      await FieldOfStudy.findByIdAndDelete(id);
      res.redirect('/fields-of-study');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = fieldOfStudyController;