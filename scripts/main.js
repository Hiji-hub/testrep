const headerElem = document.querySelector('.header');
const mainElem = document.querySelector('.main-page');
const appElem = document.querySelector('.wrapper');
//console.log(mainElem);
mainElem.style.height = String(screen.height - headerElem.scrollHeight - 200)+'px';



const sections = document.querySelectorAll('.section');
document.onmouseover
let currentSection = 0;
scrollToSection(currentSection);



// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

let block = false;

function preventDefault(e) {
  e.preventDefault();
  //console.log(e.deltaY);
  

  
    if (block == false) {
        block = true;
        if (e.deltaY < -1)  --currentSection;
        else if (e.deltaY > 1) ++currentSection;
        
        if (currentSection < 0) currentSection = 0;
        else if (currentSection > (sections.length - 1)) currentSection = (sections.length - 1);
        
        scrollToSection(currentSection);
    }
    //setTimeout(unBlock, 450)
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

disableScroll();




function scrollToSection(i) {
  document.getElementById(sections[i].id).scrollIntoView({
    behavior: 'smooth'
  });
  setTimeout(unBlock, 450)
}

function unBlock () {
    block = false;
}