<!-- 
    Student Name: Frankie Zheng
    Student ID: 15895990
    request.php file, a server-side program that retrived booking information
    from the selected database and display it as a table with time limit restriction.
-->

<?php
    include './connectDB.php';
    $conn = OpenCon();
    $abc = true;
    //current time validation
    $current = date("Y-m-d H:i:s");
    $sql = "SELECT * FROM BOOKING WHERE ASSIGN_STATUS = 'unassigned' ORDER BY PICK_UP_TIME";
    if($conn->query($sql)===FALSE) {
        echo "<p>Database not found in system.</p>";
    }
    else {
        sleep(1);
        $result = $conn->query($sql);
        $abb = true;
        if($result->num_rows>0) {
            while($row = $result->fetch_assoc()) {
                /*Convert two string into time variables. Calculate the difference*/
                $bookingTime = $row['PICK_UP_TIME'];
                $bookingTimeTemp = strtotime($bookingTime);
                $currentTemp = strtotime($current);
                $difference = $bookingTimeTemp-$currentTemp;
                if($difference<=7200 && $difference>0) {
                    $abb=false;
                    if($abc)
                    {
                        echo "<table class='content-table'>";
                        echo "<tr>
                        <th>Booking Reference</th>
                        <th>Customer Name</th>
                        <th>Contact</th>
                        <th>Pick-up</th>
                        <th>Destination</th>
                        <th>DateTime</th>
                        <th>Status</th></tr>";
                        $abc = false;
                    }
                    echo "<tr><td>".$row["BOOKING_ID"]."</td>";
                    echo "<td>".$row["CUSTOMER_NAME"]."</td>";
                    echo "<td>".$row["PHONE_NUMBER"]."</td>";
                    echo "<td>".$row["PICK_UP_ADDRESS"]."</td>";
                    echo "<td>".$row["DESTINATION"]."</td>";
                    echo "<td>".$row["PICK_UP_TIME"]."</td>";
                    echo "<td>".$row["ASSIGN_STATUS"]."</td></tr>";
                }
            }

            echo "</table>";
        }
        if($abb) {
            echo "<p>No available booking found at the moment!</p>";
        }
    }

    CloseCon($conn);





?>