import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const ChartData = () => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { totalDataChart },
        } = await axios.get(
          "https://api.llama.fi/summary/fees/lyra?dataType=dailyFees"
        );

        const timestamps = totalDataChart.map((entry) => entry[0]);
        const values = totalDataChart.map((entry) => entry[1]);

        const formattedDates = timestamps.map(formatDate);

        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: formattedDates,
            datasets: [
              {
                label: "Values",
                data: values,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
              mode: "index",
              intersect: false,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <canvas id="myChart" height="720"></canvas>
    </div>
  );
};

export default ChartData;
