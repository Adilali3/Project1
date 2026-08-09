import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
  "Not started": "#64748b",
  "In progress": "#eab308",
  "Completed": "#22c55e",
};

function ProgressChart({ skills }) {
  const counts = skills.reduce((acc, skill) => {
    acc[skill.status] = (acc[skill.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(counts).map((status) => ({
    name: status,
    value: counts[status],
  }));

  if (chartData.length === 0) {
    return <p className="text-slate-400 text-sm">No data yet — add some skills first.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {chartData.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ProgressChart;
