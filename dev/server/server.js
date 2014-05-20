var restify       =     require('restify');
var mongojs       =     require('mongojs');
var morgan        =     require('morgan');
var db            =     require('buckelistapp', ['appUsers', 'bucketLists']);
var server        =     require('server');

server.use(restify.acceptParser(server.accetable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER

// CORS (Cross Origin Request Sharing)
// .e. any web based client can access our resources.
// They need not be from the same domain as ours.
// Without this, your client’s will not be able to talk to the server
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.listen(process.env.PORT || 9804, function() {
  console.log("Server started @ ", process.env.PORT || 9804);
});
