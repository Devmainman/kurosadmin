import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import axios from '../../api/axios.config'

export default function Portfolio() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const res = await axios.get('/portfolio')
      return res.data.data
    }
  })

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2FA8C7]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <span className="text-[#FEC300] font-bold tracking-widest uppercase text-sm">
              Creative Work
            </span>
            <h1 className="text-4xl font-light text-[#135E73] mt-3">
              Our <span className="font-bold">Portfolio</span>
            </h1>
            <p className="text-gray-500 mt-4 max-w-md font-light">
              Showcase and manage impactful projects delivered across sectors.
            </p>
          </div>

          <Link
            to="/portfolio/new"
            className="inline-flex items-center gap-2 bg-[#135E73] text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-[#135E73]/20 hover:bg-[#0f4c5e] transition-all"
          >
            <Plus size={18} />
            Add Project
          </Link>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">

          {isLoading && (
            <p className="text-gray-500 animate-pulse">Loading portfolio...</p>
          )}

          {error && (
            <p className="text-red-500">Error loading portfolio</p>
          )}

          {!isLoading && data?.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No portfolio items found.
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
                  <div className="mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#2FA8C7] font-semibold">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#135E73] mb-4">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm">
                    <Link
                      to={`/portfolio/${item._id}`}
                      className="text-[#135E73] font-medium flex items-center gap-1 hover:text-[#2FA8C7]"
                    >
                      View <ArrowRight size={14} />
                    </Link>

                    <Link
                      to={`/portfolio/${item._id}/edit`}
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
