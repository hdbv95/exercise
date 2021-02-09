// table of amounts
const table = require('../modules/table');

//calculate daily payment 
function calculatedayvalue(dayvalue){
    var value;
    var amount=0;
    var next=1;
    //day that is requested (dayvalue=MO10:00-12:00)
    var day = dayvalue.substring(0,2);
    
    //starting time in seconds
    var hourinit = parseInt(dayvalue.substring(2,4))*3600;
    var mininit = dayvalue.substring(5,7)*60;
    var init= hourinit+mininit;

    //ending time in seconds
    var hourend = parseInt(dayvalue.substring(8,10))*3600;
    var minend = dayvalue.substring(11)*60;
    var end = hourend+minend;
    //const table asignated to a variable for it use [["00:01-09:00",25],["09:01-18:00",15],["18:01-00:00",20]]
    var element = table[day];

    //loop day options to obtain value of the day 
    for (let i = 0; i < element.length; i++) {
        //set value as the amount of each the interval 
        value = element[i][1];
        //starting time in table of the element
        var thourinit = parseInt(element[i][0].substring(0,2))*3600;
        var tmininit = parseInt(element[i][0].substring(3,5))*60;
        var tinit = thourinit+tmininit;
        //ending time in table of the element
        var thourend = parseInt(element[i][0].substring(6,8))*3600;
        var tminend = parseInt(element[i][0].substring(9))*60;
        var tend = thourend+tminend;
        //verifies if the hours worked are on multiple intervals
        if(tinit <= init && init <= tend && tend < end){
            //the next interval init and end for cases like 'MO08:00-21:01'
            if( typeof(element[i+next]) != 'undefined' ){
                //starting time in table of the element(next)
                var thourinitn= parseInt(element[i+next][0].substring(0,2))*3600;
                var tmininitn = parseInt(element[i+next][0].substring(3,5))*60;
                var tinitn = thourinitn+tmininitn;
                //ending time in table of the element(next)
                var thourendn = parseInt(element[i+next][0].substring(6,8))*3600;
                var tminendn = parseInt(element[i+next][0].substring(9))*60;
                var tendn = thourendn+tminendn;
                //next interval amount
                var valuen = element[i+next][1];
            }
            amount += value*((tend-init)/3600);//first interval value (table interval ending - data init)
            //if the next interval was the last it will set the 0 value to 24hs(in seconds)
            if(tendn===0) tendn=86400;
            if(end <= tendn){//if there was only two intervals
                //adds the amount (the next interval value)*(the data ending time - table init of the based on the interval evaluated)
                amount += valuen*(( end-tinitn )/3600);
                break;
            }else{
                //if the data ending time was on other interval it calculates the next interval 
                //since the ending data time was on later interval it calculates the whole interval value
                amount += valuen*((tendn-tinitn)/3600);//next interval
                while(  tendn <= end ){
                    /**'MO08:00-19:00'= 179.75
                     *  25(1days) + 134.75(9days) + 20(1days)
                     *                     tend
                     * 00:01     [8->ini   09:00
                     * tinin               tendn
                     * 09:01    10->ini]   18:00
                     * tinin               tendn
                     * 18:01    19->end]   00:00
                     **/
                    next++;//increments the next variable
                    //verifies if there is an object next in the array element
                    if( typeof(element[i+next]) != 'undefined'){
                        //starting time in table of the element(next)
                        thourinitn= parseInt(element[i+next][0].substring(0,2))*3600;
                        tmininitn = parseInt(element[i+next][0].substring(3,5))*60;
                        tinitn = thourinitn+tmininitn;
                        //ending time in table of the element(next)
                        thourendn = parseInt(element[i+next][0].substring(6,8))*3600;
                        tminendn = parseInt(element[i+next][0].substring(9))*60;
                        tendn = thourendn+tminendn;
                        //next interval amount
                        valuen = element[i+next][1];
                        //if the next interval was the last it will set the 0 value to 24hs(in seconds)
                        if(tendn===0) tendn=86400;
                        if(end<=tendn){
                            //calculates the amount by value*hours_worked
                            //since the init value was of other interval the value used is the table init based on the interval evaluated
                            //beeing the last interval uses the data end
                            //breaks the  loop since its no longer needed
                            amount += valuen*((end-tinitn)/3600);//last interval
                            break;
                        } else {
                            //calculates the amount by value*hours_worked
                            //since the init value was of other interval the value used is the table init based on the interval evaluated
                            //beeing an intermediate interval it uses the table end of the evaluated interval
                            amount += valuen*((tendn-tinitn)/3600);//next interval
                        }
                    }else break;
                }     

            }           
        }
        //verify if the hours are in the interval
        else if(tinit <= init && end <= tend ){
            //calculates the amount by value*hours_worked
            //breaks the  loop since its no longer needed
            amount+=value*((end-init)/3600);
            break;
        }
        //if the employee worked in the last interval the ending time has to be greater
        //if not it won't fulfill the condition above,
        //so the ending time has to be smaller than 24hs (86400 seconds)
        else if(tend==0){
            if(tinit <= init && end <= 86400){
                amount+=value*((end-init)/3600);
                //breaks the  loop since its no longer needed
                break;
            }
        }
    }
    //returns the day amount
    return amount;
}

module.exports =  calculatedayvalue;