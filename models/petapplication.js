const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const petApplicationSchema =  mongoose.Schema({
    Pet:{type:ObjectId , ref:'Pet'} ,
    UserRequested:[{type:ObjectId , ref:'User'}], 
    introduction:{
        type: String,
    },
    phonenumber:{
        type: Number,
    },
    applicationStatus :{
        type: String,
        default:'Waiting Review',
        enum:[
            'Waiting Review',
            'Refused',
            'Accepted',
        ],
    },
},
{timestamps:true}
);
module.exports = mongoose.model("PetApplication",petApplicationSchema);