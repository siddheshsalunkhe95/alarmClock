var alarmSound = new Audio();
alarmSound.src = 'alarm_clock.mp3';

// For Playing Alarm.
function checkAlarm() {
    if (localStorage.alarmList) {
        var arr = JSON.parse(localStorage.alarmList);
        var dayOb = {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
        }
        var currentDay = dayOb[new Date().getDay()];
        var currentHours = new Date().getHours();
        var currentMinute = new Date().getMinutes();

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].isActive) {
                if (arr[i].days.indexOf(currentDay) > -1 && arr[i].time.split(':')[0] == currentHours && arr[i].time.split(':')[1] == currentMinute) {

                    alarmSound.play();

                    document.querySelector('#alarmTitle').innerHTML = arr[i].labelName;
                    document.querySelector('.snoozeAlarm').setAttribute('onclick', "snoozeAlarm(" + arr[i].ts + ")");
                    document.querySelector('.stopAlarm').setAttribute('onclick', "stopAlarm(" + arr[i].ts + ")");

                    // Get the modal
                    var modal = document.getElementById("myModal");
                    // Get the <span> element that closes the modal
                    var span = document.getElementsByClassName("close")[0];

                    modal.style.display = "block";
                    span.onclick = function () {
                        modal.style.display = "none";
                    }
                }
            }
        }
    }
}

function stopAlarm(val) {
    var arr = JSON.parse(localStorage.alarmList);
    var ob = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].ts == val) {
            ob = JSON.parse(JSON.stringify(arr[i]));
            arr.splice(i, 1);
            alert("Alarm Stoped Successfully");
        }
    }
    ob.isActive = false;
    arr.push(ob);
    localStorage.alarmList = JSON.stringify(arr);

    alarmSound.pause();
    alarmSound.currentTime = 0;
}

function snoozeAlarm(val) {
    var arr = JSON.parse(localStorage.alarmList);
    var ob = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].ts == val && arr[i].isSnooze) {
            ob = JSON.parse(JSON.stringify(arr[i]));
            arr.splice(i, 1);
            alert("Alarm Stoped Successfully");
        }
    }

    var hrs = parseInt(ob.time.split(':')[0]);
    var min = parseInt(ob.time.split(':')[1]) + parseInt(ob.snoozeTime);
    if (min > 60) {
        hrs = hrs + 1;
        min = min - 60;
    }
    ob.time = ("00" + hrs).slice(-2) + ":" + ("00" + min).slice(-2);
    arr.push(ob);

    localStorage.alarmList = JSON.stringify(arr);

    alarmSound.pause();
    alarmSound.currentTime = 0;
}

// For Checking Which Alarm To Play.  
setInterval(function () {
    checkAlarm();
}, 60000);

checkAlarm();