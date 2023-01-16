const Person = function (firstAndLast) {
    let myName = firstAndLast;

    this.getFirstName = function () {
        return myName.split(" ")[0];
    };

    this.getLastName = function () {
        return myName.split(" ")[1];
    };

    this.getFullName = function () {
        return myName;
    };

    this.setFirstName = function (name) {
        myName = name + " " + myName.split(" ")[1];
    };

    this.setLastName = function (name) {
        myName = myName.split(" ")[0] + " " + name;
    };

    this.setFullName = function (name) {
        myName = name;
    };
};

const bob = new Person("Bob Ross");
console.log(bob.getFullName());