/*
  Student Name: Frankie Zheng
  Student ID: 15895990
  bookingjs.js file, a client-side program that parsing user-input values
  into selected server-side program in order to generate new booking confirmation
  to the database. A function also included to reset every input field when booking
  confirmation is validated.
*/
var xhr = createRequest();

function makeBook(source, divID, cus_name, pNumber, unit, street, suburb, pickupTime, pickupDate, destination) {
  if (xhr) {
    //user-input phone number validation, required numbers only
    var numberPattern = isNaN(pNumber);
    //user-input unit number validation, required alphabet and numbers only
    var unitPattern = document.getElementById("unit").getAttribute("pattern");
    var re = new RegExp(unitPattern);
    var unitValidation = re.test(unit);
    //user-input suburb name validation, required alphabet only.
    var suburbPattern = document.getElementById("suburb").getAttribute("pattern");
    var re1 = new RegExp(suburbPattern);
    var suburbValidation = re1.test(suburb);

    //validation all required filed is been input,
    //return error message if not.
    if(!cus_name) {
      document.getElementById(divID).innerHTML = "<p><strong style='color:red'>Error: </strong>Customer Name needs input!<p>";
    }
    else if (!pNumber) {
      document.getElementById(divID).innerHTML = "<p><strong style='color:red'>Error: </strong>Phone Number needs input!<p>";
    }
    else if (numberPattern) {
      document.getElementById(divID).innerHTML = "<p><strong style='color:red'>Error: </strong>Phone Number is with wrong pattern, it should only contain numbers, such as '021333444555'<p>";
    }
    else if (!street) {
      document.getElementById(divID).innerHTML = "<p><strong style='color:red'>Error: </strong>Pick-up Street needs input!<p>";
    }
    else if (!suburb) {
      document.getElementById(divID).innerHTML = "<p><strong style='color:red'>Error: </strong>Pick-up Suburb needs input!<p>";
    }
    else if(!suburbValidation) {
      document.getElementById(divID).innerHTML = "<p><strong style='color:red'>Error: </strong>Suburb is with wrong pattern, it should only contain alphabet letters, such as 'Auckland'<p>";
    }
    else if(!pickupTime||!pickupDate) {
      document.getElementById(divID).innerHTML = "<p><strong style='color:red'>Error: </strong>Pick-up Date/Time needs input!<p>";
    }
    else if(!destination) {
      document.getElementById(divID).innerHTML = "<p><strong style='color:red'>Error: </strong>Destination Address needs input!<p>";
    }
    else if(!unit) {
      unitValidation = true;
    }
    else if(!unitValidation) {
      document.getElementById(divID).innerHTML = "<p><strong style='color:red'>Error: </strong>Unit is with wrong pattern, it should only contain alphaset letters and numbers, such as '1A' or 'A' or '1'<p>";
    }

    //pre-check whether required field is been input
    //taking customer name, phone number, street, suburb, time, date and destination.
    if (!!cus_name && !!pNumber && !!street && !!suburb && !!pickupTime && !!pickupDate && !!destination &&!numberPattern &&unitValidation &&suburbValidation) {
      var obj = document.getElementById(divID);
      var requestbody = "name=" + encodeURIComponent(cus_name) + "&number=" + encodeURIComponent(pNumber) +
        "&unit="+encodeURIComponent(unit) +"&street=" + encodeURIComponent(street) + 
        "&suburb=" + encodeURIComponent(suburb) + "&time=" + encodeURIComponent(pickupTime) + 
        "&pickDate=" + encodeURIComponent(pickupDate) +"&destination=" + encodeURIComponent(destination);
      xhr.open("POST", source, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          obj.innerHTML = xhr.responseText;
        }
      }
      xhr.send(requestbody);
      resetInputs();
    }
  }
}

// Input fields reset function
function resetInputs() {
  document.getElementsByName("cus_name")[0].value="";
  document.getElementsByName("pNumber")[0].value="";
  document.getElementsByName("street")[0].value="";
  document.getElementsByName("suburb")[0].value="";
  document.getElementsByName("pickupDate")[0].value="";
  document.getElementsByName("pickupTime")[0].value="";
  document.getElementsByName("destination")[0].value="";
  document.getElementsByName("unit")[0].value="";
  
  //Reset input datetime then assign it back in order to maintain the origin page.
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
  document.getElementById("thepickupDate").value = current;
  document.getElementById("thepickupTime").value = time;
}

function createRequest() {
  var xhr = false;
  if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
  }
  else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}
