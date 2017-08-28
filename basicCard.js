//NPM Packages
var inquirer = require('inquirer');
var fs = require("fs");

// Global variables
var count = 1;
var correct = 0;
var wrong = 0;
var total = 0;

// Create BasicCard variables
var BasicCard = function(basicFront, basicBack)
{
    // Create instances of constructor 
    this.basicFront = basicFront;
    this.basicBack = basicBack;

    // Shows user all recently created flashcards
    this.printBasicCards = function() 
    {
        console.log("Question: " + this.basicFront + "\nAnswer: " + this.basicBack + "\n----------");
    };

    // Initializes BasicCard function when called from main.js
    this.callCard = function()
    {
        createBasicCard();
    };

    // Prompt user to save deck
    this.saveDeck = function()
    {
        console.log("----------------------------------------\n");
        inquirer.prompt([
            {
                type:"checkbox",
                name: "Save",
                message: "Would you like to save your deck?\n" +
                "(Choose 'Yes' to continue or 'No' to exit the application).",
                choices: ["Yes", "No"]
            }
        ])
        .then(function (answers) 
        {           
            if(answers.Save == "Yes")
            {
                var basicTxt = basicArray;
                // var basicAnsTxt = basicArrayBack;           
                fs.appendFile("flashcards.json", basicTxt, function(err) 
                {          
                    // If an error was experienced we say it.
                    if (err) 
                    {
                        console.log(err);
                    }       
                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else 
                    {
                        console.log("\n--------------\n" + "Content Added!" + "\n--------------\n");
                        initializePlay();
                    }       
                });
            }
            else
            {
                console.log("Okay, maybe next time then.\n");
            }           
        });  
    }
}

// Arrays to hold user question and answer input
var basicArray = [];
var allCards = [];

// Function to prompt user to create flashcards
var createBasicCard = function() 
{
    // if the length of the basicArray is 5 or higher, no more questions will be asked
    if (basicArray.length < 5) 
    {
      console.log("\n---------------" + "\nNew Basic Card:" + "\n---------------");
      inquirer.prompt([
        {
          type:"input",
          name: "basicFront",
          message: "Enter your question for your basic flashcard?\n"
        }, 
        {
          type:"input",
          name: "basicBack",
          message: "Enter your answer for your basic flashcard:\n"
        }
      ]).then(function(answers) 
      {
        // runs the constructor and places the new BasicCard object into the variable basic.
        var basicCard = new BasicCard(answers.basicFront, answers.basicBack);
        // adds a basicCard to the basicArray if there are less than 4 basicCard objects in it.
        if (basicArray.length < 5) 
        {
            basicArray.push(JSON.stringify(basicCard, null, 2));

            allCards.push(basicCard);
            console.log("\nSuccess!: " + basicCard.basicFront + " added to the Basic Card Questions.");
            console.log("---------");
            console.log("Success!: " + basicCard.basicBack + " added to Basic Card Answers.");
            console.log("---------");
        }
        else 
        {
          console.log("You've added too many Flash Cards");
        }
        // Recursive call that runs the createBasicCard again until check statement is met
        createBasicCard();
      });
    }
    else 
    {
        // loops through the allCards array and calls printBasicCards() for each object it contains
        console.log("\n----------------------------------------"+ "\nHere are all of your created FlashCards:");
        console.log("----------------------------------------");
        for (var i = 0; i < allCards.length; i++) 
        {
            allCards[i].printBasicCards();
        }
        var saveCard = new BasicCard();
        console.log("\n----------------------------------------"+ "\nThese will be added to your JSON file:");
        console.log("----------------------------------------");
        console.log(basicArray);
        // Prompt user to save the deck they created
        saveCard.saveDeck();
    }
};

// Function to determine if user wants to play the flashcards they created
var initializePlay = function()
{
    inquirer.prompt([
        {
            type:"checkbox",
            name: "Play",
            message: "Would you like to play your most recent deck?\n" +
            "(Choose 'Yes' to continue or 'No' to exit the application).",
            choices: ["Yes", "No"]
        }
    ])
    .then(function (answers) 
    {          
        if(answers.Play == "Yes")
        {
            playBasic();
        }
        else
        {
            console.log("\nOkay, maybe next time then.\n");
        }           
    });  
}

// Function to loop through user's created cards and quiz the user
var playBasic = function()
{
    if (count <= allCards.length) 
    {
        console.log("\n---------------" + "\nNew Question " + count + ": " + allCards[count-1].basicFront + "\n---------------");
        inquirer.prompt([
        {
            type:"input",
            name: "QuizTime",
            message: "Input your answer:\n",               
        },
        ])
        .then(function (answers) 
        {
            var basicCard = new BasicCard(answers.basicFront, answers.basicBack);
            if(answers.QuizTime === allCards[count-1].basicBack){
                console.log("\n***************");
                console.log("CORRECT ANSWER!");
                console.log("***************");
                correct++;
                total++;
                console.log("\n------------\n" + "Total Score:" + "\n------------\n");
                console.log("Correct: " + correct);
                console.log("Incorrect: " + wrong);
            }
            else
            {
                console.log("\n*****************");
                console.log("INCORRECT ANSWER!");
                console.log("*****************");
                console.log("\n------------\n" +"Total Score:" + "\n------------\n");
                wrong++;
                total++;
                console.log("Correct: " + correct);
                console.log("Incorrect: " + wrong);
                console.log("\n-----------------------" + "\nThe Correct Answer was:" + "\n-----------------------");
                console.log("\nCorrect Answer: " +allCards[count-1].basicBack);

            }
            count++;
            // Recursive call to loop through all cards stashed in the allCards array
            playBasic();
        });      
    }
    else
    {
        console.log("\n----------");
        console.log("You've finished!\n");
        console.log("\nYou scored " + correct + " out of " + total + " questions!\n");
        inquirer.prompt([
            {
                type:"checkbox",
                name: "Initialize",
                message: "Would you like to play again?",
                choices: ["Yes", "No"]
            },
        ])
        .then(function (answers) 
        {
            if (answers.Initialize == "Yes") 
            {
                count = 1;
                correct = 0;
                wrong = 0;
                total = 0;
                playBasic();
            }
            else 
            {
               console.log("\nOkay, see you next time!\n")
            } 
        });
    }   
};

//export BasicCard Constructor
module.exports = BasicCard;