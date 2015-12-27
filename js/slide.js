var active = 1;
var slider = document.getElementsByClassName("sliderLong")[0];
var sliderLong = slider.children[0];
var slides = slider.children;
var animator = new Animator(slider);
var screenSize = window.getComputedStyle(slides[0]);
var imgWidth = parseInt(screenSize.getPropertyValue('width'));
var direction = true;

var tracker = document.getElementsByClassName('tracker')[0];
tracker.style.left = ((window.innerWidth/2) - (70/2)) + 'px';

for(var i = 1; i<=slides.length; i++){
  var div = document.createElement('div');
  div.id = i;
  div.addEventListener('click', function(){
    active = this.id;
    ml = (imgWidth * (active-1) * -1);
    animator.finish("margin-left", ml, sliderId);
    sliderId = setInterval(slide, 3000);      
    trackerChanger();
  });
  tracker.appendChild(div);
}

function trackerChanger(){
  for(var i=1 ; i<=slides.length; i++){
    document.getElementById(i).className= '';
  }
  document.getElementById(active).className = 'active';
}

function slide() {
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

  var ml = (imgWidth * (active-1) * -1);
  animator.animate("margin-left", ml, 700);
  trackerChanger();
}

function clickMe (sliderId) {
  var leftBtn = document.getElementsByClassName('leftArrow')[0];
  var rightBtn = document.getElementsByClassName('rightArrow')[0];

  leftBtn.addEventListener('click', function(event) {
    if (active != 1){
      --active;
      ml = (imgWidth * (active - 1) * -1);
      animator.finish("margin-left", ml, sliderId);
      trackerChanger();      
      sliderId = setInterval(slide, 3000);      
    }
  });

  rightBtn.addEventListener('click', function(event) {
    if (active != slides.length){
      ++active;
      ml = (imgWidth * (active - 1) * -1);
      animator.finish("margin-left", ml, sliderId);
      trackerChanger();
      sliderId = setInterval(slide, 3000);      
    }
  });
}

trackerChanger();
var sliderId = setInterval(slide, 3000);
clickMe(sliderId);