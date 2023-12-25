// controllers/semesterController.js

const Semester = require('../models/Semester');

const semesterController = {
  getAllSemesters: async (req, res) => {
    try {
      const semesters = await Semester.find();
      res.render('semesters/index', { semesters });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getSemesterById: async (req, res) => {
    const { id } = req.params;
    try {
      const semester = await Semester.findById(id);
      res.render('semesters/show', { semester });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderCreateForm: (req, res) => {
    res.render('semesters/create');
  },

  createSemester: async (req, res) => {
    const { name } = req.body;
    try {
      await Semester.create({ name });
      res.redirect('/semesters');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderUpdateForm: async (req, res) => {
    const { id } = req.params;
    try {
      const semester = await Semester.findById(id);
      res.render('semesters/update', { semester });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  updateSemester: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      await Semester.findByIdAndUpdate(id, { name });
      res.redirect(`/semesters/${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteSemester: async (req, res) => {
    const { id } = req.params;
    try {
      await Semester.findByIdAndDelete(id);
      res.redirect('/semesters');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = semesterController;