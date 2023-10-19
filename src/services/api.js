import axios from 'axios';

const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

const api= axios.create({
    baseURL: API_BASE_URL,
//   headers: { 'Content-Type ': 'application/json','withCredentials': 'true'},
//   withCredentials: true
});

export const fetchDogs = async (breeds, zipCodes, ageMin, ageMax) => {
  try {
    const response = await api.get('/dogs/search', {
      params: { breeds:`${breeds}`, zipCodes:`${zipCodes}`, ageMin:`${ageMin}`, ageMax:`${ageMax}` },
      headers: { 'Content-Type ': 'application/json','withCredentials': 'true'},
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch dogs.');
  }
};

export const fetchDogBreeds = async () => {
  try {
    const response = await api.get('/dogs/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch dog breeds.');
  }
};

export const fetchLocations = async (city, states, geoBoundingBox, size, from) => {
  try {
    const response = await api.post('/locations/search', {
      city,
      states,
      geoBoundingBox,
      size,
      from,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch locations.');
  }
};


