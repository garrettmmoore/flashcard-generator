# Flashcard Generator
### By Garrett Moore

## Application
Hello! Welcome to Flashcard Generator! This is the backend for a basic flashcard application.

The backend will essentially constitute an API that allows users to create two types of flashcards: Basic, and cloze-deleted, each of which corresponds to a different style of flashcard. 

Flashcard Generator is built using node.js.

Node Packages Used: Inquirer, fs

## Installation
1. Download the appropriate npm packages by running npm install.
2. Open up your terminal, move to the correct working directory, and type 'node main.js' in the command line to start the application.

## Flashcard Types
1. Basic:
    1. Basic flashcards, which have a front ("Who was the first president of the United States?"), and a back ("George Washington").
2. Cloze-Deleted:
    1. A cloze deletion is simply a sentence that has had some of its text removed.
    2. Cloze-Deleted flashcards, which present partial text ("... was the first president of the United States."), and the full text when the user requests it ("George Washington was the first president of the United States.").

## Step 1 - Choose Flashcard Type
1. Inquirer will prompt the user to select whether they want to make Basic or Cloze flashcards.
2. Press 'space' to select and use the arrow keys to toggle between the selection choices.

![choose-flashcard](/images/choose-flashcard.png)

## Step 2 - Create Flashcards
1. The user will create 5 flashcards by entering in both a question and an answer when prompted.
2. User will see a "Success!" message displayed in the terminal if both the question and the answer were submitted correctly.

### Example Basic Flashcard
![create-basic](/images/create-basic.png)

### Example Cloze Flashcard
![create-cloze](/images/create-cloze.png)

## Step 3 - Review Flashcards and add to JSON
1. After the user finishes creating all 5 flashcards, a preview of the recently created flashcards will be displayed.
2. If everything is correct, the user selects 'Yes' to save the deck and add the cards to the flashcards.json file.

![review-flashcards](/images/review-flashcards.png)

3. The user will then be notified that the flashcards were successfully added.

## Step 4 - Play Flashcard Deck
1. The user selects whether or not they would like to play their most recently created deck of flashcards.
2. The user will then be shown their flashcard questions starting with the first card that was created.
3. The input for the answer must be typed exactly as it was when the flashcard was initially created. Press 'enter' to submit the answer.
4. If answered correctly, a 'Correct Answer!' message will be displayed along with the total score.

![play-flashcards](/images/play-flashcards.png)

5. After all of the flashcards have been answered, the user will see their final score and will be asked whether or not they would like to play again.

![play-again](/images/play-again.png)

## End
Thank you for using Flashcard Generator! Please contact me directly if you have any questions or suggestions.

https://github.com/garrettmmoore