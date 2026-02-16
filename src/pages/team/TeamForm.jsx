import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from '../../api/axios.config'

const DEPARTMENTS = [
  'Leadership',
  'Project Management',
  'Technology',
  'Branding & Design',
  'Business Consulting',
  'Learning & Development',
  'Operations',
  'Marketing'
]

export default function TeamForm() {

  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = Boolean(id)

  const { data } = useQuery({
    queryKey: ['team', id],
    queryFn: async () => {
      const res = await axios.get(`/team/${id}`)
      return res.data.data
    },
    enabled: isEdit
  })

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    bio: { short: '', full: '' },
    isFounder: false,
    isLeader: false,
    isActive: true
  })

  useEffect(() => {
    if (data) setFormData(data)
  }, [data])

  const mutation = useMutation({
    mutationFn: async (payload) => {
      if (isEdit) return axios.put(`/team/${id}`, payload)
      return axios.post('/team', payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['team'])
      navigate('/team')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
          <span className="text-[#FEC300] font-bold uppercase tracking-widest text-sm">
            {isEdit ? 'Edit Member' : 'New Member'}
          </span>
          <h1 className="text-4xl font-light text-[#135E73] mt-4">
            {isEdit ? 'Update' : 'Add'} <span className="font-bold">Team Member</span>
          </h1>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-8"
        >

          <Input label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />

          <Input label="Position"
            value={formData.position}
            onChange={(e) => setFormData({...formData, position: e.target.value})}
          />

          <Select label="Department"
            value={formData.department}
            onChange={(e) => setFormData({...formData, department: e.target.value})}
            options={DEPARTMENTS}
          />

          <Textarea label="Short Bio"
            value={formData.bio.short}
            onChange={(e) =>
              setFormData({
                ...formData,
                bio: {...formData.bio, short: e.target.value}
              })
            }
          />

          <Textarea label="Full Bio"
            value={formData.bio.full}
            onChange={(e) =>
              setFormData({
                ...formData,
                bio: {...formData.bio, full: e.target.value}
              })
            }
          />

          <div className="flex gap-6 pt-4">
            <Toggle label="Founder"
              checked={formData.isFounder}
              onChange={(val) => setFormData({...formData, isFounder: val})}
            />
            <Toggle label="Leader"
              checked={formData.isLeader}
              onChange={(val) => setFormData({...formData, isLeader: val})}
            />
            <Toggle label="Active"
              checked={formData.isActive}
              onChange={(val) => setFormData({...formData, isActive: val})}
            />
          </div>

          <button
            type="submit"
            className="bg-[#135E73] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0f4c5e] transition-all shadow-lg shadow-[#135E73]/20"
          >
            {isEdit ? 'Update Member' : 'Create Member'}
          </button>

        </form>
      </div>
    </div>
  )
}

/* Reusable Components */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#135E73] mb-2">{label}</label>
      <input {...props}
        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#2FA8C7]" />
    </div>
  )
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#135E73] mb-2">{label}</label>
      <textarea rows={4} {...props}
        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#2FA8C7]" />
    </div>
  )
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#135E73] mb-2">{label}</label>
      <select {...props}
        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#2FA8C7]">
        <option value="">Select</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`px-4 py-2 rounded-full text-sm transition ${
        checked ? 'bg-[#135E73] text-white' : 'bg-gray-200 text-gray-600'
      }`}
    >
      {label}
    </button>
  )
}
