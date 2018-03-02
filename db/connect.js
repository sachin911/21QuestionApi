import mysql from 'mysql';
var db;

const connectDatabase = () => {
  if (!db) {
    db = mysql.createConnection({
			host: 'localhost',
	    user: 'root',
	    password: 'root',
			port: '8889',
			database : '21Question'
		});

    db.connect(function(err){
      if(!err) {
          console.log('Database is connected!');
      } else {
          console.log('Error connecting database!', err);
      }
    });
  }
  return db;
}

export { connectDatabase, db};
