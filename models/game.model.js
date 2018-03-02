import {db} from '../db/connect';
import modifyTable from '../utils/modifyTable';
import mysql from 'mysql';

const gameModel = {};

gameModel.getUser = (email, password) => {
	return new Promise((resolve, reject) => {
		db.query("Select * from user where email='"+email+"' and password='"+password+"'", (error, results, fields) => {
			if(error) {
				reject(error);
			}else if(results.length == 0){
				resolve({
					message:"The email and password combination is not found",
					error: "no user"
				});
			}else{
				results[0].loggedInStatus = "ONLINE";
				modifyTable.updateRow("user", results[0]);
				delete results[0].password;
				resolve(results[0]);
			}
		})
	})
}

export default gameModel;
