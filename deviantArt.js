const { devArt } = require('./auth.json');
const url = require('url')
const axios = require('axios');

let accessToken;

const devArtInit = async () => {
  //Init shit
  console.log("Initing DevArt");
  const params = new url.URLSearchParams({...devArt});
  await axios.post('https://www.deviantart.com/oauth2/token', params.toString())
  .then((resp) => {
    console.log(resp.data);
    accessToken = resp.data.access_token;
    return accessToken
  })
  .catch((err) => {
    console.error(err)
  });
}

const searchTags = async (tagName) => {
  let returnTag;
  await devArtInit();
  console.log('Access Token is: ' + accessToken);
  const params = new url.URLSearchParams({tag_name: tagName, access_token: accessToken});
  await axios.get(`https://www.deviantart.com/api/v1/oauth2/browse/tags/search?tag_name=${tagName}&access_token=${accessToken}&mature_content=true`)
  .then((resp) => {
    console.log("Tags you got: " + resp.data.results);
    returnTag = resp.data.results;
  })
  .catch((err) => {
    if(err.response){
      console.log(err.response);
    }else if(err.request){
      console.log(err.request);
    }else{
      console.log('Error', err.message);
    }

    console.log(err);
  });
  return returnTag;
}

const searchWithTag = async (tagName) => {
  const randTags = await searchTags(tagName);
  const randTag = randTags[Math.floor(Math.random() * (randTags.length - 1))];
  let returnUrl;
  console.log('Searching for tag: ' + randTag.tag_name);
  await axios.get(`https://www.deviantart.com/api/v1/oauth2/browse/tags?tag=${randTag.tag_name}&access_token=${accessToken}&mature_content=true`)
  .then((resp) => {
    console.log(resp.data.results);
    returnUrl = getRandUrlFromResults(resp.data.results);
  })
  .catch((err) => {
    console.log(err);
  })
  console.log(returnUrl);
  return returnUrl;
};

const searchWithAllTags = async (tagName) => {
  const randTags = await searchTags(tagName);
  for (const tag of randTags){
    console.log('Searching for tag: ' + tag.tag_name);
    await axios.get(`https://www.deviantart.com/api/v1/oauth2/browse/tags?tag=${tag.tag_name}&limit=2&access_token=${accessToken}&mature_content=true`)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }
};

const getRandUrlFromResults = (results) => {
  const element = results[Math.floor(Math.random() * (results.length-1))];
  return element.url;
}

exports.init = devArtInit;
exports.search = searchTags;
exports.searchWithTag = searchWithTag;
