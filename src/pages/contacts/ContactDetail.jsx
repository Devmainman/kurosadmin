import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import axios from '../../api/axios.config'

export default function ContactDetail() {

  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['contact', id],
    queryFn: async () => {
      const res = await axios.get(`/contacts/${id}`)
      return res.data.data
    }
  })

  const updateStatus = useMutation({
    mutationFn: async (status) => {
      return axios.put(`/contacts/${id}/status`, { status })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contact', id])
      queryClient.invalidateQueries(['contacts'])
    }
  })

  if (isLoading) return <p className="p-6">Loading...</p>
  if (error) return <p className="p-6 text-red-500">Error loading contact</p>

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#135E73]">
                {data.name}
              </h1>
              <p className="text-gray-500">{data.email}</p>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-3 mb-8 text-sm">
              <Badge label={`Status: ${data.status}`} />
              {data.priority && <Badge label={`Priority: ${data.priority}`} />}
              {data.service && <Badge label={`Service: ${data.service}`} />}
            </div>

            {/* Message */}
            <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 mb-8">
              <h2 className="font-semibold text-[#135E73] mb-3">
                {data.subject}
              </h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {data.message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => updateStatus.mutate('read')}
                className="bg-[#2FA8C7] text-white px-6 py-3 rounded-full hover:opacity-90 transition"
              >
                Mark as Read
              </button>

              <button
                onClick={() => updateStatus.mutate('archived')}
                className="bg-gray-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition"
              >
                Archive
              </button>
            </div>

          </div>

        </motion.div>
      </div>
    </div>
  )
}

function Badge({ label }) {
  return (
    <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-600">
      {label}
    </span>
  )
}
