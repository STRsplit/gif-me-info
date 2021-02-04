"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var gifyParse = require('gify-parse');

var fetch = require('node-fetch');

const regeneratorRuntime = require('regenerator-runtime');

var urlValid = function urlValid(url) {
  return /.*\.gif$/.test(url) && /^http(s)?:\/\//.test(url);
};

var gatherInfo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var buffer, pictureDatainBinary;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url).then(function (res) {
              return res.arrayBuffer();
            });

          case 2:
            buffer = _context.sent;
            pictureDatainBinary = Buffer.from(buffer, 'base64');
            return _context.abrupt("return", gifyParse.getInfo(pictureDatainBinary));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function gatherInfo(_x) {
    return _ref.apply(this, arguments);
  };
}();

var attachInfo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
    var info;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return gatherInfo(url);

          case 2:
            info = _context2.sent;
            return _context2.abrupt("return", Object.assign({}, info, {
              url: url
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function attachInfo(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(urls) {
    var gifURLs, promisedUrls;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!urls || !urls.length)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", new Error('No urls provided'));

          case 2:
            gifURLs = [].concat(urls);

            if (!urls.every(urlValid)) {
              _context3.next = 8;
              break;
            }

            promisedUrls = gifURLs.map(attachInfo);
            _context3.next = 7;
            return Promise.all(promisedUrls);

          case 7:
            return _context3.abrupt("return", _context3.sent);

          case 8:
            return _context3.abrupt("return", new Error('One or more url is invalid'));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();
