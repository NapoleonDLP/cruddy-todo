const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {

  //invoke readCounter
  readCounter((err, count) => {
    //error first
    if (err) {
      console.log('Err calling readCounter inside getNextUniqueId');
      callback(null, 0);
    } else {
      writeCounter(count + 1, (err, counterString) => {
        if (err) {
          console.log('Err calling writeCounter > readCounter > getNextUniqueId');
          //do we need callback here?
        } else {
          console.log('callback ---->', callback);
          console.log('counterString ----->', counterString);
          callback(null, counterString);
        }
      });
    }
  });

  // return zeroPaddedNumber(counter); //string
};

// counter = counter + 1;


/*
I: cb
O: err: throw err && nonErr: get next unique id
C: count has to be string
E:
*/


// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
