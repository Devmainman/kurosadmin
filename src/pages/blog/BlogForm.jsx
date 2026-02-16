import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from '../../api/axios.config'

const CATEGORY_OPTIONS = [
  'Digital Transformation',
  'Youth Empowerment',
  'Project Management',
  'Branding',
  'Technology',
  'Business Consulting',
  'EdTech',
  'Community Impact',
  'Company News'
]

export default function BlogForm() {

  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = Boolean(id)

  const { data } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const res = await axios.get(`/blog/${id}`)
      return res.data.data
    },
    enabled: isEdit
  })

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    categories: [],
    tags: '',
    isFeatured: false,
    isPublished: false
  })

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        tags: data.tags?.join(', ') || ''
      })
    }
  }, [data])

  const mutation = useMutation({
    mutationFn: async (payload) => {
      if (isEdit) return axios.put(`/blog/${id}`, payload)
      return axios.post('/blog', payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blog'])
      navigate('/blog')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    })
  }

  const toggleCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
          <span className="text-[#FEC300] font-bold uppercase tracking-widest text-sm">
            {isEdit ? 'Edit Post' : 'New Post'}
          </span>
          <h1 className="text-4xl font-light text-[#135E73] mt-4">
            {isEdit ? 'Update' : 'Create'} <span className="font-bold">Article</span>
          </h1>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-8"
        >

          <Input label="Title" value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})} />

          <Textarea label="Excerpt" value={formData.excerpt}
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})} />

          <Textarea label="Content" rows={8} value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})} />

          {/* Category Pills */}
          <div>
            <label className="block text-sm font-medium text-[#135E73] mb-3">
              Categories
            </label>
            <div className="flex flex-wrap gap-3">
              {CATEGORY_OPTIONS.map(cat => {
                const active = formData.categories.includes(cat)
                return (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm transition ${
                      active
                        ? 'bg-[#135E73] text-white'
                        : 'bg-[#FAFAFA] text-gray-600 border border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          <Input label="Tags (comma separated)"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})} />

          {/* Toggle Section */}
          <div className="flex gap-8 pt-4">
            <Toggle
              label="Featured"
              checked={formData.isFeatured}
              onChange={(val) => setFormData({...formData, isFeatured: val})}
            />
            <Toggle
              label="Publish"
              checked={formData.isPublished}
              onChange={(val) => setFormData({...formData, isPublished: val})}
            />
          </div>

          <button
            type="submit"
            className="bg-[#135E73] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0f4c5e] transition-all shadow-lg shadow-[#135E73]/20"
          >
            {isEdit ? 'Update Post' : 'Create Post'}
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

function Textarea({ label, rows=4, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#135E73] mb-2">{label}</label>
      <textarea rows={rows} {...props}
        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#2FA8C7]" />
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-3 px-4 py-2 rounded-full transition ${
        checked ? 'bg-[#135E73] text-white' : 'bg-gray-200 text-gray-600'
      }`}
    >
      {label}
    </button>
  )
}
