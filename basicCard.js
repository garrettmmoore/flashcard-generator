var inquirer = require('inquirer');
var fs = require("fs");

var BasicCard = function(basicFront, basicBack) 
{
    // console.log("Hello!")
    this.basicFront = basicFront;
    this.basicBack = basicBack;
    this.printBasicCards = function() {
        console.log("Question: " + this.basicFront + "\nAnswer: " + this.basicBack + "\n----------");
      };

    this.callCard = function(){
        console.log("being called")
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
            else{
                console.log("Okay, maybe next time then.");
            }
            
        });
        
    }
}

var basicArray = [];
// var basicArrayBack =[];
var allCards = [];

var createBasicCard = function() {
    // if the length of the team array is 8 or higher, no more questions will be asked
    if (basicArray.length < 4) {
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
      ]).then(function(answers) {
        // runs the constructor and places the new player object into the variable player.
        // turns the offense and defense variables into integers as well with parseInt
        var basicCard = new BasicCard(answers.basicFront, answers.basicBack);
        // adds a player to the starters array if there are less than five player objects in it.
        // otherwise adds the newest player object to the subs array
        if (basicArray.length < 4) {
          basicArray.push(JSON.stringify(basicCard, null, 2));
        //   basicArray.push(JSON.stringify(basicCard.basicFront, null, 2));
        //   basicArray.push(JSON.stringify(basicCard.basicBack, null, 2));
          
          allCards.push(basicCard);
         
          
          console.log(basicCard.basicFront + " added to the basicArrayFront");
          console.log(basicCard.basicBack + " added to the basicArrayBack");
        }
        else {

          console.log(" You've added too many players");
        }

        // runs the createPlayer function once more
        createBasicCard();
      });
    }
    else {
        // console.log(basicArrayFront);
        // console.log(basicArrayBack);
      // loops through the team array and calls printStats() for each object it contains
      for (var i = 0; i < allCards.length; i++) {
        allCards[i].printBasicCards();
      }
    var saveCard = new BasicCard();
      console.log(basicArray);
      saveCard.saveDeck();
    }
  };

// function playBasic(){
//     inquirer.prompt([
//         /* Pass your questions in here */
//         {
//             type:"checkbox",
//             name: "BasicQuiz",
//             message: "Would you like to take you flashcards quiz?",
//             choices: ["Yes", "No"]
//         },
//     ])
//     .then(function (answers) 
//     {
//         // Use user feedback for... whatever!!
//         if (answers.BasicQuiz == "Yes") 
//         {

//             var basicCard = new BasicCard(answers.basicFront, answers.basicBack);

        
//         }     
//               for (var key in basicCard) 
//               {
              
//                 // If the genre matches the key then print that band.
//                 if (key ==  answers.basicBack) 
//                 {
//                   console.log("An answer " + key + " for " + bandList[key] + "is correct!.");
//                 }
//               }
    
           
            

        
//         // else 
//         // {
//         //     // createCloze.newUserSearch(userName, userLocation);
//         //     console.log("Ok, no problem. See you next time.")
//         // } 
//     });
// }

// function playBasic(){
//     inquirer.prompt([
//         /* Pass your questions in here */
//         {
//             type:"checkbox",
//             name: "BasicQuizPrompt",
//             message: "Would you like to take you flashcards quiz?",
//             choices: ["Yes", "No"]
//         },
//     ])
//     .then(function (answers) 
//     {


//     });
// }
var count = 0;
var playBasic = function(){
    
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
            // console.log("Question: " + answers.basicFront);
            if(answers.QuizTime === allCards[count].basicBack){
                console.log("\nCORRECT!");
            }
            else{
                console.log("\nSorry, that's not right.");
            }
            count++;
            playBasic();

        });
        
    }
    else{
        console.log("\You've finished!");
    }
    
    
};






module.exports = BasicCard;