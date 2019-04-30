import dashboardModel from '../models/dashboard.model';
import logger from '../core/logger/app-logger';

let dashboardController = {};

dashboardController.fetchDashboardData = (req, res) => {
	dashboardModel.loadDashboardForUser(req.query.userId)
	.then((answer) => {
		logger.info("Got the dashboard data for the user>>", req.query.userId, answer);
		res.json(answer);
	})
	.catch((error) => {
		logger.error('Error in getting the dashboard data', error);
		res.json(error);
	});
}

export default dashboardController;
