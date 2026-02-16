import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from '../../api/axios.config'

export default function PortfolioForm() {

  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = Boolean(id)

  const { data } = useQuery({
    queryKey: ['portfolio', id],
    queryFn: async () => {
      const res = await axios.get(`/portfolio/${id}`)
      return res.data.data
    },
    enabled: isEdit
  })

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: { short: '', full: '' },
    status: 'completed'
  })

  useEffect(() => {
    if (data) setFormData(data)
  }, [data])

  const mutation = useMutation({
    mutationFn: async (payload) => {
      if (isEdit) return axios.put(`/portfolio/${id}`, payload)
      return axios.post('/portfolio', payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['portfolio'])
      navigate('/portfolio')
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
            {isEdit ? 'Edit Project' : 'New Project'}
          </span>
          <h1 className="text-4xl font-light text-[#135E73] mt-4">
            {isEdit ? 'Update' : 'Create'} <span className="font-bold">Project</span>
          </h1>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-8"
        >

          <Input
            label="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <SelectCategory
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <Textarea
            label="Short Description"
            value={formData.description.short}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: { ...formData.description, short: e.target.value }
              })
            }
          />

          <Textarea
            label="Full Description"
            value={formData.description.full}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: { ...formData.description, full: e.target.value }
              })
            }
          />

          <button
            type="submit"
            className="bg-[#135E73] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0f4c5e] transition-all shadow-lg shadow-[#135E73]/20"
          >
            {isEdit ? 'Update Project' : 'Create Project'}
          </button>

        </form>

      </div>
    </div>
  )
}

/* Styled Inputs */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#135E73] mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#2FA8C7]"
      />
    </div>
  )
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#135E73] mb-2">
        {label}
      </label>
      <textarea
        {...props}
        rows={4}
        className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#2FA8C7]"
      />
    </div>
  )
}

function SelectCategory({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#135E73] mb-2">
        Category
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#2FA8C7]"
      >
        <option value="">Select Category</option>
        <option value="Web Development">Web Development</option>
        <option value="Mobile App">Mobile App</option>
        <option value="Branding & Design">Branding & Design</option>
        <option value="Project Management">Project Management</option>
        <option value="Business Consulting">Business Consulting</option>
        <option value="Digital Marketing">Digital Marketing</option>
        <option value="Survey & Geospatial">Survey & Geospatial</option>
        <option value="Training Program">Training Program</option>
        <option value="Community Project">Community Project</option>
      </select>
    </div>
  )
}
