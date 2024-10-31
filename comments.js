// Create web server
var express = require('express');
var app = express();
var fs = require('fs');

// Load comments from file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Handle POST requests
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post('/comments', function(request, response) {
  var comment = request.body;
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  response.end();
});

// Handle GET requests
app.get('/comments', function(request, response) {
  response.json(comments);
});

// Start server
var server = app.listen(3000, function() {
  console.log('Server listening on port 3000');
});