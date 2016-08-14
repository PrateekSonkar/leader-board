var express = require('express');
var mongoose = require("mongoose");
var playerProfile = require('./playerProfile');

var router = express.Router();


/*
Method
 */



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',function(req,res){
    console.log("Request received for registering user !!" + JSON.stringify(req.body));
    if(!!req.body.email && !!req.body.username){
        playerProfile.isNewEmail(req.body.email,function(nwEmail){
            console.log("is New email completed !!");
            if(nwEmail.status){
                playerProfile.createNewPlayer({username:req.body.username,email:req.body.email},function(nwPlyr){
                    res.json(nwPlyr);
                });
            } else {
                res.json(nwEmail);
            }
        });
    } else {
        console.log("One or more mandatory params missing !!");
        res.json({status:false,info:"One or more mandatory params missing"});
    }
});

router.post('/updatestats',function(req,res){
    console.log("Request received for stats update for user !!" + JSON.stringify(req.body));
    if(!!req.body.pid && !!req.body.level && !!req.body.timeTaken){
        playerProfile.updateStats(req.body,function(statsStatus){

        });
    } else {

    }

});

module.exports = router;
