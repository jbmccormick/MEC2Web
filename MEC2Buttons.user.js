// ==UserScript==
// @name         MEC2Buttons
// @namespace    http://github.com/jbmccormick
// @version      0.35
// @description  Add navigation buttons to MEC2 to replace the drop down hover menus
// @author       MECH2
// @match        mec2.childcare.dhs.state.mn.us/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jbmccormick/MEC2Web/master/MEC2Buttons.user.js
// ==/UserScript==

(function() {
    'use strict';
/* globals jQuery, $, waitForKeyElements */
document.getElementsByClassName("line_mn_green")[0].setAttribute("id", "greenline");
let primaryPanelID = document.getElementById("page-wrap")
let panelDefault = document.getElementsByClassName('panel-default')[0];
if (!document.getElementById("page-wrap")) {
    primaryPanelID = document.getElementById("greenline");
};
let buttonDivOne = document.createElement('div');
    buttonDivOne.id = "buttonPaneOne";
let buttonDivTwo = document.createElement('div');
	buttonDivTwo.id = "buttonPaneTwo"
let buttonDivThree = document.createElement('div');
	buttonDivThree.id = "buttonPaneThree"
primaryPanelID.insertAdjacentElement("afterend", buttonDivOne);
    buttonDivOne.insertAdjacentElement("afterend", buttonDivTwo);
    buttonDivTwo.insertAdjacentElement("afterend", buttonDivThree);
let searchIcon = "<span style='font-size:80%;'>&#128269</span>";//🔍	128269	1F50D
let thisPageName = window.location.pathname.substring(
    window.location.pathname.indexOf("/ChildCare/") + 11,
    window.location.pathname.lastIndexOf(".")
);
function addGlobalStyle(css) { //To allow for adding CSS styles
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
      addGlobalStyle('.custombutton { cursor: pointer; padding: 3px 4px; margin: 1px; border: 2px solid; border-radius:4px; }'); //button style
      addGlobalStyle('.custombuttonsearch { cursor: pointer; padding: 3px 4px; margin-left: 3px; border: 2px solid; border-radius:4px; }'); //button style
      addGlobalStyle('.custombuttonplus { border-left: 0px; margin-left:-7px; border-top-left-radius:0px; border-bottom-left-radius:0px; }'); //button style
      addGlobalStyle('.custombutton:hover {background-color: #DAF7A6; }'); //button hover style
      addGlobalStyle('.custombuttonclicked {background-color: #A6EDF7; }');
      addGlobalStyle('.custom-form-button {margin-left: 10px; }');
      addGlobalStyle('#buttonPaneThree {margin-bottom:1px; }');
      if (primaryPanelID.getAttribute('Id') == "greenline") {
      addGlobalStyle('.custombutton { color: DarkGrey; cursor: no-drop; padding: 3px 4px; margin: 1px; border: 2px solid; border-radius:4px; }'); //button style
      addGlobalStyle('.custombuttonplus { border-left: 0; margin-left:-7px; border-top-left-radius:0; border-bottom-left-radius:0; }'); //button style
      addGlobalStyle('.custombutton:hover {background-color: #DAF7A6; }'); //button hover style
      addGlobalStyle('.custombuttonclicked {background-color: #A6EDF7; }');
      addGlobalStyle('.panel.panel-default {margin-top: 0px !important; }');
      };
      addGlobalStyle('.navbar { display: none; }');
      addGlobalStyle('#page-wrap { padding-bottom:10px !important; height:40px !important; line-height:20px !important }');
document.getElementById("banner_honeycomb").style.display = "none";
document.getElementsByClassName("navbar navbar-inverse")[0].setAttribute("id", "theirnavbar");
document.getElementById("theirnavbar").style.display = "none";
const gotoButtons = [ //Goto Buttons, ["Name as it appears on a button","gotoPageName", "_self or _blank", "Id of parent", "Id of Button'],
    ["Alerts","Alerts", "_self", "Alerts", "AlertsSelf"],
    ["+","Alerts", "_blank", "Alerts", "AlertsBlank"],
	["Notes","CaseNotes", "_self", "Case Notes", "CaseNotesSelf"],
	["+","CaseNotes", "_blank", "Case Notes", "CaseNotesBlank"],
    ["Overview","CaseOverview", "_self", "Case Overview", "CaseOverviewSelf"],
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
//	["Redet","RedeterminationCaseList", "_self", "Redetermination List", "RedeterminationListSelf"],
//	["+","RedeterminationCaseList", "_blank", "Redetermination List", "RedeterminationListBlank"],
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
    ["Provider","providerButtons",""],
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
		caseRemoveMember:["Remove Memb.", "CaseRemoveMember", "_self", "Remove a Member", "CaseRemoveMemberSelf", "memberMainButtons"],
		caseMemberHistory:["Memb. History","CaseMemberHistory", "_self", "Member History", "CaseMemberHistorySelf", "memberMainButtons"],
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
		providerOverview:["Overview","getProviderOverview", "_self", "Provider Overview", "ProviderOverviewSelf", "providerButtons"],
		providerSearch:["Search","ProviderSearch", "_blank", "Provider Search", "ProviderSearchSelf", "providerButtons"],
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
function btnRowThree(rowTwoButtonClicked){
    if (primaryPanelID.getAttribute('Id') == "greenline") { return };
    while (buttonDivThree.firstChild) {
        buttonDivThree.removeChild(buttonDivThree.firstChild);
    }
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
        //btnNavigation.className = 'custombutton';
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
function gotoPage(loadThisPage) {
    if (primaryPanelID.getAttribute('Id') == "greenline") {
        console.log("There's no drop down to pull links from, figure out how to do it without.")
        return
    };
    let getLinkUsingId = document.getElementById(`${loadThisPage}`);
    if (primaryPanelID.getAttribute('Id') == "greenline") { window.open("/ChildCare/"`${loadThisPage}`, "_blank"); };
    window.open(document.getElementById(getLinkUsingId.getAttribute('data-pagelinkusingid')).firstElementChild.getAttribute('href'), document.getElementById(`${loadThisPage}`).getAttribute('data-howtoopen'));
    };
/*function gotoPage(loadThisPage) { //backup code for going to pages
    const paramsString = window.location.search;
    let searchParams = new URLSearchParams(paramsString);
    let parm2var = searchParams.get('parm2');
    let pageToLoad = document.getElementById(`${loadThisPage}`);
    let pageName = pageToLoad.getAttribute('data-pageName');
    if (document.body.contains(document.getElementById("caseId"))) {
        let caseNum = document.getElementById("caseId").value;
        if (caseNum > 0) {
            //alert("caseNum ver");
            window.open(`/ChildCare/${pageName}.htm?parm2=${caseNum}`, pageToLoad.getAttribute('data-howtoopen'));
        }
    };
    if (parm2var > 0) {
        //alert("parm2var ver");
        window.open(`/ChildCare/${pageName}.htm?parm2=${parm2var}`, pageToLoad.getAttribute('data-howtoopen'));
    } else {
        //alert("no case number ver");
        window.open(`/ChildCare/${pageName}.htm`, pageToLoad.getAttribute('data-howtoopen'));
    };
}; */
//Text Field and Buttons for case number in new tab
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
    //let label = document.createElement('label');
    //label.setAttribute('for', 'newTabField');
    //label.innerHTML = '&nbsp;&nbsp;Case:&nbsp;';
    //buttonDivOne.appendChild(label);
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
        }
}
function openCaseNumber(e) {
    const enteredCaseNumber = document.getElementById('newTabField').value;
    if (e == "CaseNotes") {
        window.open('/ChildCare/CaseNotes.htm?parm2=' + enteredCaseNumber, '_blank');
    } else {
        window.open('/ChildCare/CaseOverview.htm?parm2=' + enteredCaseNumber, '_blank');
    }
};
newTabFieldButtons();
// buttonClicked, traverseOnPageLoad, traverseOnRowTwoClick are to highlight buttons based on the current page
function buttonClicked(){
    let clickedButtons = document.getElementsByClassName('custombuttonclicked');
      for(let i = 0; i < clickedButtons.length; i++) {
          clickedButtons[i].classList.remove('custombuttonclicked');
      }
}
function traverseOnPageLoad(o) {
    if (primaryPanelID.getAttribute('Id') == "greenline") { return };
    for (let i in o) {
        if (o[i] == thisPageName) {
            btnRowThree(o[5]);
            if (document.getElementsByClassName('custombuttonclicked')) {
                document.getElementById([o[4]]).classList.add('custombuttonclicked');
            };
            return;
        }
        if (o[i] !== null && typeof(o[i])=="object") {
            traverseOnPageLoad(o[i]);
        }
    }
}
function traverseOnRowTwoClick(o) {
    for (let i in o) {
        if (o[i] == thisPageName) {
            document.getElementById([o[4]]).classList.add('custombuttonclicked');
            return;
        }
        if (o[i] !== null && typeof(o[i])=="object") {
            traverseOnRowTwoClick(o[i]);
        }
    }
}
traverseOnPageLoad(rowThreeButtonArray)
//SECTION START Superfluous delete button
if (window.location.href.indexOf("Alerts") > -1) {
    let anchorPoint = document.getElementById('alertTotal');
    let deleteButtonBottom = document.getElementById('delete');
    let btnNavigation = document.createElement('button');
    btnNavigation.type = 'button';
    btnNavigation.innerHTML = "Delete Alert";
    btnNavigation.id = "buttonDeleteTop";
    btnNavigation.className = 'form-button custom-form-button';
    btnNavigation.addEventListener("click", function() { deleteButtonBottom.click()});
    anchorPoint.insertAdjacentElement('afterend', btnNavigation);
};
//SECTION END Superfluous delete button
//SECTION START Do action based on Alert Type - need to store the table data onclick or fix their table de-selection
if (window.location.href.indexOf("Alerts") > -1) {
    let anchorPoint = document.getElementById('message');
    let btnNavigation = document.createElement('button');
    btnNavigation.type = 'button';
    btnNavigation.innerHTML = "Select an alert";
    btnNavigation.id = "doTheThing";
    btnNavigation.className = 'custombutton';
    anchorPoint.insertAdjacentElement('afterend', btnNavigation);
    //let clickedAlert = document.getElementById('alertTable');
    let clickedAlert = $('#alertTable');
    btnNavigation.addEventListener("click", function() { goDoTheThing()});
    //document.getElementById('doTheThing').innerHTML = document.getElementById('alertTable').getElementsByClassName('selected')[0].childNodes[0].innerText
    $('#doTheThing').text($('#alertTable .selected').children().eq(0).text());
    document.querySelector('#caseOrProviderTable .selected').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    $('#caseOrProviderTable, #alertTable').click(function(event) {
        if (event.target.nodeName == 'TD') {
            $(event.target).parent().addClass("selected");
        };
    changeButtonText();
    });
};
function changeButtonText() {
    let alertType = $('#alertTable .selected').children().eq(0).text()
/*    if (alertType == '') {
        document.getElementById('doTheThing').innerHTML = 'Both tables must have line selected'
    };*/
    if (alertType == 'Eligibility') {
        document.getElementById('doTheThing').innerHTML = alertType
    } else {
        document.getElementById('doTheThing').innerHTML = 'Not yet supported'
    };
};
function goDoTheThing() {
    //rewrite this section. Make arrays based on category, get category and match to startsWith?
    let messageText = document.getElementById('message');//alertTable
    if (messageText.value == "Unapproved results have been created and need review.") {//eventually replace this with... startsWith? Spreadsheet in Documents has alerts list.
        let parm2var = document.getElementById('caseOrProviderTable').getElementsByClassName('selected')[0].childNodes[2].innerText //caseOrProviderTable selected[0]
        let parm3var = document.getElementById('periodBeginDate').value.replace(/\//g, '') + document.getElementById('periodEndDate').value.replace(/\//g, '')
        window.open('/ChildCare/CaseEligibilityResultSelection.htm?parm2=' + parm2var + '&parm3=' + parm3var, '_blank')
    };
};
/*if (window.location.href.indexOf("CaseNotes") > -1) {
    //if (localStorage.getItem("caseNotesLocal") !== "clear") {
    if (localStorage.getItem("caseNotesLocal") == "redetermination") {
        localStorage.setItem("caseNotesLocal", )
        //$('#new').click()
    };
};*/
//SECTION END Do action based on Alert Type

//SECTION START CaseLockStatus Reveal Unlock button
if (window.location.href.indexOf("CaseLockStatus") > -1) {
    $('#caseLockStatusDetail').append('<div style="font-size: 20px; background-color: yellow;" id="acceptMyTerms">I acknowledge that I take responsibility for my own actions. Please show the "Unlock" button.</div>')
    $('#acceptMyTerms').click(function() { termsAccepted()} );
    function termsAccepted() {
        $("#caseLockStatusUnlockButtonArea").show();
        $("#acceptMyTerms").remove();
    };
};
//SECTION END CaseLockStatus Reveal Unlock button
})();
