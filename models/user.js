const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema ;

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: {
        type: String,
        required: true,
        index: true,
    },
    role:{
        type: String,
        default: "User",
    },
    // PetWhishlist:{
    //     type: Array,
    //     default: [],
    // },
    adresse: String,
    country: String,
    adresseSec: String,
    city: String,
    state: String,
    zipcode: Number,
    picture: String,
    phonenumber: String,
    PetWhishlist: [{type: ObjectId, ref:"Pet"}],
    qs1:{
        type: String,
    },
    qs2:{
        type: String,
    },
    qs3:{
        type: String,
    },
    qs4:{
        type: String,
    },
    qs5:{
        type: String,
    },
    qs6:{
        type: String,
    },

},
    {timestamps: true}
);
module.exports= mongoose.model('User',userSchema)