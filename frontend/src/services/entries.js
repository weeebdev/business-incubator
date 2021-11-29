import axios from "axios";

const API = "http://localhost:8080";

const getEntries = () => {
  return axios.get(`${API}/entries`).then((res) => res.data);
};

const getEntryById = (id) => {
  return axios.get(`${API}/entries/${id}`).then((res) => res.data);
};

const createEntry = (entry) => {
  return axios.post(`${API}/entries`, entry).then((res) => res.data);
};

const updateEntry = (entry) => {
  return axios.put(`${API}/entries/${entry.id}`, entry).then((res) => res.data);
};

const deleteEntry = (id) => {
  return axios.delete(`${API}/entries/${id}`).then((res) => res.data);
};

export const entriesService = {
  getEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
};
