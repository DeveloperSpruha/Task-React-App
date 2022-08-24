import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import ForwardIcon from '@mui/icons-material/Forward';


const TodoItem = (props) => {

  function deleteTask(){
    props.deleteTask(props.id, props.type)
  }

  function moveItem(){
    props.moveItem(props.id)
  }

  function completeItem(){
    props.completeItem(props.id, props.type)
  }

  return (
    <div className='TodoItem'>
      <p className="TodoText">{props.todo}</p>
      <div className="todoButtons">
        {props.type == 'tasks' ? <button className="ongoingBTN" onClick={moveItem}><ForwardIcon /></button> : null}
        {props.type == 'ongoing' || props.type == 'tasks' ? <button className="completeBTN" onClick={completeItem}><CheckIcon /></button> : null}
        <button className="deleteBTN" onClick={deleteTask}><DeleteOutlineIcon /></button>
      </div>
    </div>
  )
}

export default TodoItem;