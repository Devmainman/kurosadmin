import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axios from '../../api/axios.config';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle } from 'lucide-react';

export default function RegistrationDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['registration', id],
    queryFn: async () => {
      const res = await axios.get(`/contacts/${id}`);
      return res.data.data;
    }
  });

  const approveMutation = useMutation({
    mutationFn: () => axios.put(`/contacts/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries(['registration', id]);
      queryClient.invalidateQueries(['registrations']);
      toast.success('Registration approved & email sent');
    },
    onError: () => toast.error('Failed to approve')
  });

  const declineMutation = useMutation({
    mutationFn: () => axios.put(`/contacts/${id}/decline`),
    onSuccess: () => {
      queryClient.invalidateQueries(['registration', id]);
      queryClient.invalidateQueries(['registrations']);
      toast.success('Registration declined & email sent');
    },
    onError: () => toast.error('Failed to decline')
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading registration</p>;

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#135E73]">{data.name}</h1>
              <p className="text-gray-500">{data.email}</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-8 text-sm">
              <Badge label={`Status: ${data.status}`} />
              {data.priority && <Badge label={`Priority: ${data.priority}`} />}
              {data.service && <Badge label={`Service: ${data.service}`} />}
            </div>

            <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 mb-8">
              <h2 className="font-semibold text-[#135E73] mb-3">{data.subject}</h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">{data.message}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => approveMutation.mutate()}
                disabled={data.status === 'approved' || approveMutation.isLoading}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 disabled:opacity-50 transition"
              >
                <CheckCircle size={18} />
                Approve Registration
              </button>

              <button
                onClick={() => declineMutation.mutate()}
                disabled={data.status === 'declined' || declineMutation.isLoading}
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 disabled:opacity-50 transition"
              >
                <XCircle size={18} />
                Decline Registration
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Badge({ label }) {
  return <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-600">{label}</span>;
}