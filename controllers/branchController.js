// controllers/branchController.js

const Branch = require('../models/Branch');

const branchController = {
  getAllBranches: async (req, res) => {
    try {
      const branches = await Branch.find();
      res.render('branches/index', { branches });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getBranchById: async (req, res) => {
    const { id } = req.params;
    try {
      const branch = await Branch.findById(id);
      res.render('branches/show', { branch });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderCreateForm: (req, res) => {
    res.render('branches/create');
  },

  createBranch: async (req, res) => {
    const { name } = req.body;
    try {
      await Branch.create({ name });
      res.redirect('/branches');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  renderUpdateForm: async (req, res) => {
    const { id } = req.params;
    try {
      const branch = await Branch.findById(id);
      res.render('branches/update', { branch });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  updateBranch: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      await Branch.findByIdAndUpdate(id, { name });
      res.redirect(`/branches/${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  deleteBranch: async (req, res) => {
    const { id } = req.params;
    try {
      await Branch.findByIdAndDelete(id);
      res.redirect('/branches');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = branchController;