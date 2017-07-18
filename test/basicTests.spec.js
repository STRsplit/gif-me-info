const gifyParse = require('gify-parse');
const { name, description, author, version } = require('../package.json');
const { gatherInfo, attachInfo, coreFunction, urlValid } = require('./testFunctions.js');
const chai = require("chai");
const { assert, expect } = chai;
chai.should();
const chaiAsPromised = require("chai-as-promised");
console.info(
 `TESTS:
  ==================================================================
  Package: ${name}
  Author: ${author}
  Version: ${version}
  Description: ${description}
  ==================================================================`);
describe('Test each function individually', function() {
  this.timeout(15000);
  describe('Basic functions exist', function() {
    it('urlValid should be a function', function () {
      expect(urlValid).to.be.a('function')
    });
    it('gatherInfo should be a function', function () {
      expect(gatherInfo).to.be.a('function')
    });
    it('attachInfo should be a function', function () {
      expect(attachInfo).to.be.a('function')
    });    
    it('coreFunction should be a function', function () {
      expect(coreFunction).to.be.a('function')
    });
  });
  describe('urlValid validates gif url', function() {
    let goodURL = 'http://devcenter.wintellect.com/wp-content/uploads/2016/10/Spectron.gif';
    let goodSecureURL = 'https://devcenter.wintellect.com/wp-content/uploads/2016/10/Spectron.gif';
    let httpErrURL = 'htt://devcenter.wintellect.com/wp-content/uploads/2016/10/Spectron.gif';
    let nonGifURL = 'http://devcenter.wintellect.com/wp-content/uploads/2016/10/Spectron.jpg'
    it('urlValid should handle good gif url', function () {
      expect(urlValid(goodURL)).to.be.true
    });
    it('urlValid should handle good gif secure url', function () {
      expect(urlValid(goodSecureURL)).to.be.true
    });
    it('urlValid to return false for http syntax error', function () {
      expect(urlValid(httpErrURL)).to.be.false
    });    
    it('urlValid to return false for non gif file type', function () {
      expect(urlValid(nonGifURL)).to.be.false
    });
  })
  chai.use(chaiAsPromised);
  describe('gatherInfo: Should return promise - resolve to object with info of gif from url', function () {
    let gifURL = 'http://devcenter.wintellect.com/wp-content/uploads/2016/10/Spectron.gif';
    it('gatherInfo should return a promise', function (done) {
      gatherInfo(gifURL).should.be.fulfilled.notify(done)
    });   
    it('gatherInfo should eventually resolve to an object', function (done) {
      gatherInfo(gifURL).should.eventually.be.an('object').notify(done)
    });
    it('gatherInfo resolution object should contain property: height, width, duration', function (done) {
      gatherInfo(gifURL).should.be.fulfilled.then(gifData => {
        expect(gifData).to.have.property('height');
        expect(gifData).to.have.property('width');
        expect(gifData).to.have.property('duration');
      }).should.notify(done)
    });
    it('gatherInfo resolution object should contain property images w/ data type array', function (done) {
      gatherInfo(gifURL).should.be.fulfilled.then(gifData => {
        expect(gifData).to.have.property('images');
        expect(gifData.images).to.be.an('array');
      }).should.notify(done)
    });      
  });    
  describe('attachInfo: Should return promise - resolve to object w/ duration & url', function () {
    let gifURL = 'http://devcenter.wintellect.com/wp-content/uploads/2016/10/Spectron.gif';
    it('attachInfo should return a promise', function (done) {
      attachInfo(gifURL).should.be.fulfilled.notify(done)
    });   
    it('attachInfo should eventually resolve to an object', function (done) {
      attachInfo(gifURL).should.eventually.be.an('object').notify(done)
    });     
    it('attachInfo resolved object should have duration property', function (done) {
      attachInfo(gifURL).should.be.fulfilled.then(gifData => {
        expect(gifData).to.have.property('duration');
      }).should.notify(done)
    });    
    it('attachInfo resolved object should have url property', function (done) {
      attachInfo(gifURL).should.be.fulfilled.then(gifData => {
        expect(gifData).to.have.property('url')
      }).should.notify(done)
    });   
    it('attachInfo: duration for provided gifURL should be "7230"', function (done) {
      attachInfo(gifURL).should.be.fulfilled.then(gifData => {
        expect(gifData.duration).to.equal(7230)
      }).should.notify(done)
    });   
  });    
  describe('coreFunction: Should return array of promises - resolve to array of objects w/ url and duration for each', function () {
    let gifURL = 'http://devcenter.wintellect.com/wp-content/uploads/2016/10/Spectron.gif';
    let httpErrURL = 'htt://devcenter.wintellect.com/wp-content/uploads/2016/10/Spectron.gif';
    it('coreFunction should return error for invalid gif url', function (done) {
      coreFunction(httpErrURL).should.be.rejectedWith(Error).should.notify(done)
    }); 
    it('coreFunction should return error for invalid gif url following a valid url', function (done) {
      coreFunction([gifURL, httpErrURL]).should.be.rejectedWith(Error).should.notify(done)
    }); 
    it('coreFunction should handle single url input', function (done) {
      coreFunction(gifURL).should.be.fulfilled.notify(done)
    }); 
    it('coreFunction should handle array input data', function (done) {
      coreFunction([gifURL, gifURL]).should.be.fulfilled.notify(done)
    });   
    it('coreFunction should resolve to array of objects', function (done) {
      coreFunction([gifURL, gifURL]).should.be.fulfilled.then(results => {
        expect(results).to.have.lengthOf(2);
        expect(results[0]).to.be.an('object')
      }).should.notify(done)
    });  
    it('coreFunction resolved array objects should have url property', function (done) {
      coreFunction([gifURL, gifURL]).should.be.fulfilled.then(results => {
        expect(results[0]).to.have.property('url')
      }).should.notify(done)
    });  
    it('coreFunction resolved array objects should have properties: images, width, height...', function (done) {
      coreFunction([gifURL, gifURL]).should.be.fulfilled.then(results => {
        expect(results[0]).to.have.property('images')
        expect(results[0]).to.have.property('height')
        expect(results[0]).to.have.property('width')
        expect(results[0].images).to.be.an('array')
      }).should.notify(done)
    });  
    it('coreFunction resolved array objects should have duration property', function (done) {
      coreFunction([gifURL, gifURL]).should.be.fulfilled.then(results => {
        expect(results[0]).to.have.property('duration')
      }).should.notify(done)
    });   
  });    
});