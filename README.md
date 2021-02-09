# **Excercise solution**
---
## **Overview**
This Node js project fulfills the requirement of the ACME company to solve the calculation of the payment for the hours worked based on the day of the week and time of day, according to a table.

---
## **Architecture**
The project was done with **Node js** and **Jest** for the tests.
## **Approach and methodology**
### *Approach*
This solution was build by modules, being this modules the functions and the table with the amounts, specified after in this document. 
### *Methodology*
The methodology used in this case was waterfall.
1. Reciving the requirements by email.
2. Analyze the excersice.
3. Develop the solution.
4. Test the solution and develop test module.
5. deliver the solution.
---
## **How it works**
You need at least Node js version 12.18.4.
~~~
node -v
~~~
and npm version 6.14.6.
~~~
npm -v
~~~
Once these are installed you need to run the next command line in orther to run the exercise.
~~~
node app.js
~~~ 
- **Step 1:** While running the console will ask for a file directory such as **C:\\user\\docs\\file.txt** (this file must have the default file format) or just press enter to use the default file which have the following data:
~~~
RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00
ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
DAVID=MO10:00-12:00,TH12:00-14:00,SA20:00-21:00,SU12:00-14:00
SUSANA=MO12:00-15:00,TU10:00-12:00,TH02:00-06:00,WE14:00-18:00,FR20:00-21:00
ANDREA=MO10:00-15:00,TU10:00-12:00,TH02:00-06:00,FR14:00-18:00,SU20:00-21:00
~~~

The amounts to be paid are according the following table which is the file table.js as a constant.

**Monday - Friday**
| HOURS | AMOUNT |
| :--: | :--: |
| 00:01 - 09:00 | 25 USD |
| 09:01 - 18:00 | 15 USD |
|18:01 - 00:00 | 20 USD |

**Saturday and Sunday**
| HOURS | AMOUNT |
| :--: | :--: |
| 00:01 - 09:00 | 30 USD |
| 09:01 - 18:00 | 20 USD |
|18:01 - 00:00 | 25 USD |

- **Step 2:** Once the solution has recieved the file it will ask for a name. If the user inputs a name that isn't in the file it will ask again until it recieves a valid name, or if the user inputs the letter 'q' then the program will ask if you want to try other file. If the user inputs 'y' or 'yes' it will go to **step 1**.

- **Step 3:** If the user inputs a valid name (Rene for example with the deafult data) the solution will calculate the amount to be paid and will print the following message:
~~~
The amount to pay RENE is 215 USD 
~~~
-  **Step 4:** It will ask the user if wants to do the calculations for other employee. If the input is positive it will go to **step 2**.If the input is negative then the solution will ask if you want to try other file. If the user inputs 'y' or 'yes' it will go to **step 1** else it will log 'Bye!' and ends the process.

The solution have the following functions that allows it to work:
### **Function getFile**
***getFile(string)***

The getFile function works as the start of the solution since it will call the various functions that will let the user interact, that's why it doesn't have an output as is.

This function recieves the file directory('./employees.txt' for default) and sends the file as an array on the getpayment function
~~~
input
getFile('./employees.txt'); //default file
getFile('D:\user\docs\file.txt');
~~~

### **Function getpayment**
***getpayment(array[])***

This function is called inside the getFile function and gets as a parameter the file as an array, each element is a line of the file.

The function will ask the user for inputs, such as the employee's name and will call the functions find,payment and newfile. It doesn't have an output either.
~~~
input
getpayment([
    'RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00',
    'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'
])
~~~

### **Function newfile**
***newfile(Readline interface)***

This function is called from the getpayment function and recieves as a parameter a Readline interface (to avoid a new interface creation).

The function will ask if the user wants to try with other file, if so then the getFile function is called else it terminates the program.
~~~
Input
newfile(rl)
~~~

### **Function find**
***find(array[],string)***

This function recieves an array of the lines of the file, and the name of the employee to find.
If the user was found it returns an array of the employee's information.
~~~~
Input 
find(['RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00','ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'],RENE')

Output
['MO10:00-12:00','TU10:00-12:00','TH01:00-03:00','SA14:00-18:00','SU20:00-21:00']
~~~~
If the user isnt in the array it will return false.
~~~
Input 
find(['RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00','ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'],DAVID')

Output
false
~~~
### **Function calculatedayvalue**
***calculatedayvalue(string)***

This function recieves a string corresponding to the date and hours worked for example 'SU20:00-21:00'.

It will calculate the amount to be paid based on the day and hours and the table.
~~~~
Input
calculatedayvalue('SU20:00-21:00')

Output
25
~~~~
If the hours worked on a day are in different intervals it will calculate the value according to each interval and the hours worked for example in the string 'MO08:00-10:00' in the table it will be in two intervals so the output is going to be the amount calculated for 1 hour in the first interval and 59 minutes on the second interval(25 usd for the first and 15 of the other).
~~~
Input
calculatedayvalue('MO08:00-10:00')

Output
39.75
~~~

### **Function payment**
***payment(array [])***

This function recieves an array corresponding to the find fuction output. Then it will use the function calculatedayvalue to get the full amount to pay the employee.
~~~~
Input
calculatedayvalue( ['MO10:00-12:00','TH12:00-14:00','SU20:00-21:00'])

Output
85
~~~~
if the employee has multiple appearances on the file it will calculate both as one.
~~~
Input
calculatedayvalue(['MO10:00-12:00','TH12:00-14:00','SU20:00-21:00','MO10:00-12:00','TH12:00-14:00','SU20:00-21:00'])

Output
170
~~~
---
## **Tests**
To run the tests you have to run the following command lines:
~~~
npm install

npm run test
~~~ 
The first one will install the dependencies for Jest to work, and the second one will run the tests.
### **The solution have the following tests**
#### ***Function find***
Uses ***find_testarray*** constant.
~~~
const find_testarray = [
    'RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00',
    'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'
]
~~~
- Finds Rene on test_array expects specific array.
- Try to find David on test_array expects false.
#### ***Function calculatedayvalue***
Uses ***test_day*** constant.

This test depends on the table, if it changes this tests might fail.
~~~
const test_day = ['SU20:00-21:00', 'TH12:00-14:00','MO08:00-10:00'];
~~~
- Calculates the amount to be paid on SU20:00-21:00 which is (25).
- Calculates the amount to be paid on TH12:00-14:00 which is (30).
- Calculates the amount to be paid on MO08:00-10:00 which is (39.75)
#### ***Function payment***
Uses ***test_empfound_rene*** and ***test_empfound_astrid*** constants.
This test depends on the table, if it changes this tests might fail.
~~~
const test_empfound_rene = ['MO10:00-12:00','TU10:00-12:00','TH01:00-03:00','SA14:00-18:00','SU20:00-21:00']

const test_empfound_astrid = ['MO10:00-12:00','TH12:00-14:00','SU20:00-21:00','MO10:00-12:00','TH12:00-14:00','SU20:00-21:00']
~~~
- Calculates the paymet for Rene expects 215.
- Calculates the paymet for Astrid not expects other value than 170.