import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit3 } from 'lucide-react'
import axios from '../../api/axios.config'

export default function InitiativeDetail() {

  const { id } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ['initiatives', id],
    queryFn: async () => {
      const res = await axios.get(`/initiatives/${id}`)
      return res.data.data
    }
  })

  if (isLoading) return <p className="p-6">Loading...</p>
  if (error) return <p className="p-6 text-red-500">Error loading initiative</p>

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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2FA8C7]/10 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Back Link */}
        <Link
          to="/initiatives"
          className="inline-flex items-center gap-2 text-sm text-[#135E73] mb-8 hover:text-[#2FA8C7]"
        >
          <ArrowLeft size={16} />
          Back to Initiatives
        </Link>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          {/* Main Card */}
          <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm">

            {/* Header Section */}
            <div className="mb-8">

              <div className="flex flex-wrap gap-3 mb-4">

                {data.isFeatured && (
                  <span className="px-4 py-1 text-xs bg-[#FEC300]/20 text-[#135E73] rounded-full font-semibold">
                    Featured Initiative
                  </span>
                )}

                <span className={`px-4 py-1 text-xs rounded-full ${getStatusStyle(data.timeline?.status)}`}>
                  {data.timeline?.status}
                </span>

              </div>

              <h1 className="text-4xl font-light text-[#135E73] mb-3">
                <span className="font-bold">{data.name}</span>
              </h1>

              {data.type && (
                <p className="text-sm uppercase tracking-widest text-[#2FA8C7]">
                  {data.type}
                </p>
              )}

            </div>

            {/* Short Description Highlight */}
            {data.description?.short && (
              <div className="bg-[#FAFAFA] rounded-2xl p-6 mb-8 border border-gray-100">
                <p className="text-lg font-medium text-[#135E73]">
                  {data.description.short}
                </p>
              </div>
            )}

            {/* Full Description */}
            {data.description?.full && (
              <div className="prose max-w-none text-gray-600 leading-relaxed">
                {data.description.full}
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-12 flex justify-between items-center">

              <div className="text-sm text-gray-400">
                Initiative ID: {data._id}
              </div>

              <Link
                to={`/initiatives/${data._id}/edit`}
                className="inline-flex items-center gap-2 bg-[#135E73] text-white px-6 py-3 rounded-full hover:bg-[#0f4c5e] transition shadow-lg shadow-[#135E73]/20"
              >
                <Edit3 size={16} />
                Edit Initiative
              </Link>

            </div>

          </div>

        </motion.div>
      </div>
    </div>
  )
}
