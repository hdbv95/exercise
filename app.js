//requires node js module readline for user input
const readline = require('readline');

//import the getfile function for the start of the process
const getFile = require('./modules/readfile.js');

//create instance of readline interface (configuration for readline)
const rl = readline.createInterface({
    //object with input and output streams, terminal to avoid dups on terminals as user writes
    input : process.stdin,
    output : process.stdout,
    terminal : false
})

//readline method prints an output waits for user input
rl.question('Please insert a file path example:(D:\\user\\docs\\file.txt) if nothing is input it will use default file\n',(answer)=>{
    //if user doesn't makes an input it will use the default file
    if(answer.length>0 ){
        getFile(answer);
    } else getFile('./employees.txt');
    //close the interface and give ups on input/output streams
    rl.close();
});