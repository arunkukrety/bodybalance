import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { setUserData, calculateBMI } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    height: '',
    weight: '',
    targetWeight: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const bmi = calculateBMI(parseFloat(formData.weight), parseFloat(formData.height));
    setUserData({
      ...formData,
      bmi,
      initialWeight: formData.weight,
      dateJoined: new Date().toISOString()
    });
    navigate('/home');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#121212] to-[#1e1e2f]">
      {/* Subtle background animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="background-circle circle-top-left pulse"></div>
          <div className="background-circle circle-bottom-right pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* App Name */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            BodySync
          </motion.h1>
          
          {/* Tagline */}
          <motion.h2
            className="text-2xl md:text-3xl text-gray-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Track your journey. Celebrate every gram.
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            An aesthetic, private, and interactive weight tracker built just for you.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full max-w-4xl"
          >
            <form onSubmit={handleSubmit} className="card-glass p-8 space-y-8 green-tint-gradient animate-scale-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2 group">
                  <label className="text-left block text-white text-sm transition-colors group-hover:text-primary">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-white bg-secondary rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/60 hover:bg-white/10 hover:border-primary/30"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-left block text-white text-sm transition-colors group-hover:text-primary">Height</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="w-full px-4 py-3 text-white bg-secondary rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/60 hover:bg-white/10 hover:border-primary/30"
                      placeholder="Enter height"
                    />
                    <span className="absolute right-4 top-3 text-muted-foreground">cm</span>
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-left block text-white text-sm transition-colors group-hover:text-primary">Current Weight</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full px-4 py-3 text-white bg-secondary rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/60 hover:bg-white/10 hover:border-primary/30"
                      placeholder="Enter weight"
                    />
                    <span className="absolute right-4 top-3 text-muted-foreground">kg</span>
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-left block text-white text-sm transition-colors group-hover:text-primary">Target Weight</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.targetWeight}
                      onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                      className="w-full px-4 py-3 text-white bg-secondary rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/60 hover:bg-white/10 hover:border-primary/30"
                      placeholder="Enter target weight"
                    />
                    <span className="absolute right-4 top-3 text-muted-foreground">kg</span>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  className="px-8 py-4 bg-green-700 hover:cursor-pointer text-white font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-primary/90"
                >
                  Start Your Journey
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;