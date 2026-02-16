import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import axios from '../../api/axios.config'

export default function BlogDetail() {

  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const res = await axios.get(`/blog/${id}`)
      return res.data.data
    }
  })

  if (isLoading) return <p className="p-6">Loading...</p>

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <h1 className="text-4xl font-light text-[#135E73] mb-4">
            <span className="font-bold">{data.title}</span>
          </h1>

          <p className="text-gray-500 mb-6">{data.excerpt}</p>

          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm leading-relaxed text-gray-700">
            {data.content}
          </div>

        </motion.div>

      </div>
    </div>
  )
}
