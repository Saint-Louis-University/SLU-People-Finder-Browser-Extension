display_results = function(json) {
	$('#results_table tbody').empty();
	$('#results').show();
	
	var n_rows_skipped = 0;
	
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
		
		if($('#faculty_staff_only').prop('checked') && affiliation == "Student") {
			n_rows_skipped++;
			continue;
		}
				
		if ((i - n_rows_skipped) % 2 == 0){
            $('#results_table > tbody:last-child').append('<tr class="even-row">' + 
		                                            '<td id="fullname-cell">' + fullname + '</td>' + 
		                                            '<td id="title-cell">' + title + '</td>' + 
												    '<td id="dept-cell">' + dept + '</td>' + 
												    '<td id="affiliation-cell">' + affiliation + '</td>' + 
												    '<td id="email-cell"><a href="mailto:' + email + '" target="_blank">' + email + '</a></td>' + 
												    '<td id="telephone-cell">' + telephone + '</td>' + 
												    '<td id="office-cell">' + office + '</td>' + 
												    '</tr>');
        } else {
			$('#results_table > tbody:last-child').append('<tr class="odd-row">' + 
		                                            '<td id="fullname-cell">' + fullname + '</td>' + 
		                                            '<td id="title-cell">' + title + '</td>' + 
												    '<td id="dept-cell">' + dept + '</td>' + 
												    '<td id="affiliation-cell">' + affiliation + '</td>' + 
												    '<td id="email-cell"><a href="mailto:' + email + '" target="_blank">' + email + '</a></td>' + 
												    '<td id="telephone-cell">' + telephone + '</td>' + 
												    '<td id="office-cell">' + office + '</td>' + 
												    '</tr>');
        }
	}
}

do_search = function() {
	var query_string = $('#search_text').val();
	var base_url = 'https://www.slu.edu/peoplefinder/json/json_index.php?q=';
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

$('#search_button').click(do_search);

$('#clear_button').click(do_clear);

$('#search_text').keypress(function(e) {
	if(e.which == 13) {
		do_search();
	}
});

// work around to https://bugzilla.mozilla.org/show_bug.cgi?id=1324255
setTimeout(() => { document.querySelector('#search_text').focus(); }, 100);