// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var saveButtons = $(".saveBtn");

// empty array for saved tasks to be added
var tasks = [];


$(function () {
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

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

    // test
    console.log(tasks);

    // save to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  })
});

function updateCurrentTask(){
  var hour = dayjs().hour();

  console.log(hour);
  
  $(".time-block").each(function(){
    // replace current time setting
    $(this).removeClass("past");
    $(this).removeClass("present");
    $(this).removeClass("future");

    // present
    if($(this).attr("id").slice(5, 7) === hour){
      $(this).addClass("present");
    }
    // future
    else if($(this).attr("id").slice(5, 7) >= hour){
      $(this).addClass("future");
    }
    // past
    else{
      $(this).addClass("past");
    }
  });
}