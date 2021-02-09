//requires node js file system module
const fs = require('fs');
//requires node js module readline for user input
const readline = require('readline');

//import the find and payment functions for employee search and to show the amount to be paid
const find = require('../modules/find');
const payment = require('../modules/payment');

//function to read the file send the file as an array on the getpayment function
function getFile(filedir){
  //fs method to read the specified file
  fs.readFile(filedir, 'utf8', (err,data) => {
    //the read line interface will be used if the file has errors or if the method readFiles throws an error
    const rl =readline.createInterface({
      input:process.stdin,
      output:process.stdout,
      terminal:false
    });
    //if there's an error it logs it on console and terminates process
    //else turns file into an array each elemnent is a line of the file
    //calls the function getpayment and sends the obtained array
    if (err) {
      console.log(`\x1b[31mThe file throwed the next error\n${err}\x1b[0m`);
      newfile(rl);
    } else {
      var fileresult = data.split('\r\n');
      //regular expresion to verify if each line has the format;
      //if the file line is blank it will remove it from the array
      //else it will test if the line has the correct format
      //if the format is wrong it throws an exeption else will continue with the process
      let re = /[A-Z]*=(((MO|TU|WE|TH|FR|SA|SU)\d{2}:\d{2}-\d{2}:\d{2}),)*((MO|TU|WE|TH|FR|SA|SU)\d{2}:\d{2}-\d{2}:\d{2}$)/;
      try {
        fileresult.forEach((element,index,fileresult) => {
          if(element===''){
            fileresult.splice(index,1);
          } else if(!re.test(element)){
            throw e;
          }
        });
        getpayment(fileresult)
      } catch (error) {
        //if the file has errors it will ask for a new file
        console.log('\x1b[31mOne of the file lines does not have the format\x1b[0m');
        newfile(rl);
      }
    }
  });
};

//this function interacts with the user and calls the find,payment and newfile functions
function getpayment(fileresult){
  //create instance of readline interface (configuration for readline)
  const rl = readline.createInterface({
      //object with input and output stream
      input: process.stdin,
      output: process.stdout,
      terminal:false
  });
  //asks for the employee name to calculate payment the rl method is used as a promise
  new Promise((resolve)=>{
      rl.question('Please enter employee name or q to exit:\n',(answer)=>{
          resolve(answer.toUpperCase());
      });
  }).then(employee =>{
    //the response is treated as a promise once the user answers the question and the method gives a response
    //the find function is called expecting an array or a false
    var empfound = find(fileresult,employee);
    //if the user input is a name or the letter q then empfound is false
    if(empfound === false){
      //if user input is the letter q then the newfile function is called
      if( employee === 'Q'){
        newfile(rl);
      } else {
        //if the user input is a name that isn't in the file close the interface and give ups on input/output streams
        //prints employee not found and recursively calls getpayment function expecting for a new name or the user quitting
        rl.close();
        console.log('\x1b[31mEmployee not found\n\x1b[0m');
        getpayment(fileresult);
      }
    } else {
      //if the find function returns an array then it prints the employee's name and amount
      //asks if the user want to search another employee on the loaded file by the function newmployee
      console.log(`\x1b[36mThe amount to pay ${employee} is ${payment(empfound)} USD\x1b[0m`);
      newemployee(fileresult,rl)
    }
  });
}

//this functions interacts with the user asking for a new file or terminating the process
function newfile(rl){
  //asks if the user want to search another employee on the loaded file rl method is used as a promise
  new Promise((resolve)=>{
    //sets the new question
    //shows in console
    //waits for the event of new line
    rl.setPrompt('\x1b[36m\nTry with other file? (y/n)\n\x1b[0m');
    rl.prompt();
    rl.on('line',(resp)=>{
      resolve(resp.toUpperCase());
    });
  }).then(resp =>{
    //evaluates the response 
    //if input is yes or y asks for the new file
    if(resp=='Y' || resp=='YES'){
      //asks for the new file rl method is used as a promise
      new Promise((resolve)=>{    
        //sets the new question
        //shows in console
        //waits for the event of new line
        rl.setPrompt('Please insert a file path example:(D:\\user\\docs\\file.txt) if nothing is input it will use default file\n');
        rl.prompt();
        rl.on('line',(newfile)=>{
          resolve(newfile);
        });
      }).then(newfile => {
        //close the interface and give ups on input/output streams
        //evaluates if something was input calls the getfile function with the new file input
        //else uses deafult file
        rl.close();
        if(newfile.length>0 ){
          getFile(newfile);
        } else {
          getFile('./employees.txt');
        }
      });
    //if input is no or n logs Bye and terminates process
    }else if(resp=='N' || resp=='NO'){
      console.log('\x1b[33mBye!\n\x1b[0m');
      process.exit();      
    }else{//any other input
      console.log('\x1b[31mInvalid input\x1b[0m');
      newfile(rl);
    }
  });
}

//this functions interacts with the user asking for a new employee name or a new file 
function newemployee(fileresult,rl){
  //asks if the user want to try other employee name rl method is used as a promise
  new Promise((resolve)=>{
    //sets the new question
    //shows in console
    //waits for the event of new line
    rl.setPrompt('\x1b[36m\nSearch other employee? (y/n)\n\x1b[0m');
    rl.prompt();
    rl.on('line',(response)=>{
      resolve(response.toUpperCase());
    });
  }).then(response =>{
    //evaluates the response 
    //if input is yes or y close the interface and give ups on input/output streams
    //recursively calls getpayment function expecting for a new name or the user quitting 
    if(response ==='Y' || response === 'YES'){
      rl.close();
      getpayment(fileresult);
      //if user input is no or n then the newfile function is called
    } else if(response ==='N' || response === 'NO'){
      newfile(rl);
    }else{
      console.log('\x1b[31mInvalid input\x1b[0m');
      newemployee(fileresult,rl);
    }
  });
}
module.exports = getFile;
