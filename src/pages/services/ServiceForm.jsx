import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from '../../api/axios.config';
import toast from 'react-hot-toast';

export default function ServiceForm() {

  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    whyItMatters: '',
    description: { short: '', full: '' }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      axios.get(`/services/${id}`)
        .then(res => setFormData(res.data.data))
        .catch(() => toast.error('Failed to load service'));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'short' || name === 'full') {
      setFormData(prev => ({
        ...prev,
        description: { ...prev.description, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await axios.put(`/services/${id}`, formData);
        toast.success('Service updated successfully');
      } else {
        await axios.post('/services', formData);
        toast.success('Service created successfully');
      }
      navigate('/services');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
          <span className="text-[#FEC300] font-bold uppercase tracking-widest text-sm">
            {isEditing ? 'Edit Service' : 'New Service'}
          </span>
          <h1 className="text-4xl font-light text-[#135E73] mt-4">
            {isEditing ? 'Update' : 'Create'} <span className="font-bold">Service</span>
          </h1>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm space-y-8"
        >

          <Input label="Service Name" name="name" value={formData.name} onChange={handleChange} />

          <SelectCategory value={formData.category} onChange={handleChange} />

          <Textarea label="Why It Matters" name="whyItMatters" rows={3} value={formData.whyItMatters} onChange={handleChange} />

          <Textarea label="Short Description" name="short" rows={2} value={formData.description.short} onChange={handleChange} />

          <Textarea label="Full Description" name="full" rows={5} value={formData.description.full} onChange={handleChange} />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#135E73] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0f4c5e] transition-all shadow-lg shadow-[#135E73]/20"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Service' : 'Create Service'}
          </button>

        </form>

      </div>
    </div>
  );
}

/* Reusable Styled Inputs */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#135E73] mb-2">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#2FA8C7]"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#135E73] mb-2">
        {label}
      </label>
      <textarea
        {...props}
        required
        className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#2FA8C7]"
      />
    </div>
  );
}

function SelectCategory({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#135E73] mb-2">
        Category
      </label>
      <select
        name="category"
        value={value}
        onChange={onChange}
        required
        className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#2FA8C7]"
      >
        <option value="">Select Category</option>
        <option value="Project Management">Project Management</option>
        <option value="Branding & Design">Branding & Design</option>
        <option value="Web Design & Development">Web Design & Development</option>
        <option value="Survey & Geospatial Services">Survey & Geospatial Services</option>
        <option value="Business Consulting">Business Consulting</option>
        <option value="Learning & Development">Learning & Development</option>
      </select>
    </div>
  );
}
