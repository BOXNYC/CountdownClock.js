# CountdownClock.js
Pure CSS countdown clock controlled by JavaScript.

![ScreenShot](/ScreenShot.png?raw=true "Optional Title")

## Example Usage
```
var COUNTDOWN = new CountdownClock(30, {
    onChange: function(){
        if(this.time <= 10 && this.getOption('cssLitDotColor') != 'red') {
            this.setOption('cssLitDotColor', 'red');
        } else if(this.time > 10 && this.getOption('cssLitDotColor') != '#0f0') {
            this.setOption('cssLitDotColor', '#0f0');
        };
    },
    onComplete: function(){
        alert('times up!');
    }
});
```
