const Person = function (firstAndLast) {
    splitname = firstAndLast.split(' ');
    // Only change code below this line
    // Complete the method below and implement the others similarly
    this.getFirstName = function () {
        return this.first;
    };
    this.getLastName = function () {
        return this.last;
    };
    this.getFullName = function () {
        return this.firstAndLast;
    };
    this.setFirstName = function (first) {
        this.first = first;
    };
    this.setLastName = function (last) {
        this.last = last;
    };
    this.setFullName = function (firstAndLast) {
        this.firstAndLast = firstAndLast;
    };


};

const bob = new Person('Bob Ross');
bob.getFullName();