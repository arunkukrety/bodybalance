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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="background-circle circle-top-left pulse"></div>
          <div className="background-circle circle-bottom-right pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-16 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* App Name */}
          <motion.h1
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            BodyBalance
          </motion.h1>
          
          {/* Tagline */}
          <motion.h2
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-gray-300 mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Track your journey. Celebrate every gram.
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            className="text-base xs:text-lg sm:text-xl md:text-xl text-gray-400 max-w-xs xs:max-w-sm sm:max-w-xl mb-6 sm:mb-12 px-2"
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
            className="w-full max-w-[95vw] xs:max-w-md sm:max-w-2xl md:max-w-4xl"
          >
            <form
              onSubmit={handleSubmit}
              className="card-glass p-4 xs:p-6 sm:p-8 space-y-6 sm:space-y-8 green-tint-gradient animate-scale-in rounded-2xl shadow-lg border border-white/10 backdrop-blur-md"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 sm:gap-6">
                <div className="space-y-2 group">
                  <label className="text-left block text-white text-sm transition-colors group-hover:text-primary">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-white bg-secondary rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/60 hover:bg-white/10 hover:border-primary/30 text-base"
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
                      className="w-full px-4 py-3 text-white bg-secondary rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/60 hover:bg-white/10 hover:border-primary/30 text-base"
                      placeholder="Enter height"
                    />
                    <span className="absolute right-4 top-3 text-muted-foreground text-xs sm:text-sm">cm</span>
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
                      className="w-full px-4 py-3 text-white bg-secondary rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/60 hover:bg-white/10 hover:border-primary/30 text-base"
                      placeholder="Enter weight"
                    />
                    <span className="absolute right-4 top-3 text-muted-foreground text-xs sm:text-sm">kg</span>
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
                      className="w-full px-4 py-3 text-white bg-secondary rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-white/60 hover:bg-white/10 hover:border-primary/30 text-base"
                      placeholder="Enter target weight"
                    />
                    <span className="absolute right-4 top-3 text-muted-foreground text-xs sm:text-sm">kg</span>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex justify-center"
              >
                <button
                  type="submit"
                  className="w-full xs:w-auto px-8 py-4 bg-green-700 hover:cursor-pointer text-white font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-primary/90 text-base"
                >
                  Start Your Journey
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
      {/* Responsive background circle styles */}
      <style>
        {`
          .background-circle {
            position: absolute;
            border-radius: 50%;
            filter: blur(60px);
            opacity: 0.5;
          }
          .circle-top-left {
            top: -120px;
            left: -120px;
            width: 300px;
            height: 300px;
            background: linear-gradient(135deg, #16a34a 0%, #22d3ee 100%);
          }
          .circle-bottom-right {
            bottom: -120px;
            right: -120px;
            width: 300px;
            height: 300px;
            background: linear-gradient(135deg, #f472b6 0%, #a78bfa 100%);
          }
          @media (max-width: 640px) {
            .circle-top-left, .circle-bottom-right {
              width: 180px;
              height: 180px;
              top: -60px;
              left: -60px;
              bottom: -60px;
              right: -60px;
            }
          }
          .pulse {
            animation: pulse 4s infinite alternate;
          }
          @keyframes pulse {
            0% { opacity: 0.4; transform: scale(1);}
            100% { opacity: 0.7; transform: scale(1.1);}
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;