import Movies from "./movies";
import { useEffect, useState } from "react"; 
import axios from "axios"; 

// The 'Read' functional component
const Read = () => {

  // Declare a state variable to hold the list of movies
  const [movies, setMovies] = useState([]); 

  // useEffect hook to run a side-effect after the component mounts
  useEffect(() => {
    // Make a GET request to the API endpoint to fetch the list of movies
    axios.get('http://localhost:4000/api/movies') 
      .then((response) => { 
        console.log(response.data); 
        setMovies(response.data); 
      })
      .catch((error) => { 
        console.log(error); 
      });
  });

  // Return the JSX to render the component
  return (
    <div>
      <h3>Hello from read component!</h3>
      <Movies myMovies={movies} />
    </div>
  );
}

export default Read;
