import express from "express";
import notificationController from "../controllers/notification.controller"
const router = express.Router()

router.post('/fetchNotifications', (req, res) => {
	notificationController.getNotifications(req, res);
});


export default router;
