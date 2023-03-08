// ==UserScript==
// @name         MEC2ReStyle
// @namespace    http://github.com/jbmccormick
// @version      0.74
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

//Declaring variables
// GM_addStyle ( `
// :root {
// --paddingLeft: 12px;
// --panelBackground: #e7e7e7;
// --bodyBackground: #b9b9b9;
// --containerBackground: #e9e9e9;
// }

// ` )//Variables end
//Color swap test
GM_addStyle ( `
:root {
--paddingLeft: 12px;
--formButtonBackground: #cdcdcd;

--lightmodeBodyBackground: #b9b9b9;
//--lightmodeContainerBackground: #b9b9b9;
--lightmodeContainerBackground: #e7e7e7;
--lightmodePanelBackground: #e7e7e7;

--darkmodeBodyBackground: #c1c1c1;
--darkmodeContainerBackground: #e7e7e7;
--darkmodePanelBackground: #e7e7e7;
}

` )//Variables end

/*

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

*/

//Testing Section
GM_addStyle ( `
.stickyRow {
position: sticky !important;
z-index: 50;
}
#programInformationData_wrapper .dataTables_scrollBody {
max-height: 195px !important;
}

table {
font-size: 14px !important;
}

#reporterTypeCheckboxes {
display: grid;
grid-template-columns: auto 1fr;
row-gap: 3px;
align-items: flex-end;
}

#raceCheckBoxes {
display: grid !important;
grid-template-columns: auto auto auto auto auto;
align-items: flex-end;
height: 18px;
}

#raceCheckBoxes>.col-lg-4, #raceCheckBoxes>.col-md-4 {
width: auto !important;
display: flex;
padding: 0px 10px !important;
}

#override input[type="checkbox"] {
height: 18px !important;
width: 18px !important;
margin: auto 0px !important;
}

body {
align-items: center;
}

#providerNoticesSearchData_wrapper .dataTables_scrollBody, #caseNoticesSearchData_wrapper .dataTables_scrollBody, #providerPaymentHistoryData_wrapper .dataTables_scrollBody {
max-height: 486px !important;
}
` )//Testing Section end
//#override input[type="checkbox"] {:not(div.form-group>input[type="checkbox"])


//Flexed items
GM_addStyle ( `

.panel-box-format .form-group:not(.panel-box-format .form-group .col-lg-3 h4):not(.form-group.collapse), panel-box-format .col-lg-12 {
margin-bottom: 3px !important;
display: flex;
align-items: center;
}

.form-button {
padding: 0px 5px !important;
text-align: center !important;
min-width: 90px !important;
margin-left: 10px !important;
justify-content: center;
min-height: 28px;
background-image: none !important;
}

.form-button:not(.form-button:disabled):not(.custom-form-button-disabled) {
display: inline-flex;
}

.row {
display: flex;
align-items: center;
min-height: 22px;
margin-bottom: 3px;
}

input.form-control:not(input[style*="border:none"]):not(input[type="checkbox"]), select.form-control {
padding: 0px 5px !important;
text-align: left !important;
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

#redetDate {
align-items: center;
display: flex;
position: relative;
}

#updateHome {
justify-content: flex-end;
display: flex;
flex-direction: row;
}

[hidden], .navbar .navbar-inverse, .hidden-tr, .collapse, #reSubmit {
display: none !important;
}

.navbar, #banner_honeycomb {
height: 0px !important;
display: none !important;
}

output {
display: flex !important;
margin: unset !important;
padding: unset !important;
}

.form-group>#providerData, .flex-row, .col-lg-12, .col-md-12, .row, .visible-lg, .form-group:not(.col-lg-1, .col-md-1, .col-lg-2, .col-md-2, .col-lg-3, .col-md-3, .col-lg-4, .col-md-4, .col-lg-5, .col-md-5, .col-lg-6, .col-md-6, .col-lg-7, .col-md-7, .col-lg-8, .col-md-8, .col-lg-9, .col-md-9, .col-lg-10, .col-md-10, .col-lg-11, .col-md-11):not(.collapse):not([style="display: none;"]) {
display: flex !important;
flex-basis: 100%;
flex-wrap: wrap;
}

` );

//
GM_addStyle ( `

#override .row {
margin-left: 0px;
margin-right: 0px;
}

.panel {
margin-bottom: 10px !important;
}

div[class^="dataTables_"]:not(.dataTables_length, .dataTables_sizing, #countiesTableDiv, #allowedRegistrationFeeTable_wrapper, #billingRegistrationFeesTable_wrapper) {
width: inherit;
}

#reappAddCcapDetail>#addressTableAndPanelData #countiesTableDiv {
display: grid;
}

/*
div[id$="TableAndPanelData"]>div[id$="PanelData"] {
margin-bottom: 5px;
}
*/

#footer_info, div[id$="TableAndPanelData"]>div[id$="PanelData"], .form-button:not('col-lg-12 .form-button, row .form-button') {
margin-bottom: 5px !important;
}

label.toLabel {
padding: 0px !important;
margin-left: -13px !important;
margin-right: 8px !important;
width: fit-content !important;
}

.rounded-border-box {
border: 1.5px solid;
border-radius: 4px;
}

.auto-clearfix, #user_sign-in_content2 .content_35pad::after, .panel-box-format::after, .form-group::after, .col-lg-12::after {
  content: "";
  clear: both;
  display: table;
}

.centered-form-group {
align-items: center;
}

.container {
padding-left: 0px !important;
padding-right: 0px !important;
}

.content_25pad-0top {
padding: 0px 5px 0px 5px !important;
}

textarea.form-control, .content_25pad-0top {
padding: 0px 5px !important;
}

select.form-control {
padding-left: 3px !important;
}

select.form-control.borderless.padL0 {
padding-left: 6px !important;
}

form, label, .panel-box-format .form-group .col-lg-3 h4 {
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

.col-lg-12.padL0.textInherit {
padding-top: 0px !important;
}

.marginBottom20 {
margin-bottom: 3px !important;
margin-top: 3px !important;
}

div[class^="col-lg-"]:not(.col-lg-1), div[class^="col-md-"]:not(.col-md-1) {
padding-top: 0px !important;
padding: 0px 6px 0px var(--paddingLeft);
margin-top: 0px !important;
margin-left: 0px !important;
margin-right: 0px !important;
}

#override label~div:has(select, input, textarea) {
//reStyle;
padding-left: calc(var(--paddingLeft) - 7px) !important;
}

#override label~div:has(select, input) {
margin-left: -7px !important;
margin-right: 7px !important;
}

#override label~div>input {
padding: 0px 3px 0px 6px !important;
}

#override label~div>select {
padding: 0px 3px 0px 2px !important;
}

#override .panel-box-format .form-group>label~div:not(:has(*)) {
padding: 0px 3px 0px 5px !important;
}

div.col-none-6 {
display: flex;
align-items: center;
}

#override div.col-md-1 {
padding: 0px 0px 0px 0px !important;
margin-top: 0px !important;
margin-left: 0px !important;
margin-right: 0px !important;
}

div.row .form-group:not(.form-button-margins), #override .form-group>.col-lg-12:first-child:last-child, #override h1, #override .row>.form-group {
margin-bottom: 0px !important;
}

.h1-parent-row {
padding: 3px 10px 3px 20px;
}

#override h5 {
margin-top: 3px !important;
margin-bottom: 3px !important;
}

#override .form-group, .col-lg-12 {
margin-bottom: 3px !important;
}

#override div.form-group :is(label, select, input:not(.form-button-margins)), #override div.row is:(label, select, input), #override div.col-lg-12 is:(label, select, input) {
padding: 0px 6px 0px 6px !important;
margin-top: 0px !important;
margin-left: 0px !important;
margin-right: 0px !important;
}

div.form-group input.form-button-margins {
margin-left: 10px !important;
margin-bottom: 5px !important;
}

.panel-box-format {
margin-bottom: 2px !important;
margin-top: 0px !important;
padding-bottom: 5px !important;
padding-top: 5px !important;
//background-color: #f5f5f5 !important;
background-color: var(--panelBackground) !important;
}

#override .borderless, #override [borderless] {
color: #111 !important;
background-color: rgb(255 255 255 / 40%) !important;
min-height: 28px;
border-radius: 4px;
border: 1px #bfbfbf solid !important;
}

.borderless:disabled, .borderless:read-only {
background-color: #eee !important;
border: 1px #bfbfbf solid !important;
}

input:disabled, select:disabled, textarea:disabled, input:read-only, select:read-only, textarea:read-only, input, select, textarea {
color: #111 !important;
}

div.panel.panel-default:not(.panel-box-format) {
margin-top: 0px !important;
}

h4:not(.panel-box-format .form-group .col-lg-3 h4) {
margin: 5px 10px 5px 0px !important;
background-color: #ececec;
display: inline-flex;
}

.form-button:disabled {
color: rgba(0,0,0,30%) !important;
background: var(--panelBackground) !important;
cursor: no-drop !important;
}

.wiz-form-button {
//new app buttons;
background-image:none !important;
background-color: #DAF7A6 !important;
color: black !important;
border-radius: 4px !important;
padding: 5px !important;
text-align: center !important;
width: 100px !important;
}

.wiz-form-button:disabled {
background-color: white !important;
color: rgba(0 0 0 / 30%) !important;
}

div.custom-form-button-disabled {
color: rgba(0,0,0,30%) !important;
background-color: var(--lightmodeContainerBackground);
border: 1px solid #ccc;
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
border: 1.5px solid;
border-radius: 4px;
}

.custom-button {
background: var(--formButtonBackground);
cursor: pointer;
padding: 3px 3px;
margin: 1px;
border: 1.5px solid;
border-radius:4px;
}

.wiz-form-button:active {
border: 1.5px !important;
}

.custom-button-search {
cursor: pointer;
padding: 3px 4px;
margin-left: 3px;
border: 1.5px solid;
border-radius: 4px;
}

.custom-button:disabled {

}

.custom-button-plus {
border-left: 0px;
margin-left: -5px;
border-top-left-radius: 0px;
border-bottom-left-radius: 0px;
}

.custom-form-button {
margin-left: 10px;
cursor: pointer;
font-weight: bold;
}

.fake-custom-button-float-right {
float: right;
}

.stay-or-go {
padding: 3px 5px;
}

.flex-right {
margin-left: auto !important;
}

.form-check-inline {
height: 15px !important;
}

br {
  content: "";
  margin: 1em;
  display: block;
  font-size: 24%;
}

` );

//Element changes and overrides
GM_addStyle ( `

#caseHeaderData {
padding-left: 0px !important;
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

.native-button-home, #alertsTableAndPanelData #message {
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

.button-row {
height: 27px;
display: table;
}

.dupe-button-house {
height: 34px;
display: table;
padding-top: 4px;
}

div#page-wrap {
position: relative;
z-index: 2;
padding-bottom: 10px !important;
height: 40px !important;
line-height: 20px !important;
float: none;
}

#buttonPaneThree {
margin-bottom: 1px;
}

#override .error_alertbox_new {
margin: 5px !important;
padding: 2px 2px 0px 8px !important;
}
/*
.ui-datepicker {
width: 20em !important;
}
*/
.ui-widget select {
//calendar
color: white !important;
}

#newTabField {
padding: 2px 0px 2px 6px !important;
margin-left: 4px !important;
height: 22px !important;
}

#updateUser, #updateUserURL, #updateDate {
padding: 0px !important;
text-align: justify;
width: 10ch !important;
}

#footer_links {
margin-top: 10px !important;
margin-bottom: 0px !important;
padding: 0px !important;
}

#caseId {
width: 10ch !important;
}

label[for="selectPeriod"] {
height: unset !important;
}
select#selectPeriod {
width: 25ch !important;
}

label[for="inputWorkerId"] {
width: fit-content !important;
}

#redetDateChild {
margin-left: -4px;
top: 0;
position: absolute;
cursor: pointer;
border: 1.5px solid;
border-radius: 4px;
width: 10.1ch;
height: 2.5ch;
}

#copyRedetNoteButton {
margin: 0px 0px 0px 10px;
height: 20px;
}

` );

//Color changes - default
GM_addStyle ( `
body#override {
color: black;
}

html, input, select, textarea, button {
text-shadow: 0 0 0 !important;
}
.red-outline {
outline: outset 3px #a94442 !important;
}

.form-button:not(.form-button:disabled, .custom-form-button-disabled) {
color: #111 !important;
background: var(--formButtonBackground) !important;
}

*:not(a):focus {
box-shadow: 3px 3px 0px rgba(0, 0, 0, .05), 0 0 8px 2px rgba(102, 175, 233, .8) !important;
outline: none !important;
transition: all .2s ease-in;
}
a:focus {
outline: none !important;
filter: drop-shadow(0 0 4px rgba(124, 255, 238, 1));
}
tr:focus{
box-shadow: none !important;
}
.form-control {
color: black !important;
}

#ui-datepicker-div table thead tr th {
color: white;
}
#ui-datepicker-div tr {
display: grid;
grid-template-columns: repeat(7, 1fr);
}
#override #ui-datepicker-div>table>tbody>tr>td {
padding: 1px !important;
}

.button-house {
background-color: transparent;
}

#inActiveCaseTable>tbody>tr>td>span {
background-color: #dcdcdc;
cursor: pointer;
padding: 0px 3px;
margin: 1px;
border: 1.5px solid #333;
border-radius: 4px;
}

#inActiveCaseTable>tbody>tr>td>span:hover {
background-color: #DAF7A6;
}

#snackBar {
background-color: #333;
color: #fff;
font-size: x-large;
text-align: center;
border: solid 5px #fff;
border-radius: 6px;
padding: 16px;
position: fixed;
z-index: 9999;
left: 25%;
right: 25%;
bottom: 30px;
}

` )//End color changes - default


//Color changes - light color scheme
GM_addStyle ( `

@media (prefers-color-scheme: light) {
button.custom-button:hover {
--cbhbc: #DAF7A6;
background-color: var(--cbhbc);
}

button.custom-button-clicked {
--cbcbc: #A6EDF7;
background-color: var(--cbcbc);
}
.container {
background-color: var(--lightmodeContainerBackground);
}
body#override {
background-color: var(--lightmodeBodyBackground) !important;
}
div.panel.panel-default:not(.panel-box-format) {
background-color: var(--lightmodePanelBackground) !important;
}

#override .eligibility-highlight, #override .eligibility-highlight-table {
box-shadow: 0 0 10px 2px inset #c77272 !important;
}

}


@media (prefers-color-scheme: dark) {
body#override {
background-color: var(--darkmodeBodyBackground) !important;
}
.container {
background-color: var(--darkmodeContainerBackground);
}
div.panel.panel-default:not(.panel-box-format) {
background-color: var(--darkmodePanelBackground) !important;
}
html {
filter: invert(100%) hue-rotate(180deg) !important;
}
img, video, :not(object):not(body)>embed, object, svg image, [style*="background:url"], [style*="background-image:url"], [style*="background: url"], [style*="background-image: url"], [background], .sr-reader, .sr-backdrop, .icon {
/* , iframe:fullscreen */
filter: invert(100%) hue-rotate(180deg) !important;
}
[style*="background:url"] *, [style*="background-image:url"] *, [style*="background: url"] *, [style*="background-image: url"] *, input, [background] * {
filter: none !important;
}
#override .eligibility-highlight, #override .eligibility-highlight-table {
box-shadow: 0 0 10px 2px inset #785050 !important;
background-color: white !important;
}
*:not(a):focus {
box-shadow: 0 0 10px 4px #0056a1 !important;
outline: none !important;
transition: all .2s ease-in;
}
a:focus {
outline: none !important;
filter: drop-shadow(0 0 7px #0056a1) !important;
}
.selected a:focus {
outline: none !important;
filter: drop-shadow(0 0 6px #006ce0) !important;
}
tr:focus {
box-shadow: none !important;
}
thead {
text-shadow: none;
font-weight: 550;
}
#ui-datepicker-div {
filter: invert(1);
}
.navbar-inverse, .modal-title {
background-color: #80c6ff !important;
color: black !important;
}
.modal-backdrop, .modal-backdrop-in {
//opacity: .2 !important;
background-color: white !important;
}

.custom-button:hover {
background-color: #38b5bf;
}

.custom-button-clicked {
background-color: #25b3ff;
}

}
` )//End color changes - dark color scheme

//Just for fun
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
