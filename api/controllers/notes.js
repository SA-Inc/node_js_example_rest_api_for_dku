'use strict';

const bodyParser = require('body-parser');
const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const notesAdapter = new FileSync(__dirname + '/../models/notes.json');
const notesDB = low(notesAdapter);



module.exports.readNote = (req, res) => {
   const noteId = parseInt(req.params.noteId);

   const result = notesDB.get('notes')
      .find({id: noteId})
      .value();

   res.status(200).json(result);
};

module.exports.readNotes = (req, res) => {
   const result = notesDB.get('notes')
      .value();

   res.status(200).json(result);
};

module.exports.createNote = (req, res) => {
   if (!isObjectEmpty(req.body)) {
      const note = new Note(req.body.title, req.body.text, req.body.signature);

      notesDB.get('notes')
        .push(note)
        .write();

      res.status(201).send('Node was created =)');
   } else {
      res.status(204).send('Note is empty =(');
   }
};

module.exports.updateNote = (req, res) => {
   const noteId = parseInt(req.params.noteId);

   const note = {
      title: req.body.title,
      text: req.body.signature,
      signature: req.body.signature,
      update_date: Date.now(),
   };

   notesDB.get('notes')
      .find({id: noteId})
      .assign(note)
      .write()

   res.status(200).send('Note was updated =)');
};

module.exports.deleteNote = (req, res) => {
   const noteId = parseInt(req.params.noteId);

   notesDB.get('notes')
      .remove({id: noteId})
      .write()

   res.status(200).send('Note was deleted =)');
};



function isObjectEmpty(object) {
   return (Object.getOwnPropertyNames(object).length === 0);
}



class Note {
   constructor(title = 'Untitled', text = '', signature = 'Unknown') {
      this.id = Date.now() + 12;
      this.title = title;
      this.text = text;
      this.signature = signature;
      this.create_date = Date.now();
      // this.open_date = null;
      this.update_date = null; 
   }
}
