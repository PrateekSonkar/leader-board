/**
 * Created by prateek on 13/8/16.
 */
var mongoose = require("mongoose");
var player = mongoose.model("player");

var playerReport = {};

playerReport.getAllPlayers = function(pid,cb){
    player.find();
    var rank = player.find({});
    rank.select("uniqueToken name level timeTaken");
    rank.sort({level:-1,timeTaken:1});
    rank.exec(function(err,queryResult){
        console.log("Query executed !! ERROR : " + err);
        if(!err && queryResult){
            console.log("Dashboard entries : " + queryResult);
            cb({status:true,record:queryResult,pid:pid});
        } else {
            console.log("Error occured while fetching the data from server !! " + err);
            cb({status:false,info:"Error occured while fetching the data from server !!"});
        }
    });
};


// lots of work to do here
playerReport.getPlayersRank = function(pid,playerArray,cb){
    console.log("Into getPlayersRank ");
    var pos = playerArray.map(function(e) { return e.uniqueToken; }).indexOf(pid);
    cb({status:true,position:pos});
};


module.exports = playerReport;
