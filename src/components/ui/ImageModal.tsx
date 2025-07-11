import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ImageInfo {
  id: string;
  src: string;
  title: string;
  subtitle?: string;
  description: string;
  culturalContext?: string;
  historicalPeriod?: string;
}

interface ImageModalProps {
  imageInfo: ImageInfo | null;
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

function ImageModal({ imageInfo, isOpen, onClose, language }: ImageModalProps) {
  if (!imageInfo) return null;

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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          <motion.div
            className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-4xl mx-auto border border-white/30 shadow-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white/80 hover:bg-white/30 transition-all duration-300 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                  {imageInfo.title}
                </h2>
                {imageInfo.subtitle && (
                  <p className="text-xl text-yellow-300/90 font-medium">
                    {imageInfo.subtitle}
                  </p>
                )}
              </div>

              <div className="relative w-full h-96 rounded-xl overflow-hidden">
                <Image
                  src={imageInfo.src}
                  alt={imageInfo.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                    📖 Beschreibung
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {imageInfo.description}
                  </p>
                </div>

                {imageInfo.culturalContext && (
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                      🏛️ Kultureller Kontext
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {imageInfo.culturalContext}
                    </p>
                  </div>
                )}

                {imageInfo.historicalPeriod && (
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                      ⏰ Historische Periode
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {imageInfo.historicalPeriod}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 bg-wine text-gold hover:bg-gold hover:text-wine"
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
}

export default ImageModal;