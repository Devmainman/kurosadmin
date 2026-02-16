import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import axios from '../../api/axios.config'

export default function Quotes() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['quotes'],
    queryFn: async () => {
      const res = await axios.get('/quotes?limit=50')
      return res.data.data
    }
  })

  const getStatusStyle = (status) => {
    switch (status) {
      case 'reviewing':
        return 'bg-[#2FA8C7]/20 text-[#135E73]'
      case 'quoted':
        return 'bg-green-100 text-green-700'
      case 'archived':
        return 'bg-gray-200 text-gray-600'
      default:
        return 'bg-[#FEC300]/20 text-[#135E73]'
    }
  }

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 relative overflow-hidden">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2FA8C7]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12">
          <span className="text-[#FEC300] font-bold tracking-widest uppercase text-sm">
            Sales Pipeline
          </span>
          <h1 className="text-4xl font-light text-[#135E73] mt-3">
            Quote <span className="font-bold">Requests</span>
          </h1>
          <p className="text-gray-500 mt-4 font-light">
            Track, review and convert incoming project requests.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">

          {isLoading && <p className="text-gray-500 animate-pulse">Loading quotes...</p>}
          {error && <p className="text-red-500">Error loading quotes</p>}

          {!isLoading && data?.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No quote requests found.
            </div>
          )}

          {!isLoading && data?.length > 0 && (
            <div className="space-y-6">
              {data.map((quote, i) => (
                <motion.div
                  key={quote._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="p-6 rounded-2xl bg-[#FAFAFA] border border-gray-100 flex justify-between items-center hover:shadow-md transition"
                >

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-[#135E73]">
                        {quote.clientName}
                      </h3>

                      <span className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(quote.status)}`}>
                        {quote.status}
                      </span>

                      <span className={`px-3 py-1 text-xs rounded-full ${getPriorityStyle(quote.priority)}`}>
                        {quote.priority}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">
                      {quote.projectType}
                    </p>

                    <p className="text-xs text-gray-400">
                      {quote.email}
                    </p>
                  </div>

                  <Link
                    to={`/quotes/${quote._id}`}
                    className="text-[#135E73] font-medium flex items-center gap-1 hover:text-[#2FA8C7]"
                  >
                    View <ArrowRight size={14} />
                  </Link>

                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
