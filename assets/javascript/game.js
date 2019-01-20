$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();



$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	clickSound.play();
	generateHTML();

	timerWrapper();

}); 

$("body").on("click", ".answer", function(event){
	
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		

		clearInterval(theClock);
		generateWin();
	}
	else {
		
		clearInterval(theClock);
		generateLoss();
	}
});

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
});

});

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/AMartinezWrong.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/AMartinezCorrect.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/AMartinezWrong.gif'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 2000);
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 9) {
	questionCounter++;
	generateHTML();
	counter = 20;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Retake Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 20;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 20;
var questionArray = ["What year were the LA Kings founded?", "Who was the first Captian of the LA Kings?", "Who is the only Captain in LA Kings history to lead the team to a Stanley Cup victory?", "What year did the LA Kings win their first Stanley Cup?", "What team did the LA Kings defeat to win their first Stanley Cup?", "What team defeated the LA Kings in their first Stanley Cup Final appearance?", "Who scored the first LA Kings goal?", "What year was Wayne Gretzky traded to the LA Kings?", "The LA Kings are members of what Division?", "Who is the LA Kings all time goal leader?"];
var answerArray = [["1983", "1967", "1920", "1976"], ["Dave Taylor","Mike Murphy","Wayne Gretzky","Bob Wall"], ["Dustin Brown", "Anze Kopitar", "Rob Blake", "Wayne Gretzky"], ["2000","2012","1993","2014"], ["Ottawa Senators", "Edmonton Oilers", "Chicago BLackhawks", "New Jersey Devils"], ["Montreal Canadiens","Detroit Red Wings","Boston Bruins","Hartford Whalers"], ["Howie Hughes", "Terry Gray", "Brian Kilrea", "Real Lemieux"], ["1990","1980","1988","1992"], ["Pacific Divison", "Central Devision", "Metropolitan Divison", "Atlantic Division"], ["Bernie Nichols", "Marcel Dionne", "Charlie Simmer", "Luc Robitaille"]];
var correctAnswers = ["B. 1967", "D. Bob Wall", "A. Dustin Brown", "B. 2012", "D. New Jersey Devils", "A. Montreal Canadiens", "C. Brian Kilrea", "C. 1988", "A. Pacific Divison", "D. Luc Robitaille"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sound/button-click.mp3");
