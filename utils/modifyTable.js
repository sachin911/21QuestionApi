import {db} from '../db/connect';
import logger from '../core/logger/app-logger';
import mysql from 'mysql';
import moment from 'moment';

const modifyTable = {};

modifyTable.insertRow = (tableName, payload) => {
	if(!tableName) return;

	logger.info("inserting a row for the table "+ tableName+ " and the payload = ", payload);
	return new Promise((resolve, reject) => {
		db.query('INSERT INTO '+ tableName +' SET ?', payload, (error, results, fields) => {
			if(error) {
				logger.error("something went wrong while inserting row>>>", error);
				reject(error);
			}else{
				logger.info("the payload is inserted>>>", results);
				resolve({ results });
			}
		})
	})
}

modifyTable.updateRow = (tableName, payload) => {
	if(!tableName) return;

	let type = "", details = [];

	Object.keys(payload).forEach(function(key) {
    console.log(key, payload[key]);
		type = type+" "+key+"= ?,";
		if(key === 'updatedAt'){
			details.push(moment().format('YYYY-MM-DD h:mm:ss'));
		}else{
			details.push(payload[key]);
		}
	});

	type = type.substring(0, type.length-1);
	const sql = mysql.format('UPDATE '+tableName+' SET '+type+' WHERE id ='+payload.id, details);

	return new Promise((resolve, reject) => {
		db.query(sql, function(error, result) {
			if(error) {
				logger.error("something went wrong while updating row>>>", error);
				reject(error);
			}else{
				 logger.info("the payload is updated>>>", result);
				 resolve(result[0]);
			}
		})
	})
}


export default modifyTable;
