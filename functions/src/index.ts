/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START imports]
import { getFirestore, Firestore  } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";
import { v5 as uuidv5 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

const short_uuid = require('short-uuid');
// Dependencies for callable functions.
const {onCall, HttpsError} = require("firebase-functions/v2/https");
// const {onCall} = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions/v2");
// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {onDocumentUpdated} = require("firebase-functions/v2/firestore");
// [END imports]

initializeApp();

// [END v2messageFunctionTrigger]
// declare constant value for firestore index
const SET_WON:string = 'setWon';
const SET_LOSE:string = 'setLost';
const GAME_WON:string = 'gameWon';
const GAME_LOSE:string = 'gameLost';
const scores_ref = "scores/sets_data"

exports.calIndividualStat = onDocumentUpdated(scores_ref, async (req:any) => {
  const db: Firestore = getFirestore();
  // Get all sets data and calculate for the winRate and loseRate
  const docRef = db.doc(scores_ref)
  const docSnap = await docRef.get();
  let individualScore: any = {};
  const data = docSnap.data();

  if (data) {
    Object.keys(data).forEach((setID: any) => {
      const set: any = data[setID]
      const updateIndividualScore = (setCount: number) => {
        const playerList = [set.WinnerBH, set.WinnerFH, set.LoserBH, set.LoserFH];
        for (const winner of playerList.slice(0,2)) {
          if (!(winner in individualScore)) {
            individualScore[winner] = {};
            individualScore[winner][SET_WON] = setCount;
            individualScore[winner][SET_LOSE] = 0;
            individualScore[winner][GAME_WON] = set.WinScore;
            individualScore[winner][GAME_LOSE] = set.LoseScore;
          } else if (winner in individualScore) {
            individualScore[winner][SET_WON]+= setCount;
            individualScore[winner][GAME_WON] += set.WinScore;
            individualScore[winner][GAME_LOSE] += set.LoseScore;
          }
        }
        for (const loser of playerList.slice(2,4)) {
          if (!(loser in individualScore)) {
            individualScore[loser] = {};
            individualScore[loser][SET_WON] = 0;
            individualScore[loser][SET_LOSE] = setCount;
            individualScore[loser][GAME_WON] = set.LoseScore;
            individualScore[loser][GAME_LOSE] = set.WinScore;
          } else if (loser in individualScore) {
            individualScore[loser][SET_LOSE]+= setCount;
            individualScore[loser][GAME_WON] += set.LoseScore;
            individualScore[loser][GAME_LOSE] += set.WinScore;
          }
        }
      }
      if (set.WinScore < 6 || (set.WinScore == 6 && set.LoseScore == 5) || set.WinScore === set.LoseScore) {
        updateIndividualScore(0.5);
      } else {
        updateIndividualScore(1);
      }
    })
    db.collection('stats').doc('individual_stat').set({individualScore});
  }
});

exports.calDualStats = onDocumentUpdated(scores_ref, async (req:any) => {
  // Get Database ref
  const db: Firestore = getFirestore();
  const docRef = db.doc(scores_ref)
  const docSnap = await docRef.get();
  // calculate win and lose rate
  // let group: any = new Map();
  let group: any = {};
  // grouping every players
  const data = docSnap.data();
  if (data) {
    Object.keys(data).forEach((setID: any) => {
      const set: any = data[setID]
      // get group
      const currentWinGroup = JSON.stringify([set.WinnerBH, set.WinnerFH].sort()).replace(/'/g, '"');
      const currentLoseGroup = JSON.stringify([set.LoserBH, set.LoserFH].sort()).replace(/'/g, '"');

      const updateScore = (setCount: number) => {
        // initialize set/game score
        if (!(currentWinGroup in group)) {
          group[currentWinGroup] = { setWinRate: 1, setLoseRate: 0, gameWinRate: set.WinScore, gameLoseRate: set.LoseScore};
        } else if (currentWinGroup in group) {
          group[currentWinGroup]['setWinRate']+=setCount;
          group[currentWinGroup]['gameWinRate']+=set.WinScore;
          group[currentWinGroup]['gameLoseRate']+=set.LoseScore;
        } 
        if (!(currentLoseGroup in group)) {
          group[currentLoseGroup] = { setWinRate: 0, setLoseRate: 1, gameWinRate: set.LoseScore, gameLoseRate: set.WinScore};
        } else if (currentLoseGroup in group) {
          group[currentLoseGroup]['setLoseRate']+=setCount;
          group[currentLoseGroup]['gameWinRate']+=set.LoseScore;
          group[currentLoseGroup]['gameLoseRate']+=set.WinScore;
        } 
      }

      function calDualScore() {
        try {
          if (set.WinScore < 6 || (set.WinScore == 6 && set.LoseScore == 5) || set.WinScore === set.LoseScore) {
            updateScore(0.5);
          } else {
            updateScore(1);
          }
        } catch (e) {
          logger.log(`currentLoseGropu : ${currentLoseGroup} , currentWinGroup: ${currentWinGroup}`)
        }
      }
      calDualScore();
    })
    const stats_collections = 'stats'
    const group_collections = 'group_stats'
    db.collection(stats_collections).doc(group_collections).set(group).then( res => {
      // logger.log(res)
    })
  }
});

exports.callStats = onCall( async (request:any) => {
  const db: Firestore = getFirestore();
  const docRef = db.doc('stats/group_stats')
  const docSnap = await docRef.get();
  const data: any = docSnap.data();
  if (!request.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new HttpsError("failed-precondition", "The function must be " +
            "called while authenticated.");
  }
  return (data);
});

exports.callScores = onCall( async (request:any) => {
  const db: Firestore = getFirestore();
  const docRef = db.doc('scores/sets_data')
  const docSnap = await docRef.get();
  const data: any = docSnap.data();
  if (!request.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new HttpsError("failed-precondition", "The function must be " +
            "called while authenticated.");
  }
  return (data);
});

// onDocumentUpdate
  // 1. calStat Individual
  // 2. getAllSets
  // 3. calStat games ?
// Command not found. Use `firebase --help` for a list of commands or
// `firebase <command> --help` for more details

// EDIT: DualGames 
exports.sayHello = onRequest(
  { cors: [/firebase\.com$/, "flutter.com"] },
  async (req: any, res: any) => {
  const db: Firestore = getFirestore();
  const docRef = db.doc('stats/group_stats')
  // get the respective players game 
  let formattedPlayers: string=""; 
  if (typeof req.body.players === 'object') formattedPlayers = JSON.stringify(req.body.players);
  const edited_stat = {
        gameWinRate: req.body.updates.gameWinRate,
        gameLoseRate: req.body.updates.gameLoseRate,
        setWinRate: req.body.updates.setWinRate,
        setLoseRate: req.body.updates.setLoseRate,
  }
  try {
    await docRef.update({
      formattedPlayers: edited_stat
    })
  } catch (error) {
    res.status(400).json({ error: error });
  } finally { 
    res.status(200).json({ message: `Successfully edited group stat ${formattedPlayers} with stats ${edited_stat}`});
  }
}
);

// Demo : Edit Function
exports.edit_gameScores = onCall(
  { cors: [/firebase\.com$/, "flutter.com"] },
  async (req: any) => {
  const db: Firestore = getFirestore();
  const docRef = db.doc('scores/sets_data')
  
  let new_date = new Date();
  if ( typeof req.data.date === 'string' ) {
    new_date = new Date(req.data.date);
  }
  // data to be updated 
  const new_update = { 
      WinnerBH: req.data.winnerBH,
      WinnerFH: req.data.winnerFH,
      LoseScore: req.data.loseScore,
      LoserBH: req.data.loserBH,
      LoserFH: req.data.loserFH,
      Date: new_date,
      WinScore: req.data.winScore,
      Location: req.data.location,
  }

  function isValidIntegerString(str: any) {
    // Check if the string is a valid integer
    const regex = /^-?\d+$/; // Matches optional leading '-' followed by digits
    return regex.test(str);
  }
  
  function safeCastToInteger(str: any) {
    if (isValidIntegerString(str)) {
        // Convert to integer safely
        return parseInt(str, 10); // Base 10
    } else {
        throw new HttpsError('invalid-argument', `Invalid input: "${str}" is not a valid integer.`);
    }
  }

  // convert date to localedate
  const gameID = req.data.gameID
  if (gameID === 'gameID') throw new HttpsError('invalid-argument', 'Invalid gameID provided.');

  // cast new_update LoseScore and WinScore to number
  try {
    new_update.LoseScore = safeCastToInteger(new_update.LoseScore)
    new_update.WinScore = safeCastToInteger(new_update.WinScore)
    docRef.update({
      [gameID]: new_update
    }).then( (result) => {
      console.log(result)
    })
    return { message: `Sccessfully edited game at \n Date : ${req.data.date} \n Game ID : ${req.data.gameID}`, data: req.data }

  } catch (error: any) {
    throw new HttpsError('invalid-argument', error.message);
  } 
}
);

// ADD: add gameScores function
exports.add_gameScores = onCall({ cors: [/firebase\.com$/, "flutter.com"] },
 async (req: any) => {
  /* NOTEs:
      1. Set matchID and gameID UUIDs
      2. Use gameID as index
      3. add docRef  */
      const db: Firestore = getFirestore();
      const docRef = db.doc('scores/sets_data')
      const gameID = short_uuid().fromUUID(uuidv4());
      // Format the date to a string (e.g., "YYYY-MM-DD")
      const formattedDate = req.data.Date.split('T')[0]; // Get the date part
      // Generate a short UUID based on the formatted date
      const matchID = short_uuid().fromUUID(uuidv5(formattedDate, uuidv5.DNS));
      
      typeof req.data.WinScore === 'string' ? req.data.WinScore = parseInt(req.data.WinScore) : ()=>{} ;
      typeof req.data.LoseScore === 'string' ? req.data.LoseScore = parseInt(req.data.LoseScore) : ()=>{} ;

      try { 
        // add and merge new scores to sets_score collections in firestore
        await docRef.set({
          [gameID]: {
            MatchID:     matchID,
            Date:        req.data.Date,
            Location:    req.data.Location,
            LoserBH:     req.data.LoserBH,
            LoserFH:     req.data.LoserFH,
            LoseScore:   req.data.LoseScore,
            WinnerBH:    req.data.WinnerBH,
            WinnerFH:    req.data.WinnerFH,
            WinScore:    req.data.WinScore,
          }
        }, {merge: true });
      } catch (error) {
        return { message: "Unsuccessful", error: error};
      } finally {
        return { message: `Sccessfully edited game at \n Date : ${formattedDate} \n Game ID : ${gameID}`, data: req.data }
      }
    }
);

// some
// python UUID('6cdb2f6d-17b6-512c-82b8-aa7afc7f2f9a')
// JS 6cdb2f6d-17b6-512c-82b8-aa7afc7f2f9a'

// TEST: for onRequest Example for get method using onRequest
// exports.add_gameScore = onRequest(
//   { cors: [/firebase\.com$/, "flutter.com"] },
//   async (req: any, res: any) => {
//   const db: Firestore = getFirestore();
//   const docRef = db.doc('scores/sets_data')
//   const gameID = uuidv4();
//   try {
//     await docRef.set({
//       [gameID]: {
//         Date:        req.body.data.Date,
//         Location:    req.body.data.Location,
//         LoserBH:     req.body.data.LoserBH,
//         LoserFH:     req.body.data.LoserFH,
//         LoseScore:   req.body.data.LoseScore,
//         MatchID:     req.body.data.MatchID,
//         WinnerBH:    req.body.data.WinnerBH,
//         WinnerFH:    req.body.data.WinnerFH,
//         WinScore:    req.body.data.WinScore,
//       }
//     }, {merge: true });
//   } catch (error) {
//     res.status(400).json({ message: "Unsuccessful", error: error})
//   } finally {
//       res.status(200).json({ message: `Sccessfully edited game at \n Date : ${req.body.data.Date} \n Game ID : ${gameID}`, data: req.body.data }) 
//   }
// }
// );
