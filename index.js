// Usage:
	// _throttle(function(){},100,this,1,2,3,4);
	// _throttle(function, milliseconds[, bind_this] [, arguments])
function _throttle(f,dt) {
	let lastRunTime, schedule = null, args=[], thisObj=null;
	let argumentsStart = 2;
	// Copy arguments, starting from #3 or #2 (if #2 is not an object)
	// 'arguments' is not an actual array, but an array-like
	// Thus is does not have splice or forEach methods.
	// Using for loop.
	if ( arguments.length>2) {
		if ( typeof arguments[2]==='object' ) {
			thisObj = arguments[2];
			argumentsStart = 3;
		}
		for (let i=argumentsStart;i<arguments.length;i++) args.push(arguments[i]);
	}
	let run = function() {
		lastRunTime = new Date(), schedule = null;
		//f.apply(thisObj,args);j
    let newArguments = Array.prototype.slice.call(arguments);
    f.apply(this||thisObj,newArguments.concat(args));
		lastRunTime = new Date();
	};

	return function() {
		let newDate = new Date();
		if ( !lastRunTime || newDate - lastRunTime >= dt )	{
			run.apply(this,arguments);
		} else if ( !schedule ) {
			schedule = setTimeout(run.bind(this), dt - (newDate - lastRunTime), ...arguments );
		}
	};
}

// Usage:
	// _debounce(function(){},100,this,1,2,3,4);
	// _debounce(function, milliseconds[, bind_this] [, arguments])
function _debounce(f,dt) {
	let schedule, args=[], thisObj=null;
	let argumentsStart = 2;
	// Copy arguments, starting from #3 or #2 (if #2 is not an object)
	// 'arguments' is not an actual array, but an array-like
	// Thus is does not have splice or forEach methods.
	// Using for loop.
	if ( arguments.length>2) {
		if ( typeof arguments[2]==='object' ) {
			thisObj = arguments[2];
			argumentsStart = 3;
		}
		for (let i=argumentsStart;i<arguments.length;i++) args.push(arguments[i]);
	}
	let run = function() {
		schedule = null;	// Nothing is scheduled
		lastRunDate = new Date();
    let newArguments = Array.prototype.slice.call(arguments);
		f.apply(this||thisObj,newArguments.concat(args));
	};
	return function() {
		if ( schedule ) clearTimeout(schedule);
		schedule = setTimeout(run.bind(this),dt, ...arguments);
	};
}

module.exports._throttle = _throttle;
module.exports._debounce = _debounce;
