import { deleteManyTask, getCompleted } from '../redux/slices/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';


const TodoComputed = ({ itemsLeft }) => {

  const dispatch = useDispatch()

  const completed_tasks = useSelector(getCompleted)

  const completed_ids = completed_tasks.map((item) => item._id)

  const clearCompletedTodos = () => {
    dispatch(deleteManyTask({ids: [...completed_ids]}))
  };

  return (
    <section className="flex justify-between rounded-b-md bg-white p-4 text-sm transition-all duration-700 dark:bg-slate-800">
      <span className="text-gray-400 transition-all duration-700 dark:text-slate-500">
        {itemsLeft} {itemsLeft > 1 ? 'items' : 'item'} left
      </span>
      <button  onClick={clearCompletedTodos} className="text-gray-400 transition-all duration-700 dark:text-slate-500" >
        Clear Completed
      </button>
    </section>
  );
};

TodoComputed.propTypes = {
  itemsLeft: propTypes.number.isRequired
};

export default TodoComputed;
