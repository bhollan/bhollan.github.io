function StopWatch(){
	
};

StopWatch.prototype.splits = [0];

StopWatch.prototype.running = false;

StopWatch.prototype.start = function() {
	//because we're capturing split times, we have 
	//to keep track of absolute time, AND each delta 
	this.splits = [0];
	this.systemTimes = [Date.now()];
	this.running = true;
};

StopWatch.prototype.stop = function() {

	console.log(this.systemTimes);
	
	if (this.systemTimes[this.systemTimes.length - 1] < Date.now()){
		
		//if the last recorded time in 'systemTimes' is prior to 'now',
		//call addSplit with the absolute value of the difference as the parameter.
		this.addSplit( Math.abs(Date.now() - this.systemTimes[this.systemTimes.length - 1] ));
//		this.addSplit( this.sytemTimes[]);
			
	} else{
		this.addSplit();
	};
	
	this.running = false;
	console.log(this.systemTimes);
};

StopWatch.prototype.addSplit = function(newPoint) {
	//addSplit either A: takes in a simulated timepoint (in ms) as newPoint
	//		-or-      B: makes a new split time in the splits and systemTimes arrays.
	
	//if the stopwatch is not running, return
	if (this.running !== true) {return};

	//if the argument is passed in, it's a simulated 'lap' time in ms
	if (newPoint !== undefined) {
		//push simulated delta and calculate simulated systemTime
		this.splits.push(newPoint);
		newPoint += this.systemTimes[this.systemTimes.length - 1];
		this.systemTimes.push(newPoint);
	}
	else {  //if newPoint IS undefined, it's a genuine 'lap' time press
		//push 'now' and calculate the split (using systemTimes)
		// console.log("genuine");
		this.systemTimes.push(Date.now());
		this.splits.push(this.systemTimes[this.systemTimes.length - 1] - this.systemTimes[this.systemTimes.length - 2]);
	};
};

StopWatch.prototype.remove = function(index) {
	
	if (index < this.splits.length && this.splits.length > 2){
	
	//to keep relative and absolute times in check, we have to alter one relative time
	this.splits[index - 1] = this.systemTimes[index + 1] - this.systemTimes[index - 1]; 
	
	this.splits.splice(index,1);
	this.systemTimes.splice(index,1);
		
		//don't just remove, you have to add the time to be removed to the right spot(s)
	};
};

StopWatch.prototype.reset = function() {
	this.splits = [0];
	this.running = false;

//  This code runs on initial set-up, as well as on calling 'BLAT.reset();'
//	Define all statistics we want to access in all the methods
	StopWatch.prototype.sumTotal 	= 0;
	StopWatch.prototype.mean 		= 0;
	StopWatch.prototype.mode		= 0;
	StopWatch.prototype.median		= 0;
	StopWatch.prototype.stddev		= 0;
	StopWatch.prototype.variance	= 0;
	StopWatch.prototype.min			= 0;
	StopWatch.prototype.max			= 0;
	StopWatch.prototype.range		= 0;
	StopWatch.prototype.perMinute	= 0;

};

StopWatch.prototype.calculateMean = function() {
	
	//always safe for div/zero
	console.log(this.sumTotal + ", " + this.splits.length);
	this.mean = (this.sumTotal)/(this.splits.length);
	
};

StopWatch.prototype.calculateRange = function() {
	this.min = this.max - this.min;
};

StopWatch.prototype.checkCalibration = function () {
	return 0.015;
};

