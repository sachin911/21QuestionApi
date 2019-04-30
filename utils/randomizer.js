const randomizer = {};

const randomIntFromInterval = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}

randomizer.randomizePlayers = (player1, player2) => {
	const random = randomIntFromInterval(0,100);
	let questionPerson;
	let answerPerson;

	if(random <=50){
		questionPerson = player1;
		answerPerson = player2;
	}else{
		questionPerson = player2;
		answerPerson = player1;
	}

	return {
		questionPerson,
		answerPerson
	}

}

export default randomizer;
