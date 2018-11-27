// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4qgKjBbbDGPY9A_fqzW0wwhZZTxlEqcY",
    authDomain: "timesheet-4deba.firebaseapp.com",
    databaseURL: "https://timesheet-4deba.firebaseio.com",
    projectId: "timesheet-4deba",
    storageBucket: "timesheet-4deba.appspot.com",
    messagingSenderId: "571309180176"
};
firebase.initializeApp(config);

//   creating an instance of firebase
var database = firebase.database();

// render function to show all trains in tabe
function render(arr) {
    $("#displayTable").empty()
    for (var i = 0; i < arr.length; i++) {
        var newtr = $("<tr>");
        newtr.append(`<td>${arr[i].tname}</td>`);
        newtr.append(`<td>${arr[i].tdes}</td>`);
        newtr.append(`<td>${arr[i].tfreq}</td>`);
        newtr.append(`<td>${arr[i].tnext}</td>`);
        newtr.append(`<td>${arr[i].taway}</td>`);
        newtr.append('<td><button>remove</button><button>update</button></td>')
        $("#displayTable").append(newtr);
    }
}

// on submit get data from user and store in database 
$(document).on("click", "#subbtn", function (event) {
    event.preventDefault();
    $(".alert").empty();

    // validity check on user input
    if ($("#nameInput").val().trim().length > 0) {
        var name = $("#nameInput").val().trim()
    } else {
        $("#nameA").text('Train Name is required');
        var name = false;
    }
    if ($("#cityInput").val().trim().length > 0) {
        var city = $("#cityInput").val().trim()
    } else {
        $("#cityA").text('Train Name is required');
        var city = false;
    }
    if (($("#firstInput").val().trim().length > 0) && (moment($("#firstInput").val().trim(), 'HHmm', true).isValid())) {
        var first = $("#firstInput").val().trim()
    } else {
        $("#firstA").text('Time in military format is required');
        var first = false;
    }
    if ($("#freqInput").val().trim().length > 0) {
        var freq = parseInt($("#freqInput").val().trim())
    } else {
        $("#freqA").text('Frequency in minutes format is required');
        var freq = false;
    }

    // constract the data about the train
    if (name !== false && city !== false && first !== false && freq !== false) {
        $("input").val(null);
        database.ref().push({
            name: name,
            destination: city,
            firstArrive: first,
            frequency: freq
        })
    }

    // on childadded event clear the table and render it again
    // for each
    // function to calculations time
   function callcuteArriveTime (first,freq){
    var firstMoment = moment(first, "HHmm");
    var firstTimeConverted = firstMoment.subtract(1, "years");
    console.log(firstTimeConverted)
    var diffTime = moment().diff(firstTimeConverted, "minutes");
    var tRemainder = diffTime % freq;
    var tMinutesTillTrain = freq - tRemainder;
    var NextArrival = moment().add(tMinutesTillTrain, "minutes");
    var ArrTime = moment(NextArrival).format("hh:mm");
    return { minAway : tMinutesTillTrain, nextArrive : ArrTime}
   }
    console.log(callcuteArriveTime("0936",10).minAway)

})




  // on remove btn remove from database and render the table again 

  // on update data removes from database, fill the form with previour data, render table again
