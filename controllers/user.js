const User = require("../models/user");
const Pet = require("../models/pet");
const PetApplication = require("../models/petapplication");
exports.createUser = async (req, res) => {
  const { fname, lname, adresse, googleLogin } = req.body;

  const user = await User.findOne({ email: req.user.email });
  try {
    if (user) {
      console.log("User Already Created");
      res.json(user);
    } else {
      const newUser = await new User({
        email: req.user.email,
        fname,
        lname,
        adresse,
        picture: req.user.picture,
      }).save();
      console.log("New User Aded");
      res.json(newUser);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.checkUser = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  try {
    console.log("Hello");
    if (user) {
      console.log("User Already Created");
      res.json(user);
    } else {
      res.json({ ok: true });
      console.log("Complete your registration");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.currentuser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new error(err);
    res.json(user);
  });
};

exports.updateUser = async (req, res) => {
  const userData = req.body.userData;
  const {
    fname,
    lname,
    phonenumber,
    country,
    adresse,
    adresseSec,
    city,
    state,
    zipcode,
    picture,
  } = userData;
  console.log(userData);
  const update = await User.findOneAndUpdate(
    { email: req.user.email },
    {
      fname,
      lname,
      phonenumber,
      country,
      adresse,
      adresseSec,
      city,
      state,
      zipcode,
      picture,
    },
    { new: true }
  ).exec();
  res.json(update);
};

exports.getLovedPets = async (req, res) => {
  const user = await User.findOne({ email: req.user.email })
    .select("PetWhishlist")
    .populate("PetWhishlist")
    .exec();
  res.json(user);
  console.log(user);
};

exports.removePetFromWishList = async (req, res) => {
  console.log(req.params.removedPet.toString());
  const pet = await Pet.findById(req.params.removedPet).exec();
  const findUser = await User.findOne({ email: req.user.email }).exec();
  let existing = pet.loveArray.find(
    (ele) => ele.lovedBy.toString() === findUser._id.toString()
  );
  const update = await Pet.findOneAndUpdate(
    { _id: req.params.removedPet },
    { $pull: { loveArray: existing }, $inc: { petlove: -1 } },
    { new: true }
  ).exec();
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { PetWhishlist: req.params.removedPet } },
    { new: true }
  ).exec();
  res.json({ user, update });
};

exports.getUsers = async (req, res) => {
  const users = await User.find({ role: "User" }).exec();
  res.json(users);
};

exports.getUsersPetCount = async (req, res) => {
  console.log("here");
  const UserId = req.params.userId;
  const count = await Pet.find({ postedBy: UserId }).countDocuments().exec();
  res.json(count);
  console.log(count);
};

exports.createApplication = async (req, res) => {
  const { petName, introduction, phonenumber } = req.body.values;
  const pet = await Pet.findOne({ petname: petName }).exec();
  const petowner = await Pet.findOne({ petname: petName })
    .select("postedBy")
    .populate("postedBy")
    .exec();
  console.log(petowner.postedBy);
  const user = await User.findOne({ email: req.user.email }).exec();
  const newApplication = await new PetApplication({
    Pet: pet._id,
    UserRequested: user._id,
    introduction,
    phonenumber,
  }).save();
  console.log("New Application Aded");
  res.json({ petowner });
};

exports.checkUserApplication = async (req, res) => {
  const { petId } = req.body;
  const user = await User.findOne({ email: req.user.email }).exec();
  console.log(req.body, petId, user._id);
  const checkApplication = await PetApplication.findOne({
    Pet: petId,
    UserRequested: user._id,
  })
    .countDocuments()
    .exec();
  console.log(checkApplication);
  res.json(checkApplication);
};

exports.updateUserAdopterProfile = async (req, res) => {
  const values = req.body.values;
  const { qs1, qs2, qs3, qs4, qs5 } = values;
  console.log(values);
  const update = await User.findOneAndUpdate(
    { email: req.user.email },
    { qs1, qs2, qs3, qs4, qs5 },
    { new: true }
  ).exec();
  res.json(update);
};

exports.getAllUsers = async (req, res) => {
  const Users = await User.find().exec();
  res.json(Users);
};
