const API_KEY = "fb2c6e95";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=Kabir Singh`;

fetch(API_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("API Response:", data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
