import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postTask } from '../redux/slices/taskSlice';
import { getState } from '../redux/slices/authSlice';


const TodoCreate = () => {

  const [desc, setDesc] = useState('');

  const {connectedUser: {_id}} = useSelector(getState)

  const dispatch = useDispatch()

  const handleCreateTodo = (e) => {
    e.preventDefault();
    let titre = desc
    setDesc('');
    if (_id) {
      dispatch(postTask({description: titre.trim(), owner: _id}))
    }
  };
  
  return (
    <form onSubmit={handleCreateTodo} className="mt-7 flex items-center gap-4 overflow-hidden rounded-md bg-white p-4 transition-all duration-700 dark:bg-slate-800"
    >
      <span className="inline-block h-5 w-5 rounded-full border-2 transition-all duration-700 dark:border-slate-600"></span>
      <input
        type="text"
        className="w-full text-gray-500 outline-none transition-all duration-700 placeholder:text-gray-400 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500"
        placeholder="Create a new task..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
    </form>
  );
};

export default TodoCreate;
