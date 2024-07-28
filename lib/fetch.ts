import axios from "axios";

export const fetchStarts = async () => {
  try {
    const fetchStats = await axios.get(
      "http://localhost:3000/api/dashboard/stats"
    );
    // console.log(fetchStats.data);

    const stats = fetchStats.data;

    return stats;
  } catch (error) {
    console.error("Error fetching dashboard stats", error);
    return null;
  }
};
