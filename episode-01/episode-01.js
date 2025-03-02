function helloWorld() {
    alert('hello, world');
}

function sum(a, b) {
    return a + b;
}

function divide(a, b) {
    if (b == 0) {
        throw new Error('cannot divide by 0');
    } else {
        return a / b;
    }
}
var globalVar = 'global';
function sayHello(name) {
    var message;
    
    message = 'Hello, ' + name;

    message.toUpperCase();
}
