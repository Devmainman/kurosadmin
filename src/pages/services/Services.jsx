import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios.config';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function Services() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axios.get('/services');
      return res.data.data;
    }
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 relative overflow-hidden">

      {/* Soft Glow Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2FA8C7]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div initial="initial" animate="animate" variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          <div>
            <span className="text-[#FEC300] font-bold tracking-widest uppercase text-sm">
              Service Management
            </span>
            <h1 className="text-4xl font-light text-[#135E73] mt-3">
              Our <span className="font-bold">Services</span>
            </h1>
            <p className="text-gray-500 mt-4 max-w-md font-light">
              Manage and structure your digital offerings within the ecosystem.
            </p>
          </div>

          <Link
            to="/services/new"
            className="inline-flex items-center gap-2 bg-[#135E73] text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-[#135E73]/20 hover:bg-[#0f4c5e] transition-all"
          >
            <Plus size={18} />
            Add Service
          </Link>

        </motion.div>

        {/* Content */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">

          {isLoading && (
            <p className="text-gray-500 animate-pulse">Loading services...</p>
          )}

          {error && (
            <p className="text-red-500">Error loading services</p>
          )}

          {!isLoading && data?.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No services found.
            </div>
          )}

          {!isLoading && data?.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((service, i) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group bg-[#FAFAFA] p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl font-bold text-[#135E73] mb-3">
                    {service.name}
                  </h3>

                  <p className="text-gray-500 text-sm font-light mb-6">
                    {service.description?.short}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <Link
                      to={`/services/${service._id}`}
                      className="text-[#135E73] font-medium flex items-center gap-1 hover:text-[#2FA8C7]"
                    >
                      View <ArrowRight size={14} />
                    </Link>

                    <Link
                      to={`/services/${service._id}/edit`}
                      className="text-[#FEC300] font-medium hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
