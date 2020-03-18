if(window.localStorage) {
	//configs
	var updateInterval = 1000; //ms
	function randomRange() {
		return Math.floor(Math.random()*3)+1;
	}
	
	
	var counter = +localStorage.getItem('counter');
	if (!counter) { 
		counter = 0;
	} else { 
		var lastSessionEnd = +localStorage.getItem('lastSessionEnd');
		for(var l = Math.floor((getUnixTimeStamp() - lastSessionEnd)*1000/updateInterval); l--;) {
			counter += randomRange();
		}
	}
	
	var liveNumbers = document.getElementById('liveNumbers'); //cache DOM query
	function refreshDisplay() {
		liveNumbers.innerHTML = commaSeparateNumber(counter);
	}
	refreshDisplay();
	setInterval(function() {
		counter += randomRange();
		refreshDisplay();
	}, updateInterval);

	function commaSeparateNumber(val) {
		while (/(\d+)(\d{3})/.test(val.toString())){
			val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}
		return val;
	}
	
	function getUnixTimeStamp() {
		return Math.floor(Date.now()/1000);
	}
	
	window.addEventListener('beforeunload', function() {
		localStorage.setItem('counter', counter);
		localStorage.setItem('lastSessionEnd', getUnixTimeStamp());
	});
} else {
  console.log("Sorry Browser not supported!");
}
