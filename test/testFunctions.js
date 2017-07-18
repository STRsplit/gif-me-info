const gifyParse = require('gify-parse');
const axios = require('axios');

const urlValid = (url) => {
  return (/.*\.gif$/).test(url) && (/^http(s)?:\/\//).test(url)
}

const gatherInfo = async (url) => {
  const { data: b64 } = await axios(url, { responseType: 'arraybuffer' });
  const pictureDatainBinary = Buffer.from(b64, 'base64');
  return gifyParse.getInfo(pictureDatainBinary);
};

const attachInfo = async (url) => {
  const info = await gatherInfo(url);
  return Object.assign({}, info, { url })
};

const coreFunction = async (urls) => {
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
