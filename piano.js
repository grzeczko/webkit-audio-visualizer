"use strict";

function PianoApp()
{
    var version = "6.1",
        audioManager = new AudioManager("piano");

    function setStatus(message)
    {
        $("#app footer").text(message);
    }
    
    function loadAudio()
    {
        var count = 0,
            loaded = 0,
            error = false;
        
        $(".keyboard .piano-key").each(function()
        {
            count++;
            var noteName = escape($(this).data("note"));
            audioManager.getAudio(noteName,
                function()
                {
                    if (error) return;
                    if (++loaded == count) setStatus("Ready.");
                    else setStatus("Loading " + Math.floor(100 * loaded / count) + "%");
                },
                function(audio)
                {
                    error = true;
                    setStatus("Error loading: " + audio.src);
                }
            );
        });
    }
    
    function initKeyboard()
    {
        var ar=new Array(8, 34, 35, 46);

        $(document).keydown(function(e) {
            keyPress(e.which, "down");
            if($.inArray(e.which,ar) > -1 && !$('#q').is(":focus")) {
                e.preventDefault();
                return false;
            }
            return true;
        }).keyup(function(e) {
          keyPress(e.which, "up");
        });

        var $keys = $(".keyboard .piano-key");
        if ($.isTouchSupported)
        {
            $keys.touchstart(function(e) {
                e.stopPropagation();
                e.preventDefault();
                keyDown($(this));
            })
            .touchend(function() { keyUp($(this)); })
        }
        else
        {
            $keys.mousedown(function() {
                keyDown($(this));
                return false;
            })
            .mouseup(function() { keyUp($(this)); })
            .mouseleave(function() { keyUp($(this)); });
        }
    }

    function keyPress(key, keypress)
    {
        if (!$('#q').is(":focus"))
        {
            var $key = $(".keyboard");
            //alert(keypress + ':' + key);
            // UP
            if (keypress == 'down') {
                if (key == 113 || key == 81) { // Q, C2
                    keyDown($key.find('#c2'));
                }
                else if (key == 119 || key == 87) { // W, D2
                    keyDown($key.find('#d2'));
                }
                else if (key == 101 || key == 69) { // E, E2
                    keyDown($key.find('#e2'));
                }
                else if (key == 114 || key == 82) { // R, F2
                    keyDown($key.find('#f2'));
                }
                else if (key == 116 || key == 84) { // T, G2
                    keyDown($key.find('#g2'));
                }
                else if (key == 121 || key == 89) { // Y, A2
                    keyDown($key.find('#a2'));
                }
                else if (key == 117 || key == 85) { // U, B2
                    keyDown($key.find('#b2'));
                }
                else if (key == 105 || key == 73) { // I, C3
                    keyDown($key.find('#c3'));
                }
                else if (key == 111 || key == 79) { // O, D3
                    keyDown($key.find('#d3'));
                }
                else if (key == 112 || key == 80) { // P, E3
                    keyDown($key.find('#e3'));
                }
                else if (key == 91 || key == 123 || key == 219) { // [, F3
                    keyDown($key.find('#f3'));
                }
                else if (key == 93 || key == 125 || key == 221) { // ], G3
                    keyDown($key.find('#g3'));
                }
                else if (key == 92 || key == 124 || key == 220) { // \, A3
                    keyDown($key.find('#a3'));
                }
                else if (key == 35) { // end, B3
                    keyDown($key.find('#b3'));
                }
                else if (key == 34) { // page down, C4
                    keyDown($key.find('#c4'));
                }

                // black keys
                else if (key == 50) { // 2, C2#
                    keyDown($key.find('#c2s'));
                }
                else if (key == 51) { // 3, D2#
                    keyDown($key.find('#d2s'));
                }
                else if (key == 53) { // 5, F2#
                    keyDown($key.find('#f2s'));
                }
                else if (key == 54) { // 6, G2#
                    keyDown($key.find('#g2s'));
                }
                else if (key == 55) { // 7, A2#
                    keyDown($key.find('#a2s'));
                }
                else if (key == 57) { // 9, C3#
                    keyDown($key.find('#c3s'));
                }
                else if (key == 48) { // 0, D3#
                    keyDown($key.find('#d3s'));
                }
                else if (key == 61 || key == 187) { // =, F3#
                    keyDown($key.find('#f3s'));
                }
                else if (key == 8) { // back space, G3#
                    keyDown($key.find('#g3s'));
                }
                else if (key == 46) { // delete, A3#
                    keyDown($key.find('#a3s'));
                }
            }
            
            // DOWN
            if (keypress == 'up') {

                if (key == 113 || key == 81) { // Q, C2
                    keyUp($key.find('#c2'));
                }
                else if (key == 119 || key == 87) { // W, D2
                    keyUp($key.find('#d2'));
                }
                else if (key == 101 || key == 69) { // E, E2
                    keyUp($key.find('#e2'));
                }
                else if (key == 114 || key == 82) { // R, F2
                    keyUp($key.find('#f2'));
                }
                else if (key == 116 || key == 84) { // T, G2
                    keyUp($key.find('#g2'));
                }
                else if (key == 121 || key == 89) { // Y, A2
                    keyUp($key.find('#a2'));
                }
                else if (key == 117 || key == 85) { // U, B2
                    keyUp($key.find('#b2'));
                }
                else if (key == 105 || key == 73) { // I, C3
                    keyUp($key.find('#c3'));
                }
                else if (key == 111 || key == 79) { // O, D3
                    keyUp($key.find('#d3'));
                }
                else if (key == 112 || key == 80) { // P, E3
                    keyUp($key.find('#e3'));
                }
                else if (key == 91 || key == 123 || key == 219) { // [, F3
                    keyUp($key.find('#f3'));
                }
                else if (key == 93 || key == 125 || key == 221) { // ], G3
                    keyUp($key.find('#g3'));
                }
                else if (key == 92 || key == 124 || key == 220) { // \, A3
                    keyUp($key.find('#a3'));
                }
                else if (key == 35) { // end, B3
                    keyUp($key.find('#b3'));
                }
                else if (key == 34) { // page down, C4
                    keyUp($key.find('#c4'));
                }

                // black keys
                else if (key == 50) { // 2, C2#
                    keyUp($key.find('#c2s'));
                }
                else if (key == 51) { // 3, D2#
                    keyUp($key.find('#d2s'));
                }
                else if (key == 53) { // 5, F2#
                    keyUp($key.find('#f2s'));
                }
                else if (key == 54) { // 6, G2#
                    keyUp($key.find('#g2s'));
                }
                else if (key == 55) { // 7, A2#
                    keyUp($key.find('#a2s'));
                }
                else if (key == 57) { // 9, C3#
                    keyUp($key.find('#c3s'));
                }
                else if (key == 48) { // 0, D3#
                    keyUp($key.find('#d3s'));
                }
                else if (key == 61 || key == 187) { // =, F3#
                    keyUp($key.find('#f3s'));
                }
                else if (key == 8) { // back space, G3#
                    keyUp($key.find('#g3s'));
                }
                else if (key == 46) { // delete, A3#
                    keyUp($key.find('#a3s'));
                }
            }
        }
    }
    
    function keyDown($key)
    {
        if (!$key.hasClass("down"))
        {
            $key.addClass("down");
            var noteName = $key.data("note");
            var audio = audioManager.getAudio(escape(noteName));
            audio.currentTime = 0;
            //audio.load();
            audio.play();
        }
    }
    
    function keyUp($key)
    {
        $key.removeClass("down");
    }
    
    this.start = function()
    {
        $("#app header").append(version);
        setStatus("Loading...");
        
        loadAudio();
        initKeyboard();
    };
}

$(function()
{
    window.app = new PianoApp();
    window.app.start();
});