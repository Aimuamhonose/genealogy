import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust as needed
});

export const getFamilyMembers = () => api.get('/members');
export const addFamilyMember = (data) => api.post('/members', data);
export const editFamilyMember = (id, data) => api.put(`/members/${id}`, data);
export const deleteFamilyMember = (id) => api.delete(`/members/${id}`);
export const uploadPhoto = (id, formData) => api.post(`/members/${id}/photo`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
