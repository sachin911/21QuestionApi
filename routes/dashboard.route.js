import express from "express";
import dashboardController from "../controllers/dashboard.controller"
const router = express.Router()

router.get('/dashboardData', (req, res) => {
	dashboardController.fetchDashboardData(req, res);
});


export default router;
