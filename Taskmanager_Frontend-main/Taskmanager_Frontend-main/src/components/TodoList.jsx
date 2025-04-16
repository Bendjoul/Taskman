import TodoListItem from './TodoListItem';
import propTypes from 'prop-types';

const TodoList = ({ tasks }) => {
  return (
        <div  className="mt-4 rounded-t-md bg-white transition-all duration-700 dark:bg-slate-800 overflow-auto h-80" >
          {tasks.map((todo, index) => (  <TodoListItem todo={todo} key={index}/> ))}
        </div>
  );
};

TodoList.propTypes = {
  tasks: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string.isRequired,
      description: propTypes.string.isRequired,
      completed: propTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TodoList;
