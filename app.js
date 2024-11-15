const prompt = require('prompt-sync')();

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI);
// console.log('!!!!!!');


const CRM = require('./models/CRM.js')


// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}. `);


// empty customer object to create a new customer
const crmData = {
    name: null,
    age: 0
};

let custID = '';

// this should prompt and fill in the sting for the name variable
const name = () => {
    const custName = prompt('What is their name? ')
    crmData.name = custName
    // const name = custname
}
//this should do the same for the age
const age = () => {
    const custAge = prompt('What is their Age? ')
    crmData.age = custAge
}

//logs the and updates the customer ID
const ID = () => {
    const IDprompt = prompt('Please copy and enter Customer ID ')
    custID = IDprompt;

}


//conncts to the mongoDB
const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
}

// creates new customer
const createCust = async () => {
    
    //should enable and create ne data on mongodb
            
    try {
        await CRM.create(crmData)
        console.log(crmData); 
        // };
        
        // await runQueries();
        
        mainMenu();
    }
    catch (error){
        console.log('Error')
        mainMenu()
    }
}
             
//customer lookup
const custLookUp = async () => {
    const customers = await CRM.find();
    console.log(customers)
    mainMenu()
    
}

//customer update
const custUpdate = async () => {

    try{
        const update = await CRM.findByIdAndUpdate(
            custID,
            {name: crmData.name, age: crmData.age},
            {new: true}
        );

        await update.save();

        console.log('Customer info updated');
        
        mainMenu()
    } catch (error){
        console.log("Customer not found")

        mainMenu()
    }

}

//confirm changes option
const confirmUp = () => {

    console.log(crmData);
    const confirmPrompt = prompt('Confirm changes? y/n ')

        if (confirmPrompt === 'y'){
            custUpdate()
        } 
        else if (confirmPrompt === 'n'){
            name()
            age()
            confirmUp()        
        } else {
            confirmUp()
        }

}


//customer delete
 const custDelete = async () =>{

    try{
        const lookup = await CRM.findById(custID) 

        console.log(lookup); //display object
        confirmDel()
        mainMenu()
        
    } catch(error){
        console.log('Customer not found');

        mainMenu() 
    }      
 }

 //confrim delete
 const confirmDel = () => {
    const deletePrompt = prompt ('Are you sure you want to delete? y/n ')

    if (deletePrompt === 'y'){
        
        const DEL = async () => {
        const removed =await CRM.findByIdAndDelete(custID)
        console.log('Deleted: ', removed)
        }

        DEL()

    }
    else if (deletePrompt === 'n'){
        mainMenu()
    } else {
        confirmDel()
    }
}
                          
// app disconnect
const discon = async () => {
    
    //disconnects from Mongo DB
    await mongoose.disconnect();
    console.log('Disconnecting from MongoDB')
    
    //exits app
    process.exit()
    
}
                
const mainMenu = () => {
    connect()
    console.log('Welcome to the CRM \n\n What would you like to do? \n\n 1. Create a Customer \n 2. View all customers \n 3. Update a customer \n 4. Delete a customer\n 5. Quit \n');
    const menuOpt = prompt('Number of action to run: ')

        // new customer
        if(menuOpt == 1){
            name();
            age();
            createCust()
            // mainMenu();
        }
        // customer look up
        else if (menuOpt == 2){
            custLookUp()

        }
        //update customer
        else if (menuOpt == 3){
            ID()
            name()
            age()
            confirmUp()

        }
        //delete customer
        else if (menuOpt == 4){
            ID()
            custDelete()

        }
        //app disconnect
        else if (menuOpt == 5){

            discon()

    }
}


mainMenu()



///===== move to global scope =====

// // empty customer object to create a new customer
// const crmData = {
    //     name: null,
    //     age: 0
    // };
    
// // this should prompt and fill in the sting for the name variable
// const name = () => {
    //     const custName = prompt('What is their name? ')
    //     crmData.name = `${custName}`
    //     // const name = custname
    // }
    // //this should do the same for the age
    // const age = () => {
    //     const custAge = prompt('What is their Age? ')
    //     crmData.age = custAge
    // }
    
// calles the name and age functions
// name();
// age();
    