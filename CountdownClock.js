var CountdownClock = (function(){
  return function CountdownClock(setNumber, options) {
    
    var matrix = [],
        styleElement,
        X = 1,
        _ = 0,
        numMatrix = null,
        interval = 0;
    
    function setOptions() {
      var defaults = {
        dotsWidth: 16,
        dotsHeight: 9,
        dotSize: 6,
        element: null,
        elementParent: document.body,
        cssPosition: 'relative',
        cssBackgroundColor: 'black',
        cssDotColor: '#393939',
        cssDotMargin: 2,
        cssBorderColor: 'darkgrey',
        cssBorderSize: 2,
        cssLitDotColor: '#0f0',
        cssTransitionDuration: 0.9,
        cssLitDotBlur: 2,
        cssLitDotBlurIntensity: 2,
        cssShineOpacity:0.2,
        cssShineHeight: 130,
        cssShineWidth: 110,
        shine: true,
        onChange: null,
        onComplete: null
      };
      options = options || defaults;
      for(var key in defaults)
        options[key] = typeof options[key] === 'undefined' ?
          defaults[key] : options[key];
    };
    
    function style(update) {
      update = update || false;
      var shadow = function(){
        var shadowCSS = '0 0 '+options.cssLitDotBlur+'px '+options.cssLitDotColor+'',
            shadows = [];
        for(var i = 1; i <= options.cssLitDotBlurIntensity; i++) shadows.push(shadowCSS);
        return shadows.join(', ');
      };
      var shine = function(){
        if(options.shine) return '.countdown-clock::after { \
          pointer-events: none; \
          content: " "; \
          width: 0; \
          height: 0; \
          border-left: '+options.cssShineWidth+'px solid white; \
          border-bottom: '+options.cssShineHeight+'px solid transparent; \
          position: absolute; \
          top: 0; \
          left: 0; \
          opacity: '+options.cssShineOpacity+'; \
        }';
        return '';
      }
      if(!update) styleElement = document.createElement('style');
      styleElement.innerHTML = '.countdown-clock { \
        position: '+options.cssPosition+'; \
        background-color: '+options.cssBackgroundColor+'; \
        display: inline-block; \
        border: solid '+options.cssBorderColor+' '+options.cssBorderSize+'px; \
        overflow: hidden; \
        line-height: 0; \
      } \
      '+shine()+' \
      .countdown-clock-dot { \
        width: '+options.dotSize+'px; \
        height: '+options.dotSize+'px; \
        line-height: 0; \
        background-color: '+options.cssDotColor+'; \
        margin: '+options.cssDotMargin+'px; \
        border-radius: 50%; \
        -moz-border-radius: 50%; \
        -webkit-border-radius: 50%; \
        -ms-border-radius: 50%; \
        -o-border-radius: 50%; \
        display: inline-block; \
        transition: all '+options.cssTransitionDuration+'s; \
        -moz-transition: all '+options.cssTransitionDuration+'s; \
        -webkit-transition: all '+options.cssTransitionDuration+'s; \
        -ms-transition: all '+options.cssTransitionDuration+'s; \
        -o-transition: all '+options.cssTransitionDuration+'s; \
      } \
      .countdown-clock-dot.active { \
        background-color: '+options.cssLitDotColor+'; \
        box-shadow: '+shadow()+'; \
      }';
      if(!update)
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    };
    
    function build() {
      for(var row = 1; row <= options.dotsHeight; row++) matrix.push([]);
      options.element = document.createElement('div');
      options.element.classList = 'countdown-clock';
      for(var row = 1; row <= options.dotsHeight; row++) {
        for(var column = 1; column <= options.dotsWidth; column++) {
          var dot = document.createElement('div');
          dot.classList = 'countdown-clock-dot';
          options.element.appendChild(dot);
          if(column == options.dotsWidth) options.element.appendChild(document.createElement('br'));
          matrix[row-1].push(dot);
        };
      };
      options.elementParent.appendChild(options.element);
    };
    
    function buildNumberMatrix() {
      numMatrix = {
        dot1: [
          [X,X],
          [X,X],
        ],
        dot2: [
          [X,X],
          [X,X],
        ],
        num01: [
          [_,X,X,X,_],
          [X,_,_,_,X],
          [X,_,_,_,X],
          [X,_,_,_,X],
          [X,_,_,_,X],
          [X,_,_,_,X],
          [_,X,X,X,_],
        ],
        num11: [
          [_,_,X,_,_],
          [_,X,X,_,_],
          [X,_,X,_,_],
          [_,_,X,_,_],
          [_,_,X,_,_],
          [_,_,X,_,_],
          [X,X,X,X,X],
        ],
        num21: [
          [_,X,X,X,_],
          [X,_,_,_,X],
          [_,_,_,_,X],
          [_,_,_,X,_],
          [_,_,X,_,_],
          [_,X,_,_,_],
          [X,X,X,X,X],
        ],
        num31: [
          [X,X,X,X,X],
          [_,_,_,X,_],
          [_,_,X,_,_],
          [_,_,_,X,_],
          [_,_,_,_,X],
          [X,_,_,_,X],
          [_,X,X,X,_],
        ],
        num41: [
          [_,_,_,X,_],
          [_,_,X,X,_],
          [_,X,_,X,_],
          [X,_,_,X,_],
          [X,X,X,X,X],
          [_,_,_,X,_],
          [_,_,_,X,_],
        ],
        num51: [
          [X,X,X,X,X],
          [X,_,_,_,_],
          [X,X,X,X,_],
          [_,_,_,_,X],
          [_,_,_,_,X],
          [X,_,_,_,X],
          [_,X,X,X,_],
        ],
        num61: [
          [_,X,X,X,_],
          [X,_,_,_,_],
          [X,X,X,X,_],
          [X,_,_,_,X],
          [X,_,_,_,X],
          [X,_,_,_,X],
          [_,X,X,X,_],
        ],
        num71: [
          [X,X,X,X,X],
          [_,_,_,_,X],
          [_,_,_,_,X],
          [_,_,_,X,_],
          [_,_,X,_,_],
          [_,_,X,_,_],
          [_,_,X,_,_],
        ],
        num81: [
          [_,X,X,X,_],
          [X,_,_,_,X],
          [_,X,X,X,_],
          [X,_,_,_,X],
          [X,_,_,_,X],
          [X,_,_,_,X],
          [_,X,X,X,_],
        ],
        num91: [
          [_,X,X,X,_],
          [X,_,_,_,X],
          [X,_,_,_,X],
          [X,_,_,_,X],
          [_,X,X,X,X],
          [_,_,_,_,X],
          [_,X,X,X,_],
        ]
      };
        
      // move dot1
      numMatrix.dot1[0].unshift(_);
      numMatrix.dot1[1].unshift(_);
      numMatrix.dot1.unshift([]);
      numMatrix.dot1.unshift([]);
      
      // move dot2
      numMatrix.dot2[0].unshift(_);
      numMatrix.dot2[1].unshift(_);
      numMatrix.dot2.unshift([]);
      numMatrix.dot2.unshift([]);
      numMatrix.dot2.unshift([]);
      numMatrix.dot2.unshift([]);
      numMatrix.dot2.unshift([]);
      
      // move first character 4 columns
      for(var cS = 1; cS <= 4; cS++) {
        for(var r = 0; r < 7; r++) {
          for(var n = 0; n < 10; n++) {
            numMatrix['num'+n+'1'][r].unshift(_);
          };
        };
      };
      // move down all characters 1 row
      for(var c = 0; c < 10; c++) {
        numMatrix['num'+c+'1'].unshift([]);
      };
      
      
      // clone letters
      for(var n=0; n<=9; n++) {
        numMatrix['num'+n+'2'] = [];
        numMatrix['num'+n+'1'].forEach(function(val, index){
          numMatrix['num'+n+'2'][index] = [];
          val.forEach(function(val2, index2){
            numMatrix['num'+n+'2'][index][index2] = val2;
          });
        });
      };
      
      // move second characters 6 more columns
      for(cS = 1; cS <= 6; cS++) {
        for(var r = 1; r < 8; r++) {
          for(var n = 0; n < 10; n++) {
            numMatrix['num'+n+'2'][r].unshift(_);
          };
        };
      };
    
    };
    
    
    this.set = function(number){
      number = ((number < 10) ? '0' : '') + number;
      this.number = number;
      var numArray = number.split(''),
          character1 = numArray[0],
          character2 = numArray[1];
      for(var row = 1; row <= options.dotsHeight; row++) {
        for(var column = 1; column <= options.dotsWidth; column++) {
          matrix[row-1][column-1].classList.remove('active');
        };
      };
      for(var row = 1; row <= options.dotsHeight; row++) {
        for(var column = 1; column <= options.dotsWidth; column++) {
          // DOT
          if(
            typeof numMatrix.dot1[row-1] !== 'undefined' && 
            typeof numMatrix.dot1[row-1][column-1] !== 'undefined' && 
            numMatrix.dot1[row-1][column-1]
          ) matrix[row-1][column-1].classList.add('active');
          // DOT
          if(
            typeof numMatrix.dot2[row-1] !== 'undefined' && 
            typeof numMatrix.dot2[row-1][column-1] !== 'undefined' && 
            numMatrix.dot2[row-1][column-1]
          ) matrix[row-1][column-1].classList.add('active');
          // character 1
          for(var C1 = 0; C1<=9; C1++) {
            if(
              character1 == String(C1) && 
              typeof numMatrix['num'+C1+'1'][row-1] !== 'undefined' &&
              typeof numMatrix['num'+C1+'1'][row-1][column-1] !== 'undefined' &&
              numMatrix['num'+C1+'1'][row-1][column-1]
            ) matrix[row-1][column-1].classList.add('active');
          };
          // character 2
          for(var C2 = 0; C2<=9; C2++) {
            if(
              character2 == String(C2) && 
              typeof numMatrix['num'+C2+'2'][row-1] !== 'undefined' &&
              typeof numMatrix['num'+C2+'2'][row-1][column-1] !== 'undefined' &&
              numMatrix['num'+C2+'2'][row-1][column-1]
            ) matrix[row-1][column-1].classList.add('active');
          };
        };
      };
      if(options.onChange)  options.onChange.apply(this);
    };
    
    this.setOption = function(name, value) {
      options[name] = value;
      style(true);
    };
    
    this.getOption = function(name) {
      return options[name];
    };
    
    this.start = function(){
      var self = this;
      clearInterval(interval);
      interval = setInterval(function(){
        self.time--;
        if(self.time < 0) {
          clearInterval(interval);
          if(options.onComplete) options.onComplete.apply(self);
        } else {
          self.set(self.time);
        };
      }, 1000);
      this.running = true;
    };
    
    this.continue = function(){
      if(!this.running) this.start();
    };
    
    this.stop = function(){
      clearInterval(interval);
      this.running = false;
    };
    
    this.reset = function(setTime){
      setTime = setTime || 0;
      this.time = setTime;
      this.set(this.time);
    };
    
    this.end = function(){
      this.running = false;
      this.time = 0;
      this.set(this.time);
    };
    
    setOptions();
    style();
    buildNumberMatrix();
    build();
    
    setNumber = setNumber || 0;
    
    this.running = false;
    this.number = (setNumber < 10 ? '0' : '') + setNumber;
    this.time = setNumber;
    this.set(setNumber);
    
  };
}());
