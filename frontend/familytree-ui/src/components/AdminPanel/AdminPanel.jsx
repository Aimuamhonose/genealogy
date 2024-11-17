import React, { useState, useEffect } from 'react';
import { getFamilyMembers, deleteFamilyMember } from '../../services/api';
import AddEditMember from '../AddEditMember/AddEditMember';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    const fetchMembers = async () => {
      const response = await getFamilyMembers();
      setMembers(response.data);
    };
    
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    await deleteFamilyMember(id);
    setMembers(members.filter(member => member.id !== id));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <AddEditMember />
      <ul>
        {members.map(member => (
          <li key={member.id}>
            {member.name} 
            <button onClick={() => handleDelete(member.id)}>Delete</button>
            <Link to={`/edit/${member.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
