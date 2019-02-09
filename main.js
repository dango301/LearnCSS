// All EventListeners: https://www.w3schools.com/jsref/dom_obj_event.asp

function cl(msg) { console.log(msg); }

var navHeads;
var taskDad;
var progressbar;
var notiButton;
var flexOptionHeads,
    flexMenuSubOriginals;

window.onload = function () {

    let wsEX = document.querySelectorAll("#ws table tr td:last-child");
    wsEX.forEach(ex => {
        ex.innerHTML = "In the code, there is a line break at the end of this very sentence.\nAlso, just before the last word of this sentence are supposed to be multiple                  spaces."
    });

    notiButton = document.querySelector("#btn button");

    // screenSetup();
    slidersSetup();
    flexSetup();

    eventsSetup();
}



function screenSetup() {

    // window.addEventListener("resize", function () { myAwesomeFunc(par1, par2, par3); }); //how you pass parameters in an"anonymous function"

    var allBigs = document.querySelectorAll("header, article, footer");
    allBigs.forEach(biggie => {
        biggie.style.width = "fit-content";
    });
    var allWidth = [];
    allBigs.forEach(w => {
        allWidth.push(w.getBoundingClientRect().width);
    });
    let maxSize = Math.max.apply(null, allWidth);
    allBigs.forEach(e => {
        e.style.width = maxSize + "px";
    });

}

window.onresize = function (event) {
    flexSetup(); //FIX THIS
}


function slidersSetup() {

    changeOpacity(.5);
    changeSize(75);
    changePadding(25);
    changeRotation(0);
}

function eventsSetup() {

    navHeads = document.querySelectorAll("#ex .header");
    navHeads.forEach(x => {
        x.addEventListener("mouseover", showDropdown);
    });

    taskDad = document.querySelector("aside#tasks");
    taskDad.addEventListener("mouseover", taskHover);
    taskDad.addEventListener("mouseleave", taskHoverOut); //USE THIS instead of mouseout; works for selected element only, not any children

    flexOptionHeads = document.querySelectorAll("#flex #menu #first li");
    flexOptionHeads.forEach(head => {

        head.addEventListener("mouseover", changeFlexOptionsText);

        head.addEventListener("mouseleave", function () {
            var subDivs = document.querySelectorAll("#flex #menu #second li");
            subDivs.forEach(el => {
                el.style.animation = "menuSlideAnim .5s linear 0s 1 forwards";
            });
        });

    });

    flexMenuSubOriginals = document.querySelectorAll("#flex #menu #second li");
    for (let i = 0; i < flexMenuSubOriginals.length; i++) {
        let orig = flexMenuSubOriginals[i];
        let clone = orig.cloneNode(true);
        orig.parentNode.replaceChild(clone, orig);
        flexMenuSubOriginals[i] = clone;
    }
}


var colorFlow = 'rgb(255, 47, 65)';
var colorLayout = 'rgb(100, 85, 255)';
var colorOther = 'rgba(53, 255, 105, 1)';

function flexSetup() {

    flexMenuChange(true);

    var exBox = document.querySelector("#flex #ex");
    exBox.style.height = 'calc(60vh * .04)';
    // 0.0425 is a hand-tested value to make the images as large as possible, while keeping the random multiplier in mind, so that no image could be  pushed into another row

    var exBoxRect = exBox.getBoundingClientRect(),
        boxSize = exBoxRect.width * exBoxRect.height;

    var pics = document.querySelectorAll("#flex img"),
        labels = document.querySelectorAll("#flex #ex  p");

    var averagePicSpace = boxSize / pics.length;


    for (let i = 0; i < pics.length; i++) {

        let img = new Image();
        img.src = pics[i].src;
        let origPicSize = img.width * img.height;

        let minValue = (img.width > img.height) ? 1.5 : 1, //minimum multiplier value & enlarge landscape images to emphasize
            range = (img.width * 1.5 < img.height) ? .25 : .75, //if img is very tall, don't enlarge the img too much
            random = Math.random() * range + minValue;
        let multiplier = Math.sqrt(averagePicSpace / origPicSize) * random;

        pics[i].style.width = img.width * multiplier + 'px';
        pics[i].style.height = img.height * multiplier + 'px';

    }

    exBox.style.height = 'auto';
    exBox.style.opacity = 1;
    exBox.style.position = 'relative';


    for (let i = 0; i < labels.length; i++) {
        labels[i].innerHTML = i + 1;

        labels[i].style.left = labels[i].parentElement.offsetLeft + 12 + 'px';
        labels[i].style.top = labels[i].parentElement.offsetTop + 12 + 'px';
    }


    var valueOptions = document.querySelectorAll("#flex #settings .value"),
        valueButtons = document.querySelectorAll("#flex #settings .value button");
    var offset = '-2px';


    for (var i = 0; i < valueOptions.length; i++) {

        for (let n = 0; n < 4; n++) {
            let border = document.createElement("div");
            border.classList.add("border");
            valueOptions[i].insertBefore(border, valueButtons[i]);

            if (n % 2 == 0) { border.style.left = offset }
            else { border.style.right = offset }

            if (n % 3 == 0) { border.style.top = offset }
            else { border.style.bottom = offset }
        }

    }

    let valueHolder = document.querySelector("#flex #settings div");
    valueHolder.style.height = valueHolder.getBoundingClientRect().height + 10 + 'px';


    var flexUp = setInterval(function () { flexUpdate(flexUp) }, 250);
    // The first value-option represents the standard value and therfore has to be selected by default but only when it is well visible on the user's screen
}

function flexUpdate(iv) {
    var flexRect = document.querySelector("#flex #settings").getBoundingClientRect(),
        pos = -flexRect.top,
        vh = window.innerHeight;
    pos += vh;

    if (pos > vh / 2 && pos < vh) {

        setTimeout(function () {
            flexValueActivate(document.querySelector("#flex #settings .value button"));
        }, 750);
        clearInterval(iv);
    }
}


function flexValueActivate(caller) {

    let values = document.querySelectorAll("#flex #settings .value");
    values.forEach(el => {
        el.classList.remove("activated");
    });

    var cValue = caller.parentNode;
    cValue.classList.add("activated");


    let borders = document.querySelectorAll("#flex #settings .value .border");
    for (let i = 0; i < borders.length; i++) {

        borders[i].style.width = '8px';
        borders[i].style.height = '8px';
    }

    var cBorders = cValue.childNodes;
    for (let i = 0; i < 4; i++) {
        cBorders[i].style.width = caller.getBoundingClientRect().width / 2 + 2 + 'px';
        cBorders[i].style.height = caller.getBoundingClientRect().height / 2 - 1 + 'px';
    }
}


var menuOptionText = {
    headers: ['Flow', 'Layout', 'Size'],
    content: [
        ['Direction', 'Wrap', 'Order'],
        ['Justify-Content & Align-Content', 'Justify-Items & Align-Items', 'Justify-Self & Align-Items'],
        ['Flex-Shrink', 'Flex-Grow', 'Flex-Basis']
    ]
};

function changeFlexOptionsText(c) {

    var caller = c.srcElement;
    var subDivs = document.querySelectorAll("#flex #menu #second li");

    for (var i = 0; i < flexOptionHeads.length; i++) {

        if (flexOptionHeads[i] == caller) {
            
            for (let n = 0; n < subDivs.length; n++) {
                let newSubDiv = subDivs[n].parentNode.replaceChild(flexMenuSubOriginals[n], subDivs[n]);
                newSubDiv.innerHTML = menuOptionText.content[i][n];
                cl(newSubDiv.style);
            }

            flexMenuChange();
            return;
        }
    }
}


function flexMenuChange(setup = false) {

    var l = setup ? 0 : 1;
    var menuList = [];
    var lists = document.querySelectorAll("#flex #menu ul");
    var maxListWidth = 0;

    menuList[l] = [];
    var items = lists[l].children;

    for (let i = 0; i < items.length; i++) {
        menuList[l][i] = items[i];

        menuList[l][i].style.width = 'fit-content';
        menuList[l][i].style.opacity = '1';
        menuList[l][i].style.padding = 0;
        let cWidth = menuList[l][i].getBoundingClientRect().width;
        maxListWidth = cWidth > maxListWidth ? cWidth : maxListWidth;

        if (setup) {

            switch (i) {
                case 0:
                    menuList[l][i].style.background = colorFlow;
                    break;
                case 1:
                    menuList[l][i].style.background = colorLayout;
                    break;
                case 2:
                    menuList[l][i].style.background = colorOther;
                    break;
            }

        }

    }

    var slant = 15; // [px]

    var paddingTotal = 100 + slant;
    var newWidth = maxListWidth;
    var maxSlantPercent = slant / (newWidth + paddingTotal) * 100;
    // if total width larger than available space - reduce padding while to big

    for (let i = 0; i < menuList[l].length; i++) {

        menuList[l][i].style.width = newWidth + 'px';

        menuList[l][i].style.clipPath = 'polygon(0 0, ' + (100 - maxSlantPercent) + '% 0, 100% 100%, ' + maxSlantPercent + '% 100%)';

        menuList[l][i].style.padding = '7.5px ' + (paddingTotal / 2) + 'px';
        menuList[l][i].style.left = setup ? (slant * i) + 'px' : (slant * i - slant) + 'px';

        if (!setup) {
            menuList[l][i].style.animation = "menuSlideAnim .5s linear 0s 1 reverse";
        }
    }

}

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


function showDropdown(c) {

    var dur = .25, delay = dur - 0.05;
    var caller = c.srcElement;

    for (let i = 0; i < navHeads.length; i++) {
        if (caller == navHeads[i]) { var nButton = i + 1 }
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
    notiButton.classList.add("blocked");


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

    notiButton.classList.remove("blocked");
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

