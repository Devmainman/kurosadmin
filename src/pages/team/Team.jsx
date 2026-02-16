import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import axios from '../../api/axios.config'

export default function Team() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const res = await axios.get('/team')
      return res.data.data
    }
  })

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2FA8C7]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <span className="text-[#FEC300] font-bold tracking-widest uppercase text-sm">
              Organizational Structure
            </span>
            <h1 className="text-4xl font-light text-[#135E73] mt-3">
              Our <span className="font-bold">Team</span>
            </h1>
            <p className="text-gray-500 mt-4 max-w-md font-light">
              Manage leadership, departments and contributors.
            </p>
          </div>

          <Link
            to="/team/new"
            className="inline-flex items-center gap-2 bg-[#135E73] text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-[#135E73]/20 hover:bg-[#0f4c5e] transition-all"
          >
            <Plus size={18} />
            Add Member
          </Link>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">

          {isLoading && <p className="text-gray-500 animate-pulse">Loading team...</p>}
          {error && <p className="text-red-500">Error loading team</p>}

          {!isLoading && data?.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No team members found.
            </div>
          )}

          {!isLoading && data?.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((member, i) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group bg-[#FAFAFA] p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-14 h-14 rounded-full bg-[#135E73]/10 flex items-center justify-center text-[#135E73] font-bold text-lg">
                      {member.name?.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-bold text-[#135E73]">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {member.position}
                      </p>
                    </div>

                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.isFounder && (
                      <span className="px-3 py-1 text-xs bg-[#FEC300]/20 text-[#135E73] rounded-full font-semibold">
                        Founder
                      </span>
                    )}
                    {member.isLeader && (
                      <span className="px-3 py-1 text-xs bg-[#2FA8C7]/20 text-[#135E73] rounded-full">
                        Leader
                      </span>
                    )}
                    {!member.isActive && (
                      <span className="px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
                        Inactive
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <Link
                      to={`/team/${member._id}`}
                      className="text-[#135E73] font-medium flex items-center gap-1 hover:text-[#2FA8C7]"
                    >
                      View <ArrowRight size={14} />
                    </Link>

                    <Link
                      to={`/team/${member._id}/edit`}
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
