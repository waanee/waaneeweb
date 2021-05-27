export default{
    name:'Rollingpage',
    template:`
    <div>
        <div class="container" style="height:auto;">
            
            <div class="aboutbox">

                <div class="about-title">
                    <h2>Rolling Me</h2>
                    <p>결정장애들이여 모여라!.</p>
                </div>
                
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td>
                            <div class="power_controls">
                                <br />
                                <br />
                                <table class="power" cellpadding="10" cellspacing="0">
                                    <tr>
                                        <th align="center">Power</th>
                                    </tr>
                                    <tr>
                                        <td width="78" align="center" id="pw3" @click="powerSelected(3)">High</td>
                                    </tr>
                                    <tr>
                                        <td align="center" id="pw2" @click="powerSelected(2);">Med</td>
                                    </tr>
                                    <tr>
                                        <td align="center" id="pw1" @click="powerSelected(1);">Low</td>
                                    </tr>
                                </table>
                                <br />
                                <img id="spin_button" src="spin_off.png" alt="Spin" @click="startSpin();" />
                                <br /><br />
                                &nbsp;&nbsp;<a href="#" @click="resetWheel(); return false;">Play Again</a><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(reset)
                            </div>
                        </td>
                        <td width="438" height="582" class="the_wheel" align="center" valign="center">
                            <canvas id="canvas" width="434" height="434">
                                <p style="{color: white}" align="center">Sorry, your browser doesn't support canvas. Please try another.</p>
                            </canvas>
                        </td>
                    </tr>
                </table>
            
            </div>
            
        </div>
    </div>
    `,

    data(){
        return{
            wheelSpinning:false,
            wheelPower: 3,
            mb_type:'APP',
            msg: '',
        }
    },
    mounted(){
        let theWheel = new Winwheel({
            'numSegments'  : 8,     // Specify number of segments.
            'outerRadius'  : 212,   // Set outer radius so wheel fits inside the background.
            'textFontSize' : 28,    // Set font size as desired.
            'segments'     :        // Define segments including colour and text.
            [
               {'fillStyle' : '#eae56f', 'text' : '피자'},
               {'fillStyle' : '#89f26e', 'text' : '햄버거'},
               {'fillStyle' : '#7de6ef', 'text' : '짜장'},
               {'fillStyle' : '#e7706f', 'text' : '찌게'},
               {'fillStyle' : '#eae56f', 'text' : '돈까스'},
               {'fillStyle' : '#89f26e', 'text' : '비빔밥'},
               {'fillStyle' : '#7de6ef', 'text' : '김밥'},
               {'fillStyle' : '#e7706f', 'text' : '라면'}
            ],
            'animation' :           // Specify the animation to use.
            {
                'type'     : 'spinToStop',
                'duration' : 5,     // Duration in seconds.
                'spins'    : 8,     // Number of complete spins.
                //'callbackFinished' : alertPrize
            }
        });
    },
    methods: {
        powerSelected(powerLevel) {
          // Ensure that power can't be changed while wheel is spinning.
            if (this.wheelSpinning == false) {
            // Reset all to grey incase this is not the first time the user has selected the power.
            document.getElementById('pw1').className = "";
            document.getElementById('pw2').className = "";
            document.getElementById('pw3').className = "";

            // Now light up all cells below-and-including the one selected by changing the class.
            if (powerLevel >= 1) {
                document.getElementById('pw1').className = "pw1";
            }

            if (powerLevel >= 2) {
                document.getElementById('pw2').className = "pw2";
            }

            if (powerLevel >= 3) {
                document.getElementById('pw3').className = "pw3";
            }

            // Set wheelPower var used when spin button is clicked.
            //this.wheelPower = powerLevel;
            this.wheelPower = 3;

            // Light up the spin button by changing it's source image and adding a clickable class to it.
            document.getElementById('spin_button').src = "spin_on.png";
            document.getElementById('spin_button').className = "clickable";
            }
        },
        startSpin() {
          
            // Ensure that spinning can't be clicked again while already running.
            if (this.wheelSpinning == false) {
                // Based on the power level selected adjust the number of spins for the wheel, the more times is has
                // to rotate with the duration of the animation the quicker the wheel spins.
                if (this.wheelPower == 1) {
                    this.theWheel.animation.spins = 3;
                } else if (this.wheelPower == 2) {
                    this.theWheel.animation.spins = 8;
                } else if (this.wheelPower == 3) {
                    this.theWheel.animation.spins = 15;
                }

                // Disable the spin button so can't click again while wheel is spinning.
                document.getElementById('spin_button').src       = "spin_off.png";
                document.getElementById('spin_button').className = "";

                // Begin the spin animation by calling startAnimation on the wheel object.
                this.theWheel.startAnimation();

                // Set to true so that power can't be changed and spin button re-enabled during
                // the current animation. The user will have to reset before spinning again.
                this.wheelSpinning = true;
            }

        },
        resetWheel(){
            this.theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
            this.theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
            this.theWheel.draw();                // Call draw to render changes to the wheel.

            document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
            document.getElementById('pw2').className = "";
            document.getElementById('pw3').className = "";

            wheelSpinning = false;
        },
        alertPrize(indicatedSegment){
            alert("You have won " + indicatedSegment.text);
        }
      }

}