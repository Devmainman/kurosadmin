import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import axios from '../../api/axios.config'

export default function Careers() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['careers'],
    queryFn: async () => {
      const res = await axios.get('/careers')
      return res.data.data
    }
  })

  const getStatusStyle = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700'
      case 'closed':
        return 'bg-gray-200 text-gray-600'
      default:
        return 'bg-[#FEC300]/20 text-[#135E73]'
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2FA8C7]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-[#FEC300] font-bold tracking-widest uppercase text-sm">
              Talent Acquisition
            </span>
            <h1 className="text-4xl font-light text-[#135E73] mt-3">
              Career <span className="font-bold">Listings</span>
            </h1>
            <p className="text-gray-500 mt-4 font-light">
              Manage job postings and applications.
            </p>
          </div>

          <Link
            to="/careers/new"
            className="inline-flex items-center gap-2 bg-[#135E73] text-white px-8 py-4 rounded-full shadow-lg shadow-[#135E73]/20 hover:bg-[#0f4c5e] transition"
          >
            <Plus size={18} />
            Add Job
          </Link>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">

          {isLoading && <p className="text-gray-500 animate-pulse">Loading jobs...</p>}
          {error && <p className="text-red-500">Error loading jobs</p>}

          {!isLoading && data?.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No job listings found.
            </div>
          )}

          {!isLoading && data?.length > 0 && (
            <div className="space-y-6">
              {data.map((job, i) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="p-6 rounded-2xl bg-[#FAFAFA] border border-gray-100 flex justify-between items-center hover:shadow-md transition"
                >

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-[#135E73]">
                        {job.title}
                      </h3>

                      <span className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(job.status)}`}>
                        {job.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">
                      {job.department} • {job.type}
                    </p>
                  </div>

                  <div className="flex gap-6 text-sm">
                    <Link
                      to={`/careers/${job._id}`}
                      className="text-[#135E73] flex items-center gap-1 hover:text-[#2FA8C7]"
                    >
                      View <ArrowRight size={14} />
                    </Link>

                    <Link
                      to={`/careers/${job._id}/edit`}
                      className="text-[#FEC300] hover:underline"
                    >
                      Edit
                    </Link>
                  </div>

                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
