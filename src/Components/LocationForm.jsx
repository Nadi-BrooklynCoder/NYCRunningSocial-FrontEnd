import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function LocationForm({ locationDetails, handleSubmit, toggleView, children }) {
  let { id } = useParams();

  const [location, setLocation] = useState({
    location: "",
    address: "",
    user_id: id,
  });

  const handleTextChange = (event) => {
    setLocation({ ...location, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    if (locationDetails) {
      setLocation(locationDetails);
    }
  }, [id, locationDetails]);

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(location, id);
    if (locationDetails) {
      toggleView();
    }
    setLocation({
      location: "",
      address: "",
      user_id: id,
    });
  };

  return (
    <div className="Edit">
      {children}
      <form onSubmit={onSubmit}>
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          value={location.location}
          type="text"
          onChange={handleTextChange}
          placeholder="Location"
          required
        />
        <label htmlFor="address">Address:</label>
        <input
          id="address"
          type="text"
          required
          value={location.address}
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default LocationForm;
