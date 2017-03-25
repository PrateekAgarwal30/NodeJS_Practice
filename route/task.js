var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('mongodb://',['gardes']);
var router = express.Router();
router.get("/",function(req,res,next){
    db.gardes.find(function(err,gardes){
        if(err){
            res.end(err);
        }
        res.json(gardes);
    });
});


// GET REQUEST
router.get('/:id',function(req,res,next){
    db.gardes.findOne({_id : mongojs.ObjectId(req.params.id)},function(err,gardes){
        if(err){
            res.end(err);
        }
        res.json(gardes || "Message not found!");
    });
});

// POST REQUEST 
router.post('/',function(req,res,next){
   var a = req.body;
   db.gardes.findOne({_id : mongojs.ObjectId(req.param.id)},function(err,grades){
    if(grades._id === a._id){
        res.end("Message id already Exist!");
    }else{
           if(!(a.grade) || !(a.class)){
       res.status(400);
       res.json({
           'error' : 'Bad Request' 
       });
   }else{
       db.gardes.save(a,function(err,a){
           if(err){
            res.end(err);
        }else{
           res.send("Message Recieved Sucessfully!");
        }
     });
   }
    }

   });

});

//DELETE MESSAGE
router.delete('/:id',function(req,res,next){
    db.gardes.remove({_id : mongojs.ObjectId(req.params.id)},function(err,gardes){
        if(err){
            res.end(err);
        }else{
            res.send("Message with id "+req.params.id +" deleted Successfully!");
        }
    });
});
//EDIT MESSAGE
router.put('/:id',function(req,res,next){
var a = req.body;
    db.gardes.update({_id : mongojs.ObjectId(req.params.id)},a,{},function(err,gardes){
        if(err){
            res.end(err);
        }else{
            res.send("Message with id "+req.params.id +" updates Successfully!");
        }
    });

});
module.exports = router;
