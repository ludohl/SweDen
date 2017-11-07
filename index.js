var counter = 0;
var userAns = [];
var score = 0; 
var gifs = [
	{
	url: 'img/moose.gif',
	alt: 'Crying moose',
	text: 'Du skal skamme dig!'
	},
	{
	url: 'img/moose2.gif',
	alt: 'alt',
	text: 'Seriously? A moose knows more than you!'
	},
	{
	url: 'img/kongen.gif',
	alt: 'alt',
	text: 'Not half bad!'
	},
	{
	url: 'img/swedengif.gif',
	alt: 'Winner winner chicken dinner',
	text: 'Now we are talking!'
	},
	{
	url: 'img/winner.gif',
	alt: 'Winner winner chicken dinner',
	text: 'Somebody know their Scandinavia! Well played!'
	}
]


var questions = [
{
	question: "This country has a big community that goes to their border and digs away parts of their country.",
	answer: 'sweden',
},
{
	question: "This country has a tradition where they throw cinnamon at the people who are single at the end of the year.",
	answer: 'denmark'
},
{
	question: "This country celebrates their religious holidays by brewing extra strong beer and dressing up in funny hats.",
	answer: 'denmark'
},
{
	question: "This country is owed €300m by North Korea for 1,000 stolen cars and send them reminders every 6 months.",
	answer: 'sweden'
},
{
	question: "This country was the first country to legalize porn in 1969.",
	answer: 'denmark'
}, 
{
	question: "This country has radioactive wild boars in the forest",
	answer: 'sweden'
},
{
	question: "Many cinemas in this country show subtitles on domestic films, because of difficulties understanding different dialects.",
	answer: 'denmark'
},
{
	question: "This country has more pigs than people.",
	answer: 'denmark'
},
{
	question: 'Homosexuality was still classified as an illness in this country in 1979. Citizens protested by calling in sick to work, claiming they "felt gay"',
	answer: 'sweden'
},
{
	question: 'In 2011, a man was arrested in this country for splitting an atom in his kitchen.',
	answer: 'sweden'
}
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

		score = (scoreCount/questions.length)*100;
		$('#ans-msg').text('You scored '+score+ '% correct!');
		$('.guess h3').text('YOUR SCORE:');
		$('.guess h3').after('<div id="neon"><h3>'+scoreCount+ '/'+questions.length+'</h3></div>');
		$('#next').hide();
		$('.buttons').hide();
		$('#numGuesses').closest('h4').hide();	

		console.log(score);
		switch (true)
		{
			case (score <= 20):
				returnScore(0);
				break;
			case (score > 20 && score < 41 ):
				returnScore(1);
				break;
			case (score > 40 && score < 61 ):
				returnScore(2);
				break;
			case (score > 60 && score < 81 ):
				returnScore(3);
				break;
			case (score > 80 && score < 101 ):
				returnScore(4);
				break;
			default: 
				returnScore(0);
				break;
		}	
	} 

}

function returnScore(i) {
	$('#ans-msg').text(gifs[i].text);
	$('.message').append('<img src="'+gifs[i].url+'" alt="'+gifs[i].alt+'">');
	$('.message').after('<button id="play-again" class="btn">Play Again</button>');

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
		$('.buttons .ans').addClass('disabled');
		if (ans === questions[counter].answer) {
			$('#ans-msg').text("That's right! ");
			$('#ans-msg').addClass('success'); 
		} else {
			$('#ans-msg').text('WRONG! FO HELVEDE!');
			$("#ans-msg").addClass('fail'); 
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
		$('.buttons .ans').removeClass('disabled');
		if (counter < questions.length) {
			$('.guess h3').text(questions[counter].question);
			$('.buttons .ans').prop('disabled',false);
			$('#ans-msg').hide();
			$('#ans-msg').removeClass('success fail');
			remaining();
		} else {
			$('#ans-msg').removeClass('success fail');					
			$('.main-bg').css('background-image','url("https://giant.gfycat.com/BelatedMediocreEasternglasslizard.gif")');
			checkScore();
		}
	});

	$('html, body').on('click','#play-again', function(){
		location.reload();
	});


});