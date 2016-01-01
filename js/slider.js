function Slider(noOfSlides) {
  var noOfSlides = noOfSlides;
  var sliderLong = document.querySelectorAll('.sliderLong')[0];
  var slides = document.querySelectorAll('.sliderEl');
  var tracker = document.querySelectorAll('.tracker')[0];
  var active = 1;
  var animator = new Animator(sliderLong);
  var direction = true;
  var sliderTimeout;
  var fps = 10;
  var mlCurrent = 0;
  var ml = 0;
  var intervalId;

  this.start = function() {
    init();
    trackerInit();
    trackButtons();
    sliderTimeout = setTimeout(moveSlides, 3000);

    window.onresize = function(){
       var heightOfContainer = document.querySelectorAll('.sliderDescContainer')[0];
      for(var i = 0; i < noOfSlides; i++){
        var slide = document.querySelectorAll('.sliderEl')[i];
        slide.style.height = heightOfContainer.offsetHeight  + 'px';
      }
    }
  }

  var init = function() {
    sliderLong.style.width = (100 * noOfSlides) + '%';
    var heightOfContainer = document.querySelectorAll('.sliderDescContainer')[0];
    for(var i = 0; i < noOfSlides; i++){
      var slide = document.querySelectorAll('.sliderEl')[i];
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

    ml = (100 * (active-1) * -1);
    trackerChanger();
    animate(1000);
  }

  var trackButtons = function() {
    var leftBtn = document.querySelectorAll('.leftArrow')[0];
    var rightBtn = document.querySelectorAll('.rightArrow')[0];

    leftBtn.addEventListener('click', function(event) {
      if (active != 1){
        --active;
        ml = (100 * (active - 1) * -1);
        clearTimeout(sliderTimeout);
        clearInterval(intervalId);
        trackerChanger();  
        animate(1000);
      }
    });

    rightBtn.addEventListener('click', function(event) {
      if (active != slides.length){
        ++active;
        ml = (100 * (active - 1) * -1);
        clearTimeout(sliderTimeout);
        clearInterval(intervalId);
        trackerChanger();  
        animate(1000);
      }
    });
  }

  var trackerInit = function() {
    debugger
    tracker.style.left = (50 - ((35/(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth))  * 100)) + '%';

    for(var i = 1; i <= slides.length; i++){
      var div = document.createElement('div');
      div.id = i;
      div.addEventListener('click', function(){
        active = this.id;
        ml = (100 * (active-1) * -1);
        clearTimeout(sliderTimeout);
        clearInterval(intervalId);
        trackerChanger();  
        animate(1000);
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

  var animate = function(duration) {
    var counter = 0;
    var step = (ml - mlCurrent)/(duration/fps);

    intervalId = setInterval(function(){
      counter++;
      mlCurrent += step;
      sliderLong.style.marginLeft = mlCurrent + '%';
      if (counter >= duration/fps) {
        clearInterval(intervalId);
        sliderTimeout = setTimeout(moveSlides, 3000);
      }
    }, fps);
  }

}

var slideMe = new Slider(5);
slideMe.start();

