import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from '../../api/axios.config'

const STATUS_OPTIONS = ['planned', 'ongoing', 'completed', 'upcoming']

export default function InitiativeForm() {

  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = Boolean(id)

  const { data } = useQuery({
    queryKey: ['initiatives', id],
    queryFn: async () => {
      const res = await axios.get(`/initiatives/${id}`)
      return res.data.data
    },
    enabled: isEdit
  })

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    title: '',
    subtitle: '',
    description: { short: '', full: '' },
    timeline: { status: 'planned' },
    isFeatured: false,
    isActive: true
  })

  useEffect(() => {
    if (data) setFormData(data)
  }, [data])

  const mutation = useMutation({
    mutationFn: async (payload) => {
      if (isEdit) return axios.put(`/initiatives/${id}`, payload)
      return axios.post('/initiatives', payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['initiatives'])
      navigate('/initiatives')
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
            {isEdit ? 'Edit Initiative' : 'New Initiative'}
          </span>
          <h1 className="text-4xl font-light text-[#135E73] mt-4">
            {isEdit ? 'Update' : 'Create'} <span className="font-bold">Initiative</span>
          </h1>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-8"
        >

          <Input label="Initiative Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />

          <Input label="Type"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          />

          <Textarea label="Short Description"
            value={formData.description.short}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: {...formData.description, short: e.target.value}
              })
            }
          />

          <Textarea label="Full Description"
            value={formData.description.full}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: {...formData.description, full: e.target.value}
              })
            }
          />

          <Select
            label="Status"
            value={formData.timeline.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                timeline: {...formData.timeline, status: e.target.value}
              })
            }
            options={STATUS_OPTIONS}
          />

          <div className="flex gap-6 pt-4">
            <Toggle
              label="Featured"
              checked={formData.isFeatured}
              onChange={(val) => setFormData({...formData, isFeatured: val})}
            />
            <Toggle
              label="Active"
              checked={formData.isActive}
              onChange={(val) => setFormData({...formData, isActive: val})}
            />
          </div>

          <button
            type="submit"
            className="bg-[#135E73] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0f4c5e] transition-all shadow-lg shadow-[#135E73]/20"
          >
            {isEdit ? 'Update Initiative' : 'Create Initiative'}
          </button>

        </form>
      </div>
    </div>
  )
}

/* Reusable UI */

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
