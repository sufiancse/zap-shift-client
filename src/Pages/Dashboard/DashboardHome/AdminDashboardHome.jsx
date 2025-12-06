import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: deliveryStats = [], isLoading } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/parcels/delivery-status/stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const getPieChartData = (data) => {
    return data.map((item) => {
      return { name: item._id, value: item.count };
    });
  };

  return (
    <div>
      <div className="stats shadow">
        {deliveryStats.map((stat) => (
          <div key={stat._id} className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">{stat._id}</div>
            <div className="stat-value">{stat.count}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
        ))}
      </div>

      {/* pi chart */}
      <section className="w-full h-[400px]">
        <PieChart
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "80vh",
            aspectRatio: 2,
          }}
          responsive
        >
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={getPieChartData(deliveryStats)}
            cx="50%"
            cy="100%"
            outerRadius="120%"
            fill="#8884d8"
            label
            isAnimationActive={true}
          />
          <Legend />
          <Tooltip />
        </PieChart>
      </section>
    </div>
  );
};

export default AdminDashboardHome;
