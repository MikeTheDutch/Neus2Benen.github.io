(function(){

// little javascript extension for easy promises access

    if (jQuery.when.all===undefined) {
        jQuery.when.all = function(deferreds) {
            var deferred = new jQuery.Deferred();
            $.when.apply(jQuery, deferreds).then(
                function() {
                    deferred.resolve(Array.prototype.slice.call(arguments));
                },
                function() {
                    deferred.fail(Array.prototype.slice.call(arguments));
                });

            return deferred;
        }
    }



var folder = '../music/';

var tracklist = [
  '1.mp3',
  '2.mp3',
  '3.mp3',
  '4.mp3'
];

var slider = $('#slider');

var player = new AudioPlayer(tracklist, {
    path : 'music/'
});

    player.init();

    /*

     Event Handlers

     */

	$('#slider').on('change', function(){
		player.changeDuration(parseInt(this.value));
	});

	$('#btn-pause').on('click', function(){
		player.pause();
	});

    	$('#btn-play').on('click', function(){
		player.play();
	});
        $('#btn-forward').on('click', function(){
		player.ffwd();
	});
        $('#btn-backward').on('click', function(){
		player.ffwd();
	});
        $('#btn-rewind').on('click', function(){
		player.rew();
	});
        $('#btn-next').on('click', function(){
		player.nextTrack();
	});
        $('#btn-prev').on('click', function(){
		player.prevTrack();
	});
        $('#btn-stop').on('click', function(){
		player.stop();
	});




function AudioPlayer(tracklist, options) {


    var options = options || {};
	var tracklist = tracklist || [];
	var current;
	var audio;
	var playing = false;

	return {

		init : function() {
			current = typeof current == 'undefined' ? 0 : current;
			audio = new Audio(options.path + tracklist[current]);
			this.buildTrackList();

		},

		reset : function () {
			playing = false;
            current = 0;
            player.pause();
            player.currentTime = 0;
			this.init();
		},

		play : function() {
				playing = true;
				var that = this;
				current = typeof current == 'undefined' ? 0 : current;
				audio.play();

				setInterval(function(){
					if (playing) {
                        slider[0].value = Math.floor(parseInt((audio.currentTime / audio.duration) * 100));
                        if (audio.currentTime === audio.duration) {
                            playing = false;
                            that.nextTrack();

                        }
					    $('.time').html( that.getCurrentTime() );
				    }

				}, 1000);
		},

		stop : function() {
            slider[0].value = 0;
			playing = false;
            player.pause();
            player.currentTime = 0;
            this.init();
		},

		pause : function() {
			playing = false;
			audio.pause();
		},

		ffwd : function() {
			audio.currentTime += 10;
		},

		rew : function() {
			audio.currentTime -= 10;
		},

		prevTrack : function() {

			if (current == 0)
			{
                current = tracklist.length - 1;
                this.stop();
                this.play();
				return;

			} else {
                current--;
                this.stop();
                this.play();
            }

		},

		nextTrack : function() {

			if (current >= tracklist.length - 1)
			{
                this.reset();
                this.play();

			} else {

                current++;
                this.stop();
                this.play();
            }



		},

		changeDuration : function(perc) {
			audio.currentTime = audio.duration * (perc / 100);

		},

		getCurrentTime : function() {
			var time = new Date(audio.currentTime * 1000);
			var result = '';

			if (time.getMinutes() <= 9)
			{
				result += '0';
			}
			result += time.getMinutes();

			result += ':';
			if (time.getSeconds() <= 9)
			{
				result += 0;
			}
			result += time.getSeconds();

			return result;
		},

        getTrackData : function(index) {
            var promise = $.Deferred();

            ID3.loadTags(options.path + tracklist[index], function(){
               var data = [];
               var tags = ID3.getAllTags(options.path + tracklist[index]);
               data.push({
                   'artist' : tags.artist,
                   'title'  : tags.title
               });

               promise.resolve(data);
            });
            return promise;
        },

        getAllTrackData : function() {
            var promise = $.Deferred();
                var data = [];
                for (var i = 0; i < tracklist.length; i++) {
                    data.push(this.getTrackData(i));
                }
            $.when.all(data).then(function(result){
               var final = [];
               for(var i = 0; i < result.length; i++)
               {
                   final.push(result[i]);
               }

               promise.resolve(final);
            });

            return promise;
        },

		buildTrackList : function() {
           	var container = $('#tracklist');
            var that = this;
            var timeEl = '<span class="time pull-right"></span>';
            container.empty();
            var checkActive = function(num) {
                return num === current ? ' active' : '';
            };

            var trackData = this.getAllTrackData();

            trackData.done(function(data){
                for (var i = 0; i < data.length; i++)
                {
                    container.append('<li class="list-group-item '+ checkActive(i)  + '">' +  data[i][0].artist + ' | ' + data[i][0].title + '</li>')
                }

                if (current === i)
                {
                    $('li.active').append(timeEl);
                }

            });

            setTimeout(function(){
                $('li.active').append(timeEl).html(this.getCurrentTime());
            }, 500)
		}
	}
}
})();



/*
3. Geef aan welke properties ons audioplayer object heeft.

    var options;
	var tracklist;
	var current;
	var audio;
	var playing;

4. + 5. Geef aan welke functies ons audioplayer object heeft.

    init - medisspeler voorbereiden
	reset - alle variabelen in de mediaplayer resetten
	play - een audiobestand afspelen
	stop - stoppen met afspelen
	pause - afspelen pauzeren
	ffwd - de huidige muziek doorspoelen
	rew - de huidige muziek terugdraaien
	prevTrack - het vorige nummer afspelen
	nextTrack - het volgende nummer afspelen
	changeDuration - de afspeeltijd veranderen
	getCurrentTime - de huidige afspeeltijd opvragen
    getTrackData - metadata van het audiobestand opvragen
    getAllTrackData - metadata van alle audiobestanden opvragen
   	buildTrackList - afspeellijst bouwen
    trackData.done - Selecteer het volgende nummer in de playlist
    setTimeout - Voorkomen dat er bugs optreden

6. Geef het regelnummer aan in de index.html van waar deze twee elementen staan.
    Vanaf regel 70

7. Welke elementen worden hiermee bedoeld in de webpagina? Laat dit m.b.v. een print-screen zien.
    http://i.imgur.com/IxAfWjY.png

8. Geef het regelnummer aan in de index.html van de play knop
    Regel 70
9. Wat is het id van de play-knop in de HTML?
    btn-play

11. Met de logica van wat we in de vorige opdracht hebben gedaan, ga je nu een event handler maken
voor de stop knop. Geef hieronder een printscreen van de code die je hiervoor hebt geschreven.
    http://i.imgur.com/pRkNuSB.png

13. Test alle knoppen of ze doen wat ze moeten doen!! Geef hieronder aan of er nog bijzonderheden zijn.
    Nog niet alle knoppen werken

14. Welke taak ( function() ) van het audioplayer object zou volgens jou hier voor moeten worden aangepast?
    setInterval(function(){

15. In het setInterval blok van de play() functie voeg je onderstaande regel toe. Waar heeft deze regel
voor gezorgd?
Dat de slider meebeweegt naarmate het audiobestand wordt afgespeeld

16. Bekijk de ffwd() functie en probeer in eigen woorden uit te leggen wat deze functie doet
    Spoelt het audiobestand door met 10 seconden

    */