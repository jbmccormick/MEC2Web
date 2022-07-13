// ==UserScript==
// @name         MEC2ReStyle
// @namespace    http://github.com/jbmccormick
// @version      0.1
// @description  Remove extra parts of the MEC2 page
// @author       MECH2
// @match        mec2.prod2.dhs.state.mn.us/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jbmccormick/MEC2Web/master/
// ==/UserScript==

(function() {
    'use strict';
/* globals jQuery, $, waitForKeyElements */
document.getElementsByClassName("panel-default")[0].style = "background-color: #f5f5f5; margin-top: -40px;";
document.getElementsByClassName("form-group")[0].style = "margin-bottom: 4px;";
document.body.style = "background-color: #eee";
function addGlobalStyle(css) { //To allow for adding CSS styles
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};
//addGlobalStyle('.panel-box-format { padding-bottom: 0px !important; padding-top: 0px !important; }');//shrink panel-box-format 10px
addGlobalStyle('.panel-box-format { margin-bottom: 0px !important; margin-top: 0px !important; }');//shrink panel-box-format 10px
addGlobalStyle('.form-group { margin-bottom: 0px !important; }');//shrink panel-box-format 10px
addGlobalStyle('h4 { margin-bottom: 0px !important; margin-top: 0px !important; }');//shrink panel-box-format 10px
//addGlobalStyle('br { line-height:5px !important }');//shrink panel-box-format 10px
addGlobalStyle('br { content: " "; display: block; margin: 4px; }');
if (window.location.href.indexOf("Alerts") > -1) {
addGlobalStyle ('#message {	resize: none; width: 700px !important; padding: 5px; overflow: hidden; box-sizing: border-box; }');//SECTION START Resize the alert text viewable area SECTION START
//addGlobalStyle ('.form-group { margin-bottom: 0px !important; }');
$("#alertTable").on('click', function() {
	$("#message").css('height', '100px');
	var scroll_height = $("#message").get(0).scrollHeight;
	$("#message").css('height', scroll_height + 'px');
});//SECTION END Resize the alert text viewable area SECTION END
//SECTION START Attempting to register hotkeys SECTION START
function doc_keyUp(e) { // define a handler
    if (e.altKey && e.key === 'd') {
        window.event.returnValue = false;
        window.event.cancelBubble = true;
        window.event.keyCode = 0;
        e.preventDefault();
        alert('Hotkey working');
    }
}
document.addEventListener('keyup', doc_keyUp, false);// register the handler
};//SECTION END Attempting to register hotkeys SECTION END
let checkForId = document.getElementById("selectPeriod"); //SECTION START Reverses Period options order, makes most recent visible SECTION START
if(checkForId) {
    $('.form-control option').each(function () {
$(this).prependTo($(this).parent());
});
}; //SECTION END Reverses Period options order, makes most recent visible SECTION END
let selectPeriodDropdown = document.getElementById('selectPeriod'); //SECTION START Next/Prev button area SECTION START
    if (selectPeriodDropdown) {
        let back = "<span style='font-size:80%; z-index:1;' class='glyphicon glyphicon-chevron-left'></span>";
        let backgo = "<span style='font-size:80%; z-index:1;' class='glyphicon glyphicon-fast-backward'></span>";
        let forward = "<span style='font-size:80%; z-index:1;' class='glyphicon glyphicon-chevron-right'></span>";
        let forwardgo = "<span style='font-size:80%; z-index:1;' class='glyphicon glyphicon-fast-forward'></span>";
        let selectPeriodParent = document.getElementById('selectPeriod').parentNode;
        const buttonsNextPrev = [ //"Button Text", "ButtonId", "Next or Prev", "Stay or Go"]
            [backgo, "backGoSelect", "Prev", "Go"],
            [back, "backSelect", "Prev", "Stay"],
            [forwardgo, "forwardGoSelect", "Next", "Go"],
            [forward, "forwardSelect", "Next", "Stay"],
        ];
        for(let i = 0; i < buttonsNextPrev.length; i++){
            let btnNavigation = document.createElement('button');
            btnNavigation.innerHTML = buttonsNextPrev[i][0];
            btnNavigation.id = buttonsNextPrev[i][1];
            btnNavigation.type = 'button';
            btnNavigation.setAttribute('data-NextOrPrev', buttonsNextPrev[i][2]);
            btnNavigation.setAttribute('data-StayOrGo', buttonsNextPrev[i][3]);
            btnNavigation.className = 'custombutton';
            if (buttonsNextPrev[i][2] == 'Prev') {
                selectPeriodParent.insertBefore(btnNavigation, selectPeriodDropdown)
            } else {
                selectPeriodParent.insertBefore(btnNavigation, selectPeriodDropdown.nextSibling)
            };
            btnNavigation.addEventListener("click", function() { selectNextPrev(this.id)});
        };
        function selectNextPrev(clickedButton){
            if (document.getElementById(clickedButton).getAttribute('data-NextOrPrev') == "Next") {
                if (selectPeriodDropdown.selectedIndex == 0) {
                    return
                }
                selectPeriodDropdown.selectedIndex--;//Subtract to go towards top of list
                if (document.getElementById(clickedButton).getAttribute('data-StayOrGo') == "Go") {
                    document.getElementById('caseInputSubmit').click();
                }
            } else {
                selectPeriodDropdown.selectedIndex++;
                if (document.getElementById(clickedButton).getAttribute('data-StayOrGo') == "Go") {
                    document.getElementById('caseInputSubmit').click();
                }
            }
                console.log(selectPeriodDropdown.selectedIndex);
        };
    }; //SECTION END Next/Prev button area SECTION END
/*
if (document.getElementById('edit')) { //Start 'Move default buttons' area
let buttonBar = document.getElementById('edit').parentNode.parentNode
buttonBar.cloneNode(true)
document.getElementsByClassName('panel panel-default')[0].insertAdjacentElement("afterbegin", buttonBar)
}; //End 'Move default buttons' area
*/
// Code Storage Area:

//addGlobalStyle ('br { display: block; /* makes it have a width */content: ""; /* clears default height */margin-top: 25px; /* change this to whatever height you want it */}')
// let brs = document.querySelectorAll('br');
//     for(let i = 0; i < brs.length; i++) {
//         brs[i].remove();
//     }
//Page Specific Changes
/* if (window.location.href.indexOf("Login") > -1) {
    alert("your url contains the name Login");
}; */
})();
