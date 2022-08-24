import './App.css';
import { useEffect, useState } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ViewListIcon from '@mui/icons-material/ViewList';
import TaskList from './components/TaskList/TaskList';
import { Grid, Box } from '@mui/material';

function App() {
  const [taskID, setTaskID] = useState(0)
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState([])
  const [ongoing, setOngoing] = useState([])
  const [completed, setCompleted] = useState([])
  const [count, setCount] = useState(0)
  let itemsList = []
  let ongoingList = []
  let completedList = []
  let taskNumber

  function handleInput(event){
    let taskInputValue = event.target.value;
    setTaskInput(taskInputValue)
  }

  function handleSubmit(){
    if (taskInput == "" || taskInput == " "){
      return
    } else {
      taskNumber = taskID
      let taskObject = {"ID": taskNumber, "task": taskInput}
      itemsList = [...tasks]
      itemsList.push(taskObject)
      taskNumber += 1
      setTaskID(taskNumber)
      setTasks(itemsList)
      setTaskInput('')
      return
    }
  }
  
  function deleteItem(id, type){
    if (type == "tasks"){
      itemsList = tasks.filter(data => data.ID != id)
      setTasks(itemsList)
    } else if (type == "ongoing") {
      ongoingList = ongoing.filter(data => data.ID != id)
      setOngoing(ongoingList)
    } else {
      completedList = completed.filter(data => data.ID != id)
      setCompleted(completedList)
    }
    console.log(type)
    return
  }

  function moveToOngoing(id){
    let onGoingItem = tasks.filter(data => data.ID == id)[0]
    itemsList = tasks.filter(data => data.ID != id)
    setTasks(itemsList)
    ongoingList = [...ongoing]
    ongoingList.push(onGoingItem)
    setOngoing(ongoingList)
  }

  function markComplete(id, type){
    let completedItem
    if (type == 'tasks'){
      completedItem = tasks.filter(data => data.ID == id)[0]
      itemsList = tasks.filter(data => data.ID != id)
      setTasks(itemsList)
    } else if (type == 'ongoing'){
      completedItem = ongoing.filter(data => data.ID == id)[0]
      ongoingList = ongoing.filter(data => data.ID != id)
      setOngoing(ongoingList)
    }
    completedList = [...completed]
    completedList.push(completedItem)
    setCompleted(completedList)
    return
  }

  function countTasks(){
    var tasksCount = tasks.length + ongoing.length
    setCount(tasksCount)
  }

  useEffect(() => {
    countTasks()
  }, [tasks, ongoing, completed])

  return (
    <>
      {/* Task Header */}
      <Box textAlign="center" className="taskHeader">
        <ViewListIcon fontSize='large'/>
        <h1 className="taskHeaderTitle">Task App</h1>
      </Box>
      {/* Task Input */}
      <Box textAlign="center" className="taskInput">
          <input className="todoInput" value={taskInput} onChange={e => handleInput(e)} placeholder='Add a task' autocomplete='off'></input>
          <button className="todoBtn" onClick={handleSubmit}><AddTaskIcon /></button>
      </Box>
      {/* Task Section */}
      <Grid className="tasksSection" container spacing={4} justifyContent="center" alignItems="center">
        {/* Tasks Section */}
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <TaskList name="Tasks" type="tasks" items={tasks} deleteFunction={deleteItem} ongoingFunction={moveToOngoing} completeFunction={markComplete}/>
        </Grid>
        {/* Ongoing Section */}
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <TaskList name="Ongoing" type="ongoing" items={ongoing} deleteFunction={deleteItem} completeFunction={markComplete}/>
        </Grid>
        {/* Completed Section */}
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <TaskList name="Completed" type="completed" items={completed} deleteFunction={deleteItem}/>
        </Grid>
      </Grid>
      <Box className="taskCount" textAlign="center">
        {count ? <p>You have <br></br><span className="tasksNumber">{count}</span><br></br> tasks left</p> : <p>You don't have any tasks left.<h2 className="zeroTasks">Add something</h2></p>}
      </Box>
    </>
  );
}

export default App;
