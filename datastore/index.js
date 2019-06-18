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

exports.readAll = (callback) => {
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
};

exports.readOne = (id, callback) => {
  /*
  GOAL:
  pass file into success callback
  */

  //path = path.join(exports.dataDir, `${id}.txt`)
  var currentPath = path.join(exports.dataDir, `${id}.txt`);
  //fs.readfile(path, (err, file) => {})
  fs.readFile(currentPath, 'utf8', (err, file) => {
    if (err) {
      //throw? callback?
      callback(err);
    } else {
      callback(null, {id: id, text: file});
    }
  });
    //if err
      //handle it
    //no error
      //callback(null, file)



  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
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
