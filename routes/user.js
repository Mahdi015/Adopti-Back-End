const express = require("express");
const router = express.Router();

// Controller
const {
  createUser,
  checkUser,
  currentuser,
  updateUser,
  getLovedPets,
  removePetFromWishList,
  getUsers,
  getUsersPetCount,
  createApplication,
  checkUserApplication,
  updateUserAdopterProfile,
  getAllUsers,
} = require("../controllers/user");

// MiddleWares
const { authCheck } = require("../middlewares/auth");
const { admincheck } = require("../middlewares/auth");

//routes
router.post("/user/createUser", authCheck, createUser);
router.post("/user/checkUser", authCheck, checkUser);
router.post("/user/currUser", authCheck, currentuser);
router.put("/user/:userId", authCheck, updateUser);
router.post("/user/getLovedPets", authCheck, getLovedPets);
router.put(
  "/user/removeLovedPets/:removedPet",
  authCheck,
  removePetFromWishList
);
router.post("/user/getUsers", authCheck, admincheck, getUsers);
router.get("/user/getUserPetCount/:userId", getUsersPetCount);
router.post("/user/petApplication", authCheck, createApplication);
router.post("/user/checkPetApplication", authCheck, checkUserApplication);
router.put("/user/update/adopterProfile", authCheck, updateUserAdopterProfile);
router.get("/user/getAllUsers", getAllUsers);

module.exports = router;
