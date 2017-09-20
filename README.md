# CountdownClock.js
Pure CSS countdown clock controlled by JavaScript.

![ScreenShot](/ScreenShot.png?raw=true "Optional Title")

## Example Usage
https://codepen.io/joeweitzel/pen/LzNKdr
```
var COUNTDOWN = new CountdownClock(30, {
    onChange: function(){
        var color = this.getOption('cssLitDotColor');
        if(this.time <= 10 && color != 'red') {
            this.setOption('cssLitDotColor', 'red');
        } else if(this.time > 10 && color != '#0f0') {
            this.setOption('cssLitDotColor', '#0f0');
        };
    },
    onComplete: function(){
        alert('times up!');
    }
});
```
