window.onscroll = function() {tracker()};
var toTop = document.getElementsByClassName('toTopIco')[0];
var style = window.getComputedStyle(toTop);

function tracker () {
  // if ((window.scrollY) >= window.innerHeight) {
  if ((window.scrollY) > 100) {
    toTop.style.display = 'block';
  }
  else {
    toTop.style.display = 'none';
  }
}