# Imgur-Upload

[![version](https://img.shields.io/npm/v/@carry0987/imgur.svg)](https://www.npmjs.com/package/@carry0987/imgur)  

A library for upload images to imgur, no dependencies, no need jQuery, php.

## Installation

```bash
npm i @carry0987/imgur -D
```

## Usage

If you want to use your own clientID , you can change it on `index.html` :

```javascript
new Imgur({ 
    clientid: '4409588f10776f7', //You can change this ClientID
    callback: feedback 
});
```

## Register Client ID

[Imgur](https://api.imgur.com/oauth2/addclient)

## Demo

[Demo](https://lab.kukode.com/imgur/)

## Good use of this project

- [Chrome Image Share](https://github.com/superj80820/chrome-image-share)  
