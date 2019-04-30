import {db} from '../db/connect';
import modifyTable from '../utils/modifyTable';
import mysql from 'mysql';

const gameModel = {};

gameModel.getGame = (gameId) => {
	return new Promise((resolve, reject) => {
		db.query("Select * from game where id="+gameId+" and (game.status!='FINSIHED')", (error, results, fields) => {
			if(error) {
				reject(error);
			}else if(results.length == 0){
				resolve({
					message:"The game was not found",
					error: "no game"
				});
			}else{
				resolve(results[0]);
			}
		})
	})
}

export default gameModel;
