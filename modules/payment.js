//import the calculatedayvalue function for day calculus
const calculatedayvalue = require('../modules/calculatedayvalue');

//function that calculates the amount to be paid recieves an array of days and hours
function payment(empfound){
    //will keep track of the amount to be paid
    var amount=0;
    //calls the function to calculate the amount of each day according to the hours worked
    empfound.forEach(element=>{
        amount += calculatedayvalue(element);
    });
    //returns the amount to be paid
    return amount;
}

module.exports =  payment ;