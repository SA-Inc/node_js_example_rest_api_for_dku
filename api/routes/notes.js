'use strict';

const express = require('express');
const router = express.Router();

const notesController = require(__dirname + '/../controllers/notes.js');



router.get('/notes/:noteId', notesController.readNote);

router.get('/notes', notesController.readNotes);

router.post('/notes', notesController.createNote);

router.put('/notes/:noteId', notesController.updateNote);

router.delete('/notes/:noteId', notesController.deleteNote);



module.exports = router;
