// ==UserScript==
// @name         MEC2Buttons
// @namespace    http://github.com/jbmccormick
// @version      0.83.2
// @description  Add navigation buttons to MEC2 to replace the drop down hover menus
// @author       MECH2
// @match        mec2.childcare.dhs.state.mn.us/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jbmccormick/MEC2Web/master/MEC2Buttons.user.js
// ==/UserScript==

(function() {
    'use strict';
document.getElementsByTagName('body')[0].id = 'override'
$('br').remove();
let viewMode = $('#page-wrap').length;
document.getElementsByClassName("line_mn_green")[0].id = "greenline"
let primaryPanelID = document.getElementById("page-wrap") ? document.getElementById("page-wrap") : document.getElementById("greenline");
$(primaryPanelID).after('<div id="navButtonHouse" class="button-house nav-button-house"><div class="button-row" id="buttonPaneOne"></div><div class="button-row" id="buttonPaneTwo"></div><div class="button-row" id="buttonPaneThree"></div></div><div id="dupeButtonHouse" class="button-house dupe-button-house"></div>');
$('#dupeButtonHouse').siblings('br').remove();
let buttonDivOne = document.getElementById('buttonPaneOne');
let buttonDivTwo = document.getElementById('buttonPaneTwo');
let buttonDivThree = document.getElementById('buttonPaneThree');
let searchIcon = "<span class='icon' style='font-size:80%;'>&#128269</span>";//🔍	128269	1F50D
let thisPageName = window.location.pathname.substring(window.location.pathname.indexOf("/ChildCare/") + 11, window.location.pathname.lastIndexOf("."));
if (primaryPanelID.id == "greenline") {
	addGlobalStyle('.custom-button { color: DarkGrey; cursor: no-drop; padding: 3px 4px; margin: 1px; border: 2px solid; border-radius:4px; }');
	addGlobalStyle('.custom-button-plus { border-left: 0; margin-left:-7px; border-top-left-radius:0; border-bottom-left-radius:0; }');
	addGlobalStyle('.custom-button:hover { background-color: #DAF7A6; }');
	addGlobalStyle('.custom-button-clicked { background-color: #A6EDF7; }');
	addGlobalStyle('.panel.panel-default { margin-top: 0px !important; }');
};

`/////////////////////////////////////////////////////////////////////////////////////////////////// EARLY EVENTS SECTION START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ `

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
`/////////////////////////////////////////////////////////////////////////////////////////////////// EARLY EVENTS SECTION end \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/////////////////////////////////////////////////////////////////////////////////////////////////// NAVIGATION BUTTONS SECTION START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ `

//SECTION START Declaring navigation button arrays
const gotoButtons = [ //Goto Buttons, ["Name as it appears on a button","gotoPageName", "_self or _blank", "Id of parent", "Id of Button'],
    ["Alerts","Alerts", "_self", "Alerts", "AlertsSelf"],
    ["+","Alerts", "_blank", "Alerts", "AlertsBlank"],
	["Notes","CaseNotes", "_self", "Case Notes", "CaseNotesSelf"],
	["+","CaseNotes", "_blank", "Case Notes", "CaseNotesBlank"],
    ["Overview","CaseOverview", "_self", "Case Overview", "CaseOverviewSelf"],
    ["Summary","CasePageSummary","_self","Page Summary","CasePageSummarySelf"],
    ["Client "+searchIcon, "ClientSearch", "_self", "Client Search", "ClientSearchSelf"],
    ["+", "ClientSearch", "_blank", "Client Search", "ClientSearchBlank"],
    ["Provider "+searchIcon,"ProviderSearch", "_self", "Provider Search", "ProviderSearchSelf"],
    ["+","ProviderSearch", "_blank", "Provider Search", "ProviderSearchBlank"],
	["Active","ActiveCaseList", "_self", "Active Caseload List", "ActiveCaseListSelf"],
	["+","ActiveCaseList", "_blank", "Active Caseload List", "ActiveCaseListBlank"],
	["Pending","PendingCaseList", "_self", "Pending Case List", "PendingCaseListSelf"],
	["+","PendingCaseList", "_blank", "Pending Case List", "PendingCaseListBlank"],
	["Inactive","InactiveCaseList", "_self", "Inactive Case List", "InactiveCaseListSelf"],
	["+","InactiveCaseList", "_blank", "Inactive Case List", "InactiveCaseListBlank"],
    ["New App","CaseApplicationInitiation","_self","Case Application Initiation","NewAppSelf"],
    ["+","CaseApplicationInitiation","_blank","Case Application Initiation","NewAppBlank"],
];
const mainRowButtons = [ //   Main Row buttons, ["Name as it appears on a button","mainRowButtonsId"],
    ["Member","memberMainButtons", "_self"], //Member A
    ["Case","caseButtons", "_self"],
	["Activity and Income","activityIncomeButtons", "_self"], //Act & $
    ["Eligibility","eligibilityButtons", "_self"], //Elig
    ["SA","saButtons", "_self"],
    ["Notices","noticesButtons","_self"],
    ["Provider Info","providerButtons",""],
    ["Billing","billingButtons",""],
    ["CSI","csiButtons",""],
    ["Transfer","transferButtons",""],
    ["Claims","claimsButtons",""],
];
const rowThreeButtonArray = {
	memberMainButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		caseMemberi:["Member I","CaseMember", "_self", "Member", "CaseMemberSelf", "memberMainButtons"],
		caseMemberii:["Member II","CaseMemberII", "_self", "Member II", "CaseMemberIISelf", "memberMainButtons"],
		caseParent:["Parent","CaseParent", "_self", "Parent", "CaseParentSelf", "memberMainButtons"],
		caseCse:["CSE","CaseCSE", "_self", "Child Support Enforcement", "CaseCSESelf", "memberMainButtons"],
		caseSchool:["School","CaseSchool", "_self", "School", "CaseSchoolSelf", "memberMainButtons"],
		caseProvider:["Provider","CaseChildProvider", "_self", "Child Provider", "CaseChildProviderSelf", "memberMainButtons"],
		caseSpecialNeeds:["Special Needs", "CaseSpecialNeeds", "_self", "Special Needs", "CaseSpecialNeedsSelf", "memberMainButtons"],
		caseDisability:["Disability", "CaseDisability", "_self", "Disability", "CaseDisabilitySelf", "memberMainButtons"],
		caseFraud:["Fraud", "CaseFraud", "_self", "Case Fraud", "CaseFraudSelf", "memberMainButtons"],
		caseImmigration:["Immigration", "CaseImmigration", "_self", "Immigration", "CaseImmigrationSelf", "memberMainButtons"],
		caseAlias:["Alias", "CaseAlias", "_self", "Case Alias", "CaseAliasSelf", "memberMainButtons"],
		caseRemoveMember:["Remove", "CaseRemoveMember", "_self", "Remove a Member", "CaseRemoveMemberSelf", "memberMainButtons"],
		caseMemberHistory:["History","CaseMemberHistory", "_self", "Member History", "CaseMemberHistorySelf", "memberMainButtons"],
		caseMemberHistoryPlus:["+","CaseMemberHistory", "_blank", "Member History", "CaseMemberHistoryBlank", "memberMainButtons"],
	},
	activityIncomeButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		caseEarnedIncome:["Earned", "CaseEarnedIncome", "_self", "Earned Income", "CaseEarnedIncomeSelf", "activityIncomeButtons"],
		caseUnearnedIncome:["Unearned", "CaseUnearnedIncome", "_self", "Unearned Income", "CaseUnearnedIncomeSelf", "activityIncomeButtons"],
		caseLumpSumIncome:["Lump Sum", "CaseLumpSum", "_self", "Lump Sum", "CaseLumpSumSelf", "activityIncomeButtons"],
		caseExpensesIncome:["Expenses", "CaseExpense", "_self", "Expenses", "CaseExpensesSelf", "activityIncomeButtons"],
		caseEducationActivity:["Education", "CaseEducationActivity", "_self", "Education Activity", "CaseEducationActivitySelf", "activityIncomeButtons"],
		caseEmploymentActivity:["Employment", "CaseEmploymentActivity", "_self", "Employment Activity", "CaseEmploymentActivitySelf", "activityIncomeButtons"],
		caseSupportActivity:["Support", "CaseSupportActivity", "_self", "Support Activity", "CaseSupportActivitySelf", "activityIncomeButtons"],
		caseJobSearchTracking:["Job Search", "CaseJobSearchTracking", "_self", "Job Search Tracking", "CaseJobSearchTrackingSelf", "activityIncomeButtons"],
	},
	caseButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		editSummary:["Edit Summary","CaseEditSummary","_self", "Edit Summary", "CaseEditSummarySelf", "caseButtons"],
		caseAddress:["Address", "CaseAddress", "_self", "Case Address", "CaseAddressSelf", "caseButtons"],
		caseAction:["Case Action", "CaseAction", "_self", "Case Action", "CaseActionSelf", "caseButtons"],
		caseFunding:["Funding Availability", "FundingAvailability", "_self", "Funding Availability", "FundingAvailabilitySelf", "caseButtons"],
		caseRedetermination:["Redetermination", "CaseRedetermination", "_self", "Case Redetermination", "CaseRedeterminationSelf", "caseButtons"],
		caseAppInfo:["Application Info", "ApplicationInformation", "_self", "Case Application Info", "CaseApplicationInfoSelf", "caseButtons"],
		caseReinstate:["Reinstate", "CaseReinstate", "_self", "Reinstate", "CaseReinstateSelf", "caseButtons"],
		caseLockStatus:["Lock Status", "CaseLockStatus", "_self", "Case Lock Status", "CaseLockStatus", "caseButtons"],
	},
	eligibilityButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		eligibilitySelection:["Selection","CaseEligibilityResultSelection", "_self", "Eligibility Results Selection", "CaseEligibilityResultSelectionSelf", "eligibilityButtons"],
		eligibilityOverview:["Overview","CaseEligibilityResultOverview", "_self", "Results Overview", "CaseEligibilityResultOverviewSelf", "eligibilityButtons"],
		eligibilityFamily:["Family","CaseEligibilityResultFamily", "_self", "Family Results", "CaseEligibilityResultFamilySelf", "eligibilityButtons"],
		eligibilityPerson:["Person","CaseEligibilityResultPerson", "_self", "Person Results", "CaseEligibilityResultPersonSelf", "eligibilityButtons"],
		eligibilityActivity:["Activity","CaseEligibilityResultActivity", "_self", "Activity Results", "CaseEligibilityResultActivitySelf", "eligibilityButtons"],
		eligibilityFinancial:["Financial","CaseEligibilityResultFinancial", "_self", "Financial Results", "CaseEligibilityResultFinancialSelf", "eligibilityButtons"],
		eligibilityApproval:["Approval","CaseEligibilityResultApproval", "_self", "Approval Results", "CaseEligibilityResultApprovalSelf", "eligibilityButtons"],
		eligibilityCreateResults:["Create Eligibility Results","CaseCreateEligibilityResults", "_self", "Create Eligibility Results", "CaseCreateEligibilityResultsSelf", "eligibilityButtons"],
	},
	saButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		saOverview:["Overview","CaseServiceAuthorizationOverview", "_self", "Service Authorization Overview", "CaseServiceAuthorizationOverviewSelf", "saButtons"],
		saCopay:["Copay","CaseCopayDistribution", "_self", "Copay Distribution", "CaseCopayDistributionSelf", "saButtons"],
		saApproval:["Approval","CaseServiceAuthorizationApproval", "_self", "Service Authorization Approval", "CaseServiceAuthorizationApprovalSelf", "saButtons"],
		saCreateResults:["Create SA", "CaseCreateServiceAuthorizationResults", "_self", "Create Service Authorization Results", "CaseCreateServiceAuthorizationResultsSelf", "saButtons"],
	},
    csiButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		csiA:["CSIA", "CaseCSIA", "_self", "CSIA", "CSIAself", "csiButtons"],
		csiB:["CSIB", "CaseCSIB", "_self", "CSIB", "CSIBself", "csiButtons"],
		csiC:["CSIC", "CaseCSIC", "_self", "CSIC", "CSICself", "csiButtons"],
		csiD:["CSID", "CaseCSID", "_self", "CSID", "CSIDself", "csiButtons"],
	},
	noticesButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		caseNotices:["Notices", "CaseNotices", "_self", "Case Notices", "CaseNoticesSelf", "noticesButtons"],
		caseSpecialLetter:["Special Letter", "CaseSpecialLetter", "_self", "Case Special Letter", "CaseSpecialLetterSelf", "noticesButtons"],
		caseMemo:["Memo", "CaseMemo", "_self", "Case Memo", "CaseMemoSelf", "noticesButtons"],
	},
	billingButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		financialBilling:["Billing", "FinancialBilling", "_self", "Billing", "FinancialBillingSelf", "billingButtons"],
		financialBillingApproval:["Billing Approval", "FinancialBillingApproval", "_self", "Billing Approval", "FinancialBillingApprovalSelf", "billingButtons"],
		financialBillsList:["Bills List", "BillsList", "_self", "Bills List", "BillsListSelf", "billingButtons"],
		financialPayHistory:["Payment History","CasePaymentHistory", "_self", "Case Payment History", "CasePaymentHistorySelf", "billingButtons"],
		financialAbsentDays:["Absent Days", "FinancialAbsentDayHolidayTracking", "_self", "Tracking Absent Day Holiday", "FinancialAbsentDayHolidayTrackingSelf", "billingButtons"],
		financialRegistrationFee:["Registration Fee Tracking", "FinancialBillingRegistrationFeeTracking", "_self", "Tracking Registration Fee", "FinancialBillingRegistrationFeeTrackingSelf", "billingButtons"],
		financialManualPayments:["Manual Payments", "FinancialManualPayment", "_self", "Manual Payments", "FinancialManualPaymentSelf", "billingButtons"],
	},
	providerButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		providerOverview:["Overview","ProviderOverview", "_self", "Provider Overview", "ProviderOverviewSelf", "providerButtons"],
        providerNotes:["Notes","ProviderNotes", "_self", "Provider Notes", "ProviderNotesSelf", "providerButtons"],
		providerInformation:["Info", "ProviderInformation", "_self", "Provider Information", "ProviderInformationSelf", "providerButtons"],
		providerAddress:["Address", "ProviderAddress", "_self", "Provider Address", "ProviderAddressSelf", "providerButtons"],
		providerNotices:["Notices", "ProviderNotices", "_self", "Provider Notices", "ProviderNoticesSelf", "providerButtons"],
		providerParentAware:["Parent Aware", "ProviderParentAware", "_self", "Parent Aware", "ProviderParentAwareSelf", "providerButtons"],
		providerAccreditation:["Accreditation", "ProviderAccreditation", "_self", "Accreditation", "ProviderAccreditationSelf", "providerButtons"],
		providerTraining:["Training", "ProviderTraining", "_self", "Training", "ProviderTrainingSelf", "providerButtons"],
		providerRates:["Rates", "ProviderRates", "_self", "Rates", "ProviderRatesSelf", "providerButtons"],
		providerLicense:["License", "ProviderLicense", "_self", "License", "ProviderLicenseSelf", "providerButtons"],
		providerAlias:["Alias", "ProviderAlias", "_self", "Provider Alias", "ProviderAliasSelf", "providerButtons"],
		providerRegistrationAndRenewal:["Registration", "ProviderRegistrationAndRenewal", "_self", "Registration Renewal", "ProviderRegistrationSelf", "providerButtons"],
        providerTaxInfo:["Tax", "ProviderTaxInfo", "_self", "Tax Info", "ProviderTaxInfoSelf", "providerButtons"],
        providerPaymentHistory:["Payment History", "ProviderPaymentHistory", "_self", "Provider Payment History", "ProviderPaymentHistory", "providerButtons"],
	},
	transferButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		caseTransfer:["Case Transfer", "CaseTransfer", "_self", "Case Transfer", "CaseTransferSelf", "transferButtons"],
		incomingTransfer:["Incoming", "ServicingAgencyIncomingTransfers", "_blank", "Incoming Transfers", "ServicingAgencyIncomingTransfersSelf", "transferButtons"],
		outgoingTransfer:["Outgoing", "ServicingAgencyOutgoingTransfers", "_blank", "Outgoing Transfers", "ServicingAgencyOutgoingTransfersSelf", "transferButtons"],
		financialClaimTransfer:["Claim Transfer", "FinancialClaimTransfer", "_blank", "Claim Transfer", "FinancialClaimTransferSelf", "transferButtons"],
	},
	claimsButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		claimEstablishment:["Establishment", "FinancialClaimEstablishment", "_blank", "Claim Establishment", "FinancialClaimEstablishmentBlank", "claimsButtons"],
		claimDetails:["Details", "FinancialClaimMaintenanceAmountDetails", "_self", "Maintenance Details", "FinancialClaimMaintenanceAmountDetailsSelf", "claimsButtons"],
		claimSummary:["Summary", "FinancialClaimMaintenanceSummary", "_self", "Maintenance Summary", "FinancialClaimMaintenanceSummarySelf", "claimsButtons"],
		claimOverpaymentText:["Overpayment Text", "FinancialClaimNoticeOverpaymentText", "_self", "Overpayment Text", "FinancialClaimNoticeOverpaymentTextSelf", "claimsButtons"],
		claimNotes:["Notes", "FinancialClaimNotes", "_self", "Claim Notes", "FinancialClaimNotesSelf", "claimsButtons"],
		claimNotices:["Notices", "FinancialClaimNotices", "_self", "Claim Notices History", "FinancialClaimNoticesSelf", "claimsButtons"],
		claimMaintenanceCase:["Maint-Case", "FinancialClaimMaintenanceCase", "_self", "Maintenance Case", "FinancialClaimMaintenanceCaseSelf", "claimsButtons"],
		claimMaintenancePerson:["Maint-Person", "FinancialClaimMaintenancePerson", "_self", "Maintenance Person", "FinancialClaimMaintenancePersonSelf", "claimsButtons"],
		claimMaintenanceProvider:["Maint-Provider", "FinancialClaimMaintenanceProvider", "_self", "Maintenance Provider", "FinancialClaimMaintenanceProviderSelf", "claimsButtons"],
	},
	/*etc:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		:["", "", "_self", "", "", ""],
	},
*/
};
//SECTION END Declaring navigation button arrays

//SECTION START Placing navigation buttons on the page
for(let i = 0; i < gotoButtons.length; i++){ //creating buttons for each program area
	let btnNavigation = document.createElement('button');
	btnNavigation.innerHTML = gotoButtons[i][0];
    btnNavigation.dataset.pageName = gotoButtons[i][1]
    if (primaryPanelID.id === "page-wrap") {
        btnNavigation.dataset.howToOpen = gotoButtons[i][2]
    } else {
        btnNavigation.dataset.howToOpen = "_blank";//if edit mode, buttons won't go anywhere;
    };
	btnNavigation.dataset.pageLinkUsingId = [gotoButtons[i][3]]
    btnNavigation.id = gotoButtons[i][4];
	btnNavigation.type = 'button';
    if (gotoButtons[i][0] == "+")
    {
        btnNavigation.className = 'custom-button custom-button-plus';
    } else {
        btnNavigation.className = 'custom-button';
    };
	buttonDivOne.appendChild(btnNavigation);
};
    buttonDivOne.onclick = function(event) {//sends the gotoButtons array value 4 to gotoPage
        if (event.target.closest('button')?.tagName?.toLowerCase() === 'button' && !(["FieldNotesNT", "FieldOverviewNT"]).includes(event.target.closest('button').id)) {
            gotoPage(event.target.closest('button').id)
        }
    }
for(let i = 0; i < mainRowButtons.length; i++){
    if (primaryPanelID.id === "greenline") { break };
	let btnNavigation = document.createElement('button');
	btnNavigation.innerHTML = mainRowButtons[i][0];
	btnNavigation.id = mainRowButtons[i][1];
	btnNavigation.type = 'button';
    btnNavigation.className = 'custom-button';
    btnNavigation.tabIndex = 0
	buttonDivTwo.appendChild(btnNavigation);
};
    buttonDivTwo.onclick = function(event) {//sends the mainRowButtons array value 1 to btnRowThree
        btnRowThree(event.target.closest('button').id)
    }
//SECTION END Placing navigation buttons on the page

//SECTION START Reactive row three from click or page load
function btnRowThree(rowTwoButtonClicked) {
    if (primaryPanelID.id === "greenline") { return };
    while (buttonDivThree.firstChild) {
            buttonDivThree.removeChild(buttonDivThree.lastChild);
    };
    buttonClicked();
    document.getElementById([rowTwoButtonClicked]).classList.add("custom-button-clicked");
    let tempArray = Object.keys(rowThreeButtonArray[rowTwoButtonClicked]);
    for(let i = 0; i < tempArray.length; i++){
        let buttonArray = rowThreeButtonArray[rowTwoButtonClicked][tempArray[i]];
        let btnNavigation = document.createElement('button');
        btnNavigation.innerHTML = [buttonArray[0]];
        btnNavigation.dataset.pageName = [buttonArray[1]]
        btnNavigation.dataset.howToOpen = [buttonArray[2]]
		btnNavigation.dataset.pageLinkUsingId = [buttonArray[3]]
        btnNavigation.id = buttonArray[4];
        btnNavigation.type = 'button';
        btnNavigation.tabIndex = 0
        if (buttonArray[0] == "+") {
            btnNavigation.className = 'custom-button custom-button-plus';
        } else {
            btnNavigation.className = 'custom-button';
        };
        buttonDivThree.appendChild(btnNavigation);
    };
    buttonDivThree.onclick = function(event) {
        gotoPage(event.target.closest('button').id)
    }
    traverseOnRowTwoClick(rowThreeButtonArray[rowTwoButtonClicked]);
};
//SECTION END Reactive row three from click or page load

//SECTION START Using Id from button click to load href of associated element
function gotoPage(loadThisPage) {
    if (primaryPanelID.id == "greenline") {
        return
    };
    let getLinkUsingId = document.getElementById(`${loadThisPage}`);
    if (primaryPanelID.id == "greenline") { window.open("/ChildCare/"`${loadThisPage}`, "_blank"); };
    window.open(document.getElementById(getLinkUsingId.dataset.pageLinkUsingId).firstElementChild.href, document.getElementById(`${loadThisPage}`).dataset.howToOpen);
};
//SECTION END Using Id from button click to load href of associated element

//SECTION START Highlight row 2 buttons
function buttonClicked(){
$('.custom-button-clicked').removeClass('custom-button-clicked');
};
function traverseOnPageLoad(o) {
    if (primaryPanelID.id == "greenline") { return };
    for (let i in o) {
        if (o[i] == thisPageName) {
            btnRowThree(o[5]);
            if (document.getElementsByClassName('custom-button-clicked')) {
                document.getElementById([o[4]]).classList.add('custom-button-clicked');
            };
            return;
        };
        if (o[i] !== null && typeof(o[i])=="object") {
            traverseOnPageLoad(o[i]);
        };
    };
};
function traverseOnRowTwoClick(o) {
    for (let i in o) {
        if (o[i] == thisPageName) {
            document.getElementById([o[4]]).classList.add('custom-button-clicked');
            return;
        };
        if (o[i] !== null && typeof(o[i])=="object") {
            traverseOnRowTwoClick(o[i]);
        };
    };
};
traverseOnPageLoad(rowThreeButtonArray)
//SECTION END Highlight row 2 buttons

//SECTION START Create text field and buttons for case number to open in new tab
const openNotesOrOverview = [ // ["button innerHTML", "PageName", "ButtonID"]
    ["Notes", "CaseNotes", "FieldNotesNT"],
    ["Overview", "CaseOverview", "FieldOverviewNT"],
];
function newTabFieldButtons() { //Text field to enter a case number to open in a new tab
    let buttonDivOne = document.getElementById("buttonPaneOne");
    let newTabFieldVar = document.createElement('input');
    newTabFieldVar.id = 'newTabField'
    newTabFieldVar.type = 'text'
    newTabFieldVar.maxlength = '8'
    newTabFieldVar.size = '8'
    buttonDivOne.appendChild(newTabFieldVar);
        for(let i = 0; i < openNotesOrOverview.length; i++){
            let buttonDivOne = document.getElementById("buttonPaneOne");
            let btnNavigation = document.createElement('button');
            btnNavigation.type = 'button';
            btnNavigation.innerHTML = [openNotesOrOverview[i][0]]
            btnNavigation.dataset.pageName = [openNotesOrOverview[i][1]]
            btnNavigation.id = [openNotesOrOverview[i][2]];
            btnNavigation.className = 'custom-button';
            btnNavigation.addEventListener("click", function() { openCaseNumber(this.dataset.pageName)});
            buttonDivOne.appendChild(btnNavigation);
        };
};
function openCaseNumber(e) {
    const enteredCaseNumber = document.getElementById('newTabField').value;
    if (e == "CaseNotes") {
        window.open('/ChildCare/CaseNotes.htm?parm2=' + enteredCaseNumber, '_blank');
    } else {
        window.open('/ChildCare/CaseOverview.htm?parm2=' + enteredCaseNumber, '_blank');
    };
};
newTabFieldButtons();
$('#newTabField').keydown(function(e) {
    if (e.keyCode === 78)
    {
        e.preventDefault();
        window.open('/ChildCare/CaseNotes.htm?parm2=' + $('#newTabField').val(), '_blank');
    } else if (e.keyCode === 79) {
        e.preventDefault();
        window.open('/ChildCare/CaseOverview.htm?parm2=' + $('#newTabField').val(), '_blank');
    }
})
!viewMode && ($('#buttonPaneTwo, #buttonPaneThree').hide());
//SECTION END Create text field and buttons for case number to open in new tab
`///////////////////////////////////////////////////////////////////////////// NAVIGATION BUTTONS SECTION END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\










//////////////////////////////////////////////////////////////////////////// PAGE SPECIFIC CHANGES SECTION START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ `
const allCapsWords = ["MN", "DHS", "WI", "HC", "FS", "MFIP", "DWP", "CCAP", "CCMF", "BSF", "TY", "MAXIS", "PRISM", "TSS", "SW", "SE", "NW", "NE", "APT", "STE", "USA", "PRI", "MEC2", "FEIN", "SSN", "MX", "CC", "SLC"];
$('.dataTables_wrapper').parent('.form-group').removeClass('form-group')
//Seasonal items, just for fun
$('h1').prepend('<span class="icon">🌻 </span>');
let $toLabel = $('label').filter(function() { return $(this).text() === 'to' || $(this).text() === 'to:' }).addClass('toLabel');//Making "to" between x to y elements smaller
$('strong:contains("."):not([class="modal-message"]:not(:last-child))').after('<br>')//Breaking up multiple Warning/Edit Summary messages.

//$('#caseInput').prepend($('label[for="caseHeaderName"]').parent().contents());//move case name up a line - need to fix dependent functions first
//$('#caseHeaderData').remove();

//SECTION START Focusing the first desired element on pages
function eleFocus(ele) {
    $(document).ready(function() {
        setTimeout(function() {
            $(ele).addClass('focusedElement')
            $('.focusedElement').focus()
        }, 200);
    });
};
//SUB-SECTION START All pages - popup menu
if ($('#confirmPopup, #addChildConfirmPopup').length > 0) {
    const observer = new MutationObserver(function(e) {
        //if style == display: block {
        eleFocus('#confirmButtons>#confirm')
        for (const d of e) {
            const controllerModal = new AbortController()
            if (d.target.style.display === 'block') {
                window.addEventListener('keydown', function(e) {
                    switch (e.code) {
                        case 'KeyO':
                            e.preventDefault()
                            $('#confirmButtons').children('input').eq(0).click()
                            break
                        case 'KeyC':
                            e.preventDefault()
                            $('#confirmButtons').children('input').eq(1).click()
                            $('#cancelOperation').click()
                            break
                    }
                }, { signal: controllerModal.signal })
            } else { controllerModal.abort() }
        }
        //keydown Y, N
        //underline Y(es) N(o)
    })
    if ($('#confirmPopup').length > 0) { observer.observe(document.querySelector('#confirmPopup'), {attributeFilter: ['style']}) }
    if ($('#addChildConfirmPopup').length > 0) { observer.observe(document.querySelector('#addChildConfirmPopup'), {attributeFilter: ['style']}) }
}
if ($('#providerInput>#providerId').length > -1 && $('#providerInput>#providerId').val() === '') { eleFocus('#providerId') }
if ($('#caseId').val() === '') { eleFocus('#caseId') }
//SUB-SECTION START Activity and Income tab pages
if (window.location.href.indexOf("CaseEarnedIncome.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('#memberReferenceNumberNewMember').length > 0) { eleFocus('#memberReferenceNumberNewMember') }
    else { $('#ceiPrjAmount').select() } }
if (window.location.href.indexOf("CaseUnearnedIncome.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#memberReferenceNumberNewMember') }
if (window.location.href.indexOf("CaseLumpSum.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#memberReferenceNumberNewMember') }
if (window.location.href.indexOf("CaseExpense.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#refPersonName') }
if (window.location.href.indexOf("Activity.htm") > -1) {//education: activityPeriodStart, activityPeriodEnd; employment: employmentActivityBegin, employmentActivityEnd; support: activityBegin, activityEnd
    let memberRefField = $('#memberReferenceNumberNewMember').length ? ('#memberReferenceNumberNewMember') : ('#pmiNbrNew')
    let startDateField = $('#activityBegin').length ? ('#activityBegin') : $('#employmentActivityBegin').length ? ('#employmentActivityBegin') : ('#activityPeriodStart')
    let endDateField = $('#activityBegin').length ? ('#activityEnd') : $('#employmentActivityBegin').length ? ('#employmentActivityEnd') : ('#activityPeriodEnd')
    console.log(startDateField)
    console.log(endDateField)
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('strong:contains("Warning: This data will expire")').length) { eleFocus('#saveDuplicateButton') }
    else { $(startDateField).val().length > 0 ? eleFocus(endDateField) : eleFocus(memberRefField) } }
if (window.location.href.indexOf("CaseJobSearchTracking.htm") > -1) { viewMode ? eleFocus('#editDuplicateButton') : '' }

//SUB-SECTION START Member tab pages
if (window.location.href.indexOf("CaseMember.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('#next').length > 0) { eleFocus('#next') }
    else { eleFocus('#memberReferenceNumberNewMember') } }
if (window.location.href.indexOf("CaseMemberII.htm") > -1) {
    if (viewMode && $('#new').attr('disabled') !== "disabled") { eleFocus('#newDuplicateButton') }
    else if (viewMode && $('#edit').attr('disabled') !== "disabled") { }
    else {
        if ($('#next').length > 0 && viewMode) { eleFocus('#next') }
        else if (!viewMode && $('#memberReferenceNumberNewMember').length && $('#memberReferenceNumberNewMember').val().length == 0) { eleFocus('#memberReferenceNumberNewMember') }
        else { eleFocus('#actualDate') } } }
if (window.location.href.indexOf("CaseParent.htm") > -1) {
    if (!viewMode) { $('#parentReferenceNumberNewMember').length == 0 ? $('#childReferenceNumberNewMember').focus() : $('#parentReferenceNumberNewMember').focus() }
    else { eleFocus('#newDuplicateButton') }
}
if (window.location.href.indexOf("CaseCSE.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('#csePriNewReferenceNumber').length == 0 && $('#cseChildrenGridChildNewReferenceNumber').length > 0) { eleFocus('#cseChildrenGridChildNewReferenceNumber') }
        else if ($('#csePriNewReferenceNumber').length > 0 && $('#csePriNewReferenceNumber').val() === '') { eleFocus('#csePriNewReferenceNumber') }
    else if ($('#actualDate').val() === '') { eleFocus('#actualDate') }
    else { eleFocus('#cseDetailsFormsCompleted') }
};
if (window.location.href.indexOf("CaseChildProvider.htm") > -1) {
    if (viewMode) { eleFocus('#newDuplicateButton') }
    else if ($('strong:contains("Warning")').length > 0) { eleFocus('#saveDuplicateButton') }
    else if ($('#memberReferenceNumberNewMember').val() === '') { eleFocus('#memberReferenceNumberNewMember') }
    else if ($('#primaryBeginDate').val() === '') { eleFocus('#primaryBeginDate') }
    else { $('#hoursOfCareAuthorized').select() }
}
if (window.location.href.indexOf("CaseSchool.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#memberReferenceNumberNewMember') };
//SUB-SECTION END Member Tab pages

//SUB-SECTION START Case Tab pages
if (window.location.href.indexOf("CaseAddress.htm") > -1) {
    if ($('strong:contains("Warning")').length > 0 && !viewMode) {eleFocus('#saveDuplicateButton')}
    else {
        if (viewMode) { eleFocus('#editDuplicateButton') }
        else {
            if ($('#effectiveDate').attr('disabled') === "disabled") {//new app mode
                if ($('#previous').attr('disabled') === "disabled") { $('#effectiveDate').select() }//new app, editing
                else { eleFocus('#wrapUpDuplicateButton') }//new app, not editing
            } else { eleFocus('#subsidizedHousing') }//not new app, editing
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
        else { eleFocus('#newDuplicateButton') }
    } else { $('#basicSlidingFeeFundsAvailableCode').val('Y')
            eleFocus('#bSfEffectiveDate') }//TODO change to bSfEffectiveDate, with basicSlidingFeeFundsAvailableCode.val = Y, may need to trigger event
};
if (window.location.href.indexOf("CaseReinstate.htm") > -1) {
    if (viewMode) { eleFocus('#editDuplicateButton') }
    else { $('#reason').val().length > 0 ? eleFocus('#saveDuplicateButton') : eleFocus('#reason') } }
if (window.location.href.indexOf("CaseDisability.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#memberReferenceNumberNewMember') }
//SUB-SECTION END Case Tab pages

//SUB-SECTION START Notices Tab pages
if (window.location.href.indexOf("CaseMemo.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#memberComments') }
if (window.location.href.indexOf("CaseSpecialLetter.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#status') }

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
if (window.location.href.indexOf("CaseCopayDistribution.htm") > -1 && viewMode) { eleFocus('#CaseServiceAuthorizationApprovalSelf') }
if (window.location.href.indexOf("CaseServiceAuthorizationApproval.htm") > -1 && viewMode) {
    $('strong:contains("Background transaction in process.")').length > 0 ? $('#approveDuplicateButton, #approve').attr('disabled','disabled').addClass('custom-form-button-disabled') : eleFocus('#approveDuplicateButton')
}
if (window.location.href.indexOf("CaseServiceAuthorizationApprovalPackage.htm") > -1) {
    eleFocus('#confirmDuplicateButton')
    const observer = new MutationObserver(function() { eleFocus('#confirmButtons>#confirm') });
    observer.observe(document.querySelector('#confirmPopup'), {attributeFilter: ['style']});
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
    if (viewMode) { eleFocus('#newDuplicateButton') }
        else { $('#noteMemberReferenceNumber').focus(function() { setTimeout(document.querySelector('#save').scrollIntoView({ behavior: 'smooth', block: 'end' }), 0) })
        eleFocus('#noteMemberReferenceNumber') }
};
if (window.location.href.indexOf("CaseWrapUp.htm") > -1) { eleFocus('#doneDuplicateButton') }
if (window.location.href.indexOf("CaseApplicationInitiation.htm") > -1) { if (viewMode) { eleFocus('#newDuplicateButton') } else { $('#pmiNumber').attr('disabled') === 'disabled' ? eleFocus('#next') : eleFocus('#pmiNumber') } };
if (window.location.href.indexOf("CaseReapplicationAddCcap.htm") > -1) { ($('#next').attr('disabled') === 'disabled') ? eleFocus('#addccap') : eleFocus('#next') }
if (window.location.href.indexOf("CaseCSIA.htm") > -1) { viewMode ? eleFocus('#newDuplicateButton') : eleFocus('#actualDate') }
//
if ($('strong:contains("Actual Date is missing")').length) {
    eleFocus('#actualDate')
    if (new Date($('#selectPeriod').val().slice(0, 10)) < new Date() < new Date($('#selectPeriod').val().slice(10))) { $('#actualDate').val(new Date().toLocaleDateString('en-US', { year: "numeric", month: "2-digit", day: "2-digit" }) )}
}
//SECTION END Focusing the first desired element on pages

//SECTION START Page Specific Changes

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

    $('#caseResultsData').after('<div id="locationCopyButton" class="fake-custom-button form-button">Copy Location Data for Excel</div>')
    $('#caseResultsData').after('<div id="getLocationDataButton" class="fake-custom-button form-button">Get Location Data</div>')
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

////// ALERTS.htm start //////
if (window.location.href.indexOf("/Alerts.htm") > -1) {
    setTimeout(function() {
        if ($('#alertTotal').val() > 0 && $('#caseOrProviderAlertsTable td.dataTables_empty').length) { $('#alertInputSubmit').click() }
    }, 300)
    $('#deleteInProgress').remove() //spinning gif
    $('#delete').after($('#new'))
    // $('#new').prop('style', 'margin-left: 0px !important;').after('<details><summary>Bug:</summary><span>Creating an alert when <strong>any</strong> case has 0 alerts will cause the Alerts page to display no alerts after saving the worker alert.</span></details>').parent().css('display','flex').css('gap','10px')
    $('#new').prop('style', 'margin-left: 0px !important;').parent().css('display','flex').css('gap','10px')
    $('#delete').parent().contents().filter(function() { return this.nodeType === 3}).remove()
    $('[id^="workerCreatedAlertActionsArea"]:eq(1)').remove()
    //SECTION START Superfluous delete button
    $('label[for="message"]').parent('.row').remove();
    $('#alertsPanelData').css('overflow','visible');
    $('#alertTotal').after('<button type="button" class="form-button custom-form-button centered-text" id="deleteTop">Delete Alert</button>')
    $('#deleteTop').click(function() { $('#delete').click()});
    //SECTION END Superfluous delete button

    //SECTION START Delete all alerts of current name onclick
    let vNumberToDelete
    let vCaseName
    let vCaseOrProvider
    let vCaseNumberOrProviderId
    function fCaseNumberOrProviderId() {
        switch (vCaseOrProvider) {
            case "case":
                return "#caseNumber"
                break
            case "provider":
                return "#providerId"
                break
        }
    }
    $('#deleteTop').after('<button type="button" class="form-button custom-form-button centered-text doNotDupe" id="deleteAll" title="Delete All" value="Delete All">Delete All</button>');
    $('h4:contains("Case/Provider List")').after('<h4 style="float: right; display:inline-flex color: #003865; font-size: 1.2em; font-weight: bold;" id="alertMessage"></h4>');
    $('#deleteAll').val('Delete All').on("click", function() {
        vCaseOrProvider = $('#caseOrProviderAlertsTable>tbody>tr.selected>td:eq(0)').html().toLowerCase()
        if (!["case", "provider"].includes(vCaseOrProvider)) { return }
        vCaseNumberOrProviderId = fCaseNumberOrProviderId()
        vNumberToDelete = $( vCaseNumberOrProviderId ).val()
        vCaseName = $('#groupName').val()
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
            if ($('#delete').val() === "Delete Alert" && vNumberToDelete === $( vCaseNumberOrProviderId ).val() && vNumberToDelete === $('#groupId').val() && $('#caseOrProviderAlertsTable td:contains("' + vCaseName + '")').nextAll().eq(1).html() > 0) {
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
    //blarga

    const aCaseCategoryButtons = [
        ["Edits", "CaseEditSummary"],
        ["Eligibility", "CaseEligibilityResultSelection"],
        ["SA:O", "CaseServiceAuthorizationOverview"],
        ["SA:A", "CaseServiceAuthorizationApproval"],
        ["Provider", "CaseChildProvider"],
        ["Address", "CaseAddress"],
        ["Pages", "CasePageSummary"],
        ["Notices", "CaseNotices"],
        ["Notes", "CaseNotes"],
        ["Overview", "CaseOverview"],
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
    const oAlertCategoriesLowerCase = {
        template: {
            page: "",
            buttonText: "",
            explanation: {
                1: { text1: "", page: "" }
            }
        },
        eligibility: {
            page: "",
            buttonText: "",
            explanation: {
                1: { text1: "", page: "" }
            }
        },
        serviceauthorization: {
            page: "",
            buttonText: "",
            explanation: {
                1: { text1: "", page: "" }
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
        let copyText = document.getElementById("message").value.replaceAll('/n', ' ');
        navigator.clipboard
            .writeText(copyText)
            .then(() => {
            localStorage.setItem('mech2.caseNoteText', copyText);
            snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
            let parm2var = document.getElementById('caseOrProviderAlertsTable').getElementsByClassName('selected')[0].childNodes[2].innerText //$('#vCaseOrProviderTable_wrapper .selected').children('td:nth-child(3)')//.text()?
            let parm3var = document.getElementById('periodBeginDate').value.replace(/\//g, '') + document.getElementById('periodEndDate').value.replace(/\//g, '')
            window.open('/ChildCare/CaseNotes.htm' + fGetCaseParameters(), '_blank')
        })
            .catch(() => {
            console.log("Something went wrong");
        });
    };
    $('#alertButtonHouse').prepend('<button type="button" class="custom-button custom-button__floating" id="copyAlertButton">Copy, goto Notes</button>');
    $('#copyAlertButton').click(function() { fCopyExplanation()});
    //SECTION END Copy Alert text, navigate to Case Notes

    //SECTION START Moving Worker ID and Worker Name to the section they are displayed in
    $('#inputWorkerId').parent().attr('id','workerIdRow')
    $('#workerName').parent().attr('id','workerNameRow')
    $('#workerIdRow, #workerNameRow').prependTo($('#caseOrProviderAlertsTable_wrapper').parent())
    //SECTION END Moving Worker ID and Worker Name to the section they are displayed in

    // //SECTION START Resize the Alert page's Explanation viewable area
    // $('.h1-parent-row').siblings('br[clear!="all"]').remove();
    // addGlobalStyle ('#message {	resize: none; width: 450px !important; padding: 5px; overflow: hidden; box-sizing: border-box; }');
    // $('#message').parent().removeClass('col-lg-9 col-md-9').addClass('col-lg-12 col-md-12');
    // $('#message').parents('.row').prev('br').remove();
    // $('label[for="groupId"]').text('Case #/PID:');
    // $('label[for="groupName"]').text('Case/Provider:');
    // $("#alertTable").on('click', function() {
    //     $("#message").css('height', '100px');
    //     $("#message").css('height', $("#message").get(0).scrollHeight + 'px');
    // });
};
//SECTION END Resize the Alert page's Explanation viewable area
////// ALERTS.htm end //////

//SECTION START Add delay to approving MFIP close and TY/BSF open
    if (window.location.href.indexOf("/AlertWorkerCreatedAlert.htm") > -1) {// && window.location.href.indexOf("pageUrl") < 0
        if ($('#providerAlertDisplay').css('display') === "none") {//Exclude provider workers
            let delayNextMonth = new Date(new Date().setMonth(new Date().getMonth() +1, 1)).toLocaleDateString('en-US', {year: "numeric", month: "2-digit", day: "2-digit", });
            let delayMonthAfter = new Date(new Date().setMonth(new Date().getMonth() +2, 1)).toLocaleDateString('en-US', {year: "numeric", month: "2-digit", day: "2-digit", });
            $('#message').parent().after('<div class="col-lg-3"><div class="fake-custom-button-nodisable fake-custom-button" id="delayNextMonth" tabindex=0>MFIP Close Delay Alert: ' + delayNextMonth + '</div><div class="fake-custom-button-nodisable fake-custom-button" id="delayMonthAfter" tabindex=0>MFIP Close Delay Alert: ' + delayMonthAfter + '</div></div>')
            $('#delayNextMonth').click(function() {
                $('#message').val("Approve new results (BSF/TY/extended eligibility) if MFIP not reopened.");
                $('#effectiveDate').val(delayNextMonth);
                $('#save').click();
            });
            $('#delayMonthAfter').click(function() {
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
    $('input[type="checkbox"]:not(:eq(0))').before('<br>');
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
    $('#effectiveDate').parent().after('<div class="custom-button fake-custom-button centered-text flex-right" id="copyMailing">Copy Mail Address</div>');
    $('#copyMailing').click(function() {
        let caseNameRaw = $('label[for="caseHeaderName"]').parent().contents().eq(2).text();
        let lastName = caseNameRaw.split(",")[0];
        let firstName = firstNameSplitter(caseNameRaw)
        let caseNameSpaces = caseNameRaw.split(" ");
        if ($('#mailingStreet1').val() !== "") {
            let state = (document.getElementById('mailingStateProvince').value === "Minnesota") ? "MN":"WI";
            let copyText = firstName + " " + lastName + "\n" + document.getElementById('mailingStreet1').value + " " + document.getElementById('mailingStreet2').value + "\n" + document.getElementById('mailingCity').value + ", " + state + " " + document.getElementById('mailingZipCode').value
            navigator.clipboard.writeText(copyText)
            snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        } else {
            let state = (document.getElementById('residenceStateProvince').value === "Minnesota") ? "MN":"WI";
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
    if (viewMode) {
        $('#phone2, #phone3, #contactNotes, #email').each(function() {
            $(this).val() == '' && ($(this).parents('.form-group').addClass('collapse'))
        });
    };
    function checkMailingAddress() {
        $mailingFields.parents('.form-group').removeClass('collapse')
        $mailingFields.each(function() {
            $(this).val() == '' && ($(this).parents('.form-group').addClass('collapse'))
        })
    };
    if (viewMode) {
        $('#caseAddressTable').click(function() { checkMailingAddress() });
    };
};
//SECTION END CaseAddress changes and fixes

if (window.location.href.indexOf("CaseApplicationInitiation.htm") > -1) {
    $('#retroApplicationDate').parents('.form-group').addClass('collapse');
};


//SECTION START Open provider information page from Child's Provider page
if (window.location.href.indexOf("CaseChildProvider.htm") > -1) {
    $('#providerSearch').parent().after('<div class="custom-button fake-custom-button flex-right" id="providerAddressButton">Provider Address</div>')
    $('#providerAddressButton').click(function() {
        window.open("/ChildCare/ProviderAddress.htm?providerId=" + $('#providerId').val(), "_blank");
    });
    $('#providerSearch').parent().after('<div class="custom-button fake-custom-button flex-right" id="providerInfoButton">Provider Contact</div>')
    $('#providerInfoButton').click(function() {
        window.open("/ChildCare/ProviderInformation.htm?providerId=" + $('#providerId').val(), "_blank");
    });
    //SECTION END Open provider information page from Child's Provider page

    //SECTION START CaseChildProvider hiding fields if provider type is not LNL
    function childProviderPage() {
        let $lnlGroup = $('#careInHome, #providerLivesWithChildBeginDate, #careInHomeOfChildBeginDate, #exemptionReason, #exemptionPeriodBeginDate, #formSent, #signedFormReceived').parents('.form-group');
        if ($('#providerType').val() !== "Legal Non-licensed" && $('#providerType').val() !== '') {//not LNL
            $lnlGroup.addClass('collapse');
            if (!viewMode) { $('#providerLivesWithChild, #careInHome, #relatedToChild').val("N") }//not LNL, edit mode
            else { $lnlGroup.addClass('collapse') }//not LNL, view mode
        } else {//is LNL
            if (!viewMode) { $lnlGroup.removeClass('collapse') }//is LNL, edit mode
            else {//is LNL, view mode
                $('#providerLivesWithChildBeginDate, #careInHomeOfChildBeginDate').each(function() {
                    if ($(this).val() === '') { $(this).parents('.form-group').addClass('collapse') }
                    else { $(this).parents('.form-group').removeClass('collapse') }
                });
            };
        };
        $('#exemptionPeriodBeginDate').each(function() {
            if ($(this).val() === '') { $(this).parents('.col-lg-12').addClass('collapse') }
            else { $(this).parents('.col-lg-12').removeClass('collapse') }
        });
    };
    $('label[for="providerLivesWithChild"]').text('Lives with Child: ').removeClass('col-md-3 col-lg-3').addClass('col-md-2 col-lg-2');
    $('label[for="providerLivesWithChild"]').add($('label[for="providerLivesWithChild"]').siblings()).appendTo($('label[for="childCareMatchesEmployer"]').parent())
    $('label[for="relatedToChild"]').removeClass('col-md-3 col-lg-3').addClass('col-md-2 col-lg-2');
    $('label[for="relatedToChild"]').add($('label[for="relatedToChild"]').siblings()).appendTo($('label[for="careInHome"]').parent());
    childProviderPage();
    $('#childProviderTable').on("click", childProviderPage());
    $('#providerId').blur(function() {
        if ($('#providerId').val() !== '') {
            setTimeout(function() { childProviderPage() }, 200)
            eleFocus('#primaryBeginDate')
        }
    });
    $('#primaryBeginDate, #secondaryBeginDate').blur(function() {
        if ($('#carePeriodBeginDate').val() === '' && $('#primaryBeginDate').val() !== '' || $('#secondaryBeginDate').val() !== '') {
            $('#carePeriodBeginDate').val($('#primaryBeginDate').val())
            eleFocus('#hoursOfCareAuthorized')
            setTimeout(function() { $('#ui-datepicker-div').hide() }, 1000)
        }
    })
};
//SECTION END CaseChildProvider hiding fields if provider type is not LNL

if (window.location.href.indexOf("CaseCreateEligibilityResults.htm") > -1) {
    if ($('strong:contains("Results successfully submitted.")')) {
        $('#dupeButtonHouse').addClass('collapse')
    }
}

//SECTION START Fill Child Support PDF Forms
if (window.location.href.indexOf("CaseCSE.htm") > -1) {
    $('#cseDetailsFormsCompleted').parent().after('<div class="custom-button fake-custom-button centered-text flex-right" id="csForms">Generate CS Forms</div>');
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
    $('#cseAbsentParentInfoLastName').parent().after('<div class="fake-custom-button fake-custom-button-nodisable centered-text flex-right" id="abpsShowHide">Toggle extra info</div>');
    $('#abpsShowHide').click(function() { $($hiddenCSE).toggleClass('collapse') });
    let $goodCause = $('#cseGoodCauseClaimStatus').parents('.form-group').siblings().not('h4')
    function hideBlankGoodCause() {
        if ($('#cseGoodCauseClaimStatus').val() === 'Not Claimed') {
            $goodCause.addClass('collapse')
        } else {
            $goodCause.removeClass('collapse')
        }
    };
    hideBlankGoodCause();
    $('#cseGoodCauseClaimStatus').change(function () {hideBlankGoodCause()});
    $('#csePriTable').click(function() { cseReviewDate() });
    function cseReviewDate() {
        $('h4:contains("Good Cause")').siblings().removeClass('collapse')
        $('h4:contains("Good Cause")').siblings().children('div').children('input, select').filter(function() {return $(this).val() === ''}).not('#cseGoodCauseClaimStatus').parents('.form-group').addClass('collapse')
    };
    cseReviewDate()
    $('#cseGoodCauseClaimStatus').parent().after('<div class="fake-custom-button fake-custom-button-nodisable centered-text flex-right" id="cseGoodCauseClaimStatusToggle">Toggle extra info</div>');
    $('#cseGoodCauseClaimStatusToggle').click(function() { $goodCause.toggleClass('collapse') });
};
//SECTION END Remove unnecessary fields from Child Support Enforcement

//SECTION START CaseCSIA
if (window.location.href.indexOf("CaseCSIA.htm") > -1) {
    $('label.col-lg-2').removeClass('col-lg-2 col-md-2').addClass('col-lg-3 col-md-3')
    let $csiaCollapse = $('#middleInitial, #birthDate, #ssn, #gender').parents('.form-group')
    $csiaCollapse.addClass('collapse')
    $('#actualDate').parents('.form-group').append('<div class="fake-custom-button fake-custom-button-nodisable centered-text flex-right" id="csiaExtra">Toggle extra info</div>');
    $('#csiaExtra').click(function() { $csiaCollapse.toggleClass('collapse') });
    $('h4:contains("Address")').click()
    $('#deceasedDate').parent().addClass('collapse')
    setTimeout(function() {
        if (!viewMode) {
            if ($('#caseCSIADetailData .selected td:eq(3)').html() !== "") {$('#nameKnown').val('Yes')}
            $('#birthplaceCountry').change(function() {setTimeout(function() {if ($('#birthplaceStateOrProvince').val() === "") {$('#birthplaceStateOrProvince').val('Minnesota');doEvent('#birthplaceStateOrProvince')} },100) })
            $('#birthplaceStateOrProvince').change(function() {setTimeout(function() {if ($('#birthplaceCounty').val() === "") {$('#birthplaceCounty').val('STLOUIS');doEvent('#birthplaceCounty')} },100) })
            if ($('#birthplaceCountry').val() === "") {$('#birthplaceCountry').val('USA');doEvent('#birthplaceCountry')}
        }
    },0)
    $('#deceased').change(function() {
        if ($(this).val() === "Yes") {
            $('#deceasedDate').parent().removeClass('collapse')
        }
    })
}
//SECTION END CaseCSIA

//SECTION START CaseEarnedIncome Remove unnecessary fields from CaseEarnedIncome, set to MN, USA when leaving Employer Name field
if (window.location.href.indexOf("CaseEarnedIncome.htm") > -1) {
    //SUB-SECTION START Remove unnecessary fields from CaseEarnedIncome
    let ceiEmployment = $('#ceiPrjAmount, #ceiAmountFrequency, #ceiHrsPerWeek').parents('.form-group');
    let ceiSelfEmployment = $('#ceiGrossIncome, #ceiGrossAllowExps, #ceiTotalIncome').parents('.form-group')
    $('#earnedIncomeMemberTable').click( function() { checkSelfEmploy() });
    $('#ceiIncomeType').change( function() { checkSelfEmploy() })
    function checkSelfEmploy() {
        if (($('#ceiIncomeType').val() == "Wages") || (viewMode && $('#ceiTotalIncome').val() == '')) {
            ceiSelfEmployment.addClass('collapse');
            ceiEmployment.removeClass('collapse');
        } else if ($('#ceiIncomeType').val() == "Self-employment") {
            ceiSelfEmployment.removeClass('collapse');
            ceiEmployment.addClass('collapse');
        };
    };
    checkSelfEmploy()
    let hiddenCEI1 = $('#ceiEmpStreet, #ceiEmpStreet2, #ceiEmpCity, #ceiEmpStateOrProvince, #ceiPhone, #ceiEmpCountry').parents('.form-group')
    hiddenCEI1.addClass('collapse');
    $('#ceiIncomeType').parent().after('<div class="fake-custom-button fake-custom-button-nodisable centered-text flex-right" id="ceiShowHide1">Toggle extra info</div>');
    $('#ceiShowHide1').click(function() { $(hiddenCEI1).toggleClass('collapse') });
    //
    let hiddenCEI2 = $('#ceiCPUnitType, #ceiNbrUnits').parents('.form-group')
    hiddenCEI2.addClass('collapse');
    $('#ceiPrjAmount').parent().after('<div class="fake-custom-button fake-custom-button-nodisable centered-text flex-right" id="ceiShowHide2">Toggle extra info</div>');
    $('#ceiShowHide2').click(function() { $(hiddenCEI2).toggleClass('collapse') });
    //
    if ($('#providerName').val().length < 1) {
        let hiddenCEI3 = $('#providerName, #addressStreet').parents('.form-group')
        hiddenCEI3.addClass('collapse');
        $('#providerSearch').parent().after('<div class="fake-custom-button fake-custom-button-nodisable centered-text flex-right" id="ceiShowHide3">Toggle extra info</div>');
        $('#providerSearch').parents('.col-lg-12').addClass('form-group')
        $('#ceiShowHide3').click(function() { $(hiddenCEI3).toggleClass('collapse') });
    };
    if (!viewMode) {
        $('#ceiGrossAllowExps').parent().after('<div style="align-content: center; height: 28px; display: inline-flex; flex-wrap: wrap; margin-right: 10px;" id="fiftyPercent"></div>');
        $('#fiftyPercent').text('50%: ' + ($('#ceiGrossIncome').val()*.5).toFixed(2));
        $('#ceiGrossIncome').change(function() {$('#fiftyPercent').text('50%: ' + ($('#ceiGrossIncome').val()*.5).toFixed(2)) });
        $('#fiftyPercent').after('<div id="grossButton" class="fake-custom-button-nodisable fake-custom-button">Use 50%</div>')
        $('#grossButton').click(function() {
            $('#ceiGrossAllowExps').val(($('#ceiGrossIncome').val()*.5).toFixed(2));
            const event = new Event('change');
            document.querySelector('#ceiGrossAllowExps').dispatchEvent(event);
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
if (window.location.href.indexOf("CaseEarnedIncome.htm") > -1 || window.location.href.indexOf("CaseUnearnedIncome.htm") > -1 || window.location.href.indexOf("CaseExpense.htm") > -1) {
    if (viewMode) {
        $('#ceiPaymentChange, #paymentChangeDate').each(function() {
            if ($(this).val() === '') { $(this).parents('.form-group').addClass('collapse') }
        })
    }
    $('table').click(function() { showHidePaymentChange() })
    function showHidePaymentChange() {
        if ($('#memberReferenceNumberNewMember').val() === '') {
            $('#ceiPaymentChange, #paymentChangeDate').parents('.form-group').addClass('collapse')
        }
    }
    if (!viewMode) { showHidePaymentChange() }
    if ($('#memberReferenceNumberNewMember').val() === '') {
        $('#ceiPaymentEnd, #paymentEndDate').prop('tabindex', -1)
    }
    $( "h4:contains('Actual Income'), h4:contains('Student Income'), h4:contains('Actual Expense')" ).nextAll().addClass("collapse")
};
//SECTION END CaseEarnedIncome CaseUnearnedIncome CaseExpense collapse unnecessary H4s

//SECTION START CaseEditSummary Remove padding from left of inputs in the summary
if (window.location.href.indexOf("CaseEditSummary.htm") > -1) {
    $('#editSummaryPanelData').append('<style>input {padding-left: 0px !important}</style>')
};
//SECTION END CaseEditSummary Remove padding from left of inputs in the summary

//SECTION START CaseEligibilityResultFamily Fix 'Select' elements to have class col-md-4 so they show the entire word
if (window.location.href.indexOf("CaseEligibilityResultFamily.htm") > -1) {
    $('select').parent('.col-md-3').removeClass('col-md-3').addClass('col-md-4');
    $('label.col-lg-8').removeClass('col-lg-8').addClass('col-lg-7');
//SECTION END CaseEligibilityResultFamily Fix 'Select' elements to have class col-md-4 so they show the entire word
//SECTION START Custom fix for CaseEligibilityResultFamily (1 label&field)
	$('label[for="allowedTemporaryIneligibilityExpireTest"]').removeClass("col-md-8").addClass("col-md-7").removeAttr('style')
};
//SECTION END Custom fix for CaseEligibilityResultFamily (1 label&field)

//CaseEligibilityResultPerson
if (window.location.href.indexOf("CaseEligibilityResultPerson.htm") > -1) {
    $('label[for="countEarnings"]').removeClass('col-md-5 col-lg-5').addClass('col-lg-6 col-md-6')
}

//SECTION START Highlight "Fail||Ineligible" in eligibility results
if (window.location.href.indexOf("CaseEligibilityResult") > -1 && window.location.href.indexOf("Help.htm") < 0) {
    let tableBody = $('table tbody').parent().DataTable()
    let $isNo = $('tbody > tr > td').filter(function() { return $(this).text() === 'No' });
    $isNo.filter(function() {
        return $(tableBody.column( tableBody.cell( $(this) ).index().column ).header()).html() == "In Family Size" || $(tableBody.column( tableBody.cell( $(this) ).index().column ).header()).html() == "Verified"
    })
        .add('tbody > tr > td:contains("Ineligible")')
        .addClass('eligibility-highlight-table')//
    function eligHighlight() {
        $('eligibility-highlight').removeClass('eligibility-highlight')
    $('div>input[type="text"]').filter(function() {return $(this).val() === "Fail" }).addClass('eligibility-highlight')
    $('div[title="Family Result"]:contains("Ineligible")').addClass('eligibility-highlight')
    $('div:contains("Fail"):not(:has("option")):last-child').addClass('eligibility-highlight')//.parent().children()
    $('option:selected:contains("Fail")').parents('select').addClass('eligibility-highlight')//.parents('div.form-group')
    }
    eligHighlight()
    $('table').click(function() {eligHighlight()})
};
//SECTION END Highlight "Fail" in eligibility results

//SECTION START CaseEligibilityResultApproval Add 90 days to date entered to ExtElig Begin Date
if (window.location.href.indexOf("CaseEligibilityResultApproval.htm") > -1) {
    $('#allowedExpirationDate, #beginDate').unwrap()
    $('#beginDate').keyup(function() {
        if ($(this).val().length === 10) {
            $('#extEligPlus90button').remove();
            let extEligPlus90 = addDays($('#beginDate').val(), 90);
            extEligPlus90 = new Date(extEligPlus90).toLocaleDateString('en-US', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            $('label[for=beginDate]').parent().append('<button tabindex=0 class="centered-text rounded-border-box" id="extEligPlus90button" style="padding: 2px; background-color: #dcdcdc; cursor: pointer;">+90: ' + extEligPlus90 + '</button>');
            eleFocus('#extEligPlus90button')
            $('#ui-datepicker-div').hide()
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

if (window.location.href.indexOf("CaseEligibilityResultOverview.htm") > -1) {
    $('label[for="totalAnnualizedIncome"]').parent('.form-group').children('.col-lg-5').addClass('collapse')
    $('label[for="financiallyResAgency"]').removeClass('col-lg-4 col-md-4').addClass('col-lg-3 col-md-3')
}

//SECTION START Custom fix and text for CaseEligibilityResultSelection
if (window.location.href.indexOf("CaseEligibilityResultSelection.htm") > -1) {
    // if ($('strong.rederrortext').html() === 'Background transaction in process.') {
    if ($('strong:contains("Background")').length > 0) {
        $('#select').prop('disabled','disabled')
        $('#selectButton').addClass('custom-form-button-disabled');
    } else {
        let parm3var = '&parm3=' + document.getElementById('selectPeriod').value.replace(' - ', '').replaceAll('/','');
        $('#eligibilityActionsArea').after(`<div>
            <div id="goSAOverview" class="fake-custom-button-nodisable fake-custom-button">SA Overview</div>
            <div id="goSAApproval" class="fake-custom-button-nodisable fake-custom-button">SA Approval</div>
            </div>`)
        $('#goSAOverview').click(function() {
            window.open('/ChildCare/CaseServiceAuthorizationOverview.htm?parm2=' + $('#caseId').val() + parm3var, '_self');
        });
        $('#goSAApproval').click(function() {
            window.open('/ChildCare/CaseServiceAuthorizationApproval.htm?parm2=' + $('#caseId').val() + parm3var, '_self');
        });
    };
    if (document.getElementsByClassName('dataTables_empty').length == 0) { document.getElementsByClassName('sorting')[1].click() };//sort by program type
    $('tbody > tr > td:contains("Unapproved")').addClass('eligibility-highlight').parent('tr').addClass('Unapproved');//Highlight unapproved
    $('tbody > tr > td:contains("Eligible")').parent('tr').addClass('Eligible');
    $('tbody > tr > td:contains("Ineligible")').parent('tr').addClass('Ineligible');
    if ($('.Unapproved').length > 0) {
        if ($('.Unapproved.Eligible').length) { $('.Unapproved.Eligible').click().addClass('selected') }
        else if ($('.Unapproved.Ineligible').length) { $('.Unapproved.Ineligible').click().addClass('selected') }
    }
};
//SECTION END Custom fix and text for CaseEligibilityResultSelection

//SECTION START Redirect if we're on elig results and there's no version selected
if (window.location.href.indexOf("CaseEligibilityResult") > -1 && window.location.href.indexOf("CaseEligibilityResultSelection.htm") < 0) {
    let interval;
    function check() {
        if ($('[id$="TableAndPanelData"]').css('display') == "none") {
            clearInterval(interval);//clearInterval will stop its periodical execution.
            window.open(document.getElementById("Eligibility Results Selection").firstElementChild.href, "_self")
        };
    };
    interval = setInterval(check, 200);//Create an instance of the check function interval
    check();
    $('.col-lg-1:not(.textInherit)').remove()//removes blank divs
};
//SECTION END Redirect if we're on elig results and there's no version selected

//SECTION END Remove unnecessary fields from CaseExpense
if (window.location.href.indexOf("CaseExpense.htm") > -1) {
	let hiddenExp = $('#projectionExpenseUnitType, #projectionExpenseNumberOfUnits').parents('.form-group');
	hiddenExp.addClass('collapse');
	$('label[for="projectionExpenseAmount"]').parent().append('<div class="fake-custom-button fake-custom-button-nodisable centered-text flex-right" id="ceiShowHide2">Toggle extra info</div>');
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
	if ($('label[for="requestMessage"]').parent(':contains("CASE LOCKED IN MEC2")')) {
        $('#caseLockStatusDetail').append('<div style="font-size: 20px;" class="eligibility-highlight" id="acceptMyTerms">I solemnly swear I am up to no good. Click this text to show the "Unlock" button.</div>')
        $('#acceptMyTerms').click(function() {
            $("#caseLockStatusUnlockButtonArea").show();
            $("#acceptMyTerms").remove();
        });
	};
};
//SECTION END CaseLockStatus Reveal Unlock button

//SECTION START Open CaseMemberHistory page from CaseMember with 'button'
if (window.location.href.indexOf("CaseMember.htm") > -1) {
    $('label[for="memberReferenceNumber"]').attr('id','openHistory').css('border-width','1px').css('border-color','gray').css('border-style','solid');
    $('#openHistory').click(function() {
        window.open('/ChildCare/CaseMemberHistory.htm?parm2=' + $('#caseId').val(), '_blank');
    });
//SECTION START CaseMember Shortening text fields so they fit in a col-md-4
    $( "label:contains('American Indian or Alaskan Native')" ).prop('innerText', 'American Indian or AK Native');
    $( "label:contains('Pacific Islander or  Native Hawaiian')" ).prop('innerText', 'Pacific Islander or HI Native');
    if ($('#next').length > 0) { $('table').click(function() {eleFocus('#next') } )}
};
//SECTION END CaseMember

//SECTION START CaseMemberII fixing column sizes
if (window.location.href.indexOf("CaseMemberII.htm") > -1) {
    $('div.col-lg-3').removeClass('col-lg-3 col-md-3').addClass('col-lg-4 col-md-4')
    if ($('#next').length > 0) { $('table').click(function() {eleFocus('#next') } )}
}
//SECTION END CaseMemberII fixing column sizes

//SECTION START Case Notes custom styles
if (window.location.href.indexOf("CaseNotes.htm") > -1) {
    !viewMode && $('option[value="Application"]').after('<option value="Child Support Note">Child Support Note</option>');
    $('#storage').addClass('collapse');
    $('#noteArchiveType, #noteSearchStringText, #noteImportant').prop('tabindex', '-1');
    $('table#caseNotesTable>tbody>tr:has(td:contains("Disbursed child care support")), table#caseNotesTable>tbody>tr:has(td:contains("PMI Merge"))').addClass('hidden-tr');//Hiding Disbursed Child Care Support payment rows
    $('#reset').after('<button id="toggleCaseNotesRows" class="custom-button flex-right">Show Extra Rows</button>')
    $('.hidden-tr').hide()
    $('#toggleCaseNotesRows').click(function(e) {
        e.preventDefault();
        switch ($('#toggleCaseNotesRows').text()) {
            case "Show Extra Rows":
                $('#toggleCaseNotesRows').text("Hide Extra Rows")
                $('.hidden-tr').hide()
                break;
            case "Hide Extra Rows":
                $('#toggleCaseNotesRows').text("Show Extra Rows")
                $('.hidden-tr').show()
                break;
        }
    })
//SUB-SECTION START Disable Edit button if note date !== today (maybe make a ! button to enable and click edit?)
    // let todayDate = new Date().toLocaleDateString('en-US', {
    //             year: "numeric",
    //             month: "2-digit",
    //             day: "2-digit",
    //     });
    // const observer = new MutationObserver(disableEdit);
    // observer.observe(document.querySelector('#rowIndex'), {attributes: true});
    // function disableEdit() {
    //     if ($('table tr.selected td').eq(1).text() !== todayDate) {
    //         $('#edit').prop('disabled', true);
    //     };
    // };
    // disableEdit();
};
//SUB-SECTION END CaseNotes Disable Edit button if note date !== today
//SECTION END CaseNotes

//SECTION START CaseNotes and ProviderNotes layout fix
if (window.location.href.indexOf("Notes.htm") > -1) {//(window.location.href.indexOf("CaseNotes.htm") > -1 || window.location.href.indexOf("ProviderNotes.htm") > -1) {
    document.getElementsByClassName('panel-box-format')[1].style.display = "none";
    document.getElementById('noteStringText').rows = '29'
    $('br').remove();
    $('#noteSummary').css('width','100%')
        .parent().removeClass('col-lg-4 col-md-4 col-sm-4 col-lg-3').addClass('col-lg-10 col-md-10')
        .parents('.form-group').removeClass('col-lg-5 col-md-5 col-sm-5 col-xs-5').addClass('col-lg-7 col-md-7');
    $('label[for="noteSummary"]')
        .removeClass('col-lg-3 col-md-3 col-sm-3').addClass('col-lg-2 col-md-2');
    $('label[for="noteCreator"]').siblings().addBack()
        .wrapAll('<div class="col-lg-2 col-md-3 form-group" id="noteCreatorGroup"></div>');
    $('#noteCreator')
        .parent().removeClass('col-lg-4 col-md-4 col-sm-4 marginTop5').addClass('col-lg-7 col-md-7');
    $('#noteCreatorGroup').appendTo($('label[for="noteSummary"]').parents('.row'));
    $('label:contains("Important")')
        .removeClass('col-lg-3 col-md-3 col-sm-4')
        .addClass('col-lg-2 col-md-2')
        .prop("innerText", "!")
        .attr('for','noteImportant')
        .parents('.form-group').attr('id','removeMe')
        .parents('.row').attr('id','addInfoRowOne')
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
        .add('label[for="noteMemberReferenceNumber"], label[for="notePerson"]').wrapAll('<div id="noteMemberReferenceNumberGroup" class="col-lg-5 col-md-5 form-group"></div>')
    $('label[for="noteCategory"]')
        .removeClass('col-lg-3 col-md-3 col-sm-4').addClass('col-lg-2 col-md-2')
        .css('margin-left','')
    addGlobalStyle('label[for="noteCategory"] { width: 61px !important }');
    $('#noteCategory').parent()
        .removeClass('col-lg-3 col-md-3 col-sm-3 textInherit').addClass('col-lg-10 col-md-10 textInherit')
        .add('label[for="noteCategory"]').wrapAll('<div id="noteCategoryGroup" class="col-lg-4 col-md-4 form-group"></div>')
    $('.col-lg-6.col-md-6.col-sm-6.col-xs-6.form-group.textInherit:not(".col-xl-8,.col-xl-6")').addClass('collapse')
    $('.col-xs-2.col-sm-2.col-md-1.col-lg-1:not(:has("input"))').addClass('collapse')
    $('.col-xs-5.col-sm-5.col-md-5.col-lg-5').addClass('collapse');
    $('#noteImportantGroup, #noteMemberReferenceNumberGroup').prependTo('#addInfoRowOne')
    $('#removeMe').remove()
};
//SECTION END CaseNotes and ProviderNotes layout fix

//SECTION START Fixing the table height of the Case Notice and Job Search Tracking tables to show more notices
if (window.location.href.indexOf("CaseNotices.htm") > -1 || window.location.href.indexOf("CaseJobSearchTracking.htm") > -1) {
    $(".dataTables_scrollBody").css('max-height', '400px');
    $('#textbox1').css('height', '520px');
};
//SECTION END Fixing the table height of the Case Notice and Job Search Tracking tables to show more notices

//SECTION START Custom items for CaseOverview
if (window.location.href.indexOf("CaseOverview.htm") > -1) {
    $('#programInformationData').css('border-bottom', 'none')
    $('.col-xs-12:not(.col-lg-12), .visible-sm:not(.visible-lg)').remove()
    $('div.visible-lg>label').unwrap()
    $('.visible-lg:not(:has(*))').remove()
    $('h4:contains("Current Child Care Case Information:")').wrap('<div class="form-group" id="cccciH4"></div>')
    $('label[for="redeterminationDueDate"]').nextAll('div.col-lg-3:eq(0)').attr('id','redetDate');
    if ($('#redetDate').text().length > 19) {
        $('#cccciH4').append('<div id="copyFollowUpButton" class="class=fake-custom-button fake-custom-button-nodisable centered-text flex-right">Follow Up Date</div>');
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
        $('#redetDateChild').after('<div id="copyRedetNoteButton" class="class=fake-custom-button fake-custom-button-nodisable centered-text">Note Summary</div>');
        $('#copyRedetNoteButton').click(function() {
            let redetDate = $('label[for="redeterminationDueDate"]').siblings('div.col-lg-3.col-md-3').eq(0).text().replace(/\n|\t/g, '').slice(0, 10)
            navigator.clipboard.writeText("Redetermination mailed, due " + redetDate);
            snackBar('Copied! <br> Redetermination mailed, due ' + redetDate);
        })
    }
    $('#programInformationData td:contains("HC"), #programInformationData td:contains("FS"), #programInformationData td:contains("DWP"), #programInformationData td:contains("MFIP")').parent().addClass('stickyRow').addClass('stillNeedsBottom')
    waitForElmHeight('#programInformationData > tbody > tr > td').then(() => {
        document.querySelectorAll('.stickyRow').forEach(function(element, index) {
            element.style.bottom = ($('.stillNeedsBottom').length -1) * (document.querySelector('#programInformationData').getBoundingClientRect().height / document.querySelectorAll('#programInformationData tbody tr').length) + "px"
            $(element).removeClass('stillNeedsBottom')
        })
        $('.stickyRow:eq(0)').css('box-shadow','0px 1px black inset')
    })
    waitForElmValue('#participantInformationData > tbody > tr > td').then(() => {
        if ($('#participantInformationData_wrapper thead td:eq(0)').attr('aria-sort') !== "ascending") { $('#participantInformationData_wrapper thead td:eq(0)').click() }
    })
};
//SECTION END Custom items for CaseOverview
if (window.location.href.indexOf("CasePageSummary.htm") > -1) {
    $('h4').parent().removeClass('col-lg-5 text-center text-left').addClass('col-lg-3 col-md-3 text-right')
}

//SECTION START CasePaymentHistory Add links to navigate to FinancialBilling in correct BWP
if (window.location.href.indexOf("CasePaymentHistory") > -1) {
    $('div.col-lg-3.col-md-3>input').width('100%');
    $('#paymentHistoryTable tr').children('td:nth-of-type(3)').each(function() {
            let linkText = $(this).text();
            $(this).text('');
            $(this).append('<a href="FinancialBilling.htm?parm2=' + $("#caseId").val() + '&parm3=' + linkText.replace(" - ", "").replaceAll("/","") + '", target="_blank">' + linkText + '</a>');
    });
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
        if (formInfo.copayAmount == '' || formInfo.copayAmount == undefined) {
            formInfo.copayAmount = $('#copayAmountManual').val();
        }
        window.open("http://nt-webster/slcportal/Portals/65/Divisions/FAD/IM/CCAP/index.html?parm1=" + JSON.stringify(formInfo), "_blank");
    };
    $('#csicTableData1').before(`
        <div style="overflow: auto" id="billingFormDiv">
        <div class="form-group centered-form-group">

        <div class="custom-button fake-custom-button centered-text" id="billingForm">Create Billing Form</div>
        <label for="copayAmount" class="control-label textR" style="height: 28px;"> Copay Amount: $</label>
        <div id="copayAmountGet" class="centered-text" style="width: 40px;"></div>
        <div class="custom-button fake-custom-button centered-text" id="providerAddressButton">Open Provider Address Page</div>
        <div class="custom-button fake-custom-button centered-text" id="copyProviderMailing">Test - Copy Provider Mailing Address</div>
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

//SECTION START CaseSpecialNeeds Column resizing
if (window.location.href.indexOf("CaseSpecialNeeds.htm") > -1) {
    $('.col-md-3, .col-lg-3').removeClass('col-md-3 col-lg-3').addClass('col-md-5 col-lg-5');
};
//SECTION END CaseSpecialNeeds Column resizing

//SECTION START CaseSpecialActivity Duplicate start date into end date for Ext Elig
if (window.location.href.indexOf("CaseSupportActivity.htm") > -1) {
	$('#activityBegin').blur(function() {
        if ($('#memberDescription').val() === "PE" || $('#memberDescription').val() === "NP") {
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
    $('div.col-lg-6:not(:has(*))').addClass('collapse') //Hides CaseTransfer empty div
    $('#caseTransferFromAllowedUREndsDate, #caseTransferFromAssignmentServicingEndsDate, #caseTransferFromVoid, #caseTransferFromTransferImmediately, #caseTransferToTransferEffectiveDate, #caseTransferToEarlyAcceptance, #caseTransferToName').prop('tabindex', -1)

//Automatic case transfer section start
    if (localStorage.getItem('MECH2.activelyTransferring') == 'yesPlease') { doCaseTransfer() }
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

    if (localStorage.getItem('MECH2.doClose') == 'closeWindow' && localStorage.getItem('MECH2.activelyTransferring') == 'noThanks' && viewMode) {
        localStorage.setItem('MECH2.doClose','didClose');
        window.open('about:blank', '_self');
    };
//Automatic case transfer section end

    //Semi-manual transfer with a button
    function buttonClosedTransfer() {
        localStorage.setItem('MECH2.activelyTransferring','yesPlease');
        $('#new').click();
    };
    if (viewMode) { ($('#caseTransferToName').parents('.form-group').after('<div class="custom-button fake-custom-button centered-text" style="float: left;" id="closedTransfer">Transfer to X169CCA</div>')) }
    $('#closedTransfer').click(function() { buttonClosedTransfer() })
};
//SECTION END Close case transfer to x169CCA; Auto enter transfer info if have sessionStorage value; Add button to viewMode page to do transfer;


//SECTION START Navigation buttons to goto Eligibility Selection, Service Authorization Overview, and Case Overview from CaseWrapUp page
if (window.location.href.indexOf("CaseWrapUp.htm") > -1 && $('#done').attr('Disabled')) {
    let parm3var = '&parm3=' + document.getElementById('selectPeriod').value.replace(' - ', '').replaceAll('/','');
    $('#caseHeaderData').after(`<div>
    <div id="goEligibility" class="fake-custom-button-nodisable fake-custom-button">Eligibility</div>
    <div id="goSAOverview" class="fake-custom-button-nodisable fake-custom-button">SA Overview</div>
    <div id="goSAApproval" class="fake-custom-button-nodisable fake-custom-button">SA Approval</div>
    <div id="goEditSummary" class="fake-custom-button-nodisable fake-custom-button">Edit Summary</div>
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
    $(".dataTables_scrollBody").css('max-height','650px').css('resize','vertical');
};
//SECTION START Fixing the table height of the Client Search table

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
    addGlobalStyle('.form-control.borderless.padL0.padR0 { padding: 0px !important; }');
    document.getElementById('billingRegistrationFeesTable_wrapper').parentNode.previousElementSibling.classList.remove('clearfix');
    if (!viewMode) {
        let childAndProviderNames = "for " + getFirstName($('#billingChildTable>tbody>tr.selected>td:eq(1)').html()) + " " + getLastName($('#billingChildTable>tbody>tr.selected>td:eq(1)').html()) + " at " + $('#billingProviderTable>tbody>tr.selected>td:eq(0)').html()
        $('h4:not(h4:contains("Version Information"))').each(function() {
            $(this).html($(this).html() + ' ' + childAndProviderNames)
        })
        if ($('strong:contains("Warning: Rate entered")').length > 0) { $('#saveDuplicateButton').click() }
        function addBillingRows(changedId) {
            let weekOneDays = [parseInt($('#weekOneMonday').val()), parseInt($('#weekOneTuesday').val()), parseInt($('#weekOneWednesday').val()), parseInt($('#weekOneThursday').val()), parseInt($('#weekOneFriday').val()), parseInt($('#weekOneSaturday').val()), parseInt($('#weekOneSunday').val())]
            let weekTwoDays = [parseInt($('#weekTwoMonday').val()), parseInt($('#weekTwoTuesday').val()), parseInt($('#weekTwoWednesday').val()), parseInt($('#weekTwoThursday').val()), parseInt($('#weekTwoFriday').val()), parseInt($('#weekTwoSaturday').val()), parseInt($('#weekTwoSunday').val())]
            let $whichBilledWeek = changedId.indexOf("weekOne") > -1 ? $('#totalHoursBilledWeekOne') : $('#totalHoursBilledWeekTwo')
            let weekDaysChanged = changedId.indexOf("weekOne") > -1 ? weekOneDays : weekTwoDays
            $whichBilledWeek.val(weekDaysChanged.reduce((partialSum, a) => partialSum + a, 0))
            parseInt($('#totalHoursBilledWeekOne').val()) + parseInt($('#totalHoursBilledWeekTwo').val()) > parseInt($('#totalHoursOfCareAuthorized').val()) ? $('#totalHoursBilledWeekOne, #totalHoursBilledWeekTwo, #totalHoursOfCareAuthorized').addClass('red-outline') : $('#totalHoursOfCareAuthorized, #totalHoursBilledWeekOne, #totalHoursBilledWeekTwo').removeClass('red-outline')
        }
        $('#weekOneMonday, #weekOneTuesday, #weekOneWednesday, #weekOneThursday, #weekOneFriday, #weekOneSaturday, #weekOneSunday, #weekTwoMonday, #weekTwoTuesday, #weekTwoWednesday, #weekTwoThursday, #weekTwoFriday, #weekTwoSaturday, #weekTwoSunday').change(function() { addBillingRows($(this).prop('id')) } )
    }
};
//SECTION END FinancialBilling Fix to display table

//SECTION START FinancialBillingApproval button to add comments
if (window.location.href.indexOf("FinancialBillingApproval.htm") > -1 && !viewMode) {
    $('#remittanceComments').parents('.form-group').append('<div id="unpaidCopayNote" class="fake-custom-button-nodisable fake-custom-button"">Unpaid Copay</div>');
    $('#unpaidCopayNote').click(function() { $('#userComments').val('Copay is unpaid, provider did not indicate if there is a payment plan.') })
    $('#remittanceComments').parents('.form-group').append('<div id="paymentPlanNote" class="fake-custom-button-nodisable fake-custom-button flex-right">Payment Plan</div>');
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
    $('#workerSearch').parents('.col-lg-12').append('<div id="transferAllClosed" class="fake-custom-button custom-button flex-right">Transfer All Old Closed</div>')
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
    if (!viewMode && $('#mailingSiteHomeCountry').val() === '') {
        $('#mailingSiteHomeCountry').val('USA')
        $('#mailingSiteHomeState').val('Minnesota')
        $('#mailingSiteHomeCounty').val('St. Louis')
    }
    $('#mailingCountry').change(function() {
        if (('#mailingState').val() === '') {
            ('#mailingState').val('Minnesota')
        }
    })
//SECTION END ProviderAddress Default values for Country, State, County
//SECTION START ProviderAddress Copy Provider mailto Address
    $('#providerInput').append('<div class="custom-button fake-custom-button centered-text flex-right" id="copyMailing">Billing Form Address to Clipboard</div>');
    $('#copyMailing').click(function() {
        // copyMailing() });
        if ($('#addrBillFormDisplay').val() == "Site/Home") {
            let state = (document.getElementById('mailingSiteHomeState').value === "Minnesota") ? "MN":"WI";
            let copyText = $('#providerData').children(0).contents().eq(4).text() + "\n" + document.getElementById('mailingSiteHomeStreet1').value + " " + document.getElementById('mailingSiteHomeStreet2').value + "\n" + document.getElementById('mailingSiteHomeCity').value + ", " + state + " " + document.getElementById('mailingSiteHomeZipCode').value
            navigator.clipboard.writeText(copyText);
            snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        } else {
            let state = (document.getElementById('mailingState').value === "Minnesota") ? "MN":"WI";
            let copyText = $('#providerData').children(0).contents().eq(4).text() + "\n" + document.getElementById('mailingStreet1').value + " " + document.getElementById('mailingStreet2').value + "\n" + document.getElementById('mailingCity').value + ", " + state + " " + document.getElementById('mailingZipCode').value
            navigator.clipboard.writeText(copyText);
            snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
        };
    });
};
function copyMailing() {
    let providerName = (window.location.href.indexOf("CaseServiceAuthorizationOverview.htm") > -1) ? $('label[for="providerName"]').parent().contents().eq(4).text().trim() : $('#providerInfoTable>tbody>tr.selected>td:eq(1)').html().trim()
    if ($('#addrBillFormDisplay').val() == "Site/Home") {
        let state = (document.getElementById('mailingSiteHomeState').value === "Minnesota") ? "MN":"WI";
        let copyText = providerName + "\n" + document.getElementById('mailingSiteHomeStreet1').value + " " + document.getElementById('mailingSiteHomeStreet2').value + "\n" + document.getElementById('mailingSiteHomeCity').value + ", " + state + " " + document.getElementById('mailingSiteHomeZipCode').value
        navigator.clipboard.writeText(copyText);
        snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    } else {
        let state = (document.getElementById('mailingState').value === "Minnesota") ? "MN":"WI";
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

if (window.location.href.indexOf("ProviderOverview.htm") > -1) {
    $('div.col-lg-3').removeClass('col-lg-3 col-md-3').addClass('col-md-2 col-lg-2');
    $('div.textInherit.col-md-2.col-lg-2:not(.padL0)').removeClass('col-md-2 col-lg-2').addClass('col-lg-4 col-md-4');
    $('h4:contains("Provider Information")').css('display','table')
};
if (window.location.href.indexOf("getProviderOverview") > -1) {
    $('#providerButtons').click()
    $('#ProviderOverviewSelf').addClass('custom-button-clicked')
}

//SECTION START Auto-filter ProviderSearch results
if (window.location.href.indexOf("ProviderSearch.htm") > -1) {
    $('.dataTables_scrollBody').css('resize','vertical').css('max-height', '700px')
    const localCounties = ['St. Louis','Carlton','Itaska','Lake'];
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
    $('#back').after('<div id="inactiveToggle" class="fake-custom-button custom-button">Toggle Inactive</div><div id="outOfAreaToggle" class="fake-custom-button custom-button">Toggle Out of Area</div>');
    $('#inactiveToggle').click(function() { $('.inactive').toggleClass('inactive-hidden'); $('.dataTables_scrollBody').css('height',''); });
    $('#outOfAreaToggle').click(function() { $('.out-of-area').toggleClass('out-of-area-hidden'); $('.dataTables_scrollBody').css('height',''); });
};
//SECTION END Auto-filter ProviderSearch results

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

if (window.location.href.indexOf("Provider") < 0 && $('#comments, #memberComments, #textbox2').length > 0) { $('#comments, #memberComments, #textbox2').prop('rows','15').css('height','') };

if (window.location.href.indexOf("ProviderSearch.htm") > -1 && window.location.href.indexOf("from=CaseChildProvider") < -1) {
//todo: Hiding select and Back is complicated due to what shows up in the location info
}

if (window.location.href.indexOf("ProviderTaxInfo.htm") > -1) {
    $('#validateTaxIdButton').parent().removeClass('col-xs-12 col-sm-12 col-md-12 col-md-offset-2 col-lg-12 col-lg-offset-2').addClass('col-lg-offset-3 col-md-offset-3');
    $('label.col-lg-2').removeClass('col-lg-2 col-md-2').addClass('col-lg-3 col-md-3');
    $('label:contains("-")').addClass('collapse')
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

`/////////////////////////////////////////////////////// PAGE SPECIFIC CHANGES SECTION END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

///////////////////////////////////////////////////////////// FUNCTIONS SECTION START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ `

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


//Retaining Actual Date until WrapUp
if ($('#actualDate').length) {
    $('#save').click(function() {
        sessionStorage.setItem('actualDate', $('#actualDate').val())
    })
}
if (!viewMode && sessionStorage.getItem('actualDate') !== null && $('#actualDate').length && !$('#actualDate').val().length) {
    $('#actualDate').val(sessionStorage.getItem('actualDate'))
}
$('#wrapUp').click(function() {
    sessionStorage.removeItem('actualDate')
})//

if (window.location.href.indexOf("CaseNotes.htm") > -1) {
    $('#save').click(function() {
        $('#noteStringText').val($('#noteStringText').val().replace(/\u0009/g, "    "))
    })
}

function addCommaSpace(value) {
return String(value)
    .replace(/,([^0-9])/g, ", $1")
}
function toTitleCase(value, ...excludedWordList) {
  const exceptions = excludedWordList
    .flat(Infinity)
    .map(item => String(item).trim())
    .join('\\b|\\b');
  return String(value)
    .trim()
    .replace(/\s+/g, ' ')
    .replace(
      RegExp(`\\b(?!\\b${ exceptions }\\b)(?<upper>[\\w])(?<lower>[\\w]+)`, 'g'),
      (match, upper, lower) => `${ upper.toUpperCase() }${ lower.toLowerCase() }`,
    );
}
if (window.location.href.indexOf("CaseNotes.htm") < 0 && window.location.href.indexOf("CaseCSE.htm") < 0 && window.location.href.indexOf("/Alerts.htm") < 0 ) {
    $('td:not(:has(*)):not(thead *):not(:contains(" of "))').each(function() {
        $(this).text( addCommaSpace( $(this).text() ) )
        $(this).text( toTitleCase( $(this).text(), allCapsWords ) )
    })
}
//Definition
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
$('tr').attr('tabindex','0')
//window.addEventListener('mouseup', function(e) {console.log(document.activeElement)})
// window.addEventListener('keydown', function(e) {//use keyboard up/down to navigate table;//doesn't work, stays on one element
//     if (e.code === 'ArrowDown' && e.target.tagName === 'TR') {
//         e.preventDefault()
//         console.log($(e.target))
//         if ($(e.target).next('tr').length) {$(e.target).next('tr').click()}
//     }
// })

//
window.addEventListener('keydown', function(e) {//Don't scroll when using spacebar to click buttons
  if (e.code === 'Space' && (e.target.className.includes('custom-form-button') || e.target.className.includes('fake-custom-button'))) {
    e.preventDefault();
  }
});
//
$('html').css('scroll-behavior','smooth')
window.addEventListener('keydown', function(e) {//Smooth scroll to bottom with End
  if (!e.shiftKey /*&& e.keyCode === 35 */&& document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
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
  if (e.ctrlKey && e.keyCode === 83) {
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
    if (window.location.href.indexOf("CaseEligibilityResult") > 0 && window.location.href.indexOf("CaseEligibilityResultSelection.htm") < 0) { return }
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
            btnNavigation.dataset.NextOrPrev = buttonsNextPrev[i][2]
            btnNavigation.dataset.StayOrGo = buttonsNextPrev[i][3]
            btnNavigation.className = 'custom-button stay-or-go';
            if (buttonsNextPrev[i][2] == 'Prev') {
                selectPeriodParent.insertBefore(btnNavigation, selectPeriodDropdown)
            } else {
                selectPeriodParent.insertBefore(btnNavigation, selectPeriodDropdown.nextSibling)
            };
        };
        document.getElementById('selectPeriod').parentNode.onclick = function(event) {
            if (event.target.closest('button')?.tagName.toLowerCase() === 'button') {
                selectNextPrev(event.target.closest('button').id)
            }
        }
        function selectNextPrev(clickedButton){
            if (document.getElementById(clickedButton).dataset.NextOrPrev === "Next") {
                if (selectPeriodDropdown.selectedIndex == 0) {
                    return
                }
                selectPeriodDropdown.selectedIndex--;//Subtract to go towards top of list
                if (document.getElementById(clickedButton).dataset.StayOrGo === "Go") {
                    document.getElementById('caseInputSubmit').click();
                }
            } else {
                selectPeriodDropdown.selectedIndex++;
                if (document.getElementById(clickedButton).dataset.StayOrGo === "Go") {
                    document.getElementById('caseInputSubmit').click();
                }
            }
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
if (window.location.href.indexOf("ctiveCaseList.htm") < 0) {
    $('.modal .form-button').addClass('modal-button');//popup buttons
    $('table').click(function() {//check on table click if buttons were enabled/disabled and use class to mirror
        $('div.mutable').each(function() {
            let oldButtonId = $(this).prop('id').split('DuplicateButton')[0];
            if ($('#' + oldButtonId).prop('disabled')) {
                $(this).addClass('custom-form-button-disabled');
            } else {
                $(this).removeClass('custom-form-button-disabled');
            };
        });
    });
    $('.form-button:not([style*="display: none"]):not([id$="Business"]):not([id$="Person"]):not(.panel-box-format input.form-button)').not('.modal-button, #workerSearch, #contactInfo, #providerIdSubmit, #ratePeriodSelectButton, #validateCertificationButton, #resetCertButton, #validateLicenseButton, #resetLicButton, #selectFra, #caseSearch, #providerSearch, #caseInputSubmit, #alertInputSubmit, #search, #reset, #changeType, #storage, #addRegistrationFee, #deleteRegistrationFee, #addBilledTime, #deleteBilledTime, #calculate, #cappingInfo, #calcAmounts, .custom-button, .fake-custom-button, .doNotDupe').each(function() {
        if ($(this).val()) {
            let disabledStatus = $(this).prop('disabled') ? 'form-button custom-form-button custom-form-button-disabled centered-text mutable' : 'form-button custom-form-button centered-text mutable';
            let idName = $(this).prop('id') + "DuplicateButton";
            $('#dupeButtonHouse').append(`<div id="` + idName + `" tabindex="0" class="` + disabledStatus + `" onkeydown="(event.code == 'Space') && $('#` + $(this).attr('id') + `').click()" onclick="$('#` + $(this).attr('id') + `').click()">` + $(this).val() + `</div>`);
            //$('#buttonHouse').append("<div id=\"" + idName + "\" class=\"" + disabledStatus + "\" onclick=\"$('#" + $(this).attr('id') + "').click()\">" + $(this).val() + "</div>");
        };
    });
    $('#dupeButtonHouse').children().length == 0 && ($('#dupeButtonHouse').hide());
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
$('#footer_links, #footer_info, #popup').children().prop('tabindex', '-1');
$('#quit, #countiesTable, #extendedEligibilityExpires, #redeterminationDate, #caseInputSubmit, #letterChoice, #reset, #tempPeriodStart, #tempPeriodEnd, #deferValue').prop('tabindex', '-1');//quit, countiesTable=application; redet date, eEE=activity pages; cIS=submit button; lC=specialletter; reset=caseNotes; tempLeave = activities; defer=redet
$('#leaveDetailTemporaryLeavePeriodFrom, #leaveDetailTemporaryLeavePeriodTo, #leaveDetailExtendedEligibilityBegin, #tempLeavePeriodBegin, #tempLeavePeriodEnd, #extendedEligibilityBegin').prop('tabindex', '-1');//EmploymentActivity, SupportActivity
if (window.location.href.indexOf("CaseEarnedIncome.htm") > -1) { ($('#providerId, #providerSearch').prop('tabindex', '-1')) }
if (window.location.href.indexOf("ProviderSearch.htm") > -1) { ($('#ssn, #itin, #fein, #licenseNumber, #middleInitName').prop('tabindex', '-1')) }
$('#leaveDetailRedeterminationDue, #leaveDetailExpires').removeAttr('tabindex');
$('#caseId, #selectPeriod').prop('tabindex', '-1');
//SECTION END Removing items from the tabindex

//SECTION START Post load changes to the page
$('label').removeClass('control-label textR textInherit').addClass('centered-right-label');
$('h1').parents('div.row').addClass('h1-parent-row');
$(".marginTop5").removeClass("marginTop5" );
$(".marginTop10").removeClass("marginTop10" );
$(".padding-top-5px").removeClass("padding-top-5px" );
$('.col-lg-offset-3').addClass('col-md-offset-3');
$('.col-lg-3.col-md-2.col-sm-2.control-label.textR.textInherit').removeClass('col-md-2').addClass('col-md-3');
$('div[id*="ZipDash"]').add($('div[id*="ZipDash"]').next()).add($('input[id*="ZipCodePlus4"]')).add($('input[id*="zipCodePlus4"]')).addClass('collapse');
$('.col-xs-3.col-sm-3.col-md-3.col-lg-1').removeClass('col-md-3').addClass('col-md-1');
//SECTION END Post load changes to the page

///////////////////////////////// FUNCTIONS SECTION END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

setTimeout(function() {window.dispatchEvent(new Event('resize'))},400)//fixes table headers being wrongly sized due to the container size change in ReStyle
})();
