// ==UserScript==
// @name         MEC2ReStyle
// @namespace    http://github.com/jbmccormick
// @version      0.50
// @description  Remove extra parts of the MEC2 page
// @author       MECH2
// @match        mec2.childcare.dhs.state.mn.us/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jbmccormick/MEC2Web/master/MEC2ReStyle.user.js
// ==/UserScript==

(function() {
    'use strict';
/* globals jQuery, $, waitForKeyElements */
let viewMode = $('#page-wrap').length;
function addGlobalStyle(css) { //To allow for adding CSS styles
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};
addGlobalStyle('.Unapproved-Elig-Result { background-color: yellow; display: table; }');
addGlobalStyle('div.panel.panel-default { background-color: #f5f5f5; }');
addGlobalStyle('input.form-control, select.form-control { /*margin-bottom: 3px !important; padding-bottom: 0px !important; padding-top: 0px !important;*/ height: 28px !important; }');//often applied to input elements
addGlobalStyle('select.form-control { padding-left: 3px !important }');
addGlobalStyle('select.form-control.borderless.padL0 { padding-left: 6px !important }');
addGlobalStyle('.form-button { padding: 5px !important; text-align: center; min-width: 90px; margin-bottom: 5px; color: #111 !important; }');
addGlobalStyle('input:disabled, select:disabled, textarea:disabled, input:read-only, select:read-only, textarea:read-only, input, select, textarea { color: #111 !important; }');
addGlobalStyle('.form-button:disabled { color: rgba(0,0,0,50%); }');//
addGlobalStyle('.wiz-form-button { background:none; background-color: #0080008c !important; color: black; border-radius: 4px; padding: 5px !important; text-align: center; width: 100px; }');
addGlobalStyle('.wiz-form-button:active { border: 2px; }');
addGlobalStyle('.wiz-form-button:disabled { background-color: white !important; color: rgba(0 0 0 / 50%) !important; }');
addGlobalStyle('.error_alertbox_new { margin: 5px !important; padding: 5px !important; }');
addGlobalStyle('body { background-color: #eee; }');
addGlobalStyle('.panel-box-format { margin-bottom: 2px !important; margin-top: 2px !important; padding-bottom: 5px !important; background-color: #faf9f5 !important; }');//Shrinks space between green panels
//addGlobalStyle('h1 { /*margin-bottom: 4px !important; margin-top: 4px !important;*/margin: 4px !important; }');//Shrinks space around page titles //Changing parent element with jQuery
addGlobalStyle('h4 { margin-bottom: 5px !important; margin-top: 5px !important; background-color: #f3f3f3;}');
addGlobalStyle('form { margin: 0px !important; }');//Shrinks margin from 'form' elements
addGlobalStyle('label { margin: 0px !important; }');
addGlobalStyle('.custom-label { padding-left: 10px !important; padding-right: 10px !important; }');
addGlobalStyle('#noteStringText { width: 826px !important; }');//CaseNotes Note fixed width
//addGlobalStyle('table { border: 1; width: 100%; }');
addGlobalStyle('tbody tr td { padding: 4px 8px !important; }');//Table row padding //width: 100%; white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:1px;
addGlobalStyle('td { text-overflow:hidden; }');
//addGlobalStyle('thead:only-child tr td { padding: 4px 8px !important; }');//Table header padding
addGlobalStyle('.ui-datepicker { width: 20em !important; }');//calendar width fix
addGlobalStyle('#ui-datepicker-div table thead tr th { color: white; }');//calendar days font color
addGlobalStyle('.borderless { border: 1px #bfbfbf solid !important; background-color: white !important; }');
addGlobalStyle('.col-lg-12.padL0.textInherit { padding-top: 0px !important; }');
//addGlobalStyle('.checkbox { margin-top: 0px !important; margin-bottom: 0px !important; }');//Trying to fix checkbox alignment
//addGlobalStyle('.col-xs-3.col-sm-3.col-md-4.col-lg-4 { padding-left: 2px !important; padding-right: 2px !important; width: 100px !important; }');//date form fields
//addGlobalStyle('.col-xs-1.col-sm-1.col-md-1.col-lg-1 { padding-left: 2px !important; padding-right: 2px !important; }');//dash column
addGlobalStyle('.marginBottom20 { margin-bottom: 3px !important; margin-top: 3px !important; }');//Checkboxes on CaseSpecialLetter
addGlobalStyle('.row { min-height: 22px; }');
addGlobalStyle('input[type="checkbox"] { height: 15px !important; width: 15px !important; margin-top: 0px !important; margin-bottom: 0px !important; margin-left: 12px!important; min-height: 15px !important; }');
addGlobalStyle('#newTabField { padding: 2px 0px 2px 6px !important; margin-left: 4px !important; height: 22px !important; }');//custom style for custom field
addGlobalStyle('div.col-md-2, div.col-md-3, div.col-md-4, div.col-md-5, div.col-md-6, div.col-md-7, div.col-md-8, div.col-md-9, div.col-md-10, div.col-md-11, div.col-md-12, div.col-lg-1, div.col-lg-2, div.col-lg-3, div.col-lg-4, div.col-lg-5, div.col-lg-6, div.col-lg-7, div.col-lg-8, div.col-lg-9, div.col-lg-10, div.col-lg-11, div.col-lg-12/*, div.visible-md, div.visible-lg*/ { padding: 0px 6px 0px 12px !important; margin-top: 0px !important; margin-left: 0px !important; margin-right: 0px !important; }');
addGlobalStyle('div.col-md-1 { padding: 0px 0px 0px 0px !important; margin-top: 0px !important; margin-left: 0px !important; margin-right: 0px !important; }');
addGlobalStyle('label, select, input { padding: 0px 6px 0px 6px !important; margin-top: 0px !important; margin-left: 0px !important; margin-right: 0px !important; }');
addGlobalStyle('#updateDate { padding: 0px !important; text-align: center; min-width: 80px; }');
addGlobalStyle('#updateUser { padding: 0px !important; text-align: center; min-width: 65px; }');
addGlobalStyle('.h1-parent-row { padding: 5px 10px 5px 20px }');
//addGlobalStyle('#page-wrap { z-index: 2000; }');
//addGlobalStyle('.modal-backdrop { position: relative; opacity: 0;}');
addGlobalStyle('.form-group { margin-bottom: 3px !important; }');
addGlobalStyle('.form-check-inline { height: 15px !important; }');
addGlobalStyle('#memberComments, #comments, #textbox2 { width: 61ch !important;/* height: 39.1ch !important;*/ padding: 0px !important; overflow: hidden !important; }');//60 char col x 15 char row
addGlobalStyle('#noteStringText { width: 101ch !important; height: 78.3ch !important; padding: 0px !important; overflow: hidden !important; }');//100 char col x 30 char row
addGlobalStyle('.col-lg-7.col-md-7 > #message { width: 51ch !important; height: 39.1ch !important; padding: 0px !important; overflow: hidden !important; }');//50 char col x 15 char row
//SECTION START Styles for moving buttons to the bottom and affixing them
addGlobalStyle('.custom-footer { width: auto; position:fixed; bottom:0px; z-index: 1051; background-color: #eee; padding: 5px 5px 0px 5px !important; border: 1px #000 solid; }');
addGlobalStyle('.container { position: relative; z-index: 1050; min-height: 0px !important; }');
//SECTION END Styles for moving buttons to the bottom and affixing them

//SECTION START Removing items from the tabindex
$('#footer_links, #footer_info, #popup').children().prop('tabindex', '-1');
$('#quit, #countiesTable, #extendedEligibilityExpires, #redeterminationDate, #caseInputSubmit').prop('tabindex', '-1');//quit, countiesTable=application; redet date, eEE=activity pages; cIS=submit button
if (window.location.href.indexOf("ProviderSearch") > -1) {
    $('#ssn, #itin, #fein, #licenseNumber, #middleInitName').prop('tabindex', '-1');
};
//SECTION END Removing items from the tabindex

//SECTION START Make 'Report a Problem' open in new tab
if ($('#page-wrap').length > 0) {
    document.getElementById('Report a Problem').childNodes[0].setAttribute('target', '_blank');
};
//SECTION END Make 'Report a Problem' open in new tab

/*if (window.location.href.indexOf("Alerts") == -1 && window.location.href.indexOf("CaseNotes") == -1) {
addGlobalStyle('label.textInherit { display: inline-flex; align-items: center; justify-content: flex-end; }');
};*/
$('label').removeClass('control-label textR textInherit').addClass('centered-right-label');
if (window.location.href.indexOf("CaseSpecialNeeds") > -1) {//CaseFraud,
    $('.col-md-3, .col-lg-3').removeClass('col-md-3 col-lg-3').addClass('col-md-5 col-lg-5');
};
$('h1').parents('div.row').addClass('h1-parent-row');
$( ".marginTop5" ).removeClass( "marginTop5" );
$( ".marginTop10" ).removeClass( "marginTop10" );
$( ".padding-top-5px" ).removeClass( "padding-top-5px" );
$('.col-lg-offset-3').addClass('col-md-offset-3');
$('input[id$="ZipCodePlus4"]').hide();
$('.col-lg-3.col-md-2.col-sm-2.control-label.textR.textInherit').removeClass('col-md-2').addClass('col-md-3');
$('div[id$="ZipDash"]').add($('div[id$="ZipDash"]').next()).hide();
$('.col-xs-3.col-sm-3.col-md-3.col-lg-1').removeClass('col-md-3').addClass('col-md-1');
/*SECTION START Moving buttons to bottom and sticking them there
    //if (localStorage.stuckToBottomCheck > 0) {
const noCustomFooter = [//https://bobbyhadz.com/blog/javascript-check-if-value-is-not-in-array
    "CaseApplicationInitiation",
    "CaseEligibilityResultSelection",
    "FundingAvailability",
    "CaseSpecialLetter",
    "CaseMemo",
    "ClientSearch",
    "CaseServiceAuthorizationApproval",
    "CaseServiceAuthorizationApprovalPackage",
    "CaseEligibilityResultApproval",
    "CaseParent",//needs double parent, or check for edit mode and parent.prevSibling
    "CaseCSE",//needs double parent, or check for edit mode and parent.prevSibling
    "CaseAction",
    "CaseReinstate",
];
function truncatePageName() {
    let pageNameLong = window.location.href;
    let truncatedPageName = pageNameLong.substring(49, pageNameLong.indexOf('.htm'));
    if (!noCustomFooter.includes(truncatedPageName)) {
        buttonManuevering()
    };
};
for (let i=0; i < noCustomFooter.length; i++) {
    if (window.location.href.indexOf(noCustomFooter[i]) === -1) {
    };
};
function buttonManuevering() {//$('#edit').parent().removeClass('col-lg-7 col-md-7').addClass('col-lg-12 col-md-12').appendTo($('h1').parent().parent()) ?
    if (document.getElementById('new') !== null) {//
        $('#new').parent().removeClass('col-lg-7 col-md-7').addClass('custom-footer').attr('id', 'customFooter');
        $('#wrapUp').parent().appendTo('#customFooter');
        if ($('#new').length > 0) {
            console.log('length gt 0');
        };
        console.log('new');
    } else if (document.getElementById('edit') !== null) {
        $('#edit').parent().removeClass('col-lg-7 col-md-7').addClass('custom-footer').attr('id', 'customFooter');
        console.log('edit');
/ * } else if (document.getElementById('approve') !== null) {
        $('#approve').parent().removeClass('col-lg-7 col-md-7').addClass('custom-footer').attr('id', 'customFooter');
        console.log('approve');
* /
    } else if (document.getElementById('cancelnotice') !== null) {
        $('#cancelnotice').parent().attr('id', 'customFooter');
        console.log('cancelnotice');
    } else if (document.getElementById('billing') !== null) {
        $('#billing').parent().removeClass('col-lg-7 col-md-7').addClass('custom-footer').attr('id', 'customFooter');
        console.log('billing');
    } else if (document.getElementById('viewPaymentSummary') !== null) {
        $('#viewPaymentSummary').parent().removeClass('col-lg-7 col-md-7').addClass('custom-footer').attr('id', 'customFooter');
        console.log('viewPaymentSummary');
    } else {
        console.log('Need another method');
        };
};
//SECTION END Moving buttons to bottom and sticking them there */

//SECTION START Remove double+ BRs, apply site's clearfix class to elements, remove odd break when md+
$('br + br').remove();
$('.panel-box-format, .form-group, .col-lg-12').addClass('clearfix');
//$('.form-group').addClass('clearfix');
//$('#leaveDetailExpires').removeAttr('tabindex');
$('#leaveDetailRedeterminationDue, #leaveDetailExpires').removeAttr('tabindex');
let justHasBr = document.querySelectorAll('.visible-lg.visible-md');
    for (let j = 0; j < justHasBr.length; j++) {
        if(justHasBr[j].childElementCount == 1 && justHasBr[j].firstElementChild.tagName == 'BR') {
            justHasBr[j].remove();
        };
    };
//SECTION END Remove double+ BRs, apply site's clearfix class to elements, remove odd break when md+

$('div[id$="TableData"]').children('br').remove();//remove BR after tables
$('div[id$="TableData"]').parent().children('br').remove();//remove BR after tables
$('div[id$="Data_wrapper"]').parent().children('br').remove();//remove BR after less conventionally named tables

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
    if (fgClassList[i].previousElementSibling) {
        if (fgClassList[i].previousElementSibling.tagName == 'BR') {
            fgClassList[i].previousElementSibling.remove();
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

//SECTION START Remove spaces as margins after labels
function sanitizeInputs() {
    let labelSpSp = document.getElementsByTagName('label');
    for (let i = 0; i < labelSpSp.length; i++) {
        if (labelSpSp[i].nextSibling) {
            labelSpSp[i].previousSibling.textContent = labelSpSp[i].previousSibling.textContent.replaceAll(/\s{2,}/g, '')
        };
        if (labelSpSp[i].nextSibling) {
            labelSpSp[i].nextSibling.textContent = labelSpSp[i].nextSibling.textContent.replaceAll(/\s{2,}/g, '')
        };
    };
};
sanitizeInputs();
//SECTION END Remove spaces as margins after labels

//SECTION START Fix #updateDate and #updateUser because of my flex display changes
$('#updateDateLabel, #updateUserLabel').removeClass('textInherit');
$('#updateDateLabel').parent().removeClass('col-md-4 col-lg-4').addClass('col-md-5 col-lg-5').css('float', 'right');
//SECTION END Fix #updateDate and #updateUser because of my flex display changes

//SECTION START Make all h4 clicky collapse
    $("h4").click( function() {
        $(this).siblings(1).toggleClass("collapse")
    });
//SECTION END Make all h4 clicky collapse

//SECTION START Make labels the same height as their next neighbor
$('label').each( function() {
    if ($(this).next().prop('clientHeight') > 2 && $(this).next().prop('clientHeight') < 40) {
    $(this).height($(this).next().height());
    };
});
//SECTION END Make labels the same height as their next neighbor

// --- Single page fixes --- Single page fixes --- Single page fixes ---

//SECTION START Fix wrongly sized columns for several labels on Case Address
if (window.location.href.indexOf("CaseAddress") > -1) {
    $('label.col-md-2').addClass('col-md-3').removeClass('col-md-2');
};
//SECTION END Fix wrongly sized columns for several labels on Case Address

//SECTION START Active caseload numbers
if (window.location.href.indexOf("ActiveCaseList") > -1) {
$('h5').append(" " + $('td:contains("Active")').length + " active. " + ($('td:contains("Suspended")').length + $('td:contains("Temporarily Ineligible")').length) + " suspended/TI.")
};
//SECTION END Active caseload numbers

//SECTION START CaseMember Shortening text fields so they fit in a col-md-4
if (window.location.href.indexOf("CaseMember") > -1) {
    $( "label:contains('American Indian or Alaskan Native')" ).prop('innerText', 'American Indian or AK Native');
    $( "label:contains('Pacific Islander or  Native Hawaiian')" ).prop('innerText', 'Pacific Islander or HI Native');
};
//SECTION END CaseMember Shortening text fields so they fit in a col-md-4

//SECTION START Remove unnecessary fields from Child Support Enforcement
if (window.location.href.indexOf("CaseCSE") > -1) {
    $('#cseAbsentParentInfoMiddleInitial, #cseAbsentParentInfoSsn, #cseAbsentParentInfoBirthdate, #cseAbsentParentInfoAbsentParentSmi, #cseAbsentParentInfoAbsentParentId').parents('.form-group').hide()
    let hiddenCSE = $('#cseAbsentParentInfoMiddleInitial, #cseAbsentParentInfoSsn, #cseAbsentParentInfoBirthdate, #cseAbsentParentInfoAbsentParentSmi, #cseAbsentParentInfoAbsentParentId').parents('.form-group')
    $('#cseAbsentParentInfoLastName').parent().after('<div class="custombutton fake-custom-button centered-text" style="float: right;" id="abpsShowHide">Toggle extra info</div>');
    $('#abpsShowHide').click(function() { $(hiddenCSE).toggle() });
};
//SECTION END Remove unnecessary fields from Child Support Enforcement

//SECTION START Remove unnecessary fields from CaseEarnedIncome, set country to USA when leaving Employer Name field
if (window.location.href.indexOf("CaseEarnedIncome") > -1) {
    let hiddenCEI1 = $('#ceiEmpStreet, #ceiEmpStreet2, #ceiEmpCity, #ceiEmpStateOrProvince, #ceiPhone, #ceiEmpCountry').parents('.form-group')
    hiddenCEI1.hide();
    $('#ceiIncomeType').parent().after('<div class="custombutton fake-custom-button centered-text" style="float: right;" id="ceiShowHide1">Toggle extra info</div>');
    $('#ceiShowHide1').click(function() { $(hiddenCEI1).toggle() });
    //
    let hiddenCEI2 = $('#ceiCPUnitType, #ceiNbrUnits').parents('.form-group')
    hiddenCEI2.hide();
    $('#ceiPrjAmount').parent().after('<div class="custombutton fake-custom-button centered-text" style="float: right;" id="ceiShowHide2">Toggle extra info</div>');
    $('#ceiShowHide2').click(function() { $(hiddenCEI2).toggle() });
    //
    if ($('#providerName').val().length < 1) {
        //$('#providerName, #addressStreet').parents('.form-group').hide()
        let hiddenCEI3 = $('#providerName, #addressStreet').parents('.form-group')
        hiddenCEI3.hide();
        $('#providerSearch').parent().after('<div class="custombutton fake-custom-button centered-text" style="float: right;" id="ceiShowHide3">Toggle extra info</div>');
        $('#ceiShowHide3').click(function() { $(hiddenCEI3).toggle() });
    };
    $('#ceiEmployer').blur(function() {
        if ($('#edit').prop('disabled')) {
            if ($('#ceiEmpCountry').val().length < 1) {
                $('#ceiEmpCountry').val('USA');
                $('#ceiEmpStateOrProvince').val('Minnesota');
            };
        };
    });
};
//SECTION END Remove unnecessary fields from CaseEarnedIncome, set country to USA when leaving Employer Name field

//SECTION END Remove unnecessary fields from CaseExpense
let hiddenExp = $('#projectionExpenseUnitType, #projectionExpenseNumberOfUnits').parents('.form-group')
hiddenExp.hide();
$('#projectionExpenseAmount').parent().after('<div class="custombutton fake-custom-button centered-text" style="float: right;" id="ceiShowHide2">Toggle extra info</div>');
$('#ceiShowHide2').click(function() { $(hiddenExp).toggle() });
//SECTION END Remove unnecessary fields from CaseExpense

//SECTION START CaseChildProvider hiding fields if provider type is not LNL
function childProviderPage() {
    $('#instructions').remove();
    if ($('#providerType').val() !== "Legal Non-licensed" && $('#providerType').val() !== "") {
        if (!$('#providerLivesWithChild').prop('disabled')) {//if in edit mode
            $('#providerLivesWithChild').val("N");
            $('#careInHome').val("N");
            $('#relatedToChild').val("N");
        } else {
            $('input[type=checkbox]:checked').click();
            $('input[type=checkbox]').eq(1).click();
        };
        $('#providerLivesWithChildBeginDate, #careInHomeOfChildBeginDate, #exemptionReason, #exemptionPeriodBeginDate, #formSent, #signedFormReceived').parentsUntil('.form-group').hide();
    } else {
        $('#providerLivesWithChildBeginDate, #careInHomeOfChildBeginDate, #exemptionReason, #exemptionPeriodBeginDate, #formSent, #signedFormReceived').parentsUntil('.form-group').show();
    };
};
if (window.location.href.indexOf("CaseChildProvider") > -1) {
    let $newPair1 = $('label[for="providerLivesWithChild"]').add($('label[for="providerLivesWithChild"]').siblings());
    let $newPair2 = $('label[for="relatedToChild"]').add($('label[for="relatedToChild"]').siblings());
    let $pairents = $('label[for="providerLivesWithChild"]').parents('.form-group').add($('label[for="relatedToChild"]').parents('.form-group'));
    $('label[for="childCareMatchesEmployer"]').parent().append($newPair1);
    $('label[for="careInHome"]').parent().append($newPair2);
    $pairents.remove();
    childProviderPage();
    $('#childProviderTable').on("click", childProviderPage());
    $('#providerId').change(function() {
        if ($('#instructions').length < 1) { $('#providerSearch').parent().parent().append('<div id="instructions" class="col-lg-4 col-md-4">Tab twice after entering Provider ID to update fields</div>') };
    });
    $('#providerSearch').blur(function() {
        childProviderPage();
    });
};
//SECTION END CaseChildProvider hiding fields if provider type is not LNL

//SECTION START CaseNotes - moving CreatedBy, fixing spacing and columns
if (window.location.href.indexOf("CaseNotes") > -1) {
    $('#storage').hide();
    $( "h4:contains('Additional Information')" ).siblings( "div:nth-of-type(1)" ).attr("id", "h4AddInfoFirstDivSib");
    $( "#h4AddInfoFirstDivSib" ).children().first().removeAttr('class').addClass('row');
    $( ".col-xs-2 col-sm-2 col-md-1 col-lg-1 textInherit" ).remove();
    $('div[class*=marginTop][class*=col-xs]').remove();
    $( "label:contains('Important')" ).removeClass('col-lg-3 col-md-3 col-sm-4').addClass('col-lg-1 col-md-1 col-sm-1');
    $( "label:contains('Important')" ).prop("innerText", "!");
    $('label:contains("!")').wrap('<div></div>')
    //$( "#h4AddInfoFirstDivSib" ).children( "div:nth-of-type(1)" ).removeClass("col-lg-5 col-md-5 col-sm-5 col-xs-5").addClass("col-lg-6 col-md-6")
    let noteCreator = $('label[for="noteCreator"]').parent();
    let noteSummary = $('label[for="noteSummary"]').parent();
    $('noteCreator').appendTo('noteSummary');
    $( "h4:contains('Additional Information')" ).click( function () {$( "h4:contains('Additional Information')" ).siblings(1).toggleClass("collapse")} );
    $( "h4:contains('Additional Information')" ).siblings().wrapAll('<div></div>');
    //$('#caseId, #selectPeriod, #noteArchiveType, #noteSearchStringText, #noteImportant').prop('tabindex', '-1');
    $('#noteArchiveType, #noteSearchStringText, #noteImportant').prop('tabindex', '-1');
};
//SECTION END CaseNotes - moving CreatedBy, fixing spacing and columns

$('#caseId, #selectPeriod').prop('tabindex', '-1');

//SECTION START ClientSearch fixing button showing to the right of the table
//$('#returnBtn').parent().appendTo('#clientSearchRequest');
//SECTION END ClientSearch fixing button showing to the right of the table

 //SECTION START CaseEarnedIncome CaseUnearnedIncome CaseExpense collapse unnecessary H4s
if (window.location.href.indexOf("CaseEarnedIncome") > -1 || window.location.href.indexOf("CaseUnearnedIncome") > -1 || window.location.href.indexOf("CaseExpense") > -1) {
    $( "h4:contains('Actual Income')" ).click();
    $( "h4:contains('Student Income')" ).click();
    $( "h4:contains('Actual Expense')" ).click();
};
//SECTION END CaseEarnedIncome CaseUnearnedIncome CaseExpense collapse unnecessary H4s

//SECTION START Adding clearfix class to 'row' on FinancialManualPayment because they didn't do form-groups or anything that they did on the rest of the site
if (window.location.href.indexOf("FinancialManualPayment") > -1) {
    $('.row').addClass('clearfix');
};
//SECTION END Adding clearfix class to 'row' on FinancialManualPayment because they didn't do form-groups or anything that they did on the rest of the site

//SECTION START FinancialBilling Fix to display table
if (window.location.href.indexOf("FinancialBilling.htm") > -1) {
    addGlobalStyle('.form-control.borderless.padL0.padR0 { padding: 0px !important; }');
    //let target = document.getElementById('billingRegistrationFeesTable_wrapper').parentNode;
    document.getElementById('billingRegistrationFeesTable_wrapper').parentNode.previousElementSibling.classList.remove('clearfix');
    //let destination = target.parentNode;
    //target.appendChild(destination);
};
//SECTION END FinancialBilling Fix to display table

//SECTION START ProviderRegistrationAndRenewal Fix to display table
if (window.location.href.indexOf("ProviderRegistrationAndRenewal") > -1) {
    document.getElementById('providerData').classList.add('clearfix');
};
//SECTION END ProviderRegistrationAndRenewal Fix to display table.

//SECTION START CaseEligibilityResultFamily Fix 'Select' elements to have class col-md-4 so they show the entire word
if (window.location.href.indexOf("CaseEligibilityResultFamily") > -1) {
    $('select').parent('.col-md-3').removeClass('col-md-3').addClass('col-md-4');
    $('label.col-lg-8').removeClass('col-lg-8').addClass('col-lg-7');
};
//SECTION END CaseEligibilityResultFamily Fix 'Select' elements to have class col-md-4 so they show the entire word

//SECTION START Fixing the table height of the Case Notice and Job Search Tracking tables to show more notices
if (window.location.href.indexOf("CaseNotices") > -1 || window.location.href.indexOf("CaseJobSearchTracking") > -1) {
    $(".dataTables_scrollBody").css('max-height', '400px');
    $('#textbox1').css('height', '520px');
};
//SECTION END Fixing the table height of the Case Notice and Job Search Tracking tables to show more notices

//SECTION START Resize the Alert page's Explanation viewable area
if (window.location.href.indexOf("Alerts") > -1) {
/*$('#workerIdErr').remove();
$('#inputWorkerId').add($("#inputWorkerId").prev()).removeAttr('style').addClass('col-md-6').wrapAll( "<div class='col-md-3'></div>");
$('#inputAlertType').add($("#inputAlertType").prev()).removeAttr('style').addClass('col-md-6').wrapAll( "<div class='col-md-3'></div>");
$('#workerCreatedType').removeAttr('style').addClass( "col-md-3");
$('#alertInputSubmit').removeAttr('style').addClass( "col-md-2");*/
$('#providerId, #effectiveDate').parent().removeClass('col-lg-9 col-md-9').addClass('col-lg-4 col-md-4');
$('.col-lg-12').addClass('clearfix');
addGlobalStyle ('#message {	resize: none; width: 450px !important; padding: 5px; overflow: hidden; box-sizing: border-box; }');
    $("#alertTable").on('click', function() {
        $("#message").css('height', '100px');
        $("#message").css('height', $("#message").get(0).scrollHeight + 'px');
    });
};
//SECTION END Resize the Alert page's Explanation viewable area

//SECTION START Custom fix for CaseOverview
if (window.location.href.indexOf("CaseOverview") > -1) {
    //addGlobalStyle('label { padding-bottom: 0px !important; padding-top: 0px !important; margin-bottom: 0px !important; margin-top: 0px !important; }');//Shrink margin from 'form' elements
    //document.getElementById('caseData').style.clear = "both";
    document.getElementById('participantInformationData_wrapper').getElementsByClassName('sorting')[0].click();//participantInformationData_length
};
//SECTION END Custom fix for CaseOverview

//SECTION START Custom fix for CaseSpecialLetter
if (window.location.href.indexOf("CaseSpecialLetter") > -1) {
    document.getElementById('comments').setAttribute('rows', '14');
};
//SECTION END Custom fix for CaseSpecialLetter

//TODO
//SECTION START CaseSpecialActivity Duplicate start date into end date for Ext Elig
//on focus lost for #extendedEligibilityBegin, change value of #extendedEligibilityExpires to be #extendedEligibilityBegin
//SECTION END CaseSpecialActivity Duplicate start date into end date for Ext Elig

//SECTION START Custom fix and text for CaseEligibilityResultSelection
if (window.location.href.indexOf("CaseEligibilityResultSelection") > -1) {
    addGlobalStyle('#message { font-size: 130%; background-color: yellow; display: inline !important; }');
    document.getElementById('message').innerHTML = "Select a program record listed above and click Select below to view the Eligibility Results."
    if (document.getElementsByClassName('dataTables_empty').length == 0) { document.getElementsByClassName('sorting')[1].click() };//sort by program type
    $('tbody > tr > td:contains("Unapproved")').addClass('Unapproved-Elig-Result');//CaseEligibilityResultSelection
};
//SECTION END Custom fix and text for CaseEligibilityResultSelection

//SECTION START Custom fix for CaseEligibilityResultFamily (1 label/field)
if (window.location.href.indexOf("CaseEligibilityResultFamily") > -1) {
$('label[for="allowedTemporaryIneligibilityExpireTest"]').removeClass("col-md-8").addClass("col-md-7").removeAttr('style')
};
//SECTION END Custom fix for CaseEligibilityResultFamily (1 label/field)

//SECTION START Redirect if we're on elig results and there's no version selected
//if ($('[id$="TableAndPanelData"]').css('display') == "none") { window.open(document.getElementById("Eligibility Results Selection").firstElementChild.getAttribute('href'), "_self") };
//SECTION END Redirect if we're on elig results and there's no version selected

//SECTION START Case Notes custom styles
if (window.location.href.indexOf("CaseNotes") > -1) {
    document.getElementsByClassName('panel-box-format')[1].style.display = "none";
    document.getElementById('noteStringText').setAttribute('rows', '29');
    let newBr = document.createElement('br');
    document.getElementById('noteMemberReferenceNumber').parentNode.insertAdjacentElement("afterend", newBr);
    //noteMemberReferenceNumber
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

//SECTION START Reverses Period options order, makes most recent visible
let checkForId = document.getElementById("selectPeriod");
if(checkForId) {
    $('#selectPeriod option').each(function () {
$(this).prependTo($(this).parent());
});
};
//SECTION END Reverses Period options order, makes most recent visible

//SECTION START Next/Prev buttons next to period drop down
let selectPeriodDropdown = document.getElementById('selectPeriod');
    if (selectPeriodDropdown && $('#selectPeriod[type="hidden"]').length < 1) {
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
//SECTION END Next/Prev buttons next to period drop down

//SECTION START Sort caseload lists by client name, ascending
if (window.location.href.indexOf("ActiveCaseList") > -1 || window.location.href.indexOf("InactiveCaseList") > -1 || window.location.href.indexOf("PendingCaseList") > -1) {
    document.getElementsByClassName('sorting')[1].click()
};
//SECTION END Sort caseload lists by client name, ascending

//SECTION START No timing out, resets sessionStartTime every 61 seconds
function keepAlive() {
    localStorage.setItem('mec2.sessionStartTime', new Date().getTime());
};
setInterval(keepAlive, 61000);//61 seconds, /1000
//SECTION END No timing out, resets sessionStartTime every 61 seconds

//SECTION START Login assistance - clicks Terms box, remembers last used login name
if (document.getElementById("loginDetail") !== null) {
    let userXNumber = localStorage.getItem('userIdNumber');
    document.getElementById("userId").value = userXNumber;
    document.getElementById("terms").click();
    document.getElementById("password").focus();
    addEventListener('beforeunload', (event) => {
        let enteredUserId = document.getElementById("userId").value
        localStorage.setItem('userIdNumber', enteredUserId) });
};
//SECTION END Login assistance - clicks Terms box, remembers last used login name
})();
