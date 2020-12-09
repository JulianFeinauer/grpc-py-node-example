var PROTO_PATH = __dirname + '/../proto/example.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

let getServerResponse = function (call, callback) {
    let request = call.request;
    console.log("Got a request" + request.message)
    callback(null, {
            message: request.message,
            received: true
        })
};

function getServer() {
    var server = new grpc.Server();
    server.addService(protoDescriptor.unary.Unary.service, {
        getServerResponse: getServerResponse
    })
    return server;
}

var routeServer = getServer();

routeServer.bind('0.0.0.0:5000', grpc.ServerCredentials.createInsecure());
routeServer.start();

