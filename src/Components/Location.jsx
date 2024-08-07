function Location({ location, handleDelete }) {
    return (
      <div className="Location">
        <h4>{location.location}</h4>
        <h5>{location.address}</h5>
        <button onClick={() => handleDelete(location.id, location.user_id)}>Delete</button>
      </div>
    );
  }
  
  export default Location;
  