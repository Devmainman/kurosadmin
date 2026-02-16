import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import {
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShareIcon,
  PaintBrushIcon,
  KeyIcon,
  ChartBarIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import axios from '../../api/axios.config'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const [formData, setFormData] = useState({})
  const queryClient = useQueryClient()

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await axios.get('/settings')
      return res.data.data
    }
  })

  const updateSettings = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post('/settings/bulk', data)
      return res.data
    },
    onSuccess: () => {
      toast.success('Settings updated successfully')
      queryClient.invalidateQueries(['settings'])
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to update settings')
    }
  })

  useEffect(() => {
    if (settings) setFormData(settings)
  }, [settings])

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSettings.mutate(formData)
  }

  const tabs = [
    { id: 'general', name: 'General', icon: GlobeAltIcon },
    { id: 'contact', name: 'Contact', icon: PhoneIcon },
    { id: 'social', name: 'Social Media', icon: ShareIcon },
    { id: 'appearance', name: 'Appearance', icon: PaintBrushIcon },
    { id: 'seo', name: 'SEO', icon: ChartBarIcon },
    { id: 'email', name: 'Email', icon: EnvelopeIcon },
    { id: 'api', name: 'API', icon: KeyIcon },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#135E73]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 relative overflow-hidden">

      {/* Glow Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2FA8C7]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12">
          <span className="text-[#FEC300] font-bold tracking-widest uppercase text-sm">
            System Configuration
          </span>
          <h1 className="text-4xl font-light text-[#135E73] mt-3">
            Platform <span className="font-bold">Settings</span>
          </h1>
          <p className="text-gray-500 mt-4 font-light">
            Manage global preferences and integrations.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">

          {/* Tabs */}
          <div className="border-b border-gray-100 bg-[#FAFAFA]">
            <nav className="flex overflow-x-auto px-6">
              {tabs.map(tab => {
                const Icon = tab.icon
                const active = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-6 py-5 text-sm font-medium transition
                      ${active
                        ? 'text-[#135E73] border-b-2 border-[#2FA8C7]'
                        : 'text-gray-500 hover:text-[#135E73]'
                      }
                    `}
                  >
                    <Icon className={`h-5 w-5 ${active ? 'text-[#2FA8C7]' : 'text-gray-400'}`} />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-10 space-y-10">

            {/* GENERAL */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <Input label="Site Name"
                  value={formData.site_name}
                  onChange={v => handleInputChange('site_name', v)}
                />
                <Textarea label="Site Description"
                  value={formData.site_description}
                  onChange={v => handleInputChange('site_description', v)}
                />
                <Input label="Site Logo URL"
                  value={formData.site_logo}
                  onChange={v => handleInputChange('site_logo', v)}
                />
              </div>
            )}

            {/* CONTACT */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <Textarea label="Office Address"
                  value={formData.address}
                  onChange={v => handleInputChange('address', v)}
                />
                <Input label="Phone"
                  value={formData.phone}
                  onChange={v => handleInputChange('phone', v)}
                />
                <Input label="Email"
                  value={formData.email}
                  onChange={v => handleInputChange('email', v)}
                />
              </div>
            )}

            {/* SOCIAL */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <Input label="Facebook"
                  value={formData.facebook}
                  onChange={v => handleInputChange('facebook', v)}
                />
                <Input label="Instagram"
                  value={formData.instagram}
                  onChange={v => handleInputChange('instagram', v)}
                />
                <Input label="LinkedIn"
                  value={formData.linkedin}
                  onChange={v => handleInputChange('linkedin', v)}
                />
              </div>
            )}

            {/* APPEARANCE */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <ColorPicker label="Primary Color"
                  value={formData.primary_color || '#135E73'}
                  onChange={v => handleInputChange('primary_color', v)}
                />
                <ColorPicker label="Secondary Color"
                  value={formData.secondary_color || '#FEC300'}
                  onChange={v => handleInputChange('secondary_color', v)}
                />
              </div>
            )}

            {/* SEO */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <Input label="Google Analytics ID"
                  value={formData.google_analytics_id}
                  onChange={v => handleInputChange('google_analytics_id', v)}
                />
              </div>
            )}

            {/* EMAIL */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <Input label="Admin Email"
                  value={formData.admin_email}
                  onChange={v => handleInputChange('admin_email', v)}
                />
              </div>
            )}

            {/* API */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <Input label="Paystack Public Key"
                  value={formData.paystack_public_key}
                  onChange={v => handleInputChange('paystack_public_key', v)}
                />
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 border-t border-gray-100 pt-8">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={updateSettings.isLoading}
                className="px-8 py-3 rounded-full bg-[#135E73] text-white shadow-lg shadow-[#135E73]/20 hover:bg-[#0f4c5e] transition disabled:opacity-50"
              >
                {updateSettings.isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}


/* ---------- Reusable Inputs ---------- */

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#2FA8C7] focus:border-[#2FA8C7] transition"
      />
    </div>
  )
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        rows={4}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-[#2FA8C7] focus:border-[#2FA8C7] transition"
      />
    </div>
  )
}

function ColorPicker({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 rounded border border-gray-200"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#2FA8C7]"
        />
      </div>
    </div>
  )
}
