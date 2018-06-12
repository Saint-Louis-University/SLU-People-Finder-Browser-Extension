function saveOptions(e) {
	e.preventDefault();
	
	browser.storage.sync.set({
		isDefaultFacStaff: document.querySelector("#isDefaultFacStaff").checked
	});
	
	browser.storage.sync.set({
		doCopyFirstEmail: document.querySelector("#doCopyFirstEmail").checked
	});
}

function restoreOptions() {
	function setIsDefaultFacStaff(result) {
		var isDefaultFacStaff = typeof result.isDefaultFacStaff !== "undefined" ? result.isDefaultFacStaff : true;
		document.querySelector("#isDefaultFacStaff").checked = isDefaultFacStaff;
	}
	
	function setDoCopyFirstEmail(result) {
		var doCopyFirstEmail = typeof result.doCopyFirstEmail !== "undefined" ? result.doCopyFirstEmail : false;
		document.querySelector("#doCopyFirstEmail").checked = doCopyFirstEmail;
	}
	
	function onError(error) {
		console.log(`Error: ${error}`);
	}
	
	var gettingIsDefaultFacStaff = browser.storage.sync.get("isDefaultFacStaff");
	gettingIsDefaultFacStaff.then(setIsDefaultFacStaff, onError);
	
	var gettingDoCopyFirstEmail = browser.storage.sync.get("doCopyFirstEmail");
	gettingDoCopyFirstEmail.then(setDoCopyFirstEmail, onError);
}

document.addEventListener("DOMContentLoaded", function() { 
	restoreOptions();
	document.querySelector("#isDefaultFacStaff").onchange=saveOptions;
	document.querySelector("#doCopyFirstEmail").onchange=saveOptions;
});
