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
  var currentPath = path.join(exports.dataDir, `${id}.txt`);

  fs.readFile(currentPath, 'utf8', (err, file) => {
    if (err) {
      //throw? callback?
      callback(err);
    } else {
      callback(null, {id: id, text: file});
    }
  });
};

exports.update = (id, text, callback) => {
  var currentPath = path.join(exports.dataDir, `${id}.txt`);

  fs.open(currentPath, 'r', (err, fd) => {
    if (err) {
      console.log('Error -- file not found');
      callback(err);
    } else {
      //write file (path, text, (err) => {})
      fs.writeFile(currentPath, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { id: id, text: text });
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  var currentPath = path.join(exports.dataDir, `${id}.txt`);

  fs.unlink(currentPath, (err) => {
    callback(err);
    console.log('file has been deleted');
  });
  //




  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
