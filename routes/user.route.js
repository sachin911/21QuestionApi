import express from "express";
import userController from "../controllers/user.controller"
const router = express.Router()

router.get('/allUsers', (req, res) => {
	userController.getAll(req, res);
});

router.post('/getUser', (req, res) => {
	userController.getUser(req, res);
});

router.post('/searchUser', (req, res) => {
	userController.searchUser(req, res);
});


// router.post('/addUser', (req, res) => {
//     carController.addCar(req, res);
// });
//
// router.delete('/deleteUser', (req, res) => {
//     carController.deleteCar(req, res);
// });

export default router;
