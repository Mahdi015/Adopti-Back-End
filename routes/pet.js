const express = require("express")
const router = express.Router();


// Controller
const {createPet,listPets,petlove,changestatus,listApprovedPets,
    searchfilters,paginationList,petCount,getPetByOwner,removePet,getPet,countPetApplications,listPetApplications} = require('../controllers/pet');

// MiddleWares
const {authCheck} = require("../middlewares/auth");

//routes
router.post('/pet/createPet',authCheck,createPet)
router.post('/pet/listPets',listPets)
router.post('/pet/listApprovedPets',listApprovedPets)
router.put('/pet/petlove/:petId',authCheck,petlove)
router.put('/pet/status/:petId',authCheck,changestatus)
router.post('/pet/find',searchfilters)
router.post('/pet/paginationList',paginationList)
router.get('/pet/count',petCount)
router.post('/pet/getPetByOwner',authCheck,getPetByOwner)
router.put('/pet/deletePet/:petId',authCheck,removePet)
router.get('/pet/:slug',getPet)
router.post('/pet/petApplication/:petId',authCheck,countPetApplications)
router.post('/pet/listApps/:slug',authCheck,listPetApplications)



module.exports = router;