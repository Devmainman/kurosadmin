import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Users, FileText, Mail, Eye, TrendingUp 
} from 'lucide-react';
import axios from '../../api/axios.config';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function Dashboard() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const res = await axios.get('/analytics/dashboard');
      return res.data.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-[#135E73] font-light animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-red-500">Error loading dashboard</div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Contacts",
      value: data.contacts,
      icon: <Users size={22} />,
    },
    {
      title: "Total Quotes",
      value: data.quotes,
      icon: <FileText size={22} />,
    },
    {
      title: "Subscribers",
      value: data.subscribers,
      icon: <Mail size={22} />,
    },
    {
      title: "Page Views Today",
      value: data.pageViews.today,
      icon: <Eye size={22} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-12 relative overflow-hidden">

      {/* Soft background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2FA8C7]/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="mb-12"
        >
          <span className="text-[#FEC300] font-bold tracking-widest uppercase text-sm">
            Analytics Overview
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-[#135E73] mt-4">
            Your <span className="font-bold">Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-xl font-light">
            Real-time insight into platform performance and user engagement.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-[#2FA8C7]/10 rounded-xl flex items-center justify-center text-[#135E73] mb-6 group-hover:bg-[#135E73] group-hover:text-white transition-colors">
                {card.icon}
              </div>

              <h3 className="text-sm text-gray-500 font-light">
                {card.title}
              </h3>

              <p className="text-3xl font-bold text-[#135E73] mt-2">
                {card.value}
              </p>
            </motion.div>
          ))}

        </div>

        {/* Performance Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-[#135E73] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FEC300]/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">

            <div>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-[#FEC300]" />
                <h2 className="text-2xl font-bold">
                  Growth Snapshot
                </h2>
              </div>

              <p className="text-white/70 font-light max-w-md">
                Engagement is increasing steadily. Monitor trends, optimize
                performance, and scale with confidence.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full md:w-64">
              <div className="text-xs uppercase text-white/60 mb-2">
                Engagement Rate
              </div>

              <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-3">
                <div className="h-full w-[75%] bg-[#FEC300]"></div>
              </div>

              <div className="text-sm text-white/80">
                75% positive interaction today
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
