//let {_throttle : throttle,  _debounce : debounce} = require('./index');
const le_schedule = require('./index.js');
console.log(le_schedule);
const throttle = le_schedule._throttle;
const debounce = le_schedule._debounce;
const chalk = require('chalk');

function prepend(str,minLength,prefix='0') {
  if ( str === null || typeof str === 'undefined' || typeof str === 'object') return str;//str = '';
  else if ( typeof str !== 'string' ) str = String(str);

  let currentLength = str.length;
  if ( currentLength >= minLength ) return str;
  else return prefix.repeat(minLength-currentLength).concat(str);
}

// Return current time formatted as hh:mm:ss
function timenow() {
	let d = new Date();
	return  prepend(String(d.getHours()),       2) + ':' +
          prepend(String(d.getMinutes()),     2) + ':' +
          prepend(String(d.getSeconds()),     2) + ':' +
          prepend(String(d.getMilliseconds()),3)        ;
}

// Prepent output from console.log with current time
function timelog() {
  let args = [timenow()];
  for (let i=0; i<arguments.length; i++) args.push(arguments[i]);
  console.log.apply(null,args);
}

function tester(f,delaysArray) {
  if ( typeof thisObj !== 'object' ) thisObj = null;
  let test = function() {
    let th = {a:Math.ceil(100*Math.random()),b:Math.ceil(100*Math.random())};
    let arg1 = Math.ceil(100*Math.random()), arg2 = Math.ceil(100*Math.random());
    timelog(`Will try calling the function. (${i} Successful calls so far)`);
    f.bind(th)(arg1,arg2);
  };
  let totalDelay = 0;
  for ( let j=0; j<delaysArray.length; j++ ) {
    totalDelay += delaysArray[j];
    setTimeout(test,totalDelay);
  }
  // if ( delaysArray.length>0 ) {
  //   totalDelay += delaysArray[delaysArray.length-1];
  //   setTimeout(function() {
  //
  //     resolve();
  //   },totalDelay);
  // }
  return new Promise ( (resolve,reject) => {
    setTimeout(resolve,totalDelay+3000,true);
  });
}

let i = 0;
function target(x) {
  timelog(chalk.blue(`Function called ${++i}${i%10===1?'st':i%10===2?'nd':i%10===3?'rd':'th'} time.`),`This is ${JSON.stringify(this)}. Arguments ${JSON.stringify(arguments)}`);
}

console.log(chalk.red.bold('Testing debounce. Debounce set to 1000 ms'));
tester(debounce(target,1000,{a:1,b:2},500,600,700),[100,500,500,1011,600,1100,100,100,500,100,100,500,500])
  .then(ignore => {
    i=0;
    console.log(chalk.red.bold('\n\nNow testing throttle. Throttle set to 1000 ms'));
    return tester(throttle(target,1000,{a:1,b:2},500,600,700),[100,100,100,500,1000,2000,2000,100,500,200,2000]);
  });
