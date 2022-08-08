// ==UserScript==
// @name         MEC2ReStyle
// @namespace    http://github.com/jbmccormick
// @version      0.38
// @description  Remove extra parts of the MEC2 page
// @author       MECH2
// @match        mec2.childcare.dhs.state.mn.us/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jbmccormick/MEC2Web/master/MEC2ReStyle.user.js
// ==/UserScript==

(function() {
    'use strict';
/* globals jQuery, $, waitForKeyElements */
if (document.getElementsByClassName("panel-default")[0] !== undefined) { document.getElementsByClassName("panel-default")[0].style = "background-color: #f5f5f5; /*margin-top: -20px !important;*/"; };
//document.getElementsByClassName("form-group")[0].style = "margin-bottom: 4px;";
function addGlobalStyle(css) { //To allow for adding CSS styles
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};
addGlobalStyle('body { background-color: #eee }');
addGlobalStyle('.panel-box-format { margin-bottom: 2px !important; margin-top: 2px !important; background-color: #faf9f5 !important }');//Shrinks space between green panels
addGlobalStyle('h1 { margin-bottom: 0px !important; margin-top: 0px !important; }');//Shrinks space around page titles
addGlobalStyle('form { margin-top: 3px !important; }');//Shrinks margin from 'form' elements
//addGlobalStyle('label { vertical-align: text-top !important; }');
//addGlobalStyle('label { padding-bottom: 0px !important; margin-bottom: 0px !important; margin-top: 0px !important; }'); //padding-top: 9px !important;
addGlobalStyle('.form-group { margin-bottom: 3px !important; }');//Shrink margin from 'form' elements
addGlobalStyle('.form-control { margin-bottom: 2px !important; padding-bottom: 6px !important; padding-top: 6px !important;}');
addGlobalStyle('#noteStringText { width: 818px !important; }');//CaseNotes Note fixed width
addGlobalStyle('tbody tr td { padding: 5px 10px !important; }');//Table entry height
addGlobalStyle('.ui-datepicker { width: 20em !important; }');//calendar width fix
addGlobalStyle('#ui-datepicker-div table thead tr th { color: white; }');//calendar days font color
addGlobalStyle('.borderless { border: 1px #bfbfbf solid !important; background-color: white !important }');
addGlobalStyle('.col-lg-12.padL0.textInherit { padding-top: 0px !important }');
// --- Single page fixes --- Single page fixes --- Single page fixes ---
//SECTION START Fixing the table height of the Case Notice table to show more notices
if (window.location.href.indexOf("CaseNotices") > -1) {
    $(".dataTables_scrollBody").css('max-height', '400px');
}
//SECTION END Fixing the table height of the Case Notice table to show more notices
//SECTION START Resize the Alert page's Explanation viewable area
if (window.location.href.indexOf("Alerts") > -1) {
addGlobalStyle('label { vertical-align: inherit !important; }');
addGlobalStyle ('#message {	resize: none; width: 450px !important; padding: 5px; overflow: hidden; box-sizing: border-box; }');
    $("#alertTable").on('click', function() {
        $("#message").css('height', '100px');
        $("#message").css('height', $("#message").get(0).scrollHeight + 'px');
    });
};
//SECTION END Resize the Alert page's Explanation viewable area
//SECTION START Custom text for CaseWrapUp
if (window.location.href.indexOf("CaseWrapUp") > -1) {
    document.getElementById('caseWrapUpTableData').firstElementChild.innerText = "Double check which period you made changes in before Wrap Up. Double Wrap Up has been locking cases."
};
//SECTION END Custom text for CaseWrapUp
//SECTION START Custom fix for CaseOverview
if (window.location.href.indexOf("CaseOverview") > -1) {
    addGlobalStyle('label { padding-bottom: 0px !important; padding-top: 0px !important; margin-bottom: 0px !important; margin-top: 0px !important; }');//Shrink margin from 'form' elements
    document.getElementById('caseData').style.clear = "both";
    document.getElementById('participantInformationData_wrapper').getElementsByClassName('sorting')[0].click();//participantInformationData_length
};
//SECTION END Custom fix for CaseOverview
//SECTION START Custom fix for CaseSpecialLetter
if (window.location.href.indexOf("CaseSpecialLetter") > -1) {
    document.getElementById('comments').setAttribute('rows', '15');
};
//SECTION END Custom fix for CaseSpecialLetter
//SECTION START Custom fix and text for CaseEligibilityResultSelection
if (window.location.href.indexOf("CaseEligibilityResultSelection") > -1) {
    addGlobalStyle('#message { font-size: 130%; background-color: yellow }');
    document.getElementById('message').innerHTML = "Select a program record listed above and click Select below to view the Eligibility Results."
    document.getElementsByClassName('sorting')[5].click();//sort by approval status
};
//SECTION END Custom fix and text for CaseEligibilityResultSelection
//SECTION START Case Notes custom styles
if (window.location.href.indexOf("CaseNotes") > -1) {
    document.getElementsByClassName('panel-box-format')[1].style.display = "none";
    document.getElementById('noteStringText').setAttribute('rows', '29');
};
//SECTION END Case Notes custom styles
//SECTION START Permanent fix for case notes - case notes saved when state broke them are permanently broken
function fixCaseNoteDisplay() {
    let fixedCaseNote = document.getElementById('noteStringText').value.replaceAll('/n', '\n');
    document.getElementById('noteStringText').value = fixedCaseNote
};
if (window.location.href.indexOf("CaseNotes") > -1) {
let caseNoteTable = document.getElementById('caseNotesTable');
caseNoteTable.addEventListener("click", function() { fixCaseNoteDisplay()});
fixCaseNoteDisplay()
};
//SECTION END Permanent fix for case notes - case notes saved when state broke them are permanently broken
//SECTION START Remove double+ BRs, apply site's clearfix class to elements, remove odd break when md+
$('br + br').remove();
$('.panel-box-format').addClass('clearfix');
$('.form-group').addClass('clearfix');
let justHasBr = document.querySelectorAll('.visible-lg.visible-md');
    for (let j = 0; j < justHasBr.length; j++) {
        if(justHasBr[j].childElementCount == 1 && justHasBr[j].firstElementChild.tagName == 'BR') {
            justHasBr[j].remove();
        };
    };
if (document.getElementsByClassName("panel-default")[0] !== undefined && document.querySelector('.panel.panel-default > div > form > div:nth-of-type(3) > div').childElementCount > 2 && document.querySelector('.panel.panel-default > div > form > div:nth-of-type(3) > div').lastElementChild.tagName == 'BR') {
    document.querySelector('.panel.panel-default > div > form > div:nth-of-type(3) > div').lastElementChild.remove();
};
//SECTION START Delete BR if before panel-box-format, after form-group, around h4
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
let fgClassList = document.getElementsByClassName('form-group');
for (let i = 0; i < fgClassList.length; i++) {
    if (fgClassList[i].nextElementSibling) {
        if (fgClassList[i].nextElementSibling.tagName == 'BR') {
            fgClassList[i].nextElementSibling.remove();
        };
    };
    if (fgClassList[i].firstElementChild && fgClassList[i].firstElementChild !== 'script') {
        if (fgClassList[i].firstElementChild.tagName == 'BR') {
            fgClassList[i].firstElementChild.remove();
        };
    };
};
//SECTION END Delete BR if before panel-box-format, after form-group, around h4
//SECTION START Clean Header section of pages, removing extra BRs
function cleanHeader() {
    let cHD = (document.getElementById('caseHeaderData'))
    if (document.getElementById('caseHeaderData')) {
        if (cHD.parentNode.previousElementSibling.tagName == 'BR') {
            cHD.parentNode.previousElementSibling.remove();
        };
        if (cHD.previousElementSibling.tagName == 'BR') {
            cHD.previousElementSibling.remove();
        };
        if (cHD.nextElementSibling.tagName == 'BR') {
            cHD.nextElementSibling.remove();
        };
        if (cHD.lastElementChild.tagName == 'BR') {
            cHD.lastElementChild.remove();
        };
    };
};
cleanHeader()
//SECTION END Clean Header section of pages, removing extra BRs
//SECTION START Delete all alerts of current name
if (window.location.href.indexOf("AlertWorkerCreatedAlert") == -1 && window.location.href.indexOf("Alert") > -1) {
$("#caseOrProviderTable").on('click', function() { functionNameGoesHere()});
function functionNameGoesHere() {
};
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
//SECTION START Reverses Period options order, makes most recent visible
let checkForId = document.getElementById("selectPeriod");
if(checkForId) {
    $('#selectPeriod option').each(function () {
$(this).prependTo($(this).parent());
});
};
//SECTION END Reverses Period options order, makes most recent visible
//SECTION START Next/Prev button area
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
        };
    };
//SECTION END Next/Prev button area
//SECTION START Sort caseload lists by client name, ascending
if (window.location.href.indexOf("ActiveCaseList") > -1 || window.location.href.indexOf("InactiveCaseList") > -1 || window.location.href.indexOf("PendingCaseList") > -1) {
    document.getElementsByClassName('sorting')[1].click()
};
//SECTION END Sort caseload lists by client name, ascending
//SECTION START No timing out, resets sessionStartTime
function keepAlive() {//set new sessionStartTime to reset each page
    localStorage.setItem('mec2.sessionStartTime', new Date().getTime());
};
setInterval(keepAlive, 61000);//61 seconds
//SECTION END No timing out, resets sessionStartTime
//SECTION START Login assistance //https://mec2.trng2.dhs.state.mn.us/ChildCare/Login.htm
if (document.getElementById("loginDetail") !== null) {
    let userXNumber = localStorage.getItem('userIdNumber');
    document.getElementById("userId").value = userXNumber;
    document.getElementById("terms").click();
    addEventListener('beforeunload', (event) => {
        let enteredUserId = document.getElementById("userId").value
        localStorage.setItem('userIdNumber', enteredUserId) });
};
//SECTION END Login assistance
})();
