import express from "express";
import gameController from "../controllers/game.controller"
const router = express.Router()

router.post('/gameRequest', (req, res) => {
	gameController.createRequest(req, res);
});

router.get('/joinGame', (req, res) => {
	gameController.joinGame(req, res);
});

// router.post('/getUser', (req, res) => {
// 	userController.getUser(req, res);
// });


export default router;
