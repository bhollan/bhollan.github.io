describe("StopWatch", function() {
	
	var stopwatch;
	
	beforeEach(function () {
		stopwatch = new StopWatch();
	});
	
	it("Should be defined", function(){
		expect(stopwatch).toBeDefined();
	});
	
	it("Should run when started", function(){
		stopwatch.start();
		expect(stopwatch.running).toBeTruthy();
		expect(stopwatch.splits.length).toEqual(1);
		expect(stopwatch.systemTimes[0]/Date.now()).toBeCloseTo(1);
		expect(stopwatch.systemTimes[0]).toBeLessThan(Date.now());
	});
	
	it("Should take split times", function(){
		stopwatch.start();
		stopwatch.addSplit();
		stopwatch.addSplit();
		expect(stopwatch.splits.length).toBe(3);
		expect(stopwatch.systemTimes.length).toBe(3);
		
		stopwatch.stop();

		expect(stopwatch.splits[stopwatch.splits.length - 1]).toBeDefined();
	});
		
//	it("Should accept simulated split times (for testing)", function(){
////		jasmine.clock().install();
//		
//		stopwatch.start();
//		stopwatch.addSplit(1000);	//time in ms
//		stopwatch.addSplit(11000);
//		stopwatch.addSplit(300);
//		stopwatch.stop();
//		
//		expect(stopwatch.splits.length).toEqual(5);
//		
//		expect(stopwatch.splits[2]).toEqual(11000);
//		expect(stopwatch.systemTimes[stopwatch.systemTimes.length - 1] - stopwatch.systemTimes[0]).toEqual(12300);
//		
////		jasmine.clock().uninstall();
//		
//	});
		
	it("Should stop", function(){
		stopwatch.start();
		stopwatch.stop();

		expect(stopwatch.running).toBeFalsy();
		expect(stopwatch.systemTimes[1]/stopwatch.systemTimes[0]).toBeCloseTo(1);
	});
	
	it("Should reset", function(){
		stopwatch.start();
		stopwatch.addSplit();
		stopwatch.stop();
		stopwatch.reset();
		
		expect(stopwatch.running).toBeFalsy();
		expect(stopwatch.splits).toEqual([0]);
	});
	
	it("Should remove user-determined invalid splits",function(){
		stopwatch.start();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.stop();
		
		stopwatch.remove(1);
		stopwatch.remove(3);
		
		expect(stopwatch.splits.length).toEqual(5);
		expect(stopwatch.splits[6]).toBeUndefined();
	});
	
});

describe("Calculations", function() {
	
	var stopwatch;
		stopwatch = new StopWatch();
	
	beforeEach(function () {
		stopwatch = new StopWatch();
		stopwatch.start();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.stop();
	});
	
	it("Should calculate the mean", function(){
		expect(stopwatch.mean).toEqual(0.000);
	});
	
	
});

describe("Calibration Check", function(){
	
	var stopwatch;
	
	stopwatch = new StopWatch();
	
	
	
	it("Should display the calibration error",function(){
		expect(stopwatch.checkCalibration()).toBeCloseTo(0.010);
	});
});

describe("Graphical Points", function(){
	
	var stopwatch;
	stopwatch = new StopWatch();
	
	beforeEach(function () {
		stopwatch = new StopWatch();
		stopwatch.start();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.addSplit();
		stopwatch.stop();
	});
});