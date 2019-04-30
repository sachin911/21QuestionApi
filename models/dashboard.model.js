import {db} from '../db/connect';
import mysql from 'mysql';

const dashboardModel = {};

dashboardModel.loadDashboardForUser = (userId) => {
	return new Promise((resolve, reject) => {
    db.query("Select * from user where id='"+userId+"' limit 1"
		, (error, results, fields) => {
      if (error) {
        reject(error); // similar to "throw"
      }
      else { 
				delete results[0].password;
				resolve(results[0]);
      }
    });
  });
}

export default dashboardModel;
