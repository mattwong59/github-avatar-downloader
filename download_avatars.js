var request = require('request');
var secrets = require('./secrets.js')

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

getRepoContributors ("jquery", "jquery", function (err, result) {
  console.log ("Errors:", err);
  result.forEach(function(item) {
      console.log(item.avatar_url);
    });
});