CREATE TABLE `user` (
  `name` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'ACTIVE',
  `password` varchar(45) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
	`win` int DEFAULT 0,
	`loss` int DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
	'loggedInStatus' varchar(20),
  PRIMARY KEY (`id`),
	UNIQUE(`email`)
)

CREATE TABLE friend (
	`id` INT NOT NULL AUTO_INCREMENT,
	`friendA` int NOT NULL,
	`friendB` int NOT NULL,
	`status` varchar(10),
	`createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY(id),
	FOREIGN KEY(friendA) REFERENCES user(id),
	FOREIGN KEY(friendB) REFERENCES user(id),
  UNIQUE(friendA, friendB)
);

CREATE TABLE game (
	id int primary key not null AUTO_INCREMENT,
	friendshipId int not null,
	status varchar(10),
	questionPerson int,
	answerPerson int,
	topic varchar(45),
	section varchar(45),
	remainingQuestions int default 21,
	winner int,
	loser int,
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NULL DEFAULT NULL,
	FOREIGN KEY(friendshipId) REFERENCES friend(id),
	FOREIGN KEY(questionPerson) REFERENCES user(id),
	FOREIGN KEY(answerPerson) REFERENCES user(id),
	FOREIGN KEY(winner) REFERENCES user(id),
	FOREIGN KEY(loser) REFERENCES user(id)
);

CREATE TABLE question (
	id int primary key not null AUTO_INCREMENT,
	gameId int not null,
	question varchar(100),
	answerGiven varchar(10),
	questionStatus varchar(10),
	questionNumber int,
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NULL DEFAULT NULL,
	FOREIGN KEY(gameId) REFERENCES game(id)
);


create table notification (
	id int primary key not null AUTO_INCREMENT,
	userId int not null,
	requesterId int not null,
	gameId int,
	friendshipId int,
	status varchar(10),
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NULL DEFAULT NULL,
	FOREIGN KEY(gameId) REFERENCES game(id),
	FOREIGN KEY(userId) REFERENCES user(id),
	FOREIGN KEY(requesterId) REFERENCES user(id),
	FOREIGN KEY(friendshipId) REFERENCES friend(id)
)
