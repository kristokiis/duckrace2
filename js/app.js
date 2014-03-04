var app = {
	
	init: function() {
		
		$('.start-rally').click(function() {
			$('#rulesContainer').hide();
			$('#gameContainer').fadeIn();
			game.init();
		});
		
	},
	
	finishGame: function() {
		$('#gameContainer').hide();
		$('#finishContainer').fadeIn();
		
		$('#duckScroller').animateNumber({ number: 453 }, 5000);
		
		$('.start-again').click(function() {
			$('#finishContainer').hide();
			$('#gameContainer').fadeIn();
			game.init();
		});
		
	}
 	
}

var MAX_DUCK_SIZE = 100;
var MIN_DUCK_SIZE = 10;
var DUCK_START_POS = 605;

var LEVEL = 1;

var DUCK = '<span class="duck"><strong>Prääks-prääks, olen vale part</strong><img src="assets/img/duck.png" /></span>';

var levels = {
	1: {'js': 4500, 'css': 5, 'rounds': 2},
	2: {'js': 4000, 'css': 4.5, 'rounds': 3},
	3: {'js': 3500, 'css': 4, 'rounds': 4},
	4: {'js': 3000, 'css': 3.5, 'rounds': 5},
	5: {'js': 2500, 'css': 3, 'rounds': 6},
};

game = {
	
	curLevel: 1,
	ducks_index: 2,
	
	init: function() {
		
		$('.scene').html('');
		
		for (i=0;i<7;i++) {
		     
			var x = (95*i) + 10;  
		
			$('.scene').append(DUCK);
			$('.scene').find('.duck:last').attr('id', 'duck_' + (i+1)).css({top: DUCK_START_POS, left: x});
			
			$('.start-sign').css('z-index', '1');
			
		}
		
		$('.level-range').change(function() {
			
			console.log($(this).val());
			
			LEVEL = parseInt($(this).val());
			
		});
		
		game.pickWinker();
		
	},
	
	pickWinker: function() {
		
		var randDuck = getRandomArbitary(1, 7);
		console.log(randDuck);
		
		$('#duck_' + randDuck).addClass('special');
		
		setTimeout(function() {
			$('#duck_' + randDuck).find('img').attr('src', 'assets/img/duck_side.png');
		}, 1000);
		setTimeout(function() {
			$('#duck_' + randDuck).find('img').attr('src', 'assets/img/duck_side_wink.png');
		}, 1500);
		
		setTimeout(function() {
			$('#duck_' + randDuck).find('img').attr('src', 'assets/img/duck_side.png');
		}, 2000);
		
		setTimeout(function() {
			$('#duck_' + randDuck).find('img').attr('src', 'assets/img/duck.png');
		}, 2500);
		
		setTimeout(function() {
			
			game.rideDucks();
				
		}, 3000);
		
	},
	
	rideDucks: function() {

		for (i=0;i<7;i++) {
		  
			var x = (17*i) + 240;
			
			var y = 590 + (10*i);
		
			$('#duck_' + (i+1)).css({left: 300, top: y});
		}
		
		$('.duck').addClass('riding');
		
		setTimeout(function() {
		
			$('.start-sign').css('z-index', '9999');
			
			for (i=0;i<7;i++) {
				
				var y = 330 + (10*i);
				
				$('#duck_' + (i+1)).css({top: y});
			}
			
			setTimeout(game.psychoDucks, 4000);
			
		}, 4000);
		
	},
	
	psychoDucks: function() {
		
		var last_y = 0;
		
		for (i=0;i<7;i++) {

		  	var x = getRandomArbitary(100, 650);
		  	var y = getRandomArbitary(250, 380);
		  	
		  	var duck = $('#duck_' + (i+1));
			
			duck.css({left: x, top: y});
		  	
		  	if (y > last_y) {
			  	duck.css('z-index', game.ducks_index++);
			  	last_y = y;
		  	}

		}
		
		game.curLevel++;
		
		console.log(LEVEL + 'ja' + game.curLevel);
		
		if (LEVEL >= game.curLevel) {
			setTimeout(game.psychoDucks, 4500);
		} else {
			$('.duck').addClass('finished');
			game.winnerPicker();
		}
		
	},
	
	winnerPicker: function() {
		$('.duck').unbind('click');
		$('.duck').click(function() {
			
			var duck = $(this);
			
			duck.css('z-index', game.ducks_index++);
			
			if (duck.hasClass('special')) {
			 	
				duck.find('img').attr('src', 'assets/img/duck_sider.png');
			 
				$('.special').css({left: 380, top: 230});
			 
				setTimeout(function() {
					$('.special').css({left: 640, top: 10});
					
					setTimeout(function() {
						
						app.finishGame();
						
					}, 4500)
					
				}, 4000);
				 
				 
			} else {
				duck.find('strong').show();
				setTimeout(function() {
					duck.find('strong').fadeOut();
				}, 2000);
			}
			
		});
	}
	
	
}

app.init();

//HELPERS

function getRandomArbitary (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}