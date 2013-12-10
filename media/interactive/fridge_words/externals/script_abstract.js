$(document).ready(function() {
	var numDivs = 15;
	var highestIndex = 0;
	var currentIndex = 0;
	window.relativeX = 0;
	window.relativeY = 0;
	window.generatedIndexes = [];

	var words = [];
	$.getJSON("externals/words.json", function(data) {
		words = data.words;
		//console.log("The length of data is " + data.words.length);
		fridgeSwap();
		
		// creating magnets
		var randIndex = Math.floor(Math.random()*words.length);
		for (var i = 0; i < numDivs; i++) {
			if (i <= 2) { // 
				if (i == 0) { // creates three magnets at once
					createFirstMagnets(words, randIndex);
				}
			}
			else {
				makeMagnet(words, randIndex);
			}
		}

		// adding class on mousedown, etc
		$(".magnet").mousedown(function(e) {
			var offset = $(this).offset();
			window.relativeX = (e.pageX - offset.left);
			window.relativeY = (e.pageY - offset.top);
			$(this).addClass("dragging");
			// making the clicked magnet come to the top
			var currentIndex = parseInt($(this).css("z-index"));
			if (highestIndex > currentIndex) {
				currentIndex = highestIndex + 1;
			}
			$(this).css("z-index", currentIndex);
			highestIndex++;
		});
		// removing the class on mouseup
		$("*").mouseup(function() {
			$(".magnet").removeClass("dragging");
			$(".lightbox").fadeOut("fast");
		});
	});

	// oulipo's n+7 constraint
	setInterval(function() {
			var randMag = $(".magnet")[Math.floor(Math.random()*numDivs)];
			var randWord = $(randMag).children().html();
			var oldWordIndex = findWord(words, randWord);
			var oldWordPos = findWordPos(words, randWord);
			var newWord = searchWord(words, oldWordIndex, oldWordPos);
			$(randMag).html("<span>" + newWord + "</span>");
			console.log(randWord + " -> " + newWord);
	}, Math.random()*4000 + 2000);
});

function fridgeSwap() {
	// swaps the d/n in fri[d/n]ge
	setInterval(function() {
		$('#header').html('fringe words');
	}, 5350); // <- 5.35 seconds
	setInterval(function() {
		$('#header').html('fridge words');
	}, 5500); // <- 5.5 seconds
}

function createFirstMagnets(words, randIndex) {
	// creates the noun of the sample sentence
	var randIndexIntro = getRandIndexPos(words, "noun");
	var newMagnet1 = makeNewMagnetDiv(words, randIndexIntro);
	newMagnet1.offset({"top": 100, "left": 100});
	randomAngle(newMagnet1);
	$(".testdiv").append(newMagnet1);
	window.generatedIndexes.push(randIndexIntro);

	// creates the verb of the sample sentence
	var randIndexIntro = getRandIndexPos(words, "verb");
	var newMagnet2 = makeNewMagnetDiv(words, randIndexIntro);
	newMagnet2.offset({"top": 135, "left": 95});
	randomAngle(newMagnet2);
	$(".testdiv").append(newMagnet2);
	window.generatedIndexes.push(randIndexIntro);

	// creates the second noun of the sample sentence
	var randIndexIntro = getRandIndexPos(words, "noun");
	var newMagnet3 = makeNewMagnetDiv(words, randIndexIntro);
	newMagnet3.offset({"top": 170, "left": 100});
	randomAngle(newMagnet3);
	$(".testdiv").append(newMagnet3);
	window.generatedIndexes.push(randIndexIntro);
}

function getRandIndexPos(words, pos) { // with part of speech
	var randIndexIntro = Math.floor(Math.random()*words.length);
	var randWord = words[randIndexIntro];
	while (randWord.pos != pos) {
		randIndexIntro = Math.floor(Math.random()*words.length);
		randWord = words[randIndexIntro];
	}
	return randIndexIntro;
}

function getRandIndex(words) { // without part of speech
	var randIndex = Math.floor(Math.random()*words.length);
	while ($.inArray(randIndex, window.generatedIndexes) != -1) {
		randIndex = Math.floor(Math.random()*words.length);
	}
	window.generatedIndexes.push(randIndex); // adds to the bucket, yo
	return randIndex;
}

function makeNewMagnetDiv(words, randIndexIntro) {
	var word = words[randIndexIntro].word;
	return $("<div class='drag magnet' data-index='" + randIndexIntro + "'><span>" + word + "</span></div>");
}

function makeMagnet(words, randIndex) {
	// using the index, getting word
	// checkIndexes(words, randIndex);
	var randIndexIntro = getRandIndex(words, "noun");
	var newMagnet = makeNewMagnetDiv(words, randIndexIntro);
	randomPlacement(newMagnet);
	randomAngle(newMagnet);
	$(".testdiv").append(newMagnet);
	window.generatedIndexes.push(randIndexIntro);
}

function checkIndexes(words, randIndex) {
	// getting the index
	while ($.inArray(randIndex, window.generatedIndexes) != -1) {
		randIndex = Math.floor(Math.random()*words.length);
	}
	window.generatedIndexes.push(randIndex); // adds to the bucket, yo
}

function randomPlacement(newMagnet) {
	// randomizing the placement of the magnets
	var browserWidth = $(window).width();
	var browserHeight = $(window).height();
	var randomX = Math.floor(Math.random()*(browserWidth-290) + 200);
	var randomY = Math.floor(Math.random()*(browserHeight-200) + 100);
	newMagnet.offset({"top": randomY, "left": randomX});
	$(".testdiv").append(newMagnet);
}

function randomAngle(newMagnet) {
	// randomizing the angle of the magnet
	var randAngle = Math.floor(Math.random()*10-5);
	newMagnet.css("-moz-transform", "rotate(" + randAngle + "deg)");
}

// actually moving the magnets
$("*").mousemove(function(e) {
	$(".dragging").css({'top':e.pageY - relativeY,'left':e.pageX - relativeX});
});

function findWord(words, randWord) {
	// finds the word within the json file
	for (var i = 0; i < words.length; i++) {
		if (randWord == words[i].word) {
			return i;
			break;
		}
	}
}

function findWordPos(words, randWord) {
	for (var i = 0; i < words.length; i++) {
		if (randWord == words[i].word) {
			return words[i].pos;
			break;
		}
	}
}

function searchWord(words, oldWordIndex, oldWordPos) {
	// searches all other pos for matches
	var posCounter = 7;
	var newWord;
	for (var i = oldWordIndex; true; i++) {
		// loops around to beginning
		if (i == words.length) {
			i = 0;
		}
		if (oldWordPos == words[i].pos) {
			posCounter--;
		}
		if (posCounter == 0) {
			return words[i].word;
			break;
		}
	}
}