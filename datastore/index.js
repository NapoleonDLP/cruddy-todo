const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
    } else {
      fs.writeFile( path.join(exports.dataDir, `${id}.txt`), text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { id, text });
        }
      });
    }
  });
};

//read dataDir, build list of files
//NOTE: id of each todo item is encoded in its filename
//include texxt field in response to client
  //pass in message id for both id field and text content

/*
i: callback
o:

NOTE:
- readdir returns array of
- path: exports.dataDir
*/

exports.readAll = (callback) => {
  //initialize empty data array
  var data = [];


  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      //callback?
      //throw?
    } else {
      files.forEach(id => {
        data.push({ id: id.substring(0, id.length - 4), text: id.substring(0, id.length - 4) });
      });
      callback(null, data);
    }
  });
  //read directory -- readdir(path, callback(err, files)) {
    //err first
      //throw error?
      //callback(err)?
    //no error
      //iterate over files (forEach?)
        //files.forEach(fileName => {data.push(yadayada)})
        //push each file as an object into array
        //callback(null, data)

  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
