var inquirer = require('inquirer');
var fs = require("fs");

// Global variables
var count = 0;
var correct = 0;
var wrong = 0;
var total = 0;

// Create BasicCard variables
var BasicCard = function(basicFront, basicBack)
{
    this.basicFront = basicFront;
    this.basicBack = basicBack;
    this.printBasicCards = function() 
    {
        console.log("Question: " + this.basicFront + "\nAnswer: " + this.basicBack + "\n----------");
    };

    // Initializes BasicCard function
    this.callCard = function()
    {
        createBasicCard();
    };

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
                        console.log("\nContent Added!");
                        playBasic();
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

var basicArray = [];
var allCards = [];

var createBasicCard = function() 
{
    // if the length of the basicArray is 4 or higher, no more questions will be asked
    if (basicArray.length < 4) 
    {
      console.log("\nNEW Card!\n");
      inquirer.prompt([
        {
          type:"input",
          name: "basicFront",
          message: "Enter your question for your basic flashcard? "
        }, 
        {
          type:"input",
          name: "basicBack",
          message: "Enter your answer for your basic flashcard: "
        }
      ]).then(function(answers) 
      {
        // runs the constructor and places the new BasicCard object into the variable basic.
        var basicCard = new BasicCard(answers.basicFront, answers.basicBack);
        // adds a basicCard to the basicArray if there are less than 4 basicCard objects in it.
        if (basicArray.length < 4) 
        {
          basicArray.push(JSON.stringify(basicCard, null, 2));
          
          allCards.push(basicCard);
         
          console.log(basicCard.basicFront + " added to the basicArrayFront");
          console.log(basicCard.basicBack + " added to the basicArrayBack");
        }
        else 
        {
          console.log(" You've added too many Flash Cards");
        }
        // runs the createBasicCard function once more
        createBasicCard();
      });
    }
    else 
    {
        // loops through the callCards array and calls printBasicCards() for each object it contains
        console.log("Here are all of your created FlashCards: ")
        for (var i = 0; i < allCards.length; i++) 
        {
            allCards[i].printBasicCards();
        }
        var saveCard = new BasicCard();
        console.log(basicArray);
        saveCard.saveDeck();
    }
};

var playBasic = function()
{
    if (count < allCards.length) 
    {
        console.log("\n----------" + "\nQuestion " + count + ": " + allCards[count].basicFront + "\n----------");
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
            var basicCard = new BasicCard(answers.basicFront, answers.basicBack);
            if(answers.QuizTime === allCards[count].basicBack){
                console.log("\nCORRECT!");
                correct++;
                total++;
                console.log("Correct: " + correct);
                console.log("Wrong:" + wrong);
            }
            else
            {
                console.log("\nSorry, that's not right.");
                console.log("\n----------" + "\nHere is the correct answer:\n" + "\n----------");
                console.log(allCards[count].basicBack);
                wrong++;
                total++;
                console.log("Correct: " + correct);
                console.log("Wrong:" + wrong);
            }
            count++;
            playBasic();
        });      
    }
    else
    {
        console.log("\n----------");
        console.log("\You've finished!\n");
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
        .then(function (answers) 
        {
            if (answers.Initialize == "Yes") 
            {
                count = 0;
                correct = 0;
                wrong = 0;
                total = 0;
                playBasic();
            }
            else 
            {
               console.log("Okay, see you next time!")
            } 
        });
    }   
};

module.exports = BasicCard;