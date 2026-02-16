import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios.config';

export default function Dashboard() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const res = await axios.get('/analytics/dashboard');
      return res.data.data;
    }
  });

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading dashboard</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-sm text-gray-700">Welcome to your dashboard</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Total Contacts</h3>
          <p className="text-2xl font-bold">{data.contacts}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Total Quotes</h3>
          <p className="text-2xl font-bold">{data.quotes}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Subscribers</h3>
          <p className="text-2xl font-bold">{data.subscribers}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Page Views Today</h3>
          <p className="text-2xl font-bold">{data.pageViews.today}</p>
        </div>

      </div>
    </div>
  );
}
