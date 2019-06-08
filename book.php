<!-- 
    Student Name: Frankie Zheng
    Student ID: 15895990
    book.php file, a server-side program that insert booking information
    to the selected database.
-->

<?php
  include 'connectDB.php';

  if (isset($_POST['name'])&&isset($_POST['number'])&&isset($_POST['street'])&&isset($_POST['suburb'])
  &&isset($_POST['time'])&&isset($_POST['destination'])&&isset($_POST['pickDate'])) {
      $name = $_POST['name'];
      $number = $_POST['number'];
      $street = $_POST['street'];
      $suburb = $_POST['suburb'];
      $time = $_POST['time'];
      $dest = $_POST['destination'];
      $pickdate = $_POST['pickDate'];
      $unit =$_POST['unit'];

      //check whether unit was input, if so, add unit into pickup.
      if($unit!=NULL) {
          $pickup=$unit."/".$street.", ".$suburb;
      }else {
          $pickup=$street.", ".$suburb;
      }

      /*random generate unique booking reference number from
      0-9 and A-Z by shuffling it randomly*/
      $permitted_char = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $booking_id = substr(str_shuffle($permitted_char), 0, 6);
      $conn = OpenCon();

      //pre-check if the booking_id is unique.
      $checkId = "SELECT * FROM BOOKING WHERE BOOKING_ID = '$booking_id'";
      $result = $conn->query($checkId);
      
      //if booking_id already in database, re-assign new one
      if ($result!==FALSE) {
          $booking_id = substr(str_shuffle($permitted_char), 0, 6);
      }

      $pickuptime = $pickdate." ".$time.":00";
      $currentTime = date("Y-m-d H:i:s");

      //Check if the table exists in database
      $exist = $conn->query("SELECT 1 FROM BOOKING");
      if ($exist!==false) {
      } else {
          $sql_create = "CREATE TABLE BOOKING (BOOKING_ID
                        VARCHAR(20) PRIMARY KEY, CUSTOMER_NAME
                        VARCHAR(50), PHONE_NUMBER INT, PICK_UP_ADDRESS
                        VARCHAR(100), PICK_UP_TIME DATETIME, DESTINATION
                        VARCHAR(100), ASSIGN_STATUS VARCHAR(20), BOOKING_TIME DATETIME)";
          $conn->query($sql_create);
      }

      //Pick-up time validation, return error message
      if ($pickuptime>$currentTime) {
          sleep(1);
          $sql = "INSERT INTO BOOKING VALUES ('$booking_id', '$name','$number',
                  '$pickup','$pickuptime','$dest', 'Unassigned', '$currentTime')";
          if ($conn->query($sql)===true) {
              echo "<p>Thank you! You booking reference number is <strong style='color:red'>".$booking_id."</strong></p>";
              echo "<p>You will be picked up in front of your provided address at <strong>".
              $time."</strong> on <strong>".$pickdate."</strong></p>";
          } else {
              echo "Error: ".$sql."<br>".$conn->error;
          }
      } else {
          sleep(1);
          echo "<p>Invalid time input, please check!</p>";
      }
      closeCon($conn);
  }
