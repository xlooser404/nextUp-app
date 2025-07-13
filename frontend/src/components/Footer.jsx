import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="w-full"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          
          {/* Copyright Information - Text color updated */}
          <p className="text-sm text-white mb-4 md:mb-0">
            © {new Date().getFullYear()} nextUP. All Rights Reserved.
          </p>

          {/* Social Media Links - Text and hover colors updated */}
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>

        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;