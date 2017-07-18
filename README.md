# le-schedule

### Quick implementation of `throttle()` and `debounce()` functions

## Installation
### npm
`npm intall le-schedule`

### git
`git clone https://github.com/levanroinishvili/le-schedule.git`

## Usage
### CommonJS (including node.js)
1. First, acquire the functions through either
``` JavaScript
let {_throttle : throttle,  _debounce : debounce} = require('le-schedule');
```
or
``` JavaScript
const le_schedule = require('le-schedule');

const throttle = le_schedule._throttle;
const debounce = le_schedule._debounce;
```
2. Then use them like this:

``` JavaScript
debounce(f, dt[, thisObject[, arguments]]);
throttle(f, dt[, thisObject[, arguments]]);
```

### Example
``` JavaScript
let {_throttle : throttle,  _debounce : debounce} = require('le-schedule');

myButton.addEventListener('click',debounce(function(event) { console.log(event);}, 1000));
```
