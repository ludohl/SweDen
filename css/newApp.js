document.ready(function() {

	var app = {
		
		options: {
			counter: 0,
			userAns: [],
			score: 0,
			gifs: [{}],
			questions: [{}],
		},

		init: function() {
			if (counter === 0 ) {
				$('.guess h3').text(this.options.questions[0].question);
			}

			remaining();
		},

		checkScore: function() {
			if (questions.length === counter) {
				var scoreCount = 0;
				for (var i = 0; i < questions.length; i++) {
					if (questions[i].answer.toLowerCase() === userAns[i]) {
						scoreCount++;
					}
				}

				console.log(gifs[0].url);
				score = (scoreCount/this.options.questions.length)*100;
				$('#ans-msg').text('You scored '+score+ '% correct!');
				$('.guess h3').text('YOUR SCORE:');
				$('.guess h3').after('<div id="neon"><h3>'+scoreCount+ '/'+questions.length+'</h3></div>');
				$('#next').hide();
				$('.buttons').hide();
				$('#numGuesses').closest('h4').hide();	

				if (score <= 20) {
					this.returnResult(0);
				}		
				else if (score > 20 && score < 41 ) {
					this.returnResult(1);
				}
				else if (score > 40 && score < 61 ) {
					this.returnResult(2);
				}
				else if (score > 60 && score < 81 ) {
					this.returnResult(3);
				}
				else if (score > 80 && score < 101 ) {
					this.returnResult(4);
				}
			} 
		},

		returnResult: function(number) {
			var $ansMsg = ('#ans-msg');
			var $heading = $('.guess h3');
			var $message = $('.message');

			$ansMsg.text(this.options.gifs[number].text);
			$message.append('<img src="'+this.options.gifs[number].url+'alt="'+this.options.gifs[number].alt+'">');
		},

		remaining: function() {
			var remain = this.options.questions.length - this.options.counter;
			$('.guess #numGuesses').text(counter+1+'/'+questions.length);
		},

	}


	$('.buttons .ans').on('click', function() {
		var ans = $(this).text().toLowerCase();
		console.log(ans)
		if (ans === app.options.questions[app.options.counter].answer) {
			$('#ans-msg').text('Rätt svar! Välfärd! Kungen! Älg!');
			$(this).addClass('success'); 
		} else {
			$('#ans-msg').text('FEL FO HELVEDE MADS!');
			$(this).addClass('fail'); 
		}
		app.options.userAns.push(ans);
		$('#ans-msg').show();
		$('.ans').prop('disabled',true);
		if (app.options.counter < app.options.questions.length-1) {
			$('#next').show();
		} else {
			$('#next').show().text('Show Result');
		}
		app.options.counter++;
	});


	$('#next').on('click', function() {
		$(this).hide();
		if (app.options.counter < app.options.questions.length) {
			$('.guess h3').text(questions[counter].question);
			$('.buttons .ans').prop('disabled',false);
			$('#ans-msg').hide();
			$('.buttons .ans').removeClass('success fail');
			app.remaining();
		} else {
			$('.main-bg').css('background-image','url("https://giant.gfycat.com/BelatedMediocreEasternglasslizard.gif")');
			app.checkScore();
		}
	});
});