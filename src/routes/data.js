// routes/data.js

const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController');
const addController = require('../controllers/addController');
const deleteController = require('../controllers/deleteController');
const editController = require('../controllers/editController');
const readController = require('../controllers/readController');

router.get('/api/personaldata', dataController.list);
router.post('/api/personaldata', addController.add);
router.delete('/api/personaldata/:id', deleteController.delete);
router.put('/api/personaldata/:id', editController.edit);
router.get('/api/personaldata/:id', readController.getById);

module.exports = router;
