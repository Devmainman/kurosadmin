import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ServiceDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <span className="text-[#FEC300] font-bold uppercase tracking-widest text-sm">
            Service Overview
          </span>

          <h1 className="text-4xl font-light text-[#135E73] mt-4 mb-8">
            Service <span className="font-bold">Details</span>
          </h1>

          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-light">
              Viewing service ID:
            </p>
            <p className="text-[#135E73] font-bold mt-2 text-lg">
              {id}
            </p>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
