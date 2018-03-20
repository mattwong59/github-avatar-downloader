var request = require('request');
var secrets = require('./secrets.js')
var fs = require ('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors (repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };

  request (options, function (err, res, data) {
    cb (err, data);
    //return avatars;
  });
}

var avatars =[]

getRepoContributors ("jquery", "jquery", function (err, result) {
  console.log ("Errors:", err);
  result.forEach(function(item) {
      avatars.push(item.avatar_url);
    });
});


function downloadImageByURL(url, filePath) {
  request.get (url)
         .on ('error', function (err) {
           throw err;
         })
         .on ('resonse', function (response) {
           console.log('Downloading image...');
         })
         .on ('end', function () {
           console.log('Download complete');
         })
        .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");





