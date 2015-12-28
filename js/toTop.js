window.onscroll = function() {tracker()};
var toTop = document.getElementsByClassName('toTopIco')[0];
var style = window.getComputedStyle(toTop);
var startCounterAt = (1440 - window.innerHeight);
var flagger = 1; // for executing counters only once

function tracker () {
  // this handles the toTop button
  if ((window.scrollY) > 100) {
    toTop.style.display = 'block';
  }
  else {
    toTop.style.display = 'none';
  }

  // this handles the counters 
  if(window.pageYOffset > startCounterAt){
    if (flagger == 1) {
      countersInit(); // run the counters
      flagger = 0;         
    }
  }
}

function countersInit() {
  var counters = document.getElementsByClassName("runCounters");
  var length = counters.length;
  for (var j=0; j<length; j++) {
    var counter = counters[j];
    createCounter(counter);
  };
}

function createCounter(counter) {
  var flag = 1;
  var i = 0;
  var id = counter.id;
  id = parseInt(id);

  var incrCount = function() {
    counter.innerHTML = i;
    if(i >= id){
      clearInterval(countId);
    }
    else if ((i+20) > id) {
      i+=1; // if the counter is closer to target number, we decrease the increment factor from 20 to 1
    }
    else {
      i+=20; // default increment is 20     
    }
  }

  if(flag == 1){ 
    flag = 0;
    countId = setInterval(incrCount,5);
  }
}

var animateToTop = new Animator(document.documentElement);
toTop.onclick = function () {
  animateToTop.scrollVertically(0, 700);
};

