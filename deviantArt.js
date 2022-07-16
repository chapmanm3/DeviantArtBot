const url = require('url')
const axios = require('axios');

const devArt = {
  grant_type: process.env.DEVART_GRANT_TYPE,
  client_id: process.env.DEVART_CLIENT_ID,
  client_secret: process.env.DEVART_CLIENT_SECRET
};

let accessToken;

const devArtInit = async () => {
  //Init shit
  console.log("Initing DevArt");
  const params = new url.URLSearchParams({...devArt});
  await axios.post('https://www.deviantart.com/oauth2/token', params.toString())
  .then((resp) => {
    accessToken = resp.data.access_token;
    return accessToken
  })
  .catch((err) => {
    console.error(err)
  });
}

const oEmbed = async (url) => {
  let returnUrl;
  await axios.get(`https://backend.deviantart.com/oembed?url=${url}&format=json`) 
    .then((resp) => {
      returnUrl = resp.data.url;
     })
     .catch((err) => {
      console.log(err);
    })
  return returnUrl;
}

const searchTags = async (tagName) => {
  let returnTag;
  await devArtInit();
  const params = new url.URLSearchParams({tag_name: tagName, access_token: accessToken});
  await axios.get(`https://www.deviantart.com/api/v1/oauth2/browse/tags/search?tag_name=${tagName}&access_token=${accessToken}&mature_content=true`)
  .then((resp) => {
    // console.log("Tags you got: " + resp.data.results);
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
  console.log("Tag Searched for: " + tagName);
  const randTags = await searchTags(tagName);
  randTags.map((tag) => console.log(Object.values(tag)));
  const randTag = randTags[Math.floor(Math.random() * (randTags.length - 1))];
  let returnUrl;
  console.log('Searching for tag: ' + randTag.tag_name);
  await axios.get(`https://www.deviantart.com/api/v1/oauth2/browse/tags?tag=${randTag.tag_name}&limit=50&access_token=${accessToken}&mature_content=true`)
  .then((resp) => {
//    console.log(resp.data.results);
    returnUrl = oEmbed(getRandUrlFromResults(resp.data.results));
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
