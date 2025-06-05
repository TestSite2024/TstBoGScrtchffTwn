/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */
var canvas = [];
var scratchers = [];
var checkinprogress = false;
let surname;
let soundHandle = new Audio();
let triggered=false;
let nosound=true;
let params = new URLSearchParams(window.location.search.slice(1));
let pct1=0, pct2=0, pct3=0;
let rnd;
// locations of correct gender circles
let loc = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let pct =[];
(function() {
    /**
     * Returns true if this browser supports canvas
     *
     * From http://diveintohtml5.info/
     */

    let color1 = '#ffc0cb';
    let color2 = '#7FB1ED';
    let color4 ='#969696';
    let color3 = 'linear-gradient(90deg, rgba(255,192,203,1) 0%, rgba(182,182,242,1) 50%, rgba(127,177,237,1) 100%)';
    let color3a = '-moz-linear-gradient(90deg, rgba(255,192,203,1) 0%, rgba(182,182,242,1) 50%, rgba(127,177,237,1) 100%)';
    let color3b = '-webkit-linear-gradient(90deg, rgba(255,192,203,1) 0%, rgba(182,182,242,1) 50%, rgba(127,177,237,1) 100%)';
    let colortxt1 = '#F860AA';
    let colortxt2= '#0066FFFF';
    let colortxt3= '#424242';
    //Select the background color
    let color =color4;
    //Select the text color
    let colortxt = colortxt3;
let gendertext1 = "It's Twin Girls!";
let gendertext2 = "It's Twin Boys!";
let gendertext3= "It's";
let gendertext4= "It is a Demo!";
let gen;
let gender = ["","","It's Twin Boys!","","","It's Twin Girls!","","It's a Boy & a Girl"];
let col = ["","","blue","","","pink","","pink and blue"];
let w = ["","","Twin Boys","","","Twin Girls","","Boy & Girl Twins"];
    //Select the gender text
    let gendertext = gendertext4;

    function supportsCanvas() {
        return !!document.createElement('canvas').getContext;
    };
    
    
    /**
     * Handle scratch event on a scratcher
     */
    function checkpct(index) {
        let p = 25;
        let pct1 = pct[loc[rnd-1][0]-1];
        let pct2 = pct[loc[rnd-1][1]-1];
        let pct3 = pct[loc[rnd-1][2]-1];

        if (!triggered) {
            if (index == loc[rnd-1][0]||index == loc[rnd-1][1]||index ==loc[rnd-1][2]){
            if (pct1>0 && pct2>0 && pct3>0)  {
                    if (pct1<p || pct2<p || pct3<p)  {
                        if (CrispyToast.toasts.length===0){
                        CrispyToast.success('Scratch MORE!',{ position: 'top-center', timeout: 2000});
                    }
                } 
            }
            }
         
            if (pct1>p && pct2>p && pct3>p) {
                if(CrispyToast.toasts.length!=0){
                    CrispyToast.clearall();
                }
                $('#tboy').show();
                $('#tboy').text(gendertext);
                $('#tboy').css('color',colortxt);
                $('#twins').hide();
                $('#boy').hide();    
                $('#girl').hide();
                document.getElementsByTagName("body")[0].style.backgroundColor = color;
                if (color != color3) {
                    color3a = color;
                    color3b = color;
                    $('#or').hide();
                } else {
                    $('#boy').text("a Boy");
                    $('#or').text(" & ");
                    $('#girl').text("a Girl");
                }
                
                document.getElementsByTagName("body")[0].style.backgroundImage = 'none';
                $('body').css('background-image', color);
                $('body').css('-webkit-background-image', color3b); // For WebKit browsers
                $('body').css('-moz-background-image', color3a); // Standard
                //$('.images').hide();              
                document.getElementById("H3").insertAdjacentHTML('afterend', "<h4 id='testtext' style='white-space:normal'> In the real product you buy, here it will say '" + gender[gen] + "' with " + col[gen] +" background color. </h4>");
                $('#H3').hide();
                $('#H4').hide();
                confetti_effect();
            }
        }
    };
    function scratcher1Changed(ev) {
        pct[0] = (this.fullAmount(40) * 100)|0;
        checkpct(1);
    };
    function scratcher2Changed(ev) {
        pct[1] = (this.fullAmount(40) * 100)|0;
        checkpct(2);
    };
    function scratcher3Changed(ev) {
        // Test every pixel. Very accurate, but might be slow on large
        // canvases on underpowered devices:
        //let pct = (scratcher.fullAmount() * 100)|0;
    
        // Only test every 32nd pixel. 32x faster, but might lead to
        // inaccuracy:

        pct[2] = (this.fullAmount(40) * 100)|0;
        checkpct(3);
        
    };
    function scratcher4Changed(ev) {
        pct[3] = (this.fullAmount(40) * 100)|0;
        checkpct(4);
    };
    function scratcher5Changed(ev) {
        pct[4] = (this.fullAmount(40) * 100)|0;
       checkpct(5);
    };
    function scratcher6Changed(ev) {
        pct[5]= (this.fullAmount(40) * 100)|0;
        checkpct(6);
    };
    function scratcher7Changed(ev) {
        pct[6] = (this.fullAmount(40) * 100)|0;
        checkpct(7);
    };
    function scratcher8Changed(ev) {
        pct[7] = (this.fullAmount(40) * 100)|0;
        checkpct(8);
    };
    function scratcher9Changed(ev) {
        pct[8] = (this.fullAmount(40) * 100)|0;
        checkpct(9);
    };
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    };
    function randomInRangeint(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    function confetti_effect() {
        if (triggered == true) {
            return;
        }
        if (!nosound) {
            soundHandle.volume = 0.5;
            soundHandle.play();
        }
        triggered = true;
        // do this for 10 seconds
    // Get the center of scratchers[2]
    let duration = 7 * 1000;
    let end = Date.now() + duration;
    let defaults = { startVelocity: 10, spread: 360, ticks: 70, zIndex: 0 };
    let particleCount = 5 ;
    for (let i = 1; i < 4; i++) {
            let scratcherCanvas = document.getElementById('scratcher'+loc[rnd-1][i-1]); // scratchers[2] corresponds to 'scratcher3'
            let rect = scratcherCanvas.getBoundingClientRect();
            let centerX = (rect.left + rect.right) / 2 / window.innerWidth;
            let centerY = (rect.top + rect.bottom) / 2 / window.innerHeight;
                confetti({
                    particleCount: 100,
                    spread: 360,
                    startVelocity:8,
                    gravity:0,
                    origin: {x: centerX, y: centerY },
                    colors: ['#F3A838FF'],
                    scalar:1.2,
                });
    }
    setTimeout(function frame() {
            // launch a few confetti from the left edge
   confetti({...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: [colortxt]}
        );
        // and launch a few from the right edge
   confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },colors: [colortxt]}
        );

        // keep going until we are out of time  
   if (Date.now() < end && triggered==true) {
             requestAnimationFrame(frame);
    
        return;
        }
        $("#resetbutton").show();

        },500);
               
     };
    
    /**
     * Reset all scratchers
     */
    function onResetClicked(scratchers) {
        let i;
        pct = [];
        CrispyToast.toasts=[];
        $("#resetbutton").hide();
        for (i = 0; i < scratchers.length; i++) {
            scratchers[i].reset();
        }
       
        $('#tboy').hide();
        $('#boy').show();
        
        $('#or').text(" or ");
        $('#boy').text("Boy");
        $('#girl').text("Girl");
        
        $('#twins').show();
        $('#or').show();
        $('#girl').show();
  //$('.images').show();
  document.getElementsByTagName("body")[0].style.backgroundColor = "#FFFFFF";
  document.getElementsByTagName("body")[0].style.backgroundImage = 'url(images/background.jpg)';
  document.getElementById('testtext').remove();

        $('#H3').show();
        $('#H4').show();
        triggered = false;
        confetti.reset();
        soundHandle.pause();
        soundHandle.currentTime = 0;    
        return false;
    };
    function fitCanvastoDiv() {
        if (checkinprogress) {
            return;
        }
        checkinprogress=true;

        setTimeout(function () {
            
            var ttd = $(canvas[0]).parent();
            console.log(ttd);
            for (let index = 0; index < scratchers.length; index++) {
                // var ttd = document.getElementById('scratcher-box');
                canvas[index].width = ttd.width();
                canvas[index].height = canvas[index].width;
                if(scratchers[index]) { 
                    if (triggered) {
                    scratchers[index].resetnoclear(true);
                    } else {
                    scratchers[index].resetnoclear(false);
                    }
                }     
            }
            checkinprogress=false;        
            //alert(window.innerHeight + " " + window.innerWidth);

        },500);
            
       
    }
    
    /**
     * Assuming canvas works here, do all initial page setup
     */
    // function handleOrientationChange(mql) {
    //     if (mql.matches) {
    //         /* The viewport is currently in portrait orientation */
    //         if(window.innerHeight>900) {
    //             size=130}
    //         else {
    //             size=100;
    //         }
 
    //       } else {
    //         /* The viewport is not currently in portrait orientation, therefore landscape */
    //         console.log(window.innerHeight + " " + window.innerWidth);
    //         size=100;
    //         if (window.innerWidth>900 && window.innerWidth>window.innerHeight*1.2){
    //             console.log("yes");
    //             size = 130;
    //         }
    //       }
          
    //       $('#scratcher1').width(size);
    //       $('#scratcher1').css('width',size);

    
    //   }

function initPage() {
        let scratcherLoadedCount = 0;
        pct =new Array(9);
        let i, i1;
 
        if (params.get('gen')!=null) {
            gen = params.get('gen');
        }
        surname = params.get('surname');
        if (surname !=null && surname.replace(/\s/g, '').length) {
            $("#baby").text('Baby ' + surname+'(s)');}
        else {
            $("#baby").text('the Baby(ies)');
            surname="the";
            document.getElementById('surname').style.fontWeight="normal";
            $('#baby').css('font-weight', 'normal');

        }
        //document.getElementById('intro').innerHTML= "This is a gender reveal scratch off for <strong>" + surname + "</strong> family. It contains sound when the gender is revealed. Do you want to continue with sound?";
        document.getElementById('surname').innerHTML= surname;

        document.getElementById('id01').style.display = 'block';
        $('.nosoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display = 'none';
            nosound = true;
        });
        $('.withsoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display = 'none';
            nosound = false;
            if (soundHandle.currentTime != 0) { return; }
                soundHandle = document.getElementById('soundHandle');  
                soundHandle.autoplay = true;
                soundHandle.muted = false;
                soundHandle.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
                soundHandle.src = 'audio/celebrate.mp3';
                soundHandle.play();
                soundHandle.pause();
        });
        document.addEventListener(
            "visibilitychange",
             function (evt) {
              if (document.visibilityState != "visible") {
                soundHandle.pause();
                soundHandle.currentTime = 0;              
            }
            },
            false,
          );

        
        document.getElementById("resetbutton").style.backgroundColor = colortxt;

        // called each time a scratcher loads
        function onScratcherLoaded(ev) {
            
            scratcherLoadedCount++;
            //$("table1").width($(window).width());
            if (scratcherLoadedCount == scratchers.length) {
                // all scratchers loaded!
    
                // bind the reset button to reset all scratchers
                $('#resetbutton').on('click', function () {
                        onResetClicked(scratchers);
                    });
                    fitCanvastoDiv();
    
                // hide loading text, show instructions text
                //$('#loading-text').hide();
                //$('#inst-text').show();
            }
        };
    
        // create new scratchers
        scratchers = new Array(9);
        canvas = new Array(9);

        rnd = 2;
        for (i = 0; i < scratchers.length; i++) {
            i1 = i + 1;
            scratchers[i] = new Scratcher('scratcher' + i1);
            canvas[i] = document.getElementById("scratcher" + i1);
    
            // set up this listener before calling setImages():
            scratchers[i].addEventListener('imagesloaded', onScratcherLoaded);
    
            scratchers[i].setImages('images/' + rnd + '/s' + i1 + 'bg.jpg',
                'images/foreground.jpg');
        
        }
       
        // get notifications of this scratcher changing
        // (These aren't "real" event listeners; they're implemented on top
        // of Scratcher.)
        //scratchers[3].addEventListener('reset', scratchersChanged);
        scratchers[0].addEventListener('scratchesended', scratcher1Changed);
        scratchers[1].addEventListener('scratchesended', scratcher2Changed);
        scratchers[2].addEventListener('scratchesended', scratcher3Changed);

        scratchers[3].addEventListener('scratchesended', scratcher4Changed);
        //scratchers[4].addEventListener('reset', scratchersChanged);
        scratchers[4].addEventListener('scratchesended', scratcher5Changed);
        //scratchers[5].addEventListener('reset', scratchersChanged);
        scratchers[5].addEventListener('scratchesended', scratcher6Changed);
        scratchers[6].addEventListener('scratchesended', scratcher7Changed);
        scratchers[7].addEventListener('scratchesended', scratcher8Changed);
        scratchers[8].addEventListener('scratchesended', scratcher9Changed);

        // var canvas = document.getElementById('scratcher1');
        // canvas.onmousemove = null;

        // Or if you didn't want to do it every scratch (to save CPU), you
        // can just do it on 'scratchesended' instead of 'scratch':
        //scratchers[2].addEventListener('scratchesended', scratcher3Changed);
    };
    
    /**
     * Handle page load
     */
    $(function () {
        if (supportsCanvas()) {
            initPage();
        } else {
            $('#scratcher-box').hide();
            $('#lamebrowser').show();
        }
    });
    
    })();
    