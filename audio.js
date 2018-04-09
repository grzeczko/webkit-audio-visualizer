    animateBars: function() {
      var that = this;
      var output = 30 * HUTCH.Listen.volume;
      $('.bar').each(function() {
        var random_height = Math.floor((Math.random() * output) + 1);
        var current = $(this);
        current.animate({
          height: random_height
        }, 200, function(){
          that.animateBar(current);
        });
      });
    },
    animateBar: function(current) {
        var that = this;
        var output = 30 * HUTCH.Listen.volume;
        var random_height = Math.floor((Math.random() * output) + 1);
        current.animate({
          height: random_height
        }, 200, function(){
          that.animateBar(current);
        });
    },
    rafCallback: function(time) {
      var context;
        if (typeof AudioContext !== "undefined") {
            context = new AudioContext();
        } else if (typeof webkitAudioContext !== "undefined") {
            context = new webkitAudioContext();
        } else {
            return;
        }

        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                        || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };

        // Create the analyser
        var analyser = context.createAnalyser();
        analyser.fftSize = 64;
        var frequencyData = new Uint8Array(analyser.frequencyBinCount);

        if ($('canvas#wave').length > 0) {
          var canvas = $('canvas#wave')[0],
              ctx = canvas.getContext('2d');
        }

        // Get the frequency data and update the visualisation
        var updated = false;
        function update() {
            requestAnimationFrame(update);

            analyser.getByteFrequencyData(frequencyData);

          $('.bar').each(function (index, bar) {
            var magnitude = frequencyData[index] / 8;
                bar.style.height = magnitude + 'px';
            });

          if ($('canvas#wave').length > 0) 
          {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            for (var i = 0; i <= 1000; i++) {
                if (i % 50 == 0) {
                  var index = i / 50;
                  var magnitude = frequencyData[index + 5] / 14;
                }
                var nyquist = ctx.sampleRate/2;
                var index = Math.round(22000/nyquist * frequencyData.length);

                var t = i/1000;
                var p = $.curve.sine(t, {
                    x: 0,
                    y: canvas.height / 2,
                    amp: magnitude,
                    frequency: magnitude,
                    wavelength: canvas.width
                });
                if (i == 0) {
                    ctx.moveTo(p[0], p[1]);
                }
                ctx.lineTo(p[0], p[1]);
                ctx.lineWidth = 2;

                ctx.shadowOffsetX = 6;
                ctx.shadowOffsetY = 6;
                ctx.shadowColor = '#cc6600';
                ctx.shadowBlur = 3;

                ctx.strokeStyle = '#ffcc66';
            }
            ctx.stroke();
          }

          //var color_wheel = ['EAC975', 'B1DA20', '54DA20', '20DA48', '20DAA4', '20B1DA', '2054DA', '4820DA', 'A520DA', 'DA20B1', 'DA2054', 'DA4820'];
          var color_wheel = ['F1DAA1', 'EED18B', 'EAC975', 'E7C05E', 'E4B748', 'E0AF32', 'DAA520', 'C3941C', 'AD8319', '977216', '816112', '6A500F'];
          var magnitude = frequencyData[20] / 48;
          var magnitude_2 = Math.floor(frequencyData[22] / 42);
          var glow_1 = parseInt(magnitude * 1);
          var glow_2 = parseInt(magnitude * 2);
          var glow_3 = parseInt(magnitude * 6);
          var glow_4 = parseInt(magnitude * 12);

          $('.glow').css('box-shadow', '0 0 ' + glow_1 + 'px #' + color_wheel[magnitude_2] + ', 0 0 ' + glow_2 + 'px #' + color_wheel[magnitude_2] + ', 0 0 ' + glow_3 + 'px #' + color_wheel[magnitude_2] + ', 0 0 ' + glow_4 + 'px #' + color_wheel[magnitude_2] + ', inset 0 0 ' + glow_1 + 'px #' + color_wheel[magnitude_2] + ', inset 0 0 ' + glow_2 + 'px #' + color_wheel[magnitude_2] + ', inset 0 0 ' + glow_3 + 'px #' + color_wheel[magnitude_2] + ', inset 0 0 ' + glow_4 + 'px #' + color_wheel[magnitude_2]);

          var color_wheel = ['ffffff', 'f2f2f2', 'e5e5e5', 'd8d8d8', 'cbcbcb', 'bebebe', 'b1b1b1', 'a4a4a4', '979797', '8a8a8a', '7d7d7d', '707070'];
          var magnitude = frequencyData[26] / 12;
          var magnitude_2 = Math.floor(frequencyData[28] / 42);
          var glow_1 = parseInt(magnitude * 1);
          var glow_2 = parseInt(magnitude * 2);
          var glow_3 = parseInt(magnitude * 6);
          var glow_4 = parseInt(magnitude * 12);
          $('.glow2').css('box-shadow', '0 0 ' + glow_1 + 'px #' + color_wheel[magnitude_2] + ', 0 0 ' + glow_2 + 'px #' + color_wheel[magnitude_2] + ', 0 0 ' + glow_3 + 'px #' + color_wheel[magnitude_2] + ', 0 0 ' + glow_4 + 'px #' + color_wheel[magnitude_2] + ', inset 0 0 ' + glow_1 + 'px #' + color_wheel[magnitude_2] + ', inset 0 0 ' + glow_2 + 'px #' + color_wheel[magnitude_2] + ', inset 0 0 ' + glow_3 + 'px #' + color_wheel[magnitude_2] + ', inset 0 0 ' + glow_4 + 'px #' + color_wheel[magnitude_2]);
        };

        

        $("#html5player").bind('canplaythrough', function() {
          if (!updated) {
            var source = context.createMediaElementSource(this);
            source.connect(analyser);
            analyser.connect(context.destination);

            updated = true;
          }  
      }); 

      update();
    }