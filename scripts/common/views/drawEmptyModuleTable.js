'use strict';

var numCol = 5;			//default number of module tiles per semester
var numRow = 8; 		//default number of semesters

var drawEmptyModuleTable = {
	draw: function() {
		//for debugging purpose
		$(".remove-me-module-table").remove();

		var flag = 1;
		for (var i = 1; i <= numRow; i++) {			
			$("#module-table").append("<div class='semester' id='s" + i + "'>");

			var semId = "#s" + i;
			$(semId).append("<div class='semester-head'><p>Year " + (i + flag)/2 + "</p><p>Sem " + (2-flag) + "</p></div>");
			flag = 1-flag;
			for (var j = 1; j <= numCol; j++) {
				$(semId).append("<div class='module-tile empty-module-tile' id='s" + i + "t" + j +"'></div>");
			}
			$(semId).append("<div class= 'semester-mc'>0 MCs</div>")
		}
	},
};

module.exports = drawEmptyModuleTable;