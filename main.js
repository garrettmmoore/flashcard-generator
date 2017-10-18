//Installing npm packages
var inquirer = require('inquirer');

// Requiring BasicCard and ClozeCard modules from basicCard.js and clozeCard.js
var BasicCard = require("./basicCard.js");
var ClozeCard = require("./clozeCard.js");

//initialize new instances of constructors
var createBasic = new BasicCard();
var createCloze = new ClozeCard();

inquirer.prompt([{
        type: "checkbox",
        name: "Initialize",
        message: "Hello, would you like to make five Basic or five Cloze FlashCards?",
        choices: ["Basic", "Cloze"]
    }, ])
    .then(function (answers) {
        // Use user feedback for... whatever!!
        if (answers.Initialize == "Basic") {
            createBasic.callCard();
        } else {
            // createCloze.newUserSearch(userName, userLocation);
            createCloze.callCard();
        }
    });