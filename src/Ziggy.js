function Ziggy (){
};

/* This class creates a new Ziggurat random variable modeled loosely after
 * http://en.wikipedia.org/wiki/Ziggurat_algorithm using Math.random() as
 * the random number generator.  One "roll" of the dice is used in
 * different ways to prevent overloading the Math object.
 * 
 * The output of the function is stored in the object property: ".points".
 * 
 * Created with a modifiable default structure:
 * 
 * 				-->_____|_____<-- widthA
 * 				 _|     |     |_
 * 			   _|       ^--mean |_
 * 		     _|					  |_
 * 		   _|						|_
 * 		 _|							  |_
 * 	   _|								|_
 *   _| 				    			  |_
 *  |<-------------------widthB------------>|
 *       ALSO: 	numberOfLayers:	number of discrete layers of the ziggurat
 *       		population:		number of data points in the variable (i.e. the size of the array ".points".
 *       
 *  This allows the effective Variance/Standard Deviation of the variable to be controlled,
 *  but without having to construct elaborate and resource-intensive formulaic calculations.
 *  
 *  This "Ziggy" will not be constructed layer-by-layer, but instead be constructed point-by-point,
 *  rolling one Math.random() and basing 3 things off that roll:
 *  	-which layer that data point will be in ("top" layer should get most, other layers should get equal)
 *  	-above/below the 'mean' value (PlusOrMinus)
 *  	-actual value of the data point
 */

Ziggy.prototype.mean = 12;
Ziggy.prototype.widthA = 2;
Ziggy.prototype.widthB = 8;
Ziggy.prototype.numberOfLayers = 8;
Ziggy.prototype.population = 100;
Ziggy.prototype.points = [0];
Ziggy.firstRun = true;

Ziggy.prototype.factors = function(mean, widthA, widthB, numberOfLayers, population){
	
	this.mean = Ziggy.prototype.mean;
	this.widthA = Ziggy.prototype.widthA;
	this.widthB = Ziggy.prototype.widthB;
	this.numberOfLayers = Ziggy.prototype.numberOfLayers;
	this.population = Ziggy.prototype.population;
	this.points = Ziggy.prototype.points;
	
	this.firstRun = true;
};

Ziggy.prototype.buildZiggy = function(mean, widthA, widthB, numberOfLayers, population) {
	this.points = [];
	
	while (this.points.length < this.population) {
		this.newPoint();
	};
//	console.log(this.arrayOfLayers);
//	console.log(this.count);
};
//Ziggy.prototype.arrayOfLayers = [[0], [0], [0], [0], [0], [0], [0], [0], [0]];
//Ziggy.prototype.count = 0;
Ziggy.prototype.newPoint = function(){
	
	//Start with the 'mean' to bias the ziggurat to it
	var newPoint = this.mean;
	
	//Next, we need to roll the dice
	var roll = Math.random();
	//This one roll will be used to determine 3 factors: layer, sign, and the point itself

	//Which 'layer' it will be joining
	var layer = Math.floor(roll*100 % this.numberOfLayers) + 1;
//	
//	switch (layer) {
//	case 1: this.arrayOfLayers[layer].push(roll);break;
//	case 2: this.arrayOfLayers[layer].push(roll);break;
//	case 3: this.arrayOfLayers[layer].push(roll);break;
//	case 4: this.arrayOfLayers[layer].push(roll);break;
//	case 5: this.arrayOfLayers[layer].push(roll);break;
//	case 6: this.arrayOfLayers[layer].push(roll);break;
//	case 7: this.arrayOfLayers[layer].push(roll);break;
//	case 8: this.arrayOfLayers[layer].push(roll);break;
//	};
//	this.count++;
	//this gives us integer 'layers' 1-8 with uniform distribution
	
	//which 'layer' we land on determines how far from the 'mean' the final newPoint might go
	var bottomWidth = Math.max(this.widthA, this.widthB);
	var topWidth = Math.min(this.widthA, this.widthB);
	
	//	var topWidth = Math.min(this.widthA, this.widthB);
	//this gives us a random number between the edges of the 'layer' from our roll
	
//	newPoint = roll*(layer/bottomWidth);
//	newPoint = roll*(layer/this.numberOfLayers)*(bottomWidth);
	var delta = roll*((layer/this.numberOfLayers)*(bottomWidth/2 - topWidth/2) + topWidth/2);
	
	newPoint += delta;
	//multiply by a PlusOrMinus-style multiplier
	newPoint *= roll < 0.5 ? -1:1;
	//50% of the time, this will send newPoint to the left of 'mean'
		
	this.points.push(newPoint);
//	this.points.push(roll);
};
