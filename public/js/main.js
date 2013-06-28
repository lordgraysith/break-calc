$(function(){
	var startInput
	, $startInput
	, $duration
	, endInput
	, startDate
	, findTheEnd
	, tzOffset
	, setInputDate
	, startDateChange
	, thirtyFourHours = 34 * 60 * 60 * 1000;

	findTheEnd = function(startDate){
		var milliseconds = 0
		, endDate;

		//initialize the end date as the same time
		endDate = new Date(startDate.getTime());

		//if it's past one AM, move to next day
		if(startDate.getHours() > 1 || (startDate.getHours() === 1 && startDate.getMinutes() > 0)){
			endDate.setDate(startDate.getDate() + 1);
		}
		//now advance to 5 AM the next day
		endDate.setDate(endDate.getDate() + 1);
		endDate.setHours(5);
		endDate.setMinutes(0);

		//see if the difference is 34 hours or more
		if(endDate - startDate >= thirtyFourHours){
			return endDate;
		}//if not, then just 34 hours from start will do
		else{
			return new Date(startDate.getTime() + thirtyFourHours);
		}
	};

	setInputDate = function(input, date){
		input.valueAsNumber = date.getTime() - (date.getTimezoneOffset() * 60000);
	};

	startDateChange = function(){
		var endDate
		, duration
		, hours
		, minutes;
		startDate = new Date(startInput.valueAsNumber + (tzOffset * 60000));
		endDate = findTheEnd(startDate);
		setInputDate(endInput, endDate);
		duration = endDate - startDate;
		//convert duration to minutes
		duration = Math.round(duration / 60000);
		minutes = duration % 60;
		duration = duration - minutes;
		hours = duration / 60;
		$duration.text(hours + ' hours ' + minutes + ' minutes');
	};

	//initialize vars
	startDate = new Date();
	tzOffset = startDate.getTimezoneOffset();
	$startInput = $('#break-start');
	startInput = $startInput[0];
	endInput = $('#break-end')[0];
	$duration = $('#duration');
	//bind events
	$startInput.on('change', startDateChange);
	//start doing stuff
	setInputDate(startInput, startDate);
	startDateChange();
});
