const User = require('../models/user')


exports.currentuser = async (req,res) =>{
    User.findOne({email:req.user.email}).exec((err,user)=>{
        if (err) throw new error(err);
        res.json(user);
    });
};