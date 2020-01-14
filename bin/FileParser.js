"use strict";

require("core-js/modules/es6.object.to-string");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const fs = require('fs');

module.exports = class FileParser {
  constructor(file, handleData) {
    this.file = file;
    this.handleData = handleData;
  }

  readFile() {
    var _this = this;

    return _asyncToGenerator(function* () {
      return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(_this.file, {
          encoding: 'utf8'
        });
        stream.on('data', data => {
          _this.handleData(data);

          stream.destroy();
        });
        stream.on('close', () => {
          resolve();
        });
        stream.on('error', () => {
          reject(new Error('Error occurred reading file stream'));
        });
      });
    })();
  }

};