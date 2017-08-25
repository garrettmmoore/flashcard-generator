//Installing npm packages
var inquirer = require('inquirer');

// Requiring BasicCard and ClozeCard modules from basicCard.js and clozeCard.js
var BasicCard = require("./basicCard.js");
var ClozeCard = require("./clozeCard.js");

//initialize new instances of constructors
var createBasic = new BasicCard();
var createCloze = new ClozeCard();

inquirer.prompt([
    /* Pass your questions in here */
    {
        type:"checkbox",
        name: "Initialize",
        message: "Hello, do you want to take your FlashCards quiz or create new FlashCards?",
        choices: ["Basic", "Cloze"]
    },
])
.then(function (answers) {
    // Use user feedback for... whatever!!
    if (answers.Initialize == "Basic") {

        createBasic.callCard();
        
        // console.log("basic!!!!")
    }
    else {
        // createCloze.newUserSearch(userName, userLocation);
        console.log("Clozeee!!!")
    } 
});
    
    
    
    
 