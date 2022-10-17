// ==UserScript==
// @name         MEC2Buttons
// @namespace    http://github.com/jbmccormick
// @version      0.54
// @description  Add navigation buttons to MEC2 to replace the drop down hover menus
// @author       MECH2
// @match        mec2.childcare.dhs.state.mn.us/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/jbmccormick/MEC2Web/master/MEC2Buttons.user.js
// ==/UserScript==

(function() {
    'use strict';
/* globals jQuery, $, waitForKeyElements */
let viewMode = $('#page-wrap').length;
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
    addGlobalStyle('.custombutton:hover { background-color: #DAF7A6; }'); //button hover style
    addGlobalStyle('.custombuttonclicked { background-color: #A6EDF7; }');
    addGlobalStyle('.custom-form-button { margin-left: 10px; cursor: pointer; }');
    addGlobalStyle('.fake-custom-button { background-color: #dcdcdc !important; width: fit-content; height: 25px; padding: 0px 6px 0px 6px !important; display: inline-flex; align-items: center; justify-content: center; }');
    addGlobalStyle('.fake-custom-button-nodisable { cursor: pointer; padding: 3px 4px; margin: 1px; border: 2px solid; border-radius:4px; }'); //button style
    addGlobalStyle('.centered-text { display: inline-flex; align-items: center; justify-content: center; }');
    addGlobalStyle('.centered-right-label { display: inline-flex; align-items: center; justify-content: flex-end; text-align: right; }');
    addGlobalStyle('.centered-form-group { /*display: inline-flex; */align-items: center; }');
    addGlobalStyle('#buttonPaneThree { margin-bottom:1px; }');
    if (primaryPanelID.getAttribute('Id') == "greenline") {
        addGlobalStyle('.custombutton { color: DarkGrey; cursor: no-drop; padding: 3px 4px; margin: 1px; border: 2px solid; border-radius:4px; }'); //button style
        addGlobalStyle('.custombuttonplus { border-left: 0; margin-left:-7px; border-top-left-radius:0; border-bottom-left-radius:0; }'); //button style
        addGlobalStyle('.custombutton:hover { background-color: #DAF7A6; }'); //button hover style
        addGlobalStyle('.custombuttonclicked { background-color: #A6EDF7; }');
        addGlobalStyle('.panel.panel-default { margin-top: 0px !important; }');
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
		providerOverview:["Overview","getProviderOverview", "_self", "Provider Overview", "ProviderOverviewSelf", "providerButtons"],
        providerNotes:["Notes","ProviderNotes", "_self", "Provider Notes", "ProviderNotesSelf", "providerButtons"],
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
        //console.log("There's no drop down to pull links from, figure out how to do it without.")
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
// buttonClicked, traverseOnPageLoad, traverseOnRowTwoClick are to highlight buttons based on the current page
function buttonClicked(){
$('.custombuttonclicked').removeClass('custombuttonclicked');
/*    let clickedButtons = document.getElementsByClassName('custombuttonclicked');
      for(let i = 0; i < clickedButtons.length; i++) {
          clickedButtons[i].classList.remove('custombuttonclicked');
      }*/
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
//SECTION START Superfluous delete button
if (window.location.href.indexOf("Alerts") > -1) {
    $('#alertTotal').after('<div class="form-button custom-form-button centered-text" id="buttonDeleteTop">Delete Alert</div>')
    $('#buttonDeleteTop').click(function() { $('#delete').click()});
};
//SECTION END Superfluous delete button

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
/*
To use it:
    waitForElm('.some-class').then((elm) => {
        console.log('Element is ready');
        console.log(elm.textContent);
    });
Or with async/await:
    const elm = await waitForElm('.some-class');
*/
//SECTION END Wait for something to be available

//SECTION START Delete all alerts of current name onclick
if (window.location.href.indexOf("Alert") > -1 && $('#new').length > 0) {
    function onAlertsLoaded() {
        let alertsToDelete = sessionStorage.getItem('alertsToDelete');
        if (alertsToDelete !== undefined && alertsToDelete !== null) {
            if ($('#caseOrProviderTable .selected td').eq(2).text() == alertsToDelete) {
                if ($('#delete').prop('disabled')) {
                    $('h4:contains("Case/Provider List")').append('<div style="float: right; display:inline-flex">Delete All ended. Alert can\'t be deleted</div>');
                    sessionStorage.removeItem('alertsToDelete');
                    return;
                } else {
                    $('#delete').click()
                };
            } else {
                $('h4:contains("Case/Provider List")').append('<div style="float: right; display:inline-flex">Delete All ended. All alerts deleted from case ' + alertsToDelete + '.</div>');
                sessionStorage.removeItem('alertsToDelete');
                return;
            };
        };
    };
    $('#delete').after('<div class="form-button custom-form-button centered-text" id="buttonDeleteAll">Delete All</div>');
    $('#buttonDeleteAll').on("click", function() {
        sessionStorage.setItem('alertsToDelete', $('#caseOrProviderTable .selected td').eq(2).text());
        $('#delete').click()
    });
//};
//SECTION END Delete all alerts of current name onclick
//SECTION START Do action based on Alert Type
//if (window.location.href.indexOf("Alerts.htm") > -1) {
    let anchorPoint = document.getElementById('message');
    let btnNavigation = document.createElement('div');
    btnNavigation.type = 'div';
    btnNavigation.innerHTML = "Select an alert";
    btnNavigation.id = "doTheThing";
    btnNavigation.className = 'custombutton fake-custom-button';
    anchorPoint.insertAdjacentElement('afterend', btnNavigation);
    btnNavigation.addEventListener("click", function() { goDoTheThing()});
    let clickedAlert = $('#alertTable');
    $('#doTheThing').text($('#alertTable .selected').children().eq(0).text());
    document.querySelector('#caseOrProviderTable .selected').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    $('#caseOrProviderTable, #alertTable').click(function(event) {
        changeButtonText();
    });
    waitForElmValue('#alertTable > tbody > tr > td').then((elm) => {//test
    onAlertsLoaded();
    changeButtonText();
    goScrollIntoView();
    });
//};
//SECTION END Do action based on Alert Type

//SECTION START Copy Alert text, navigate to Case Notes
function copyExplanation() {
    let copyText = document.getElementById("message").value.replaceAll('/n', ' ');
    navigator.clipboard
        .writeText(copyText)
        .then(() => {
        localStorage.setItem('mech2.caseNoteText', copyText);
        let parm2var = document.getElementById('caseOrProviderTable').getElementsByClassName('selected')[0].childNodes[2].innerText //$('#caseOrProviderTable_wrapper .selected').children('td:nth-child(3)')//.text()?
        let parm3var = document.getElementById('periodBeginDate').value.replace(/\//g, '') + document.getElementById('periodEndDate').value.replace(/\//g, '')
        window.open('https://mec2.childcare.dhs.state.mn.us/ChildCare/CaseNotes.htm?parm2=' + parm2var + '&parm3=' + parm3var, '_blank')
    })
        .catch(() => {
        alert("Something went wrong");
    });
};
$('#message').after('<div class="custombutton fake-custom-button" id="copyAlertButton">Copy, goto Notes</div>');
$('#copyAlertButton').click(function() { copyExplanation()});
//SECTION END Copy Alert text, navigate to Case Notes

function goScrollIntoView() {
    document.querySelector('#caseOrProviderTable .selected').scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
};

function changeButtonText() {
    let alertType = $('#alertTable .selected').children().eq(0).text()
    if (alertType == '') {
        document.getElementById('doTheThing').innerHTML = 'Click on Alert (needs to be fixed)'
    } else if (alertType == 'Eligibility') {
        document.getElementById('doTheThing').innerHTML = alertType
    } else {
        document.getElementById('doTheThing').innerHTML = alertType + ' is not yet supported'
    };
};
//SECTION START Do action based on Alert Type
function goDoTheThing() {
    //rewrite this section. Make arrays based on category, get category and match to startsWith?
    let messageText = document.getElementById('message');//alertTable
    if (messageText.value == "Unapproved results have been created and need review.") {//eventually replace this with... startsWith? Spreadsheet in Documents has alerts list.
        let parm2var = document.getElementById('caseOrProviderTable').getElementsByClassName('selected')[0].childNodes[2].innerText //caseOrProviderTable selected[0]
        let parm3var = document.getElementById('periodBeginDate').value.replace(/\//g, '') + document.getElementById('periodEndDate').value.replace(/\//g, '')
        window.open('/ChildCare/CaseEligibilityResultSelection.htm?parm2=' + parm2var + '&parm3=' + parm3var, '_blank')
    };
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

//SECTION START Copy client mail to address to clipboard on Case Address page
if (window.location.href.indexOf("CaseAddress") > -1) {
    function firstNameSplitter(name) {
        if (name.split(",")[1].split(" ").length > 3) {
            return name.split(",")[1].split(" ")[1] + " " + name.split(",")[1].split(" ")[2]
        } else {
            return name.split(",")[1].split(" ")[1]
        };
    };
    $('#caseInputSubmit').after('<div class="custombutton fake-custom-button centered-text" style="float: right;" id="copyMailing">Copy Mail Address</div>');
    $('#copyMailing').click(function() {
        let caseNameRaw = $('label[for="caseHeaderName"]').parent().contents().eq(2).text();
        let lastName = caseNameRaw.split(",")[0];
        let firstName = firstNameSplitter(caseNameRaw)
        let caseNameSpaces = caseNameRaw.split(" ");
        if ($('#mailingStreet1').val() !== "") {
            let state = (document.getElementById('mailingStateProvince').value === "Minnesota") ? "MN":"WI";
            let copyText = firstName + " " + lastName + "\n" + document.getElementById('mailingStreet1').value + " " + document.getElementById('mailingStreet2').value + "\n" + document.getElementById('mailingCity').value + ", " + state + " " + document.getElementById('mailingZipCode').value
            navigator.clipboard.writeText(copyText)
        } else {
            let state = (document.getElementById('residenceStateProvince').value === "Minnesota") ? "MN":"WI";
            let copyText = firstName + " " + lastName + "\n" + document.getElementById('residenceStreet1').value + " " + document.getElementById('residenceStreet2').value + "\n" + document.getElementById('residenceCity').value + ", " + state + " " + document.getElementById('residenceZipCode').value
            navigator.clipboard.writeText(copyText)
        };
    });
};
//SECTION END Copy client mail to address to clipboard on Case Address page

//SECTION START Fill manual Billing PDF Forms, also nav to Provider Address
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
    //return new Date(date).setDate(result.getDate() + days);
};
function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}
if (window.location.href.indexOf("CaseServiceAuthorizationOverview") > -1) {
    function billingFormInfo() {
        let caseNumber = $('#caseId').val();//Case Number
        let caseName = toTitleCase($('#caseHeaderData').children().prop('innerText').slice(5));
        let period = $('#selectPeriod').val();
        let startDate = $('#selectPeriod').val().split(" ")[0];
        let endDate = $('#selectPeriod').val().slice(13);
        let providerName = $('#providerInfoTable .selected td').eq(1).prop('innerHTML');
        let providerId = $('#providerInfoTable .selected td').eq(0).prop('innerHTML');
        let copayAmount = $('#copayAmount').val();
        let childList = {};
        let attendance0 = new Date(startDate).toLocaleDateString('en-US', {
                year: "2-digit",
                month: "numeric",
                day: "numeric",
        });
        let attendance7 = addDays(startDate, 7).toLocaleDateString('en-US', {
                year: "2-digit",
                month: "numeric",
                day: "numeric",
        });
        //let childList = {};
        $('#childInfoTable tbody tr').each(function(index) {//child#.name:, child#.authHours:, child#.ageCat0:, child#.ageCat1:
            $('#childInfoTable tbody tr').click().eq([index]);
            childList["child" + index] = {};
            childList["child" + index].name = toTitleCase($(this).children('td').eq(1).text());
            childList["child" + index].authHours = $(this).children('td').eq(3).text();
            childList["child" + index].ageCat0 = $('#ageRateCategory').val();
            childList["child" + index].ageCat1 = $('#ageRateCategory2').val();
        });
        const formInfo = {pdfType:"BillingForm", xNumber:localStorage.getItem("userIdNumber"), caseName:caseName, caseNumber:caseNumber, startDate:startDate, endDate:endDate, providerId:providerId, providerName:providerName, copayAmount:copayAmount, attendance0:attendance0, attendance7:attendance7, ...childList};
        window.open("http://nt-webster/slcportal/Portals/65/Divisions/FAD/IM/CCAP/index.html?parm1=" + JSON.stringify(formInfo), "_blank");
    };

    $('#csicTableData1').before(`
<div style="overflow: auto" id="billingFormDiv">
<div class="form-group centered-form-group">

<div class="custombutton fake-custom-button centered-text" id="billingForm">Create Billing Form</div>
<label for="copayAmount" class="control-label textR" style="height: 28px;"> Copay Amount: $</label>
<input class="centered-text" style="height: 22px; width: 40px;" id="copayAmount"></input>
<div class="custombutton fake-custom-button centered-text" id="providerAddressButton">Open Provider Address Page</div>
</div>
</div>
`);
    $('#billingForm').on("click", function() { billingFormInfo()});
    $('#providerAddressButton').click(function() {
        let providerId = $('#providerInfoTable .selected td').eq(0).prop('innerHTML');
        window.open("/ChildCare/ProviderAddress.htm?providerId=" + providerId, "_blank");
    });
};
if (window.location.href.indexOf("ProviderAddress") > -1) {
    $('#providerInput').append('<div class="custombutton fake-custom-button centered-text" style="float: right;" id="copyMailing">Billing Form Address to Clipboard</div>');
    $('#copyMailing').click(function() {
        if ($('#addrBillFormDisplay').val() == "Site/Home") {
        let state = (document.getElementById('mailingSiteHomeState').value === "Minnesota") ? "MN":"WI";
        let copyText = $('#providerData').children(0).contents().eq(4).text() + "\n" + document.getElementById('mailingSiteHomeStreet1').value + " " + document.getElementById('mailingSiteHomeStreet2').value + "\n" + document.getElementById('mailingSiteHomeCity').value + ", " + state + " " + document.getElementById('mailingSiteHomeZipCode').value
        navigator.clipboard.writeText(copyText)
        } else {
        let state = (document.getElementById('mailingState').value === "Minnesota") ? "MN":"WI";
        let copyText = $('#providerData').children(0).contents().eq(4).text() + "\n" + document.getElementById('mailingStreet1').value + " " + document.getElementById('mailingStreet2').value + "\n" + document.getElementById('mailingCity').value + ", " + state + " " + document.getElementById('mailingZipCode').value
        navigator.clipboard.writeText(copyText)
        };
    });
};
//SECTION END Fill manual Billing PDF Forms, also nav to Provider Address

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
};
//SECTION END Open provider information page from Child's Provider page

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

//SECTION START Fill Child Support PDF Forms
$('#selectPeriod').css("width", "25%");
if (window.location.href.indexOf("CaseCSE") > -1) {
    $('#caseInputSubmit').after('<div class="custombutton fake-custom-button centered-text" id="csForms" style="display: inline-flex; margin-left: 10px !important;">CS Forms</div>');
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
        const formInfo = {pdfType:"csForms", xNumber:localStorage.getItem("userIdNumber"), caseNumber:caseNumber, cpInfo:cpInfo, ncpInfo:ncpInfo, ...childList};
        window.open("http://nt-webster/slcportal/Portals/65/Divisions/FAD/IM/CCAP/index.html?parm1=" + JSON.stringify(formInfo), "_blank");
    });
};
//SECTION END Fill Child Support PDF Forms

//SECTION START CaseLockStatus Reveal Unlock button
if (window.location.href.indexOf("CaseLockStatus") > -1) {
    $('#caseLockStatusDetail').append('<div style="font-size: 20px; background-color: yellow;" id="acceptMyTerms">I acknowledge that I take responsibility for my own actions. Show the "Unlock" button.</div>')
    $('#acceptMyTerms').click(function() { /*termsAccepted()} );
    function termsAccepted() {*/
        $("#caseLockStatusUnlockButtonArea").show();
        $("#acceptMyTerms").remove();
    });
};
//SECTION END CaseLockStatus Reveal Unlock button

//SECTION START Fix for table entries losing selected class when clicked on
$('tbody').click(function(event) {
    $(event.target).parents('tr').addClass('selected');//.closest('tr') would also work
});
//SECTION END Fix for table entries losing selected class when clicked on

//SECTION START Open CaseMemberHistory page from CaseMember with 'button'
if (window.location.href.indexOf("CaseMember") > -1 && $('#page-wrap').length == 0) {
    $('label[for="memberReferenceNumber"]').attr('id','openHistory').css('border-width','1px').css('border-color','gray').css('border-style','solid');
    $('#openHistory').click(function() {
        window.open('/ChildCare/CaseMemberHistory.htm?parm2=' + $('#caseId').val(), '_blank');
    });
};
//SECTION START Open CaseMemberHistory page from CaseMember with 'button'

//SECTION START Retract drop-down menu on page load
$('.sub_menu').css('visibility', 'hidden');
//SECTION END Retract drop-down menu on page load

//SECTION START Naviation buttons to Eligibility Selection, Service Authorization Overview, and Case Overview from CaseWrapUp page
if (window.location.href.indexOf("CaseWrapUp") > -1 && $('#done').attr('Disabled')) {
    let parm3var = '&parm3=' + document.getElementById('selectPeriod').value.replace(' - ', '').replaceAll('/','');
    $('#caseHeaderData').after(`<div>
    <div id="goEligibility" class="fake-custom-button-nodisable fake-custom-button">Eligibility</div>
    <div id="goSAOverview" class="fake-custom-button-nodisable fake-custom-button">SA Overview</div>
    <div id="goSAApproval" class="fake-custom-button-nodisable fake-custom-button">SA Approval</div>
    <div id="goCaseOverview" class="fake-custom-button-nodisable fake-custom-button">Case Overview</div>
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
    $('#goCaseOverview').click(function() {
        window.open('/ChildCare/CaseOverview.htm?parm2=' + $('#caseId').val() + parm3var, '_self');
    });
};
//SECTION END Naviation buttons to Eligibility Selection, Service Authorization Overview, and Case Overview from CaseWrapUp page

//SECTION START Temp end date for KEYZone Sites
if (window.location.href.indexOf("CaseChildProvider") > -1) {
    if ($('#page-wrap').length == 0 && $('#selectPeriod').val() == "10/17/2022 - 10/30/2022" && $('tbody tr td:contains("KEYZone")').length > 0) {
        $('#providerType').parent().after('<div class="fake-custom-button-nodisable fake-custom-button" id="endKeyZone" style="display: inline-flex; margin-left: 10px !important;">End KEYZone SA</div>');
        //$('#providerType').parent().after('<div class="fake-custom-button-nodisable fake-custom-button" id="newKeyZone" style="display: inline-flex; margin-left: 10px !important;">New KEYZone SA</div>');
        //$('#childProviderTableData').after('<select id="newKeyZone" name="newKeyZone" class="form-control" title="New KEYZone Entry" tabindex="1"><option value="">Select KEYZone Site</option><option value="41103">Piedmont</option><option value="41105">Stowe</option><option value="41106">Homecroft</option><option value="41107">Lakewood</option><option value="41108">Myers-Wilkins</option><option value="41109">Congdon</option><option value="41110">Laura MacArthur</option><option value="41112">Lester Park</option><option value="41111">Lowell</option></select>');
        $('#childProviderTableData').after(`
        <select id="newKeyZone" name="newKeyZone" class="form-control" title="New KEYZone Entry" tabindex="1">
        <option value="">Select KEYZone Site</option>
        <option value="41109">Congdon</option>
        <option value="41106">Homecroft</option>
        <option value="41107">Lakewood</option>
        <option value="41110">Laura MacArthur</option>
        <option value="41112">Lester Park</option>
        <option value="41111">Lowell</option>
        <option value="41108">Myers-Wilkins</option>
        <option value="41103">Piedmont</option>
        <option value="41105">Stowe</option>
        </select>`);
    };
    $('#endKeyZone').click(function() {
        sessionStorage.setItem('previousSA', $('#hoursOfCareAuthorized').val());
        sessionStorage.setItem('childRef', $('#childProviderTableData .selected td').eq(0).text());
        $('#primaryBeginDate').val("");
        $('#secondaryBeginDate').val("10/17/2022");
        $('#secondaryEndDate').val("10/17/2022");
        $('#carePeriodEndDate').val("10/17/2022");
        $('#hoursOfCareAuthorized').val("1");
        $('#careEndReason').val("NL");
    });
    $('#newKeyZone').change(function() {
        $('#providerType').val("License Exempt Center");
        $('#providerLivesWithChild').val("N").prop('tabindex', '-1');
        $('#careInHome').val("N").prop('tabindex', '-1');
        $('#relatedToChild').val("N").prop('tabindex', '-1');
        $('#providerSearch, #providerId, #primaryBeginDate, #primaryEndDate, #secondaryBeginDate, #secondaryEndDate, #careEndReason, #carePeriodBeginDate, #carePeriodEndDate').prop('tabindex', '-1');
        $('#providerLivesWithChildBeginDate, #careInHomeOfChildBeginDate, #exemptionReason, #exemptionPeriodBeginDate, #formSent, #signedFormReceived').parentsUntil('.form-group').hide();
        $('#memberReferenceNumberNewMember').val(sessionStorage.getItem('childRef'))
        $('#providerId').val($('#newKeyZone').val());
        $('#primaryBeginDate').val("10/17/2022");
        $('#carePeriodBeginDate').val("10/17/2022");
        $('#hoursOfCareAuthorized').val(sessionStorage.getItem('previousSA'));
    });
};
})();
