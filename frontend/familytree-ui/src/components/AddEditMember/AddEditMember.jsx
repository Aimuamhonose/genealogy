import React, { useState } from 'react';
import { addFamilyMember, editFamilyMember } from '../../services/api';

const AddEditMember = ({ member }) => {
  const [name, setName] = useState(member ? member.name : '');
  const [birthDate, setBirthDate] = useState(member ? member.birthDate : '');
  const [bio, setBio] = useState(member ? member.bio : '');
  const [parentIds, setParentIds] = useState(member ? member.parentIds : []);
  const [childrenIds, setChildrenIds] = useState(member ? member.childrenIds : []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const memberData = { name, birthDate, bio, parentIds, childrenIds };
    if (member) {
      await editFamilyMember(member.id, memberData);
    } else {
      await addFamilyMember(memberData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
      <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
      <button type="submit">{member ? 'Update' : 'Add'} Member</button>
    </form>
  );
};

export default AddEditMember;
