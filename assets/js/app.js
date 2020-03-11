$("document").ready(function() {
  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyBNlRB712Pb2x1ZviJj-FdyvZFt7nWLkUc",
    authDomain: "educationproject-9a3fa.firebaseapp.com",
    databaseURL: "https://educationproject-9a3fa.firebaseio.com",
    projectId: "educationproject-9a3fa",
    storageBucket: "educationproject-9a3fa.appspot.com",
    messagingSenderId: "872216758789",
    appId: "1:872216758789:web:544fdf17ae583153102a6c",
    measurementId: "G-F0MB698Y2Z"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database

  var database = firebase.database();

  // Initialize variables and values

  var name = "";
  var place = "";
  var time = "";
  var freq = "";
  var arrivalTime = "";
  var minuteAway = "";

  // Create on click event for submit button

  $("#submit-button").on("click", function() {
    event.preventDefault();
    console.log("I've been clicked!");

    // Add input fields to variables
    var name = $("#name").val();
    var place = $("#place").val();
    var freq = $("#freq").val();
    var time = $("#time").val();

    // Add other variables
    var arrivalTime = "calculation in progress";
    var minuteAway = "calculation in progress";

    // Add in variables to database
    database.ref().push({
      trainName: name,
      trainPlace: place,
      trainFreq: freq,
      trainArrival: arrivalTime,
      trainMinuteAway: minuteAway
    });

    // Append train data
    $("#table").append(
      "<tr><td>" +
        name +
        "</td><td>" +
        place +
        "</td><td>" +
        freq +
        "</td><td>" +
        arrivalTime +
        "</td><td>" +
        minuteAway +
        "</td></tr>"
    );
  });
});
