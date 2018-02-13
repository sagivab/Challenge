const socket = io();

// Connection made
socket.on('connect', function () {
});

// Listner of request number from server
socket.on('updateRequestNumber', function (result) {
    document.getElementById("serverRequest").innerHTML = result;
});

// Listner of multiply result from server
socket.on('multiplyResult', function (result) {
    document.getElementById("multiplyResult").innerHTML = result;
});

// Listner of current time from server
socket.on('getTime', function (result) {
    var timeElement = document.getElementById("time")
    timeElement.innerHTML = result;
});

// Listner of get time clicked
document.getElementById("getTimeBtn").addEventListener("click", function () {
    socket.emit("getTimeBtn");
});

// Listner of multiply clicked
document.getElementById("multiBtn").addEventListener("click", function () {
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    var parsedNum1 = parseInt(num1);
    var parsedNum2 = parseInt(num2);
    if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
        document.getElementById("multiplyResult").innerHTML = "<font style='color: red;'>Something went wrong.</font>"
    } else {
        socket.emit('multiplyNumbers', parsedNum1, parsedNum2);
    }
});
