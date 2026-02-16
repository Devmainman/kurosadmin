import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import axios from '../../api/axios.config'

export default function PortfolioDetail() {

  const { id } = useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ['portfolio', id],
    queryFn: async () => {
      const res = await axios.get(`/portfolio/${id}`)
      return res.data.data
    }
  })

  if (isLoading) return <p className="p-6">Loading...</p>
  if (error) return <p className="p-6 text-red-500">Error loading project</p>

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <span className="text-[#2FA8C7] uppercase tracking-widest text-sm font-semibold">
            {data.category}
          </span>

          <h1 className="text-4xl font-light text-[#135E73] mt-4 mb-8">
            <span className="font-bold">{data.title}</span>
          </h1>

          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
            <p className="text-gray-600 leading-relaxed">
              {data.description.full}
            </p>
          </div>

        </motion.div>

      </div>
    </div>
  )
}
