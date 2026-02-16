import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import axios from '../../api/axios.config'

export default function CareerForm() {

  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    title: '',
    department: '',
    type: '',
    description: { short: '', full: '' },
    status: 'draft'
  })

  const { data } = useQuery({
    queryKey: ['career', id],
    queryFn: async () => {
      const res = await axios.get(`/careers/${id}`)
      return res.data.data
    },
    enabled: isEdit
  })

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  const mutation = useMutation({
    mutationFn: async () => {
      if (isEdit) return axios.put(`/careers/${id}`, form)
      return axios.post('/careers', form)
    },
    onSuccess: () => navigate('/careers')
  })

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">

      <div className="max-w-3xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <h1 className="text-4xl font-light text-[#135E73] mb-10">
            {isEdit ? 'Edit' : 'Create'} <span className="font-bold">Job</span>
          </h1>

          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-6">

            <Input label="Job Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <Input label="Department"
              value={form.department}
              onChange={e => setForm({ ...form, department: e.target.value })}
            />

            <Input label="Job Type"
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
            />

            <Textarea label="Short Description"
              value={form.description.short}
              onChange={e =>
                setForm({
                  ...form,
                  description: { ...form.description, short: e.target.value }
                })
              }
            />

            <Textarea label="Full Description"
              value={form.description.full}
              onChange={e =>
                setForm({
                  ...form,
                  description: { ...form.description, full: e.target.value }
                })
              }
            />

            <button
              onClick={() => mutation.mutate()}
              className="bg-[#135E73] text-white px-8 py-4 rounded-full shadow-lg shadow-[#135E73]/20 hover:bg-[#0f4c5e] transition"
            >
              Save Job
            </button>

          </div>

        </motion.div>
      </div>
    </div>
  )
}

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
