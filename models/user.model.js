import {db} from '../db/connect';
import modifyTable from '../utils/modifyTable';
import mysql from 'mysql';

const userModel = {};

userModel.getAll = () => {
	return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user", (error, results, fields) => {
      if (error) {
        reject(error); // similar to "throw"
      }
      else {
        resolve({ results }); // similar to "return"
      }
    });
  });
}

userModel.getUser = (email, password) => {
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

userModel.getUserwithId = (userId) => {
	return new Promise((resolve, reject) => {
		db.query("Select * from user where user.id="+userId+" and user.status='ACTIVE'", (error, results, fields) => {
			if(error) {
				reject(error);
			}else if(results.length == 0){
				resolve({
					message:"The user doesnt exists",
					error: "no user"
				});
			}else{
				delete results[0].password;
				resolve(results[0]);
			}
		})
	})
}

userModel.searchUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		db.query("select * from user where email = '"+email+"' and status = 'ACTIVE'", (error, results, fields) => {
			if (error) {
				reject(error);
			}else if(results.length == 0){
				resolve({
					message:"The user doesnt exists",
					error: "no user"
				});
			}else{
				delete results[0].password;
				resolve(results[0]);
			}
		})
	})
}


export default userModel;
