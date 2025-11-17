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
  Legend
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
    maintainAspectRatio: false, //
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: title },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "auto", height }}>
      <ChartComponent data={chartData} options={options} />
    </div>
  );
};

export default ReusableChart;
