var request = require('request');
var secrets = require('./secrets.js')
var fs = require ('fs');
var params = process.argv.slice(2);

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
  });
}

getRepoContributors (params[0], params[1], function (err, result) {

  if (params.length == 2) {
    console.log("Errors:" + err);
    result.forEach(function(item) {
        downloadImageByURL(item.avatar_url, item.login);
      });
  } else {
    console.log ("Errors: Incorrect input. Please check and try again.");
  }

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
        .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));
}






