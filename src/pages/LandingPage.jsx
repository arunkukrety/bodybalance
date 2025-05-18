import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const LandingPage = () => {
//   const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleGetStarted = () => {
    setIsAnimating(true);
    // Navigate after animation completes
    // setTimeout(() => {
    //   navigate('/dashboard');
    // }, 1000); // Match this with animation duration
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

      {/* Full screen transition animation */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-full bg-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 20 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
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
          
          {/* Get Started Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              onClick={handleGetStarted} 
              size="lg"
              className="bg-primary text-white px-8 py-6 rounded-xl text-lg font-medium shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] transition-all duration-300 animate-glow"
            >
              <span>Get Started</span>
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;