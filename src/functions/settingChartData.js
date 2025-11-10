import { gettingDate } from "./getDate";

export const settingChartData = (setChartData, prices1, prices2) => {
  if (!prices1 || !prices2) return;

  // Process data once instead of multiple map operations
  const processedData = prices1.reduce((acc, curr, index) => {
    const date = gettingDate(curr[0]);
    if (!acc.labels) acc.labels = [];
    if (!acc.data1) acc.data1 = [];
    if (!acc.data2) acc.data2 = [];
    
    acc.labels.push(date);
    acc.data1.push(curr[1]);
    acc.data2.push(prices2[index]?.[1] || null);
    
    return acc;
  }, {});

  const chartData = {
    labels: processedData.labels,
    datasets: [
      {
        label: "Crypto 1",
        data: processedData.data1,
        borderWidth: 1,
        fill: false,
        backgroundColor: "rgba(58, 128, 233,0.1)",
        tension: 0.25,
        borderColor: "#3a80e9",
        pointRadius: 0,
        yAxisID: "crypto1",
      },
      {
        label: "Crypto 2",
        data: processedData.data2,
        borderWidth: 1,
        fill: false,
        tension: 0.25,
        borderColor: "#61c96f",
        pointRadius: 0,
        yAxisID: "crypto2",
      },
    ]
  };
  
  setChartData(chartData);
    });
  } else {
    setChartData({
      labels: prices1?.map((data) => gettingDate(data[0])),
      datasets: [
        {
          data: prices1?.map((data) => data[1]),
          borderWidth: 1,
          fill: true,
          backgroundColor: "rgba(58, 128, 233,0.1)",
          tension: 0.25,
          borderColor: "#3a80e9",
          pointRadius: 0,
          yAxisID: "crypto1",
        },
      ],
    });
  }
};
