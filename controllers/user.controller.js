import userModel from '../models/user.model';
import logger from '../core/logger/app-logger';

let userController = {};

userController.getAll = (req, res) => {
	userModel.getAll()
		.then((answer) => {
	    logger.info('sending all users...');
			res.json(answer);
		})
		.catch((error) => {
	    logger.error('Error in getting users- ' + err);
			res.json(error);
		});

}


userController.getUser = (req, res) => {
	userModel.getUser(req.body.email, req.body.password)
	.then((answer) => {
		logger.info("Got the user information", answer);
		res.json(answer);
	})
	.catch((error) => {
		logger.error('Error in getting the user', error);
		res.json(error);
	});
}


export default userController;
