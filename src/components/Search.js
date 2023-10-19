import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import useAxiosPrivate from "../axiosConfig";


const Search = () => {
    // const axiosPrivate = useAxiosPrivate();
  const [dogBreeds, setDogBreeds] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [filters, setFilters] = useState({
    breeds: [],
    zipCodes: [],
    ageMin: '',
    ageMax: '',
  });

  useEffect(() => {
     const fetchData = async () => {
    //   try {
    //     const [breedsResponse, locationsResponse] = await Promise.all([
    //     await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {headers: {"withCredentials": true}}),
    //       axios.get('https://frontend-take-home-service.fetch.com/locations'),
          
    //     ]);
    //     console.log(breedsResponse)

    //     setDogBreeds(breedsResponse.data);
    //     setLocations(locationsResponse.data.results);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    const d=await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds');
    console.log("response data",d.data)
     }
     fetchData();

  }, []);

  const handleFiltersChange = (updatedFilters) => {
    setFilters(updatedFilters);
    fetchFilteredDogs(updatedFilters);
  };

  const fetchFilteredDogs = async (filters) => {
    try {
    //   const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', {
        // body: filters.zipCodes.slice(0, 100), // Limit to 100 zip codes
    //   });
    const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', {
        body: filters.zipCodes.slice(0, 100),
      });

      setDogs(response.data);
    } catch (error) {
      console.error('Error fetching filtered dogs:', error);
    }
  };

  const handleBreedFilterChange = (selectedBreeds) => {
    handleFiltersChange({ ...filters, breeds: selectedBreeds });
  };

  const handleLocationFilterChange = (selectedLocations) => {
    const zipCodes = selectedLocations.map((location) => location.zip_code);
    handleFiltersChange({ ...filters, zipCodes });
  };

  const handleAgeFilterChange = (minAge, maxAge) => {
    handleFiltersChange({ ...filters, ageMin: minAge, ageMax: maxAge });
  };

  return (
    <div>
      <BreedFilter breedOptions={dogBreeds} onBreedChange={handleBreedFilterChange} />
      <LocationFilter locationOptions={locations} onLocationChange={handleLocationFilterChange} />
      <AgeFilter onAgeChange={handleAgeFilterChange} />
      <DogList dogs={dogs} />
    </div>
  );
};

const BreedFilter = ({ breedOptions, onBreedChange }) => {
  return (
    <div>
      <label>Breed Filter:</label>
      <select
        multiple
        onChange={(e) => {
          const selectedBreeds = Array.from(e.target.selectedOptions, (option) => option.value);
          onBreedChange(selectedBreeds);
        }}
      >
        {breedOptions.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
    </div>
  );
};

const LocationFilter = ({ locationOptions, onLocationChange }) => {
  return (
    <div>
      <label>Location Filter:</label>
      <select
        multiple
        onChange={(e) => {
          const selectedLocations = Array.from(e.target.selectedOptions, (option) =>
            locationOptions.find((location) => location.zip_code === option.value)
          );
          onLocationChange(selectedLocations);
        }}
      >
        {locationOptions.map((location) => (
          <option key={location.zip_code} value={location.zip_code}>
            {`${location.city}, ${location.state}, ${location.zip_code}`}
          </option>
        ))}
      </select>
    </div>
  );
};

const AgeFilter = ({ onAgeChange }) => {
  let minAgeInput, maxAgeInput;

  return (
    <div>
      <label>Age Filter:</label>
      <input
        type="number"
        placeholder="Min Age"
        ref={(input) => (minAgeInput = input)}
        onChange={() => onAgeChange(minAgeInput.value, maxAgeInput.value)}
      />
      <input
        type="number"
        placeholder="Max Age"
        ref={(input) => (maxAgeInput = input)}
        onChange={() => onAgeChange(minAgeInput.value, maxAgeInput.value)}
      />
    </div>
  );
};

const DogList = ({ dogs }) => {
  return (
    <div>
      <h2>Dogs</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            <img src={dog.img} alt={dog.name} />
            <div>
              <strong>Name:</strong> {dog.name}
            </div>
            <div>
              <strong>Breed:</strong> {dog.breed}
            </div>
            <div>
              <strong>Age:</strong> {dog.age}
            </div>
            <div>
              <strong>Zip Code:</strong> {dog.zip_code}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
