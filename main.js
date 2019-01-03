// All EventListeners: https://www.w3schools.com/jsref/dom_obj_event.asp

function cl(msg) { console.log(msg); }

var headers, taskDad;
var rect, mover;
var progressbar;


window.onload = function () {

    /* #region Major fuck-up */

    // // window.addEventListener("resize", function () { myAwesomeFunc(par1, par2, par3); }); //how you pass parameters in an"anonymous function"

    // var allBigs = document.querySelectorAll("header, article, footer");
    // allBigs.forEach(biggie => {
    //     biggie.style.width = "fit-content";
    // });
    // var allWidth = [];
    // allBigs.forEach(w => {
    //     allWidth.push(w.getBoundingClientRect().width);
    // });
    // let maxSize = Math.max.apply(null, allWidth);
    // allBigs.forEach(e => {
    //     e.style.width = maxSize + "px";
    // });

    /* #endregion */

    changeOpacity(.5);
    changeSize(75);
    changePadding(25);
    changeRotation(0);

    document.querySelector("header #container").addEventListener("mouseover", textAnim);
    document.querySelector("header #container").addEventListener("mouseleave", textAnimEnd);

    headers = document.querySelectorAll("#ex .header");
    headers.forEach(x => {
        x.addEventListener("mouseover", showDropdown);
    });

    taskDad = document.querySelector("aside#tasks");
    taskDad.addEventListener("mouseover", taskHover);
    taskDad.addEventListener("mouseleave", taskHoverOut); //USE THIS instead of mouseout; works for selected element only, not its stupid children


    rect = document.querySelector("#trans3 .containerHold:first-child").getBoundingClientRect();
    mover = document.querySelector("#trans3 #movable");
    mover.style.width = rect.width - 4 + "px";
    mover.style.height = rect.height - 4 + "px";
    mover.style.left = -rect.width + 2 + "px";

    document.querySelector("#trans3 #grid").addEventListener("mouseover", transHover);
    document.querySelector("#trans3 #grid").addEventListener("mouseleave", transHoverOut);
}



/* #region Terrible header Animation */

function textAnim() {
    document.querySelector("header #container table:lastchild").classList.add("start");
}
function textAnimEnd() {
    document.querySelector("header #container table:lastchild").classList.remove("start");
}

function transHover() {
    mover.style.left = rect.width - 2 + "px";
}
function transHoverOut() {
    mover.style.left = -rect.width + 2 + "px";
}

/* #endregion */


/* #region Change Sliders */

function changeSize(value) {

    document.querySelector("#cValue1").innerHTML = value + "px";
    document.querySelector("#n2 #bi2").style.backgroundSize = value + "px";
}

function changePadding(value2) {

    document.querySelector("#cValue2").innerHTML = "0px " + value2 + "px";
    document.querySelector("#n4 #bi3").style.padding = "0px " + value2 + "px";
}

function changeOpacity(value) {

    document.querySelector("#cValue3").innerHTML = value;
    document.querySelector("#yeet").style.opacity = value;
}

function changeRotation(value) {

    document.querySelector("#lin3").style.background = "linear-gradient(" + value + "deg, #000 30%, #FFF 70%)";
}

/* #endregion */


function taskHover(c) {
    document.querySelector("aside#tasks").style.overflow = "auto";
}
function taskHoverOut(c) {
    var caller = c.srcElement;
    caller.scrollTop = 0;
    caller.style.overflow = "hidden";
}


var dur = .25, delay = dur - 0.05;
function showDropdown(c) {

    var caller = c.srcElement;
    for (let i = 0; i < headers.length; i++) {
        if (caller == headers[i]) { var nButton = i + 1 }
    }

    var kids = caller.querySelectorAll("ul li");
    for (let i = 0; i < kids.length; i++) {
        kids[i].style.animation = "dropanim" + nButton + " " + dur + "s ease-in-out " + delay * i + "s 1 forwards";
    }
}


/* #region Notification */

var iv1, isGoing = false; //iv1 is short for interval n
var maxTime = 5000, passedTime = 0, interval = 10, maxWidth = 0;

function notification() {

    if (isGoing) { return; }
    isGoing = true;
    resetAnim();

    progressbar = document.querySelector("#noti #progress");
    progressbar.style.opacity = 1;

    let textInput = document.querySelector("#btn input"), textShow = document.querySelector("#noti #content p");
    if (textInput.value == '') {
        let standardText = 'An important message';
        textShow.innerHTML = standardText;
        textInput.value = standardText;
    }
    else {
        textShow.innerHTML = textInput.value;
    }

    document.querySelector("#noti").style.animation = "showNoti .75s ease-in-out .25s 1 forwards";
    document.querySelector("#noti #content").style.animation = "showText .33s ease-in-out 1s 1 forwards";
    document.querySelector("#noti #img").style.animation = "showBell .66s ease-in-out 1s 1 forwards";
    iv1 = setInterval(Timer, interval);
    setTimeout(getWidth, 1330); //wait until progressbar unfolds
}
function getWidth() { maxWidth = progressbar.getBoundingClientRect().width; }


function removeNoti() {

    resetAnim(true);
    var notiEl = document.querySelector("#noti");
    notiEl.style.zIndex = 98;
    notiEl.style.opacity = 1;
    notiEl.style.animation = "outNoti 1s ease-in-out 0s 1 forwards";
    document.querySelector("#noti #content").style.animation = "showText .33s ease-in-out 0s 1 reverse";
    document.querySelector("#noti #img").style.animation = "showBell .66s ease-in-out 0s 1 reverse";
    setTimeout(resetEl, 1000);
}
function resetEl() {

    var notiEl = document.querySelector("#noti");
    notiEl.style.zIndex = -98;
    notiEl.style.opacity = 0;
    isGoing = false;
}


function resetAnim(end = false) {

    if (end) { progressbar.style.width = "auto"; progressbar.style.opacity = 0; }
    var original = document.querySelector("#noti");
    var clone = original.cloneNode(true);
    original.parentNode.replaceChild(clone, original);
}
function Timer() {

    if (passedTime < maxTime && maxWidth >= 200) { //200px was specified in the CSS as the min-width
        passedTime += interval;
        progressbar.style.width = maxWidth * (1 - passedTime / maxTime) + "px";
    }

    if (passedTime >= maxTime) {
        clearInterval(iv1);
        removeNoti();
        maxWidth = 0;
        passedTime = 0;
    }
}

function clearText(caller) {
    if (caller.value == 'An important message') caller.value = '';
}

/* #endregion */