import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p>{`Choice: ${data.x}`}</p>
        <p>{`Votes: ${data.z}`}</p>
      </div>
    );
  }

  return null;
};

const Chart = ({ round }) => {
  const data = round.choice.map((choice, index) => ({
    x: choice.id,
    y: index + 1,
    z: choice.result,
  }));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <ScatterChart
        width={600}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name="Choice"
          tickFormatter={(value) => `Choice ${value}`}
          ticks={[1, 2, 3]} // Définir les ticks spécifiques
        />
        <YAxis type="number" dataKey="y" hide={true} />
        <ZAxis type="number" dataKey="z" range={[0, 1000]} name="Votes" />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ strokeDasharray: "3 3" }}
        />
        <Legend />
        <Scatter
          name="Votes"
          data={data}
          fill="#8884d8"
          shape="circle"
          radius={(value) => value.z / 3}
        />
      </ScatterChart>
    </div>
  );
};

export default Chart;
