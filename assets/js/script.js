
var saveButtons = $(".saveBtn");

// empty array for saved tasks to be added
var tasks = [];


$(function () {
  // shows date and time
  setInterval(function() {
    // grab today's date
    var today = dayjs();
    $('#currentDay').text(today.format('MMM D, YYYY h:mm a'));

    // update view
    updateCurrentTask();
  }, 1000);

  // grab currently saved in local storage
  var allTasks = JSON.parse(localStorage.getItem("tasks"));

  // update page to show saved tasks
  if(allTasks !== null){
    for(let i = 0; i < allTasks.length; i++){
      $("#" + allTasks[i].time).children("textarea").text(allTasks[i].task);
    }
  }

  saveButtons.on("click", function (){
    // save to local storage as array with time saved
    var timeTask = {
      task: $(this).prev().val(),
      time: $(this).parent().attr("id")
    };

    var alreadyThere = false;
    var pastTasks = JSON.parse(localStorage.getItem("tasks"));

    // save previous tasks, so they don't get overridden
    if(JSON.parse(localStorage.getItem("tasks")) !== null){
      tasks = tasks.concat(pastTasks);

    }

    // check if time is already in array
    for(let i = 0; i < tasks.length; i++){
      if(tasks[i].time === timeTask.time){
        alreadyThere = true;

        // replace current task with new one
        tasks.splice(i, 1, timeTask);
      }
    }

    // Add new task to array of all tasks if time was not saved before
    if(!(alreadyThere)){
      tasks.push(timeTask);
    }

    // save to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // reset array, so it doesn't duplicate
    tasks = [];
  })
});

function updateCurrentTask(){
  var hour = dayjs().hour();
  
  $(".time-block").each(function(){
    // replace current time setting
    $(this).removeClass("past");
    $(this).removeClass("present");
    $(this).removeClass("future");

    // present
    if($(this).attr("id").slice(5, 7) == hour){
      $(this).addClass("present");
    }
    // future
    else if($(this).attr("id").slice(5, 7) > hour){
      $(this).addClass("future");
    }
    // past
    else{
      $(this).addClass("past");
    }
  });
}