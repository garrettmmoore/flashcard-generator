// NPM Packages
var inquirer = require('inquirer');
var fs = require("fs");

// Global variables
var count = 1;
var correct = 0;
var wrong = 0;
var total = 0;

// Create ClozeCard Constructor
var ClozeCard = function(clozeFront, clozeBack) 
{
    // Create instances of constructor 
    this.clozeFront = clozeFront;
    this.clozeBack = clozeBack;

    // Shows user all recently created flashcards
    this.printClozeCards = function() 
    {
        console.log("Question: " + this.clozeFront + "\nAnswer: " + this.clozeBack + "\n----------");
    };

    // Initializes CreateClozeCard function
    this.callCard = function()
    {
        createClozeCard();
    };

    // Saves and adds deck of card to flashcards.json
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
                var clozeTxt = clozeArray;           
                fs.appendFile("flashcards.json", clozeTxt, function(err) 
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
var clozeArray = [];
var allCards = [];

// Function to prompt user to create flashcards
var createClozeCard = function() 
{
    // if the length of the clozeArray array is 4 or higher, no more questions will be asked
    if (clozeArray.length < 5) 
    {
        console.log("\n---------------" + "\nNew Cloze Card:" + "\n---------------");
        inquirer.prompt([
        {
          type:"input",
          name: "clozeFront",
          message: "Enter your question for your cloze flashcard:"+
          "\nUse '...' where the answer should be inserted." +
          "\nThis should be the first phrase of your question.\n" +
          "(For Example: ... is the President of the United States.)\n"
        }, 
        {
          type:"input",
          name: "clozeBack",
          message: "Enter your answer for your cloze flashcard:\n"
        }
      ]).then(function(answers) 
      {
        // runs the constructor and places the new ClozeCard object into the variable clozeCard.
        var clozeCard = new ClozeCard(answers.clozeFront, answers.clozeBack);

        // adds a clozeCard to the starters array if there are less than 5 objects in it.
        if (clozeArray.length < 5) 
        {
            clozeArray.push(JSON.stringify(clozeCard, null, 2));

            allCards.push(clozeCard);
            console.log("\nSuccess!: " + clozeCard.clozeFront + " added to the Cloze Flashcard Questions");
            console.log("---------");
            console.log("Success!: " + clozeCard.clozeBack + " added to the Cloze Flashcard Answers");
            console.log("---------");
        }
        else 
        {
            console.log(" You've added too many Flash Cards");
        }

            // runs the createClozeCard function once more to form a loop until clozeArray.length is < 5
            createClozeCard();
      });
    }
    else 
    {
        // loops through the allCards array and calls printClozeCards() for each object it contains
        console.log("\n----------------------------------------"+ "\nHere are all of your created FlashCards:");
        console.log("----------------------------------------");

        for (var i = 0; i < allCards.length; i++) 
        {
            allCards[i].printClozeCards();
        }

        var saveCard = new ClozeCard();
        console.log("\n----------------------------------------"+ "\nThese will be added to your JSON file:");
        console.log("----------------------------------------");
        console.log(clozeArray);
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
            playCloze();
        }
        else
        {
            console.log("\nOkay, maybe next time then.\n");
        }           
    });  
}

// Function to loop through user's created cards and quiz the user
var playCloze = function()
{
    if (count <= allCards.length) 
    {
        console.log("\n---------------" + "\nNew Question " + count + ": " + allCards[count-1].clozeFront + "\n---------------");
        inquirer.prompt([
            {
                type:"input",
                name: "QuizTime",
                message: "Input your answer:\n",
                
            }
        ])
        .then(function (answers) 
        {
            var clozeCard = new ClozeCard(answers.clozeFront, answers.clozeBack);
            if(answers.QuizTime === allCards[count-1].clozeBack)
            {
                console.log("\n***************");
                console.log("CORRECT ANSWER!");
                console.log("***************");
                correct++;
                total++;
                console.log("\n------------\n" + "Total Score:" + "\n------------\n");
                console.log("Correct: " + correct);
                console.log("Incorrect:" + wrong);
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
                console.log("Incorrect:" + wrong);
                console.log("\n-----------------------" + "\nThe Correct Answer was:" + "\n-----------------------");
                console.log("\nCorrect Answer: " + allCards[count-1].clozeBack + " " + allCards[count-1].clozeFront);

            }
            count++;
            // Recursive call to loop through all cards stashed in the allCards array
            playCloze();
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
                playCloze();
            }
            else 
            {
               console.log("\nOkay, see you next time!\n")
            } 
        });
    }
};

//export ClozeCard constructor
module.exports = ClozeCard;