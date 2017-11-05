var counter = 0;
var userAns = [];
var score = 0; 
var gifs = [
	{
	url: 'img/moose.gif',
	alt: 'Crying moose',
	text: 'No viking blood in your veins!'
	},
	{
	url: 'img/moose.gif',
	alt: 'alt',
	text: 'No viking blood in your veins!'
	},
	{
	url: 'img/moose.gif',
	alt: 'alt',
	text: 'No viking blood in your veins!'
	},
	{
	url: 'img/winner.gif',
	alt: 'Winner winner chicken dinner',
	text: 'No viking blood in your veins!'
	},
	{
	url: 'img/winner.gif',
	alt: 'Winner winner chicken dinner',
	text: 'Somebody did their homework! Well played!'
	}
]


var questions = [
{
	question: "Question 1?",
	answer: 'sweden'
},
{
	question: "Question 2",
	answer: 'denmark'
},
{
	question: "Question 3",
	answer: 'sweden'
},
{
	question: "Question 4",
	answer: 'denmark'
},
{
	question: "Question 5",
	answer: 'denmark'
},
];

function remaining() {
	var remain = questions.length - counter;
	$('.guess #numGuesses').text(counter+1+'/'+questions.length);
}

function checkScore() {
	if (questions.length === counter) {
		var scoreCount = 0;
		for (var i = 0; i < questions.length; i++) {
			if (questions[i].answer.toLowerCase() === userAns[i]) {
				scoreCount++;
			}
		}

		console.log(gifs[0].url);
		score = (scoreCount/questions.length)*100;
		$('#ans-msg').text('You scored '+score+ '% correct!');
		$('.guess h3').text('YOUR SCORE:');
		$('.guess h3').after('<div id="neon"><h3>'+scoreCount+ '/'+questions.length+'</h3></div>');
		$('#next').hide();
		$('.buttons').hide();
		$('#numGuesses').closest('h4').hide();	

		if (score <= 20) {
			$('#ans-msg').text(gifs[0].text);
			$('.message').append('<img src="'+gifs[0].url+'" alt="'+gifs[0].alt+'">')
		}		
		else if (score > 20 && score < 41 ) {
			$('#ans-msg').text(gifs[1].text);
			$('.message').append('<img src="'+gifs[1].url+'" alt="'+gifs[1].alt+'">');
		}
		else if (score > 40 && score < 61 ) {
			$('#ans-msg').text(gifs[2].text);
			$('.message').append('<img src="'+gifs[2].url+'" alt="'+gifs[2].alt+'">');
		}
		else if (score > 60 && score < 81 ) {
			$('#ans-msg').text(gifs[3].text);
			$('.message').append('<img src="'+gifs[3].url+'" alt="'+gifs[3].alt+'">');

		}
		else if (score > 80 && score < 101 ) {
			$('#ans-msg').text(gifs[4].text);
			$('.message').append('<img src="'+gifs[4].url+'" alt="'+gifs[4].alt+'">');
		}
	} 

}

$(document).ready(function() {

	if (counter === 0) {
		$('.guess h3').text(questions[0].question);
	}

	$('.header .btn').on('click', function() {
		var $container = $('.main-bg');
		$("html, body").animate({ scrollTop: $('.main-bg').position().top }, 400);
	})

	remaining();

	$('.buttons .ans').on('click', function() {
		var ans = $(this).text().toLowerCase();
		console.log(ans)
		if (ans === questions[counter].answer) {
			$('#ans-msg').text('Rätt svar! Välfärd! Kungen! Älg!');
			$(this).addClass('success'); 
		} else {
			$('#ans-msg').text('FEL FO HELVEDE MADS!');
			$(this).addClass('fail'); 
		}
		userAns.push(ans);
		$('#ans-msg').show();
		$('.ans').prop('disabled',true);
		if (counter < questions.length-1) {
			$('#next').show();
		} else {
			$('#next').show().text('Show Result');
		}
		counter++;
	});

	$('#next').on('click', function() {
		$(this).hide();
		if (counter < questions.length) {
			$('.guess h3').text(questions[counter].question);
			$('.buttons .ans').prop('disabled',false);
			$('#ans-msg').hide();
			$('.buttons .ans').removeClass('success fail');
			remaining();
		} else {
			$('.main-bg').css('background-image','url("https://giant.gfycat.com/BelatedMediocreEasternglasslizard.gif")');
			checkScore();
		}
	});


});