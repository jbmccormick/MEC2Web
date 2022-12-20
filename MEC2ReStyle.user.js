// ==UserScript==
// @name         MEC2ReStyle
// @namespace    http://github.com/jbmccormick
// @version      0.64
// @description  ReStyle the MEC2 page by adding and changing style-sheets
// @author       MECH2
// @match        mec2.childcare.dhs.state.mn.us/*
// @grant        GM_addStyle
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/jbmccormick/MEC2Web/master/MEC2ReStyle.user.js
// ==/UserScript==

(function() {
    'use strict';
/* globals jQuery, $, waitForKeyElements */
window.location.href.indexOf("Welcome.htm") > -1 && (window.open("/ChildCare/Alerts.htm", "_self"));//auto-redirect from Welcome to Alerts

GM_addStyle ( `
body {
background-color: #eee !important;
}

.fc .fc-toolbar.fc-header-toolbar {//FinancialAbsentDayHolidayTracking
margin-bottom: 0.5em !important;
}

#alertsPanelData div.container-fluid  {
padding-left: 5px !important;
padding-right: 5px !important;
margin-left: -25px !important;
}

.hidden-tr {
display: none;
}

.button-row {
height: 29px;
display: table;
}

.button-house {
height: 34px;
display: table;
padding-top: 4px;
}

.navbar {
height: 0px;
display: none;
}

#page-wrap {
padding-bottom: 10px !important;
height: 40px !important;
line-height: 20px !important;
}

#banner_honeycomb {
height: 0px !important;
display: none !important;
}

.navbar .navbar-inverse {
display: none !important;
}

#inActiveCaseTable>tbody>tr>td>span {
cursor: pointer;
padding: 0px 3px;
margin: 1px;
border: 2px solid;
border-radius:4px;
background-color: #dcdcdc;
}

#inActiveCaseTable>tbody>tr>td>span:hover {
background-color: #DAF7A6;
}

.custombutton {
cursor: pointer;
padding: 3px 4px;
margin: 1px;
border: 2px solid;
border-radius:4px;
}

.custombuttonsearch {
cursor: pointer;
padding: 3px 4px;
margin-left: 3px;
border: 2px solid;
border-radius: 4px;
}

.custombuttonplus {
border-left: 0px;
margin-left: -7px;
border-top-left-radius: 0px;
border-bottom-left-radius: 0px;
}

.custombutton:hover {
background-color: #DAF7A6;
}

.custombuttonclicked {
background-color: #A6EDF7;
}

.custom-form-button {
margin-left: 10px;
cursor: pointer;
font-weight: bold;
}

div.custom-form-button-disabled {
color: DarkGrey !important;
cursor: no-drop !important;
margin-left: 10px;
font-weight: bold;
}

.fake-custom-button {
background-color: #dcdcdc !important;
width: fit-content;
height: 25px;
padding: 0px 6px 0px 6px !important;
display: inline-flex;
align-items: center;
justify-content: center;
}

.fake-custom-button-nodisable {
cursor: pointer;
padding: 3px 4px;
margin: 1px;
border: 2px solid;
border-radius: 4px;
}

.centered-text {
display: inline-flex;
align-items: center;
justify-content: center;
}

.centered-right-label {
display: inline-flex;
align-items: center;
justify-content: flex-end;
text-align: right;
}

.centered-form-group {
align-items: center;
}

#buttonPaneThree {
margin-bottom: 1px;
}

#snackBar {
min-width: 450px;
margin-left: -225px;//Divide value of min-width by 2
background-color: #333;
color: #fff;
font-size: x-large;
text-align: center;
border-radius: 6px;
padding: 16px;
position: fixed;
z-index: 9999;
left: 50%;
bottom: 30px;
}

//From ReStyle:
.container {
padding-left: 0px !important;
padding-right: 0px !important;
}

.content_25pad-0top {
padding: 0px 5px 0px 5px !important;
}

.Unapproved-Elig-Result {
background-color: yellow;
display: table;
}

div.panel.panel-default {
background-color: #f5f5f5 !important;
margin-top: 0px !important;
}

input.form-control, select.form-control {
height: 28px !important;
}

select.form-control {
padding-left: 3px !important;
}

select.form-control.borderless.padL0 {
padding-left: 6px !important;
}

.form-button {
padding: 5px !important;
text-align: center !important;
min-width: 90px !important;
margin-bottom: 5px !important;
color: #111 !important;
}

input:disabled, select:disabled, textarea:disabled, input:read-only, select:read-only, textarea:read-only, input, select, textarea {
color: #111 !important;
}

.form-button:disabled {
color: rgba(0,0,0,50%) !important;
}

.wiz-form-button {
background:none !important;
background-color: #0080008c !important;
color: black !important;
border-radius: 4px !important;
padding: 5px !important;
text-align: center !important;
width: 100px !important;
}

.wiz-form-button:active {
border: 2px !important;
}

.wiz-form-button:disabled {
background-color: white !important;
color: rgba(0 0 0 / 50%) !important;
}

.error_alertbox_new {
margin: 5px !important;
padding: 5px !important;
}

.panel-box-format {
margin-bottom: 2px !important;
margin-top: 2px !important;
padding-bottom: 5px !important;
background-color: #faf9f5 !important;
}

h4 {
margin-bottom: 5px !important;
margin-top: 5px !important;
background-color: #f3f3f3;
}

form {
margin: 0px !important;
}

label {
margin: 0px !important;
}

.custom-label {
padding-left: 10px !important;
padding-right: 10px !important;
}

table.dataTable>thead:not(:only-child) {
visibility: collapse;
}

table.dataTable thead td, tbody tr td {
padding: 3px 7px !important;//Table header padding
}

.ui-datepicker {
width: 20em !important;//calendar width fix
}

#ui-datepicker-div table thead tr th {
color: white;//calendar days font color
}

.borderless {
border: 1px #bfbfbf solid !important;
background-color: white !important;
}

.col-lg-12.padL0.textInherit {
padding-top: 0px !important;
}

.marginBottom20 {//Checkboxes on CaseSpecialLetter
margin-bottom: 3px !important;
margin-top: 3px !important;
}

.row {
min-height: 22px;
}

input[type="checkbox"] {
height: 15px !important;
width: 15px !important;
margin-top: 0px !important;
margin-bottom: 0px !important;
margin-left: 12px!important;
min-height: 15px !important;
}

#newTabField {//custom style for custom field
padding: 2px 0px 2px 6px !important;
margin-left: 4px !important;
height: 22px !important;
}

div.col-md-2, div.col-md-3, div.col-md-4, div.col-md-5, div.col-md-6, div.col-md-7, div.col-md-8, div.col-md-9, div.col-md-10, div.col-md-11, div.col-md-12, div.col-lg-1, div.col-lg-2, div.col-lg-3, div.col-lg-4, div.col-lg-5, div.col-lg-6, div.col-lg-7, div.col-lg-8, div.col-lg-9, div.col-lg-10, div.col-lg-11, div.col-lg-12 {
padding: 0px 6px 0px 12px !important;
margin-top: 0px !important;
margin-left: 0px !important;
margin-right: 0px !important;
}

div.col-md-1 {
padding: 0px 0px 0px 0px !important;
margin-top: 0px !important;
margin-left: 0px !important;
margin-right: 0px !important;
}

label, select, input {
padding: 0px 6px 0px 6px !important;
margin-top: 0px !important;
margin-left: 0px !important;
margin-right: 0px !important;
}

#updateDate {
padding: 0px !important;
text-align: center;
min-width: 80px;
}

#updateUser {
padding: 0px !important;
text-align: center;
min-width: 65px;
}

h1 {
margin-bottom: 0px !important;//Shrinks space around page titles
}

.h1-parent-row {
padding: 3px 10px 3px 20px;
}

.form-group {
margin-bottom: 3px !important;
}

.form-check-inline {
height: 15px !important;
}

#memberComments, #comments, #textbox2 {
width: 61ch !important;
padding: 0px !important;
overflow: hidden !important;
}

#noteStringText {
width: 101ch !important;
padding: 0px !important;
overflow: hidden !important;
}

.col-lg-7.col-md-7 > #message {
width: 51ch !important;
padding: 0px !important;
overflow: hidden !important;
}

br br {
visibility: hidden;
}

#caseHeaderData {
padding-left: 0px !important;
}

input.col-lg-offset-2, input.col-md-offset-2 {
margin-left: 16.66666667% !important;
}

` );
GM_addStyle ( `
.shake-bottom {
    animation: shake-bottom 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
}
` )

GM_addStyle ( `
@keyframes shake-bottom {
  0%,
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
  }
  10% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
  20%,
  40%,
  60% {
    -webkit-transform: rotate(-4deg);
            transform: rotate(-4deg);
  }
  30%,
  50%,
  70% {
    -webkit-transform: rotate(4deg);
            transform: rotate(4deg);
  }
  80% {
    -webkit-transform: rotate(-2deg);
            transform: rotate(-2deg);
  }
  90% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
}
` );
})();
