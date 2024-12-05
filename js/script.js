let ToDoCount
let InProgressCount
let DoneCount
var LiveChart

const defaultTask = { 
    taskStatus: "Status",
    taskName: "Task",
    taskDetails: "Details",
};

const userTasks = JSON.stringify(defaultTask)
console.log(defaultTask)




//form validation
function validateForm() {
    var taskName = document.getElementById("task_name").value 
    //there is no validation for task status because one is always selected

    if (taskName == "") {
        alert("Please enter an Task Name")
        return false;
    }
    return true
}

//function to show data
function showData() {
    var taskList;
    if (localStorage.getItem("taskList") == null) {
        taskList = [];
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList")) //parses task list into so that it can be shown to the user
    }

    var html = "";
    chartUpdate(taskList);

    taskList.forEach(function (element, index) {
        html += "<tr>";
            html += "<td>" + element.taskStatus + "</td>";
            html += "<td>" + element.taskName + "</td>";
            html += "<td>" + element.taskDescription + "</td>";
            html += '<button onclick="DeleteTask(' + index + ')" class="mb-3 mt-2 btn btn-danger">Delete</button> <button onclick="editTask(' + index + ')"  class=" mb-3 mx-2 mt-2 btn btn-secondary">Edit</button> </td>';
           

        html += "</tr>";


        document.querySelector("#taskTable tbody").innerHTML = html;

        
    })
}
//loads data on page load
document.addEventListener("DOMContentLoaded", () => {
    showData();
});
// add function
function AddTask() {
    if (validateForm() == true) {
        var taskStatus = document.getElementsByName("taskStatus")
        var taskName = document.getElementById("task_name").value
        var taskDescription = document.getElementById("task_description").value

        
        for (i=0; i<taskStatus.length;i++) {
            if (taskStatus[i].checked) taskStatus.value = taskStatus[i].value //turns taskstatus from everything in the radio buttons to just the selected one
        }
        var taskList;
        if (localStorage.getItem("taskList") == null) {
            taskList = [];
        } else {
            taskList = JSON.parse(localStorage.getItem("taskList")) //parses task list into so that object can be added 
        }
        taskList.push({
            taskStatus: taskStatus.value,
            taskName: taskName,
            taskDescription: taskDescription
        });

        localStorage.setItem("taskList", JSON.stringify(taskList)); //adds it to localstorage
        showData();

        document.getElementById("task_name").value = "";
        document.getElementById("task_description").value = "";
        //resets so next input isnt going to be a copy accidentially
    }
}

//delete function
function DeleteTask(index) {
    var taskList;
    if (localStorage.getItem("taskList") == null) {
        taskList = [];
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList")) //parses task list into so that it can be spliced in next code
    }

    taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    showData();

}

//update function
function editTask(index) {
    //hides submit, shows update button
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    topFunction();

    var taskList;
    if (localStorage.getItem("taskList") == null) {
        taskList = [];
    } else {
        taskList = JSON.parse(localStorage.getItem("taskList")) //parses task list into so that object can be added 
    }
    
    console.log(taskList[index].taskStatus)

    if (taskList[index].taskStatus == "Completed") { //this elseif statement checks the boxes of what's selected
        document.getElementById("task_done").checked = true;
    }
     else if (taskList[index].taskStatus == "In-Progress") {
        document.getElementById("task_in_progress").checked = true;
        
    }
     else if (taskList[index].taskStatus == "Incomplete"){
        document.getElementById("task_not_done").checked = true;
    }
    
    document.getElementById("task_name").value = taskList[index].taskName; //inputs name text
    document.getElementById("task_description").value = taskList[index].taskDescription; //inputs description text

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {

            taskList[index].taskName = document.getElementById("task_name").value;
            taskList[index].taskDescription = document.getElementById("task_description").value
            
            var taskStatus = document.getElementsByName("taskStatus")
            console.log(taskStatus.value)
            for (i=0; i<taskStatus.length;i++) {
                if (taskStatus[i].checked) taskStatus.value = taskStatus[i].value //turns taskstatus from everything in the radio buttons to just the selected one
            }
            console.log(taskStatus.value)
            taskList[index].taskStatus = taskStatus.value;

            //saving and showing data

            localStorage.setItem('taskList', JSON.stringify(taskList)); 
            showData();

            //resets inputs to default values

            document.getElementById("task_not_done").checked = true; 
            document.getElementById("task_name").value = "";
            document.getElementById("task_description").value = "";

            //hides update, shows submit button

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";

        }
    }


}

//scroll back to top when edit button clicked
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  


  //PWA stuff
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }