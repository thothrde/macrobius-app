import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Calendar, MapPin, BookOpen, Globe } from 'lucide-react';
import { ImageInfo } from '../../data/imageData';

interface ImageModalProps {
  imageInfo: ImageInfo | null;
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageInfo, isOpen, onClose, language }) => {
  if (!imageInfo) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'historical': return <Calendar className="w-4 h-4" />;
      case 'cultural': return <Globe className="w-4 h-4" />;
      case 'astronomical': return <MapPin className="w-4 h-4" />;
      case 'literary': return <BookOpen className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'historical': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      case 'cultural': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'astronomical': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      case 'literary': return 'text-green-400 border-green-400/30 bg-green-400/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl max-w-4xl mx-auto max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="relative">
              <Image
                src={imageInfo.src}
                alt={imageInfo.title}
                width={800}
                height={600}
                className="w-full h-auto max-h-96 object-contain rounded-t-2xl"
              />
              
              {/* Category Badge */}
              <div className={`absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium ${getCategoryColor(imageInfo.category)}`}>
                {getCategoryIcon(imageInfo.category)}
                <span className="ml-2 capitalize">{imageInfo.category}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Title and Subtitle */}
              <div>
                <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                  {imageInfo.title}
                </h2>
                {imageInfo.subtitle && (
                  <p className="text-lg text-yellow-300/90 font-medium">
                    {imageInfo.subtitle}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-white/90 leading-relaxed text-justify">
                {imageInfo.description}
              </p>

              {/* Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/20">
                {imageInfo.period && (
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-300 mb-1 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Zeitperiode
                    </h4>
                    <p className="text-white/80 text-sm">{imageInfo.period}</p>
                  </div>
                )}

                {imageInfo.source && (
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-300 mb-1 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Quelle
                    </h4>
                    <p className="text-white/80 text-sm">{imageInfo.source}</p>
                  </div>
                )}
              </div>

              {/* Cultural Context */}
              {imageInfo.culturalContext && (
                <div className="pt-4 border-t border-white/20">
                  <h4 className="text-sm font-semibold text-yellow-300 mb-2 flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Kultureller Kontext
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {imageInfo.culturalContext}
                  </p>
                </div>
              )}

              {/* Close Button */}
              <div className="pt-4 text-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/30 rounded-lg text-yellow-300 font-medium transition-all duration-300"
                >
                  Schließen
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;