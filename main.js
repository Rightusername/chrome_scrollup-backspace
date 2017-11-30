var scrollArea = document.createElement('div');
scrollArea.style.width = "3px";
scrollArea.style.height = document.body.clientWidth + "px";
scrollArea.style.background = "rgba(33,33,33,0.2)";
scrollArea.style.zIndex = "1000";
scrollArea.style.position = "fixed";
scrollArea.style.top = "0";
scrollArea.style.left = "0";
scrollArea.className = "up";
document.body.appendChild(scrollArea);

var pageYLabel = 0;

scrollArea.onclick = function () {
    var pageY = window.pageYOffset || document.documentElement.scrollTop;

    switch (this.className) {
        case 'up':
            pageYLabel = pageY;
            window.scrollTo(0, 0);
            this.className = 'down';
            break;

        case 'down':
            window.scrollTo(0, pageYLabel);
            this.className = 'up';
    }
    console.log(pageYLabel);
    
    
}

window.onscroll = function () {
    console.log(pageYLabel);
    var pageY = window.pageYOffset || document.documentElement.scrollTop;
    var innerHeight = document.documentElement.clientHeight;

    switch (scrollArea.className) {
        case 'down':
            if (pageY > innerHeight) {
                scrollArea.className = 'up';
            }
            break;
    }
}



// BackSpace Return 

document.onkeydown = function (e) {
    if (e.key !== 'Backspace') {
        return;
    }
    // Overcomes issues with custom elements wrapping INPUT
    const target = event.path[0];
    // Do not handle user input on input and textarea elements.
    // In some scenarios tagName can be lowercase. Ensure we catch that.
    if (["input", "textarea"].indexOf(target.tagName.toLowerCase()) > -1) {
        return;
    }
    // Do not handle elements with contenteditable = true
    if (target.isContentEditable) {
        return;
    }
    // Do not handle alongside modifiers except Shift key
    if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
    }
    e.preventDefault();
    if (e.shiftKey) {
        window.history.forward();
    } else {
        window.history.back();
    }
};