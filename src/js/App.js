import { useState, useEffect } from "react";
import "../css/App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchJoke = async () => {
    setLoading(true);
    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`);
    const data = await response.json();
    setJoke(data.value);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchJoke();
  };

  const handleClose = () => {
    setSelectedCategory("");
    setJoke("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex justify-center my-4">
          <h1 className="text-4xl font-bold font-mono text-green-600 animate-bounce">
            Chuck Norris Jokes
          </h1>
        </div>
        <div className="my-10 grid gap-4 grid-cols-4 justify-items-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className="shadow-2xl w-60 h-40 bg-white text-darkblue flex items-center justify-center rounded-lg hover:bg-darkblue hover:text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="text-center text-blue-600/100">
                <div className="text-2xl font-bold capitalize">{category}</div>
                <p className="capitalize text-sm">Unlimited Jokes On {category}</p>
              </div>
            </div>
          ))}
        </div>
        {selectedCategory && (
          <div className="popup-container text-white">
            <div className="popup-inner">
              <div className="popup-heading-container">
                <h2 className="popup-heading">{selectedCategory}</h2>
                <span className="popup-close" onClick={handleClose}>X</span>
              </div>
              <div className="popup-joke-container">
                <p className={`popup-joke ${loading ? "loading" : ""}`}>{loading ? "Loading..." : joke}</p>
              </div>
              <button className="popup-button" onClick={fetchJoke}>
                Next Joke
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
