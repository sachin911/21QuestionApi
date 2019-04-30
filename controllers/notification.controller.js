import notificationModel from '../models/notification.model';
import gameModel from '../models/game.model';
import logger from '../core/logger/app-logger';

let notificationController = {};

notificationController.getNotifications = (req, res) => {
	notificationModel.fetchNotifications(req.body.userId)
	.then((answer) => {
		logger.info("Got the no†ifications for the userId>>", req.body.userId, answer);
		res.json(answer);
	})
	.catch((error) => {
		logger.error('Error in getting the no†ifications', error);
		res.json(error);
	});
}

export default notificationController;
