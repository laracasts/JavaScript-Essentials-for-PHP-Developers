// Flow Control

// var fruits = ['apple', 'banana', 'orange', 'cherry'];

// for (var fruit of fruits) {
//     console.log(fruit);
// }

var person = {
    firstName: 'John',
    lastName: 'Doe'
};

for (var prop in person) {
    if (prop === 'firstName') {
        continue;
    }

    console.log(`${prop}: ${person[prop]}`);

}

