import socketIo from "socket.io";

let socket;
let io;
const socketConnection = (server) => {
	io = socketIo(server, { "Access-Control-Allow-Origin": "http://localhost:3001/"});

	io.on("connection", socket => {
		socket.join('joinGame');
		socket.on("joinGame", (gameData) => {
			socket.join(gameData.id);
			// console.log("in the gameID room>>>", socket.adapter.rooms[gameData.id].length);
			let bothPlayersJoined = (socket.adapter.rooms[gameData.id].length === 2);
			gameData.bothPlayersJoined = bothPlayersJoined;

			// socket.broadcast().in(gameData.id, gameData);
			io.in(gameData.id).emit(gameData.id, gameData);
		});
	});
	io.on("disconnect", () => console.log("Client disconnected >>>>>>"));
}

export { socketConnection, socket, io};
