'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Share2, Download } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { LottoBallGroup } from './LottoBall';
import { LottoPredictor } from '@/lib/ai/tensorflow';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { LottoPrediction } from '@/types';

const MODEL_CONFIG = {
  modelUrl: process.env.NEXT_PUBLIC_TEACHABLE_MACHINE_MODEL_URL || '',
  imageSize: 224,
  numClasses: 45,
};

export default function LottoGenerator() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentPrediction, setCurrentPrediction] = useState<LottoPrediction | null>(null);
  const [predictor, setPredictor] = useState<LottoPredictor | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  
  const { isLoading, error, setLoading, setError, addPrediction } = useStore();

  // Initialize model
  useEffect(() => {
    const initModel = async () => {
      setIsModelLoading(true);
      try {
        const newPredictor = new LottoPredictor(MODEL_CONFIG);
        await newPredictor.loadModel();
        setPredictor(newPredictor);
      } catch (err) {
        console.error('Failed to initialize model:', err);
        setError('AI 모델을 불러오는데 실패했습니다.');
      } finally {
        setIsModelLoading(false);
      }
    };

    initModel();

    return () => {
      predictor?.dispose();
    };
  }, []);

  const handleImageSelect = useCallback((file: File, preview: string) => {
    setImageFile(file);
    setImagePreview(preview);
    setCurrentPrediction(null);
    setError(null);
  }, [setError]);

  const generateNumbers = useCallback(async () => {
    if (!imagePreview || !predictor) {
      setError('이미지를 먼저 업로드해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create image element
      const img = new Image();
      img.src = imagePreview;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Get predictions
      const predictions = await predictor.predict(img);
      const lottoNumbers = LottoPredictor.generateLottoNumbers(predictions);
      
      // Create prediction object
      const newPrediction: LottoPrediction = {
        numbers: lottoNumbers.map(value => ({ value })),
        confidence: predictions[0]?.probability || 0,
        timestamp: new Date(),
      };

      setCurrentPrediction(newPrediction);
      addPrediction(newPrediction);
    } catch (err) {
      console.error('Prediction failed:', err);
      setError('번호 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [imagePreview, predictor, setLoading, setError, addPrediction]);

  const reset = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setCurrentPrediction(null);
    setError(null);
  }, [setError]);

  const shareResult = useCallback(() => {
    if (!currentPrediction) return;

    const numbers = currentPrediction.numbers.map(n => n.value).join(', ');
    const text = `내 사진으로 생성한 로또번호: ${numbers}\n\n#로또픽처 #AI로또`;
    
    if (navigator.share) {
      navigator.share({
        title: 'LottoPicture - AI 로또번호',
        text,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다!');
    }
  }, [currentPrediction]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            AI 로또번호 생성기
          </motion.h1>
          <p className="text-gray-600">
            사진을 업로드하면 AI가 행운의 번호를 생성해드립니다
          </p>
        </div>

        {/* Image Upload Section */}
        {!imagePreview && (
          <ImageUploader onImageSelect={handleImageSelect} />
        )}

        {/* Image Preview & Generate Button */}
        {imagePreview && !currentPrediction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={imagePreview}
                alt="Selected"
                className="w-full h-auto max-h-[400px] object-contain bg-gray-100"
              />
              <button
                onClick={reset}
                className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors text-sm font-medium"
              >
                다른 사진 선택
              </button>
            </div>

            <motion.button
              onClick={generateNumbers}
              disabled={isLoading || isModelLoading}
              className={cn(
                'w-full py-4 px-8 rounded-xl font-semibold text-white shadow-lg transition-all',
                'bg-gradient-to-r from-indigo-600 to-purple-600',
                'hover:from-indigo-700 hover:to-purple-700',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'flex items-center justify-center gap-3'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>AI가 분석 중...</span>
                </>
              ) : isModelLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>AI 모델 로딩 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>행운의 번호 생성하기</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Results Section */}
        <AnimatePresence>
          {currentPrediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Result Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    당신의 행운 번호
                  </h2>
                  <p className="text-sm text-gray-600">
                    AI 신뢰도: {Math.round(currentPrediction.confidence * 100)}%
                  </p>
                </div>

                <div className="flex justify-center mb-8">
                  <LottoBallGroup
                    numbers={currentPrediction.numbers.map(n => n.value)}
                    size="lg"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={shareResult}
                    className="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2 text-gray-700 font-medium"
                  >
                    <Share2 className="w-4 h-4" />
                    공유하기
                  </button>
                  
                  <button
                    onClick={generateNumbers}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2 font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    다시 생성
                  </button>
                  
                  <button
                    onClick={reset}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium"
                  >
                    새 사진으로
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>💡 팁:</strong> 로또는 확률 게임입니다. 과도한 구매는 자제해주세요.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <p className="text-sm text-red-800">{error}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}