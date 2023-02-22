import "./App.css";
import LineChart from "./components/LineChart";
import { useState, useEffect } from "react";
import { Data } from "./utils/Data";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

function App() {
  Chart.register(CategoryScale);
  const [ApiData, setApiData] = useState([]);

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=42d08d24aa2287eeb9badbbd8c4cac72&units=metric`;
    const fetchData = async () => {
      try {
        let response = await fetch(url);
        if (response.status === 200) {
          let data = await response.json();
          setApiData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const tempArray = ApiData?.list.map((data) => data.main.temp.toFixed(2));

  const shortenTempArray = tempArray.slice(0, 5);

  const numberTempArray = shortenTempArray?.map(Number);

  console.log("🚀 ~ file: App.js:33 ~ App ~ numberTempArray:", numberTempArray);

  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri"],
    datasets: [
      {
        label: "Users Gained ",

        data: numberTempArray,

        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="App">
      <LineChart chartData={chartData} />
    </div>
  );
}

export default App;
