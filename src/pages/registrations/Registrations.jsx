import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle } from 'lucide-react';
import axios from '../../api/axios.config';
import toast from 'react-hot-toast';

export default function Registrations() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['registrations', search],
    queryFn: async () => {
      const res = await axios.get(`/contacts?search=${search}&limit=50`);
      return res.data.data;
    }
  });

  const approveMutation = useMutation({
    mutationFn: (id) => axios.put(`/contacts/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries(['registrations']);
      toast.success('Registration approved & email sent');
    },
    onError: () => toast.error('Failed to approve registration')
  });

  const declineMutation = useMutation({
    mutationFn: (id) => axios.put(`/contacts/${id}/decline`),
    onSuccess: () => {
      queryClient.invalidateQueries(['registrations']);
      toast.success('Registration declined & email sent');
    },
    onError: () => toast.error('Failed to decline registration')
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'new': return 'bg-[#2FA8C7]/20 text-[#135E73]';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'declined': return 'bg-red-100 text-red-700';
      case 'replied': return 'bg-blue-100 text-blue-700';
      case 'archived': return 'bg-gray-200 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2FA8C7]/10 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10">
          <span className="text-[#FEC300] font-bold tracking-widest uppercase text-sm">
            User Management
          </span>
          <h1 className="text-4xl font-light text-[#135E73] mt-3">
            Registration <span className="font-bold">Submissions</span>
          </h1>
          <p className="text-gray-500 mt-4 font-light">
            Review, approve or decline user registrations.
          </p>
        </div>

        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-4 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search registrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2FA8C7] bg-white"
          />
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
          {isLoading && <p className="text-gray-500 animate-pulse">Loading registrations...</p>}
          {error && <p className="text-red-500">Error loading registrations</p>}
          {!isLoading && data?.length === 0 && (
            <div className="text-center py-16 text-gray-400">No registrations found.</div>
          )}

          {!isLoading && data?.length > 0 && (
            <div className="space-y-6">
              {data.map((reg, i) => (
                <motion.div
                  key={reg._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="p-6 rounded-2xl bg-[#FAFAFA] border border-gray-100 hover:shadow-md transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-[#135E73]">{reg.name}</h3>
                        <span className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(reg.status)}`}>
                          {reg.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{reg.subject}</p>
                      <p className="text-xs text-gray-400">{reg.email}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Accept Button */}
                      <button
                        onClick={() => approveMutation.mutate(reg._id)}
                        disabled={reg.status === 'approved' || approveMutation.isLoading}
                        className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <CheckCircle size={16} />
                        Accept
                      </button>

                      {/* Decline Button */}
                      <button
                        onClick={() => declineMutation.mutate(reg._id)}
                        disabled={reg.status === 'declined' || declineMutation.isLoading}
                        className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        <XCircle size={16} />
                        Decline
                      </button>

                      <Link
                        to={`/registrations/${reg._id}`}
                        className="text-[#135E73] font-medium hover:text-[#2FA8C7]"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}