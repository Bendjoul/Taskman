// import React, { forwardRef } from 'react';
import { IconCheck, IconCross } from './icons';
import { useDispatch } from 'react-redux';
import { deleteTask, putTask } from '../redux/slices/taskSlice';
import propTypes from 'prop-types';

const TodoListItem =  ({ todo, ...props }) => {

    const { _id: id, description, completed } = todo;

    const dispatch = useDispatch()

    const handdleDelete = () => {
      dispatch(deleteTask(id))
    }
    
  const toggleTodo = (todo) => {
    const toggledTodo = {...todo, completed: !todo.completed}
    dispatch(putTask(toggledTodo))
  };


    return (
      <article
        {...props}
        className="flex gap-4 border-b border-gray-200 p-4 dark:border-slate-500"
      >
        <button
          onClick={() => toggleTodo(todo)} type="button" className={`h-5 w-5 rounded-full ${ completed  ? 
              'flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700'
              : 'inline-block border-2 transition-all duration-700 dark:border-slate-600'
          }`}
        >
          {completed && <IconCheck />}
        </button>
        <p
          className={`grow ${ completed
              ? 'text-gray-300 line-through transition-all duration-700 dark:text-slate-500'
              : 'text-gray-500 transition-all duration-700 dark:text-slate-400'
          }`}
        >
          {description}
        </p>
        <button onClick={handdleDelete}>
          <IconCross />
        </button>
      </article>
    );
  }

TodoListItem.propTypes = {
  todo: propTypes.shape({
    _id: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    completed: propTypes.bool.isRequired,
  }).isRequired,
};

export default TodoListItem;
