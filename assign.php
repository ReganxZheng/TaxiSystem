<!-- 
    Student Name: Frankie Zheng
    Student ID: 15895990
    assign.php file, a server-side program that interact with the selected
    database in order to update the new assign status regards as the input
    value of booking reference number.
-->
<?php
    include './connectDB.php';
    if(isset($_POST["bookingRef"])){
        $conn = OpenCon();
        $booking_id = $_POST["bookingRef"];
        $precheck = "SELECT * FROM BOOKING WHERE BOOKING_ID = '$booking_id'";
        $preresult = $conn->query($precheck);
        if($preresult->num_rows>0) {
            sleep(1);
            while($row=$preresult->fetch_assoc()) {
                if($row['ASSIGN_STATUS']=='assigned') {
                    echo "<p>Booking reference number <strong style='color:red'>$booking_id</strong>
                    has already been assigned!!!</p>";
                }
                else {
                    $sql = "UPDATE BOOKING SET ASSIGN_STATUS = 'Assigned' WHERE BOOKING_ID ='$booking_id'";
                    $result = $conn->query($sql);
                    if($result) {
                        echo "<p>The booking request <strong style='color:red'>$booking_id </strong>
                        has been properly assigned</p>";
                    }
                    else {
                        echo "<p>Error occurs</p>";
                    }
                }
            }
        }
        else {
            sleep(1);
            echo "<p>Booking Reference not found in database, try again.</p>";
        }
    }




?>