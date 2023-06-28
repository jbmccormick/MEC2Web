// ==UserScript==
// @name         MEC2ReStyle
// @namespace    http://github.com/jbmccormick
// @version      0.77.6
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
:root {
--paddingLeft: 12px;

@media (prefers-color-scheme: light) {
--lightmodeBodyBackground: #b9b9b9;
--lightmodeContainerBackground: #e7e7e7;
--lightmodePanelBackground: #e7e7e7;
--bodyBackground: #b9b9b9;
--panelBackground: #e7e7e7;
--containerBackground: #e7e7e7;
--tabindexNegativeOne: #bbbd58;
--prefilledField: green;
--requiredField: #aa0000;
--formButtonBackground: #cdcdcd;
--borderlessNotDisabledBackground: rgb(255 255 255 / 40%);
--borderlessDisabledBackground: #dedede;
--borderColor: #cccccc;
--borderColorDisabled: ;
--buttonBorderColor: #111111;
--buttonBorderColorDisabled: #cccccc;
--page-wrap: #e6f2fa;
--textColor: #000000;
--disabledTextColor: rgba(0,0,0,30%);
--tableEven: #eaeaea;
--tableOdd: #dedede;
--tableSelected: #95b0e6;
--tableText: black;
--aColor: #337ab7;
--customButtonHover: #DAF7A6;
--customButtonOpenPage: #A6EDF7;
--wizFormButton: #021f00;
--absentDayPeriodHighlight: rgb(119, 119, 119);
--absentDayPeriodOpacity: .2;
--absentDayDisabled: rgb(128, 128, 128);
--absentDayDisabledOpacity: .5;
}

@media (prefers-color-scheme: dark) {
--darkmodeBodyBackground: #3e3e3e;
--darkmodeContainerBackground: #e7e7e7;
--darkmodePanelBackground: #e7e7e7;
--bodyBackground: #3e3e3e;
--containerBackground: #181818;
--panelBackground: #181818;
--tabindexNegativeOne: #7a7373;
--prefilledField: #f8cc69;
--requiredField: #ff0000ad;
--formButtonBackground: #323232;
--textFieldEnabled: #000000;
--borderlessNotDisabledBackground: #111111;
--borderlessDisabledBackground: #212121;
--borderColor: #333333;
--borderColorDisabled: ;
--buttonBorderColor: #b8b8b8;
--buttonBorderColorDisabled: #b8b8b8;
--page-wrap: #051119;
--textColor: #ffffff;
--disabledTextColor: #ffffff80;
--tableEven: #090909;
--tableOdd: #181818;
--tableSelected: #3d4a63;
--tableText: white;
--tableRowBorder: #333333;
--tableOuterBorder: #4eb750;
--headerColor: #a0d8ff;
--aColor: #8cbbe5;
--customButtonHover: #0fb22a;
--customButtonOpenPage: #25b3ff;
--wizFormButton: #2b440b;
--absentDayPeriodHighlight: #777777;
--absentDayPeriodOpacity: .5;
--absentDayDisabled: rgb(128, 128, 128);
--absentDayDisabledOpacity: .9;
}

}

html, body {
background-color: var(--bodyBackground);
}

/*Variables end ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */


#preFilledFields {
color: var(--prefilledField);
}
#notTabbableFields {
color: var(--tabindexNegativeOne);
}
#requiredFields {
color: var(--requiredField);
}
div.container>div.panel .prefilled-field, #preFilledFields {
box-shadow: inset 0 0 2px .9px var(--prefilledField) !important;
}
div.container>div.panel .tabindex-negative-one, #notTabbableFields {
box-shadow: inset 0 0 2px .9px var(--tabindexNegativeOne) !important;
background-color: var(--borderlessDisabledBackground) !important;
}
div.container>div.panel .required-field, #requiredFields {
box-shadow: inset 0 0 2px .9px var(--requiredField) !important;
}
.auto-fill-formatting {
position: absolute !important;
left: 50%;
transform: translate(-50%, 0);
width: fit-content !important;
display: inline-flex;
align-items: center;
justify-items: center;
column-gap: 15px;
}
#preFilledFields, #notTabbableFields, #requiredFields {
padding: 5px;
border-radius: 4px;
}
#override div.textarea_wrapper {
border: 1px solid;
width: fit-content;
padding: 0 !important;
}
#override div.textarea_wrapper > textarea {
outline: none !important;
padding: 0 !important;
display: block !important;
margin: 3px !important;
border: none !important;
background: var(--borderlessNotDisabledBackground) !important;
color: var(--textColor);
width: 60.5ch !important;
overflow: hidden !important;
max-height: 238px !important;
}
#override div.textarea_wrapper > textarea:is([readonly], [disabled]) {
background: var(--borderlessDisabledBackground) !important;
color: var(--textColor);
}
.even:not(.selected) {
background: var(--tableEven) !important;
color: var(--tableText);
}
.odd:not(.selected) {
background: var(--tableOdd) !important;
color: var(--tableText);
}
.odd.selected, .even.selected {
background: var(--tableSelected) !important;
color: var(--tableText);
}
tbody>tr>td[class^="sorting"] {
background-color: var(--tableSorting) !important;
color: var(--textColor);
}
tbody>tr>td {
border-top: 1px solid var(--tableRowBorder) !important;
}
h1, h2, h3, h4 {
color: var(--headerColor) !important;
}
a {
color: var(--aColor) !important;
}
#footer_info {
color: inherit !important;
}

/*Testing Section */

a:has(#wrapUp) {
display: inline-block;
}
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button, .remove-arrows-from-number-input {
-webkit-appearance: none;
margin: 0;
}

#providerSearchData :is(#ssn, #licenseNumber, #fein, #itin) {
width: 12ch !important;
}
#providerSearchData #providerIdNumber {
width: 10ch !important;
}

h1 {
display: flex;
column-gap: 1rem;
}
h1::before, h1::after {
content: '🌻';
}

#billingTableAndPanelData table>tbody>tr:has(td.col-lg-1)>td:first-child>div {
display: flex;
align-items: center;
justify-content: center;
@media (min-width: 900px) {
font-size: 12px !important;
}
@media (min-width: 1200px) {
font-size: 13px !important;
}
}

#billingTableAndPanelData table>tbody>tr:has(td.col-lg-1)>td {
padding: 5px !important;
}

#caseData>div.panel>div.col-lg-8:has(input[type="checkbox"]), #providerData>.panel>div.col-lg-offset-3, #reporterTypeCheckboxes, #informationRequest>div.col-lg-offset-3, #user_sign-in_content2 .form-group:has(#terms) {
align-items: center;
display: grid !important;
grid-template-columns: min-content auto;
gap: .4em;
}
#override div.checkbox-groups {
gap: 0.4em;
align-items: center;
margin-bottom: 5px !important;
display: grid !important;
grid-template-columns: 5ch auto;
}
#raceCheckBoxes {
display: flex;
flex-direction: row;
height: 28px;
}
div#memberThirdPanelData div.row:has(#raceCheckBoxes[style="display: none;"]) {
display: none !important;
}
#raceCheckBoxes>div {
flex-grow: 1;
width: auto !important;
align-items: center;
gap: .4em;
display: flex;
}
#raceCheckBoxes>* {
padding: 0 !important;
}
#override input[type="checkbox"] {
height: 18px !important;
width: 18px !important;
margin: 0px !important;
}

.center-vertical {
display: inline-flex;
flex-wrap: wrap;
align-content: space-around;
}

.capitalize {
text-transform: capitalize;
}

.stickyRow {
position: sticky !important;
z-index: 50;
}
#programInformationData_wrapper .dataTables_scrollBody {
max-height: 195px !important;
}

div#alertTable_wrapper tr>td:first-child {
width: 215px !important;
}
div#caseEligibilityResultFinancialTable_wrapper tr>td:is(:nth-child(8), :nth-child(9)) {
doesntwork-width: 60px !important;
}

table {
font-size: 14px !important;
}

body {
align-items: center;
}

#providerNoticesSearchData_wrapper .dataTables_scrollBody, #caseNoticesSearchData_wrapper .dataTables_scrollBody, #providerPaymentHistoryData_wrapper .dataTables_scrollBody, #jobSearchDetailsTable_wrapper .dataTables_scrollBody {
max-height: 486px !important;
}
/*Testing Section end ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */


/*Flexed items */


.panel-box-format .form-group:not(.panel-box-format .form-group .col-lg-3 h4):not(.form-group.collapse), panel-box-format .col-lg-12 {
margin-bottom: 3px !important;
display: flex;
align-items: center;
}

.row {
display: flex;
align-items: center;
min-height: 22px;
margin-bottom: 3px;
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

.centered-right-label:not(input[type="checkbox"] ~ label, .toLabel, #specLetterOther>label) {
display: inline-flex;
align-items: center;
justify-content: flex-end;
text-align: right;
padding: 0px 6px;
min-height: 18px;
}

#redetDate {
padding: 0px 6px 0px 6px !important;
align-items: center;
display: flex;
position: relative;
}

#updateHome {
justify-content: flex-end;
display: flex;
flex-direction: row;
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

.form-group>#providerData, .flex-row, .col-lg-12, .col-md-12, .row, .visible-lg, .form-group:not([class*="col-"]:not([class*="12"])):not(.collapse, [style="display: none;"], [style="display: none"], [style="display:none"]) {
display: flex !important;
flex-wrap: wrap;
align-items: center;
flex-grow: 1;
}
.form-group>#providerData {
flex-grow: 1;
}
.form-group-no-margins {
display: flex;
flex-wrap: wrap;
align-items: center;
align-content: center;
}
.form-group-button-children {
display: flex;
flex-wrap: wrap;
align-items: center;
align-content: center;
gap: 10px;
}
.form-group-button-children > button {
gap: 5px;
background: var(--formButtonBackground);
border: 1px solid var(--buttonBorderColor);
padding: 0 5px;
font-weight: bold;
display: inline-flex;
align-items: center;
justify-content: center;
min-height: 28px;
height: fit-content;
width: fit-content;
}

/* end flexed items ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */

/*
div[id$="TableAndPanelData"]>div[id$="PanelData"] {
margin-bottom: 5px;
}
*/

#override .row {
margin-left: 0px;
margin-right: 0px;
}

div[class^="dataTables_"]:not(.dataTables_length, .dataTables_sizing, #countiesTableDiv, #allowedRegistrationFeeTable_wrapper, #billingRegistrationFeesTable_wrapper) {
width: inherit;
}

#reappAddCcapDetail>#addressTableAndPanelData #countiesTableDiv {
display: grid;
}

#reappAddCcapDetail>#addressTableAndPanelData>h4 {
display: flex;
}

#footer_info, div[id$="TableAndPanelData"]>div[id$="PanelData"], .form-button:not('.col-lg-12 .form-button, .row .form-button') {
margin-bottom: 5px !important;
}

.toNeighbors, .toNeighbors > input, .dateInput {
width: 11ch !important;
padding: 0 !important;
}
.toLabel {
display: flex;
flex-wrap: wrap;
align-content: center;
width: 3ch !important;
justify-content: space-evenly;
padding: 0 !important;
}
.rounded-border-box {
border: 1.5px solid;
border-radius: 4px;
}

.auto-clearfix, #user_sign-in_content2 .content_35pad::after, .panel-box-format::after, .form-group::after, .col-lg-12::after, #serviceTableActionsArea, #serviceTableAddServiceArea, .auto-fill-formatting::after {
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

.dataTables_scrollHeadInner>table.dataTable>thead>tr>td, .dataTables_scrollBody>table.dataTable>tbody>tr>td {
padding: 3px 7px !important;
}
table.dataTable thead td {
border-bottom: none !important;
}
body#override div.dataTables_scrollBody {
margin-top: -5px;
border: var(--tableOuterBorder) solid;
border-width: 0px 1px 1px !important;
background: transparent !important;
}
body#override div.dataTables_scrollBody>table {
border-top: 0px !important;
}
tr:not(.stickyRow)+tr.stickyRow {
box-shadow: inset 0px 1px var(--textColor);
}
.col-lg-12.padL0.textInherit {
padding-top: 0px !important;
}

.marginBottom20 {
margin-bottom: 3px !important;
margin-top: 3px !important;
}

div[class^="col-lg-"]:not(.col-lg-1):not(div[class^="col-lg-offset"]), div[class^="col-md-"]:not(.col-md-1):not(div[class^="col-md-offset"]) {
padding-top: 0px !important;
padding: 0px 6px 0px var(--paddingLeft);
margin-top: 0px !important;
margin-left: 0px !important;
margin-right: 0px !important;
}

#override label+div:has(select, input, textarea, span) {
padding-left: calc(var(--paddingLeft) - 7px) !important;
}

#override label+div:has(select, input):not(#otherCommentsDiv, #aliasGroup *) {
margin-left: -7px !important;
margin-right: 7px !important;
}

#override label+div>input {
padding: 0px 3px 0px 6px !important;
}

#override label+div>select {
padding: 0px 3px 0px 2px !important;
}

#override .panel-box-format .form-group>label+div:not(:has(*)) {
padding: 0px 3px 0px 5px !important;
}

div.col-none-6 {
display: flex;
align-items: center;
}

#override div.col-md-1:not(.toLabel) {
padding: 0px 0px 0px 0px !important;
margin-top: 0px !important;
margin-left: 0px !important;
margin-right: 0px !important;
}

div.row .form-group:not(.form-button-margins), #override .form-group>.col-lg-12:first-child:last-child, #override h1, #override .row>.form-group {
margin-bottom: 0px !important;
}

.h1-parent-row {
padding: 3px 10px 3px 0px;
}

#override h5 {
margin-top: 3px !important;
margin-bottom: 3px !important;
}

#override .form-group, .col-lg-12 {
margin-bottom: 3px !important;
}

#override div.form-group :is(label, select, input:not(.form-button-margins)), #override div.row :is(label, select, input), #override div.col-lg-12 :is(label, select, input) {
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
background-color: var(--panelBackground) !important;
}




:is(output, input, select, textarea, checkbox)[contenteditable="false"] {
color: red !important;
}
[contenteditable] {
background-color: red !important;
}

/*
textarea.form-control, .textarea_wrapper>textarea, #override label+div>textarea {
background: var(--borderlessNotDisabledBackground) !important;
color: var(--textColor) !important;
border: 1px solid var(--borderColor) !important;
}
*/

#override :is(.updateParent input, #editSummaryPanelData input) {
border: none !important;
}
div.panel.panel-default:not(.panel-box-format, .modal-content) {
margin: 0 0 10px 0 !important;
border: none !important;
}

h4:not(.panel-box-format .form-group .col-lg-3 h4) {
margin: 5px 10px 5px 0px !important;
display: inline-flex;
}

.custom-button, .custom-button__nodisable {
color: var(--textColor);
background: var(--formButtonBackground);
cursor: pointer;
border: 1px solid var(--buttonBorderColor);
border-radius:4px;
padding: 3px 3px;
}
.custom-button__nav {
padding: 3px 3px;
}
.custom-button__nav__plus {
border-left: 0px transparent !important;
margin-left: -5px;
border-top-left-radius: 0px;
border-bottom-left-radius: 0px;
}
.custom-button__floating {
background: var(--formButtonBackground);
width: fit-content;
height: 25px;
padding: 0px 6px 0px 6px !important;
display: inline-flex;
align-items: center;
justify-content: center;
cursor: pointer;
margin: 1px;
border-radius: 4px;
}
.custom-button__disabled {
border-color: var(--buttonBorderColor) !important;
/*background: transparent !important;*/
cursor: not-allowed !important;
color: var(--disabledTextColor) !important;
}

.custom-form-button {
margin-left: 10px;
cursor: pointer;
font-weight: bold;
}
.custom-form-button__disabled:not(.custom-button__nodisable) {
color: var(--disabledTextColor);
background-color: var(--containerBackground);
border: 1px solid var(--buttonBorderColorDisabled);
cursor: no-drop !important;
margin-left: 10px;
font-weight: bold;
}

.form-button:disabled {
color: var(--disabledTextColor);
background: var(--panelBackground) !important;
border: 1px solid var(--buttonBorderColorDisabled);
cursor: no-drop !important;
}
.form-button {
border: 1px solid var(--buttonBorderColor);
padding: 0px 5px !important;
text-align: center !important;
justify-content: center;
min-width: 90px !important;
margin-left: 10px !important;
min-height: 28px;
height: fit-content;
background-image: none !important;
}
.form-button:not(.form-button:disabled, .custom-form-button__disabled, [hidden]) {
display: inline-flex;
}

.wiz-form-button:active {
border: 1.5px !important;
}
.wiz-form-button:not(:disabled) {
background-image: none !important;
background-color: var(--wizFormButton) !important;
color: var(--textColor) !important;
border-radius: 4px !important;
padding: 5px !important;
text-align: center !important;
width: 100px !important;
border: var(--buttonBorderColor);
}
.wiz-form-button:disabled {
background-color: transparent !important;
border: var(--buttonBorderColorDisabled);
color: var(--disabledTextColor);
}

.next-prev-period-button {
padding: 3px 5px;
height: 25px;
}

.flex-right, .col-lg-2:has(>a#worker) {
margin-left: auto !important;
}

.float-right {
float: right;
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

#caseHeaderData {
padding-left: 0px !important;
}

#memberComments, #comments, #textbox2, #textbox1:not(form#providerNoticesDetail #textbox1):not(#caseTableAndPanelData #textbox1), #wcTextbox {
width: 61.5ch !important;
padding: 0 .5ch 0 .5ch !important;
overflow: hidden !important;
}

form#providerNoticesDetail textarea#textbox1, form#caseNoticesDetail textarea#textbox1 {
height: 520px !important;
}

#noteStringText, #reason:not(select) {
height: 78.1ch;
width: 101.5ch !important;
padding: .5ch !important;
overflow: hidden !important;
}

.col-sm-6 > #message {
width: 51.5ch !important;
padding: .5ch !important;
overflow: hidden !important;
}

.col-sm-6:has(#message) {
width: 54ch !important;
}

.native-button-home, #alertsTableAndPanelData #message {
margin-top: 5px;
}

.fc .fc-toolbar.fc-header-toolbar {
margin-bottom: 0.5em !important;
}
.fc-bg-event {
background: var(--absentDayPeriodHighlight) !important;
opacity: var(--absentDayPeriodOpacity) !important;
}
.fc-day-disabled {
background: var(--absentDayDisabled) !important;
opacity: var(--absentDayDisabledOpacity) !important;
}


#alertsPanelData div.container-fluid  {
padding-left: 5px !important;
padding-right: 5px !important;
margin-left: -25px !important;
}

.button-row__nav, .button-row__nav>div {
height: 27px;
display: flex;
align-items: center;
column-gap: 2px;
row-gap: 3px;
}

#navButtonHouse {
margin-bottom: 1px;
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
background-color: var(--page-wrap);
}
div#page-wrap * {
background-color: inherit !important;
}

#override .error_alertbox_new {
margin: 5px !important;
padding: 2px 2px 0px 8px !important;
}

#newTabField {
height: 22px !important;
width: 10ch;
}

:is(a, div)>input:is(#updateUser, #updateUserURL, #updateDate, #priEligibleActivity, #absentDaysUsed) {
background-color: transparent;
padding: 0px !important;
text-align: justify;
width: 10ch !important;
}

#footer_links {
margin: 10px 10px 0px !important;
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
margin: 0 3px;
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

/* Default section end ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */

/*Color changes - default */

.red-outline {
outline: outset 3px #a94442 !important;
blarg: colors;
}

.form-button:not(:disabled, .custom-form-button__disabled), .form-small-button {
color: var(--textColor) !important;
background: var(--formButtonBackground) !important;
border: 1px solid var(--buttonBorderColor);
}

*:not(a, summary, tr, .custom-button__nav, :disabled, .custom-form-button__disabled, .textarea_wrapper>textarea):focus {
box-shadow: 3px 3px 0px rgba(0, 0, 0, .05), 0 0 8px 2px rgba(102, 175, 233, .8) !important;
blarg: colors;
outline: none !important;
transition: all .2s ease-in;
}

a:focus {
outline: none !important;
filter: drop-shadow(0 0 4px rgba(124, 255, 238, 1));
blarg: colors;
}

tr:focus {
outline: none !important;
box-shadow: none !important;
}

.ui-datepicker-title select {
padding: 1px;
}
#ui-datepicker-div .ui-datepicker-header {
border-radius: 6px !important;
}
#ui-datepicker-div table thead tr th {
blarg: colors;
color: white;
}
#ui-datepicker-div tr {
display: grid;
grid-template-columns: repeat(7, 1fr);
}
#override #ui-datepicker-div table>tbody>tr>td {
padding: 1px !important;
}
#override #ui-datepicker-div {
margin-top: .25em;
width: 45em !important;
transform: translateX(-40%);
}
.ui-datepicker-group, .ui-widget-content {
background: #222 !important;
blarg: colors;
padding: 0px 1px;
}
.ui-datepicker-buttonpane {
margin: 0 !important;
}

.button-house {
background-color: transparent;
}

#inActiveCaseTable>tbody>tr>td>span {
background-color: var(--formButtonBackground);
color: var(--textColor);
cursor: pointer;
padding: 0px 3px;
margin: 1px;
border: 1px solid var(--buttonBorderColor);
border-radius: 4px;
}

#inActiveCaseTable>tbody>tr>td>span:hover {
background-color: var(--customButtonHover);
blarg: colors;
}

#snackBar {
blarg: colors;
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

/*End color changes - default ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */




.custom-button__nav__browsing, .custom-button:not(.custom-button__disabled):hover {
background-color: var(--customButtonHover) !important;
}
.custom-button__nav__open-page {
background-color: var(--customButtonOpenPage) !important;
}

.container {
background-color: var(--containerBackground);
}
body#override {
background-color: var(--bodyBackground);
color: var(--textColor);
}
div.panel.panel-default:not(.panel-box-format), .error_alertbox_new {
background-color: var(--panelBackground) !important;
}

@media (prefers-color-scheme: light) {

#override .eligibility-highlight, #override .eligibility-highlight-table {
blarg: colors;
box-shadow: 0 0 10px 2px inset #c77272 !important;
}

}


@media (prefers-color-scheme: dark) {
#override .eligibility-highlight, #override .eligibility-highlight-table {
blarg: colors;
box-shadow: 0 0 10px 2px inset #785050 !important;
background-color: white !important;
}
*:not(a, summary, tr, .custom-button__nav, :disabled, .custom-form-button__disabled, .textarea_wrapper>textarea):focus {
blarg: colors;
box-shadow: 0 0 10px 4px #0056a1 !important;
outline: none !important;
transition: all .2s ease-in;
}
a:focus {
outline: none !important;
blarg: colors;
filter: drop-shadow(0 0 7px #0056a1) !important;
}
.selected a:focus {
outline: none !important;
blarg: colors;
filter: drop-shadow(0 0 6px #006ce0) !important;
}
tr:focus {
outline: none !important;
box-shadow: none !important;
}
.navbar-inverse, .modal-title {
color: var(--textColor) !important;
}

.modal-backdrop, .modal-backdrop-in {
dis-opacity: .2 !important;
blarg: colors;
background-color: black !important;
}

}/*end dark mode*/

body#override .form-control:not([readonly], [disabled]) {/* forms.less 118, where most settings are done */
color: var(--textColor);
background-color: var(--borderlessNotDisabledBackground);
border-color: var(--borderColor);
box-shadow: var(--borderColor);
}

button, html input[type="button"], input[type="reset"], input[type="submit"], .custom-button, .custom-button__nav__plus {/* normalize.less 290, button appearance */
color: var(--textColor);
background-color: var(--formButtonBackground);
border: 1px solid var(--buttonBorderColor);
box-shadow: var(--buttonBorderColor);
}

button[readonly], html input[readonly], html select[readonly] {/*  MEC.css 423 */
color: var(--textColor);
background-color: var(--borderlessDisabledBackground);
border-color: var(--buttonBorderColor);
}

body#override :is(html input[disabled], html select[disabled]) {/* MEC2.css 414 background, color, border */
color: var(--textColor);
background-color: var(--borderlessDisabledBackground);
border: 1px solid var(--borderColor);
}

body#override button[disabled] {/* MEC2.css 414 background, color, border */
color: var(--textColor);
background-color: var(--borderlessDisabledBackground);
border: 1px solid var(--buttonBorderColor);
}
body :is(.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control) {/* forms.less 153, has priority */
background-color: var(--borderlessDisabledBackground);
border: 1px solid var(--borderColor);
}

html>body#override div.panel.panel-default form .form-control.borderless {/* MEC2.css 781 background-color, border-color, */
color: var(--textColor);
background-color: var(--borderlessDisabledBackground) !important;
border-color: var(--borderColor) !important;
}

[hidden], .navbar .navbar-inverse, .collapse, #reSubmit {
display: none !important;
}

:is(div, input).form-control:not(input[style*="border:none"], input[type="checkbox"]), select.form-control {
height: 28px !important;
}
`)
})();
