import React, { useEffect, useState } from "react";
import axios from "axios";

const Topbanne = ({setTopbanner}) => {
  const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get/topbanner");
      console.log(response.data) // ✅ change URL if needed
      setTopbanner(response.data);
    //   setLoading(false);
    } catch (err) {
      setError("Something went wrong while fetching movies.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
}
export default Topbanne;