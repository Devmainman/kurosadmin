import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import axios from '../../api/axios.config'

export default function TeamDetail() {

  const { id } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ['team', id],
    queryFn: async () => {
      const res = await axios.get(`/team/${id}`)
      return res.data.data
    }
  })

  if (isLoading) return <p className="p-6">Loading...</p>
  if (error) return <p className="p-6 text-red-500">Error loading member</p>

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">

            <div className="flex items-center gap-6 mb-8">

              <div className="w-24 h-24 rounded-full bg-[#135E73]/10 flex items-center justify-center text-[#135E73] text-3xl font-bold">
                {data.name?.charAt(0)}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-[#135E73]">
                  {data.name}
                </h1>
                <p className="text-gray-500 mt-1">{data.position}</p>
                <p className="text-sm text-gray-400">{data.department}</p>
              </div>

            </div>

            {data.bio?.full && (
              <p className="text-gray-600 leading-relaxed mb-8">
                {data.bio.full}
              </p>
            )}

            <Link
              to={`/team/${data._id}/edit`}
              className="inline-block bg-[#135E73] text-white px-6 py-3 rounded-full hover:bg-[#0f4c5e] transition"
            >
              Edit Member
            </Link>

          </div>

        </motion.div>
      </div>
    </div>
  )
}
