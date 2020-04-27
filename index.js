const gifyParse = require('gify-parse');
const fetch = require('node-fetch');

const urlValid = url => {
  return (/.*\.gif$/).test(url) && (/^http(s)?:\/\//).test(url)
}

const gatherInfo = async url => {
  const buffer = await fetch(url).then(res => res.arrayBuffer());
  const pictureDatainBinary = Buffer.from(buffer, 'base64');
  return gifyParse.getInfo(pictureDatainBinary);
};

const attachInfo = async url => {
  const info = await gatherInfo(url);
  return Object.assign({}, info, { url });
};

module.exports = async urls => {
  if(!urls || !urls.length){
    return new Error('No urls provided')
  }
  const gifURLs = [].concat(urls);
  if(urls.every(urlValid)){
    const promisedUrls = gifURLs.map(attachInfo)
    return await Promise.all(promisedUrls);
  }
  return new Error('One or more url is invalid')
};
