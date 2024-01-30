// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import TaskCard from '../task/TaskCard'
// import { db } from "../../firebase";
// import { child, get, ref } from "@firebase/database";
// import { remove } from '@firebase/database';

// const Home = () => {

//     const [taskList, setTaskList] = useState({
//         "todo" : {},
//         "in_progress": {},
//         "done": {}
//     });

//     const getTaskList =() =>{
//         get(child(ref(db), `tasks`))
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           console.log(snapshot.val());
//           const data =  snapshot.val();
//           const filtered_data = {
//             "todo" : {},
//             "in_progress": {},
//             "done": {}
//           }

//           Object.keys(data).forEach(key =>{
//             const item = data[key];
//             filtered_data[item['status']][key]= item;
//           })

//         //   console.log("-----------------",filtered_data)

//           setTaskList(filtered_data);
//         } else {
//           console.log("No data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     }
//     const handleTaskDelete = (status, key) => {
//       remove(ref(db, `tasks/${key}`));
//       // Re-fetch tasks after deletion
//       getTaskList();
//     };

//     useEffect(() =>{
//         getTaskList();
//     } , [])

//   return (
//     <div>
//         <div className='d-flex mt-2 container'>
//             <div className='col-lg-3 mx-2'>
//                 <div className='bg-primary px-3 py-2'>TODO</div>
//                <div>
//                 {Object.keys(taskList["todo"]).map(key =>{
//                     return <TaskCard key={key} props={{...taskList["todo"][key], key}} 
//                     onDelete={() => handleTaskDelete('todo', key)}></TaskCard>
//                 })}
//                </div>
//             </div>
//             <div className='col-lg-3 mx-2'>
//                 <div className='bg-warning px-3 py-2'>In Progress</div>
//                 <div>
//                 {Object.keys(taskList["in_progress"]).map(key =>{
//                     return <TaskCard key={key} props={{...taskList["in_progress"][key], key}}></TaskCard>
//                 })}
//                 </div>
//             </div>
//             <div className='col-lg-3 mx-2'>
//                 <div className='bg-success text-white px-3 py-2'>DONE</div>
//                 <div>
//                     {Object.keys(taskList["done"]).map(key =>{
//                     return <TaskCard key={key} props={{...taskList["done"][key], key}}></TaskCard>
//                 })}
//                 </div>
//             </div>
//             <div className='col-lg-3 mx-5'>
//                 <Link to={"/task/create"} className=' btn btn-dark text-white px-3 py-2 rounded'>Add Task</Link>

//             </div>
//         </div>
//     </div>
//   )
// }

// export default Home



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../task/TaskCard';
import { db } from '../../firebase';
import { child, get, ref } from '@firebase/database';

const Home = () => {
  const [taskList, setTaskList] = useState({
    todo: {},
    in_progress: {},
    done: {}
  });

  const getTaskList = () => {
    get(child(ref(db), `tasks`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          const filtered_data = {
            todo: {},
            in_progress: {},
            done: {}
          };
  
          Object.keys(data).forEach((key) => {
            const item = data[key];
            const status = item['status'];
  
            // Ensure the status is initialized
            if (!filtered_data[status]) {
              filtered_data[status] = {};
            }
  
            filtered_data[status][key] = item;
          });
  
          setTaskList(filtered_data);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  useEffect(() => {
    getTaskList();
  }, []);

  const handleTaskDelete = (status, key) => {
    // Handle deletion here
    // You can perform any cleanup or re-fetch tasks if needed
    console.log(`Deleting task with key ${key} in status ${status}`);
    getTaskList(); // Re-fetch tasks after deletion
  };

  return (
    <div>
      <div className='d-flex mt-2 container'>
        <div className='col-lg-3 mx-2'>
          <div className='bg-primary px-3 py-2'>TODO</div>
          <div>
            {Object.keys(taskList['todo']).map((key) => {
              return (
                <TaskCard
                  key={key}
                  props={{
                    ...taskList['todo'][key],
                    key: key,
                    onDelete: () => handleTaskDelete('todo', key) // Pass delete callback
                  }}
                ></TaskCard>
              );
            })}
          </div>
        </div>
        <div className='col-lg-3 mx-2'>
          <div className='bg-warning px-3 py-2'>In Progress</div>
          <div>
            {Object.keys(taskList['in_progress']).map((key) => {
              return (
                <TaskCard
                  key={key}
                  props={{
                    ...taskList['in_progress'][key],
                    key: key,
                    onDelete: () => handleTaskDelete('in_progress', key) // Pass delete callback
                  }}
                ></TaskCard>
              );
            })}
          </div>
        </div>
        <div className='col-lg-3 mx-2'>
          <div className='bg-success text-white px-3 py-2'>DONE</div>
          <div>
            {Object.keys(taskList['done']).map((key) => {
              return (
                <TaskCard
                  key={key}
                  props={{
                    ...taskList['done'][key],
                    key: key,
                    onDelete: () => handleTaskDelete('done', key) // Pass delete callback
                  }}
                ></TaskCard>
              );
            })}
          </div>
        </div>
        <div className='col-lg-3 mx-5'>
          <Link to={'/task/create'} className=' btn btn-dark text-white px-3 py-2 rounded'>
            Add Task
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

