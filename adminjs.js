/*
  Student Name: Frankie Zheng
  Student ID: 15895990
  adminjs.js file, a client-side program that parsing the user-input
  value to selected server-side program, two funtions which is search
  right booking information from database, another is update assign status
  of order regarding on user input's booking reference number.
*/
var xhr = createRequest();

function getSearch(source, divID) {
  if (xhr) {
    var obj = document.getElementById(divID);
    xhr.open("POST", source, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        obj.innerHTML = xhr.responseText;
      }
    }
    xhr.send(null);
    resetTime();
  }
}

function getAssign(source, divID, booking_id) {
  if (xhr) {
    if (!booking_id) {
      document.getElementById(divID).innerHTML = "<p><strong style='color:red'>Error: </strong>Booking reference number needs input!</p>";
    }

    if (!!booking_id) {
      var obj = document.getElementById(divID);
      var requestbody = "bookingRef=" + encodeURIComponent(booking_id);
      xhr.open("POST", source, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          obj.innerHTML = xhr.responseText;
        }
      }
      xhr.send(requestbody);
      document.getElementById("ref").value = "";
      resetTime();
    }
  }
}

//automatically reset time when button ever pressed.
function resetTime() {
  var today = new Date();
  var current = today.toISOString().slice(0, 10);
  if (today.getHours() < 10) {
    var hours = "0" + today.getHours();
  } else {
    var hours = today.getHours();
  }
  if (today.getMinutes() < 10) {
    var mins = "0" + today.getMinutes();
  } else {
    var mins = today.getMinutes();
  }
  var time = hours + ':' + mins;
  document.getElementById("sysTime").innerHTML = current + " " + time;
}

function createRequest() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}