import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import axios from '../../api/axios.config'

export default function Contacts() {

  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['contacts', search],
    queryFn: async () => {
      const res = await axios.get(`/contacts?search=${search}&limit=50`)
      return res.data.data
    }
  })

  const getStatusStyle = (status) => {
    switch (status) {
      case 'new':
        return 'bg-[#2FA8C7]/20 text-[#135E73]'
      case 'replied':
        return 'bg-green-100 text-green-700'
      case 'archived':
        return 'bg-gray-200 text-gray-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2FA8C7]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-10">
          <span className="text-[#FEC300] font-bold tracking-widest uppercase text-sm">
            Communication Hub
          </span>
          <h1 className="text-4xl font-light text-[#135E73] mt-3">
            Contact <span className="font-bold">Submissions</span>
          </h1>
          <p className="text-gray-500 mt-4 font-light">
            Manage inquiries, leads and service requests.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-4 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2FA8C7] bg-white"
          />
        </div>

        {/* Content */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">

          {isLoading && <p className="text-gray-500 animate-pulse">Loading contacts...</p>}
          {error && <p className="text-red-500">Error loading contacts</p>}

          {!isLoading && data?.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No contacts found.
            </div>
          )}

          {!isLoading && data?.length > 0 && (
            <div className="space-y-6">
              {data.map((contact, i) => (
                <motion.div
                  key={contact._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="p-6 rounded-2xl bg-[#FAFAFA] border border-gray-100 flex justify-between items-center hover:shadow-md transition"
                >

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-[#135E73]">
                        {contact.name}
                      </h3>

                      <span className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(contact.status)}`}>
                        {contact.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">
                      {contact.subject}
                    </p>

                    <p className="text-xs text-gray-400">
                      {contact.email}
                    </p>
                  </div>

                  <Link
                    to={`/contacts/${contact._id}`}
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
