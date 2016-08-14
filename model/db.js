/**
 * Created by prateek on 11/8/16.
 */

var mongoose = require( 'mongoose' );
// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/leaderboard';
// if OPENSHIFT env variables are present, use the available connection info:
console.log(connection_string);
// Create the database connection
mongoose.connect(connection_string);

// Define connection events
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + connection_string);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

var player =  new mongoose.Schema({
    name : {type:"String"},
    emailID : {type:"String",unique:true},
    uniqueToken:{type:"String"},
    level : {type:"Number"},
    timeTaken : {type:"Number"}
});
player.index({uniqueToken:1});
player.index({level:1,timeTaken:1})
mongoose.model('player',player);



