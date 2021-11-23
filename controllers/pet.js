
const Pet = require('../models/pet')
const User = require('../models/user')
const slugify = require('slugify')
const PetApplication = require('../models/petapplication')

exports.createPet = async(req,res)=>{
    try{
        //const {phonenumber,city,state,zipcode} = req.body
        const user = await User.findOne({email:req.user.email}).exec()
        req.body.slug = slugify(req.body.petname)
        const newPet = await new Pet(req.body).save()
        let update = Pet.findOneAndUpdate({_id:newPet._id},{postedBy:user._id}).exec()
       // let updateUserData = User.findOneAndUpdate({email:req.user.email},{phonenumber,city,state,zipcode}).exec()

        res.json(newPet)
        console.log(newPet)

    }catch (err){   
        console.log(err)
        //res.status(400).send('Creat Product Failed')
        res.status(400).json({
            err: err.message,
        })
    }
}

exports.listPets = async(req,res)=>{
    const {sort,order} = req.body
    let pets = await Pet.find({})
    // .limit(parseInt(3))
    .sort([[sort,order]])
    .exec()
    res.json(pets)
}

exports.petlove = async (req,res) =>{
    const pet = await Pet.findById(req.params.petId).exec()
    const finduser = await User.findOne({email:req.user.email}).exec()
    let existing  = pet.loveArray.find((ele)=>ele.lovedBy == finduser._id.toString())
    if (existing){
        res.json({ok:true})
    }else{
    const  inclovecount = await Pet.findByIdAndUpdate(req.params.petId,{ $inc: { petlove:1} },{new:true}).exec();
    const  addlover = await Pet.findByIdAndUpdate(req.params.petId,{ $push: { loveArray:{lovedBy:finduser._id} }},{new:true}).exec();
    const user = await User.findOneAndUpdate({email:req.user.email},{$addToSet:{PetWhishlist:req.params.petId}},{new:true}).exec()
    res.json({inclovecount,addlover,user});
    console.log(user)
    }
}

exports.changestatus = async (req,res) =>{
    console.log(req.body)
    let reviewStatus = req.body.reviewStatus;
    // console.log(status.toString())
    let  changestatus = await Pet.findByIdAndUpdate(req.params.petId,{reviewStatus},{new:true}).exec();
    res.json(changestatus);
}

exports.listApprovedPets = async(req,res)=>{
    const {sort,order,max} = req.body
    let approvedPets = await Pet.find({reviewStatus:'Approved'})
    .limit(parseInt(max))
    .sort([[sort,order]])
    .exec()
    console.log(req.body)
    res.json(approvedPets)
}

exports.searchfilters = async (req,res) => {
    // let {breed } = req.body.breed
    let {petage ,breed,color,petgenre,petname,coatlength} = req.body.values
    const { page} = req.body.page
    const currentPage = page || 1
    const perPage = 3

    console.log(req.body)


   const search = await Pet.find( {
        $or : [
                 { breed: { $in: breed }  },
                 { petage: { $in: petage } },
                 { petcolor: { $in: color } },
                 { petgender: { $in: petgenre } },
                 { coatlength: { $in: coatlength } },
                 { petname: { $in: petname } },
           
               ]
      } )
    
      .skip((currentPage - 1)*perPage)
      .limit(perPage)
      .exec()
      const pagecount = await Pet.find( {
        $or : [
                 {  breed: { $in: breed }  },
                 { petage: { $in: petage } },
                 { petcolor: { $in: color } },
                 { petgender: { $in: petgenre } },
                 { coatlength: { $in: coatlength } },
                 { petname: { $in: petname } },
           
               ]
      } ).estimatedDocumentCount().exec()
      console.log(search.length)
      res.json({search,pagecount})
        

        //res.json(search)

           
    }
    exports.paginationList = async (req,res) => {
        // let {breed } = req.body.breed
        const { page} = req.body
        const currentPage = page || 1
        const perPage = 3
    

    
    
       const listPagination = await Pet.find({reviewStatus:'Approved'})
          .skip((currentPage - 1)*perPage)
          .limit(perPage)
          .exec()
          res.json(listPagination)    
        }

  
        exports.petCount = async (req,res) =>{
   
            let total = await Pet.find({reviewStatus:'Approved'}).estimatedDocumentCount()
            res.json(total);
       
    }


    exports.getPetByOwner = async (req,res) =>{
        let user = await User.findOne({email:req.user.email}).exec()
        let pet = await Pet.find({postedBy:user._id}).exec()
        res.json(pet);
   
}


exports.removePet = async (req,res) =>{
    let petDelete = await Pet.findByIdAndDelete({_id:req.params.petId}).exec()
    res.json(petDelete);

}
 

exports.getPet = async (req,res) =>{
    let pet = await Pet.findOne({slug:req.params.slug}).exec()
    res.json(pet);
    console.log("eeee",pet)

}

exports.countPetApplications = async (req,res) =>{
    const  countApps = await PetApplication.find({Pet:req.params.petId}).exec()
    res.json(countApps);
}

exports.listPetApplications = async (req,res) =>{
    const  findPet = await Pet.findOne({slug:req.params.slug}).exec()
    const listPetApplication = await PetApplication.find({Pet:findPet._id}).populate('UserRequested').exec()
    res.json(listPetApplication);
}