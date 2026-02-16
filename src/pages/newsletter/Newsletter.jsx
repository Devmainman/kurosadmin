import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'
import axios from '../../api/axios.config'
import { useState } from 'react'

export default function Newsletter() {

  const queryClient = useQueryClient()
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [testEmail, setTestEmail] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['subscribers'],
    queryFn: async () => {
      const res = await axios.get('/newsletter?limit=100')
      return res.data.data
    }
  })

  const { data: stats } = useQuery({
    queryKey: ['newsletter-stats'],
    queryFn: async () => {
      const res = await axios.get('/newsletter/stats')
      return res.data.data
    }
  })

  const sendNewsletter = useMutation({
    mutationFn: async () => {
      return axios.post('/newsletter/send', {
        subject,
        content,
        testEmail: testEmail || undefined
      })
    },
    onSuccess: () => {
      setSubject('')
      setContent('')
      setTestEmail('')
      queryClient.invalidateQueries(['subscribers'])
    }
  })

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FEC300]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">

        {/* Header */}
        <div>
          <span className="text-[#FEC300] font-bold tracking-widest uppercase text-sm">
            Audience & Campaigns
          </span>
          <h1 className="text-4xl font-light text-[#135E73] mt-3">
            Newsletter <span className="font-bold">Manager</span>
          </h1>
          <p className="text-gray-500 mt-4 font-light">
            Engage your audience and grow your brand.
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard label="Active Subscribers"
              value={stats.totalActive?.[0]?.count || 0}
            />
            <StatCard label="Recent (30 Days)"
              value={stats.recentSubscribers?.[0]?.count || 0}
            />
            <StatCard label="Unsubscribed"
              value={stats.byStatus?.find(s => s._id === 'unsubscribed')?.count || 0}
            />
            <StatCard label="Spam"
              value={stats.byStatus?.find(s => s._id === 'spam')?.count || 0}
            />
          </div>
        )}

        {/* Campaign Composer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3">
            <Mail className="text-[#135E73]" />
            <h2 className="text-xl font-bold text-[#135E73]">
              Create Campaign
            </h2>
          </div>

          <input
            type="text"
            placeholder="Email Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#2FA8C7]"
          />

          <textarea
            placeholder="HTML Content (use {{name}} for personalization)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#2FA8C7] h-40"
          />

          <input
            type="email"
            placeholder="Test Email (optional)"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#2FA8C7]"
          />

          <button
            onClick={() => sendNewsletter.mutate()}
            className="inline-flex items-center gap-2 bg-[#135E73] text-white px-8 py-4 rounded-full hover:bg-[#0f4c5e] transition shadow-lg shadow-[#135E73]/20"
          >
            <Send size={16} />
            {testEmail ? 'Send Test Email' : 'Send Campaign'}
          </button>

        </motion.div>

        {/* Subscribers List */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">

          {isLoading && <p className="text-gray-500 animate-pulse">Loading subscribers...</p>}
          {error && <p className="text-red-500">Error loading subscribers</p>}

          {!isLoading && data?.length > 0 && (
            <div className="space-y-4">
              {data.map(sub => (
                <div
                  key={sub._id}
                  className="p-4 rounded-2xl bg-[#FAFAFA] border border-gray-100 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-[#135E73]">
                      {sub.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {sub.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

/* Reusable Stat Card */

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-[#135E73] mt-2">
        {value}
      </p>
    </div>
  )
}
