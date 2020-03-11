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
  var now = moment();
  console.log(now.format("HH:mm"));

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
        var time = moment(time).add(freq, "m");
      } else {
        arrivalTimeUnformatted = time;
        minuteAway = arrivalTimeUnformatted.diff(now, "m");
      }
    }

    console.log(moment(arrivalTimeUnformatted).format("HH:mm"));
    console.log(minuteAway);

    arrivalTime = moment(arrivalTimeUnformatted).format("HH:mm");

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
