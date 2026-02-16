import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import axios from '../../api/axios.config'

export default function CareerDetail() {

  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['career', id],
    queryFn: async () => {
      const res = await axios.get(`/careers/${id}`)
      return res.data.data
    }
  })

  const { data: applications } = useQuery({
    queryKey: ['applications', id],
    queryFn: async () => {
      const res = await axios.get(`/careers/${id}/applications`)
      return res.data.data
    }
  })

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">

      <div className="max-w-5xl mx-auto space-y-10">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">

            <h1 className="text-3xl font-bold text-[#135E73] mb-2">
              {data.title}
            </h1>

            <p className="text-sm text-gray-500 mb-6">
              {data.department} • {data.type}
            </p>

            <p className="text-gray-600 leading-relaxed">
              {data.description?.short}
            </p>

          </div>

          {/* Applications */}
          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm mt-10">

            <h2 className="text-xl font-bold text-[#135E73] mb-6">
              Applications ({applications?.applications?.length || 0})
            </h2>

            {applications?.applications?.length === 0 && (
              <p className="text-gray-400">No applications yet.</p>
            )}

            <div className="space-y-4">
              {applications?.applications?.map(app => (
                <div
                  key={app._id}
                  className="p-4 rounded-2xl bg-[#FAFAFA] border border-gray-100"
                >
                  <p className="font-semibold text-[#135E73]">
                    {app.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {app.email}
                  </p>
                  <p className="text-xs mt-1 text-gray-400">
                    Status: {app.status}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </motion.div>
      </div>
    </div>
  )
}
