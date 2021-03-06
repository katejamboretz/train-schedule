$("document").ready(function() {
  // Initialize Firebase

  var config = {
    apiKey: "enter API key here",
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
  var arrivalTimeUnformatted = "";
  var arrivalTime = "";
  var minuteAway = "";
  var baseName = "";
  var basePlace = "";
  var baseFreq = "";
  var baseArrival = "";
  var baseMinAway = "";
  var now = moment();
  console.log(now.format("HH:mm"));

  // get variables from database

  database
    .ref()
    .orderByChild("dateAdded")
    .on("child_added", function(childSnapshot) {
      console.log("I added a child to the table");
      baseName = childSnapshot.val().trainName;
      basePlace = childSnapshot.val().trainPlace;
      baseFreq = childSnapshot.val().trainFreq;
      baseArrival = childSnapshot.val().trainArrival;
      baseMinAway = childSnapshot.val().trainMinuteAway;

      // Append train data
      $("#table").append(
        "<tr><td>" +
          baseName +
          "</td><td>" +
          basePlace +
          "</td><td>" +
          baseFreq +
          "</td><td>" +
          baseArrival +
          "</td><td>" +
          baseMinAway +
          "</td></tr>"
      );
    });

  // Create on click event for submit button

  $("#submit-button").on("click", function() {
    event.preventDefault();
    console.log("I've been clicked!");

    // Add input fields to variables
    name = $("#name").val();
    place = $("#place").val();
    freq = parseInt($("#freq").val());
    time = moment($("#time").val(), "HH:mm");
    now = moment();
    console.log(moment(time).format("HH:mm"));
    console.log(moment(now).format("HH:mm"));

    // Add other variables and calculate where needed
    for (var i = 0; i < 2000; i++) {
      if (
        (moment(time).hours() < moment(now).hours()) |
        (moment(time).minutes() < moment(now).minutes())
      ) {
        var time = moment(time).add(freq, "minute");
      } else {
        arrivalTimeUnformatted = time;
        minuteAway = arrivalTimeUnformatted.diff(now, "minute");
        minuteOther = now.diff(arrivalTimeUnformatted, "minute");
      }
    }

    console.log(
      "Arrival Time: " + moment(arrivalTimeUnformatted).format("HH:mm")
    );
    console.log("Minutes Away: " + minuteAway);
    console.log("Switched Difference: " + minuteOther);

    arrivalTime = moment(arrivalTimeUnformatted).format("HH:mm");

    // Add in variables to database
    database.ref().push({
      trainName: name,
      trainPlace: place,
      trainFreq: freq,
      trainArrival: arrivalTime,
      trainMinuteAway: minuteAway
    });
  });
});
