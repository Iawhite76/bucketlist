var restify     =   require('restify');
var mongojs     =   require('mongojs');
var morgan      =   require('morgan');
// before starting server MAKE SURE to first create a directory for local //////
// Mongodb: mkdir -p /data/db                                             //////
// then, in another terminal window run mongod. Then start server.        //////
// http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/       //////
var db          =   mongojs('bucketlistapp', ['appUsers', 'bucketLists']); //
///////////////////////////////////////////////////////////////////////////////
var server      =   restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER

// CORS
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.listen(process.env.PORT || 9804, function () {
    console.log("Server started @ ", process.env.PORT || 9804);
});

var manageUsers   =   require('./auth/manageUser')(server, db);
var manageLists  =   require('./list/manageList')(server, db);


