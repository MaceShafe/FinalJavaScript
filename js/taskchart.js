const ctx = document.getElementById('taskChart');
Chart.defaults.font.size = 16;

document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('taskChart');
    Chart.defaults.font.size = 16;

    LiveChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                `Not Done (${ToDoCount || 0})`,
                `In Progress (${InProgressCount || 0})`,
                `Done (${DoneCount || 0})`
            ],
            datasets: [{
                data: [ToDoCount || 0, InProgressCount || 0, DoneCount || 0],
                borderWidth: 1
            }]
        },
        options: { //do not remove, these are the only thing that allows it to actually fit
            responsive: true,
            maintainAspectRatio: false 
        }
    });
});




function chartUpdate(taskList) {
  if (!LiveChart) {
      console.error("LiveChart is not initialized yet.");
      return;
  }

  var taskList = JSON.parse(localStorage.getItem("taskList")) || [];

  ToDoCount = taskList.filter(task => task.taskStatus === "Incomplete").length;
  InProgressCount = taskList.filter(task => task.taskStatus === "In-Progress").length;
  DoneCount = taskList.filter(task => task.taskStatus === "Completed").length;

  LiveChart.data.labels = [
      `Incomplete (${ToDoCount})`,
      `In Progress (${InProgressCount})`,
      `Completed (${DoneCount})`
  ];
  LiveChart.data.datasets[0].data = [ToDoCount, InProgressCount, DoneCount];
  LiveChart.update();
}