
import React from 'react';
import { Link } from 'react-router-dom';
import { remove,ref } from '@firebase/database';
import { db } from '../../firebase';


const TaskCard = ({ props }) => {
  const { key, title, description, status, user_assigned, deadline, onDelete } = props;

  const handleDelete = () => {
    // Handle deletion
    console.log(`Deleting task with key ${key}`);
    remove(ref(db,`tasks/${key}`));
    onDelete(); // Notify parent component about deletion
  };

  return (
    <div className='card mt-3'>
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>
          <strong>Description:</strong> {description}</p>
        <p className='card-text'>
          <strong>Status:</strong> {status}
        </p>
        <p className='card-text'>
          <strong>Assigned User:</strong> {user_assigned}
        </p>
        <p className='card-text'>
          <strong>Deadline:</strong> {deadline}
        </p>
        <Link to={`/tasks/${key}`} className='btn btn-primary'>
          Update
        </Link>
        <button className='btn btn-danger ms-2' onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;




