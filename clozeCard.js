var inquirer = require('inquirer');
var fs = require("fs");

// Global variables
var count = 0;
var correct = 0;
var wrong = 0;
var total = 0;

// Create ClozeCard Constructor
var ClozeCard = function(clozeFront, clozeBack) 
{
    this.clozeFront = clozeFront;
    this.clozeBack = clozeBack;
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
        inquirer.prompt([
            {
                type:"input",
                name: "Save",
                message: "Would you like to save your deck?"
            }
        ])
        .then(function (answers) 
        {           
            if(answers.Save == "yes")
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
                        console.log("\nContent Added!");
                        playCloze();
                    }       
                });
            }
            else
            {
                console.log("Okay, maybe next time then.");
            }
        });     
    }
}

var clozeArray = [];
var allCards = [];

var createClozeCard = function() {
    // if the length of the clozeArray array is 4 or higher, no more questions will be asked
    if (clozeArray.length < 4) 
    {
      console.log("\nNEW Card!\n");
      inquirer.prompt([
        {
          type:"input",
          name: "clozeFront",
          message: "Enter your question for your cloze flashcard. Enter '...' where the answer should be inserted:"
        }, 
        {
          type:"input",
          name: "clozeBack",
          message: "Enter your answer for your cloze flashcard: "
        }
      ]).then(function(answers) 
      {
        // runs the constructor and places the new ClozeCard object into the variable clozeCard.
        var clozeCard = new ClozeCard(answers.clozeFront, answers.clozeBack);
        // adds a clozeCard to the starters array if there are less than five player objects in it.
        if (clozeArray.length < 4) 
        {
          clozeArray.push(JSON.stringify(clozeCard, null, 2));
          
          allCards.push(clozeCard);
          
          console.log(clozeCard.clozeFront + " added to the Cloze Flashcard Questions");
          console.log(clozeCard.clozeBack + " added to the Cloze Flashcard Answers");
        }
        else 
        {
          console.log(" You've added too many Flash Cards");
        }

        // runs the createClozeCard function once more to form a loop until clozeArray.length is < 4
        createClozeCard();
      });
    }
    else {
        // console.log(basicArrayFront);
        // console.log(basicArrayBack);
      // loops through the team array and calls printStats() for each object it contains
      for (var i = 0; i < allCards.length; i++) {
        allCards[i].printClozeCards();
      }
    var saveCard = new ClozeCard();
      console.log(clozeArray);
      saveCard.saveDeck();
    }
  };

var playCloze = function(){
    
    if (count < allCards.length) 
    {
        console.log("\n----------" + "\nQuestion " + count + ": " + allCards[count].clozeFront + "\n----------");
    
        inquirer.prompt([
            /* Pass your questions in here */
            {
                type:"input",
                name: "QuizTime",
                message: "Input your answer: ",
                
            },
        ])
        .then(function (answers) 
        {
            var clozeCard = new ClozeCard(answers.clozeFront, answers.clozeBack);
            // console.log("Question: " + answers.basicFront);
            if(answers.QuizTime === allCards[count].clozeBack){
                console.log("\nCORRECT!");
                correct++;
                total++;
                console.log("Correct: " + correct);
                console.log("Wrong:" + wrong);
            }
            else{
                console.log("\nSorry, that's not right.");
                console.log("\n----------" + "\nHere is the correct answer:\n" + "\n----------");
                console.log(allCards[count].clozeBack + " " + allCards[count].clozeFront);
                wrong++;
                total++;
                console.log("\n----------");
                console.log("Correct: " + correct);
                console.log("Wrong:" + wrong);
            }
            count++;
            playCloze();
        });
    }
    else{
        console.log("\n----------");
        console.log("\You've finished!");
        console.log("\nYou scored " + correct + " out of " + total + " questions!\n");
        inquirer.prompt([
            /* Pass your questions in here */
            {
                type:"checkbox",
                name: "Initialize",
                message: "Would you like to play again?",
                choices: ["Yes", "No"]
            },
        ])
        .then(function (answers) {
            // Use user feedback for... whatever!!
            if (answers.Initialize == "Yes") {
                count = 0;
                correct = 0;
                wrong = 0;
                total = 0;
                playCloze();
                
                // console.log("basic!!!!")
            }
            else {
                // createCloze.newUserSearch(userName, userLocation);
               console.log("Okay, see you next time!")
            } 
        });
    }
};


module.exports = ClozeCard;



