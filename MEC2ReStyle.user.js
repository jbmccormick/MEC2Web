// ==UserScript==
// @name         MEC2ReStyle
// @namespace    http://github.com/jbmccormick
// @version      0.2
// @description  Remove extra parts of the MEC2 page
// @author       MECH2
// @match        mec2.childcare.dhs.state.mn.us/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jbmccormick/MEC2Web/master/
// ==/UserScript==

(function() {
    'use strict';
/* globals jQuery, $, waitForKeyElements */
document.getElementsByClassName("panel-default")[0].style = "background-color: #f5f5f5; margin-top: -40px !important;";
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
addGlobalStyle('.panel-box-format { margin-bottom: 2px !important; margin-top: 2px !important; }');//Confirmed works
addGlobalStyle('h1 { margin-bottom: 0px !important; margin-top: 0px !important; }');//Confirmed works
addGlobalStyle('form { margin-top: 3px !important; }');//Shrink margin from 'form' elements
addGlobalStyle('label { padding-bottom: 0px !important; padding-top: 9px !important; margin-bottom: 0px !important; margin-top: 0px !important; }');//Shrink margin from 'form' elements
if (window.location.href.indexOf("CaseOverview") > -1) {
addGlobalStyle('label { padding-bottom: 0px !important; padding-top: 0px !important; margin-bottom: 0px !important; margin-top: 0px !important; }');//Shrink margin from 'form' elements
};
addGlobalStyle('.form-group { margin-bottom: 3px !important; }');
addGlobalStyle('.form-control { margin-bottom: 2px !important; padding-bottom: 6px !important; padding-top: 6px !important;}');
if (window.location.href.indexOf("CaseExpense") > -1) {
    document.getElementById('caseHeaderData').nextElementSibling.setAttribute('clear', 'all');
};
if (window.location.href.indexOf("Alerts") > -1) {
//SECTION START Resize the alert text viewable area SECTION START
addGlobalStyle ('#message {	resize: none; width: 700px !important; padding: 5px; overflow: hidden; box-sizing: border-box; }');
    $("#alertTable").on('click', function() {
        $("#message").css('height', '100px');
        var scroll_height = $("#message").get(0).scrollHeight;
        $("#message").css('height', scroll_height + 'px');
    });
};
//SECTION END Resize the alert text viewable area SECTION END
//SECTION START Delete BR if before panel-box-format, after form-group, around h4
let fgClassList = document.getElementsByClassName('form-group');
for (let i = 0; i < fgClassList.length; i++) {
    if (fgClassList[i].nextElementSibling && fgClassList[i].firstElementChild !== 'script') {
        if (fgClassList[i].nextElementSibling.tagName == 'BR') {
            fgClassList[i].nextElementSibling.setAttribute('clear', 'all');
        };
    };
    if (fgClassList[i].nextElementSibling && fgClassList[i].nextElementSibling.nextElementSibling) {
        if (fgClassList[i].nextElementSibling.nextElementSibling.tagName == 'BR') {
            fgClassList[i].nextElementSibling.nextElementSibling.remove();
        };
    };
};
//SECTION START Cause Fraud is special
let fgClassListFraud = document.getElementsByClassName('form-group');
for (let i = 0; i < fgClassListFraud.length; i++) {
    if (fgClassListFraud[i].firstElementChild && fgClassListFraud[i].firstElementChild !== 'script') {
        if (fgClassListFraud[i].firstElementChild.tagName == 'BR') {
            fgClassListFraud[i].firstElementChild.setAttribute('clear', 'all');
        };
    };
    if (fgClassListFraud[i].firstElementChild && fgClassListFraud[i].firstElementChild.nextElementSibling) {
        if (fgClassListFraud[i].firstElementChild.nextElementSibling.tagName == 'BR') {
            fgClassListFraud[i].firstElementChild.nextElementSibling.remove();
        };
    };
};
//SECTION END Cause Fraud is special
let pbfClassList = document.getElementsByClassName('panel-box-format');
for (let i = 0; i < pbfClassList.length; i++) {
    if (pbfClassList[i].previousElementSibling) {
        if (pbfClassList[i].previousElementSibling.tagName == 'BR'){
            pbfClassList[i].previousElementSibling.remove()
        };
    };
    if (pbfClassList[i].parentNode.previousElementSibling) {
        if (pbfClassList[i].parentNode.previousElementSibling.tagName == 'BR'){
            pbfClassList[i].parentNode.previousElementSibling.remove()
        };
    };
};
let h4brs = document.getElementsByTagName('H4');
for (let i = 0; i < h4brs.length; i++) {
    if (h4brs[i].previousElementSibling) {
        if (h4brs[i].previousElementSibling.tagName == 'BR'){
            h4brs[i].previousElementSibling.remove()
        };
    };
    if (h4brs[i].nextElementSibling) {
        if (h4brs[i].nextElementSibling.tagName == 'BR'){
            h4brs[i].nextElementSibling.remove()
        };
    };
};
//SECTION END
//SECTION START Custom fix for Provider Address table
if (window.location.href.indexOf("ProviderAddress") > -1) {
let newBr = document.createElement('br');
    let newBrHome = document.getElementById('providerData');
    newBr.insertAdjacentElement("afterend", newBrHome)
    newBrHome.nextElementSibling.setAttribute('clear','all');
};
//SECTION END Custom fix for Provider Address table
//SECTION START Case Notes custom styles
if (window.location.href.indexOf("CaseNotes") > -1) {
    document.getElementsByClassName('panel-box-format')[1].style.display = "none";
    document.getElementById('noteStringText').setAttribute('rows', '30');
};
//SECTION END Case Notes custom styles
//SECTION START Delete all alerts of current name
$("#caseOrProviderTable").on('click', function() {

});
if (window.location.href.indexOf("Alert") > -1) {
    console.log(sessionStorage.getItem('storedCase'));
    let storedCaseName = sessionStorage.getItem('storedCase');
    $('#caseOrProviderTable option:contains(storedCase)')//Doesn't work
/*
$('#caseOrProviderTable option:contains(storedCase)')
$("#caseOrProviderTable").select?
*/
    let deleteButton = document.getElementById("delete");
    let btnNavigation = document.createElement('button');
    btnNavigation.type = 'button';
    btnNavigation.innerHTML = "Delete All";
    btnNavigation.id = "buttonDeleteAll";
    btnNavigation.className = 'form-button custom-form-button';
    btnNavigation.addEventListener("click", function() { deleteAllAlerts()});
    deleteButton.insertAdjacentElement('afterend', btnNavigation);
};
function deleteAllAlerts() {
    let selectedCase = document.getElementsByClassName("selected")[0].childNodes[1].innerHTML
    sessionStorage.setItem('storedCase', selectedCase);//key, value
    console.log(selectedCase);
    alert("Yeah, wouldn't this be nice?");
};
//SECTION END Delete all alerts of current name
//SECTION START Reverses Period options order, makes most recent visible SECTION START
let checkForId = document.getElementById("selectPeriod");
if(checkForId) {
    $('.form-control option').each(function () {
$(this).prependTo($(this).parent());
});
};
//SECTION END Reverses Period options order, makes most recent visible SECTION END
//SECTION START Next/Prev button area SECTION START
let selectPeriodDropdown = document.getElementById('selectPeriod');
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
    };
//SECTION END Next/Prev button area SECTION END
})();
