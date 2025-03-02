// Functions

// IIFE
(function() {
    // closure


    alert(sum(1, 2));

    // function expressions
    // anonymous functions
    var diff = function(a, b) {
        return a - b;
    };
    
    var multiply = (a, b) => a * b;
    var divide = (a, b) => {
        if (b === 0) {
            throw new Error('b cannot be 0');
        }
    
        return a / b;
    };
    
    // function declarations
    function doNothing() { // return undefined
    
    }
    
    function sum(a, b) {
        return a + b;
    }
})();


