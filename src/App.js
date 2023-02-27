import "./App.css";
import LineChart from "./components/LineChart";
import { useState, useEffect } from "react";
import { Data } from "./utils/Data";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

function App() {
  const [ApiData, setApiData] = useState([]);
  console.log("🚀 ~ file: App.js:10 ~ App ~ ApiData:", ApiData);
  Chart.register(CategoryScale);

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=42d08d24aa2287eeb9badbbd8c4cac72&units=metric`;
    async function fetchData() {
      try {
        let response = await fetch(url);
        const json = await response.json();
        console.log("🚀 ~ file: App.js:19 ~ fetchData ~ json:", json);

        const tempArray = json.list.map((item) => item.main.temp.toFixed(2));
        const shortenTempArray = tempArray.slice(0, 5);

        setApiData(shortenTempArray);
        console.log(
          "🚀 ~ file: App.js:23 ~ fetchData ~ shortenTempArray:",
          shortenTempArray
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  console.log("🚀 ~ file: App.js:10 ~ App ~ ApiData updated:", ApiData);

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri"],
    datasets: [
      {
        // label: "Users Gained ",

        data: ApiData,

        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };
  console.log("🚀 ~ file: App.js:58 ~ App ~ chartData:", chartData);

  return <div className="App">{<LineChart chartData={chartData} />}</div>;
}

export default App;
