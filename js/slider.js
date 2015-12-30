function Slider(noOfSlides) {
  var noOfSlides = noOfSlides;
  var sliderLong = document.getElementsByClassName('sliderLong')[0];
  var slides = document.getElementsByClassName('sliderEl');
  var tracker = document.getElementsByClassName('tracker')[0];
  var active = 1;
  var animator = new Animator(sliderLong);
  var direction = true;
  var animationIntervalId;
  var currentInitial = 0;

  this.start = function() {
    init();
    trackerInit();
    animationIntervalId = setInterval(moveSlides, 3000);
    trackButtons();
  }

  var init = function() {
    sliderLong.style.width = (100 * noOfSlides) + '%';
    var heightOfContainer = document.getElementsByClassName('sliderDescContainer')[0];
    for(var i = 0; i < noOfSlides; i++){
      var slide = document.getElementsByClassName('sliderEl')[i];
      slide.style.width = (100/noOfSlides) + '%';
      slide.style.height = heightOfContainer.offsetHeight  + 'px';
    }
  }

  var moveSlides = function() {
    if (direction == true && active < slides.length) {
      ++active;
    }
    else if (direction == true && active == slides.length) {
      --active;
      direction = false;
    }
    else if (direction == false && active > 1) {
      --active;
    }
    else if (direction == false && active == 1) {
      ++active;
      direction = true;
    }

    var ml = (100 * (active-1) * -1);
    animate('margin-left', ml, 1000);
    trackerChanger();
  }

  var trackButtons = function() {
    var leftBtn = document.getElementsByClassName('leftArrow')[0];
    var rightBtn = document.getElementsByClassName('rightArrow')[0];

    leftBtn.addEventListener('click', function(event) {
      if (active != 1){
        --active;
        ml = (100 * (active - 1) * -1);
        finish('margin-left', ml);
        trackerChanger();  

        // animationIntervalId = setInterval(moveSlides, 3000);      
      }
    });

    rightBtn.addEventListener('click', function(event) {
      if (active != slides.length){
        ++active;
        ml = (100 * (active - 1) * -1);
        finish('margin-left', ml);
        trackerChanger();

        // animationIntervalId = setInterval(moveSlides, 3000);     
      }
    });
  }

  var trackerInit = function() {
    tracker.style.left = ((window.innerWidth/2) - (70/2)) + 'px';

    for(var i = 1; i <= slides.length; i++){
      var div = document.createElement('div');
      div.id = i;
      div.addEventListener('click', function(){
        active = this.id;
        ml = (100 * (active-1) * -1);
        finish('margin-left', ml);
        // animationIntervalId = setInterval(moveSlides, 3000);      
        trackerChanger();
      });
      tracker.appendChild(div);
    }
  }

  var trackerChanger = function() {
    for(var i=1 ; i<=slides.length; i++){
      document.getElementById(i).className= '';
    }
    document.getElementById(active).className = 'active';
  }

  var animate = function(cssProperty, value, duration) {
    var style = window.getComputedStyle(sliderLong);
    var initial = currentInitial;
    initial = parseInt(initial);

    console.log(initial + " " + value);
    var tempInitial = initial;

    var intervalLength = 10;

    var step = (value - initial) / (duration / intervalLength);
        
    animationIntervalId = intervalTrigger(initial, cssProperty, step, duration, intervalLength);
    currentInitial = value;    
  }

  var intervalTrigger = function(initial, cssProperty, step, duration, intervalLength){
    var counter=0;
    var tempInitial = initial;
    var intervalId= window.setInterval(function() {
      counter++;
      tempInitial+=step;
      sliderLong.style[cssProperty] = tempInitial + '%';
      if (counter >= duration/intervalLength){
        window.clearInterval(intervalId);
      }
    }, intervalLength);

    return intervalId;
  }

  var finish = function(cssProperty, value) {
    clearInterval(animationIntervalId);
    sliderLong.style[cssProperty] = value + '%';
  }

}

var slideMe = new Slider(5);
slideMe.start();

