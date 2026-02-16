import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import axios from '../../api/axios.config'
import { useState } from 'react'

export default function QuoteDetail() {

  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['quote', id],
    queryFn: async () => {
      const res = await axios.get(`/quotes/${id}`)
      return res.data.data
    }
  })

  const [quoteAmount, setQuoteAmount] = useState('')
  const [quoteDetails, setQuoteDetails] = useState('')

  const updateStatus = useMutation({
    mutationFn: async (status) => {
      return axios.put(`/quotes/${id}/status`, { status })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['quote', id])
      queryClient.invalidateQueries(['quotes'])
    }
  })

  const sendQuote = useMutation({
    mutationFn: async () => {
      return axios.post(`/quotes/${id}/send-quote`, {
        quoteAmount: Number(quoteAmount),
        quoteDetails
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['quote', id])
      queryClient.invalidateQueries(['quotes'])
    }
  })

  if (isLoading) return <p className="p-6">Loading...</p>
  if (error) return <p className="p-6 text-red-500">Error loading quote</p>

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">

            {/* Client Info */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#135E73]">
                {data.clientName}
              </h1>
              <p className="text-gray-500">{data.email}</p>
            </div>

            {/* Project Info */}
            <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 mb-8">
              <h2 className="font-semibold text-[#135E73] mb-3">
                {data.projectName || data.projectType}
              </h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {data.projectDescription}
              </p>
            </div>

            {/* Status */}
            <div className="flex gap-4 mb-10 text-sm">
              <Badge label={`Status: ${data.status}`} />
              <Badge label={`Priority: ${data.priority}`} />
            </div>

            {/* Send Quote */}
            {data.status !== 'quoted' && (
              <div className="bg-[#FAFAFA] rounded-2xl p-6 border border-gray-100 mb-8 space-y-4">
                <h3 className="font-semibold text-[#135E73]">
                  Send Official Quote
                </h3>

                <input
                  type="number"
                  placeholder="Quote Amount"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#2FA8C7]"
                />

                <textarea
                  placeholder="Quote Details"
                  value={quoteDetails}
                  onChange={(e) => setQuoteDetails(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#2FA8C7]"
                />

                <button
                  onClick={() => sendQuote.mutate()}
                  className="bg-green-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition"
                >
                  Send Quote
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => updateStatus.mutate('reviewing')}
                className="bg-[#2FA8C7] text-white px-6 py-3 rounded-full hover:opacity-90 transition"
              >
                Mark Reviewing
              </button>

              <button
                onClick={() => updateStatus.mutate('archived')}
                className="bg-gray-600 text-white px-6 py-3 rounded-full hover:opacity-90 transition"
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
