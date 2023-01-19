// ==UserScript==
// @name         MEC2Buttons
// @namespace    http://github.com/jbmccormick
// @version      0.67
// @description  Add navigation buttons to MEC2 to replace the drop down hover menus
// @author       MECH2
// @match        mec2.childcare.dhs.state.mn.us/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jbmccormick/MEC2Web/master/MEC2Buttons.user.js
// ==/UserScript==

(function() {
    'use strict';
/* globals jQuery, $, waitForKeyElements */
    $('#confirm').change(function() { console.log('Changed') });
    $('br').remove();
document.getElementsByClassName("line_mn_green")[0].setAttribute("id", "greenline");
let primaryPanelID = document.getElementById("page-wrap") ? document.getElementById("page-wrap") : document.getElementById("greenline");
$(primaryPanelID).after('<div id="navButtonHouse"><div class="button-row" id="buttonPaneOne"></div><div class="button-row" id="buttonPaneTwo"></div><div class="button-row" id="buttonPaneThree"></div></div><div id="buttonHouse" class="button-house"></div>');
$('#buttonHouse').siblings('br').remove();
let buttonDivOne = document.getElementById('buttonPaneOne');
let buttonDivTwo = document.getElementById('buttonPaneTwo');
let buttonDivThree = document.getElementById('buttonPaneThree');
let searchIcon = "<span style='font-size:80%;'>&#128269</span>";//🔍	128269	1F50D
let thisPageName = window.location.pathname.substring(window.location.pathname.indexOf("/ChildCare/") + 11, window.location.pathname.lastIndexOf("."));
if (primaryPanelID.getAttribute('Id') == "greenline") {
	addGlobalStyle('.custombutton { color: DarkGrey; cursor: no-drop; padding: 3px 4px; margin: 1px; border: 2px solid; border-radius:4px; }');
	addGlobalStyle('.custombuttonplus { border-left: 0; margin-left:-7px; border-top-left-radius:0; border-bottom-left-radius:0; }');
	addGlobalStyle('.custombutton:hover { background-color: #DAF7A6; }');
	addGlobalStyle('.custombuttonclicked { background-color: #A6EDF7; }');
	addGlobalStyle('.panel.panel-default { margin-top: 0px !important; }');
};
let viewMode = $('#page-wrap').length;
//$('head').append('<link rel="icon" type="image/png" href="https://www.dhs.state.mn.us/main/groups/secure/documents/twocolumns/~export/DHS16_139409~293~MANUALS_HCT/59499.png">');

//SECTION START Fix for table entries losing selected class when clicked on
$('tbody').click(function(event) {
    $(event.target).parents('tr').addClass('selected');
});
//SECTION END Fix for table entries losing selected class when clicked on

//SECTION START Make all h4 clicky collapse
$("h4").click( function() {
	$(this).nextAll().toggleClass("collapse")
});
//SECTION END Make all h4 clicky collapse

`///////////////////////////////// NAVIGATION BUTTONS SECTION START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ `

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
		financialPayHistory:["Pay History","CasePaymentHistory", "_self", "Case Payment History", "CasePaymentHistorySelf", "billingButtons"],
		financialAbsentDays:["Absent Days", "FinancialAbsentDayHolidayTracking", "_self", "Tracking Absent Day Holiday", "FinancialAbsentDayHolidayTrackingSelf", "billingButtons"],
		financialRegistrationFee:["Registration Fee Tracking", "FinancialBillingRegistrationFeeTracking", "_self", "Tracking Registration Fee", "FinancialBillingRegistrationFeeTrackingSelf", "billingButtons"],
		financialManualPayments:["Manual Payments", "FinancialManualPayment", "_self", "Manual Payments", "FinancialManualPaymentSelf", "billingButtons"],
	},
	providerButtons:{//arrayName:["Button Name", "PageNameWithoutDotHtm", "_self or _blank", "Id of Parent", "Id of Button", "RowTwoParent"],
		providerOverview:["Overview","ProviderOverview", "_self", "Provider Overview", "ProviderOverviewSelf", "providerButtons"],
        providerNotes:["Notes","ProviderNotes", "_self", "Provider Notes", "ProviderNotesSelf", "providerButtons"],
		//providerSearch:["Search","ProviderSearch", "_blank", "Provider Search", "ProviderSearchSelf", "providerButtons"],
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
	btnNavigation.setAttribute("data-pageName", gotoButtons[i][1]);
    if (primaryPanelID.getAttribute('Id') == "page-wrap") {
        btnNavigation.setAttribute("data-howToOpen", gotoButtons[i][2]);
    } else {
        btnNavigation.setAttribute("data-howToOpen", "_blank");
    };
	btnNavigation.setAttribute("data-pageLinkUsingId", [gotoButtons[i][3]]);
    btnNavigation.id = gotoButtons[i][4];
	btnNavigation.type = 'button';
    if (gotoButtons[i][0] == "+")
    {
        btnNavigation.className = 'custombutton custombuttonplus';
    } else {
        btnNavigation.className = 'custombutton';
    };
	buttonDivOne.appendChild(btnNavigation);
	btnNavigation.addEventListener("click", function() { gotoPage(this.id)}); //sends the gotoButtons array value 4 to gotoPage
};
for(let i = 0; i < mainRowButtons.length; i++){
    if (primaryPanelID.getAttribute('Id') == "greenline") { break };
	let btnNavigation = document.createElement('button');
	btnNavigation.innerHTML = mainRowButtons[i][0];
	btnNavigation.id = mainRowButtons[i][1];
	btnNavigation.type = 'button';
    btnNavigation.className = 'custombutton';
	buttonDivTwo.appendChild(btnNavigation);
	btnNavigation.addEventListener("click", function() { btnRowThree(this.id)}); //sends the mainRowButtons array value 1 to btnRowThree
};
//SECTION END Placing navigation buttons on the page

//SECTION START Reactive row three from click or page load
function btnRowThree(rowTwoButtonClicked){
    if (primaryPanelID.getAttribute('Id') == "greenline") { return };
    while (buttonDivThree.firstChild) {//replace with ${buttonDivThree}.empty()?
        buttonDivThree.removeChild(buttonDivThree.firstChild);
    };
    buttonClicked();
    document.getElementById([rowTwoButtonClicked]).classList.add("custombuttonclicked");
    let tempArray = Object.keys(rowThreeButtonArray[rowTwoButtonClicked]);
    for(let i = 0; i < tempArray.length; i++){
        let buttonArray = rowThreeButtonArray[rowTwoButtonClicked][tempArray[i]];
        let btnNavigation = document.createElement('button');
        btnNavigation.innerHTML = [buttonArray[0]];
        btnNavigation.setAttribute("data-pageName", [buttonArray[1]]);
        btnNavigation.setAttribute("data-howToOpen", [buttonArray[2]]);
		btnNavigation.setAttribute("data-pageLinkUsingId", [buttonArray[3]]);
        btnNavigation.id = buttonArray[4];
        btnNavigation.type = 'button';
        if (buttonArray[0] == "+") {
            btnNavigation.className = 'custombutton custombuttonplus';
        } else {
            btnNavigation.className = 'custombutton';
        };
        buttonDivThree.appendChild(btnNavigation);
        btnNavigation.addEventListener("click", function() { gotoPage(this.id)});
    };
    traverseOnRowTwoClick(rowThreeButtonArray[rowTwoButtonClicked]);
};
//SECTION END Reactive row three from click or page load

//SECTION START Using Id from button click to load href of associated element
function gotoPage(loadThisPage) {
    if (primaryPanelID.getAttribute('Id') == "greenline") {
        return
    };
    let getLinkUsingId = document.getElementById(`${loadThisPage}`);
    if (primaryPanelID.getAttribute('Id') == "greenline") { window.open("/ChildCare/"`${loadThisPage}`, "_blank"); };
    window.open(document.getElementById(getLinkUsingId.getAttribute('data-pagelinkusingid')).firstElementChild.getAttribute('href'), document.getElementById(`${loadThisPage}`).getAttribute('data-howtoopen'));
};
//SECTION END Using Id from button click to load href of associated element

//SECTION START Highlight row 2 buttons
function buttonClicked(){
$('.custombuttonclicked').removeClass('custombuttonclicked');
};
function traverseOnPageLoad(o) {
    if (primaryPanelID.getAttribute('Id') == "greenline") { return };
    for (let i in o) {
        if (o[i] == thisPageName) {
            btnRowThree(o[5]);
            if (document.getElementsByClassName('custombuttonclicked')) {
                document.getElementById([o[4]]).classList.add('custombuttonclicked');
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
            document.getElementById([o[4]]).classList.add('custombuttonclicked');
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
    newTabFieldVar.setAttribute('id', 'newTabField');
    newTabFieldVar.setAttribute('type', 'text');
    newTabFieldVar.setAttribute('maxlength', '8');
    newTabFieldVar.setAttribute('size', '8');
    buttonDivOne.appendChild(newTabFieldVar);
        for(let i = 0; i < openNotesOrOverview.length; i++){
            let buttonDivOne = document.getElementById("buttonPaneOne");
            let btnNavigation = document.createElement('button');
            btnNavigation.type = 'button';
            btnNavigation.innerHTML = [openNotesOrOverview[i][0]]
            btnNavigation.setAttribute("data-pageName", [openNotesOrOverview[i][1]]);
            btnNavigation.id = [openNotesOrOverview[i][2]];
            btnNavigation.className = 'custombuttonsearch';
            btnNavigation.addEventListener("click", function() { openCaseNumber(this.getAttribute('data-pageName'))});
            buttonDivOne.appendChild(btnNavigation);
        };
};
function openCaseNumber(e) {
    const enteredCaseNumber = document.getElementById('newTabField').value;//$('#newTabField').val()
    if (e == "CaseNotes") {
        window.open('/ChildCare/CaseNotes.htm?parm2=' + enteredCaseNumber, '_blank');
    } else {
        window.open('/ChildCare/CaseOverview.htm?parm2=' + enteredCaseNumber, '_blank');
    };
};
newTabFieldButtons();
!viewMode && ($('#buttonPaneTwo, #buttonPaneThree').hide());
//SECTION END Create text field and buttons for case number to open in new tab
`///////////////////////////////// NAVIGATION BUTTONS SECTION END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

///////////////////////////////// PAGE SPECIFIC CHANGES SECTION START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ `

//Seasonal items, just for fun
$('h1').prepend('⛄ ');
let $toLabel = $('label').filter(function() { return $(this).text() === 'to' || $(this).text() === 'to:' }).addClass('toLabel');//Making "to" between x to y elements smaller

//$('#caseInput').prepend($('label[for="caseHeaderName"]').parent().contents());//move case name up a line - need to fix dependent functions first
//$('#caseHeaderData').remove();

//SECTION START Focusing the first desired element on pages
function eleFocus(ele) {
    $(ele).ready(function() {
        setTimeout(function() {
            console.log($( document.activeElement ))
            $(ele).addClass('focusedElement')
            $('.focusedElement').focus()
            console.log($( document.activeElement ))
        }, 1000);
    });
};
// ? eleFocus('#') : eleFocus('#');
//(window.location.href.indexOf('') > -1 && !viewMode) && eleFocus('#')

if (window.location.href.indexOf("CaseApplicationInitiation") > -1) {
    if (viewMode) {
        eleFocus('#new');
    } else {
        $('#pmiNumber').attr('disabled') ? eleFocus('#next') : eleFocus('#pmiNumber');
    };
};
//window.location.href.indexOf("ClientSearch.htm?from") > -1 && !viewMode ? eleFocus() : eleFocus();
//(window.location.href.indexOf("CaseMember.htm?from=CaseApplicationInitiation") > -1) && eleFocus('#next')
//(window.location.href.indexOf("CaseMemberII.htm?from") > -1 && $('#next').attr('disabled') && viewMode) ? eleFocus('#new') : eleFocus('#next')
//(CaseMemberII && !viewMode)) && eleFocus('#memberReferenceNumberNewMember')
if (window.location.href.indexOf('CaseAddress.htm?from') > -1) {
    if (viewMode) {
        eleFocus('#new')
    } else {
        $('#effectiveDate').attr('disabled') ? eleFocus('#subsidizedHousing') : eleFocus('#effectiveDate')
    };
};
//
window.location.href.indexOf("CaseMemo") > -1 && !viewMode && ($('#memberComments').focus());
//
if (window.location.href.indexOf('CaseNotes') > -1 && !viewMode) {
    $('#noteMemberReferenceNumber').focus(function() {
        setTimeout(document.querySelector('#save').scrollIntoView({ behavior: 'smooth', block: 'end' }), 0)
    })
    eleFocus('#noteMemberReferenceNumber');
};
(window.location.href.indexOf("CaseNotes") > -1 && viewMode) && eleFocus('#newDuplicateButton');
//
(window.location.href.indexOf("CaseSpecialLetter") > -1 && !viewMode) && eleFocus('#status');
//
(window.location.href.indexOf("CaseSupportActivity") > -1 && !viewMode) && eleFocus('#memberReferenceNumberNewMember');
//
if (window.location.href.indexOf("CaseParent") > -1 && !viewMode) {
    $('#parentReferenceNumberNewMember').length == 0 ? $('#childReferenceNumberNewMember').focus() : $('#parentReferenceNumberNewMember').focus();
};
//SECTION END Focusing the first desired element on pages

//SECTION START Page Specific Changes

//SECTION START Active caseload numbers
if (window.location.href.indexOf("ActiveCaseList") > -1) {
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

//SECTION START Sort caseload lists by client name, ascending
if (window.location.href.indexOf("ActiveCaseList") > -1 || window.location.href.indexOf("InactiveCaseList") > -1 || window.location.href.indexOf("PendingCaseList") > -1) {
    document.getElementsByClassName('sorting')[1].click()
};
//SECTION END Sort caseload lists by client name, ascending

////// ALERTS.htm start //////
if (window.location.href.indexOf("Alerts") > -1 && $('#new').length > 0) {
    //SECTION START Superfluous delete button
    $('label[for="message"]').parent('.row').remove();
    $('#alertsPanelData').css('overflow','visible');
    $('#alertTotal').after('<div class="form-button custom-form-button centered-text" id="deleteTop">Delete Alert</div>')
    $('#deleteTop').click(function() { $('#delete').click()});
    //SECTION END Superfluous delete button

    //SECTION START Delete all alerts of current name onclick
    $('#delete').after('<div class="form-button custom-form-button centered-text" id="deleteAll" title="Delete All" value="Delete All" style="display: none;">Delete All</div>');
    $('h4:contains("Case/Provider List")').after('<h4 style="float: right; display:inline-flex color: #003865; font-size: 1.2em; font-weight: bold;" id="alertMessage"></h4>');
    $('#deleteAll').val('Delete All').on("click", function() {
        let caseNumberToDelete = $('#caseNumber').val();//$("#groupId").val();
        let caseName = $('#groupName').val();
        console.log('Delete All variables set; caseNumberToDelete is ' + caseNumberToDelete + ',caseName is '+ caseName)
        doDeleteAll(caseNumberToDelete, caseName);
    });
    function doDeleteAll(caseNumberToDelete, caseName) {
        const observer = new MutationObserver(doDeleteAll);
        observer.disconnect();
        console.log('started doDeleteAll')
        if (caseNumberToDelete == $('#caseNumber').val() && $('#delete').val() !== 'Please wait') {
            console.log(caseNumberToDelete + ' vs ' + $('#caseNumber').val())
            $('#delete').click();
            console.log('Clicking Delete, going to the top');
            setTimeout(function() {return doDeleteAll(caseNumberToDelete, caseName)}, 1000);
        } else if ($('#caseOrProviderAlertsTable td:contains("' + caseName + '")').nextAll().eq(1).html() < 1) {//Any alerts to delete?
            console.log(caseNumberToDelete + ' vs ' + $('#caseNumber').val())
            $('#alertMessage').text('Delete All ended. All alerts deleted from case ' + caseNumberToDelete + '.');
        } else if ($('#delete').val() !== 'Delete Alert') {
            console.log(caseNumberToDelete + ' vs ' + $('#caseNumber').val())
            $('#alertMessage').text('Waiting for Delete button to be available.');
            observer.observe(document.querySelector('#delete'), {attributeFilter: ['value']});//attributes: true,
        } else if (caseNumberToDelete !== $('#caseNumber').val()) {
            console.log(caseNumberToDelete + ' vs ' + $('#caseNumber').val())
            if (!$('#caseOrProviderAlertsTable td:contains("' + caseName + '")')) {
                $('#alertMessage').text('Case number not present.')
            };
            $('td:contains("' + caseName + '")').parent('tr').click();
            console.log('failed for not being on correct row')
            setTimeout(function() {return doDeleteAll(caseNumberToDelete, caseName)}, 1000);
        } else if ($("#groupId").val() === caseNumberToDelete/* && $('#delete').val() === 'Delete Alert'*/) {
            console.log(caseNumberToDelete + ' vs ' + $('#caseNumber').val())
            $('#alertMessage').text('Alerts remaining: ' + $('#caseOrProviderAlertTotal').val())
            observer.observe(document.querySelector('#delete'), {attributeFilter: ['value']});//attributes: true,
        };
        // if ($('#delete').val() === 'Delete Alert' && $('#delete').prop('disabled')) {
        //     $('#alertMessage').text('Delete All ended. Alert can\'t be deleted.');//Maybe hide the undeleteable rows and try return doDeleteAll()?
        // }//Commented as undeletable alerts will just hide if 'deleted'
    };
    //SECTION END Delete all alerts of current name onclick

    //SECTION START Do action based on Alert Type
    $('h4:contains("Alert Detail")').width('13%').attr('id','h4AlertDetail').css('display','inline-flex');
    //$('#groupName').parents('.col-lg-6.col-md-6').prepend('<div id="navButtonHome"></div>');
    $('#h4AlertDetail').after('<div id="navButtonHome" style="display: inline-flex;"></div>');
    let anchorPoint = document.getElementById('navButtonHome');
    let btnNavigation = document.createElement('div');
    btnNavigation.type = 'div';
    btnNavigation.innerHTML = "Select an alert";
    btnNavigation.id = "doTheThing";
    btnNavigation.className = 'custombutton fake-custom-button';
    anchorPoint.appendChild(btnNavigation);
    btnNavigation.addEventListener("click", function() { goDoTheThing()});
    let clickedAlert = $('#alertTable');
    $('#doTheThing').text($('#alertTable .selected').children().eq(0).text());
    $('#caseOrProviderAlertsTable, #alertTable').click(function(event) {
        changeButtonText();
    });
    waitForElmValue('#alertTable > tbody > tr > td').then((elm) => {
        //onAlertsLoaded();
        changeButtonText();
        //goScrollIntoView();
    });
    //SECTION END Do action based on Alert Type

    function goScrollIntoView() {
        if ($('.dataTables_empty').length > 0) {
            console.log('No data in tables')
            document.querySelector('#caseOrProviderAlertsTable .selected').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        };
    };

    function changeButtonText() {
        let alertType = $('#alertTable .selected').children().eq(0).text()
        if (alertType == '') {
            document.getElementById('doTheThing').innerHTML = 'Click on Alert'
        } else if (alertType == 'Eligibility') {
            document.getElementById('doTheThing').innerHTML = alertType
        } else {
            document.getElementById('doTheThing').innerHTML = alertType + ' is not yet supported'
        };
    };
    const alertCategories = {
    };
    //SECTION START Do action based on Alert Type
    function goDoTheThing() {
        //rewrite this section. Make arrays based on category, get category and match to startsWith?
        let messageText = document.getElementById('message');//alertTable
        if (messageText.value == "Unapproved results have been created and need review.") {//eventually replace this with... startsWith? Spreadsheet in Documents has alerts list.
            let parm2var = document.getElementById('caseOrProviderAlertsTable').getElementsByClassName('selected')[0].childNodes[2].innerText //caseOrProviderTable selected[0]
            let parm3var = document.getElementById('periodBeginDate').value.replace(/\//g, '') + document.getElementById('periodEndDate').value.replace(/\//g, '')
            window.open('/ChildCare/CaseEligibilityResultSelection.htm?parm2=' + parm2var + '&parm3=' + parm3var, '_blank')
        };
    };
    //SECTION END Do action based on Alert Type

    //SECTION START Copy Alert text, navigate to Case Notes
    function copyExplanation() {
        let copyText = document.getElementById("message").value.replaceAll('/n', ' ');
        navigator.clipboard
            .writeText(copyText)
            .then(() => {
            localStorage.setItem('mech2.caseNoteText', copyText);
            snackBar('Copied! <br>' + copyText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
            let parm2var = document.getElementById('caseOrProviderAlertsTable').getElementsByClassName('selected')[0].childNodes[2].innerText //$('#caseOrProviderTable_wrapper .selected').children('td:nth-child(3)')//.text()?
            let parm3var = document.getElementById('periodBeginDate').value.replace(/\//g, '') + document.getElementById('periodEndDate').value.replace(/\//g, '')
            window.open('https://mec2.childcare.dhs.state.mn.us/ChildCare/CaseNotes.htm?parm2=' + parm2var + '&parm3=' + parm3var, '_blank')
        })
            .catch(() => {
            alert("Something went wrong");
        });
    };
    $('#navButtonHome').prepend('<div class="custombutton fake-custom-button" id="copyAlertButton">Copy, goto Notes</div>');
    $('#copyAlertButton').click(function() { copyExplanation()});
    //SECTION END Copy Alert text, navigate to Case Notes

    //SECTION START Moving Worker ID and Worker Name to the section they are displayed in
    $('#inputWorkerId').parent().attr('id','workerIdRow')
    $('#workerName').parent().attr('id','workerNameRow')
    $('#workerIdRow, #workerNameRow').prependTo($('#caseOrProviderAlertsTable_wrapper').parent())
    //SECTION END Moving Worker ID and Worker Name to the section they are displayed in

    //SECTION START Resize the Alert page's Explanation viewable area
    $('.h1-parent-row').siblings('br[clear!="all"]').remove();
    //$('.col-lg-12').addClass('clearfix');//Should already be clearfix'd later in the script
    addGlobalStyle ('#message {	resize: none; width: 450px !important; padding: 5px; overflow: hidden; box-sizing: border-box; }');
    $('#message').parent().removeClass('col-lg-9 col-md-9').addClass('col-lg-12 col-md-12');
    $('#message').parents('.row').prev('br').remove();
    $('label[for="groupId"]').text('Case #/PID:');
    $('label[for="groupName"]').text('Case/Provider:');
    $("#alertTable").on('click', function() {
        $("#message").css('height', '100px');
        $("#message").css('height', $("#message").get(0).scrollHeight + 'px');
    });
};
//SECTION END Resize the Alert page's Explanation viewable area
////// ALERTS.htm end //////

//SECTION START Add 25 day delay to approving MFIP close and TY/BSF open
if (window.location.href.indexOf("AlertWorkerCreatedAlert") > -1 && window.location.href.indexOf("pageUrl") < 0) {
    $('#message').parent().after('<div class="fake-custom-button-nodisable fake-custom-button" style="float: left"; id="delayApproval">MFIP Close Delay Alert</div>')
        $('#delayApproval').click(function() {
            let datePlus25 = addDays(new Date(), 25).toLocaleDateString('en-US', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            });
            $('#message').val("Approve new results (BSF/TY/extended eligibility) if MFIP not reopened.");
            $('#effectiveDate').val(datePlus25);
            $('#save').focus();
        });
};
//SECTION END Add date delay to approving MFIP close and TY/BSF open

//
if (window.location.href.indexOf('BillsList') > -1) {
    $('.col-lg-12[align="center"]').attr('class','');
};
//

//SECTION START Fix button placement on CaseAction
if (window.location.href.indexOf("CaseAction") > -1) {
    $('#edit').parents('.form-group').after($('#edit').parent().children());
    addGlobalStyle('input.form-button { margin-left: 10px !important; }');
    $('input[type="checkbox"]:not(:eq(0))').before('<br>');
};
//SECTION END Fix button placement on CaseAction

//SECTION START Copy client mail to address to clipboard on Case Address page
if (window.location.href.indexOf("CaseAddress") > -1) {
    function firstNameSplitter(name) {
        if (name.split(",")[1].split(" ").length > 3) {
            return name.split(",")[1].split(" ")[1] + " " + name.split(",")[1].split(" ")[2]
        } else {
            return name.split(",")[1].split(" ")[1]
        };
    };
    $('#effectiveDate').parent().after('<div class="custombutton fake-custom-button centered-text" style="float: right;" id="copyMailing">Copy Mail Address</div>');
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
};
//SECTION END Copy client mail to address to clipboard on Case Address page

//SECTION START CaseAddress changes and fixes
if (window.location.href.indexOf("CaseAddress") > -1) {
    $('#phone1').parents('.panel-box-format').find('div>label.col-lg-2').removeClass('col-lg-2').addClass('col-lg-3');
    $('#phone1').parents('.panel-box-format').find('div.col-lg-1').remove();
    $('label.col-md-2').addClass('col-md-3').removeClass('col-md-2');//Fix wrongly sized columns for several labels on Case Address
    $('#mailingStreet1').val() == '' && !$('#edit').prop('disabled') && ($('h4:contains("Mailing Address")').click());//Shrink mailing address if blank
    if (viewMode) {
        $('#phone2, #phone3, #residenceStreet2, #contactNotes, #email').each(function() {
            $(this).val() == '' && ($(this).parents('.form-group').addClass('collapse'))
        });
    };
    if (viewMode) {
        $('#caseAddressTable').click(checkMailingAddress);
    };
    function checkMailingAddress() {
        if ($('#mailingStreet1').val() != '' && $('#mailingStreet1').parents('.form-group').hasClass('collapse')) {
            $('h4:contains("Mailing Address")').click();
        } else if ($('#mailingStreet1').val() == '' && !$('#mailingStreet1').parents('.form-group').hasClass('collapse')) {
            $('h4:contains("Mailing Address")').click();
        };
    };
};
//SECTION END CaseAddress changes and fixes

if (window.location.href.indexOf("CaseApplicationInitiation") > -1) {
    $('#retroApplicationDate').parents('.form-group').hide();
};


//SECTION START Open provider information page from Child's Provider page
if (window.location.href.indexOf("CaseChildProvider") > -1) {
    $('#providerSearch').parent().after('<div class="custombutton fake-custom-button" style="float: right"; id="providerAddressButton">Provider Address</div>')
        $('#providerAddressButton').click(function() {
            window.open("/ChildCare/ProviderAddress.htm?providerId=" + $('#providerId').val(), "_blank");
        });
    $('#providerSearch').parent().after('<div class="custombutton fake-custom-button" style="float: right"; id="providerInfoButton">Provider Contact</div>')
        $('#providerInfoButton').click(function() {
            window.open("/ChildCare/ProviderInformation.htm?providerId=" + $('#providerId').val(), "_blank");
        });
    $('#reporterTypeCheckboxes input[name="reporterTypeSelections"]:not(:eq(0))').before('<br>');
//};
//SECTION END Open provider information page from Child's Provider page

//SECTION START CaseChildProvider hiding fields if provider type is not LNL
//if (window.location.href.indexOf("CaseChildProvider") > -1) {
function childProviderPage() {
    $('#instructions').remove();
    let $lnlGroup = $('#providerLivesWithChildBeginDate, #careInHomeOfChildBeginDate, #exemptionReason, #exemptionPeriodBeginDate, #formSent, #signedFormReceived').parentsUntil('.form-group');
    if ($('#providerType').val() !== "Legal Non-licensed" && $('#providerType').val() !== '') {//not LNL
        if (!viewMode) {//not LNL, edit mode
            $('#providerLivesWithChild').val("N");
            $('#careInHome').val("N");
            $('#relatedToChild').val("N");
        } else {//not LNL, view mode
            $lnlGroup.addClass('collapse');
        };
    } else {//is LNL
        if (!viewMode) {//is LNL, edit mode
            $lnlGroup.removeClass('collapse');
        } else {//is LNL, view mode
            $('#providerLivesWithChildBeginDate, #careInHomeOfChildBeginDate').each(function() {
                if ($(this).val() === '') {
                    $(this).parents('.col-lg-12').addClass('collapse');
                } else {
                    $(this).parents('.col-lg-12').removeClass('collapse');
                };
            });
        };
    };
    $('#exemptionPeriodBeginDate').each(function() {
        if ($(this).val() === '') {
            $(this).parents('.col-lg-12').addClass('collapse')
        } else {
            $(this).parents('.col-lg-12').removeClass('collapse')
        };
    });
};
    $('label[for="providerLivesWithChild"]').text('Lives with Child: ').removeClass('col-md-3 col-lg-3').addClass('col-md-2 col-lg-2');
    $('label[for="providerLivesWithChild"]').add($('label[for="providerLivesWithChild"]').siblings()).appendTo($('label[for="childCareMatchesEmployer"]').parent())
    $('label[for="relatedToChild"]').removeClass('col-md-3 col-lg-3').addClass('col-md-2 col-lg-2');
    $('label[for="relatedToChild"]').add($('label[for="relatedToChild"]').siblings()).appendTo($('label[for="careInHome"]').parent());
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

//SECTION START Fill Child Support PDF Forms
if (window.location.href.indexOf("CaseCSE") > -1) {
    //$('#caseInputSubmit').after('<div class="custombutton fake-custom-button centered-text" id="csForms" style="display: inline-flex; margin-left: 10px !important;">CS Forms</div>');
    $('#actualDate').parent().after('<div class="custombutton fake-custom-button centered-text" id="csForms" style="float: right";">Generate CS Forms</div>');
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
};
//SECTION END Fill Child Support PDF Forms

//SECTION START Remove unnecessary fields from Child Support Enforcement
if (window.location.href.indexOf("CaseCSE") > -1) {
    let $hiddenCSE = $('#cseAbsentParentInfoMiddleInitial, #cseAbsentParentInfoSsn, #cseAbsentParentInfoBirthdate, #cseAbsentParentInfoAbsentParentSmi, #cseAbsentParentInfoAbsentParentId').parents('.form-group')
    $($hiddenCSE).hide();
    $('#cseAbsentParentInfoLastName').parent().after('<div class="fake-custom-button fake-custom-button-nodisable centered-text" style="float: right;" id="abpsShowHide">Toggle extra info</div>');
    $('#abpsShowHide').click(function() { $($hiddenCSE).toggle() });
    let $goodCause = $('#cseGoodCauseClaimStatus').parents('.form-group').siblings().not('h4')
    function hideBlankGoodCause() {
        if ($('#cseGoodCauseClaimStatus').val() == 'Not Claimed') {
            $goodCause.hide();
        };
    };
    hideBlankGoodCause();
    $('#cseGoodCauseClaimStatus').change(hideBlankGoodCause());
    $('#csePriTable').click(function() { cseReviewDate() });
    function cseReviewDate() {
        if ($('#cseGoodCauseClaimStatus').val() == 'Granted') {
            $('#cseGoodCauseReviewNextGCReviewDate').parents('.form-group').show();
        } else {
            $('#cseGoodCauseReviewNextGCReviewDate').parents('.form-group').hide();
        };
    };
    $('#cseGoodCauseClaimStatus').parent().after('<div class="fake-custom-button fake-custom-button-nodisable centered-text" style="float: right;" id="cseGoodCauseClaimStatusToggle">Toggle extra info</div>');
    $('#cseGoodCauseClaimStatusToggle').click(function() { $goodCause.toggle() });
};
//SECTION END Remove unnecessary fields from Child Support Enforcement

//CSE focus start
if (window.location.href.indexOf("CaseCSE") > -1 && !viewMode) {
    if ($('#csePriNewReferenceNumber').length == 0) {
        $('#cseChildrenGridChildNewReferenceNumber').focus();
    } else {
        $('#csePriNewReferenceNumber').focus();
    };
};
//CSE focus end

//SECTION START Remove unnecessary fields from CaseEarnedIncome, set to MN, USA when leaving Employer Name field
if (window.location.href.indexOf("CaseEarnedIncome") > -1) {
    let ceiEmployment = $('#ceiPrjAmount, #ceiAmountFrequency, #ceiHrsPerWeek').parents('.form-group');
    let ceiSelfEmployment = $('#ceiGrossIncome, #ceiGrossAllowExps, #ceiTotalIncome').parents('.form-group')
    $('#earnedIncomeMemberTable').click(checkSelfEmploy);
    function checkSelfEmploy() {
        if (($('#ceiIncomeType').val() == "Wages") || (viewMode && $('#ceiGrossIncome').val() == '')) {
            ceiSelfEmployment.addClass('collapse');
            ceiEmployment.removeClass('collapse');
        } else if ($('#ceiIncomeType').val() == "Self-employment") {
            ceiSelfEmployment.removeClass('collapse');
            ceiEmployment.addClass('collapse');
        };
    };
    checkSelfEmploy()
    let hiddenCEI1 = $('#ceiEmpStreet, #ceiEmpStreet2, #ceiEmpCity, #ceiEmpStateOrProvince, #ceiPhone, #ceiEmpCountry').parents('.form-group')
    hiddenCEI1.hide();
    $('#ceiIncomeType').parent().after('<div class="fake-custom-button fake-custom-button-nodisable centered-text" style="float: right;" id="ceiShowHide1">Toggle extra info</div>');
    $('#ceiShowHide1').click(function() { $(hiddenCEI1).toggle() });
    //
    let hiddenCEI2 = $('#ceiCPUnitType, #ceiNbrUnits').parents('.form-group')
    hiddenCEI2.hide();
    $('#ceiPrjAmount').parent().after('<div class="fake-custom-button fake-custom-button-nodisable centered-text" style="float: right;" id="ceiShowHide2">Toggle extra info</div>');
    $('#ceiShowHide2').click(function() { $(hiddenCEI2).toggle() });
    //
    if ($('#providerName').val().length < 1) {
        let hiddenCEI3 = $('#providerName, #addressStreet').parents('.form-group')
        hiddenCEI3.hide();
        $('#providerSearch').parent().after('<div class="fake-custom-button fake-custom-button-nodisable centered-text" style="float: right;" id="ceiShowHide3">Toggle extra info</div>');
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
    };
};
//SECTION END Remove unnecessary fields from CaseEarnedIncome, set to MN, USA when leaving Employer Name field

//SECTION START CaseEarnedIncome CaseUnearnedIncome CaseExpense collapse unnecessary H4s
if (window.location.href.indexOf("CaseEarnedIncome") > -1 || window.location.href.indexOf("CaseUnearnedIncome") > -1 || window.location.href.indexOf("CaseExpense") > -1) {
    $( "h4:contains('Actual Income')" ).nextAll().addClass("collapse")
    $( "h4:contains('Student Income')" ).nextAll().addClass("collapse")
    $( "h4:contains('Actual Expense')" ).nextAll().addClass("collapse")
};
//SECTION END CaseEarnedIncome CaseUnearnedIncome CaseExpense collapse unnecessary H4s

//SECTION START CaseEditSummary Remove padding from left of inputs in the summary
if (window.location.href.indexOf('CaseEditSummary') > -1) {
    $('#editSummaryPanelData').append('<style>input {padding-left: 0px !important}</style>')
};
//SECTION END CaseEditSummary Remove padding from left of inputs in the summary

//SECTION START CaseEligibilityResultFamily Fix 'Select' elements to have class col-md-4 so they show the entire word
if (window.location.href.indexOf("CaseEligibilityResultFamily") > -1) {
    $('select').parent('.col-md-3').removeClass('col-md-3').addClass('col-md-4');
    $('label.col-lg-8').removeClass('col-lg-8').addClass('col-lg-7');
};
//SECTION END CaseEligibilityResultFamily Fix 'Select' elements to have class col-md-4 so they show the entire word

//SECTION START Custom fix for CaseEligibilityResultFamily (1 label&field)
if (window.location.href.indexOf("CaseEligibilityResultFamily") > -1) {
	$('label[for="allowedTemporaryIneligibilityExpireTest"]').removeClass("col-md-8").addClass("col-md-7").removeAttr('style')
};
//SECTION END Custom fix for CaseEligibilityResultFamily (1 label&field)

//SECTION START Highlight "Fail||Ineligible" in eligibility results
if (window.location.href.indexOf("CaseEligibilityResult") > -1) {
    let $isNo = $('tbody > tr > td').filter(function() { return $(this).text() === 'No' });
    let tableBody = $('table tbody').parent().DataTable()
    $isNo.filter(function() {
        return $(tableBody.column( tableBody.cell( $(this) ).index().column ).header()).html() == "In Family Size" || $(tableBody.column( tableBody.cell( $(this) ).index().column ).header()).html() == "Verified"
    })
        .add('tbody > tr > td:contains("Ineligible")')
        .css('background-color','yellow')
    $('div[title="Family Result"]:contains("Ineligible")').css('background-color','yellow');
    $('div:contains("Fail"):not(:has("option")):last-child').parent().children().css('background-color','yellow');
    $('option:selected:contains("Fail")').parentsUntil('.row').children().css('background-color','yellow');
};
//SECTION END Highlight "Fail" in eligibility results

//SECTION START CaseEligibilityResultApproval Add 90 days to date entered to ExtElig Begin Date
if (window.location.href.indexOf("CaseEligibilityResultApproval") > -1) {
	$('#beginDate').change(function() {
        $('#extEligPlus90button').remove();
		let extEligPlus90 = addDays($('#beginDate').val(), 90);
		extEligPlus90 = new Date(extEligPlus90).toLocaleDateString('en-US', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
        });
		$('#beginDate').parent().after('<div class="centered-text rounded-border-box" id="extEligPlus90button" style="padding: 2px; background-color: #dcdcdc; cursor: pointer;">+90: ' + extEligPlus90 + '</div>');
        $('#extEligPlus90button').click(function() {
            $('#allowedExpirationDate').val(extEligPlus90);
            const event = new Event('change');
            document.querySelector('#allowedExpirationDate').dispatchEvent(event);
            $('#save').focus();
        });
	});
};
//SECTION END CaseEligibilityResultApproval Add 90 days to date entered to ExtElig Begin Date

//SECTION START Custom fix and text for CaseEligibilityResultSelection
if (window.location.href.indexOf("CaseEligibilityResultSelection") > -1) {
    if ($('strong.rederrortext').html() === 'Background transaction in process.') {
        $('#select').prop('disabled','disabled')
        $('#selectButton').addClass('custom-form-button-disabled');
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
    addGlobalStyle('#message { font-size: 130%; background-color: yellow; display: inline !important; }');
    document.getElementById('message').innerHTML = "Select a program record listed above and click Select below to view the Eligibility Results."
    if (document.getElementsByClassName('dataTables_empty').length == 0) { document.getElementsByClassName('sorting')[1].click() };//sort by program type
    $('tbody > tr > td:contains("Unapproved")').addClass('Unapproved-Elig-Result').parent('tr').addClass('Unapproved');//Highlight unapproved
    $('tbody > tr > td:contains("Eligible")').parent('tr').addClass('Eligible');
    $('tbody > tr > td:contains("Ineligible")').parent('tr').addClass('Ineligible');
    if ($('.Unapproved.Eligible').length > 0) {
        !$('.Unapproved.Eligible').hasClass('selected') && ($('.Unapproved.Eligible').click());
    } else {
        !$('.Unapproved.Ineligible').hasClass('selected') && ($('.Unapproved.Ineligible').click());
    };
    /*let $ineligible = $('tbody > tr > td').filter(function() { return $(this).text() === 'Ineligible' });
    let $eligible = $('tbody > tr > td').filter(function() { return $(this).text() === 'Eligible' });
    if ($('.Unapproved-Elig-Result').siblings($eligible)) {
        $('.Unapproved-Elig-Result').siblings($eligible).eq(0).click()
    } else {
        $('.Unapproved-Elig-Result').siblings($ineligible).eq(0).click()
    };*/
};
//SECTION END Custom fix and text for CaseEligibilityResultSelection

//SECTION START Redirect if we're on elig results and there's no version selected
if (window.location.href.indexOf("CaseEligibilityResult") > -1 && window.location.href.indexOf("CaseEligibilityResultSelection") < 0) {
    let interval;
    function check() {
        if ($('[id$="TableAndPanelData"]').css('display') == "none") {
            clearInterval(interval);// clearInterval will stop its periodical execution.
            window.open(document.getElementById("Eligibility Results Selection").firstElementChild.getAttribute('href'), "_self")
        };
    };
    interval = setInterval(check, 200);// Create an instance of the check function interval
    check();
};
//SECTION END Redirect if we're on elig results and there's no version selected

//SECTION END Remove unnecessary fields from CaseExpense
if (window.location.href.indexOf("CaseExpense") > -1) {
	let hiddenExp = $('#projectionExpenseUnitType, #projectionExpenseNumberOfUnits').parents('.form-group');
	hiddenExp.hide();
	$('#projectionExpenseAmount').parent().after('<div class="fake-custom-button fake-custom-button-nodisable centered-text" style="float: right;" id="ceiShowHide2">Toggle extra info</div>');
	$('#ceiShowHide2').click(function() { $(hiddenExp).toggle() });
    $('.col-md-2.col-lg-2').removeClass('col-lg-2 col-md-2').addClass('col-md-3 col-lg-3');
    $('#paymentBeginDate').css('margin-right', '4px');
    $('#paymentEndDate').css('margin-left', '10px');
};
//SECTION END Remove unnecessary fields from CaseExpense

//SECTION START CaseFraud Column resizing
window.location.href.indexOf('CaseFraud') > -1 && ($('.col-md-3, .col-lg-3').removeClass('col-md-3 col-lg-3').addClass('col-md-5 col-lg-4'));
//SECTION START CaseFraud Column resizing

//SECTION START CaseLockStatus Reveal Unlock button
if (window.location.href.indexOf("CaseLockStatus") > -1) {
	if ($('label[for="requestMessage"]').parent(':contains("CASE LOCKED IN MEC2")')) {
        $('#caseLockStatusDetail').append('<div style="font-size: 20px; background-color: yellow;" id="acceptMyTerms">I acknowledge that I take responsibility for my own actions. Click this text to show the "Unlock" button.</div>')
        $('#acceptMyTerms').click(function() {
            $("#caseLockStatusUnlockButtonArea").show();
            $("#acceptMyTerms").remove();
        });
	};
};
//SECTION END CaseLockStatus Reveal Unlock button

//SECTION START Open CaseMemberHistory page from CaseMember with 'button'
if (window.location.href.indexOf("CaseMember") > -1 && !viewMode) {//$('#page-wrap').length == 0
    $('label[for="memberReferenceNumber"]').attr('id','openHistory').css('border-width','1px').css('border-color','gray').css('border-style','solid');
    $('#openHistory').click(function() {
        window.open('/ChildCare/CaseMemberHistory.htm?parm2=' + $('#caseId').val(), '_blank');
    });
};
//SECTION START Open CaseMemberHistory page from CaseMember with 'button'

//SECTION START CaseMember Shortening text fields so they fit in a col-md-4
if (window.location.href.indexOf("CaseMember") > -1) {
    $( "label:contains('American Indian or Alaskan Native')" ).prop('innerText', 'American Indian or AK Native');
    $( "label:contains('Pacific Islander or  Native Hawaiian')" ).prop('innerText', 'Pacific Islander or HI Native');
};
//SECTION END CaseMember Shortening text fields so they fit in a col-md-4

//SECTION START Case Notes custom styles
if (window.location.href.indexOf("CaseNotes") > -1) {
    $('#storage').addClass('collapse');
    $('#noteArchiveType, #noteSearchStringText, #noteImportant').prop('tabindex', '-1');
    $('table tr td:contains("Disbursed child care support")').parents('tr').addClass('collapse');//Hiding Disbursed Child Care Support payment rows
//SECTION START Permanent fix for case notes - case notes saved when state broke them are permanently broken
	function fixCaseNoteDisplay() {
		let fixedCaseNote = document.getElementById('noteStringText').value.replaceAll('/n', '\n');
		document.getElementById('noteStringText').value = fixedCaseNote
	};
	let caseNoteTable = document.getElementById('caseNotesTable');
	caseNoteTable.addEventListener("click", function() { fixCaseNoteDisplay()});
	fixCaseNoteDisplay()
//SECTION END Permanent fix for case notes - case notes saved when state broke them are permanently broken

//SECTION START Disable Edit button if note date !== today (maybe make a ! button to enable and click edit?)
    let todayDate = new Date().toLocaleDateString('en-US', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
        });
    const observer = new MutationObserver(disableEdit);
    observer.observe(document.querySelector('#rowIndex'), {attributes: true});
    function disableEdit() {
        if ($('table tr.selected td').eq(1).text() !== todayDate) {
            $('#edit').prop('disabled', true);
        };
    };
    disableEdit();
};
//SECTION END CaseNotes Disable Edit button if note date !== today
//SECTION END CaseNotes

//SECTION START CaseNotes and ProviderNotes layout fix
if (window.location.href.indexOf('CaseNotes') > -1 || window.location.href.indexOf("ProviderNotes") > -1) {
    document.getElementsByClassName('panel-box-format')[1].style.display = "none";
    document.getElementById('noteStringText').setAttribute('rows', '29');
    $('br').remove();
    $('#noteSummary')
        .parent().removeClass('col-lg-4 col-md-4 col-sm-4').addClass('col-lg-9 col-md-10')
        .parents('.form-group').removeClass('col-lg-5 col-md-5 col-sm-5 col-xs-5').addClass('col-lg-6 col-md-7');
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
    $('#noteMemberReferenceNumber').parent()
        .removeClass('col-lg-4 col-md-4 col-sm-4 textInherit').addClass('col-lg-10 col-md-10 textInherit')
        .add('label[for="noteMemberReferenceNumber"]').wrapAll('<div id="noteMemberReferenceNumberGroup" class="col-lg-4 col-md-5 form-group"></div>')
    $('label[for="noteCategory"]')
        .removeClass('col-lg-3 col-md-3 col-sm-4').addClass('col-lg-2 col-md-2')
        .css('margin-left','')
    addGlobalStyle('label[for="noteCategory"] { width: 61px !important }');
    $('#noteCategory').parent()
        .removeClass('col-lg-3 col-md-3 col-sm-3 textInherit').addClass('col-lg-10 col-md-10 textInherit')
        .add('label[for="noteCategory"]').wrapAll('<div id="noteCategoryGroup" class="col-lg-5 col-md-5 form-group"></div>')
    $('.col-lg-6.col-md-6.col-sm-6.col-xs-6.form-group.textInherit:not(".col-xl-8,.col-xl-6")').hide()
    $('.col-xs-2.col-sm-2.col-md-1.col-lg-1:not(:has("input"))').hide()
    $('.col-xs-5.col-sm-5.col-md-5.col-lg-5').hide();
    $('#noteImportantGroup, #noteMemberReferenceNumberGroup').prependTo('#addInfoRowOne')
    $('#removeMe').remove()
};
//SECTION END CaseNotes and ProviderNotes layout fix

//SECTION START Fixing the table height of the Case Notice and Job Search Tracking tables to show more notices
if (window.location.href.indexOf("CaseNotices") > -1 || window.location.href.indexOf("CaseJobSearchTracking") > -1) {
    $(".dataTables_scrollBody").css('max-height', '400px');
    $('#textbox1').css('height', '520px');
};
//SECTION END Fixing the table height of the Case Notice and Job Search Tracking tables to show more notices

//SECTION START Custom items for CaseOverview
if (window.location.href.indexOf("CaseOverview") > -1) {
    $('label[for="redeterminationDueDate"]').parents('.form-group').siblings('h4')
        //.css('float','left')
        //.css('width','85%')
        .after('<div id="copyRedetButton" class="fake-custom-button-nodisable fake-custom-button-float-right">Follow Up Date</div>');
    $('#copyRedetButton').click(function() {
        let redetDate = $('label[for="redeterminationDueDate"]').parents('.form-group').children('div.col-lg-3.col-md-3').eq(0).text().replace(/\n|\t/g, '')
        let redetPlus = (addDays(redetDate, 44));
        let localedDate = new Date(redetPlus).toLocaleDateString();
        navigator.clipboard.writeText(localedDate);
        snackBar('Copied! <br>' + localedDate);
    });
    $('label.col-lg-3[for="redeterminationDueDate"]').parent().nextAll('div.col-lg-3:eq(0)').attr('id','redetDate');
    $('#redetDate').append('<div id="redetDateChild">');
    $('#redetDateChild').click(function() {
        navigator.clipboard.writeText(document.getElementById('redetDate').innerText);
        snackBar('Copied! <br>' + document.getElementById('redetDate').innerText.replace(/(?:\r\n|\r|\n)/g, '<br>'));
    });
};
//SECTION END Custom items for CaseOverview

//SECTION START CasePaymentHistory Add buttons to navigate to FinancialBilling in correct BWP
if (window.location.href.indexOf("CasePaymentHistory") > -1) {
    $('div.col-lg-3.col-md-3>input').width('100%');
    $('#paymentHistoryTable tr').children('td:nth-of-type(3)').each(function() {
            let linkText = $(this).text();
            $(this).text('');
            $(this).append('<a href="FinancialBilling.htm?parm2=' + $("#caseId").val() + '&parm3=' + linkText.replace(" - ", "").replaceAll("/","") + '", target="_blank">' + linkText + '</a>');
    });
};

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
if (window.location.href.indexOf("CaseServiceAuthorizationOverview") > -1) {
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
        let caseNameBackwards = toTitleCase($('#caseHeaderData').children().prop('innerText').slice(5)).replace(/\b\w\b/,'').trim();
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
        console.log(formInfo)
        window.open("http://nt-webster/slcportal/Portals/65/Divisions/FAD/IM/CCAP/index.html?parm1=" + JSON.stringify(formInfo), "_blank");
    };
    $('#csicTableData1').before(`
<div style="overflow: auto" id="billingFormDiv">
<div class="form-group centered-form-group">

<div class="custombutton fake-custom-button centered-text" id="billingForm">Create Billing Form</div>
<label for="copayAmount" class="control-label textR" style="height: 28px;"> Copay Amount: $</label>
<div id="copayAmountGet" class="centered-text" style="width: 40px;"></div>
<div class="custombutton fake-custom-button centered-text" id="providerAddressButton">Open Provider Address Page</div>
<div class="custombutton fake-custom-button centered-text" id="copyProviderMailing">Test - Copy Provider Mailing Address</div>
</div>
</div>
`);
    //$('#billingForm').on("click", function() { billingFormInfo()});
    $('#billingForm').click(function() { getCopay($('#caseId').val(), $('#selectPeriod').val().replace(/\//g, '').split(' - ')[0] + $('#selectPeriod').val().replace(/\//g, '').split(' - ')[1]) })
    $('#copyProviderMailing').click(function() {
        //$('#hiddenLoadDiv').load("/ChildCare/ProviderAddress.htm?providerId=" + $('#providerInfoTable .selected td').eq(0).prop('innerHTML') + " #providerData")
        console.log($('#providerInfoTable .selected td').eq(0).prop('innerHTML'))
    });
    $('#providerAddressButton').click(function() {
        window.open("/ChildCare/ProviderAddress.htm?providerId=" + $('#providerInfoTable .selected td').eq(0).prop('innerHTML'), "_blank");
    });
};
//SECTION END Fill manual Billing PDF Forms, also nav to Provider Address

//SECTION START CaseSpecialNeeds Column resizing
if (window.location.href.indexOf("CaseSpecialNeeds") > -1) {
    $('.col-md-3, .col-lg-3').removeClass('col-md-3 col-lg-3').addClass('col-md-5 col-lg-5');
};
//SECTION END CaseSpecialNeeds Column resizing

//SECTION START CaseSpecialActivity Duplicate start date into end date for Ext Elig
if (window.location.href.indexOf('CaseSupportActivity') > -1) {
	$('#extendedEligibilityBegin').blur(function() { $('#extendedEligibilityExpires').val($('#extendedEligibilityBegin').val()) })
    $('strong:contains("before the first day")').length > 0 && $('#save').focus();
};
//SECTION END CaseSpecialActivity Duplicate start date into end date for Ext Elig

//SECTION START Close case transfer to x169CCA; Auto enter transfer info if have sessionStorage value; Add button to viewMode page to do transfer;
window.location.href.indexOf('CaseTransfer') < 0 && (localStorage.setItem('MECH2.activelyTransferring','noThanks'));//prevent accidental case transfer activity when loading that page
if (window.location.href.indexOf('CaseTransfer') > -1) {
    if (localStorage.getItem('MECH2.activelyTransferring') == 'yesPlease') {
        if (!viewMode && $('#caseTransferFromType option:eq(1):contains("Worker To Worker")')) {
            localStorage.setItem('MECH2.activelyTransferring','noThanks');
            const event = new Event('change');//this plus element.dispatchEvent(event) will trigger on page events
            const foo = new MutationObserver(function(mutationList, observer) {
                for (const mutation of mutationList) {//if (mutation.type === 'attributes' || 'childList' || 'subtree') {//from options picked
                    setIntervalLimited(function() {
                        if (document.getElementById('caseTransferToName').value === 'CASE, SLC CLOSED') {
                            localStorage.setItem('MECH2.doClose','closeMe');
                            $('#save').click();
                            console.log('clicked save');
                            return false;
                        };
                    }, 1000, 3);
                    //check();
                };
            });
            foo.observe(document.getElementById('caseTransferToName'), { attributes: true })
            const targetNode = document.getElementById('caseTransferToWorkerId')// Select the node that will be observed for mutations
            const config = { attributes: true };// Options for the observer (which mutations to observe)
            const callback = (mutationList, observer) => {// Callback function to execute when mutations are observed
                for (const mutation of mutationList) {
                    $('#caseTransferToWorkerId').val('X169CCA');
                    document.getElementById('caseTransferToWorkerId').dispatchEvent(event);
                    document.getElementById('caseTransferToName').dispatchEvent(event);
                };
            };
            const observer = new MutationObserver(callback);// Create an observer instance linked to the callback function
            observer.observe(targetNode, config);// Start observing the target node for configured mutations
            $('#caseTransferFromType option:eq(1)').prop('selected','true')
            document.getElementById('caseTransferFromType').dispatchEvent(event);
        } else {
            $('#new').click();
        };
    };
    if (localStorage.getItem('MECH2.doClose') == 'closeWindow' && localStorage.getItem('MECH2.activelyTransferring') == 'noThanks' && viewMode) {
        localStorage.setItem('MECH2.doClose','didClose');
        window.open('about:blank', '_self');
        //window.close()
    };
    //Semi-manual transfer with a button
    function doClosedTransfer() {
        localStorage.setItem('MECH2.activelyTransferring','yesPlease');
        $('#new').click();
    };
    viewMode && ($('#caseTransferToName').parents('.form-group').after('<div class="custombutton fake-custom-button centered-text" style="float: left;" id="closedTransfer">Transfer to X169CCA</div>'));
    $('#closedTransfer').click(function() { doClosedTransfer() })
};
//SECTION START Close case transfer to x169CCA; Auto enter transfer info if have sessionStorage value; Add button to viewMode page to do transfer;

//SECTION START Naviation buttons to Eligibility Selection, Service Authorization Overview, and Case Overview from CaseWrapUp page
if (window.location.href.indexOf("CaseWrapUp") > -1 && $('#done').attr('Disabled')) {
    let parm3var = '&parm3=' + document.getElementById('selectPeriod').value.replace(' - ', '').replaceAll('/','');
    $('#caseHeaderData').after(`<div>
    <div id="goEligibility" class="fake-custom-button-nodisable fake-custom-button">Eligibility</div>
    <div id="goSAOverview" class="fake-custom-button-nodisable fake-custom-button">SA Overview</div>
    <div id="goSAApproval" class="fake-custom-button-nodisable fake-custom-button">SA Approval</div>
    <div id="goEditSummary" class="fake-custom-button-nodisable fake-custom-button">Edit Summary</div>
    </div>`)
    $('#goEligibility').click(function() {
        window.open('/ChildCare/CaseEligibilityResultSelection.htm?parm2=' + $('#caseId').val() + parm3var, '_self');
    });
    $('#goSAOverview').click(function() {
        window.open('/ChildCare/CaseServiceAuthorizationOverview.htm?parm2=' + $('#caseId').val() + parm3var, '_self');
    });
    $('#goSAApproval').click(function() {
        window.open('/ChildCare/CaseServiceAuthorizationApproval.htm?parm2=' + $('#caseId').val() + parm3var, '_self');
    });
    $('#goEditSummary').click(function() {
        window.open('/ChildCare/CaseEditSummary.htm?parm2=' + $('#caseId').val() + parm3var, '_self');
    });
};
//SECTION END Naviation buttons to Eligibility Selection, Service Authorization Overview, and Case Overview from CaseWrapUp page

//SECTION START FinancialBilling Fix to display table
if (window.location.href.indexOf("FinancialBilling.htm") > -1) {
    addGlobalStyle('.form-control.borderless.padL0.padR0 { padding: 0px !important; }');
    //let target = document.getElementById('billingRegistrationFeesTable_wrapper').parentNode;
    document.getElementById('billingRegistrationFeesTable_wrapper').parentNode.previousElementSibling.classList.remove('clearfix');
    //let destination = target.parentNode;
    //target.appendChild(destination);
};
//SECTION END FinancialBilling Fix to display table

//SECTION START Adding clearfix class to 'row' on FinancialManualPayment because they didn't do form-groups or anything that they did on the rest of the site
if (window.location.href.indexOf("FinancialManualPayment") > -1) {
    $('.row').addClass('clearfix');
};
//SECTION END Adding clearfix class to 'row' on FinancialManualPayment because they didn't do form-groups or anything that they did on the rest of the site

//Left todo: Create event on InactiveCaseList that sends case number array to localStorage, opens CaseTransfer, and goes to town.
//SECTION START Close case transfer to x169CCA; Changing dates to links
if (window.location.href.indexOf("InactiveCaseList") > -1) {
    $('#footer_links').before('<iframe id="transferiframe" name="transferiframe" height="300px" width=' + $(".panel.panel-default").width() + '></iframe>');
    let todayDate = new Date().getTime();
    $('#inActiveCaseTable tbody tr').children('td:nth-of-type(4)').each(function() {
        let closedDatePlus46 = addDays($(this).text(), 46).getTime();
        if (closedDatePlus46 < todayDate) {
            let linkText = $(this).text();
            $(this).text('');
            $(this).append('<a class="oldClosed" id=' + $(this).siblings().eq(0).text() + ' href="CaseTransfer.htm?parm2=' + $(this).siblings().eq(0).text() + '", target="_blank">' + linkText + '</a>');
            //$(this).append('<span style="display: inline-block; margin-left: 15px;">-> CCA</span>');
            $(this).children('span').click(function() { transferSingleClosed($(this).siblings('a')) });
        };
    });
    function transferSingleClosed(ele) {
        localStorage.setItem('MECH2.activelyTransferring', 'yesPlease');
        localStorage.setItem('MECH2.doClose','closeWindow');
        $(ele).parents('tr').hide();
        window.open('/ChildCare/' + (ele).attr('href'), 'transferiframe');
    };
    function transferAllClosed() {//todo fix this section as it does not wait to finish before attempting the next case
        $('.oldClosed').each(function() {
            console.log($(this).prop('id'));
            localStorage.setItem('MECH2.activelyTransferring', 'yesPlease');
            localStorage.setItem('MECH2.doClose','closeWindow');
            window.open('/ChildCare/CaseTransfer.htm?parm2=' + $(this).prop('id'), 'transferiframe');
            if (localStorage.getItem('MECH2.doClose') == 'didClose') {
                return;
            } else {
                setIntervalLimited(function() {
                    if (localStorage.getItem('MECH2.doClose') == 'didClose') {
                        return;
                    };
                }, 1500, 3);
                console.log('exited limited interval')
            };
        });
    };
    //$('#workerSearch').parents('.col-lg-12').append('<div id="transferAllClosed" class="fake-custom-button custombutton" style="float:right">Transfer All Old Closed</div>')
    $('#transferAllClosed').click(function() { transferAllClosed() });
};
//SECTION END Close case transfer to x169CCA; Changing dates to links

//SECTION START Fix lastUpdateWorker offsets
if (window.location.href.indexOf('lastUpdateWorker') > -1) {
    $('input').not($('label + input')).not($('a > input')).not('#newTabField').addClass('col-lg-offset-2 col-md-offset-2');
};
//SECTION END Fix lastUpdateWorker offsets

//SECTION START Copy Provider mailto Address
if (window.location.href.indexOf("ProviderAddress") > -1) {
    $('#providerInput').append('<div class="custombutton fake-custom-button centered-text" style="float: right;" id="copyMailing">Billing Form Address to Clipboard</div>');
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
    let providerName = (window.location.href.indexOf("CaseServiceAuthorizationOverview") > -1) ? $('label[for="providerName"]').parent().contents().eq(4).text().trim() : $('#providerInfoTable>tbody>tr.selected>td:eq(1)').html().trim()
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
};
//SECTION END Copy Provider mailto Address

//SECTION START Fix multiple CSS issues on ProviderInformation
if (window.location.href.indexOf('ProviderInformation') > -1) {
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
            console.log($nextInput.prop('clientHeight'));
            //if ($nextInput.prop('clientHeight') > 2 && $nextInput.prop('clientHeight') < 40) {
                $(this).height($nextInput.prop('clientHeight'));
            //};
        });
    };
};
//SECTION END

//SECTION START
if (window.location.href.indexOf('ProviderLicense') > -1) {
    $('.row').siblings('br').remove();
    $('.col-lg-6.col-md-8.col-sm-10.col-xs-12').removeClass('col-lg-6 col-md-8 col-sm-10 col-xs-12').addClass('col-lg-6 col-md-6');
    $('.col-lg-5.col-md-5').removeClass('col-md-5 col-lg-5').addClass('col-md-6 col-lg-6');
}
//SECTION END

if (window.location.href.indexOf("ProviderOverview") > -1) {
    $('div.col-lg-3').removeClass('col-lg-3 col-md-3 col-md-2').addClass('col-md-2 col-lg-2');
    $('div.textInherit.col-md-2.col-lg-2:not(.padL0)').removeClass('col-md-2 col-lg-2').addClass('col-lg-4 col-md-4');
};

//SECTION START Auto-filter ProviderSearch results
if (window.location.href.indexOf("ProviderSearch") > -1) {
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
    addGlobalStyle('.inactive-hidden, .out-of-area-hidden { display: none; }');
    $('#back').after('<div id="inactiveToggle" class="fake-custom-button custombutton">Toggle Inactive</div><div id="outOfAreaToggle" class="fake-custom-button custombutton">Toggle Out of Area</div>');
    $('#inactiveToggle').click(function() { $('.inactive').toggleClass('inactive-hidden'); });
    $('#outOfAreaToggle').click(function() { $('.out-of-area').toggleClass('out-of-area-hidden'); });
};
//SECTION END Auto-filter ProviderSearch results

//SECTION START ProviderRegistrationAndRenewal Fix to display table
if (window.location.href.indexOf("ProviderRegistrationAndRenewal") > -1) {
    document.getElementById('providerData').classList.add('clearfix');
};
//SECTION END ProviderRegistrationAndRenewal Fix to display table.

if (window.location.href.indexOf("Provider") < 0) { $('#comments, #memberComments, #textbox2').prop('rows','15').css('height','') };

if (window.location.href.indexOf("ProviderTaxInfo") > -1) {
    $('#validateTaxIdButton').parent().removeClass('col-xs-12 col-sm-12 col-md-12 col-md-offset-2 col-lg-12 col-lg-offset-2').addClass('col-lg-offset-3 col-md-offset-3');
    $('label.col-lg-2').removeClass('col-lg-2 col-md-2').addClass('col-lg-3 col-md-3');
};

//SECTION START ServicingAgencyOutgoingTransfers column fixes
if (window.location.href.indexOf('ServicingAgencyOutgoingTransfers') > -1) {
    $('label[for="transferImmediately"]').removeClass('col-lg-3').addClass('col-lg-2').parent('.form-group').attr('style','')
    $('label[for="voidEffectiveDate"]').removeClass('col-lg-3').addClass('col-lg-4')
};
//SECTION END ServicingAgencyOutgoingTransfers column fixes

`///////////////////////////////// PAGE SPECIFIC CHANGES SECTION END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

///////////////////////////////// FUNCTIONS SECTION START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ `

// Definition
function setIntervalLimited(callback, interval, x) {
    for (var i = 0; i < x; i++) {
        setTimeout(callback, i * interval);
    };
};
/*
// Usage
setIntervalLimited(function() {
    console.log('hit');          // => hit...hit...etc (every second, stops after 10)
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
//

/* To use waitForElm:
    waitForElm('.some-class').then((elm) => {
        console.log('Element is ready');
        console.log(elm.textContent);
    });
Or with async/await:
    const elm = await waitForElm('.some-class'); */
//SECTION END Wait for something to be available

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
//

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
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

$('body').append('<div id="snackBar" class="snackbar" style="display: none"></div>');
function snackBar(innerText, timeout=3000) {
    //$('#snackBar').text(innerText)
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
    $updateParent.siblings('br').remove();
    $updateSiblings.children('br').remove();
    $updateSiblings.addClass('updateSiblings');
    $updateSiblings.removeClass('col-md-8 col-lg-8 col-md-7 col-lg-7 col-xs-7 col-sm-7');
    $updateSiblings.find('input.form-button').addClass('form-button-margins');
    $updateSiblings.prop('class','clearfix');
    $updateSiblings.eq(0).append($updateSiblings.eq(1).children()).addClass('nativeButtonHome');//move second row of buttons (if exist) to first row
    $updateDate.parents().eq(2).append('<div class="form-group clearfix" id="updateHome"></div>');//new div to end of *PanelsData div
    $('#updateHome').append($updateParent);
    $('.nativeButtonHome').contents().filter(function() { return this.nodeType === 3 }).each(function() { this.textContent = this.textContent.trim() });//trim spaces
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

//SECTION START Removing extra BRs and using clearfix to prevent overlapping elements
function deburrThePage() {
	$('br + br').remove();
	$('#caseHeaderData + br').add($('#caseHeaderData').prev('br')).add($('#caseHeaderData').parent().prev('br')).add($('#caseHeaderData > br:last-child')).remove();
	$('.visible-lg:has("br:only-child"), .visible-md:has("br:only-child"), .visible-sm:has("br:only-child")').remove();
	$('.panel-box-format').prev('br').add($('.panel-box-format').parent().prev('br')).remove();
	$('.form-group').prev('br').add($('.form-group + br')).add($('.form-group > br:first-child')).remove();
	$('h4').prev('br').add($('h4 + br')).remove();
	$('div[id$="TableData"] > br').remove();//remove children BR under tables
	$('div[id$="TableData"]').siblings('br').remove();//remove BR around tables
	$('div[id$="Data_wrapper"]').siblings('br').remove();//remove BR around less conventionally named tables
    $('div[id$="TableAndPanelData"]').siblings('br').remove();//testing
	//$('.panel-box-format, .form-group, .col-lg-12').addClass('clearfix');
};
deburrThePage();
//SECTION END Removing extra BRs and using clearfix to prevent overlapping elements

//SECTION START Duplicate buttons above H1 row
if (window.location.href.indexOf('InactiveCaseList') < 0 && window.location.href.indexOf('ActiveCaseList') < 0) {
    $('.modal .form-button').addClass('modal-button');
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
    $('.form-button:not([id$="Business"]):not([id$="Person"]):not(.panel-box-format input.form-button)').not('.modal-button, #workerSearch, #contactInfo, #providerIdSubmit, #ratePeriodSelectButton, #validateCertificationButton, #resetCertButton, #validateLicenseButton, #resetLicButton, #selectFra, #caseSearch, #providerSearch, #caseInputSubmit, #alertInputSubmit, #search, #reset, #changeType, #storage, #addRegistrationFee, #deleteRegistrationFee, #addBilledTime, #deleteBilledTime, #calculate, #cappingInfo, #calcAmounts, .custombutton, .fake-custom-button').each(function() {
        if ($(this).val()) {
            let disabledStatus = $(this).prop('disabled') ? 'form-button custom-form-button custom-form-button-disabled centered-text mutable' : 'form-button custom-form-button centered-text mutable';
            let idName = $(this).prop('id') + "DuplicateButton";
            $('#buttonHouse').append(`<div id="` + idName + `" tabindex="0" class="` + disabledStatus + `" onkeydown="(event.code == 'Space') && $('#` + $(this).attr('id') + `').click()" onclick="$('#` + $(this).attr('id') + `').click()">` + $(this).val() + `</div>`);
            //$('#buttonHouse').append("<div id=\"" + idName + "\" class=\"" + disabledStatus + "\" onclick=\"$('#" + $(this).attr('id') + "').click()\">" + $(this).val() + "</div>");
        };
    });
    $('#buttonHouse').children().length == 0 && ($('#buttonHouse').hide());
};
//SECTION END Buttons above H1 row

if (window.location.href.indexOf('CaseWrapUp') > -1) {
    if ($('.rederrortext').text() == 'Case Wrap-Up successfully submitted.') {
        $('#buttonHouse').hide();
    };
};
//SECTION START Retract drop-down menu on page load
$('.sub_menu').css('visibility', 'hidden');
//SECTION END Retract drop-down menu on page load

viewMode && ($('[id="Report a Problem"]').children().attr('target','_blank'));//Make 'Report a Problem' open in new tab

//SECTION START Removing items from the tabindex
$('#footer_links, #footer_info, #popup').children().prop('tabindex', '-1');
$('#quit, #countiesTable, #extendedEligibilityExpires, #redeterminationDate, #caseInputSubmit, #letterChoice, #reset, #tempPeriodStart, #tempPeriodEnd').prop('tabindex', '-1');//quit, countiesTable=application; redet date, eEE=activity pages; cIS=submit button; lC=specialletter; reset=caseNotes; tempLeave = activities;
$('#leaveDetailTemporaryLeavePeriodFrom, #leaveDetailTemporaryLeavePeriodTo, #leaveDetailExtendedEligibilityBegin, #tempLeavePeriodBegin, #tempLeavePeriodEnd, #extendedEligibilityBegin').prop('tabindex', '-1');//EmploymentActivity, SupportActivity
window.location.href.indexOf("CaseEarnedIncome") > -1 && ($('#providerId, #providerSearch').prop('tabindex', '-1'));
window.location.href.indexOf("ProviderSearch") > -1 && ($('#ssn, #itin, #fein, #licenseNumber, #middleInitName').prop('tabindex', '-1'));
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
$('input[id$="ZipCodePlus4"]').hide();
$('div[id$="ZipDash"]').add($('div[id$="ZipDash"]').next()).hide();
$('.col-xs-3.col-sm-3.col-md-3.col-lg-1').removeClass('col-md-3').addClass('col-md-1');
//SECTION END Post load changes to the page

///////////////////////////////// FUNCTIONS SECTION END \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
if (viewMode) {
    $( document ).ready(function() {
        setTimeout(document.querySelector('#navButtonHouse').scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
    })
};

})();
