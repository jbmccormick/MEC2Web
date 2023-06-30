// ==UserScript==
// @name         MEC2Buttons
// @namespace    http://tampermonkey.net/
// @version      0.83.8
// @description  Add navigation buttons to MEC2 to replace the drop down hover menus
// @author       MECH2
// @match        mec2.childcare.dhs.state.mn.us/*
// @match        mec2.trng2.dhs.state.mn.us/*
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
    'use strict';
$('.marginBottom20').length && (console.log($('.marginBottom20')))
document.getElementsByTagName('body')[0].id = 'override'
$('br').remove();
let viewMode = $('#page-wrap').length;
document.getElementsByClassName("line_mn_green")[0].id = "greenline"
let primaryPanelID = document.getElementById("page-wrap") ? document.getElementById("page-wrap") : document.getElementById("greenline");
$(primaryPanelID).after('<div id="navButtonHouse" class="button-house nav-button-house"><div class="button-row__nav"><div id="buttonPanelOne"></div><div id="buttonPanelOneNTF"></div></div><div class="button-row__nav" id="buttonPanelTwo"></div><div class="button-row__nav" id="buttonPanelThree"></div></div><div id="dupeButtonHouse" class="button-house dupe-button-house"></div>');
$('#dupeButtonHouse').siblings('br').remove();
let buttonDivOne = document.getElementById('buttonPanelOne');
let buttonDivTwo = document.getElementById('buttonPanelTwo');
let buttonDivThree = document.getElementById('buttonPanelThree');
let searchIcon = "<span class='icon' style='font-size:80%;'>&#128269</span>";//🔍	128269	1F50D
let thisPageName = window.location.pathname.substring(window.location.pathname.indexOf("/ChildCare/") + 11, window.location.pathname.lastIndexOf("."));
let thisPageNameHtm = window.location.pathname.substring(window.location.pathname.indexOf("/ChildCare/") + 11, window.location.pathname.lastIndexOf(".")+4);
let reviewingEligibility = ((window.location.href.indexOf("CaseEligibilityResult") > 0 && window.location.href.indexOf("CaseEligibilityResultSelection.htm") < 0))
let firstEmptyId = !viewMode ? $(':is(input, select):not(:disabled, #newTabField, .form-button, .tabindex-negative-one, [readonly], [type="hidden"])').filter(function() {return $(this).val() === ''}).eq(0).prop('id') : ''
if (!viewMode) {
	// addGlobalStyle('.custom-button__nav { color: DarkGrey; cursor: no-drop; }');
	// addGlobalStyle('.custom-button__nav__plus { border-left: 0; margin-left:-7px; border-top-left-radius:0; border-bottom-left-radius:0; }');
	// addGlobalStyle('.custom-button:hover { background-color: #DAF7A6; }');
	// addGlobalStyle('.custom-button__nav__open-page { background-color: #A6EDF7; }');
	addGlobalStyle('.panel.panel-default { margin-top: 0px !important; }');
};
let periodDateRange
let periodDateStart
let periodDateEnd
if ($('#selectPeriod').length) {
    periodDateRange = $('#selectPeriod').val()
    // periodDateStart = new Date(periodDateRange.slice(10))
    periodDateStart = periodDateRange.slice(0, 10)
    periodDateEnd = periodDateRange.slice(13)
    // periodDateEnd = new Date(periodDateRange.slice(0, 10))
}
console.log(periodDateRange, periodDateStart, periodDateEnd)
/* DIVIDER ////////////////////////////////////////////////////////////////////////////////////////////////// EARLY EVENTS SECTION START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */

// function updateBackground( e ) {
//     console.log(e.parentNode.parentNode)
//     e.parentNode.parentNode.style.backgroundColor = e.value
//     e.nextSibling.innerText = e.value
//     // $('#' + e.id).parent().css('background-color', e.value)
// }
// setTimeout(function() {
//     $('body, .container:eq(2)').each(function(index) {
//         $(this).append('<div><input class="colorpicker" id="colorpicker' + index + '" type="color" style="padding: 0px" value="#ffffff"><span style="width: 10ch; margin: 0 3px;" id="colorpicker' + index + 'span">#</span></div>')
//     })
//     $('.colorpicker').on('change', function() { updateBackground(this) })
// },0)

const changeEvent = new Event('change');
function doEvent(element) {
    document.querySelector(element).dispatchEvent(changeEvent);
}
//

//SECTION START Fix for table entries losing selected class when clicked on
$('tbody').click(function(event) {
    $(event.target.closest('td')).parents('tr').addClass('selected');
});
//SECTION END Fix for table entries losing selected class when clicked on

//SECTION START Make all h4 clicky collapse
$("h4").click( function() {
	$(this).nextAll().toggleClass("collapse")
});
//SECTION END Make all h4 clicky collapse

//Retaining Actual Date until #done //todo: convert to object - sessionStorage.setItem(JSON.stringify(caseId {actualDate: $('#actualDate, #applicationReceivedDate').val(), processingApplication: })) and JSON.parse(sessionStorage.getItem(caseId))
if ($('#applicationReceivedDate, #actualDate').length && (sessionStorage.getItem('actualDate') === null || sessionStorage.getItem('processingApplication') === '')) {
    $('#save').click(function() {
        sessionStorage.setItem('actualDate', $('#actualDate, #applicationReceivedDate').val())
        if ($('#applicationReceivedDate').length) { sessionStorage.setItem('processingApplication', "yes") }
    })
}
if (!viewMode && sessionStorage.getItem('actualDate') !== null && sessionStorage.getItem('actualDate') !== '' && $('#actualDate, #bSfEffectiveDate').length && !$('#actualDate, #bSfEffectiveDate').val().length) {
    $('#actualDate, #bSfEffectiveDate').addClass('prefilled-field').val(sessionStorage.getItem('actualDate'))
}
if (!viewMode && sessionStorage.getItem('processingApplication') === "yes" && $('#employmentActivityBegin, #activityPeriodStart, #activityBegin, #ceiPaymentBegin, #paymentBeginDate').length && !$('#employmentActivityBegin, #activityPeriodStart, #activityBegin, #ceiPaymentBegin, #paymentBeginDate').val().length) {
    $('#employmentActivityBegin, #activityPeriodStart, #activityBegin, #ceiPaymentBegin, #paymentBeginDate').val(sessionStorage.getItem('actualDate'))
}
$('#done').click(function() {
    sessionStorage.removeItem('actualDate')
    sessionStorage.removeItem('processingApplication')
})
function resetTabIndex() {
    $(':is(select, input, textarea)[tabindex]:not([disabled], [readonly])').removeProp('tabindex')
    // $(':is(select, input, textarea)[tabindex]:not([disabled], [readonly], [tabindex="-1"])').removeProp('tabindex')
    $(':is(select, input, textarea)[tabindex]:not([tabindex="-1"]):is([disabled], [readonly])').prop('tabindex', '-1')
}
if (!viewMode) {
    if (('table').length) { setTimeout(function() { $(':is(.dataTables_wrapper, .dataTables_wrapper *)').prop('tabindex', '-1') },300 ) }
}
resetTabIndex()
//
$('.required-field').blur(function(event) { if (event.target.value !== '') { event.target.classList.remove('required-field') } })
/* DIVIDER ////////////////////////////////////////////////////////////////////////////////////////////////// EARLY EVENTS SECTION end \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */

/* DIVIDER /////////////////////////////////////////////////////////////////////////////////////////////////// NAVIGATION BUTTONS SECTION START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */

//SECTION START Declaring navigation button arrays
const gotoButtonsObject = { //Goto Buttons, objectGroupName: { buttonText: "Name as it appears on a button", gotoPage: "gotoPageName", opensIn: "_self or _blank", parentId: "Id of parent", buttonId: "Id of Button'],
    alerts: { buttonText: "Alerts", gotoPage: "Alerts", opensIn: "_self", parentId: "Alerts", buttonId: "AlertsSelf" },
    alertsPlus: { buttonText: "+", gotoPage: "Alerts", opensIn: "_blank", parentId: "Alerts", buttonId: "AlertsBlank" },
    notes: { buttonText: "Notes", gotoPage: "CaseNotes", opensIn: "_self", parentId: "Case Notes", buttonId: "CaseNotesSelf" },
    notesPlus: { buttonText: "+", gotoPage: "CaseNotes", opensIn: "_blank", parentId: "Case Notes", buttonId: "CaseNotesBlank" },
    overview: { buttonText: "Overview", gotoPage: "CaseOverview", opensIn: "_self", parentId: "Case Overview", buttonId: "CaseOverviewSelf" },
    summary: { buttonText: "Summary", gotoPage: "CasePageSummary",opensIn: "_self", parentId: "Page Summary", buttonId: "CasePageSummarySelf" },
    clientSearch: { buttonText: "Client "+searchIcon, gotoPage: "ClientSearch", opensIn: "_self", parentId: "Client Search", buttonId: "ClientSearchSelf" },
    clientSearchPlus: { buttonText: "+", gotoPage: "ClientSearch", opensIn: "_blank", parentId: "Client Search", buttonId: "ClientSearchBlank" },
    providerSearch: { buttonText: "Provider "+searchIcon, gotoPage: "ProviderSearch", opensIn: "_self", parentId: "Provider Search", buttonId: "ProviderSearchSelf" },
    providerSearchPlus: { buttonText: "+", gotoPage: "ProviderSearch", opensIn: "_blank", parentId: "Provider Search", buttonId: "ProviderSearchBlank" },
    activeCaseList: { buttonText: "Active", gotoPage: "ActiveCaseList", opensIn: "_self", parentId: "Active Caseload List", buttonId: "ActiveCaseListSelf" },
    activeCaseListPlus: { buttonText: "+", gotoPage: "ActiveCaseList", opensIn: "_blank", parentId: "Active Caseload List", buttonId: "ActiveCaseListBlank" },
    pendingCaseList: { buttonText: "Pending", gotoPage: "PendingCaseList", opensIn: "_self", parentId: "Pending Case List", buttonId: "PendingCaseListSelf" },
    pendingCaseListPlus: { buttonText: "+", gotoPage: "PendingCaseList", opensIn: "_blank", parentId: "Pending Case List", buttonId: "PendingCaseListBlank" },
    inactiveCaseList: { buttonText: "Inactive", gotoPage: "InactiveCaseList", opensIn: "_self", parentId: "Inactive Case List", buttonId: "InactiveCaseListSelf" },
    inactiveCaseListPlus: { buttonText: "+", gotoPage: "InactiveCaseList", opensIn: "_blank", parentId: "Inactive Case List", buttonId: "InactiveCaseListBlank" },
    newApplication: { buttonText: "New App", gotoPage: "CaseApplicationInitiation",opensIn: "_self", parentId: "Case Application Initiation", buttonId: "NewAppSelf" },
    newApplicationPlus: { buttonText: "+", gotoPage: "CaseApplicationInitiation",opensIn: "_blank", parentId: "Case Application Initiation", buttonId: "NewAppBlank" },
};
const mainRowButtons = { //   Main Row (2nd row) buttons, { buttonText: "Name as it appears on a button", buttonId: "mainRowButtonsId" },
    member: { buttonText: "Member", buttonId: "memberMainButtons" },
    case: { buttonText: "Case", buttonId: "caseButtons" },
    activityIncome: { buttonText: "Activity and Income", buttonId: "activityIncomeButtons" },
    eligibility: { buttonText: "Eligibility", buttonId: "eligibilityButtons" },
    sa: { buttonText: "SA", buttonId: "saButtons" },
    notices: { buttonText: "Notices", buttonId: "noticesButtons" },
    providerInfo: { buttonText: "Provider Info", buttonId: "providerButtons" },
    providerNotices: { buttonText: "Provider Notices", buttonId: "providerNoticesButtons" },
    billing: { buttonText: "Billing", buttonId: "billingButtons" },
    csi: { buttonText: "CSI", buttonId: "csiButtons" },
    transfer: { buttonText: "Transfer", buttonId: "transferButtons" },
    claims: { buttonText: "Claims", buttonId: "claimsButtons" },
};

const rowThreeButtonObject = {
    memberMainButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        caseMemberi: { buttonName: "Member I", pageWithoutDotHtm: "CaseMember", opensIn: "_self", parentId: "Member", buttonId: "CaseMemberSelf", rowTwoParent: "memberMainButtons"},
        caseMemberii: { buttonName: "Member II", pageWithoutDotHtm: "CaseMemberII", opensIn: "_self", parentId: "Member II", buttonId: "CaseMemberIISelf", rowTwoParent: "memberMainButtons"},
        caseParent: { buttonName: "Parent", pageWithoutDotHtm: "CaseParent", opensIn: "_self", parentId: "Parent", buttonId: "CaseParentSelf", rowTwoParent: "memberMainButtons"},
        caseCse: { buttonName: "CSE", pageWithoutDotHtm: "CaseCSE", opensIn: "_self", parentId: "Child Support Enforcement", buttonId: "CaseCSESelf", rowTwoParent: "memberMainButtons"},
        caseSchool: { buttonName: "School", pageWithoutDotHtm: "CaseSchool", opensIn: "_self", parentId: "School", buttonId: "CaseSchoolSelf", rowTwoParent: "memberMainButtons"},
        caseProvider: { buttonName: "Provider", pageWithoutDotHtm: "CaseChildProvider", opensIn: "_self", parentId: "Child Provider", buttonId: "CaseChildProviderSelf", rowTwoParent: "memberMainButtons"},
        caseSpecialNeeds: { buttonName: "Special Needs", pageWithoutDotHtm: "CaseSpecialNeeds", opensIn: "_self", parentId: "Special Needs", buttonId: "CaseSpecialNeedsSelf", rowTwoParent: "memberMainButtons"},
        caseDisability: { buttonName: "Disability", pageWithoutDotHtm: "CaseDisability", opensIn: "_self", parentId: "Disability", buttonId: "CaseDisabilitySelf", rowTwoParent: "memberMainButtons"},
        caseFraud: { buttonName: "Fraud", pageWithoutDotHtm: "CaseFraud", opensIn: "_self", parentId: "Case Fraud", buttonId: "CaseFraudSelf", rowTwoParent: "memberMainButtons"},
        caseImmigration: { buttonName: "Immigration", pageWithoutDotHtm: "CaseImmigration", opensIn: "_self", parentId: "Immigration", buttonId: "CaseImmigrationSelf", rowTwoParent: "memberMainButtons"},
        caseAlias: { buttonName: "Alias", pageWithoutDotHtm: "CaseAlias", opensIn: "_self", parentId: "Case Alias", buttonId: "CaseAliasSelf", rowTwoParent: "memberMainButtons"},
        caseRemoveMember: { buttonName: "Remove", pageWithoutDotHtm: "CaseRemoveMember", opensIn: "_self", parentId: "Remove a Member", buttonId: "CaseRemoveMemberSelf", rowTwoParent: "memberMainButtons"},
        caseMemberHistory: { buttonName: "History", pageWithoutDotHtm: "CaseMemberHistory", opensIn: "_self", parentId: "Member History", buttonId: "CaseMemberHistorySelf", rowTwoParent: "memberMainButtons"},
        caseMemberHistoryPlus: { buttonName: "+", pageWithoutDotHtm: "CaseMemberHistory", opensIn: "_blank", parentId: "Member History", buttonId: "CaseMemberHistoryBlank", rowTwoParent: "memberMainButtons"},
    },
    activityIncomeButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        caseEarnedIncome: { buttonName: "Earned", pageWithoutDotHtm: "CaseEarnedIncome", opensIn: "_self", parentId: "Earned Income", buttonId: "CaseEarnedIncomeSelf", rowTwoParent: "activityIncomeButtons"},
        caseUnearnedIncome: { buttonName: "Unearned", pageWithoutDotHtm: "CaseUnearnedIncome", opensIn: "_self", parentId: "Unearned Income", buttonId: "CaseUnearnedIncomeSelf", rowTwoParent: "activityIncomeButtons"},
        caseLumpSumIncome: { buttonName: "Lump Sum", pageWithoutDotHtm: "CaseLumpSum", opensIn: "_self", parentId: "Lump Sum", buttonId: "CaseLumpSumSelf", rowTwoParent: "activityIncomeButtons"},
        caseExpensesIncome: { buttonName: "Expenses", pageWithoutDotHtm: "CaseExpense", opensIn: "_self", parentId: "Expenses", buttonId: "CaseExpensesSelf", rowTwoParent: "activityIncomeButtons"},
        caseEducationActivity: { buttonName: "Education", pageWithoutDotHtm: "CaseEducationActivity", opensIn: "_self", parentId: "Education Activity", buttonId: "CaseEducationActivitySelf", rowTwoParent: "activityIncomeButtons"},
        caseEmploymentActivity: { buttonName: "Employment", pageWithoutDotHtm: "CaseEmploymentActivity", opensIn: "_self", parentId: "Employment Activity", buttonId: "CaseEmploymentActivitySelf", rowTwoParent: "activityIncomeButtons"},
        caseSupportActivity: { buttonName: "Support", pageWithoutDotHtm: "CaseSupportActivity", opensIn: "_self", parentId: "Support Activity", buttonId: "CaseSupportActivitySelf", rowTwoParent: "activityIncomeButtons"},
        caseJobSearchTracking: { buttonName: "Job Search", pageWithoutDotHtm: "CaseJobSearchTracking", opensIn: "_self", parentId: "Job Search Tracking", buttonId: "CaseJobSearchTrackingSelf", rowTwoParent: "activityIncomeButtons"},
    },
    caseButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        editSummary: { buttonName: "Edit Summary", pageWithoutDotHtm: "CaseEditSummary", opensIn: "_self", parentId: "Edit Summary", buttonId: "CaseEditSummarySelf", rowTwoParent: "caseButtons"},
        caseAddress: { buttonName: "Address", pageWithoutDotHtm: "CaseAddress", opensIn: "_self", parentId: "Case Address", buttonId: "CaseAddressSelf", rowTwoParent: "caseButtons"},
        caseAction: { buttonName: "Case Action", pageWithoutDotHtm: "CaseAction", opensIn: "_self", parentId: "Case Action", buttonId: "CaseActionSelf", rowTwoParent: "caseButtons"},
        caseFunding: { buttonName: "Funding Availability", pageWithoutDotHtm: "FundingAvailability", opensIn: "_self", parentId: "Funding Availability", buttonId: "FundingAvailabilitySelf", rowTwoParent: "caseButtons"},
        caseRedetermination: { buttonName: "Redetermination", pageWithoutDotHtm: "CaseRedetermination", opensIn: "_self", parentId: "Case Redetermination", buttonId: "CaseRedeterminationSelf", rowTwoParent: "caseButtons"},
        caseAppInfo: { buttonName: "Application Info", pageWithoutDotHtm: "ApplicationInformation", opensIn: "_self", parentId: "Case Application Info", buttonId: "CaseApplicationInfoSelf", rowTwoParent: "caseButtons"},
        caseReinstate: { buttonName: "Reinstate", pageWithoutDotHtm: "CaseReinstate", opensIn: "_self", parentId: "Reinstate", buttonId: "CaseReinstateSelf", rowTwoParent: "caseButtons"},
        caseLockStatus: { buttonName: "Lock Status", pageWithoutDotHtm: "CaseLockStatus", opensIn: "_self", parentId: "Case Lock Status", buttonId: "CaseLockStatus", rowTwoParent: "caseButtons"},
    },
    eligibilityButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        eligibilitySelection: { buttonName: "Selection", pageWithoutDotHtm: "CaseEligibilityResultSelection", opensIn: "_self", parentId: "Eligibility Results Selection", buttonId: "CaseEligibilityResultSelectionSelf", rowTwoParent: "eligibilityButtons"},
        eligibilityOverview: { buttonName: "Overview", pageWithoutDotHtm: "CaseEligibilityResultOverview", opensIn: "_self", parentId: "Results Overview", buttonId: "CaseEligibilityResultOverviewSelf", rowTwoParent: "eligibilityButtons"},
        eligibilityFamily: { buttonName: "Family", pageWithoutDotHtm: "CaseEligibilityResultFamily", opensIn: "_self", parentId: "Family Results", buttonId: "CaseEligibilityResultFamilySelf", rowTwoParent: "eligibilityButtons"},
        eligibilityPerson: { buttonName: "Person", pageWithoutDotHtm: "CaseEligibilityResultPerson", opensIn: "_self", parentId: "Person Results", buttonId: "CaseEligibilityResultPersonSelf", rowTwoParent: "eligibilityButtons"},
        eligibilityActivity: { buttonName: "Activity", pageWithoutDotHtm: "CaseEligibilityResultActivity", opensIn: "_self", parentId: "Activity Results", buttonId: "CaseEligibilityResultActivitySelf", rowTwoParent: "eligibilityButtons"},
        eligibilityFinancial: { buttonName: "Financial", pageWithoutDotHtm: "CaseEligibilityResultFinancial", opensIn: "_self", parentId: "Financial Results", buttonId: "CaseEligibilityResultFinancialSelf", rowTwoParent: "eligibilityButtons"},
        eligibilityApproval: { buttonName: "Approval", pageWithoutDotHtm: "CaseEligibilityResultApproval", opensIn: "_self", parentId: "Approval Results", buttonId: "CaseEligibilityResultApprovalSelf", rowTwoParent: "eligibilityButtons"},
        eligibilityCreateResults: { buttonName: "Create Eligibility Results", pageWithoutDotHtm: "CaseCreateEligibilityResults", opensIn: "_self", parentId: "Create Eligibility Results", buttonId: "CaseCreateEligibilityResultsSelf", rowTwoParent: "eligibilityButtons"},
    },
    saButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        saOverview: { buttonName: "Overview", pageWithoutDotHtm: "CaseServiceAuthorizationOverview", opensIn: "_self", parentId: "Service Authorization Overview", buttonId: "CaseServiceAuthorizationOverviewSelf", rowTwoParent: "saButtons"},
        saCopay: { buttonName: "Copay", pageWithoutDotHtm: "CaseCopayDistribution", opensIn: "_self", parentId: "Copay Distribution", buttonId: "CaseCopayDistributionSelf", rowTwoParent: "saButtons"},
        saApproval: { buttonName: "Approval", pageWithoutDotHtm: "CaseServiceAuthorizationApproval", opensIn: "_self", parentId: "Service Authorization Approval", buttonId: "CaseServiceAuthorizationApprovalSelf", rowTwoParent: "saButtons"},
        saCreateResults: { buttonName: "Create SA", pageWithoutDotHtm: "CaseCreateServiceAuthorizationResults", opensIn: "_self", parentId: "Create Service Authorization Results", buttonId: "CaseCreateServiceAuthorizationResultsSelf", rowTwoParent: "saButtons"},
    },
    csiButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        csiA: { buttonName: "CSIA", pageWithoutDotHtm: "CaseCSIA", opensIn: "_self", parentId: "CSIA", buttonId: "CSIAself", rowTwoParent: "csiButtons"},
        csiB: { buttonName: "CSIB", pageWithoutDotHtm: "CaseCSIB", opensIn: "_self", parentId: "CSIB", buttonId: "CSIBself", rowTwoParent: "csiButtons"},
        csiC: { buttonName: "CSIC", pageWithoutDotHtm: "CaseCSIC", opensIn: "_self", parentId: "CSIC", buttonId: "CSICself", rowTwoParent: "csiButtons"},
        csiD: { buttonName: "CSID", pageWithoutDotHtm: "CaseCSID", opensIn: "_self", parentId: "CSID", buttonId: "CSIDself", rowTwoParent: "csiButtons"},
    },
    noticesButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        caseNotices: { buttonName: "Notices", pageWithoutDotHtm: "CaseNotices", opensIn: "_self", parentId: "Case Notices", buttonId: "CaseNoticesSelf", rowTwoParent: "noticesButtons"},
        caseSpecialLetter: { buttonName: "Special Letter", pageWithoutDotHtm: "CaseSpecialLetter", opensIn: "_self", parentId: "Case Special Letter", buttonId: "CaseSpecialLetterSelf", rowTwoParent: "noticesButtons"},
        caseMemo: { buttonName: "Memo", pageWithoutDotHtm: "CaseMemo", opensIn: "_self", parentId: "Case Memo", buttonId: "CaseMemoSelf", rowTwoParent: "noticesButtons"},
    },
    billingButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        financialBilling: { buttonName: "Billing", pageWithoutDotHtm: "FinancialBilling", opensIn: "_self", parentId: "Billing", buttonId: "FinancialBillingSelf", rowTwoParent: "billingButtons"},
        financialBillingApproval: { buttonName: "Billing Approval", pageWithoutDotHtm: "FinancialBillingApproval", opensIn: "_self", parentId: "Billing Approval", buttonId: "FinancialBillingApprovalSelf", rowTwoParent: "billingButtons"},
        financialBillsList: { buttonName: "Bills List", pageWithoutDotHtm: "BillsList", opensIn: "_self", parentId: "Bills List", buttonId: "BillsListSelf", rowTwoParent: "billingButtons"},
        financialPayHistory: { buttonName: "Payment History", pageWithoutDotHtm: "CasePaymentHistory", opensIn: "_self", parentId: "Case Payment History", buttonId: "CasePaymentHistorySelf", rowTwoParent: "billingButtons"},
        financialAbsentDays: { buttonName: "Absent Days", pageWithoutDotHtm: "FinancialAbsentDayHolidayTracking", opensIn: "_self", parentId: "Tracking Absent Day Holiday", buttonId: "FinancialAbsentDayHolidayTrackingSelf", rowTwoParent: "billingButtons"},
        financialRegistrationFee: { buttonName: "Registration Fee Tracking", pageWithoutDotHtm: "FinancialBillingRegistrationFeeTracking", opensIn: "_self", parentId: "Tracking Registration Fee", buttonId: "FinancialBillingRegistrationFeeTrackingSelf", rowTwoParent: "billingButtons"},
        financialManualPayments: { buttonName: "Manual Payments", pageWithoutDotHtm: "FinancialManualPayment", opensIn: "_self", parentId: "Manual Payments", buttonId: "FinancialManualPaymentSelf", rowTwoParent: "billingButtons"},
    },
    providerButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        providerOverview: { buttonName: "Overview", pageWithoutDotHtm: "ProviderOverview", opensIn: "_self", parentId: "Provider Overview", buttonId: "ProviderOverviewSelf", rowTwoParent: "providerButtons"},
        providerNotes: { buttonName: "Notes", pageWithoutDotHtm: "ProviderNotes", opensIn: "_self", parentId: "Provider Notes", buttonId: "ProviderNotesSelf", rowTwoParent: "providerButtons"},
        providerInformation: { buttonName: "Info", pageWithoutDotHtm: "ProviderInformation", opensIn: "_self", parentId: "Provider Information", buttonId: "ProviderInformationSelf", rowTwoParent: "providerButtons"},
        providerAddress: { buttonName: "Address", pageWithoutDotHtm: "ProviderAddress", opensIn: "_self", parentId: "Provider Address", buttonId: "ProviderAddressSelf", rowTwoParent: "providerButtons"},
        providerParentAware: { buttonName: "Parent Aware", pageWithoutDotHtm: "ProviderParentAware", opensIn: "_self", parentId: "Parent Aware", buttonId: "ProviderParentAwareSelf", rowTwoParent: "providerButtons"},
        providerAccreditation: { buttonName: "Accred.", pageWithoutDotHtm: "ProviderAccreditation", opensIn: "_self", parentId: "Accreditation", buttonId: "ProviderAccreditationSelf", rowTwoParent: "providerButtons"},
        providerTraining: { buttonName: "Training", pageWithoutDotHtm: "ProviderTraining", opensIn: "_self", parentId: "Training", buttonId: "ProviderTrainingSelf", rowTwoParent: "providerButtons"},
        providerRates: { buttonName: "Rates", pageWithoutDotHtm: "ProviderRates", opensIn: "_self", parentId: "Rates", buttonId: "ProviderRatesSelf", rowTwoParent: "providerButtons"},
        providerLicense: { buttonName: "License", pageWithoutDotHtm: "ProviderLicense", opensIn: "_self", parentId: "License", buttonId: "ProviderLicenseSelf", rowTwoParent: "providerButtons"},
        providerAlias: { buttonName: "Alias", pageWithoutDotHtm: "ProviderAlias", opensIn: "_self", parentId: "Provider Alias", buttonId: "ProviderAliasSelf", rowTwoParent: "providerButtons"},
        providerBackground: { buttonName: "Background", pageWithoutDotHtm: "ProviderBackgroundStudy", opensIn: "_self", parentId: "Background Study", buttonId: "ProviderBackgroundStudySelf", rowTwoParent: "providerButtons"},
        providerRegistrationAndRenewal: { buttonName: "Registration", pageWithoutDotHtm: "ProviderRegistrationAndRenewal", opensIn: "_self", parentId: "Registration Renewal", buttonId: "ProviderRegistrationSelf", rowTwoParent: "providerButtons"},
        providerTaxInfo: { buttonName: "Tax", pageWithoutDotHtm: "ProviderTaxInfo", opensIn: "_self", parentId: "Tax Info", buttonId: "ProviderTaxInfoSelf", rowTwoParent: "providerButtons"},
        providerFraud: { buttonName: "Fraud", pageWithoutDotHtm: "ProviderFraud", opensIn: "_self", parentId: "Provider Fraud", buttonId: "ProviderFraudSelf", rowTwoParent: "providerButtons"},
        providerPaymentHistory: { buttonName: "Payments", pageWithoutDotHtm: "ProviderPaymentHistory", opensIn: "_self", parentId: "Provider Payment History", buttonId: "ProviderPaymentHistory", rowTwoParent: "providerButtons"},
    },
    providerNoticesButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        providerNotices: { buttonName: "Notices", pageWithoutDotHtm: "ProviderNotices", opensIn: "_self", parentId: "Provider Notices", buttonId: "ProviderNoticesSelf", rowTwoParent: "providerNoticesButtons"},
        providerSpecialLetter: { buttonName: "Special Letter", pageWithoutDotHtm: "ProviderSpecialLetter", opensIn: "_self", parentId: "Provider Special Letter", buttonId: "ProviderSpecialLetterSelf", rowTwoParent: "providerNoticesButtons"},
        providerMemo: { buttonName: "Memo", pageWithoutDotHtm: "ProviderMemo", opensIn: "_self", parentId: "Provider Memo", buttonId: "ProviderMemoSelf", rowTwoParent: "providerNoticesButtons"},
    },
    transferButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        caseTransfer: { buttonName: "Case Transfer", pageWithoutDotHtm: "CaseTransfer", opensIn: "_self", parentId: "Case Transfer", buttonId: "CaseTransferSelf", rowTwoParent: "transferButtons"},
        incomingTransfer: { buttonName: "Incoming", pageWithoutDotHtm: "ServicingAgencyIncomingTransfers", opensIn: "_blank", parentId: "Incoming Transfers", buttonId: "ServicingAgencyIncomingTransfersSelf", rowTwoParent: "transferButtons"},
        outgoingTransfer: { buttonName: "Outgoing", pageWithoutDotHtm: "ServicingAgencyOutgoingTransfers", opensIn: "_blank", parentId: "Outgoing Transfers", buttonId: "ServicingAgencyOutgoingTransfersSelf", rowTwoParent: "transferButtons"},
        financialClaimTransfer: { buttonName: "Claim Transfer", pageWithoutDotHtm: "FinancialClaimTransfer", opensIn: "_blank", parentId: "Claim Transfer", buttonId: "FinancialClaimTransferSelf", rowTwoParent: "transferButtons"},
    },
    claimsButtons: {//objectName: { buttonName: "Button Name", pageWithoutDotHtm: "PageNameWithoutDotHtm", opensIn: "_self or _blank", parentId: "Id of Parent", buttonId: "Id of Button", rowTwoParent: "RowTwoParent"},
        claimEstablishment: { buttonName: "Establishment", pageWithoutDotHtm: "FinancialClaimEstablishment", opensIn: "_blank", parentId: "Claim Establishment", buttonId: "FinancialClaimEstablishmentBlank", rowTwoParent: "claimsButtons"},
        claimDetails: { buttonName: "Details", pageWithoutDotHtm: "FinancialClaimMaintenanceAmountDetails", opensIn: "_self", parentId: "Maintenance Details", buttonId: "FinancialClaimMaintenanceAmountDetailsSelf", rowTwoParent: "claimsButtons"},
        claimSummary: { buttonName: "Summary", pageWithoutDotHtm: "FinancialClaimMaintenanceSummary", opensIn: "_self", parentId: "Maintenance Summary", buttonId: "FinancialClaimMaintenanceSummarySelf", rowTwoParent: "claimsButtons"},
        claimOverpaymentText: { buttonName: "Overpayment Text", pageWithoutDotHtm: "FinancialClaimNoticeOverpaymentText", opensIn: "_self", parentId: "Overpayment Text", buttonId: "FinancialClaimNoticeOverpaymentTextSelf", rowTwoParent: "claimsButtons"},
        claimNotes: { buttonName: "Notes", pageWithoutDotHtm: "FinancialClaimNotes", opensIn: "_self", parentId: "Claim Notes", buttonId: "FinancialClaimNotesSelf", rowTwoParent: "claimsButtons"},
        claimNotices: { buttonName: "Notices", pageWithoutDotHtm: "FinancialClaimNotices", opensIn: "_self", parentId: "Claim Notices History", buttonId: "FinancialClaimNoticesSelf", rowTwoParent: "claimsButtons"},
        claimMaintenanceCase: { buttonName: "Maint-Case", pageWithoutDotHtm: "FinancialClaimMaintenanceCase", opensIn: "_self", parentId: "Maintenance Case", buttonId: "FinancialClaimMaintenanceCaseSelf", rowTwoParent: "claimsButtons"},
        claimMaintenancePerson: { buttonName: "Maint-Person", pageWithoutDotHtm: "FinancialClaimMaintenancePerson", opensIn: "_self", parentId: "Maintenance Person", buttonId: "FinancialClaimMaintenancePersonSelf", rowTwoParent: "claimsButtons"},
        claimMaintenanceProvider: { buttonName: "Maint-Provider", pageWithoutDotHtm: "FinancialClaimMaintenanceProvider", opensIn: "_self", parentId: "Maintenance Provider", buttonId: "FinancialClaimMaintenanceProviderSelf", rowTwoParent: "claimsButtons"},
    }
}
for (let page in gotoButtonsObject) {
    let btnNavigation = document.createElement('button');
	btnNavigation.innerHTML = gotoButtonsObject[page].buttonText;
    btnNavigation.dataset.pageName = gotoButtonsObject[page].gotoPage
    if (viewMode) {
        btnNavigation.dataset.howToOpen = gotoButtonsObject[page].opensIn
    } else {
        btnNavigation.dataset.howToOpen = "_blank";//if edit mode, buttons won't go anywhere;
    };
	btnNavigation.dataset.pageLinkUsingId = gotoButtonsObject[page].parentId
    btnNavigation.id = gotoButtonsObject[page].buttonId
    btnNavigation.tabIndex = "-1"
	btnNavigation.type = 'button';
    if (gotoButtonsObject[page].buttonText == "+") {
        if (viewMode) { btnNavigation.className = 'custom-button custom-button__nav custom-button__nav__plus' }
        else if (!viewMode) { btnNavigation.className = 'custom-button custom-button__nav custom-button__nav__plus custom-button__disabled' }
    } else {
        if (viewMode) { btnNavigation.className = 'custom-button custom-button__nav' }
        else if (!viewMode) { btnNavigation.className = 'custom-button custom-button__nav custom-button__disabled' }
    };
	buttonDivOne.appendChild(btnNavigation);
};
buttonDivOne.onclick = function(event) {//sends the gotoButtons array value 4 to gotoPage
    if (event.target.closest('button')?.tagName?.toLowerCase() === 'button' && !(["FieldNotesNT", "FieldOverviewNT"]).includes(event.target.closest('button').id)) {
        gotoPage(event.target.closest('button').id)
    }
}
if (viewMode) {
    for (let group in mainRowButtons) {//Row 2 buttons (starts with Member)
        // if (!viewMode) { break };
        let btnNavigation = document.createElement('button');
        btnNavigation.innerHTML = mainRowButtons[group].buttonText;
        btnNavigation.id = mainRowButtons[group].buttonId;
        btnNavigation.type = 'button';
        btnNavigation.className = 'custom-button custom-button__nav';
        btnNavigation.tabIndex = "-1"
        buttonDivTwo.appendChild(btnNavigation);
    }
    buttonDivTwo.onclick = function(event) {//sends the mainRowButtons array value 1 to function_btnRowThree
        if (viewMode && event.target.tagName?.toLowerCase() === 'button') {
            $('#buttonPanelThree').empty()
            fillButtonRowThree(event.target.id)
            highlightPageAndCategory()
        }
    }
}
function highlightPageAndCategory() {
    try {
    let parentPage = findPageParent()
    if (parentPage[0] !== undefined) {
        $('#' + rowThreeButtonObject[parentPage[0]][parentPage[1]].rowTwoParent).add('#' + rowThreeButtonObject[parentPage[0]][parentPage[1]].buttonId).addClass('custom-button__nav__open-page')
        //return rowThreeButtonObject[parentPage[0]][parentPage[1]].rowTwoParent
    } else {
        $('#' + gotoButtonsObject[parentPage[1]].buttonId).addClass('custom-button__nav__open-page') } }
    catch(error) { console.log("highlightPageAndCategory", error) }
    finally { if ($('#eligibilityButtons.custom-button__nav__open-page, #eligibilityButtons.custom-button__nav__browsing').length && !reviewingEligibility) { $('#buttonPanelThree > button[id^="CaseEligibilityResult"]:not(#CaseEligibilityResultSelectionSelf)').addClass('custom-button__disabled') } }
}
function findPageParent() {
    for (let grouping in rowThreeButtonObject) {
        for (let page in rowThreeButtonObject[grouping]) {
            if (Object.hasOwn(rowThreeButtonObject[grouping][page], "pageWithoutDotHtm") && rowThreeButtonObject[grouping][page].pageWithoutDotHtm === thisPageName) {
                if (viewMode && $('#buttonPanelThree').children().length === 0) { fillButtonRowThree(rowThreeButtonObject[grouping][page].rowTwoParent) }
                return [grouping, page] }
            else {
                for (let page in gotoButtonsObject) {
                    if (Object.hasOwn(gotoButtonsObject[page], "gotoPage") && gotoButtonsObject[page].gotoPage === thisPageName) { return [undefined, page] }
} } } } };
$('#navButtonHouse').click(function(event) {
    if (event.target.tagName === 'BUTTON') {
        if (event.target.parentNode.id !== "buttonPanelThree") { $('.custom-button__nav__browsing').removeClass('custom-button__nav__browsing') }
        $('button#' + event.target.id + ':not(.custom-button__nav__open-page):not(#buttonPanelOneNTF):not([data-how-to-open="_blank"])').addClass("custom-button__nav__browsing")
        if ($('#eligibilityButtons.custom-button__nav__open-page, #eligibilityButtons.custom-button__nav__browsing').length && !reviewingEligibility) { $('#buttonPanelThree > button[id^="CaseEligibilityResult"]:not(#CaseEligibilityResultSelectionSelf)').addClass('custom-button__disabled') }
    }
})
//SECTION END Placing navigation buttons on the page

//SECTION START Activate row three from click or page load
function fillButtonRowThree(idOfRowTwoGroupButton) {
    for (let button in rowThreeButtonObject[idOfRowTwoGroupButton]) {
        let btnNavigation = document.createElement('button')
        btnNavigation.innerHTML = rowThreeButtonObject[idOfRowTwoGroupButton][button].buttonName
        btnNavigation.dataset.pageName = rowThreeButtonObject[idOfRowTwoGroupButton][button].pageWithoutDotHtm
        btnNavigation.dataset.howToOpen = rowThreeButtonObject[idOfRowTwoGroupButton][button].opensIn
        btnNavigation.dataset.pageLinkUsingId = rowThreeButtonObject[idOfRowTwoGroupButton][button].parentId
        btnNavigation.id = rowThreeButtonObject[idOfRowTwoGroupButton][button].buttonId
        btnNavigation.type = 'button'
        btnNavigation.tabIndex = "-1"
        if (rowThreeButtonObject[idOfRowTwoGroupButton][button].buttonName === "+") {
            btnNavigation.className = 'custom-button custom-button__nav custom-button__nav__plus'
        } else {
            btnNavigation.className = 'custom-button custom-button__nav'
        };
        buttonDivThree.appendChild(btnNavigation)
    }
};
highlightPageAndCategory()// to highlight on page load

buttonDivThree.onclick = function(event) {
    if (viewMode && event.target.tagName?.toLowerCase() === 'button') { gotoPage(event.target.id) }
}
//SECTION END Activate row three from click or page load

//SECTION START Using Id from button click to load href of associated element
function gotoPage(loadThisPage) {
    if (viewMode) {
        let loadThisPageNode = document.getElementById(`${loadThisPage}`);
        window.open(document.getElementById(loadThisPageNode.dataset.pageLinkUsingId).firstElementChild.href, loadThisPageNode.dataset.howToOpen);
    }
};
//SECTION END Using Id from button click to load href of associated element

//SECTION START Create text field and buttons for case number to open in new tab
function newTabFieldButtons() { //Text field to enter a case number to open in a new tab
    const openNotesOrOverview = [ // ["button innerHTML", "PageName", "ButtonID"]
        ["Notes", "CaseNotes", "FieldNotesNT"],
        ["Overview", "CaseOverview", "FieldOverviewNT"],
    ];
    //let buttonDivOne = document.getElementById("buttonPanelOne");
    let buttonDivOneNTF = document.getElementById("buttonPanelOneNTF")
    $('#buttonPanelOneNTF').append('<input id="newTabField" type="number" min="1" max="99999999" style="width: 10ch; height: 22px !important;" class="form-control"></input>')
    // let newTabFieldVar = document.createElement('input');
    // newTabFieldVar.id = 'newTabField'
    // newTabFieldVar.type = 'number'
    // newTabFieldVar.maxlength = '8'
    // newTabFieldVar.min = '1'
    // newTabFieldVar.max = '99999999'
    // newTabFieldVar.className = 'form-control'
    // newTabFieldVar.width = '10ch'
    // buttonDivOneNTF.appendChild(newTabFieldVar);
    for(let i = 0; i < openNotesOrOverview.length; i++){
        let btnNavigation = document.createElement('button');
        btnNavigation.type = 'button';
        btnNavigation.innerHTML = [openNotesOrOverview[i][0]]
        btnNavigation.dataset.pageName = [openNotesOrOverview[i][1]]
        btnNavigation.id = [openNotesOrOverview[i][2]];
        btnNavigation.className = 'custom-button custom-button__nav';
        buttonDivOneNTF.appendChild(btnNavigation);
    }
    buttonDivOneNTF.onclick = function(event) {
        if (event.target.closest('button')?.tagName?.toLowerCase() === 'button' && document.getElementById('newTabField').value.match(/\b\d{1,8}\b/)) {
            event.preventDefault()
            openCaseNumber(event.target.dataset.pageName, document.getElementById('newTabField').value)
        }
    }
    $('#newTabField').keydown(function(e) {
        e.stopImmediatePropagation()
        switch (e.key) {
            case 'n':
                e.preventDefault();
                window.open('/ChildCare/CaseNotes.htm?parm2=' + $('#newTabField').val(), '_blank');
                break
            case 'o':
            case 'Enter':
                e.preventDefault();
                window.open('/ChildCare/CaseOverview.htm?parm2=' + $('#newTabField').val(), '_blank');
                break
        }
    })
};
function openCaseNumber(pageName, enteredCaseNumber) {
    if (pageName == "CaseNotes") {
        window.open('/ChildCare/CaseNotes.htm?parm2=' + enteredCaseNumber, '_blank');
    } else {
        window.open('/ChildCare/CaseOverview.htm?parm2=' + enteredCaseNumber, '_blank');
    };
};
newTabFieldButtons();
!viewMode && ($('#buttonPanelTwo, #buttonPanelThree').hide());
//SECTION END Create text field and buttons for case number to open in new tab

/* DIVIDER ///////////////////////////////////////////////////////////////////////////// NAVIGATION BUTTONS SECTION END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */








/* DIVIDER //////////////////////////////////////////////////////////////////////////// PAGE SPECIFIC CHANGES SECTION START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */

// const allCapsWords = ["MN", "DHS", "WI", "HC", "FS", "MFIP", "DWP", "CCAP", "CCMF", "BSF", "TY", "MAXIS", "PRISM", "TSS", "SW", "SE", "NW", "NE", "APT", "STE", "USA", "PRI", "MEC2", "FEIN", "SSN", "MX", "CC", "SLC", "RSDI", "PMI", "SMI", "II", "III", "FL", "WB", /\d/];
const allCapsWords = ["MN", "DHS", "WI", "HC", "FS", "MFIP", "DWP", "CCAP", "CCMF", "BSF", "TY", "MAXIS", "PRISM", "TSS", "SW", "SE", "NW", "NE", "APT", "STE", "USA", "PRI", "MEC2", "FEIN", "SSN", "MX", "CC", "SLC", "RSDI", "PMI", "SMI", "II", "III", "FL", "WB"];
$('.dataTables_wrapper').parent('.form-group').removeClass('form-group')
//Seasonal items, just for fun
// let h1Icon = ('<span class="icon"> 🌻 </span>')
// $('h1').prepend(h1Icon).append(h1Icon).parents('.row');
$('#financialTableAndPanelData label[for="annualizedDateRangeStart"]~div.col-lg-1').text('to')
$('label[for="paymentEndDate"]').addClass('col-lg-1')
$('#eligibilityPeriodEnd').parent().css('display', 'flex').contents().eq(2).replaceWith('<div class="toLabel">to</div>')
$('form#caseEligibilityResultPersonDetail div>input.borderless').addClass('form-control')
$('label[for="extendedPeriodEnd"], label[for="leaveDetailExpires"], label[for="extendedEligibilityExpires"]').text("to")
let $toLabel = $('label.col-lg-1, div.col-lg-1').filter(function() { return $(this).text() === 'to' || $(this).text() === 'to:' || $(this).text() === 'to:' }).addClass('toLabel');//Making "to" between x to y elements smaller
$('.toLabel').prev().add($('.toLabel').next()).addClass('toNeighbors')
$('strong:contains("."):not(.modal-message):not(:last-child)').after('<br>')//Breaking up multiple Warning/Edit Summary messages.

//SECTION START Focusing the first desired element on pages
function eleFocus(ele) {
    $('.focusedElement').removeClass('focusedElement')
    $(document).ready(function() {
        setTimeout(function() {
            if (!viewMode && $('div:has(>errordiv)').length) { $('div:has(>errordiv)').prev().children('input, select').addClass('focusedElement') }
            else { $(ele).addClass('focusedElement') }
            $('.focusedElement').focus()
        }, 200);
    });
};
//SUB-SECTION START All pages - popup menu
let popupModal = $('#confirmPopup, #addChildConfirmPopup')
if (popupModal.length > 0) {
    $(popupModal).each(function () {
        let popupModalObserver = new MutationObserver(function(mutations) {
            for (const mutation of mutations) {
                if (mutation.attributeName === "style") {
                    const controllerModal = new AbortController()
                    if ($(mutation.target).filter('.in').length > 0) {
                        $(mutation.target).filter('.in').each(function() {
                            eleFocus($(mutation.target).find('#confirmButtons>input:first-child'))
                            window.addEventListener('keydown', function(event) {
                                switch (event.code) {
                                    case 'KeyO':
                                        event.preventDefault()
                                        $('.in #confirmButtons>input:eq(0)').click()
                                        break
                                    case 'KeyC':
                                        event.preventDefault()
                                        $('.in #confirmButtons>input:eq(1)').click()
                                        break
                                }
                            }, { signal: controllerModal.signal })
                            return false
                        })
                    } else { controllerModal.abort(); break }
                }
            }
        });
        popupModalObserver.observe(this, { attributes: true});
    });
}

if ($('#providerInput>#providerId').length && $('#providerInput>#providerId').val() === '') { eleFocus('#providerId') }
if ($('#caseId').length && $('#caseId').val() === '') { eleFocus('#caseId') }

//SUB-SECTION START Activity and Income tab pages
try {
if (window.location.href.indexOf("CaseEarnedIncome.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('#memberReferenceNumberNewMember').length > 0) { eleFocus('#memberReferenceNumberNewMember') }
    else if ($('#ceiVerification').val() === 'No Verification Provided') { eleFocus('#ceiVerification') }
    else { $('#ceiPrjAmount').select() } }
if (window.location.href.indexOf("CaseUnearnedIncome.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('#memberReferenceNumberNewMember').length > 0) { eleFocus('#memberReferenceNumberNewMember') }
    else if ($('#verification').val() === 'No Verification Provided') { eleFocus('#verification') }
    else { $('#incomeProjectionAmount').select() } }
if (window.location.href.indexOf("CaseExpense.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('#refPersonName').length > 0) { eleFocus('#refPersonName') }
    else if ($('#verificationType').val() === 'No Verification Provided') { eleFocus('#verificationType') }
    else { $('#projectionExpenseAmount').select() } }
if (window.location.href.indexOf("CaseLumpSum.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('#lumpSumVerification').val() === 'No Verification Provided') { eleFocus('#lumpSumVerification') }
    else { eleFocus('#memberReferenceNumberNewMember') } }
if (window.location.href.indexOf("CaseEligibilityResultActivity") < 0 && window.location.href.indexOf("Activity.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('strong:contains("Warning: This data will expire")').length > 0) { eleFocus('#saveDuplicateButton') }
    else if ($('#employmentActivityVerification, #verification').val() === 'No Verification Provided') { eleFocus('#employmentActivityVerification, #verification') }
    else if ($('#memberReferenceNumberNewMember, #pmiNbrNew').length) { eleFocus('#memberReferenceNumberNewMember, #pmiNbrNew'); $('#activityEnd, #employmentActivityEnd, #activityPeriodEnd, #leaveDetailExtendedEligibilityBegin, #leaveDetailRedeterminationDue').prop('tabindex','-1').addClass('tabindex-negative-one') }
    else { eleFocus('#activityEnd, #employmentActivityEnd, #activityPeriodEnd') }
}
if (window.location.href.indexOf("CaseJobSearchTracking.htm") > -1) {
    if (!viewMode) { eleFocus('#hoursUsed'); setTimeout($('#hoursUsed').select(),1) }
	else if (viewMode) { eleFocus('#editDuplicateButton') }	}

//SUB-SECTION START Member tab pages
if (window.location.href.indexOf("CaseMember.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('#next').length && $('#next').attr('disabled') !== "disabled") { eleFocus('#next') }
    // else { eleFocus('#memberReferenceNumber') } }
    else { eleFocus('#'+ firstEmptyId) } }
if (window.location.href.indexOf("CaseMemberII.htm") > -1) {
    setTimeout(function() {
        if (viewMode) {
            if ($('#new').attr('disabled') !== "disabled") { eleFocus('#newDuplicateButton') }
            else if ($('#edit').attr('disabled') !== "disabled") { eleFocus('#editDuplicateButton') }
        } else {
            if ($('#next').length && $('#next').attr('disabled') !== "disabled") { eleFocus('#next') }
            else if ($('#memberReferenceNumberNewMember').length < 1 && $('#next').length && $('#next').attr('disabled') === "disabled") { eleFocus('#newDuplicateButton') }
            else if ($('#memberReferenceNumberNewMember').length && $('#memberReferenceNumberNewMember').val().length === 0) { eleFocus('#memberReferenceNumberNewMember') }
            else if (!$('#actualDate').val() === '' && $('#memberCitizenshipVerification').val() === 'No Verification') { eleFocus('#memberCitizenshipVerification') }
            else if ($('#actualDate').val() === '') { eleFocus('#actualDate') } }
    }, 50) }
if (window.location.href.indexOf("CaseParent.htm") > -1) {
    if (!viewMode) {
        if ($('#parentVerification').val() === 'No Verification Provided') { eleFocus('#parentVerification') }
        else if ($('#parentReferenceNumberNewMember').length > 0) { eleFocus('#parentReferenceNumberNewMember') }
        else if ($('#parentReferenceNumberNewMember').length === 0 && $('#childReferenceNumberNewMember').length > 0) { eleFocus('#childReferenceNumberNewMember') }
        else { eleFocus('#cancel, #revert') }
    }
    else if (viewMode) {
        if ($('strong').text().indexOf('Each child must be listed') > -1) { $('table').click(function() { eleFocus('#addDuplicateButton') }) }
        if (!$('#add:disabled').length) { eleFocus('#addDuplicateButton') }
        else { eleFocus('#newDuplicateButton') } }
}
if (window.location.href.indexOf("CaseCSE.htm") > -1) {
    if (viewMode) {
        if ($('strong').text().indexOf('Each child must be listed') > -1) { $('table').click(function() { eleFocus('#addChildDuplicateButton') }) }
        if (!$('#addChild:disabled').length) { eleFocus('#addChildDuplicateButton') }
        else { eleFocus('#newDuplicateButton') } }
    else if ($('#csePriNewReferenceNumber').length === 0 && $('#cseChildrenGridChildNewReferenceNumber').length > 0) { eleFocus('#cseChildrenGridChildNewReferenceNumber') }
    else if ($('#csePriNewReferenceNumber').length > 0 && $('#csePriNewReferenceNumber').val() === '') { eleFocus('#csePriNewReferenceNumber') }
    else if ($('#actualDate').val() === '') { eleFocus('#actualDate') }
    else { eleFocus('#cseDetailsFormsCompleted') }
};
if (window.location.href.indexOf("CaseChildProvider.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('strong:contains("Warning")').length > 0) { eleFocus('#saveDuplicateButton') }
    else if ($('#memberReferenceNumberNewMember').val() === '') { eleFocus('#memberReferenceNumberNewMember') }
    else if (($('#primaryBeginDate').val() === '' && $('#secondaryBeginDate').val() === '') && $('#providerType').val() !== "Legal Non-licensed") { eleFocus('#primaryBeginDate') }
    else { $('#hoursOfCareAuthorized').select() }
}
if (window.location.href.indexOf("CaseSchool.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('#memberReferenceNumberNewMember').length) { eleFocus('#memberReferenceNumberNewMember') }
    else { eleFocus('#actualDate') } }
//SUB-SECTION END Member Tab pages

//SUB-SECTION START Case Tab pages
if (window.location.href.indexOf("CaseAddress.htm") > -1) {
    if ($('strong:contains("Warning")').length > 0 && !viewMode) { eleFocus('#saveDuplicateButton') }
    else {
        if (viewMode) { eleFocus('#editDuplicateButton') }
        else if (!viewMode) {
            if ($('#effectiveDate').attr('disabled') === "disabled") {//new app mode
                if ($('#previous').attr('disabled') === "disabled") { $('#effectiveDate').select() }//new app, editing
                else { eleFocus('#wrapUpDuplicateButton') } }//new app, not editing
            else //not new app, editing
                if ($('#subsidizedHousing').val() === '') { eleFocus('#subsidizedHousing') }
        }
    }
}
if (window.location.href.indexOf("CaseAction.htm") > -1) {
    if (viewMode) { $('#delete').prop('disabled') ? eleFocus ('#newDuplicateButton') : eleFocus('#deleteDuplicateButton') }
    else { eleFocus('#failHomeless') } }
if (window.location.href.indexOf("CaseRedetermination.htm") > -1) {
    if (viewMode) {
        if ($('#redeterminationStatus').val() === 'Updates Required') { eleFocus('#wrapUpDuplicateButton') }
        else { eleFocus('#editDuplicateButton') } }
    else if ($('strong:contains("Warning")').length > 0) { eleFocus('#saveDuplicateButton') }
    else { $('#redeterminationStatus').val('Updates Required');eleFocus('#receiveDate') } }
if (window.location.href.indexOf("FundingAvailability.htm") > -1) {
    if (viewMode) {
        if ($('#new').attr('disabled') === 'disabled') { eleFocus('#wrapUpDuplicateButton') }
        else { eleFocus('#newDuplicateButton') } }
    else if (!viewMode) {
        $('#basicSlidingFeeFundsAvailableCode').val('Y').addClass('prefilled-field')
        if (localStorage.getItem('processingApplication') !== null && localStorage.getItem('actualDate') !== null ) { eleFocus('#bSfEffectiveDate') }
        else { eleFocus('#saveDuplicateButton') } }
};
if (window.location.href.indexOf("CaseReinstate.htm") > -1) {
    if (viewMode) { eleFocus('#editDuplicateButton') }
    else { $('#reason').val().length > 0 ? eleFocus('#saveDuplicateButton') : eleFocus('#reason') } }
if (window.location.href.indexOf("CaseDisability.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#memberReferenceNumberNewMember') }
//SUB-SECTION END Case Tab pages

//SUB-SECTION START Notices Tab pages
if (window.location.href.indexOf("CaseMemo.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#memberComments') }
if (window.location.href.indexOf("CaseSpecialLetter.htm") > -1 || window.location.href.indexOf("ProviderSpecialLetter.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#status, #activity') }

//SUB-SECTION START Eligibility pages
if (window.location.href.indexOf("CaseEligibilityResultSelection.htm") > -1) { $('strong:contains("Background")').length ? eleFocus('#caseInputSubmit') : eleFocus('#selectDuplicateButton') }
if (window.location.href.indexOf("CaseEligibilityResultOverview.htm") > -1) { viewMode ? eleFocus('#nextDuplicateButton') : eleFocus('#type') }
if (window.location.href.indexOf("CaseEligibilityResultFamily.htm") > -1) { viewMode ? eleFocus('#nextDuplicateButton') : eleFocus('#overrideReason') }
if (window.location.href.indexOf("CaseEligibilityResultPerson.htm") > -1) { viewMode ? eleFocus('#nextDuplicateButton') : eleFocus('#overrideReason') }
if (window.location.href.indexOf("CaseEligibilityResultActivity.htm") > -1) { viewMode ? eleFocus('#nextDuplicateButton') : eleFocus('#overrideReason') }
if (window.location.href.indexOf("CaseEligibilityResultFinancial.htm") > -1) { viewMode ? eleFocus('#nextDuplicateButton') : eleFocus('#overrideReason') }
if (window.location.href.indexOf("CaseEligibilityResultApproval.htm") > -1) { viewMode ? eleFocus('#approveDuplicateButton') : eleFocus('#type') }
if (window.location.href.indexOf("CaseEligibilityResultApprovalPackage.htm") > -1) { viewMode ? eleFocus('#approveDuplicateButton') : eleFocus('#confirmDuplicateButton') }
//SUB-SECTION START Service Authorization pages
if (window.location.href.indexOf("CaseCreateServiceAuthorizationResults.htm") > -1 && viewMode) { eleFocus('#createDuplicateButton') }
if (window.location.href.indexOf("CaseServiceAuthorizationOverview.htm") > -1 && viewMode) { eleFocus('#CaseCopayDistributionSelf') }
if (window.location.href.indexOf("CaseCopayDistribution.htm") > -1 && viewMode) { eleFocus('#CaseServiceAuthorizationApprovalSelf') }//CaseCreateEligibilityResults
if (window.location.href.indexOf("CaseServiceAuthorizationApproval.htm") > -1 && viewMode) {
    $('table').click(function() { eleFocus('#approveDuplicateButton') })
    if ($('strong:contains("Background transaction in process.")').length > 0) {
        $('#approveDuplicateButton, #approve').attr('disabled','disabled').addClass('custom-form-button__disabled')
        eleFocus('#submit')
    }
    else if ( $('#approvalStatus').val() === "Unapproved" ) { eleFocus('#approveDuplicateButton') }
}
if (window.location.href.indexOf("CaseServiceAuthorizationApprovalPackage.htm") > -1) {
    eleFocus('#confirmDuplicateButton')
    // const observer = new MutationObserver(function() { eleFocus('#confirmButtons>#confirm') });
    // observer.observe(document.querySelector('#confirmPopup'), {attributeFilter: ['style']});
    $('table').click(function() { eleFocus('#confirmDuplicateButton') })
}

//SUB-SECTION START Transfer pages
if (window.location.href.indexOf("CaseTransfer.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#caseTransferFromType') }
if (window.location.href.indexOf("ServicingAgencyIncomingTransfers.htm") > -1 && !viewMode) { eleFocus('#workerIdTo') }

//SUB-SECTION START Billing Pages
if (window.location.href.indexOf("FinancialBilling.htm") > -1) { viewMode ? eleFocus('#editDuplicateButton') : eleFocus('#billedTimeType') }
if (window.location.href.indexOf("FinancialBillingApproval.htm") > -1) { viewMode ? eleFocus('#approveBillingDuplicateButton') : eleFocus('#remittanceComments') }
if (window.location.href.indexOf("FinancialBillingRegistrationFeeTracking.htm") > -1) { viewMode ? eleFocus('#addDuplicateButton') : eleFocus('#caseTransferFromType') }
if (window.location.href.indexOf("FinancialAbsentDayHolidayTracking.htm") > -1) { viewMode ? eleFocus('#addDuplicateButton') : eleFocus('#caseTransferFromType') }
if (window.location.href.indexOf("FinancialManualPayment.htm") > -1) { viewMode ? eleFocus('#mpProviderId') : eleFocus('#mpProviderId') }

//SUB-SECTION START Provider pages
// if (window.location.href.indexOf("ProviderRegistrationAndRenewal") > -1) { viewMode ? eleFocus('#editDuplicateButton') : eleFocus('#nextRenewalDue') }
if (window.location.href.indexOf("ProviderInformation.htm") > -1) { viewMode ? eleFocus('#editDuplicateButton') : eleFocus('#contactEmail') }
if (window.location.href.indexOf("ProviderAddress.htm") > -1) { viewMode ? eleFocus('#editDuplicateButton') : eleFocus('#mailingSiteHomeStreet1') }
if (window.location.href.indexOf("ProviderAccreditation.htm") > -1) { viewMode ? eleFocus('#editDuplicateButton') : eleFocus('#accreditationType') }
if (window.location.href.indexOf("ProviderLicense.htm") > -1) { viewMode ? eleFocus('#editDuplicateButton') : eleFocus('#licenseNumber') }
if (window.location.href.indexOf("ProviderAlias.htm") > -1) { viewMode ? eleFocus('#addBusiness') : eleFocus('#name') }
if (window.location.href.indexOf("ProviderTaxInfo.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#taxType') }

//SUB-SECTION START Non-collection pages
if (window.location.href.indexOf("/AlertWorkerCreatedAlert.htm") > -1) { eleFocus('#delayNextMonth') }
if (window.location.href.indexOf("Alerts.htm?pageUrl=AlertWorkerCreatedAlert.htm") > -1) { eleFocus('') }
if (window.location.href.indexOf("CaseNotes.htm") > -1) {
    if (viewMode) { window.onload(function() { $('#caseNotesTable>tbody>tr:eq(0)').click(); eleFocus('#newDuplicateButton') }) }
        else { $('#noteMemberReferenceNumber').focus(function() { setTimeout(document.querySelector('#save').scrollIntoView({ behavior: 'smooth', block: 'end' }), 0) })
        eleFocus('#noteMemberReferenceNumber') }
};
if (window.location.href.indexOf("CaseWrapUp.htm") > -1) { eleFocus('#doneDuplicateButton') }
if (window.location.href.indexOf("CaseApplicationInitiation.htm") > -1) { if (viewMode) { eleFocus('#newDuplicateButton') } else { $('#pmiNumber').attr('disabled') === 'disabled' ? eleFocus('#next') : eleFocus('#pmiNumber') } };
if (window.location.href.indexOf("CaseReapplicationAddCcap.htm") > -1) {
    if ($('#next').attr('disabled') === 'disabled') {
        let unchecked = $('#countiesTable td>input.form-check-input').filter(function() { return $(this).prop('checked') === false }).addClass('required-field')
        if (unchecked) { eleFocus('#' + unchecked[0].id) }
        else { eleFocus('#addccap') } }
    else { eleFocus('#next') }
}
if (window.location.href.indexOf("CaseCSIA.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#actualDate') }
if (window.location.href.indexOf("ClientSearch.htm") > -1) { $('#clientSearchTable>tbody>tr>td.dataTables_empty').length === 1 && eleFocus('#ssnReq') }
//
if ($('strong:contains("Actual Date is missing")').length) {
    eleFocus('#actualDate')
    if (new Date($('#selectPeriod').val().slice(0, 10)) < new Date() && new Date() < new Date($('#selectPeriod').val().slice(10))) { $('#actualDate').val(new Date().toLocaleDateString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" }) )}
}
//SECTION END Focusing the first desired element on pages
} catch(error) { console.log("eleFocus section", error) }
//SECTION START Page Specific Changes
$('#footer_links>a[href="https://bi.dhs.state.mn.us/BOE/BI"]').text('BOBI').prop('href', 'https://bobi.dhs.state.mn.us/BOE/BI')
$('#footer_links>a[href="https://www.dhs.state.mn.us/main/idcplg?IdcService=GET_DYNAMIC_CONVERSION&RevisionSelectionMethod=LatestReleased&dDocName=MECC-USER-MANUAL-HOME"]')
    .text('New User Manual')
    .after('&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://www.dhs.state.mn.us/main/idcplg?IdcService=GET_DYNAMIC_CONVERSION&RevisionSelectionMethod=LatestReleased&dDocName=dhs16_139409" target="_blank">Old User Manual</a>')
    .attr('href', 'https://www.dhs.state.mn.us/main/idcplg?IdcService=GET_DYNAMIC_CONVERSION&RevisionSelectionMethod=LatestReleased&dDocName=MECC-0001')
$('#footer_links>#contactInformation')
    .after('&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://owa.dhssir.cty.dhs.state.mn.us/csedforms/ccforms/TSS_PMI_Merge_Request.aspx" target="_blank">PMI Merge</a>')
    .after('&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://owa.dhssir.cty.dhs.state.mn.us/csedforms/MMR/TSS_General_Request.asp" target="_blank">Help Desk</a>')
    .after('&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://owa.dhssir.cty.dhs.state.mn.us/owa/" target="_blank">SIR Mail</a>')
    .after('&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://policyquest.dhs.state.mn.us/" target="_blank">Policy Quest</a>')

//SECTION START Fix issue caused by giving .form-group the display: flex property
$('.visible-sm').remove()
if (window.location.href.indexOf("ClientSearch.htm") > -1 || window.location.href.indexOf("/Provider") > -1 || window.location.href.indexOf("/getProvider") > -1 || window.location.href.indexOf("CaseOverview.htm") > -1 ) {
    $('.visible-lg>label, .visible-lg>.col-lg-4, .visible-lg>.col-lg-2').unwrap()
}

//SECTION START Active caseload numbers
if (window.location.href.indexOf("ActiveCaseList.htm") > -1) {
    $('h5').append(" " + $('td:contains("Active")').length + " active. " + ($('td:contains("Suspended")').length + $('td:contains("Temporarily Ineligible")').length) + " suspended/TI.")

    function getResidenceCity(caseNumber, ele) {
        $.get('/ChildCare/CaseAddress.htm?parm2=' + caseNumber + '&parm3=1226202201082023', function(result) {
            let dataObject = result.slice(result.indexOf('\"residenceCity\"')+17);
            dataObject = dataObject.slice(0, dataObject.indexOf(",") -1);
            $(ele).parent().next().append(" - ").append(dataObject);
        });
    };

    $('#caseResultsData').after('<div id="locationCopyButton" class="custom-button__floating form-button">Copy Location Data for Excel</div>')
    $('#caseResultsData').after('<div id="getLocationDataButton" class="custom-button__floating form-button">Get Location Data</div>')
    $('#locationCopyButton').click(function() {
        const copiedData = [];
        $('tbody a').each(function() {
            const newRow = [$(this).html(), $(this).parent().next().contents().eq(0).text(), $(this).parent().next().contents().eq(2).text()]
            copiedData.push(newRow);
        });
        const excelData = copiedData
        .map(lines => lines.join("\t"))
        .join("\n");
        navigator.clipboard.writeText(excelData);
    });
    $('#getLocationDataButton').click(function() {
        $('tbody a').each(function() {
            getResidenceCity($(this).html(), $(this));
        });
    });
};
//SECTION END Active caseload numbers

//SECTION START Fix the Name: row alignment
if (window.location.href.indexOf("ctiveCaseList.htm") > 0) {
    $('label[for="nameDisplay"]').unwrap()
}
//SECTION END Fix the Name: row alignment

////// ALERTS.htm start ////// ("Alerts.htm")
if (window.location.href.indexOf("/Alerts.htm") > -1) {

    //SUB-SECTION Moving Worker ID and Worker Name to the section they are displayed in
    $('#inputWorkerId').parent().attr('id','workerIdRow')
    $('#workerName').parent().attr('id','workerNameRow')
    $('#workerIdRow, #workerNameRow').prependTo($('#caseOrProviderAlertsTable_wrapper').parent())
    //
    setTimeout(function() {
        if ($('#alertTotal').val() > 0 && $('#caseOrProviderAlertsTable td.dataTables_empty').length) { $('#alertInputSubmit').click() }
    }, 300)
    $('#groupId').closest('.form-group').find('input').prop('disabled', 'disabled')
    $('#deleteInProgress').remove() //spinning gif
    $('#delete').after($('#new'))
    // $('#new').prop('style', 'margin-left: 0px !important;').after('<details><summary>Bug:</summary><span>Creating an alert when <strong>any</strong> case has 0 alerts will cause the Alerts page to display no alerts after saving the worker alert.</span></details>').parent().css('display','flex').css('gap','10px')
    $('#new').prop('style', 'margin-left: 0px !important;').parent().css('display','flex').css('gap','10px')
    // $('#delete').parent().contents().filter(function() { return this.nodeType === 3}).remove()
    $('[id^="workerCreatedAlertActionsArea"]:eq(1)').remove()
    //SUB-SECTION START Superfluous delete button
    $('label[for="message"]').parent('.row').remove();
    $('#alertsPanelData').css('overflow','visible');
    $('#alertTotal').after('<button type="button" class="form-button custom-form-button centered-text" id="deleteTop">Delete Alert</button>')
    $('#deleteTop').click(function() { $('#delete').click()});

    //SECTION START Delete all alerts of current name onclick
    let oCaseDetails = {}
    let vNumberToDelete
    let vCaseName
    let vCaseOrProvider
    let vCaseNumberOrProviderId
    // function fCaseNumberOrProviderId(tableText) {
    //     switch (tableText) {
    //         case "case":
    //             return "#caseNumber"
    //             break
    //         case "provider":
    //             return "#providerId"
    //             break
    //     }
    // }
    function whatAlertType() {
        switch ($('#caseOrProviderAlertsTable>tbody>tr.selected>td:eq(0)').html().toLowerCase()) {
            case "case":
                return { page: "CaseNotes", type: "Case", number: $('#caseNumber').val(), name: $('') }
                break
            case "provider":
                return { page: "ProviderNotes", type: "Provider", number: $('#providerId').val() }
                break
            default:
                return "whatAlertType; no matches found"
        }
    }
    $('#deleteTop').after('<button type="button" class="form-button custom-form-button centered-text doNotDupe" id="deleteAll" title="Delete All" value="Delete All">Delete All</button>');
    $('h4:contains("Case/Provider List")').after('<h4 style="float: right; display:inline-flex color: #003865; font-size: 1.2em; font-weight: bold;" id="alertMessage"></h4>');
    $('#deleteAll').val('Delete All').on("click", function() {
        // vCaseOrProvider = $('#caseOrProviderAlertsTable>tbody>tr.selected>td:eq(0)').html().toLowerCase()//case or provider
        vCaseOrProvider = whatAlertType().type
        // if (!["case", "provider"].includes(vCaseOrProvider.toLowerCase())) { return }
        if (!["case", "provider"].includes(vCaseOrProvider.toLowerCase())) { return }
        // vCaseNumberOrProviderId = fCaseNumberOrProviderId(vCaseOrProvider)//#caseNumber or #providerID
        // vNumberToDelete = $( vCaseNumberOrProviderId ).val()//value on page
        vNumberToDelete = whatAlertType().number
        oCaseDetails.numberToDelete = whatAlertType().number
        oCaseDetails.name = whatAlertType().name
        vCaseName = $('#groupName').val()//name on page
        fDoDeleteAll()
    });
    const observerDelete = new MutationObserver(e => {
        console.log('Mutation observerDelete called')
        fDoDeleteAll()
    })
    observerDelete.observe(document.querySelector('#delete'), {attributeFilter: ['value']})
    function fDoDeleteAll() {//Test worker ID PWSCSP9
        console.log('fDoDeleteAll called')
        if ($('#delete').val() !== "Please wait") {
            // if ($('#delete').val() === "Delete Alert" && vNumberToDelete === $( vCaseNumberOrProviderId ).val() && vNumberToDelete === $('#groupId').val() && $('#caseOrProviderAlertsTable td:contains("' + vCaseName + '")').nextAll().eq(1).html() > 0) {
            if ($('#delete').val() === "Delete Alert" && vNumberToDelete === whatAlertType().number && vNumberToDelete === $('#groupId').val() && $('#caseOrProviderAlertsTable td:contains("' + vCaseName + '")').nextAll().eq(1).html() > 0) {
                $('#delete').click();
            } else {
                fDoDeleteAllCheck()
            }
        }
    }
    function fDoDeleteAllCheck() {
        console.log('fDoDeleteAllCheck called')
        if ($('#caseOrProviderAlertsTable td:contains(' + vCaseName + ')').nextAll().eq(1).html() > 0) {
            $('#caseOrProviderAlertsTable td:contains(' + vCaseName + ')').parent('tr').click()
            console.log('fDoDeleteAllCheck calling fDoDeleteAll')
            return fDoDeleteAll()
        }
        if ($('#caseOrProviderAlertsTable td:contains("' + vCaseName + '")').nextAll().eq(1).html() < 1) {//Any alerts to delete?
            $('#alertMessage').text('Delete All ended. All alerts deleted from ' + vCaseOrProvider + ' ' + vNumberToDelete + '.');
        } else if (vNumberToDelete !== $('#caseNumber, #providerId').val()) {
            if (!$('#caseOrProviderAlertsTable td:contains(' + vCaseName + ')')) {
                switch(vCaseOrProvider) {
                    case "case":
                        $('#alertMessage').text('Case number not present.')
                        break
                    case "provider":
                        $('#alertMessage').text('Provider ID not present.')
                        break
                    default:
                        break
                }
            };
        };
    };
    //SECTION END Delete all alerts of current name onclick

    //SECTION START Do action based on Alert Type
    function fGetCaseParameters() {
        let parameter2alerts = document.getElementById('caseOrProviderAlertsTable').getElementsByClassName('selected')[0].childNodes[2].innerText
        let parameter3alerts = document.getElementById('periodBeginDate').value.replace(/\//g, '') + document.getElementById('periodEndDate').value.replace(/\//g, '')
        return '?parm2=' + parameter2alerts + '&parm3=' + parameter3alerts
    }
    function fGetProviderParameters() {
        let parameter2alerts = document.getElementById('caseOrProviderAlertsTable').getElementsByClassName('selected')[0].childNodes[2].innerText
        return '?providerId=' + parameter2alerts
    }

    const aCaseCategoryButtons = [
        ["Eligibility", "CaseEligibilityResultSelection"],
        ["SA:O", "CaseServiceAuthorizationOverview"],
        ["SA:A", "CaseServiceAuthorizationApproval"],
        ["Provider", "CaseChildProvider"],
        ["Address", "CaseAddress"],
        ["Members", "CaseMember"],
        ["Notes", "CaseNotes"],
        ["Overview", "CaseOverview"],
        ["Edits", "CaseEditSummary"],
        ["Pages", "CasePageSummary"],
        ["Notices", "CaseNotices"],
        ["CSI", "CaseCSIA"],
        /*
        ["", ""],
        */
    ]
    const aProviderCategoryButtons = [
        ["Overview", "ProviderOverview"],
        ["Registration", "ProviderRegistrationAndRenewal"],
        ["Address", "ProviderAddress"],
        ["Info", "ProviderInformation"],
        ["Alias", "ProviderAlias"],
        ["Rates", "ProviderRates"],
        ["Notices", "ProviderNotices"],
        /*
        ["", ""],
        */
    ]
    $('#delete').parent().append('<div id="baseCategoryButtonsDiv" class="form-group-no-margins"><div id="caseCategoriesButtonsDiv" class="collapse form-group-button-children"></div><div id="providerCategoriesButtonsDiv" class="collapse form-group-button-children"></div></div>')
    aCaseCategoryButtons.forEach(function(i) {
        $('#caseCategoriesButtonsDiv').append('<button type="button" id='+ [i[1]] +'>' + [i[0]] + '</button>')
    })
    aProviderCategoryButtons.forEach(function(i) {
        $('#providerCategoriesButtonsDiv').append('<button type="button" id='+ [i[1]] +'>' + [i[0]] + '</button>')
    })
    function fBaseCategoryButtons() {
        switch ($('#caseOrProviderAlertsTable>tbody>.selected>td:eq(0)').text()) {
            case "Case":
                $('#providerCategoriesButtonsDiv').addClass('collapse')
                $('#caseCategoriesButtonsDiv').removeClass('collapse')
                break
            case "Provider":
                $('#caseCategoriesButtonsDiv').addClass('collapse')
                $('#providerCategoriesButtonsDiv').removeClass('collapse')
                break
            default:
                $('#caseCategoriesButtonsDiv').addClass('collapse')
                $('#providerCategoriesButtonsDiv').addClass('collapse')
                break
        }
    }
    $('table').click(function() { fBaseCategoryButtons() })
    $('#baseCategoryButtonsDiv').click(function(e) { if (e.target.tagName === "BUTTON") {
        switch ($('#caseOrProviderAlertsTable>tbody>.selected>td:eq(0)').text()) {
            case "Case":
                window.open('/ChildCare/' + e.target.id + '.htm' + fGetCaseParameters(), '_blank')
                break
            case "Provider":
                window.open('/ChildCare/' + e.target.id + '.htm' + fGetProviderParameters(), '_blank')
                break
            default:
                break
        }
    } })
    fBaseCategoryButtons()

        //SUBSECTION START Buttons by Alert Details
    $('h4:contains("Alert Detail")').width('13%').attr('id','h4AlertDetail').css('display','inline-flex');
    $('#h4AlertDetail').after('<div id="alertButtonHouse" style="display: inline-flex;" class="button-row__nav"></div>');
    let anchorPoint = document.getElementById('alertButtonHouse');
    let btnNavigation = document.createElement('button');
    btnNavigation.type = 'button';
    btnNavigation.innerHTML = "Select an alert";
    btnNavigation.id = "doTheThing";
    btnNavigation.className = 'custom-button custom-button__floating';
    // anchorPoint.appendChild(btnNavigation);
    btnNavigation.addEventListener("click", function() { fGoDoTheThing()});
    let clickedAlert = $('#alertTable');
    $('#doTheThing').text($('#alertTable .selected').children().eq(0).text());
    $('#caseOrProviderAlertsTable, #alertTable').click(function(event) {
        fChangeButtonText();
    });
    waitForElmValue('#alertTable > tbody > tr > td').then((elm) => {
        fChangeButtonText()
        fGetCaseParameters()
    });
        //SUBSECTION END Buttons by Alert Details


    function fChangeButtonText() {
        // let alertType = $('#alertTable .selected').children().eq(0).text()
        // if (alertType === '') {
        //     document.getElementById('doTheThing').innerHTML = 'Click on Alert'
        // } else if (alertType === 'Eligibility') {
        //     document.getElementById('doTheThing').innerHTML = alertType
        // } else {
        //     document.getElementById('doTheThing').innerHTML = alertType + ' is not yet supported'
        // }
        // switch ( $('#alertTable .selected').children().eq(0).text() ) {
        //     case "eligibility":
        //         break
        //     case "":
        //         break
        // }
        let vAlertCategoryLowerCase = $('#alertTable .selected').children().eq(0).text().toLowerCase().replace(" ", "")
    };
    const oAlertCategoriesLowerCase = {//For smart navigation, and AutoCaseNotes
        template: {
            buttonText: "",
            explanation: {
                1: { textIncludes: "", page: "", caseNoteTitle: "" }
            }
        },
        eligibility: {
            buttonText: "",
            explanation: {
                1: { textIncludes: "", page: "", caseNoteTitle: "" }
            }
        },
        serviceauthorization: {
            buttonText: "",
            explanation: {
                1: { textIncludes: "", page: "", caseNoteTitle: "" }
            }
        },
    };
    /*function findPageParent() {
    for (let category in alertCategories) {
        for (let page in rowThreeButtonObject[grouping]) {
            if (Object.hasOwn(rowThreeButtonObject[grouping][page], "pageWithoutDotHtm") && rowThreeButtonObject[grouping][page].pageWithoutDotHtm === thisPageName) {
                if (viewMode && $('#buttonPanelThree').children().length === 0) { fillButtonRowThree(rowThreeButtonObject[grouping][page].rowTwoParent) }
                return [grouping, page] }
            else {
                for (let page in gotoButtonsObject) {
                    if (Object.hasOwn(gotoButtonsObject[page], "gotoPage") && gotoButtonsObject[page].gotoPage === thisPageName) { return [undefined, page] }
    } } } } };
    */
    function fGoDoTheThing() {
        let messageText = document.getElementById('message');//alertTable
        if (messageText.value === "Unapproved results have been created and need review.") {//eventually replace this with... startsWith? Spreadsheet in Documents has alerts list.
            window.open('/ChildCare/CaseEligibilityResultSelection.htm' + fGetCaseParameters(), '_blank')
        };
    };
    //SECTION END Do action based on Alert Type

    //SECTION START Copy Alert text, navigate to Case Notes
    function fCopyExplanation() {
        let copyText = document.getElementById("message").value//.replaceAll('\n', ' ');
        navigator.clipboard
            .writeText(copyText)
            .then(() => {
            localStorage.setItem('mech2.caseNoteText', copyText);
            snackBar('Copied! <br>' + copyText/*.replace(/(?:\r\n|\r|\n)/g, '<br>')*/);
            window.open('/ChildCare/CaseNotes.htm' + fGetCaseParameters(), '_blank')//fGetProviderParameters()
        })
            .catch((error) => {
            console.log("Copy Alert Detail explanation error", error);
        });
    };
    $('#alertButtonHouse').prepend('<button type="button" class="custom-button custom-button__floating" id="copyAlertButton">Copy, goto Notes</button>');
    $('#copyAlertButton').click(function() { fCopyExplanation()});
    //$('#alertButtonHouse').prepend('<button type="button" class="custom-button custom-button__floating" id="autoCaseNote">Automated Case Note</button>');
    //$('#autoCaseNote').click(function() { fAutoCaseNote()});
    //SECTION END Copy Alert text, navigate to Case Notes

    //SECTION START Copy alert text to Case Notes via iframe
    function fAutoCaseNote() {//whatAlertType().number
        let copyText = document.getElementById("message").value.replaceAll('/n', ' ');
        $('div.panel:has(div#alertButtonHouse)').after('<div class="panel panel-default panel-box-format"><iframe id="notesIframe" name="notesIframe" height="300px" width="100%"></iframe></div>')
        addEventListener('storage', function(key, newValue) {
            // if (event.key === 'MECH2.doClose' && event.newValue === 'didClose') { fAutoCaseNoteSwitch() }
            switch (event.key) {
                case "MECH2.caseNotesViewLoaded": //case "MECH.autoNoteText":
                    break
                case "MECH2.caseNotesEditLoaded": //case "MECH.autoNoteStatus":
                    break
            }
        })
        let vDetailToNotes = [$('#message').val(), $( vCaseNumberOrProviderId ).val()]
    }
    function fAutoCaseNoteSwitch() {}
    //SECTION END Copy alert text to Case Notes via iframe
};
    ////// ALERTS.htm end //////
if (window.location.href.indexOf("/Alerts.htm") < 0) { (localStorage.setItem('MECH2.autoCaseNote','no')) }

    //SECTION START Add delay to approving MFIP close and TY/BSF open
if (window.location.href.indexOf("/AlertWorkerCreatedAlert.htm") > -1) {// && window.location.href.indexOf("pageUrl") < 0
    if ($('#providerAlertDisplay').css('display') === "none") {//Exclude provider workers
        let delayNextMonth = new Date(new Date().setMonth(new Date().getMonth() +1, 1)).toLocaleDateString('en-US', {year: "numeric", month: "2-digit", day: "2-digit", });
        let delayMonthAfter = new Date(new Date().setMonth(new Date().getMonth() +2, 1)).toLocaleDateString('en-US', {year: "numeric", month: "2-digit", day: "2-digit", });
        $('#message').parent().after('<div class="col-lg-3"><button type="button" class="custom-button__nodisable custom-button__floating" style="margin-bottom: 3px;" id="delayNextMonth" tabindex="0">MFIP Close Delay Alert: ' + delayNextMonth + '</button><button type="button" class="custom-button__nodisable custom-button__floating" id="delayMonthAfter" tabindex="0">MFIP Close Delay Alert: ' + delayMonthAfter + '</button></div>')
        $('#delayNextMonth').click(function(e) {
            // e.preventDefault()
            $('#message').val("Approve new results (BSF/TY/extended eligibility) if MFIP not reopened.");
            $('#effectiveDate').val(delayNextMonth);
            $('#save').click();
        });
        $('#delayMonthAfter').click(function(e) {
            // e.preventDefault()
            $('#message').val("Approve new results (BSF/TY/extended eligibility) if MFIP not reopened.");
            $('#effectiveDate').val(delayMonthAfter);
            $('#save').click();
        });
    }
};
//SECTION END Add date delay to approving MFIP close and TY/BSF open

//
if (window.location.href.indexOf("BillsList.htm") > -1) {
    $('.col-lg-12[align="center"]').attr('class','');
};
//

//SECTION START Fix button placement on CaseAction
if (window.location.href.indexOf("CaseAction.htm") > -1) {
    $('#caseAction>#caseData>.panel').css('width','66%').removeClass('col-lg-8 col-md-8')
    //$('input[type="checkbox"]:not(:eq(0))').before('<br>');
};
//SECTION END Fix button placement on CaseAction

//SECTION START Copy client mail to address to clipboard on Case Address page
if (window.location.href.indexOf("CaseAddress.htm") > -1) {
    let $mailingFields = $('h4:contains("Mailing Address")').siblings().find('input, select').add($('#residenceStreet2')).not($('#mailingZipCodePlus4'))
    function firstNameSplitter(name) {
        if (name.split(",")[1].split(" ").length > 3) {
            return name.split(",")[1].split(" ")[1] + " " + name.split(",")[1].split(" ")[2]
        } else {
            return name.split(",")[1].split(" ")[1]
        };
    };
    $('#effectiveDate').parent().after('<div class="custom-button custom-button__floating centered-text flex-right" id="copyMailing">Copy Mail Address</div>');
    $('#copyMailing').click(function() {
        let caseNameRaw = $('label[for="caseHeaderName"]').parent().contents().eq(2).text();
        let lastName = caseNameRaw.split(",")[0];
        let firstName = firstNameSplitter(caseNameRaw)
        let caseNameSpaces = caseNameRaw.split(" ");
        if ($('#mailingStreet1').val() !== "") {
            let state = swapStateNameAndAcronym(document.getElementById('mailingStateProvince').value)
            let copyText = firstName + " " + lastName + "\n" + document.getElementById('mailingStreet1').value + " " + document.getElementById('mailingStreet2').value + "\n" + document.getElementById('mailingCity').value + ", " + state + " " + document.getElementById('mailingZipCode').value
            navigator.clipboard.writeText(copyText)
            snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        } else {
            let state = swapStateNameAndAcronym(document.getElementById('residenceStateProvince').value)
            let copyText = firstName + " " + lastName + "\n" + document.getElementById('residenceStreet1').value + " " + document.getElementById('residenceStreet2').value + "\n" + document.getElementById('residenceCity').value + ", " + state + " " + document.getElementById('residenceZipCode').value
            navigator.clipboard.writeText(copyText)
            snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        };
    });
//SECTION END Copy client mail to address to clipboard on Case Address page

//SECTION START CaseAddress changes and fixes
    $('#phone1').parents('.panel-box-format').find('div>label.col-lg-2').removeClass('col-lg-2').addClass('col-lg-3');
    $('#phone1').parents('.panel-box-format').find('div.col-lg-1').remove();
    $('label.col-md-2').addClass('col-md-3').removeClass('col-md-2');//Fixes wrongly sized columns for several labels on Case Address
    $('#mailingStreet1').val() == '' && !$('#edit').prop('disabled') && (checkMailingAddress())//Shrinks mailing address if blank
    $('#providerData :is(input, select)').filter(function() { return this.value === '' }).closest('.form-group').addClass('collapse')
    if (viewMode) {
        $('#phone2, #phone3, #contactNotes, #email').filter(function() { return this.value === '' }).closest('.form-group').addClass('collapse')
    };
    function checkMailingAddress() {
        // $mailingFields.parents('.form-group').removeClass('collapse')
        $mailingFields.filter(function() { return this.value === '' }).closest('.form-group').addClass('collapse')
        $mailingFields.filter(function() { return this.value !== '' }).closest('.form-group').removeClass('collapse')
    };
    $('#caseAddressTable').click(function() { checkMailingAddress() });
    checkMailingAddress()
};
//SECTION END CaseAddress changes and fixes

if (window.location.href.indexOf("CaseApplicationInitiation.htm") > -1) {
    //pmiNumber MutationObserver for value, tabindex of clientSearch = -1
    $('#retroApplicationDate').parents('.form-group').addClass('collapse');
    let timer = null
    async function fAutoDateRange() {
        console.log('success')
    }
    $('#applicationReceivedDate').change(function() { fAutoDateRange() })
    $('#applicationReceivedDate').keyup(async function(e) {
        if (timer) { return false }
        timer = window.setTimeout( function() { timer = null }, 200 )
        let appDate = this.value
        if (new Date($(this).val().slice(10)) > new Date(appDate) && new Date(appDate) > new Date($(this).val().slice(0, 10))) { return false }
        if (this.value.length >= 10 && /[0-9]/.test(e.key) === true && new Date(this.value) > new Date('1/1/2000')) {
            try {
                let periodValue = $('#selectPeriod option').filter(function() {
                    return new Date($(this).val().slice(10)) > new Date(appDate) && new Date(appDate) > new Date($(this).val().slice(0, 10))
                })
                $('#selectPeriod').val(periodValue[0].value)
            } catch(error) {console.log('Error with dropdown auto-date'); console.error(error)} }
    })
};


//SECTION START auto-fill, Open provider information page from Child's Provider page
if (window.location.href.indexOf("CaseChildProvider.htm") > -1) {
    $('label[for="providerLivesWithChild"]').text('Lives with Child: ').removeClass('col-md-3 col-lg-3').addClass('col-md-2 col-lg-2');
    $('label[for="providerLivesWithChild"]').add($('label[for="providerLivesWithChild"]').siblings()).appendTo($('label[for="childCareMatchesEmployer"]').parent())
    $('label[for="relatedToChild"]').removeClass('col-md-3 col-lg-3').addClass('col-md-2 col-lg-2');
    $('label[for="relatedToChild"]').add($('label[for="relatedToChild"]').siblings()).appendTo($('label[for="careInHome"]').parent());
    // $('#reporterTypeCheckboxes').contents().filter(function(e, f) { return this.nodeType === 3 }).filter(function(e, f) { return this.data.includes("\n\t") ? false : this }).wrap('<span>')
    // Buttons for added functionality
    if (viewMode) {
        $('#providerName').parent().after('<button type="button" class="custom-button custom-button__floating flex-right" id="providerAddressButton">Provider Address</button>')
        $('#providerAddressButton').click(function(e) {
            e.preventDefault()
            window.open("/ChildCare/ProviderAddress.htm?providerId=" + $('#providerId').val(), "_blank");//blarg
        })
        $('#providerSearch').parent().after('<button type="button" class="custom-button custom-button__floating flex-right" id="providerInfoButton">Provider Contact</button>')
        $('#providerInfoButton').click(function(e) {
            e.preventDefault()
            window.open("/ChildCare/ProviderInformation.htm?providerId=" + $('#providerId').val(), "_blank");
        })
    } else if (!viewMode) {
        $('#providerType').parent().after('<button type="button" class="custom-button custom-button__floating flex-right custom-button__nodisable" id="resetCCPForm">Clear Dates & Hours</button>')
        $('#resetCCPForm').click(function(e) {
            e.preventDefault()
            $('#careEndReason').val($('#careEndReason').val(''))
            $('#primaryBeginDate, #secondaryBeginDate, #carePeriodBeginDate, #carePeriodEndDate, #primaryEndDate, #secondaryEndDate, #hoursOfCareAuthorized').val('')
            eleFocus('#primaryBeginDate')
        })
    };
    //
    //SECTION END Open provider information page from Child's Provider page
    function childProviderPage() {
        let $lnlGroup = $('#careInHome, #providerLivesWithChildBeginDate, #careInHomeOfChildBeginDate, #formSent, #signedFormReceived').parents('.form-group');
        let $licensedGroup = $('#primaryBeginDate, #secondaryBeginDate').parents('.form-group')
        let $careInHomeGroup = $('#exemptionReason, #exemptionPeriodBeginDate').parents('.form-group')
        if ($('#providerType').val() !== "Legal Non-licensed" && $('#providerType').val() !== '') {//not LNL
            $lnlGroup.addClass('collapse')
            $careInHomeGroup.addClass('collapse')
            $licensedGroup.removeClass('collapse')
            if (!viewMode) {
                $('#providerLivesWithChild, #careInHome, #relatedToChild').val("N") }//not LNL, edit mode
            else { $lnlGroup.addClass('collapse') }//not LNL, view mode
        } else if ($('#providerType').val() === "Legal Non-licensed") {//is LNL
            $licensedGroup.addClass('collapse')
            if ($('#careInHome').val() === 'N') { $careInHomeGroup.addClass('collapse') }
            if (!viewMode) { $lnlGroup.removeClass('collapse') }//is LNL, edit mode
            else {//is LNL, view mode
                $('#providerLivesWithChildBeginDate, #careInHomeOfChildBeginDate').each(function() {
                    if ($(this).val() === '') { $(this).parents('.form-group').addClass('collapse') }
                    else { $(this).parents('.form-group').removeClass('collapse') }
                })
            }
        }
    };
    if (!viewMode) {
        $('#primaryBeginDate, #secondaryBeginDate').each(function() {
            if ($(this).val() === '') { $(this).parent().nextAll('div').children('input').prop('tabindex','-1') }
        })
        if ($('#primaryBeginDate').val() === '' && $('#secondaryBeginDate').val() === '') {$('#careEndReason, #carePeriodEndDate').prop('tabindex','-1')}
    };
    childProviderPage();
    $('#childProviderTable').click(function() { childProviderPage() });
    $('#providerId').change(function() {
        doEvent('#providerId')
        setTimeout(function() {
            if ($('#providerId').val() !== '') {
                childProviderPage()
                if ($('#providerType').val() !== "Legal Non-licensed") { eleFocus('#primaryBeginDate') }
                else if ($('#providerType').val() === "Legal Non-licensed") { eleFocus('#providerLivesWithChild') }
                else if ($('#providerType').val() === '') { console.log('Something went wrong.') }
            }
        }, 200)
    });
    window.onerror = function(error) {
        if (error.message.indexOf("Bad escaped character in JSON") > -1) {//"Uncaught SyntaxError: Bad escaped character in JSON"
            $('#memberReferenceNumberNewMember').closest('.form-group').after('<div class="form-group" id="stateErrorNotInYourFavor"></div>')
            $('#stateErrorNotInYourFavor').html("Provider name has a special character and it\'s causing an issue on the state\'s side of code. It\'s been reported...")
        }
    };
    $('#primaryBeginDate, #secondaryBeginDate')
        .keydown(function(e) {
        if (e.key === "Tab" && $('#carePeriodBeginDate').val() === '' && $(this).val() !== '') {
            e.preventDefault()
            if ($('#carePeriodBeginDate').val() === '' && $(this).val() !== '') {
                $(this, '#carePeriodBeginDate').datepicker("isDisabled")
                $('#carePeriodBeginDate').val($(this).val())
                eleFocus('#hoursOfCareAuthorized')
                setTimeout(function() { $('.hasDatepicker').datepicker("hide") }, 500)
            }
        }// else { $('#carePeriodBeginDate').prop('tabindex', '0') }
    })
        .blur(function() {
        if ($('#carePeriodBeginDate').val() === '' && $(this).val() !== '') {
            $(this, '#carePeriodBeginDate').datepicker("isDisabled")
            $('#carePeriodBeginDate').val($(this).val())
            eleFocus('#hoursOfCareAuthorized')
            setTimeout(function() { $('.hasDatepicker').datepicker("hide") }, 500)
        }
    });
};
//SECTION END CaseChildProvider hiding fields if provider type is not LNL

if (window.location.href.indexOf("CaseCreateEligibilityResults.htm") > -1) {
    if ($('strong:contains("Results successfully submitted.")').length) {
        $('#dupeButtonHouse').addClass('collapse')
        $('#caseCERDetail').append('<button type="button" id="eligibilityResults" class="form-button center-vertical">Eligibility Results</button>')
        $('#eligibilityResults').click(function(e) { e.preventDefault(); document.getElementById(`Eligibility Results Selection`).children[0].click() })
        window.onload = () => (eleFocus('#eligibilityResults'))
    }
}

//SECTION START Fill Child Support PDF Forms
if (window.location.href.indexOf("CaseCSE.htm") > -1) {
    $('#cseDetailsFormsCompleted').parent().after('<div type="button" class="custom-button custom-button__floating centered-text flex-right" id="csForms">Generate CS Forms</div>');
    $('#csForms').click(function() {
        let caseNumber = $('#caseId').val();
        let cpInfo = $('#csePriTable .selected td').eq(1).text();
        let ncpInfo = $('#csePriTable .selected td').eq(2).text();
        let childList = {};
        $('#childrenTable tbody tr').each(function(index) {
            if ($(this).children('td').eq(1).text().length > 0) {
                childList["child" + index] = $(this).children('td').eq(1).text();
            };
        });
        const formInfo = {pdfType:"csForms", xNumber:localStorage.getItem("MECH2.userIdNumber"), caseNumber:caseNumber, cpInfo:cpInfo, ncpInfo:ncpInfo, ...childList};
        window.open("http://nt-webster/slcportal/Portals/65/Divisions/FAD/IM/CCAP/index.html?parm1=" + JSON.stringify(formInfo), "_blank");
    });
//SECTION END Fill Child Support PDF Forms

//SECTION START Remove unnecessary fields from Child Support Enforcement
    if (viewMode) {$('#actualDate').parents('.form-group').addClass('collapse')}
    let $hiddenCSE = $('#cseAbsentParentInfoMiddleInitial, #cseAbsentParentInfoSsn, #cseAbsentParentInfoBirthdate, #cseAbsentParentInfoAbsentParentSmi, #cseAbsentParentInfoAbsentParentId').parents('.form-group')
    $($hiddenCSE).addClass('collapse');
    $('#cseAbsentParentInfoLastName').parent().after('<div class="custom-button__floating custom-button__nodisable centered-text flex-right" id="abpsShowHide">Toggle extra info</div>');
    $('#abpsShowHide').click(function() { $($hiddenCSE).toggleClass('collapse') });
    let $goodCause = $('#cseGoodCauseClaimStatus').parents('.form-group').siblings().not('h4')
    function hideBlankGoodCause() {
        if ($('#cseGoodCauseClaimStatus').val() === 'Not Claimed') { $goodCause.addClass('collapse') }
        else { $goodCause.removeClass('collapse') }
    };
    hideBlankGoodCause();
    $('#cseGoodCauseClaimStatus').change(function () {hideBlankGoodCause()});
    $('#csePriTable').click(function() { cseReviewDate() });
    function cseReviewDate() {
        $('h4:contains("Good Cause")').siblings().removeClass('collapse')
        $('h4:contains("Good Cause")').siblings().children('div').children('input, select').filter(function() {return $(this).val() === ''}).not('#cseGoodCauseClaimStatus').parents('.form-group').addClass('collapse')
    };
    cseReviewDate()
    $('#cseGoodCauseClaimStatus').parent().after('<div class="custom-button__floating custom-button__nodisable centered-text flex-right" id="cseGoodCauseClaimStatusToggle">Toggle extra info</div>');
    $('#cseGoodCauseClaimStatusToggle').click(function() { $goodCause.toggleClass('collapse') });
};
//SECTION END Remove unnecessary fields from Child Support Enforcement

//SECTION START CaseCSIA
if (window.location.href.indexOf("CaseCSIA.htm") > -1) {
    $('label.col-lg-2').removeClass('col-lg-2 col-md-2').addClass('col-lg-3 col-md-3')
    let $csiaCollapse = $('#middleInitial, #birthDate, #ssn, #gender').parents('.form-group')
    $csiaCollapse.addClass('collapse')
    $('#actualDate').parents('.form-group').append('<div class="custom-button__floating custom-button__nodisable centered-text flex-right" id="csiaExtra">Toggle extra info</div>');
    $('#csiaExtra').click(function() { $csiaCollapse.toggleClass('collapse') });
    $('h4:contains("Address")').click()
    $('#deceasedDate').parent().addClass('collapse')
    setTimeout(function() {
        if (!viewMode) {
            function childOfAbpsInfo() {
                if ($('#caseCSIADetailData .selected td:eq(3)').html() !== "") { $('#nameKnown').val('Yes').addClass('prefilled-field') }
                $('#birthplaceCountry').change(function() { setTimeout(function() { $('#birthplaceStateOrProvince').removeAttr('tabindex'); if ($('#birthplaceStateOrProvince').val() === "") { $('#birthplaceStateOrProvince').val('Minnesota').addClass('prefilled-field');doEvent('#birthplaceStateOrProvince')} },100) })
                $('#birthplaceStateOrProvince').change(function() { setTimeout(function() { if ($('#birthplaceCounty').val() === "") { $('#birthplaceCounty').val('STLOUIS').addClass('prefilled-field');doEvent('#birthplaceCounty');eleFocus('#birthplaceStateOrProvince')} },100) })
                if ($('#birthplaceCountry').val() === "") { $('#birthplaceCountry').val('USA').addClass('prefilled-field');doEvent('#birthplaceCountry') }
            }
            $('#caseCSIAChildData').click(function() { childOfAbpsInfo() })
            $('#priRelationshiptoChild').change(function() { childOfAbpsInfo() })
        }
    },0)
    $('#deceased').change(function() {
        if ($(this).val() === "Yes") { $('#deceasedDate').parent().removeClass('collapse') }
    })
}
//SECTION END CaseCSIA

//SECTION START CaseEarnedIncome Remove unnecessary fields from CaseEarnedIncome, set to MN, USA when leaving Employer Name field
if (window.location.href.indexOf("CaseEarnedIncome.htm") > -1) {
    //SUB-SECTION START Remove unnecessary fields from CaseEarnedIncome
	$('#providerId, #providerSearch').prop('tabindex', '-1')
    let ceiEmployment = $('#ceiPrjAmount, #ceiAmountFrequency, #ceiHrsPerWeek').parents('.form-group');
    let ceiSelfEmployment = $('#ceiGrossIncome, #ceiGrossAllowExps, #ceiTotalIncome').parents('.form-group')
    $('#earnedIncomeMemberTable').click( function() { checkSelfEmploy() });
    $('#ceiIncomeType').change( function() { checkSelfEmploy() })
    function checkSelfEmploy() {
        if ($('#ceiIncomeType').val() === "Self-employment") {
            ceiSelfEmployment.removeClass('collapse');
            ceiEmployment.addClass('collapse'); }
        else if ($('#ceiIncomeType').val() !== "Self-employment" || (viewMode && $('#ceiTotalIncome').val() === '')) {
            ceiSelfEmployment.addClass('collapse');
            ceiEmployment.removeClass('collapse');
        }
    };
    checkSelfEmploy()
    let hiddenCEI1 = $('#ceiEmpStreet, #ceiEmpStreet2, #ceiEmpCity, #ceiEmpStateOrProvince, #ceiPhone, #ceiEmpCountry').parents('.form-group')
    hiddenCEI1.addClass('collapse');
    $('#ceiIncomeType').parent().after('<div class="custom-button__floating custom-button__nodisable centered-text flex-right" id="ceiShowHide1">Toggle extra info</div>');
    $('#ceiShowHide1').click(function() { $(hiddenCEI1).toggleClass('collapse') });
    //
    let hiddenCEI2 = $('#ceiCPUnitType, #ceiNbrUnits').parents('.form-group')
    hiddenCEI2.addClass('collapse');
    $('#ceiPrjAmount').parent().after('<div class="custom-button__floating custom-button__nodisable centered-text flex-right" id="ceiShowHide2">Toggle extra info</div>');
    $('#ceiShowHide2').click(function() { $(hiddenCEI2).toggleClass('collapse') });
    //
    if ($('#providerName').val().length < 1) {
        let hiddenCEI3 = $('#providerName, #addressStreet').parents('.form-group')
        hiddenCEI3.addClass('collapse');
        $('#providerSearch').parent().after('<div class="custom-button__floating custom-button__nodisable centered-text flex-right" id="ceiShowHide3">Toggle extra info</div>');
        $('#providerSearch').parents('.col-lg-12').addClass('form-group')
        $('#ceiShowHide3').click(function() { $(hiddenCEI3).toggleClass('collapse') });
    };
    if (!viewMode) {
        $('#ceiGrossAllowExps').parent().after('<div style="align-content: center; height: 28px; display: inline-flex; flex-wrap: wrap; margin-right: 10px;" id="fiftyPercent"></div>');
        $('#fiftyPercent').text('50%: ' + ($('#ceiGrossIncome').val()*.5).toFixed(2));
        $('#ceiGrossIncome').change(function() {$('#fiftyPercent').text('50%: ' + ($('#ceiGrossIncome').val()*.5).toFixed(2)) });
        $('#fiftyPercent').after('<div id="grossButton" class="custom-button__nodisable custom-button__floating">Use 50%</div>')
        $('#grossButton').click(function() {
            $('#ceiGrossAllowExps').val(($('#ceiGrossIncome').val()*.5).toFixed(2));
			doEvent('#ceiGrossAllowExps')
        });
        //SUB-SECTION START Set state to MN, country to USA when leaving Employer Name field
        if ($('#ceiEmpCountry').val() === '') {
            $('#ceiEmpCountry').val('USA');
            doEvent('#ceiEmpCountry')
        }
        if ($('#ceiEmpStateOrProvince').val() === null) {
            $('#ceiEmpStateOrProvince').val('Minnesota');
            doEvent('#ceiEmpStateOrProvince')
        };
    };
};
//SECTION END Remove unnecessary fields from CaseEarnedIncome, set to MN, USA when leaving Employer Name field

//SECTION START CaseEarnedIncome CaseUnearnedIncome CaseExpense collapse unnecessary H4s
if (["CaseEarnedIncome.htm","CaseUnearnedIncome.htm","CaseExpense.htm"].includes(thisPageNameHtm)) {
    if (viewMode) {
		$('table').click(function() {
            showHidePaymentChange()
            eleFocus('#editDuplicateButton')
        })
        $('#ceiPaymentChange, #paymentChangeDate').each(function() {
            if ($(this).val() === '') { $(this).parents('.form-group').addClass('collapse') }
        })
    }
    function showHidePaymentChange() {
        if ($('#memberReferenceNumberNewMember').val() === '') {
            $('#ceiPaymentChange, #paymentChangeDate').parents('.form-group').addClass('collapse')
        }
    }
    if (!viewMode) { showHidePaymentChange() }
    if ($('#memberReferenceNumberNewMember').val() === '') {
        $('#ceiPaymentEnd, #paymentEndDate').prop('tabindex', -1).addClass('tabindex-negative-one')
    }
    $( "h4:contains('Actual Income'), h4:contains('Student Income'), h4:contains('Actual Expense')" ).nextAll().addClass("collapse")
};
//SECTION END CaseEarnedIncome CaseUnearnedIncome CaseExpense collapse unnecessary H4s

//SECTION START CaseEditSummary Remove padding from left of inputs in the summary
if (window.location.href.indexOf("CaseEditSummary.htm") > -1) {
    $('#editSummaryPanelData').append('<style>input {padding-left: 0px !important}</style>')
};
//SECTION END CaseEditSummary Remove padding from left of inputs in the summary

//SECTION START Highlight "Fail||Ineligible" in eligibility results
if (window.location.href.indexOf("CaseEligibilityResult") > -1 && window.location.href.indexOf("Help.htm") < 0) {
    let tableBody = $('table tbody').parent().DataTable()
    let $isNo = $('tbody > tr > td').filter(function() { return $(this).text() === 'No' });
    $isNo.filter(function() {
        return $(tableBody.column( tableBody.cell( $(this) ).index().column ).header()).html() == "In Family Size" || $(tableBody.column( tableBody.cell( $(this) ).index().column ).header()).html() == "Verified"
    })
        .addClass('eligibility-highlight-table')
    function eligHighlight() {
        $('.eligibility-highlight').removeClass('eligibility-highlight')
        $('div>input[type="text"]').filter(function() {return $(this).val() === "Fail" }).addClass('eligibility-highlight')
        $('div[title="Family Result"]:contains("Ineligible")').addClass('eligibility-highlight')
        $('div:contains("Fail"):not(:has("option")):last-child').addClass('eligibility-highlight')
        $('option:selected:contains("Fail")').parents('select').addClass('eligibility-highlight')
    }
    eligHighlight()
    $('table').click(function() { eligHighlight(); eleFocus('#nextDuplicateButton') })
};
//SECTION END Highlight "Fail" in eligibility results

//SECTION START CaseEligibilityResultApproval Add 90 days to date entered to ExtElig Begin Date
if (window.location.href.indexOf("CaseEligibilityResultApproval.htm") > -1) {
    $('#allowedExpirationDate, #beginDate').unwrap()
    $('#type, #reason').unwrap().removeAttr('style').addClass('col-lg-8 col-md-8')
    $('#type').prop('tabindex','1')
    $('#reason').prop('tabindex','2')
    $('#beginDate').prop('tabindex','3')
    $('#allowedExpirationDate').prop('tabindex','4')
    $('#beginDate').keyup(function() {
        if ($(this).val().length === 10) {
            $('#extEligPlus90button').remove();
            let extEligPlus90 = addDays($('#beginDate').val(), 90);
            extEligPlus90 = new Date(extEligPlus90).toLocaleDateString('en-US', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            $('label[for=beginDate]').parent().append('<button tabindex="0" class="centered-text rounded-border-box" id="extEligPlus90button" style="padding: 2px; background-color: #dcdcdc; cursor: pointer;">+90: ' + extEligPlus90 + '</button>');
            eleFocus('#extEligPlus90button')
            $(this).datepicker("hide")
            // $('#ui-datepicker-div').hide()
            $('#extEligPlus90button').click(function(e) {
                e.preventDefault()
                $('#allowedExpirationDate').val(extEligPlus90);
                const event = new Event('change');
                document.querySelector('#allowedExpirationDate').dispatchEvent(event);
                $('#save').focus();
            });
        }
    })
};
//SECTION END CaseEligibilityResultApproval Add 90 days to date entered to ExtElig Begin Date

if (window.location.href.indexOf("CaseEligibilityResultApprovalPackage.htm") > -1) { $('table').click(function() { eleFocus('#confirmDuplicateButton') }) }

//SECTION START CaseEligibilityResultFamily Fix 'Select' elements to have class col-md-4 so they show the entire word
if (window.location.href.indexOf("CaseEligibilityResultFamily.htm") > -1) {
    $('select').parent('.col-md-3').removeClass('col-md-3').addClass('col-md-4');
    $('label.col-lg-8').removeClass('col-lg-8').addClass('col-lg-7');
//SECTION END CaseEligibilityResultFamily Fix 'Select' elements to have class col-md-4 so they show the entire word

//SECTION START Custom fix for CaseEligibilityResultFamily (1 label&field)
	$('label[for="allowedTemporaryIneligibilityExpireTest"]').removeClass("col-md-8").addClass("col-md-7").removeAttr('style')
};
//SECTION END Custom fix for CaseEligibilityResultFamily (1 label&field)

//SECTION START CaseEligibilityResultFinancial highlighting if income exceeds limit
if (window.location.href.indexOf("CaseEligibilityResultFinancial") > -1) {
    let totalAnnualizedIncome = Number($('label[for="totalAnnualizedIncome"]').next().html().replace(/[^0-9.-]+/g,""))
    let maxAllowed = Number($('label[for="maxIncomeAllowed"]').next().html().replace(/[^0-9.-]+/g,""))
    if (totalAnnualizedIncome > maxAllowed) { $('label[for="totalAnnualizedIncome"]').parent().addClass('eligibility-highlight') }
}

//SECTION START CaseEligibilityResultPerson alignment fix
if (window.location.href.indexOf("CaseEligibilityResultPerson.htm") > -1) {
    $('label[for="countEarnings"]').removeClass('col-md-5 col-lg-5').addClass('col-lg-6 col-md-6')
}
//SECTION END CaseEligibilityResultPerson alignment fix

//SECTION START CaseEligibilityResultOverview alignment fix
if (window.location.href.indexOf("CaseEligibilityResultOverview.htm") > -1) {
    $('label[for="totalAnnualizedIncome"]').parent('.form-group').children('.col-lg-5').addClass('collapse')
    $('label[for="financiallyResAgency"]').removeClass('col-lg-4 col-md-4').addClass('col-lg-3 col-md-3')
}
//SECTION END CaseEligibilityResultOverview alignment fix

//SECTION START Custom fix and text for CaseEligibilityResultSelection
if (window.location.href.indexOf("CaseEligibilityResultSelection.htm") > -1) {
    $('tbody > tr > td:contains("Unapproved")').addClass('eligibility-highlight').parent('tr').addClass('Unapproved');//Highlight unapproved
    $('tbody > tr > td:contains("Eligible")').parent('tr').addClass('Eligible');
    $('tbody > tr > td:contains("Ineligible")').parent('tr').addClass('Ineligible');
    if ($('strong:contains("Background")').length) {
        $('#select').prop('disabled','disabled')
        $('#selectButton').addClass('custom-form-button__disabled');
    }
    if ($('.Unapproved').length) {
        if ($('.Unapproved.Eligible').length) { $('.selected').removeClass('selected'); $('.Unapproved.Eligible').click().addClass('selected') }
        else if ($('.Unapproved.Ineligible').length) { $('.selected').removeClass('selected'); $('.Unapproved.Ineligible').click().addClass('selected') }
    } else {
        let parm3var = '&parm3=' + document.getElementById('selectPeriod').value.replace(' - ', '').replaceAll('/','');
        $('#eligibilityActionsArea').after(`<div>
            <button type="button" id="goSAOverview" class="custom-button__nodisable custom-button__floating">SA Overview</button>
            <button type="button" id="goSAApproval" class="custom-button__nodisable custom-button__floating">SA Approval</button>
            </div>`)
        $('#goSAOverview').click(function(e) {
			e.preventDefault()
            window.open('/ChildCare/CaseServiceAuthorizationOverview.htm?parm2=' + $('#caseId').val() + parm3var, '_self');
        });
        $('#goSAApproval').click(function(e) {
            e.preventDefault()
            window.open('/ChildCare/CaseServiceAuthorizationApproval.htm?parm2=' + $('#caseId').val() + parm3var, '_self');
        });
    };
    if (document.getElementsByClassName('dataTables_empty').length === 0) { document.getElementsByClassName('sorting')[1].click() };//sort by program type
};
//SECTION END Custom fix and text for CaseEligibilityResultSelection

//SECTION START Redirect if we're on elig results and there's no version selected
if (reviewingEligibility) {
    // function check() {
    //     if ($('[id$="TableAndPanelData"]').css('display') === "none") {
    //         window.open(document.getElementById("Eligibility Results Selection").firstElementChild.href, "_self")
    //     };
    // };
    let alreadyRedirecting = 0
    setIntervalLimited(function() {
        if ($('[id$="TableAndPanelData"]').css('display') === "none" && !alreadyRedirecting) {
            window.open(document.getElementById("Eligibility Results Selection").firstElementChild.href, "_self")
        }
    }, 200, 5)
    $('.col-lg-1:not(.textInherit)').remove()//removes blank divs
};
//SECTION END Redirect if we're on elig results and there's no version selected

//SECTION END Remove unnecessary fields from CaseExpense
if (window.location.href.indexOf("CaseExpense.htm") > -1) {
	let hiddenExp = $('#projectionExpenseUnitType, #projectionExpenseNumberOfUnits').parents('.form-group');
	hiddenExp.addClass('collapse');
	$('label[for="projectionExpenseAmount"]').parent().append('<div class="custom-button__floating custom-button__nodisable centered-text flex-right" id="ceiShowHide2">Toggle extra info</div>');
	$('#ceiShowHide2').click(function() { $(hiddenExp).toggleClass('collapse') });
    $('.col-md-2.col-lg-2').removeClass('col-lg-2 col-md-2').addClass('col-md-3 col-lg-3');
    $('#paymentBeginDate').css('margin-right', '4px');
    $('#paymentEndDate').css('margin-left', '10px');
};
//SECTION END Remove unnecessary fields from CaseExpense

//SECTION START CaseFraud Column resizing
window.location.href.indexOf("CaseFraud.htm") > -1 && ($('.col-md-3, .col-lg-3').removeClass('col-md-3 col-lg-3').addClass('col-md-5 col-lg-4'));
//SECTION START CaseFraud Column resizing

//SECTION START CaseLockStatus Reveal Unlock button
if (window.location.href.indexOf("CaseLockStatus.htm") > -1) {
    if ($('div#caseLockStatusPanelData div.form-group').contents().eq(2).text().indexOf("lock found") < 1) {
        $('#caseLockStatusDetail').append('<div style="font-size: 20px; margin-left: 5px; padding: 2px 5px; width: fit-content;" class="eligibility-highlight" id="acceptMyTerms"> I solemnly swear I am up to no good. Click this text to show the "Unlock" button. </div>')
        $('#acceptMyTerms').click(function() {
            $("#caseLockStatusUnlockButtonArea").show();
            $("#acceptMyTerms").remove();
        });
	};
};
//SECTION END CaseLockStatus Reveal Unlock button

//SECTION START Open CaseMemberHistory page from CaseMember with 'button'
if (window.location.href.indexOf("CaseMember.htm") > -1) {
    $('#memberNameIsAlias').parents('.form-group').prop('id', 'aliasGroup')
    $('label[for="memberReferenceNumber"]').attr('id','openHistory').css('border-width','1px').css('border-color','gray').css('border-style','solid');
    $('#openHistory').click(function() {
        window.open('/ChildCare/CaseMemberHistory.htm?parm2=' + $('#caseId').val(), '_blank');
    });
    $( "label:contains('American Indian or Alaskan Native')" ).prop('innerText', 'American Indian or AK Native');
    $( "label:contains('Pacific Islander or  Native Hawaiian')" ).prop('innerText', 'Pacific Islander or HI Native');
    if ($('#next').length > 0) { $('table').click(function() { eleFocus('#next') } )}
    if (!viewMode) {
        $('#memberAlienId, #memberDateOfDeath').prop('tabindex','-1').addClass('tabindex-negative-one')
        $('#memberSsnVerification').removeProp('tabindex')
        let filledValueFields = $('#memberPanelsData :is(input, select):not([type="checkbox"], .wiz-form-button, .form-button, [type="hidden"], [disabled="disabled"])').filter(function() { return $(this).val() !== '' } ).prop('tabindex','-1').addClass('tabindex-negative-one')
        $('#memberReferenceNumber').blur(function(event) {
            if (event.target.value.length > 1 && Number(event.target.value) > 2 && Number(event.target.value) < 10) { fillMemberDataChild(event.target) }
        })
        function fillMemberDataChild(memberReferenceNumber) {
                $('#memberSsnVerification').val() === '' && $('#memberSsnVerification').val("SSN Not Provided").addClass('prefilled-field')
                $('#memberRelationshipToApplicant').val() === '' && $('#memberRelationshipToApplicant').val("Child").addClass('prefilled-field');doEvent('#memberRelationshipToApplicant')
                $('#memberBirthDateVerification').val() === '' && $('#memberBirthDateVerification').val("No Verification Provided").addClass('prefilled-field')
                $('#memberIdVerification').val() === '' && $('#memberIdVerification').val("No Verification Provided").addClass('prefilled-field')
                $('#memberKnownRace').val() === '' && $('#memberKnownRace').val("No").addClass('prefilled-field');doEvent('#memberKnownRace')
                $('#memberSpokenLanguage').val() === '' && $('#memberSpokenLanguage').val("English").addClass('prefilled-field');doEvent('#memberSpokenLanguage')
                $('#memberWrittenLanguage').val() === '' && $('#memberWrittenLanguage').val("English").addClass('prefilled-field');doEvent('#memberWrittenLanguage')
                $('#memberNeedsInterpreter').val() === '' && $('#memberNeedsInterpreter').val("No").addClass('prefilled-field')
                $('#arrivalDate').val() === '' && $('#arrivalDate').addClass('required-field')
        }
        if (Number($('#memberReferenceNumber').val()) > 2 && Number($('#memberReferenceNumber').val()) < 10) { fillMemberDataChild() }
        // $('#save').click(function() {
        //     storage = $('#memberBirthDateVerification').val()
        // })
    }
};
//SECTION END CaseMember

//SECTION START CaseMemberII fixing column sizes
if (window.location.href.indexOf("CaseMemberII.htm") > -1) {
    $('div.col-lg-3').removeClass('col-lg-3 col-md-3').addClass('col-lg-4 col-md-4')
    if ($('#next').length > 0) { $('table').click(function() { eleFocus('#next') } )}
    if (!viewMode) {
        $('#memberReferenceNumberNewMember').blur(function(event) {
            if ( Number(event.target.value) > 2 && Number(event.target.value) < 11 ) {
                $('#memberMaritalStatus').val("Never Married").addClass('prefilled-field'); doEvent('#memberMaritalStatus')
                $('#memberSpouseReferenceNumber').prop('tabindex', '-1').addClass('tabindex-negative-one')
                $('#memberLastGradeCompleted').val("Pre-First Grade or Never Attended").addClass('prefilled-field')
                $('#memberUSCitizen').val("Yes").addClass('prefilled-field'); doEvent('#memberUSCitizen')
                $('#memberCitizenshipVerification').val("No Verification Provided").addClass('prefilled-field')
                //blarg
                //$('#actualDate').val() = storage
                //$('#memberCitizenshipVerification').val() = storage
            }
        })
    }
}
//SECTION END CaseMemberII fixing column sizes

//SECTION START Case Notes custom styles
if (window.location.href.indexOf("CaseNotes.htm") > -1) {
    if (!viewMode) { $('h4:contains("Note")').after('<button type="button" class="custom-button__float custom-button__nodisable float-right" id="disAutoFormat" tabindex="-1">Disable Auto-Format</button>') }
    $('#disAutoFormat').click(function(e) { e.preventDefault(); $(this).text($(this).text() === "Disable Auto-Format" ? "Enable Auto-Format" : "Disable Auto-Format") })
    $('#save').click(function() {
        if ($('#disAutoFormat').text() === "Disable Auto-Format") {
            $('#noteSummary').val($('#noteSummary').val().replace(/Redetermination has not been received - This famil/, "Redetermination has not been received"))
            $('#noteStringText').val($('#noteStringText').val().replace(/\n\ *`\ */g,"\n             ").replace(/^\ *([A-Z]+\ ?[A-Z]+:)\ */gm, (text, a) => `${' '.repeat(9- a.length)}${a}    `))//Using ` to auto-insert/correct spacing, and fix spacing around titles
            // $('#noteStringText').val($('#noteStringText').val().replace(/\n\ *`\ */g,"\n             ").replace(/^\ *([A-Z]+\ ?[A-Z]+:)\ */gm, function(text, a) { `${' '.repeat(9- a.length)}${a}    `} ))//Using ` to auto-insert/correct spacing, and fix spacing around titles
        }
    })
    $('#noteStringText').on('paste', function (event) {
        if ($('#disAutoFormat').text() === "Disable Auto-Format") {
            setTimeout(function() {$('#noteStringText').val($('#noteStringText').val().replace(/(\w)\(/g,"$1 (").replace(/\)(\w)/g,") $1")//Spaces around parentheses
                                                            .replace(/\n\u0009/g,"\n             ").replace(/\n\ {9}\u0009/g, "\n             ").replace(/\n\ {16}/g,"\n             ").replace(/\u0009/g, "    ")//Spacing from pasting Excel cells
                                                            .replace(/\n+/g,"\n"))//Multiple new lines to single new line
                                  },1)
        }
    })
    function textSelect(inp, s, e) {//moves cursor to selected position (s) or selects text between (s) and (e)
        e = e || s;
        if (inp.createTextRange) {
            var r = inp.createTextRange();
            r.collapse(true);
            r.moveEnd('character', e);
            r.moveStart('character', s);
            r.select();
        } else if (inp.setSelectionRange) {
            inp.focus();
            inp.setSelectionRange(s, e);
        }
    }
    $('#noteStringText').keydown(function(e) {
        if (e.key === "`") {
            e.preventDefault()
            let curPos = document.getElementById("noteStringText").selectionStart; // will give the current position of the cursor
            console.log(curPos)
            let currentText = $('#noteStringText').val();
            let text_to_insert = "             ";
            $('#noteStringText').val(currentText.slice(0,curPos) + text_to_insert + currentText.slice(curPos)); // setting the modified text in the text area
            textSelect(document.getElementById('noteStringText'), curPos+13);
        }
    })
    !viewMode && $('option[value="Application"]').after('<option value="Child Support Note">Child Support Note</option>');
    $('#storage').addClass('collapse');
    $('#noteArchiveType, #noteSearchStringText, #noteImportant').prop('tabindex', '-1')
    $('table#caseNotesTable>tbody>tr:has(td:contains("Disbursed child care support")), table#caseNotesTable>tbody>tr:has(td:contains("PMI/SMI Merge"))').addClass('hidden-tr');//Hiding Disbursed Child Care Support payment rows
    let hiddenTr = $('.hidden-tr').length
    if (hiddenTr) {
        $('#reset').after('<button type="button" id="toggleCaseNotesRows" class="custom-button__float custom-button__nodisable flex-right" data-hiding="true" title="Shows or hides PMI Merge and CS disbursion auto-notes">Show '+ hiddenTr +' Hidden Rows</button>')
        $('.hidden-tr').hide()
        $('#toggleCaseNotesRows').click(function(e) {
            e.preventDefault();
            switch (e.target.dataset.hiding) {
                case "true":
                    e.target.dataset.hiding = "false"
                    e.target.innerHTML = "Hide "+ hiddenTr +" Extra Rows"
                    $('.hidden-tr').show()
                    break
                case "false":
                    e.target.dataset.hiding = "true"
                    e.target.innerHTML = "Show "+ hiddenTr +" Hidden Rows"
                    $('.hidden-tr').hide()
                    break
            }
        })
        waitForElmHeight('#caseNotesTable > tbody > tr:not(.hidden-tr)').then(() => { if ($('#caseNotesTable > tbody > tr:not(.hidden-tr)').length) { $('#caseNotesTable > tbody > tr:not(.hidden-tr)').eq(0).click() } } )
    }
    eleFocus('#newDuplicateButton')
};
//SECTION END CaseNotes

//SECTION START CaseNotes and ProviderNotes layout fix
if (window.location.href.indexOf("Notes.htm") > -1) {//CaseNotes, ProviderNotes
    document.getElementsByClassName('panel-box-format')[1].style.display = "none";
    document.getElementById('noteStringText').rows = '29'
    $('br').remove();
    $('#noteArchiveType').width('unset')
    $('#noteSummary').removeAttr('style')//.width('100%')
        .parent().removeClass('col-lg-4 col-md-4 col-sm-4 col-lg-3').addClass('col-lg-11 col-md-11')
        .closest('.form-group').removeClass('col-lg-5 col-md-5 col-sm-5 col-xs-5').addClass('col-lg-7 col-md-8');
    $('label[for="noteSummary"]')
        .removeClass('col-lg-3 col-md-3 col-sm-4').addClass('col-lg-1 col-md-1');
    $('label[for="noteCreator"]').siblings().addBack().wrapAll('<div class="col-lg-3 col-md-3 form-group" id="noteCreatorGroup"></div>')
        // .end().addClass('test').removeClass('col-lg-3 col-md-3 col-sm-4').addClass('col-lg-2 col-md-2')
    $('#noteCreator')
        .parent().removeClass('col-lg-4 col-md-4 col-sm-4 marginTop5').addClass('col-lg-5 col-md-6');
    $('#noteCreatorGroup').appendTo($('label[for="noteSummary"]').closest('.row'));
    $('label:contains("Important")')
        .removeClass('col-lg-3 col-md-3 col-sm-4')
        .addClass('col-lg-2 col-md-2')
        .prop("innerText", "!")
        .attr('for','noteImportant')
        .closest('.form-group').attr('id','removeMe')
        .closest('.row').attr('id','addInfoRowOne')
        .height('28px')
    $('#noteImportant').parent()
        .removeClass('col-xs-2 col-sm-2 col-md-1 col-lg-1')
        .add('label[for="noteImportant"]').wrapAll('<div id="noteImportantGroup" class="col-lg-2 col-md-2 form-group" style="width: 45px; height: 28px; display: inline-flex;"></div>')
    $('#noteImportant').height('28px')
    $('label[for="noteMemberReferenceNumber"]')
        .removeClass('col-lg-3 col-md-3 col-sm-4').addClass('col-lg-2 col-md-2')
    $('#noteMemberReferenceNumber, #notePerson').css('width','100%')
        .parent()
        .removeClass('col-lg-4 col-md-4 col-sm-4 textInherit').addClass('col-lg-10 col-md-10 textInherit')
        .add('label[for="noteMemberReferenceNumber"], label[for="notePerson"]').wrapAll('<div id="noteMemberReferenceNumberGroup" class="col-lg-5 col-md-6 form-group"></div>')
    $('label[for="noteCategory"]')
        .removeClass('col-lg-3 col-md-3 col-sm-4').addClass('col-lg-2 col-md-2')
        .css('margin-left','')
    addGlobalStyle('label[for="noteCategory"] { width: 61px !important }');
    $('#noteCategory').parent()
        .removeClass('col-lg-3 col-md-3 col-sm-3 textInherit').addClass('col-lg-9 col-md-10 textInherit')
        .add('label[for="noteCategory"]').wrapAll('<div id="noteCategoryGroup" class="col-lg-4 col-md-4 form-group"></div>')
    $('.col-lg-6.col-md-6.col-sm-6.col-xs-6.form-group.textInherit:not(".col-xl-8,.col-xl-6")').addClass('collapse')
    $('.col-xs-2.col-sm-2.col-md-1.col-lg-1:not(:has("input"))').addClass('collapse')
    $('.col-xs-5.col-sm-5.col-md-5.col-lg-5').addClass('collapse');
    $('#noteImportantGroup, #noteMemberReferenceNumberGroup').prependTo('#addInfoRowOne')
    $('#removeMe').remove()
};
//SECTION END CaseNotes and ProviderNotes layout fix

//SECTION START Custom items for CaseOverview
if (window.location.href.indexOf("CaseOverview.htm") > -1) {
    $('#priEligibleActivity, #absentDaysUsed').css('color','inherit')
    $('#programInformationData').css('border-bottom', 'none')
    $('.col-xs-12:not(.col-lg-12), .visible-sm:not(.visible-lg)').remove()
    $('div.visible-lg>label').unwrap()
    $('.visible-lg:not(:has(*))').remove()
    $('h4:contains("Current Child Care Case Information:")').wrap('<div class="form-group" id="cccciH4"></div>')
    $('label[for="redeterminationDueDate"]').nextAll('div.col-lg-3:eq(0)').attr('id','redetDate');
    if ($('#redetDate').text().length > 19) {
        $('#cccciH4').append('<div id="copyFollowUpButton" class="custom-button__floating custom-button__nodisable centered-text flex-right">Follow Up Date</div>');
        $('#copyFollowUpButton').click(function() {
            let redetDate = $('label[for="redeterminationDueDate"]').siblings('div.col-lg-3.col-md-3').eq(0).text().replace(/\n|\t/g, '').slice(0, 10)
            let redetPlus = (addDays(redetDate, 44));
            let localedDate = new Date(redetPlus).toLocaleDateString();
            navigator.clipboard.writeText(localedDate);
            snackBar('Copied! <br>' + localedDate);
        });
        $('#redetDate').append('<div id="redetDateChild">');
        $('#redetDateChild').click(function() {
            let redetDate = $('label[for="redeterminationDueDate"]').siblings('div.col-lg-3.col-md-3').eq(0).text().replace(/\n|\t/g, '').slice(0, 10)
            navigator.clipboard.writeText(redetDate);
            snackBar('Copied! <br>' + redetDate);
        });
        $('#redetDateChild').after('<div id="copyRedetNoteButton" class="custom-button__floating custom-button__nodisable centered-text">Note Summary</div>');
        $('#copyRedetNoteButton').click(function() {
            let redetDate = $('label[for="redeterminationDueDate"]').siblings('div.col-lg-3.col-md-3').eq(0).text().replace(/\n|\t/g, '').slice(0, 10)
            navigator.clipboard.writeText("Redetermination mailed, due " + redetDate);
            snackBar('Copied! <br> Redetermination mailed, due ' + redetDate);
        })
    }
    $('#programInformationData td:contains("HC"), #programInformationData td:contains("FS"), #programInformationData td:contains("DWP"), #programInformationData td:contains("MFIP"), #programInformationData td:contains("WB")').parent().addClass('stickyRow').addClass('stillNeedsBottom')
    waitForElmHeight('#programInformationData > tbody > tr > td').then(() => {
        document.querySelectorAll('.stickyRow').forEach(function(element, index) {
            element.style.bottom = ($('.stillNeedsBottom').length -1) * (document.querySelector('#programInformationData').getBoundingClientRect().height / document.querySelectorAll('#programInformationData tbody tr').length) + "px"
            $(element).removeClass('stillNeedsBottom')
        })
    })
    waitForElmValue('#participantInformationData > tbody > tr > td').then(() => {
        if ($('#participantInformationData_wrapper thead td:eq(0)').attr('aria-sort') !== "ascending") { $('#participantInformationData_wrapper thead td:eq(0)').click() }
    })
    $('table:not(#providerInformationData)').click(function() {
        if ($('#providerInformationData>tbody>tr>td:first-child').length && $('#providerInformationData>tbody>tr>td:first-child').text().toLowerCase() !== "no records found") {
            $('#providerInformationData>tbody>tr>td:first-child').each(function() {
                $(this).replaceWith('<td><a href="ProviderOverview.htm?providerId=' + $(this).text() + '" target="_blank">' + $(this).text() + '</a></td>')
            })
        }
    })
};
//SECTION END Custom items for CaseOverview
if (window.location.href.indexOf("CasePageSummary.htm") > -1) {
    $('h4').parent().removeClass('col-lg-5 text-center text-left').addClass('col-lg-3 col-md-3 text-right')
}

//SECTION START CasePaymentHistory Add links to navigate to FinancialBilling in correct BWP
if (window.location.href.indexOf("CasePaymentHistory") > -1) {
    $('div.col-lg-3.col-md-3>input').width('100%');
    // $('#paymentHistoryTable tbody tr').children('td:nth-of-type(3)').each(function() { //testing
    $('#paymentHistoryTable>tbody>tr>td:nth-of-type(3)').each(function() {
            let linkText = $(this).text();
            $(this).text('');
            $(this).append('<a href="FinancialBilling.htm?parm2=' + $("#caseId").val() + '&parm3=' + linkText.replace(" - ", "").replaceAll("/","") + '", target="_blank">' + linkText + '</a>');
    });
    $('#paymentHistoryTable>thead>tr>td:eq(2)').click()
};
//SECTION START CasePaymentHistory Add links to navigate to FinancialBilling in correct BWP

//SECTION START Highlighting unchecked household members on reapplication
if (window.location.href.indexOf("CaseReapplicationAddCcap.htm") > -1) {
    $('input[type=checkbox]').each(function() {
        if (!$(this).prop('checked')) {
            $(this).parents('tr').css('background-color','yellow');
        };
    });
};
//SECTION END Highlighting unchecked household members on reapplication

//SECTION START Fill manual Billing PDF Forms, also nav to Provider Address
if (window.location.href.indexOf("CaseServiceAuthorizationOverview.htm") > -1) {
    $('body').append('<div id="hiddenLoadDiv" style="display: none"></div>');
    let providerId = $('#providerInfoTable .selected td:eq(0)').html();
    function getCopay(caseNumber, periodRange) {
        $.get('/ChildCare/CaseCopayDistribution.htm?parm2=' + caseNumber + '&parm3=' + periodRange, function (result, status, json) {
            let dataObject = result.slice(result.indexOf("var data = eval('[")+18);
            dataObject = dataObject.substring(0, dataObject.indexOf("]');"));
            dataObject = dataObject.replace(/},{/g, "}splithere{");
            let copayData = dataObject.split("splithere");
            for (let i = copayData.length-1; i >= 0; i--) {
                let tempObject = JSON.parse(copayData[i]);
                if ($('#providerInfoTable>tbody>tr.selected>td:eq(0)').text() == tempObject.providerId) {
                    if (tempObject.version == $('#versionInDropdown').val()) {
                        $('#copayAmountGet').html(tempObject.copay.split(".")[0]);
                        billingFormInfo();
                    };
                };
            };
        });
    };
    function billingFormInfo() {
        let startDate = $('#selectPeriod').val().split(" ")[0];
        if ($('#copayAmountGet').html() == '') {
            $('#copayAmountGet').replaceWith('<input class="centered-text" style="height: 22px; width: 40px;" id="copayAmountManual"></input><a href="/ChildCare/CaseCopayDistribution.htm?parm1=' + $('#caseId').val() + '&parm2=' + $('#selectPeriod').val().replace(/\//g, '').split(' - ')[0] + $('#selectPeriod').val().replace(/\//g, '').split(' - ')[1] + '" target="_blank">Copay Page</a>');
            snackBar('Auto-retrieval of copay failed.', 10000)
            return
        };
        let childList = {};
        $('#childInfoTable tbody tr').each(function(index) {//child#.name:, child#.authHours:, child#.ageCat0:, child#.ageCat1:
            $('#childInfoTable tbody tr').click().eq([index]);
            childList["child" + index] = {};
            childList["child" + index].name = reorderCommaName( toTitleCase($(this).children('td').eq(1).text()) );
            childList["child" + index].authHours = $(this).children('td').eq(3).text();
            childList["child" + index].ageCat0 = $('#ageRateCategory').val();
            childList["child" + index].ageCat1 = $('#ageRateCategory2').val();
        });
        let caseNameBackwards = toTitleCase($('#caseHeaderData').children().prop('innerText').slice(5)).replace(/\b\w\b/,'').trim();//removes "Name:" and middle initial
        const formInfo = {
            pdfType:"BillingForm",
            xNumber:localStorage.getItem("MECH2.userIdNumber"),
            caseFirstName:getFirstName( $('#caseHeaderData').children().prop('innerText').slice(5) ),
            caseLastName:getLastName( $('#caseHeaderData').children().prop('innerText').slice(5) ),
            caseName:toTitleCase($('#caseHeaderData').children().prop('innerText').slice(5)),
            caseNumber:$('#caseId').val(),
            startDate:$('#selectPeriod').val().split(" - ")[0],
            endDate:$('#selectPeriod').val().split(" - ")[1],
            providerId:$('#providerInfoTable .selected td').eq(0).prop('innerHTML'),
            providerName:$('#providerInfoTable .selected td').eq(1).prop('innerHTML'),
            copayAmount:$('#copayAmountGet').html(),
            attendance0:new Date(startDate).toLocaleDateString('en-US', {year: "2-digit", month: "numeric", day: "numeric"}),
            attendance7:addDays(startDate, 7).toLocaleDateString('en-US', {year: "2-digit", month: "numeric", day: "numeric"}),
            ...childList
        };
        if (formInfo.copayAmount === '' || formInfo.copayAmount === undefined) {
            formInfo.copayAmount = $('#copayAmountManual').val();
        }
        window.open("http://nt-webster/slcportal/Portals/65/Divisions/FAD/IM/CCAP/index.html?parm1=" + JSON.stringify(formInfo), "_blank");
    };
    $('#csicTableData1').before(`
        <div style="overflow: auto" id="billingFormDiv">
        <div class="form-group centered-form-group">

        <button type="button" class="custom-button custom-button__floating centered-text" id="billingForm">Create Billing Form</button>
        <label for="copayAmount" class="control-label textR" style="height: 28px;"> Copay Amount: $</label>
        <button id="copayAmountGet" class="centered-text" style="width: 40px;"></button>
        <button type="button" class="custom-button custom-button__floating centered-text" id="providerAddressButton">Open Provider Address Page</button>
        <button type="button" class="custom-button custom-button__floating centered-text" id="copyProviderMailing">Test - Copy Provider Mailing Address</button>
        </div>
        </div>
    `);
    $('#billingForm').click(function() { getCopay($('#caseId').val(), $('#selectPeriod').val().replace(/\//g, '').split(' - ')[0] + $('#selectPeriod').val().replace(/\//g, '').split(' - ')[1]) })//getCopay activates billingFormInfo
    $('#copyProviderMailing').click(function() {
        console.log($('#providerInfoTable .selected td').eq(0).prop('innerHTML'))
    });
    $('#providerAddressButton').click(function() {
        window.open("/ChildCare/ProviderAddress.htm?providerId=" + $('#providerInfoTable .selected td').eq(0).prop('innerHTML'), "_blank");
    });
    //SUB-SECTION START Fix column classes
    $('.col-md-3.col-lg-2').removeClass('col-md-3').addClass('col-md-2')
};
//SECTION END Fill manual Billing PDF Forms, also nav to Provider Address

if (window.location.href.indexOf("CaseSpecialLetter.htm") > -1 || window.location.href.indexOf("ProviderSpecialLetter.htm") > -1 && !viewMode) {
    $('.panel.panel-default.panel-box-format').click(function(e) {
        let previousCheckbox = $(e.target).closest('label').prevAll('input[type="checkbox"]')
        if (e.target.tagName.toLowerCase() === "input" && $(e.target).closest('label').prevAll('input[type="checkbox"]').length) {
            e.target.closest('label').prevAll('input[type="checkbox"]').filter(function() { return $(this).prop('disabled') === false }).click()
        }
    })
    //$('input[type="checkbox"]~label')
    $('#caseData input#other').click(function() {
        if ($(this).prop('checked')) {
            $('#otherTextbox')
                .val('See Worker Comments below')
                .select()
        }
    })
    $('div.col-lg-offset-3').each(function() {
        $(this).children('label').prop("for", $(this).children('input.textInherit').prop('id'))
    })
    setTimeout(function() { $('div.col-lg-offset-3 > label[for="other"], #otherCommentsDiv').wrapAll('<div style="display: flex; align-items: center;" id="specLetterOther"></div>') }, 100)
    $('#status, #activity').on('input', function() { setTimeout(function() { resetTabIndex() }, 300) })
    // setTimeout(function() { $('label.collapse').removeClass('collapse') }, 1)
    //textnode of " &nbsp;&nbsp; " follows the other field
}

// if (window.location.href.indexOf("CaseSpecialLetter.htm") > -1 || window.location.href.indexOf("CaseMemo.htm") > -1) {
// }

//SECTION START CaseSpecialNeeds Column resizing
if (window.location.href.indexOf("CaseSpecialNeeds.htm") > -1) {
    $('.col-md-3, .col-lg-3').removeClass('col-md-3 col-lg-3').addClass('col-md-5 col-lg-5');
};
//SECTION END CaseSpecialNeeds Column resizing

//SECTION START CaseSpecialActivity Duplicate start date into end date for Ext Elig
if (window.location.href.indexOf("CaseSupportActivity.htm") > -1) {
	$('#activityBegin').blur(function() {
        if ($('#memberDescription').val() === "PE" || $('#memberDescription').val() === "NP") {//extended elig
            $('#activityEnd').val($('#activityBegin').val())
            doEvent("#activityEnd")
            $('#verification').val("Other")
            $('#planRequired').val("No")
            eleFocus('#save')
        } })
    $('strong:contains("before the first day")').length > 0 && $('#save').focus();
};
//SECTION END CaseSpecialActivity Duplicate start date into end date for Ext Elig

//SECTION START Close case transfer to x169CCA; Auto enter transfer info if have sessionStorage value; Add button to viewMode page to do transfer;
if (window.location.href.indexOf("CaseTransfer.htm") < 0) { (localStorage.setItem('MECH2.activelyTransferring','noThanks')) }//prevents accidental case transfer activity when loading that page
if (window.location.href.indexOf("CaseTransfer.htm") > -1) {
    // $('#footer_links').contents().each(function() { if (this.tagName !== 'A') { this.remove() } })
    $('#footer_links').append('&nbsp;&nbsp;|&nbsp;&nbsp;<a href="https://www.dhs.state.mn.us/main/idcplg?IdcService=GET_DYNAMIC_CONVERSION&RevisionSelectionMethod=LatestReleased&dDocName=dhs16_140754" target="_blank">Moving to New County</a>')
    $('div.col-lg-6:not(:has(*))').addClass('collapse') //Hide CaseTransfer empty div
    $('#caseTransferFromAllowedUREndsDate, #caseTransferFromAssignmentServicingEndsDate, #caseTransferFromVoid, #caseTransferFromTransferImmediately, #caseTransferToTransferEffectiveDate, #caseTransferToEarlyAcceptance, #caseTransferToName').prop('tabindex', '-1').addClass('tabindex-negative-one')

//Automatic case transfer section start
    if (localStorage.getItem('MECH2.activelyTransferring') === 'yesPlease') { doCaseTransfer() }
    function doCaseTransfer() {
        if (!viewMode) {
            $('#caseTransferFromType:contains("Worker To Worker")').val('Worker To Worker')
            doEvent('#caseTransferFromType')
            $('#caseTransferToWorkerId').val('X169CCA');
            doEvent('#caseTransferToWorkerId')
            localStorage.setItem('MECH2.activelyTransferring','noThanks');
            $('#save').click()
        } else { $('#new').click() };
    };

    if (localStorage.getItem('MECH2.doClose') === 'closeWindow' && localStorage.getItem('MECH2.activelyTransferring') === 'noThanks' && viewMode) {
        localStorage.setItem('MECH2.doClose','didClose');
        window.open('about:blank', '_self');
    };
//Automatic case transfer section end

    //Semi-manual transfer with a button
    function buttonClosedTransfer() {
        localStorage.setItem('MECH2.activelyTransferring','yesPlease');
        $('#new').click();
    };
    if (viewMode) { ($('#caseTransferToName').parents('.form-group').after('<div class="custom-button custom-button__floating centered-text" style="float: left;" id="closedTransfer">Transfer to X169CCA</div>')) }
    $('#closedTransfer').click(function() { buttonClosedTransfer() })
};
//SECTION END Close case transfer to x169CCA; Auto enter transfer info if have sessionStorage value; Add button to viewMode page to do transfer;


//SECTION START Navigation buttons to goto Eligibility Selection, Service Authorization Overview, and Case Overview from CaseWrapUp page
if (window.location.href.indexOf("CaseWrapUp.htm") > -1 && $('#done').attr('Disabled')) {
    let parm3var = '&parm3=' + document.getElementById('selectPeriod').value.replace(' - ', '').replaceAll('/','');
    $('#caseHeaderData').after(`<div>
    <div id="goEligibility" class="custom-button__nodisable custom-button__floating">Eligibility</div>
    <div id="goSAOverview" class="custom-button__nodisable custom-button__floating">SA Overview</div>
    <div id="goSAApproval" class="custom-button__nodisable custom-button__floating">SA Approval</div>
    <div id="goEditSummary" class="custom-button__nodisable custom-button__floating">Edit Summary</div>
    </div>`)
    $('#goEligibility').click(function() { window.open('/ChildCare/CaseEligibilityResultSelection.htm?parm2=' + $('#caseId').val() + parm3var, '_self') });
    $('#goSAOverview').click(function() { window.open('/ChildCare/CaseServiceAuthorizationOverview.htm?parm2=' + $('#caseId').val() + parm3var, '_self') });
    $('#goSAApproval').click(function() { window.open('/ChildCare/CaseServiceAuthorizationApproval.htm?parm2=' + $('#caseId').val() + parm3var, '_self') });
    $('#goEditSummary').click(function() { window.open('/ChildCare/CaseEditSummary.htm?parm2=' + $('#caseId').val() + parm3var, '_self') });
    eleFocus('#goEligibility')
};
//SECTION END Navigation buttons to goto Eligibility Selection, Service Authorization Overview, and Case Overview from CaseWrapUp page

//SECTION START Fixing the table height of the Client Search table
if (window.location.href.indexOf("ClientSearch.htm") > -1) {
    if ($("#clientSearchProgramResults").prop('clientHeight') > 400) { $(".dataTables_scrollBody").height('400px') }
    $(".dataTables_scrollBody").css('max-height','650px').css('resize','vertical')
    $('#clientSearchTable>tbody').click(function() { eleFocus('#selectBtnDuplicateButton') })
};
//SECTION START Fixing the table height of the Client Search table

//SECTION START FinancialAbsentDayHolidayTracking
if (window.location.href.indexOf("FinancialAbsentDayHolidayTracking.htm") > -1) {
    $('#dayType').parents('.form-group').addClass('col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12')
    $('#selectedDate').parents('.form-group').unwrap()
}
//SECTION END

//SECTION START FinancialBilling Fix to display table, edit h4 for billing worker
if (window.location.href.indexOf("FinancialBilling.htm") > -1) {
    $('#billingRegistrationFeesTable_wrapper').parent().removeClass('col-lg-4 col-md-4').addClass('col-lg-5 col-md-5')
    $('#carryBilledAmountsForward').parents('.form-group').removeClass('form-group').addClass('col-md-11 col-lg-11').append($('#calculate').parent())
    $('#carryBilledAmountsForward').parents('.col-lg-8').removeClass('col-lg-8 col-md-8').addClass('col-lg-7 col-md-7')
    $('#addBilledTime').parent().removeClass('col-lg-3 col-md-3 col-sm-3').addClass('col-lg-5 col-md-5')
    $('#totalAmountBilled').parents('.col-lg-12').append($('#addBilledTime').parent())
    $('#addRegistrationFee').parent().unwrap()
    $('label[for="registrationFee"]').parent().removeAttr('style').unwrap().css('align-self','center')
    $('label[for="totalAmountAllowed"]').parent().removeAttr('style').css('display','flex').css('flex-wrap','wrap').css('align-content','center')
    addGlobalStyle('.table { margin-bottom: 7px !important; }');
    addGlobalStyle('.form-control.borderless.padL0.padR0 { padding: 0px !important; }');
    $('#carryBilledAmountsForward').parent().add($('#carryBilledAmountsForward').closest('.col-lg-11')).prop('style', 'display: flex; align-items: center; gap: 1rem;')
    document.getElementById('billingRegistrationFeesTable_wrapper').parentNode.previousElementSibling.classList.remove('clearfix');
    if (!viewMode) {
        $('#billedTimeTableData').parent().keydown(function(e) {
            if (e.target.id === "billedTimeRate" && e.code === 'enter') { $('#addBilledTime').click() }
            else if (e.target.id === "billedTimeType" && e.code === 'tab' && e.target.value === '') { eleFocus('#weekOneMonday')} })
        setTimeout(function() {
            let childAndProviderNames = "for " + getFirstName($('#billingChildTable>tbody>tr.selected>td:eq(1)').html())/* + " " + getLastName($('#billingChildTable>tbody>tr.selected>td:eq(1)').html())*/ + " at " + $('#billingProviderTable>tbody>tr.selected>td:eq(0)').html()
            $('h4:not(h4:contains("Version Information"))').each(function() {
                $(this).html($(this).html() + ' ' + childAndProviderNames)
            })
        }, 100)
        if ($('strong:contains("Warning: Rate entered")').length > 0) { $('#saveDuplicateButton').click() }
        function addBillingRows(changedId) {
            let weekOneDays = [parseInt($('#weekOneMonday').val()), parseInt($('#weekOneTuesday').val()), parseInt($('#weekOneWednesday').val()), parseInt($('#weekOneThursday').val()), parseInt($('#weekOneFriday').val()), parseInt($('#weekOneSaturday').val()), parseInt($('#weekOneSunday').val())]
            let weekTwoDays = [parseInt($('#weekTwoMonday').val()), parseInt($('#weekTwoTuesday').val()), parseInt($('#weekTwoWednesday').val()), parseInt($('#weekTwoThursday').val()), parseInt($('#weekTwoFriday').val()), parseInt($('#weekTwoSaturday').val()), parseInt($('#weekTwoSunday').val())]
            let $whichBilledWeek = changedId.indexOf("weekOne") > -1 ? $('#totalHoursBilledWeekOne') : $('#totalHoursBilledWeekTwo')
            let weekDaysChanged = changedId.indexOf("weekOne") > -1 ? weekOneDays : weekTwoDays
            $whichBilledWeek.val(weekDaysChanged.reduce((partialSum, a) => partialSum + a, 0))//adds up array
            parseInt($('#totalHoursBilledWeekOne').val()) + parseInt($('#totalHoursBilledWeekTwo').val()) > parseInt($('#totalHoursOfCareAuthorized').val()) ? $('#totalHoursBilledWeekOne, #totalHoursBilledWeekTwo, #totalHoursOfCareAuthorized').addClass('red-outline') : $('#totalHoursOfCareAuthorized, #totalHoursBilledWeekOne, #totalHoursBilledWeekTwo').removeClass('red-outline')
        }
        $('table').click(function(e) {
            if (e.target.tagName.toLowerCase() === "input") { e.target.select() }
        })
        $('table:has(#weekOneMonday)').keyup(function(e) {
            console.log(e.target.value)
            if (e.target.id.indexOf('week') === 0) {
                if (e.target.value !== 0 && e.target.value !== '') { addBillingRows(e.target.id) }
                else if (e.target.value === '') { e.target.value = 0 }
            }
        })
    }
};
//SECTION END FinancialBilling Fix to display table

//SECTION START FinancialBillingApproval button to add comments
if (window.location.href.indexOf("FinancialBillingApproval.htm") > -1 && !viewMode) {
    $('#remittanceComments').parents('.form-group').append('<div id="unpaidCopayNote" class="custom-button__nodisable custom-button__floating"">Unpaid Copay</div>');
    $('#unpaidCopayNote').click(function() { $('#userComments').val('Copay is unpaid, provider did not indicate if there is a payment plan.') })
    $('#remittanceComments').parents('.form-group').append('<div id="paymentPlanNote" class="custom-button__nodisable custom-button__floating flex-right">Payment Plan</div>');
    $('#paymentPlanNote').click(function() { $('#userComments').val('Provider indicated there is a payment plan for the unpaid copay.') })
};
//SECTION END FinancialBillingApproval button to add comments

//SECTION START Adding clearfix class to 'row' on FinancialManualPayment because they didn't do form-groups or anything that they did on the rest of the site
if (window.location.href.indexOf("FinancialManualPayment.htm") > -1) {
    $('.row').addClass('clearfix');
    $('div.col-xl-9.col-lg-9.col-md-9.col-sm-9.col-xs-9.form-group.textInherit').removeClass('col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9')
    $('#childrenTableAddChildArea>col-lg-8').removeClass('col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8')
    $('div.col-lg-1').addClass('toLabel centered-right-label').height('28','px')
    $('.row>.col-lg-5~.col-lg-7').removeClass('col-lg-7').addClass('col-lg-6')
    $('.row>.col-lg-5').removeClass('col-lg-5').addClass('col-lg-6')
    $('#serviceTableAddServiceArea label.col-lg-3').removeClass('col-lg-3').addClass('col-lg-4')
    $('#mpSelectBillingPeriod').parent().removeClass('col-lg-8').addClass('col-lg-7')
    $('#childrenTableAddChildArea>.form-group').removeClass('col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 form-group')
    $('label[for="mpChildRefNumToAdd"]').removeClass('col-lg-4').addClass('col-lg-3')
    $('label[for="mpChildRefNumToAdd"]~div').removeClass('col-lg-7').addClass('col-lg-6')
    $('#childrenTableAddChildArea .row~.row>.col-lg-4').removeClass('col-lg-4').addClass('col-lg-3')
    $('#childrenTableAddChildArea .row~.row input, #serviceTableAddServiceArea>.col-lg-8 input').unwrap()
};
//SECTION END Adding clearfix class to 'row' on FinancialManualPayment because they didn't do form-groups or anything that they did on the rest of the site

//SECTION START Close case transfer to x169CCA; Changing dates to links
if (window.location.href.indexOf("InactiveCaseList.htm") > -1) {
    $('#footer_links').before('<iframe id="transferiframe" name="transferiframe" height="300px" width=' + $(".panel.panel-default").width() + '></iframe>');
    //blarg dark-scheme causes a white background, not sure how to resolve
    let todayDate = new Date().getTime();
    $('#inActiveCaseTable tbody tr').children('td:nth-of-type(4)').each(function() {
        let closedDatePlus46 = addDays($(this).text(), 46).getTime();
        if (closedDatePlus46 < todayDate) {
            let linkText = $(this).text();
            $(this).text('');
            $(this).append('<a class="oldClosed" id=' + $(this).siblings().eq(0).text() + ' href="CaseTransfer.htm?parm2=' + $(this).siblings().eq(0).text() + '", target="_blank">' + linkText + '</a>');
            $(this).append('<span style="display: inline-block; margin-left: 15px;">-> CCA</span>');
        };
    });
    document.getElementById('inActiveCaseTable').onclick = function(event) {
        if (event.target.closest('span')?.tagName.toLowerCase() === 'span') {transferSingleClosed(event.target.closest('span').previousElementSibling)}
    }
    function transferSingleClosed(ele) {
        localStorage.setItem('MECH2.activelyTransferring', 'yesPlease');
        localStorage.setItem('MECH2.doClose','closeWindow');
        $(ele).parents('tr').hide();
        window.open('/ChildCare/' + (ele).attr('href'), 'transferiframe');
    };
    const oldClosedArray = Array.from(document.querySelectorAll('.oldClosed'), (caseNumber) => caseNumber.id)
    function transferAllClosed() {
        addEventListener('storage', function(key, newValue) {
            if (oldClosedArray.length > 0 && event.key === 'MECH2.doClose' && event.newValue === 'didClose') { caseTransferEvent() }
        })
        caseTransferEvent()
    }
    function caseTransferEvent() {
        localStorage.setItem('MECH2.activelyTransferring', 'yesPlease');
        localStorage.setItem('MECH2.doClose','closeWindow');
        window.open('/ChildCare/CaseTransfer.htm?parm2=' + oldClosedArray[0], 'transferiframe');
        oldClosedArray.shift()
    }
    $('#workerSearch').parents('.col-lg-12').append('<button type="button" id="transferAllClosed" class="custom-button__floating custom-button flex-right">Transfer All Old Closed</button>')
    $('#transferAllClosed').click(function() { transferAllClosed() });
};
//SECTION END Close case transfer to x169CCA; Changing dates to links

//SECTION START Fix lastUpdateWorker/CaseWorker offsets
if (window.location.href.indexOf("lastUpdateWorker.htm") > -1 || window.location.href.indexOf("CaseWorker.htm") > -1) {
    $('.panel-box-format input~input').removeClass('col-md-offset-2').addClass('col-lg-offset-2 col-md-offset-3');
    $('input[id$="Email"]').width('300','px')
};
    //SECTION END Fix lastUpdateWorker offsets

    //SECTION START Login page fix
if (window.location.href.indexOf("Login.htm") > -1) {
    $('#terms').prop('style','')
}

    //SECTION START ProviderAddress Default values for Country, State, County
if (window.location.href.indexOf("ProviderAddress.htm") > -1) {
    if (viewMode) {
        function removeNoEntryRows() {
            $('#providerData :is(input, select):not(#mailingZipCodePlus4, #mailingSiteHomeZipCodePlus4)').filter(function() { return this.value === '' }).closest('.form-group').addClass('collapse noEntry')
        }
        removeNoEntryRows()
        $('table').click(function() {
            $('.noEntry').removeClass('collapse noEntry')
            removeNoEntryRows()
        })
    }
    // $('div.col-lg-1:contains("-")').addClass('collapse')
    if (!viewMode) {
        if ($('#mailingSiteHomeCountry').val() === '') {
            $('#mailingSiteHomeCountry').val('USA').addClass('prefilled-field')
            $('#mailingSiteHomeState').val('Minnesota').addClass('prefilled-field')
            $('#mailingSiteHomeCounty').val('St. Louis').addClass('prefilled-field')
        }
        $('#mailingCountry').change(function() {
            if (('#mailingState').val() === '') {
                ('#mailingState').val('Minnesota').addClass('prefilled-field')
            }
        })
    }
    //SECTION END ProviderAddress Default values for Country, State, County
    //SECTION START ProviderAddress Copy Provider mailto Address
    $('#providerInput').append('<div class="custom-button custom-button__floating centered-text flex-right" id="copyMailing">Billing Form Address to Clipboard</div>');
    $('#copyMailing').click(function() {
        // copyMailing() });
        if ($('#addrBillFormDisplay').val() == "Site/Home") {
            let state = swapStateNameAndAcronym(document.getElementById('mailingSiteHomeState').value)
            //let state = (document.getElementById('mailingSiteHomeState').value === "Minnesota") ? "MN":"WI";
            let copyText = $('#providerData').children(0).contents().eq(4).text() + "\n" + document.getElementById('mailingSiteHomeStreet1').value + " " + document.getElementById('mailingSiteHomeStreet2').value + "\n" + document.getElementById('mailingSiteHomeCity').value + ", " + state + " " + document.getElementById('mailingSiteHomeZipCode').value
            navigator.clipboard.writeText(copyText);
            snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        } else {
            let state = swapStateNameAndAcronym(document.getElementById('mailingState').value)
            //let state = (document.getElementById('mailingState').value === "Minnesota") ? "MN":"WI";
            let copyText = $('#providerData').children(0).contents().eq(4).text() + "\n" + document.getElementById('mailingStreet1').value + " " + document.getElementById('mailingStreet2').value + "\n" + document.getElementById('mailingCity').value + ", " + state + " " + document.getElementById('mailingZipCode').value
            navigator.clipboard.writeText(copyText);
            snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        };
    });
};
function copyMailing() {
    let providerName = (window.location.href.indexOf("CaseServiceAuthorizationOverview.htm") > -1) ? $('label[for="providerName"]').parent().contents().eq(4).text().trim() : $('#providerInfoTable>tbody>tr.selected>td:eq(1)').html().trim()
    if ($('#addrBillFormDisplay').val() == "Site/Home") {
        let state = swapStateNameAndAcronym(document.getElementById('mailingSiteHomeState').value)
        let copyText = providerName + "\n" + document.getElementById('mailingSiteHomeStreet1').value + " " + document.getElementById('mailingSiteHomeStreet2').value + "\n" + document.getElementById('mailingSiteHomeCity').value + ", " + state + " " + document.getElementById('mailingSiteHomeZipCode').value
        navigator.clipboard.writeText(copyText);
        snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    } else {
        let state = swapStateNameAndAcronym(document.getElementById('mailingState').value)
        let copyText = providerName + "\n" + document.getElementById('mailingStreet1').value + " " + document.getElementById('mailingStreet2').value + "\n" + document.getElementById('mailingCity').value + ", " + state + " " + document.getElementById('mailingZipCode').value
        navigator.clipboard.writeText(copyText);
        snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    };
}
    //SECTION END ProviderAddress Copy Provider mailto Address

    //SECTION START Fix multiple CSS issues on ProviderInformation
if (window.location.href.indexOf("ProviderInformation.htm") > -1) {
    $('.col-md-10').removeClass('col-md-10').addClass('col-md-4');
    $('#providerData>div.col-lg-4').addClass('col-md-4');
    $('.col-lg-3.col-md-3.textInherit').removeClass('col-md-3').addClass('col-md-4')
    $('.col-lg-12.col-md-3.col-sm-12.col-xs-12.textInherit').removeClass('col-md-3').addClass('col-md-12');
    $('.col-lg-2.col-md-3.control-label.textR.marginTop10.textInherit').removeClass('col-md-3').addClass('col-md-2');
    $('.col-lg-1.col-md-1.col-sm-1.textL.visible-lg.visible-md').remove();
    $('label.col-lg-1.col-md-2').removeClass('col-lg-1').addClass('col-lg-2');
    addGlobalStyle('input, select { margin-bottom: 3px !important; margin-top: 3px !important; }');
    function fixProvInfoLabels() {
        $('div.col-lg-12>label').add('div.visible-lg>label').each( function() {
            let $nextInput = $(this).parent().nextAll('.col-md-4.textInherit').eq(0);//.col-lg-3
                $(this).height($nextInput.prop('clientHeight'));
            //};
        });
    };
};
//SECTION END

//SECTION START
if (window.location.href.indexOf("ProviderLicense.htm") > -1) {
    $('.col-lg-6.col-md-8.col-sm-10.col-xs-12').removeClass('col-lg-6 col-md-8 col-sm-10 col-xs-12').addClass('col-lg-6 col-md-6');
    $('.col-lg-5.col-md-5').removeClass('col-md-5 col-lg-5').addClass('col-md-6 col-lg-6');
}
//SECTION END
//SECTION START
if (window.location.href.indexOf("ProviderNotices") > -1) {
    if ($('#remove').length && $('#providerNoticesSearchData>tbody>tr>td').text() !== "No records found") {
        function addRemDisabled(event) {
            if ($('#cancel').attr('disabled') === 'disabled' && event.tagName?.toLowerCase() === "td" && $(event).siblings().addBack().last().text().indexOf("Waiting") > -1 ) { $('#cancel').removeAttr('disabled'); $('#resend').attr('disabled', 'disabled') }//says waiting, cancel is disabled: disable resend, remove disable cancel;
            else if ($('#resend').attr('disabled') === 'disabled' && event.tagName?.toLowerCase() === "td" && $(event).siblings().addBack().last().text().indexOf("Waiting") < 0) { $('#resend').removeAttr('disabled'); $('#cancel').attr('disabled', 'disabled') }//doesn't say waiting, disable cancel, remove disable resend;
        }
        addRemDisabled(document.querySelector('tr.selected>td'))
        $('#providerNoticesSearchData').click(function() { addRemDisabled(event.target) })
    }
}
//SECTION END
//
if (window.location.href.indexOf("ProviderOverview.htm") > -1) {
    $('div.col-lg-3').removeClass('col-lg-3 col-md-3').addClass('col-md-2 col-lg-2');
    $('div.textInherit.col-md-2.col-lg-2:not(.padL0)').removeClass('col-md-2 col-lg-2').addClass('col-lg-4 col-md-4');
    $('h4:contains("Provider Information")').css('display','table')
};
if (window.location.href.indexOf("getProviderOverview") > -1) {
    $('#providerButtons').click()
    $('#ProviderOverviewSelf').addClass('custom-button__nav__open-page')
}

//SECTION START Auto-filter ProviderSearch results
if (window.location.href.indexOf("ProviderSearch.htm") > -1) {
    $('.dataTables_scrollBody').css('resize','vertical').css('max-height', '700px')
    const localCounties = ['St. Louis','Carlton','Itasca','Lake'];
    waitForElmValue('#providerSearchTable > tbody > tr > td').then(() => {
        $('tbody tr:contains("Inactive")').addClass('inactive inactive-hidden')
        $('tbody tr td:last-of-type').each(function() {
            if (!localCounties.includes($(this).text())) {
                $(this).parent('tr')
                    .addClass('out-of-area out-of-area-hidden')
            };
        });
    });
    if ($('#providerIdNumber').val().length === 0) { addGlobalStyle('.inactive-hidden, .out-of-area-hidden { display: none; }') }//only hide if not searching for Provider ID
    $('#back').after('<div class="button-row__nav"><div id="inactiveToggle" class="custom-button__floating custom-button">Toggle Inactive</div><div id="outOfAreaToggle" class="custom-button__floating custom-button">Toggle Out of Area</div></div>');
    $('#inactiveToggle').click(function() { $('.inactive').toggleClass('inactive-hidden'); $('.dataTables_scrollBody').css('height',''); });
    $('#outOfAreaToggle').click(function() { $('.out-of-area').toggleClass('out-of-area-hidden'); $('.dataTables_scrollBody').css('height',''); });
    waitForElmHeight('#providerSearchTable > tbody > tr').then(() => { if ($('tbody>tr:not(tbody>tr[class$="hidden"])').length) { $('tbody>tr:not(tbody>tr[class$="hidden"])').eq(0).click() } } )
};
//SECTION END Auto-filter ProviderSearch results

if (window.location.href.indexOf("ProviderSpecialLetter.htm") > -1) {
    $('label:not([class])').each(function() {
        $(this).attr('for', $(this).children('input.checkbox[type="checkbox"]').attr('id'))
        $(this).children('input').prependTo($(this).parent())
    })
    $('.col-lg-offset-3.col-lg-9').removeClass('col-lg-9 checkbox')
}

//SECTION START ProviderRegistrationAndRenewal Fix to display table
if (window.location.href.indexOf("ProviderRegistrationAndRenewal.htm") > -1) {
    document.getElementById('providerData').classList.add('clearfix');
    if (viewMode) {
        if ($('#providerRegistrationAndRenewalTable>tbody>tr:contains("St. Louis County")').length > 0) {
            $('#providerRegistrationAndRenewalTable>tbody>tr:contains("St. Louis County")').click()
            eleFocus('#editDuplicateButton')
        } else { eleFocus('#newDuplicateButton') }
    } else { eleFocus('#nextRenewalDue') }
}
//SECTION END ProviderRegistrationAndRenewal Fix to display table.

// if (window.location.href.indexOf("Provider") < 0 && $('#comments, #memberComments, #textbox2').length > 0) { $('#comments, #memberComments, #textbox2, #wcTextbox, #textbox1').prop('rows','15').css('height','') };
if (["FinancialClaimNotices.htm","ProviderMemo.htm","CaseMemo.htm","ProviderSpecialLetter.htm", "CaseSpecialLetter.htm"].includes(thisPageNameHtm)) {
    $('#comments, #memberComments, #textbox2, #wcTextbox, #textbox1').prop('rows','15').css('height','')//blarg
    // if (!viewMode) {
        $('textarea').wrap('<div class="textarea_wrapper">')
    // }
}

if (window.location.href.indexOf("ProviderTaxInfo.htm") > -1) {
    $('#validateTaxIdButton').parent().removeClass('col-xs-12 col-sm-12 col-md-12 col-md-offset-2 col-lg-12 col-lg-offset-2').addClass('col-lg-offset-3 col-md-offset-3');
    $('label.col-lg-2').removeClass('col-lg-2 col-md-2').addClass('col-lg-3 col-md-3');
    // $('label:contains("-")').addClass('collapse')
};

//SECTION START ServicingAgencyOutgoingTransfers column fixes
if (window.location.href.indexOf("ServicingAgencyOutgoingTransfers.htm") > -1) {
    $('label[for="transferImmediately"]').removeClass('col-lg-3').addClass('col-lg-2').parent('.form-group').attr('style','')
    $('label[for="voidEffectiveDate"]').removeClass('col-lg-3').addClass('col-lg-4')
};
//SECTION END ServicingAgencyOutgoingTransfers column fixes

//SECTION START WorkerSearch simple fix as one row has 14 out of 12 columns, so they gave each element its own percentage instead of grouping labels and inputs into sub-columns
if (window.location.href.indexOf("WorkerSearch.htm") > -1) { $('#workerSearchData, input#return').unwrap() }
//SECTION START WorkerSearch simple fix as one row has 14 out of 12 columns, so they gave each element its own percentage instead of grouping labels and inputs into sub-columns

/* DIVIDER /////////////////////////////////////////////////////// PAGE SPECIFIC CHANGES SECTION END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */

/* DIVIDER ///////////////////////////////////////////////////////////// FUNCTIONS SECTION START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */

//jQuery datePicker options (calendar)
try {
$.datepicker.setDefaults({
    numberOfMonths: 3,
    showCurrentAtPos: 1,//0 index
    stepMonths: 2,
    maxDate: "+2y",
    //duration: "slow",//appearance speed
})
} catch(e) {
    console.log("Datepicker setDefaults", e)
}
//
const stateData = {
    AZ: 'Arizona',
    AL: 'Alabama',
    AK: 'Alaska',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'District of Columbia',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
    AS: "American Samoa",
    GU: "Guam",
    MP: "Northern Mariana Islands",
    PR: "Puerto Rico",
    VI: "U.S. Virgin Islands",
    UM: "U.S. Minor Outlying Islands",
}
function acronymToStateName(acronym) {
  return stateData[acronym] ?? acronym
}
function stateNameToAcronym(stateName) {
return Object.keys(stateData).find((key) => stateData[key] === stateName) ?? stateName
}
function swapStateNameAndAcronym(stateInfo) {
return Object.keys(stateData).find((key) => stateData[key] === stateInfo) ?? stateData[stateInfo]
}

function autoOpenOnPaste() {
    if (document.querySelector('#caseInputSubmit, #submitProviderId') !== null) {
        document.querySelector('#caseInput>#caseId, #providerInput>#providerId').addEventListener('paste', function(event) {
            try {
                event.stopPropagation()
                setTimeout(function() {
                event.target.value = event.target.value.trim()
                    if ( (/^[0-9]+$/).test(event.target.value.trim()) > 0 ) { document.querySelector('#caseInputSubmit, #submitProviderId').click() }
                },1)
            } catch(error) { console.log(error) }
        })
    }
}
autoOpenOnPaste()

function addGlobalStyle(css) { //To allow for adding CSS styles
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};
//
function addCommaSpace(value) {
return String(value)
    .replace(/,([^0-9])/g, ", $1")
}
//
function tableCapitalize(tableName) {
    ($('#' + tableName + '>tbody>tr>td').filter( ":nth-child(2)" )).each(function() {
        $(this).text($(this).text().toLowerCase())
        $(this).addClass('capitalize')
    })
}
//
function toTitleCase(value, ...excludedWordList) {
    let hasDigits = new RegExp("[^a-zA-Z]")
    const exceptions = excludedWordList
    .flat(Infinity)
    .map(item => String(item).trim())
    .join('\\b|\\b');
    return String(value)
    // console.log(String(value).trim().replace(/\s+/g, ' '))
    .trim()
    .replace(/\s+/g, ' ')
    .replace(
      RegExp(`\\b(?!\\b${ exceptions }\\b)(?<upper>[\\w])(?<lower>[\\w]+)\\b`, 'g'),
      (match, upper, lower) => `${ upper.toUpperCase() }${ lower.toLowerCase() }`,
    )
}
if (!["ProviderNotes.htm","CaseNotes.htm","CaseCSE.htm","CaseCSIA.htm","Alerts.htm"].includes(thisPageNameHtm)) {
    $('td:not(:has(*)):not(thead *):not(:contains(" of "))').each(function() {
            $(this).text( addCommaSpace( $(this).text() ) )
            $(this).text( toTitleCase( $(this).text(), allCapsWords ) )
    })
}
//
function setIntervalLimited(callback, interval, x) {
    for (var i = 0; i < x; i++) {
        setTimeout(callback, i * interval);
    };
};
/*
//Usage
setIntervalLimited(function() {
    console.log('hit');          //=> hit...hit...etc (every second, stops after 10)
}, 1000, 10);
*/
//SECTION START Wait for something to be available //https://stackoverflow.com/a/61511955
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        };
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            };
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};
function waitForElmValue(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector).innerText !== "0") {
            return resolve(document.querySelector(selector));
        };
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector).innerText !== "0") {
                resolve(document.querySelector(selector));
                observer.disconnect();
            };
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};
function waitForElmHeight(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector).offsetHeight > 0) {
            return resolve(document.querySelector(selector));
        };
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector).offsetHeight > 0) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            };
        });
        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true
        });
    });
};
//

/* To use waitForElm:
    waitForElm('.some-class').then((elm) => {
        console.log('Element is ready');
        console.log(elm.textContent);
    });
Or with async/await:
    const elm = await waitForElm('.some-class'); */
//SECTION END Wait for something to be available

//Add a class to divs following labels that have no children (text only) - :empty does not work as text is a child for :empty
$('label').next('div').each(function() {
    if ($(this).children().length === 0) {
        $(this).addClass('onlyDivChild')
    }
})
//
function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
//
function reorderCommaName(commaName) {
    let caseNameBackwards = toTitleCase(commaName).replace(/\b\w\b/,'').trim();
    let caseName = caseNameBackwards.split(",")[1].trim() + " " + caseNameBackwards.split(",")[0].replace(/,/,'')
    return caseName
};
//
function getFirstName(commaName) {
    let caseNameBackwards = toTitleCase(commaName).replace(/\b\w\b/,'').trim();
    let firstName = caseNameBackwards.split(",")[1].trim()
    return firstName
};
//
function getLastName(commaName) {
    let caseNameBackwards = toTitleCase(commaName).replace(/\b\w\b/,'').trim();
    let lastName = caseNameBackwards.split(",")[0].replace(/,/,'')
    return lastName
};
//
$('tr').attr('tabindex','-1')
//window.addEventListener('mouseup', function(e) {console.log(document.activeElement)})
// window.addEventListener('keydown', function(e) {//use keyboard up/down to navigate table;//doesn't work, stays on one element
//     if (e.code === 'ArrowDown' && e.target.tagName === 'TR') {
//         e.preventDefault()
//         console.log($(e.target))
//         if ($(e.target).next('tr').length) {$(e.target).next('tr').click()}
//     }
// })

//
// window.addEventListener('keydown', function(e) {//Don't scroll when using spacebar to click buttons
//   if (e.code === 'Space' && (e.target.className.includes('custom-form-button') || e.target.className.includes('custom-button__floating'))) {
//     e.preventDefault();
//   }
// });
//
$('html').css('scroll-behavior','smooth')
window.addEventListener('keydown', function(e) {//Smooth scroll to bottom with End
  if (!e.shiftKey && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      switch (e.code) {
          case 'End':
              e.preventDefault()
              document.querySelector('#footer_info').scrollIntoView()
              break
          case 'Home':
              e.preventDefault()
              document.querySelector('#greenline').scrollIntoView()
              break
      }
  }
});
//
window.addEventListener('keydown', function(e) {//Save with Ctrl+S
  if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      $('#save').click()
  }
});
//

$('body').append('<div id="snackBar" class="snackbar" style="display: none"></div>');
function snackBar(innerText, timeout=3000) {
    $('#snackBar').html(innerText)
    $('#snackBar').toggle();
    setTimeout(function(){ $('#snackBar').toggle(); }, timeout);
};
//

//SECTION START Fix where and how Update Date and Update User are displayed
function fixUpdateDateAndUpdateUser() {
    let $updateDate = $('input[name="updateDate"][type="text"]:last');
    let $updateParent = $updateDate.parent();
    $updateParent
        .addClass('updateParent').end()
        .children('input').width('11ch').end()
        .children('a').width('9ch');
    let $updateSiblings = window.location.href.indexOf("CaseNotes") > -1 ? $('#storage').parent() : $updateParent.siblings('div');//button div
    $updateSiblings.prop('class','clearfix').addClass('updateSiblings').removeClass('col-md-8 col-lg-8 col-md-7 col-lg-7 col-xs-7 col-sm-7');
    $updateSiblings.find('input.form-button').addClass('form-button-margins');
    $updateSiblings.eq(0).append($updateSiblings.eq(1).children()).addClass('native-button-home');//move second row of buttons (if exist) to first row
    $updateDate.parents().eq(2).append('<div class="form-group clearfix" id="updateHome"></div>');//new div to end of *PanelsData div
    $('#updateHome').append($updateParent);
    $('.native-button-home').contents().filter(function() { return this.nodeType === 3 }).each(function() { this.textContent = this.textContent.trim() });//trim spaces
};
fixUpdateDateAndUpdateUser();
//SECTION START Fix where and how Update Date and Update User are displayed

//SECTION START Reverses Period options order, makes most recent visible
function selectPeriod() {
	let checkForId = document.getElementById("selectPeriod");
	if(checkForId) {
		$('#selectPeriod option').each(function () {
			$(this).prependTo($(this).parent());
		});
	};
};
selectPeriod();
//SECTION END Reverses Period options order, makes most recent visible

//SECTION START Next/Prev buttons next to period drop down
function nextPrevPeriodButtons() {
    if (reviewingEligibility || window.location.href.indexOf("CaseApplicationInitiation.htm") > -1 || $('#submit').attr('disabled') === 'disabled') { return }
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
            btnNavigation.tabIndex = '-1';
            btnNavigation.type = 'button';
            btnNavigation.dataset.NextOrPrev = buttonsNextPrev[i][2]
            btnNavigation.dataset.StayOrGo = buttonsNextPrev[i][3]
            btnNavigation.className = 'custom-button next-prev-period-button'
            if (buttonsNextPrev[i][2] === 'Prev') {
                selectPeriodParent.insertBefore(btnNavigation, selectPeriodDropdown)
            } else {
                selectPeriodParent.insertBefore(btnNavigation, selectPeriodDropdown.nextSibling)
            }
        };
        document.getElementById('selectPeriod').parentNode.onclick = function(event) {
            if (event.target.closest('button')?.tagName.toLowerCase() === 'button') { selectNextPrev(event.target.closest('button').id) }
        }
        function selectNextPrev(clickedButton) { //Subtracting goes up/forward dates;
            if (document.getElementById(clickedButton).dataset.NextOrPrev === "Next") {
                if (selectPeriodDropdown.selectedIndex === 0) { return } //do nothing if at top list item;
                selectPeriodDropdown.selectedIndex--;
                if (document.getElementById(clickedButton).dataset.StayOrGo === "Go") { document.getElementById('caseInputSubmit').click() }
            } else {
                selectPeriodDropdown.selectedIndex++;
                if (document.getElementById(clickedButton).dataset.StayOrGo === "Go") { document.getElementById('caseInputSubmit').click() }
            }
            if (selectPeriodDropdown.selectedIndex === 0) { $('button[id^="forward"]').addClass('custom-button__disabled') }
            else { $('button[id^="forward"]').removeClass('custom-button__disabled') }
        };
    };
};
nextPrevPeriodButtons()
//SECTION END Next/Prev buttons next to period drop down

//SECTION START No timing out, resets sessionStartTime every 61 seconds
function keepAlive() {
    localStorage.setItem('mec2.sessionStartTime', new Date().getTime());
};
setInterval(keepAlive, 61000);//61 seconds, /1000
//SECTION END No timing out, resets sessionStartTime every 61 seconds

//SECTION START Login assistance - clicks Terms box, remembers last used login name
function loginAssistance() {
    if (document.getElementById("loginDetail") !== null) {
        let userXNumber = localStorage.getItem('MECH2.userIdNumber');
        document.getElementById("userId").value = userXNumber;
        document.getElementById("terms").click();
        document.getElementById("password").focus();
        addEventListener('beforeunload', (event) => {
            if (document.getElementById("userId").value != '') {
                let enteredUserId = document.getElementById("userId").value
                localStorage.setItem('MECH2.userIdNumber', enteredUserId)
            };
        });
    };
};
loginAssistance();
//SECTION END Login assistance - clicks Terms box, remembers last used login name

//SECTION START Remove spaces as margins after labels
function sanitizeLabels() {//js due to text nodes
    let labelSpSp = document.getElementsByTagName('label');
    for (let i = 0; i < labelSpSp.length; i++) {
        if (labelSpSp[i].previousSibling && labelSpSp[i].previousSibling.nodeType == 3) {
            labelSpSp[i].previousSibling.textContent = labelSpSp[i].previousSibling.textContent.replaceAll(/\s{2,}/g, '')
        };
        if (labelSpSp[i].nextSibling && labelSpSp[i].nextSibling.nodeType == 3) {
            labelSpSp[i].nextSibling.textContent = labelSpSp[i].nextSibling.textContent.replaceAll(/\s{2,}/g, '')
        };
    };
};
sanitizeLabels();
//SECTION END Remove spaces as margins after labels

//SECTION START Make labels the same height as their next neighbor
$( window ).on( "load", function() {
    $('label').each( function() {
        if ($(this).next().prop('clientHeight') > 2 && $(this).next().prop('clientHeight') < 40) {
            $(this).height($(this).next().height());
        };
    });
});
//SECTION END Make labels the same height as their next neighbor

//SECTION START Duplicate buttons above H1 row
if (window.location.href.indexOf("ctiveCaseList.htm") < 0 && window.location.href.indexOf("ProviderSearch.htm") < 0 && window.location.href.indexOf("CaseLockStatus.htm") < 0) {
    $('.modal .form-button').addClass('modal-button');//popup buttons
    $('table').click(function() {//check on table click if buttons were enabled/disabled and use class to mirror
        $('.mutable').each(function() {
            let oldButtonId = $(this).prop('id').split('DuplicateButton')[0];
            if ($('#' + oldButtonId).prop('disabled')) {
                $(this).addClass('custom-form-button__disabled').prop('tabindex', '-1');
            } else {
                $(this).removeClass('custom-form-button__disabled').prop('tabindex', '0');
            };
        });
    });
    $('.form-button:not([style*="display: none"], [id$="Business"], [id$="Person"], .panel-box-format input.form-button, .modal-button, #workerSearch, #contactInfo, #providerIdSubmit, #ratePeriodSelectButton, #validateCertificationButton, #resetCertButton, #validateLicenseButton, #resetLicButton, #selectFra, #caseSearch, #providerSearch, #caseInputSubmit, #alertInputSubmit, #search, #reset, #changeType, #storage, #addRegistrationFee, #deleteRegistrationFee, #addBilledTime, #deleteBilledTime, #calculate, #cappingInfo, #calcAmounts, .custom-button, .custom-button__floating, .doNotDupe').each(function() {
        if ($(this).val()) {
            let disabledStatus = $(this).prop('disabled') ? '" class="form-button custom-form-button custom-form-button__disabled centered-text mutable" tabindex="-1"' : '" class="form-button custom-form-button centered-text mutable" tabindex="0';
            let idName = $(this).prop('id') + "DuplicateButton";
            $('#dupeButtonHouse').append('<button id="'+ idName + disabledStatus + '">' + $(this).val() + '</button>');
        };
    })
    $('#dupeButtonHouse').children().length === 0 && ($('#dupeButtonHouse').hide());
    $('#dupeButtonHouse').click(function(e) {
        e.preventDefault()
        // if ( e.target.classList.contains('mutable') ) { document.getElementById(e.target.id.slice(0, -15)).click() }
        if ( e.target.classList.contains('mutable') ) { $('#' + e.target.id.slice(0, -15)).click() }
    })
};
//SECTION END Buttons above H1 row

if (window.location.href.indexOf("CaseWrapUp") > -1) {
    if ($('.rederrortext').text() == 'Case Wrap-Up successfully submitted.') {
        $('#dupeButtonHouse').hide();
    };
};
//SECTION START Retract drop-down menu on page load
$('.sub_menu').css('visibility', 'hidden');
//SECTION END Retract drop-down menu on page load

viewMode && ($('[id="Report a Problem"]').children().attr('target','_blank'));//Make 'Report a Problem' open in new tab

//SECTION START Removing items from the tabindex
$('#footer_links, #footer_info, #popup').children().prop('tabindex', '-1')
$('#quit, #countiesTable #letterChoice, #reset').prop('tabindex', '-1') //quit, countiesTable=application; redet date, eEE=activity pages; cIS=submit button; lC=specialletter; reset=caseNotes; tempLeave = activities; defer=redet
$('#leaveDetailTemporaryLeavePeriodFrom, #leaveDetailTemporaryLeavePeriodTo, #leaveDetailExtendedEligibilityBegin, #tempLeavePeriodBegin, #tempLeavePeriodEnd, #extendedEligibilityBegin, #extendedEligibilityExpires, #redeterminationDate, #tempPeriodStart, #tempPeriodEnd, #deferValue').prop('tabindex', '-1').addClass('tabindex-negative-one');//EmploymentActivity, SupportActivity
if (window.location.href.indexOf("ProviderSearch.htm") > -1) { ($('#ssn, #itin, #fein, #licenseNumber, #middleInitName').prop('tabindex', '-1').addClass('tabindex-negative-one')) }
$('#leaveDetailRedeterminationDue, #leaveDetailExpires').prop('tabindex','-1').addClass('tabindex-negative-one')
$('#caseInputSubmit, #caseId, #selectPeriod, td').prop('tabindex', '-1');
//SECTION END Removing items from the tabindex

//SECTION START Post load changes to the page
// $('label').removeClass('control-label textR textInherit').addClass('centered-right-label')
$('label:has(+textarea, +output, +select, +input, +div:has(select, input))').removeClass('control-label textR textInherit').addClass('centered-right-label')
$('h1').parents('div.row').addClass('h1-parent-row');
$(".marginTop5").removeClass("marginTop5" );
$(".marginTop10").removeClass("marginTop10" );
$(".padding-top-5px").removeClass("padding-top-5px" );
$('.col-lg-offset-3').addClass('col-md-offset-3');
$('.col-lg-3.col-md-2.col-sm-2.control-label.textR.textInherit').removeClass('col-md-2').addClass('col-md-3');
// $('div[id*="ZipDash"]').add($('div[id*="ZipDash"]').next()).add($('input[id*="ZipCodePlus4"]')).add($('input[id*="zipCodePlus4"]')).add($('div, label').filter(function() {return /^-$/.test($(this).text())})).addClass('collapse');
$('div[id*="ZipDash" i]').add($('div, label').filter(function() {return /^-$/.test($(this).text())})).add($('div[id*="ZipDash" i]').next()).add($('input[id*="ZipCodePlus4" i]')).addClass('collapse');
$('.col-xs-3.col-sm-3.col-md-3.col-lg-1').removeClass('col-md-3').addClass('col-md-1');
//SECTION END Post load changes to the page

/* DIVIDER ///////////////////////////////// FUNCTIONS SECTION END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ */
if (!viewMode /*|| $('.prefilled-field, .tabindex-negative-one, .required-field').length */&& $(':is(#next, #previous):not([disabled="disabled"])').length < 1 && $('div.row > div > h1').length) {
    let preFilledFields = '<div class="prefilled-field" id="preFilledFields">Pre-Filled</div>'
    let notTabbableFields = '<div class="tabindex-negative-one" id="notTabbableFields">Not tabbable</div>'
    let requiredFields = '<div class="required-fields" id="requiredFields">Required</div>'
    $('h1').parent().after('<div class="auto-fill-formatting col-lg-4 col-md-4">' + preFilledFields + notTabbableFields + requiredFields + '<div>')
    // $('h1').parent().after('<div class="auto-fill-formatting col-lg-4 col-md-4"> <div id="preFilledFields"> <div id="notTabbableFields"> <div id="requiredFields"> <div>')
    $('#worker').parent().removeClass('col-lg-6 col-md-6').addClass('col-lg-2 col-md-2')
    //!viewMode && ( $('h4:eq(0)').after('<div class="auto-fill-formatting"> <div id="preFilledFields"> <div id="notTabbableFields"> <div id="requiredFields"> <div>') )
}
//Check for specific class changes
// function showOutlineLegend() {
// if ($('.prefilled-field, .tabindex-negative-one, .required-field').length) { $('.auto-fill-formatting').removeClass() }
// }
//
setTimeout(function() {
    window.dispatchEvent(new Event('resize'))
    $('buttonPanelOneNTF>*').removeAttr('tabindex')
},200)//fixes table headers being wrongly sized due to the container size change in ReStyle
})();
