// src/Locations.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Location from "./Location";
import LocationForm from "./LocationForm";

const API = import.meta.env.VITE_API_URL;

function Locations() {
  const [locations, setLocations] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetch(`${API}/users/${id}/locations`)
      .then((response) => response.json())
      .then((response) => {
        setLocations(response.locations);
      });
  }, [id, API]);

  const handleAdd = (newLocation) => {
    fetch(`${API}/users/${id}/locations`, {
      method: "POST",
      body: JSON.stringify(newLocation),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        setLocations([responseJSON, ...locations]);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleDelete = (locationId) => {
    fetch(`${API}/users/${id}/locations/${locationId}`, {
      method: "DELETE",
    })
      .then((res) => {
        const copyLocationsArr = [...locations];
        const indexDeletedLocation = copyLocationsArr.findIndex((location) => {
          return location.id === locationId;
        });
        copyLocationsArr.splice(indexDeletedLocation, 1);
        setLocations(copyLocationsArr);
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="Locations">
      <h2>Locations</h2>
      <LocationForm handleSubmit={handleAdd}>
        <h3>Add a New Location</h3>
      </LocationForm>
      {locations.map((location) => (
        <Location key={location.id} location={location} handleDelete={handleDelete} />
      ))}
    </section>
  );
}

export default Locations;
