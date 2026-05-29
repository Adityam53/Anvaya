import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const chartComponents = {
  bar: Bar,
  line: Line,
  pie: Pie,
  doughnut: Doughnut,
};

const ReusableChart = ({
  type = "bar",
  title = "Chart",
  labels = [],
  datasetLabel = "Dataset",
  data = [],
  height = "300px",
  colors = ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
}) => {
  const ChartComponent = chartComponents[type.toLowerCase()] || Bar;

  const chartData = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: type === "line" ? 2 : 1,
        fill: type === "line" ? false : true,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          padding: 18,

          usePointStyle: true,

          pointStyle: "circle",

          font: {
            size: 12,
            weight: "600",
          },

          color: "#475569",
        },
      },

      title: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#0f172a",

        padding: 12,

        cornerRadius: 12,

        titleFont: {
          size: 13,
          weight: "700",
        },

        bodyFont: {
          size: 12,
        },
      },
    },

    scales:
      type === "pie" || type === "doughnut"
        ? {}
        : {
            x: {
              grid: {
                display: false,
              },

              ticks: {
                color: "#64748b",
                font: {
                  weight: "600",
                },
              },
            },

            y: {
              grid: {
                color: "#eef2f7",
              },

              ticks: {
                color: "#64748b",
                font: {
                  weight: "600",
                },
              },

              border: {
                dash: [4, 4],
              },
            },
          },
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "auto", height }}>
      <ChartComponent data={chartData} options={options} />
    </div>
  );
};

export default ReusableChart;
