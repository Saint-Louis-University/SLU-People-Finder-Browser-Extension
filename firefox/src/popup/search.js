function setClipboard(value) {
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

display_results = function(json) {
	$('#results_table tbody').empty();
	$('#results').show();

	var n_rows_skipped = 0;
	var is_first_row = true;
	
	for(i=0; i < json.resultSet.result.length; i++) {
		var fullname = "";
		if(typeof(json.resultSet.result[i].fullname) !== "undefined")
			fullname = json.resultSet.result[i].fullname[0];
		
		var title = "";
		if(typeof(json.resultSet.result[i].title) !== "undefined")
			title = json.resultSet.result[i].title[0];
		
		var dept = "";
		if(typeof(json.resultSet.result[i].dept) !== "undefined")
			dept = json.resultSet.result[i].dept[0];
		
		var affiliation = "";
		if(typeof(json.resultSet.result[i].affiliation) !== "undefined")
			affiliation = json.resultSet.result[i].affiliation[0];
		
		var email = "";
		if(typeof(json.resultSet.result[i].email) !== "undefined")
			email = json.resultSet.result[i].email[0];
		
		var telephone = "";
		if(typeof(json.resultSet.result[i].telephone) !== "undefined")
			telephone = json.resultSet.result[i].telephone[0];
		
		var office = "";
		if(typeof(json.resultSet.result[i].office) !== "undefined")
			office = json.resultSet.result[i].office[0];
		
		// data tweaking
		if(affiliation == "Student") {
			var school_year = title.split("/");
			dept = school_year[0].trim();
			title = school_year[1].trim();
		}
		
		if(affiliation == "Faculty/Staff") {
			affiliation = "Fac/Staff";
		}
		
		// skip remaining part of loop if search is for fac/staff and result is student
		if($('#faculty_staff_only').prop('checked') && affiliation == "Student") {
			n_rows_skipped++;
			continue;
		}
		
		// assign row to either even or odd class
		var row_parity = "even";
		if ((i - n_rows_skipped) % 2 != 0)
			row_parity = "odd";
		
		// copy first email (or not)
		if(is_first_row) {
			if(do_copy_email)
				setClipboard(email);
			is_first_row = false;
		}
			
		$('#results_table > tbody:last-child').append('<tr class="' + row_parity + '-row">' + 
		                                              '<td class="fullname-cell">' + fullname + '</td>' + 
		                                              '<td class="title-cell">' + title + '</td>' + 
												      '<td class="dept-cell">' + dept + '</td>' + 
												      '<td class="affiliation-cell">' + affiliation + '</td>' + 
												      '<td class="email-cell"><a href="mailto:' + email + '" target="_blank">' + email + '</a></td>' + 
												      '<td class="telephone-cell">' + telephone + '</td>' + 
												      '<td class="office-cell">' + office + '</td>' + 
												      '</tr>');
	}
}

do_search = function() {
	var query_string = $('#search_text').val();
	var base_url = 'https://archive.slu.edu/peoplefinder/json/json_index.php?q=';
	var req_url = base_url.concat(query_string);
	$.getJSON(req_url, display_results);
	$('#search_text').focus();
}

do_clear = function() {
	$('#search_text').val('');
	$('#results_table tbody').empty();
	$('#results').hide();
	$('#search_text').focus();
}

function onError(error) {
  console.log(`Error: ${error}`);
};

function onGotIsDefaultFacStaff(localStorageObject) {
	var isDefaultFacStaff = typeof localStorageObject.isDefaultFacStaff !== "undefined" ? localStorageObject.isDefaultFacStaff : true;
	$('#faculty_staff_only').prop("checked", isDefaultFacStaff);
};

function onGotDoCopyFirstEmail(localStorageObject) {
	var doCopyFirstEmail = typeof localStorageObject.doCopyFirstEmail !== "undefined" ? localStorageObject.doCopyFirstEmail : false;
	do_copy_email = doCopyFirstEmail;
};

$( document ).ready(function () {
	var gettingIsDefaultFacStaff = browser.storage.sync.get("isDefaultFacStaff");
	gettingIsDefaultFacStaff.then(onGotIsDefaultFacStaff, onError);
	
	var gettingDoCopyFirstEmail = browser.storage.sync.get("doCopyFirstEmail");
	gettingDoCopyFirstEmail.then(onGotDoCopyFirstEmail, onError);
	
	$('#search_button').click(do_search);

	$('#clear_button').click(do_clear);

	$('#search_text').keypress(function(e) {
		if(e.which == 13) {
			do_search();
		}
	});
	
	$('#search_text').focus();
});

