//$($('.single-table-row')[1]).attr('class').split(' ')
//$('.team-name-column')
/**
 * Constance
 */
var ROW_LEAGUE = 'league-row';
var ROW_SPECIAL = 'special-row';
 
/**
 * Logic
 */
var matches = [];

function get_match() {
	matches = [];
	var i = -1;
	var collect = false;
	
	$('.today-single-table tbody').each(function(){
		
		var row_type = $(this).find('tr').attr('class');
		if (row_type == ROW_LEAGUE)
			collect = true;
		else if (row_type == ROW_SPECIAL)
			collect = false;
		
		if(collect) {			
			var c = $(this).attr('class');
			if( c != undefined) {
				if (c.split(' ')[1] != 'subrow') {
					var match = {prices: []};
					match.home_team = $($(this).find('td.team-name-column span')[0]).text();
					match.away_team = $($(this).find('td.team-name-column span')[1]).text();
					
					console.log(match.home_team + ' V ' + match.away_team);
					
					var hdcp = $($(this).find('.hdp-point')[0]).text();
					if (hdcp.charCodeAt(0) != 160) {
						var id = $($(this).find('.odds-wrap .odds')[0]).attr('id').split(':')[3];
						var home = $($(this).find('.odds-wrap .odds')[0]).text();
						var away = $($(this).find('.odds-wrap .odds')[1]).text();
						var p = new Price( hdcp, hdcp, home, away);
						match.prices.push(p);
					}
					
					matches.push(match);
					i++;
				} else {
					var hdcp = $($(this).find('.hdp-point')[0]).text();
					if (hdcp.charCodeAt(0) != 160) {
						var id = $($(this).find('.odds-wrap .odds')[0]).attr('id').split(':')[3];
						var home = $($(this).find('.odds-wrap .odds')[0]).text();
						var away = $($(this).find('.odds-wrap .odds')[1]).text();
						var p = new Price( hdcp, hdcp, home, away);
						matches[i].prices.push(p);
					}					
				}
			}
		}
		
	//	var match = {};
	//	if($(this).attr('class').split(' ')[1] != 'subrow') {
	//		match.home_team = $($(this).find('td.team-name-column span')[0]).text();
	//		match.away_team = $($(this).find('td.team-name-column span')[1]).text();
	//		matches.push(match);
	//	}
	});
}

function Price (id, hdcp, home, away) {
	this.id = id;
	this.hdcp = hdcp;
	this.home = home;
	this.away = away;
}
