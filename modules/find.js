//function to search an employee returns false or an array of days and hours
function find(file,employee){
    //array when the user is found will contain the file lines where the name appears
    var employeerecord=[];
    //array that will contain all the days to be paid
    var days2pay = [];
    //array that will contain each day of the array empfound by spliting it
    var days = [];
    //the file array conformed by the file breaklines, the array is iterated and it push into the return array the elements of the employee
    file.forEach(element => {
        if(element.split('=')[0]===employee){
            employeerecord.push(element)
        }
    });
    //if the returning array with the information it will be returned
    //else returns false
    if (employeerecord.length!==0){
        //splits the name and days to fill the days2pay which is an array of strings like 'SU20:00-21:00'
        employeerecord.forEach( element => {
            days = element.split('=')[1];
            days = days.split(',');
            days2pay.push(...days);
        });
        //set the result with the array that contains the employee information
        //returns the array
        return days2pay;
    //returns false
    } else return false;
}

module.exports = find;