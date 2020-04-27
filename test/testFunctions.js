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
  return Object.assign({}, info, { url })
};

const coreFunction = async urls => {
  if(!urls){
      throw new Error('No urls provided')
    }
  let gifURLs = [].concat(urls);

  if(gifURLs.every(urlValid)){
    const promisedUrls = gifURLs.map(attachInfo)
    return await Promise.all(promisedUrls);
  }
  throw new Error('One or more url is invalid')
};

module.exports = {
  urlValid,
  gatherInfo,
  attachInfo,
  coreFunction
}
