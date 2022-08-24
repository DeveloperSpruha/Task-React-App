import React from 'react'
import TodoItem from '../TodoItem/TodoItem'

const TaskList = (props) => {

  function deleteItem(id, type){
    props.deleteFunction(id, type)
  }

  function moveToOngoing(id){
    props.ongoingFunction(id)
  }

  function markComplete(id, type){
    props.completeFunction(id, type)
  }

  return (
    <div className="taskList">
      <div className="taskListHeader">
        <h1>{props.name}</h1>
      </div>
      <div className="taskListItems">
        {
          props.items ? props.items.map(item => {
            return (<TodoItem todo={item['task']} id={item['ID']} type={props.type} deleteTask={deleteItem} moveItem={moveToOngoing} completeItem={markComplete}/>)
          }) : null
        }
      </div>
    </div>
  )
}

export default TaskList
