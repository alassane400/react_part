import "./home.css";
import data from "../../data/data.json";
import getdate from "../../utils/getDate.js";
import { useEffect, useState } from "react";
import Activities from "../../components/Activities";

const Home = () => {
  const [today, setToday] = useState();
  useEffect(() => {
    setToday(getdate());
  }, []);

  return (
    <div className="home-content">
      <div className="today">
        <p className="today-text">{today}</p>
      </div>
      <div className="home-body">
        {data.categories.map((category) => (
          <Activities key={category.title} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Home;
