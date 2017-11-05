var counter = 0;

var userAns = [];
var score = 0; 

var questions = [
{
	question: "Zlatan?!",
	answer: 'sweden'
},
{
	question: "Raketdansken?!",
	answer: 'denmark'
},
{
	question: "Älg och lingon??",
	answer: 'sweden'
},
{
	question: "LEGO??",
	answer: 'denmark'
},
{
	question: "Polse o tuborg?",
	answer: 'denmark'
},
]

function checkScore() {
	console.log(questions.length);
	if (questions.length === counter) {
		var scoreCount = 0;
		for (var i = 0; i < questions.length; i++) {
			if (questions[i].answer.toLowerCase() === userAns[i]) {
				scoreCount++;
			}
		}

		score = (scoreCount/questions.length)*100;
		$('#msg').text('You got '+scoreCount+ '/'+questions.length+' answers correct!');
		$('#next').hide();
		$('.button').hide();
	} 

}

$(document).ready(function() {
	console.log(questions.length)

	if (counter === 0) {
		$('#question').text(questions[0].question);
	}

	$('.button').on('click', function() {
		var ans = $(this).text().toLowerCase();
		if (ans === questions[counter].answer) {
			$('#msg').text('Rätt svar! Välfärd! Kungen! Älg!');
		} else {
			$('#msg').text('FEL FO HELVEDE MADS!');
		}
		userAns.push(ans);
		$('#msg').show();

		$('.button').prop('disabled',true);
		$('#next').show();
		counter++;
	});

	$('#next').on('click', function() {
		$(this).hide();
		checkScore();
		if (counter < questions.length) {
			$('#question').text(questions[counter].question);
			$('.button').prop('disabled',false);
			$('#msg').hide();
		} else {
			console.log(userAns);
			checkScore();
		}
	});


});