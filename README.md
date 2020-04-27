# gif-me-info
Promise-based gif information and stats.

## Install
```bash
npm i gif-me-info
```
## Notes
Provides promised results for [gify-parse](https://github.com/JonasHavers/node-gify-parse) allowing users to get information for a single gif url or an array of gif urls.

### Updates:
  - 1.0.3: removed axios dependency in favor of smaller node-fetch

## Authors

  - [Eugene Shifrin](https://github.com/eshifrin)
  - [Steven Reed](https://github.com/STRsplit)

## Table of Contents

1. [How to Use](#howto)
1. [Usage](#Usage)
1. [Info Properties](#info-properties)
1. [Requirements](#requirements)
1. [Contributing](#contributing)
1. [Acknowledgments](#acknowledgments)


## Usage
```bash
npm i gif-me-info
```
### How to Use

```js
// Require or import the package (name it anything you'd like) wherever you'd like to use it:
const gifInfo = require('gif-me-info');

// Function takes in a single url or array of gif urls
let gifUrls = [
  'http://media2.giphy.com/media/FiGiRei2ICzzG/200.gif',
  'http://media0.giphy.com/media/feqkVgjJpYtjy/200.gif'
];

// Use an async function to await the results
const asyncExample = async () => {
  let result = await gifInfo(gifUrls);
  console.log(result);
}


// Or use .then promise chain to access results 
const promiseExample = () => {
  gifInfo(gifUrls)
  .then(results => console.log(results))
};

/* Sample results: (Data format: Array of objects)
[
    {
        "valid": true,
        "globalPalette": true,
        "globalPaletteSize": 256,
        "globalPaletteColorsRGB": [
            {
                "r": 217,
                "g": 217,
                "b": 217
            }, ...more
        ],
        "loopCount": 0,
        "height": 832,
        "width": 1264,
        "animated": true,
        "images": [
            {
                "identifier": "0",
                "localPalette": false,
                "localPaletteSize": 0,
                "interlace": false,
                "comments": [],
                "text": "",
                "left": 0,
                "top": 0,
                "width": 1264,
                "height": 832,
                "delay": 30,
                "disposal": 1
            },
            {
                "identifier": "1",
                "localPalette": false,
                "localPaletteSize": 0,
                "interlace": false,
                "comments": [],
                "text": "",
                "left": 0,
                "top": 0,
                "width": 1,
                "height": 1,
                "delay": 30,
                "disposal": 1
            },
            {
                "identifier": "2",
                "localPalette": false,
                "localPaletteSize": 0,
                "interlace": false,
                "comments": [],
                "text": "",
                "left": 0,
                "top": 0,
                "width": 1,
                "height": 1,
                "delay": 30,
                "disposal": 1
            },
            ...more
        ],
        "isBrowserDuration": true,
        "duration": 7230,
        "durationIE": 24100,
        "durationSafari": 7230,
        "durationFirefox": 7230,
        "durationChrome": 7230,
        "durationOpera": 7230,
        "url": "http://devcenter.wintellect.com/wp-content/uploads/2016/10/Spectron.gif"
    }
] */

```

## Info Properties
All of the properties provided by [gify-parse](https://www.npmjs.com/package/gify-parse#info-properties) module. 

## Requirements
- Node >= 8

## Contributing
This is just an encapsulation of the gify-parse package (which does the bulk of the work) created for another project, but if you would like to contribute please make a pull request with your work. Feel free to contact me and introduce yourself as well.

## Acknowledgments
- [Jonas Havers](https://github.com/JonasHavers) - Jonas' [gify-parse](https://github.com/JonasHavers/node-gify-parse) based on [Ryan French's](https://github.com/rfrench/) [gify](https://github.com/rfrench/gify) is the core of the module, we just encapsulated it for a very specific need. 

