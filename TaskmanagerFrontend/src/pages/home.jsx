import {Header, TodoComputed, TodoCreate, TodoFilter, TodoList, Profile_avatar } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTasks, getFilter, getOwnerTasks } from '../redux/slices/taskSlice'; 
import { useEffect } from 'react';
import { getState } from '../redux/slices/authSlice';


const Home = () => {

  const dispatch = useDispatch()

  let tasks = useSelector(selectAllTasks)

  let {connectedUser: {_id}} = useSelector(getState)

  let filter = useSelector(getFilter)
  
  const itemsLeft = tasks.filter((task) => !task.completed).length;

  useEffect(() => {
    dispatch(getOwnerTasks(_id))
  }, []);
  
  const filteredTasks = () => {
    switch (filter) {
      case 'all':  return tasks;
      case 'active': return tasks.filter((task) => !task.completed);
      case 'completed': return tasks.filter((task) => task.completed);
      default:  return tasks;
    }
  };


  return (
    <div className="min-h-screen w-screen flex flex-row bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] bg-contain bg-no-repeat transition-all duration-700 dark:bg-slate-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] md:bg-[url('./assets/images/bg-desktop-light.jpg')] md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]">
      <div className='w-1/4 h-screen'>

      </div>
      <main className="container w-1/2 mx-auto px-6 md:max-w-xl">
        <Header />
        <TodoCreate />
        {itemsLeft > 0 && ( <TodoFilter /> )}
          <TodoList tasks={filteredTasks()} />
        {itemsLeft > 0 && (<TodoComputed itemsLeft={itemsLeft}  />)}
      </main>
      <div className='w-1/4 h-screen  pt-8'>
         <Profile_avatar  />
      </div>
    </div>
  );
};

export default Home;
