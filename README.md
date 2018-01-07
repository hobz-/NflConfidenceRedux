# THIS IS THE REDUX VERSION OF THE LIVE APP. VISIT [HERE](https://github.com/hobz-/NflConfidencePool) FOR THE BASE REACT APP.

# Overview

This is a tool I developed to help with an in-house NFL pool from a previous
employer. Previously, all selections were done in a spreadsheet, and the league
manager needed to copy and paste the selections into a master spreadsheet, in
order to send out results. With 50+ people participating in the pool, this
seemed like an unfair ask of the manager. So, I put together this app to help
automate the process.

A demo for anyone to use can be found [here](https://nfl-confidence-app.firebaseapp.com/).

# Tools Used

The bulk of the app is built in React, with state management handled by
Redux, and a single scraping script using node. The database and authentication
are all done using firebase. A few packages from npm were used: ReactDropDown,
moment and react-tabs.

# Rules to the Game

For each game of the week, the user selects a winner, straight up (not against
the spread). To make the selections interesting, players wage points on each
game from 1 to N, where N is the amount of games in the week. The most games in
a week is 16 games (as there are 32 teams), but due to teams having bye weeks,
there is often less in a given week.

You are only allowed to use each number between 1 and N once (each wager needs
to be unique for per unique game). Once the result of the game is known, if you
were correct in your pick, you are awarded the points you waged on the game.

Therefore, it makes the most sense to bid the most points on the game you are
most confident in (whoever is playing the Browns), and the least amount of
points in games you are unsure about (close matches). Total points are tallied
at the end of the week, and the week winner wins back their entry fee.

At the end of the year, the overall winner wins the majority of the prize pool.

# File Structure:

```
public
└── index.html              #Html markup for rendering js scripts
src
├── Actions
│   ├── AuthActions.js      #Action file for user authentication
│   ├── GamesActions.js     #Action file for fetching games from firebase db
│   ├── PicksActions.js     #Action file for fetching / changing picks
│   └── ResultsACtion.js    #Action file for fetching weekly results from firebase
├── Components
│   ├── GameCard.js         #Card for an individual game on pick page
│   ├── GamesContainer.js   #Container for individual games on pick page
│   ├── LoginForm.js        #Login inputs
│   ├── PickTracker.js      #Component to track (un)used picks in the app
│   ├── ProfilePage.js      #Page to allow user to change profile
│   ├── ResultsPage.js      #Page to show results
│   ├── ResultsTable.css
│   ├── TeamRow.js          #Presentational component for GameCard Rows
│   └── WeeksDropDown.js    #Week selection drop-down component
├── Reducers
│   ├── AuthReducer.js      #Handles user authentication state
│   ├── GamesReducer.js     #Handles weekly game state
│   ├── index.js            #Combines reducers for App
│   ├── NumsUsedReducer.js  #Reduces pick values to numsUsed state
│   ├── PicksReducer.js     #Handles weekly pick updating and fetching
│   ├── ResultsReducer.js   #Handles weekly results in state
│   ├── UsersReducer.css    #Fetches nicknames for all users for the state
│   └── WeekReducer.js      #Reducer for week drop-down component
└── Scripts
    └── scraper.js          #scraper to pull games and results to db
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
└── registerServiceWorker.js
```
