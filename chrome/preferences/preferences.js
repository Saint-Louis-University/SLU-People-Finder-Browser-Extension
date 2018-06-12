function save_options() {
	var isDefaultFacStaff = document.getElementById('isDefaultFacStaff').checked;
    var doCopyFirstEmail = document.getElementById('doCopyFirstEmail').checked;
	
	chrome.storage.sync.set({
		isDefaultFacStaff: isDefaultFacStaff, 
		doCopyFirstEmail: doCopyFirstEmail
	});
}

function restore_options() {
  chrome.storage.sync.get({
    isDefaultFacStaff: true,
    doCopyFirstEmail: false
  }, function(items) {
    document.getElementById('isDefaultFacStaff').checked = items.isDefaultFacStaff;
    document.getElementById('doCopyFirstEmail').checked = items.doCopyFirstEmail;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('isDefaultFacStaff').addEventListener('change', save_options);
document.getElementById('doCopyFirstEmail').addEventListener('change', save_options);
