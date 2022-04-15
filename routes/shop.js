const express = require('express');
const router = express.Router();
const auth = require("./../middleware/auth");
const User = require('../models/User');

// router.post(
//   '/add',
//   auth, 
//   async (req, res) => {

//     await User.updateOne({
//       id: req.body.id
//     },{$push:{}})

// });  
router.post(
  '/add',
  auth,
  async(req,res)=>{
    
    var query={username: req.body.username};
    
    User.findOneAndUpdate(query, {$push:{item: req.body.item}},{safe:true,upsert:true},
      function(err, User) {
        res.send({message: 'Added Item!'});
      } 
     
    );
    }
);

router.delete(
  '/delete',
  auth,
  async(req,res)=>{
    
    var query={username: req.body.username};
    
    User.findOneAndUpdate(query, {$pull:{item: req.body.item}},{safe:true,upsert:true},
      function(err, User) {
        res.send({message: 'Deleted Item!'});
      } 
     
    );
    }
);

router.get(
  '/list',
  auth,
  async(req,res)=>{
    try{
      
      const user = await User.findById(req.user.id);
      res.json(user);
      
    } catch(e){
      res.send({message: 'Error in Fetching user'});
    }
  }
)

module.exports = router;