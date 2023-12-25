// routes/index.js

const express = require('express');
const router = express.Router()
const multer = require('multer');
const path = require('path');

const universityController = require('../controllers/universityController');
const fieldOfStudyController = require('../controllers/fieldOfStudyController');
const branchController = require('../controllers/branchController');
const semesterController = require('../controllers/semesterController');
const subjectController = require('../controllers/subjectController');
const pdfFileController = require('../controllers/pdfFileController');

// Routes for universities
router.get('/universities', universityController.getAllUniversities);
router.get('/universities/create', universityController.renderCreateForm);
router.post('/universities', universityController.createUniversity);
router.get('/universities/:id', universityController.getUniversityById);
router.get('/universities/:id/update', universityController.renderUpdateForm);
router.put('/universities/:id', universityController.updateUniversity);
router.delete('/universities/:id', universityController.deleteUniversity);

// CRUD routes for fields of study
router.get('/fields-of-study', fieldOfStudyController.getAllFieldsOfStudy);
router.get('/fields-of-study/create', fieldOfStudyController.renderCreateForm);
router.post('/fields-of-study', fieldOfStudyController.createFieldOfStudy);
router.get('/fields-of-study/:id', fieldOfStudyController.getFieldOfStudyById);
router.get('/fields-of-study/:id/update', fieldOfStudyController.renderUpdateForm);
router.put('/fields-of-study/:id', fieldOfStudyController.updateFieldOfStudy);
router.delete('/fields-of-study/:id', fieldOfStudyController.deleteFieldOfStudy);

// CRUD routes for branches
router.get('/branches', branchController.getAllBranches);
router.get('/branches/create', branchController.renderCreateForm);
router.post('/branches', branchController.createBranch);
router.get('/branches/:id', branchController.getBranchById);
router.get('/branches/:id/update', branchController.renderUpdateForm);
router.put('/branches/:id', branchController.updateBranch);
router.delete('/branches/:id', branchController.deleteBranch);

// CRUD routes for semesters
router.get('/semesters', semesterController.getAllSemesters);
router.get('/semesters/create', semesterController.renderCreateForm);
router.post('/semesters', semesterController.createSemester);
router.get('/semesters/:id', semesterController.getSemesterById);
router.get('/semesters/:id/update', semesterController.renderUpdateForm);
router.put('/semesters/:id', semesterController.updateSemester);
router.delete('/semesters/:id', semesterController.deleteSemester);

// CRUD routes for subjects
router.get('/subjects', subjectController.getAllSubjects);
router.get('/subjects/create', subjectController.renderCreateForm);
router.post('/subjects', subjectController.createSubject);
router.get('/subjects/:id', subjectController.getSubjectById);
router.get('/subjects/:id/update', subjectController.renderUpdateForm);
router.put('/subjects/:id', subjectController.updateSubject);
router.delete('/subjects/:id', subjectController.deleteSubject);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where you want to store uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// CRUD routes for PDF files
router.get('/pdf-files', pdfFileController.getAllPdfFiles);
router.get('/pdf-files/create', pdfFileController.renderCreateForm);
router.post('/pdf-files', upload.single('pdfFile'), pdfFileController.createPdfFile);
router.get('/pdf-files/:id/download', pdfFileController.downloadPdfFile);
router.get('/pdf-files/:id', pdfFileController.getPdfFileById);
router.get('/pdf-files/:id/update', pdfFileController.renderUpdateForm);
router.put('/pdf-files/:id', pdfFileController.updatePdfFile);
router.delete('/pdf-files/:id', pdfFileController.deletePdfFile);

module.exports = router;