'use client';

import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
  className?: string;
}

export default function ImageUploader({ onImageSelect, className }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onImageSelect(file, result);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const clearImage = useCallback(() => {
    setPreview(null);
    setError(null);
  }, []);

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              'relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300',
              isDragging
                ? 'border-indigo-600 bg-indigo-50/50 scale-[1.02]'
                : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50/50',
              error && 'border-red-400 bg-red-50/50'
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload image"
            />
            
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{ scale: isDragging ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'p-4 rounded-full mb-4',
                  isDragging ? 'bg-indigo-100' : 'bg-gray-100'
                )}
              >
                <Upload className={cn(
                  'w-8 h-8',
                  isDragging ? 'text-indigo-600' : 'text-gray-600'
                )} />
              </motion.div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                사진을 업로드하세요
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                클릭하거나 이미지를 드래그하여 업로드
              </p>
              <p className="text-xs text-gray-500">
                JPG, PNG, GIF, WEBP (최대 10MB)
              </p>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-red-600 font-medium"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={preview}
              alt="Uploaded preview"
              className="w-full h-auto max-h-[500px] object-contain bg-gray-100"
            />
            
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              aria-label="Remove image"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center text-white">
                <ImageIcon className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">이미지 업로드 완료</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}