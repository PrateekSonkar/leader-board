var shortId = require('shortid');
var mongoose = require("mongoose");
var player = mongoose.model("player");
var validator = require('validator');
var playerProfile = {};

playerProfile.isNewEmail = function(email,cb){
    console.log("Into isNewEmail " + email);
    if(validator.isEmail(email)){
        console.log("email format correct");
        player.findOne({emailID:email},{emailID:1},function(err,result){
            if(!err){
                console.log("No error in isNewEmail !! " + result);
                if(!result){
                    console.log("No user registered with this email id");
                    cb({status:true,info:"No user registered with this email id"});
                } else {
                    console.log("Email already used !!");
                    cb({status:false,info:"Email already used"});
                }
            } else {
                console.log("Error occurred while executing query " + err);
                cb({status:false,info:"Error occurred while executing query"})
            }
        });
    } else {
        console.log("Invalid emailId format");
        cb({status:false,info:"Invalid emailId format"});
    }
};

playerProfile.createNewPlayer = function(playerObject,cb){
    console.log("Into createNewPlayer : " + JSON.stringify(playerObject));
    var newPlayer = new player();
    newPlayer.name = playerObject.username;
    newPlayer.emailID = playerObject.email;
    newPlayer.uniqueToken = shortId.generate();
    newPlayer.level = 0;
    newPlayer.timeTaken = 0;
    newPlayer.save(function(err,newPlayerSaved){
        if(!err && newPlayerSaved){
            console.log("Created new player !!");
            cb({status:true,playerIdentifier:newPlayerSaved.uniqueToken,info:"New player created !!"});
        } else {
            console.log("Unable to created new player, with error " + err);
            cb({status:false,info:"Unable to created new player, please try again later"});
        }
    });
};

playerProfile.updateStats = function(playerObject,cb){
    player.findOneAndUpdate({uniqueToken:playerObject.pid},{
        $set:{
            level : playerObject.level,
            timeTaken : playerObject.timeTaken
        }
    },{upsert:false,new:true},function(err,updatedScore){
        if(!err && updatedScore){
            console.log("Score updated !!");
            cb({status:true,info:"Score is updated !!"});
        } else {
            console.error("Error occurred while updating the scores : " + err);
            cb({status:false,info:"Something went wrong !!"});
        }
    });
};

module.exports = playerProfile;
