import express from "express";
import friendController from "../controllers/friend.controller"
const router = express.Router()

// router.get('/allUsers', (req, res) => {
// 	friendController.getAll(req, res);
// });

router.post('/friendList', (req, res) => {
	friendController.getFriendList(req, res);
});


// router.post('/addUser', (req, res) => {
//     carController.addCar(req, res);
// });
//
// router.delete('/deleteUser', (req, res) => {
//     carController.deleteCar(req, res);
// });

export default router;
