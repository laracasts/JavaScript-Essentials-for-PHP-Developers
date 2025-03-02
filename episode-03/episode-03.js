// Operators

var str1 = 'hello';
var str2 = str1 + ', world'; // hello, world
var str3 = `${str1}, world`; // hello, world

var result1 = 1 + 2 + '2'; // '32'
var result2 = 1 - '2'; // -1

var result3 = 1 < '2'; // true
var result4 = 1 < 'a'; // false
var result5 = 1 > 'a'; // false
var result6 = 1 > ''; // true
var result7 = 1 > []; // true

// falsy
var emptyString = '';
var zero = 0;
var emptyArray = [];
var zeroString = '0';
var nullValue = null;
var undefinedValue = undefined;
var falseValue = false;

var value1 = 1 == '1'; // true
var value2 = 1 === '1'; // false
var value3 = 0 == false; // true
var value4 = 0 === false; // false

var value5 = 1 != '1'; // false
var value6 = 1 !== '1'; // true

var num1 = 1++;
var num2 = 1--;

var array1 = [1,2,3];
var array2 = [...array1, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]

function sum(...args) {
    return args.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4, 5);