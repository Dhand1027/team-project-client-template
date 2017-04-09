import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var Jeeves = null;

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users": {
    // For now, we'll use the user code the workshops to emulate the user's personal info.
    // "Folder" corresponds to "feed" from the workshop code here as we are aiming to create different folder views.

      // This user has id "1".
      "1": {
        "_id": 1,
        "fullName": "Someone",
        "Masterfolder": 1
      },
      "2": {
        "_id": 2,
        "fullName": "Someone Else",
        "Masterfolder": 2
      },
      "3": {
        "_id": 3,
        "fullName": "Another Person",
        "Masterfolder": 3
      },
      // This is "you"!
      "4": {
        "_id": 4,
        "fullName": "Jeeves User",
        // ID of your feed.
        "Masterfolder": {
          "file1":{
            "title": "To Do List",
            "type": "file",
            "content":"Homework",
            "postDate":  1453690800000
          },
          "folder":{
            "title": "Gym Routines",
            "type": "folder",
            "contents":[
              {
              "title": "Leg day",
              "type": "file",
              "content":"Workout",
              "postDate":  1453690800000
              }
            ],
            "postDate":  1453690800000
          },
          "folder":{
            "title": "Shopping List",
            "type": "folder",
            "contents":[
              {
              "title":"Leg day",
              "type": "file",
              "content":"Workout",
              "postDate":  1453690800000
              }
            ],
          "following":{
            "type":"otherList",
            "list":[2,3]
          }
        }
      }
    }
};

var data = JSON.parse(localStorage.getItem(Jeeves));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(Jeeves, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(Jeeves, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
