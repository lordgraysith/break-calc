$(function(){
	var start
	, now = new Date()
	, findTheEnd;

	findTheEnd = function(){
		var milliseconds = 0;
		
	};

	start = $('#break-start')[0];
	start.valueAsNumber = now.getTime() - (now.getTimezoneOffset() * 60000);
});
