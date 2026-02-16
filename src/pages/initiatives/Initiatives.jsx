import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import axios from '../../api/axios.config'

export default function Initiatives() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['initiatives'],
    queryFn: async () => {
      const res = await axios.get('/initiatives')
      return res.data.data
    }
  })

  const getStatusStyle = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-[#2FA8C7]/20 text-[#135E73]'
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'upcoming':
        return 'bg-[#FEC300]/20 text-[#135E73]'
      default:
        return 'bg-gray-200 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FEC300]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <span className="text-[#FEC300] font-bold tracking-widest uppercase text-sm">
              Social & Strategic Programs
            </span>
            <h1 className="text-4xl font-light text-[#135E73] mt-3">
              Our <span className="font-bold">Initiatives</span>
            </h1>
            <p className="text-gray-500 mt-4 max-w-md font-light">
              Manage programs that drive innovation and community impact.
            </p>
          </div>

          <Link
            to="/initiatives/new"
            className="inline-flex items-center gap-2 bg-[#135E73] text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-[#135E73]/20 hover:bg-[#0f4c5e] transition-all"
          >
            <Plus size={18} />
            Add Initiative
          </Link>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">

          {isLoading && <p className="text-gray-500 animate-pulse">Loading initiatives...</p>}
          {error && <p className="text-red-500">Error loading initiatives</p>}

          {!isLoading && data?.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No initiatives found.
            </div>
          )}

          {!isLoading && data?.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group bg-[#FAFAFA] p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all"
                >

                  <div className="flex flex-wrap gap-2 mb-4">

                    {item.isFeatured && (
                      <span className="px-3 py-1 text-xs bg-[#FEC300]/20 text-[#135E73] rounded-full font-semibold">
                        Featured
                      </span>
                    )}

                    <span className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(item.timeline?.status)}`}>
                      {item.timeline?.status}
                    </span>

                  </div>

                  <h3 className="text-xl font-bold text-[#135E73] mb-3">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm font-light mb-4 line-clamp-3">
                    {item.description?.short}
                  </p>

                  <p className="text-xs uppercase tracking-widest text-[#2FA8C7] mb-6">
                    {item.type}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <Link
                      to={`/initiatives/${item._id}`}
                      className="text-[#135E73] font-medium flex items-center gap-1 hover:text-[#2FA8C7]"
                    >
                      View <ArrowRight size={14} />
                    </Link>

                    <Link
                      to={`/initiatives/${item._id}/edit`}
                      className="text-[#FEC300] font-medium hover:underline"
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
