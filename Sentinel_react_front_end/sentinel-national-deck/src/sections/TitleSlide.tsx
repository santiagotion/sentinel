import { Shield, Star, Globe, Zap, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export function TitleSlide() {
  const floatingElements = [
    { icon: Globe, delay: 0, x: -20, y: -30 },
    { icon: Zap, delay: 0.2, x: 30, y: -20 },
    { icon: Eye, delay: 0.4, x: -30, y: 20 },
  ];

  return (
    <section className="h-full flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-congo-blue/10 via-white to-congo-red/10">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0, 85, 164, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(220, 36, 31, 0.3) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.1, 
              scale: 1,
              x: [0, element.x, 0],
              y: [0, element.y, 0],
            }}
            transition={{
              delay: element.delay,
              duration: 0.8,
              x: { duration: 4, repeat: Infinity, repeatType: 'reverse' },
              y: { duration: 3, repeat: Infinity, repeatType: 'reverse' },
            }}
            className={`absolute ${
              index === 0 ? 'top-1/4 left-1/4' : 
              index === 1 ? 'top-1/3 right-1/4' : 
              'bottom-1/3 left-1/3'
            }`}
          >
            <element.icon className="w-16 h-16 text-congo-blue" />
          </motion.div>
        ))}
      </div>

      <div className="text-center px-6 relative z-10">
        {/* Main logo with pulsing animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          className="flex justify-center mb-8 relative"
        >
          <div className="relative">
            {/* Glowing ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border-2 border-congo-blue/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full border border-congo-red/20"
            />
            
            {/* Main shield with pulse */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10"
            >
              <Shield className="w-32 h-32 text-congo-blue drop-shadow-2xl" />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-3 -right-3"
              >
                <Star className="w-12 h-12 text-congo-yellow fill-current animate-pulse" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Main title with letter-by-letter animation */}
        <div className="mb-8">
          <motion.h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-wider">
            {"SENTINEL".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: 0.5 + index * 0.1, 
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4
                }}
                className="inline-block text-congo-blue hover:text-congo-red transition-colors duration-300"
                style={{ textShadow: '0 0 20px rgba(0, 85, 164, 0.5)' }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.5, duration: 1 }}
            className="h-1 bg-gradient-to-r from-congo-blue via-congo-yellow to-congo-red mx-auto max-w-md rounded-full"
          />
        </div>
        
        {/* Subtitle with typewriter effect */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-2xl md:text-4xl font-light text-gray-700 dark:text-gray-300 mb-12"
        >
          Système National de Protection de l'Information
        </motion.h2>
        
        {/* Info card with 3D transform */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 2.5, duration: 1, type: "spring" }}
          whileHover={{ 
            scale: 1.05, 
            rotateY: 5,
            boxShadow: "0 25px 50px rgba(0, 85, 164, 0.2)"
          }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto border border-congo-blue/20"
        >
          <motion.div
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl opacity-10"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0, 85, 164, 0.1), transparent)',
            }}
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-6 relative z-10"
          >
            Une capacité stratégique pour défendre la souveraineté numérique
          </motion.p>
          
          <motion.h3 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.2, duration: 0.6 }}
            className="text-2xl font-bold text-congo-red mb-4 relative z-10"
          >
            République Démocratique du Congo
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.4, duration: 0.8 }}
            className="text-gray-500 dark:text-gray-500 relative z-10"
          >
            Présentation au Gouvernement - {new Date().getFullYear()}
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-congo-blue text-sm font-medium"
          >
            Commencer la présentation ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}