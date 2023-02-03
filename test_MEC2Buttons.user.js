// ==UserScript==
// @name         _Test-MEC2ReStyle
// @namespace    http://github.com/jbmccormick
// @version      0.72
// @description  ReStyle the MEC2 page by adding and changing style-sheets
// @author       MECH2
// @match        mec2.childcare.dhs.state.mn.us/*
// @match        mec2.trng2.dhs.state.mn.us/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
/* globals jQuery, $, waitForKeyElements */
window.location.href.indexOf("Welcome.htm") > -1 && (window.open("/ChildCare/Alerts.htm", "_self"));//auto-redirect from Welcome to Alerts

GM_addStyle ( `
.panel {
margin-bottom: 10px !important;
}

div[class^="dataTables_"]:not(.dataTables_length):not(.dataTables_sizing) {
width: inherit;
}

.flex-row, .form-group, .col-lg-12, .col-md-12, .row, .visible-lg {
display: flex !important;
flex-basis: 100%;
flex-wrap: wrap;
}

output {
display: flex !important;
margin: unset !important;
padding: unset !important;
}

#raceCheckBoxes {
display: block;
}

#footer_links {
margin-top: 10px !important;
margin-bottom: 0px !important;
padding: 0px !important;
}

#footer_info {
padding-bottom: 5px !important;
}

#caseId {
width: 10ch !important;
}

select#selectPeriod {
width: 25ch !important;
}

label[for="inputWorkerId"] {
width: fit-content !important;
}

br {
  content: "";
  margin: 1em;
  display: block;
  font-size: 24%;
}

div[id$="TableAndPanelData"]>div[id$="PanelData"] {
margin-bottom: 5px;
}

label.toLabel {
margin-right: -6px !important;
padding: 0px !important;
width: fit-content !important;
}

.rounded-border-box {
border: 2px solid;
border-radius: 4px;
}

#redetDate {
align-items: center;
display: flex;
position: relative;
}

#redetDateChild {
margin-left: -4px;
top: 0;
position: absolute;
cursor: pointer;
border: 2px solid;
border-radius: 4px;
width: 10.1ch;
height: 2.5ch;
}

#copyRedetNoteButton {
margin: 0px 0px 0px 10px;
height: 20px;
}

body {
background-color: #eee !important;
}

#user_sign-in_content2 .content_35pad::after, .panel-box-format::after, .form-group::after, .col-lg-12::after {
  content: "";
  clear: both;
  display: table;
}

#alertsTableAndPanelData #message {
margin-top: 5px;
}

div.dataTables_scrollBody {
margin-top: -4px;
}

.fc .fc-toolbar.fc-header-toolbar {
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
height: 27px;
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

div#page-wrap {
padding-bottom: 10px !important;
height: 40px !important;
line-height: 20px !important;
float: none;
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
padding: 0px 6px;
min-height: 18px;
}

.centered-form-group {
align-items: center;
}

#buttonPaneThree {
margin-bottom: 1px;
}

#snackBar {
background-color: #333;
color: #fff;
font-size: x-large;
text-align: center;
border-radius: 6px;
padding: 16px;
position: fixed;
z-index: 9999;
left: 25%;
right: 25%;
bottom: 30px;
}

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

.borderless {
background-color: rgb(255 255 255 / 40%) !important;
min-height: 28px;
border-radius: 4px;
border: 1px #bfbfbf solid !important;
}

.borderless:disabled, .borderless:read-only {
background-color: #eee !important;
border: 1px #bfbfbf solid !important;
}

textarea.form-control {
padding: 0px 5px !important;
}

input.form-control:not(input[style*="border:none"]), select.form-control {
padding: 0px 5px !important;
text-align: left !important;
display: flex;
justify-content: center;
height: 28px !important;
}

input[style*="border:none"] {
padding: 0px 8px !important;
text-align: left !important;
display: flex;
justify-content: center;
height: 28px !important;
}

input:disabled, select:disabled, textarea:disabled, input:read-only, select:read-only, textarea:read-only, input, select, textarea {
color: #111 !important;
}

select.form-control {
padding-left: 3px !important;
}

select.form-control.borderless.padL0 {
padding-left: 6px !important;
}

.error_alertbox_new {
margin: 5px !important;
padding: 2px 2px 0px 8px !important;
}

div.panel.panel-default:not(.panel-box-format) {
background-color: #f5f5f5 !important;
margin-top: 0px !important;
}

.panel-box-format {
margin-bottom: 2px !important;
margin-top: 0px !important;
padding-bottom: 5px !important;
padding-top: 5px !important;
background-color: #f5f5f5 !important;
}

h4:not(.panel-box-format .form-group .col-lg-3 h4) {
margin: 5px 10px 5px 0px !important;
background-color: #ececec;
display: inline-flex;
}

.panel-box-format .form-group .col-lg-3 h4 {
margin: 0px !important;
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
padding: 3px 7px !important;
}

.ui-datepicker {
width: 20em !important;
}

#ui-datepicker-div table thead tr th {
color: white;
}

.col-lg-12.padL0.textInherit {
padding-top: 0px !important;
}

.marginBottom20 {
margin-bottom: 3px !important;
margin-top: 3px !important;
}

#newTabField {
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

div.col-none-6 {
display: flex;
align-items: center;
}

div.onlyDivChild {
}

div.col-md-1 {
padding: 0px 0px 0px 0px !important;
margin-top: 0px !important;
margin-left: 0px !important;
margin-right: 0px !important;
}

#updateHome {
justify-content: flex-end;
display: flex;
flex-direction: row;
}

#updateUser, #updateUserURL, #updateDate {
padding: 0px !important;
text-align: justify;
width: 10ch !important;
}

h1 {
margin-bottom: 0px !important;
}

.h1-parent-row {
padding: 3px 10px 3px 20px;
}

h5 {
margin-top: 3px !important;
margin-bottom: 3px !important;
}

input[type="checkbox"][name="reporterTypeSelections"] {
display: inline-flex !important;
}

div.row>div.form-group>input[type="checkbox"] {
height: 15px !important;
width: 15px !important;
margin-top: 1px !important;
margin-bottom: 1px !important;
margin-left: 12px !important;
min-height: 15px !important;
justify-content: flex-end !important;
display: flex !important;
flex-direction: row !important;
}

input[type="checkbox"]:not(div.form-group>input[type="checkbox"]) {
margin: 0px !important;
justify-content: flex-end;
display: inline-flex;
flex-direction: row;
}

.form-group, .col-lg-12 {
margin-bottom: 3px !important;
}

.panel-box-format .form-group:not(.panel-box-format .form-group .col-lg-3 h4):not(.form-group.collapse), panel-box-format .col-lg-12 {
margin-bottom: 3px !important;
display: flex;
align-items: center;
}

.form-group>.col-lg-12:first-child:last-child {
margin-bottom: 0px !important;
}

.row {
display: flex;
align-items: center;
min-height: 22px;
margin-bottom: 3px;
}

.row>.form-group {
margin-bottom: 0px !important;
}

div.form-group label, div.form-group select, div.form-group input:not(".form-button-margins"), div.row label, div.row select, div.row input, div.col-lg-12 label, div.col-lg-12 select, div.col-lg-12 input {
padding: 0px 6px 0px 6px !important;
margin-top: 0px !important;
margin-left: 0px !important;
margin-right: 0px !important;
}

div.row .form-group:not(".form-button-margins") {
margin-bottom: 0px !important;
}

div.form-group input.form-button-margins {
margin-left: 10px !important;
margin-bottom: 5px !important;
}

.form-button {
padding: 0px 5px !important;
text-align: center !important;
min-width: 90px !important;
display: inline-flex;
margin-left: 10px !important;
justify-content: center;
min-height: 28px;
color: #111 !important;
}

[hidden] {
display: none !important;
}

.form-button:not('col-lg-12 .form-button, row .form-button') {
margin-bottom: 5px !important;
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

.custombutton {
cursor: pointer;
padding: 3px 3px;
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
margin-left: -5px;
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
cursor: pointer;
}

.fake-custom-button-nodisable {
background-color: #dcdcdc !important;
cursor: pointer;
padding: 2px 4px;
margin: 1px;
border: 2px solid;
border-radius: 4px;
}

.fake-custom-button-float-right {
float: right;
}

.flex-right {
margin-left: auto !important;
}

.form-check-inline {
height: 15px !important;
}

#memberComments, #comments, #textbox2 {
width: 61.5ch !important;
padding: 0 .5ch 0 .5ch !important;
overflow: hidden !important;
}

#noteStringText, #reason:not(select) {
height: 78.1ch;
width: 101.5ch !important;
padding: .5ch !important;
overflow: hidden !important;
}

.col-lg-7.col-md-7 > #message {
width: 51.5ch !important;
padding: .5ch !important;
overflow: hidden !important;
}

br br {
visibility: hidden;
}

#caseHeaderData {
padding-left: 0px !important;
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
