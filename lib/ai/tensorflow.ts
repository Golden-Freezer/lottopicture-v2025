import * as tf from '@tensorflow/tfjs';
import type { PredictionResult, ModelConfig } from '@/types';

export class LottoPredictor {
  private model: tf.LayersModel | null = null;
  private config: ModelConfig;

  constructor(config: ModelConfig) {
    this.config = config;
  }

  async loadModel(): Promise<void> {
    try {
      // Load the Teachable Machine model
      this.model = await tf.loadLayersModel(this.config.modelUrl + 'model.json');
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Failed to load model:', error);
      throw new Error('모델을 불러오는데 실패했습니다.');
    }
  }

  async predict(imageElement: HTMLImageElement): Promise<PredictionResult[]> {
    if (!this.model) {
      throw new Error('모델이 로드되지 않았습니다.');
    }

    try {
      // Preprocess the image
      const tensor = tf.browser
        .fromPixels(imageElement)
        .resizeNearestNeighbor([this.config.imageSize, this.config.imageSize])
        .expandDims(0)
        .toFloat()
        .div(255.0);

      // Make prediction
      const predictions = await this.model.predict(tensor) as tf.Tensor;
      const results = await predictions.data();
      
      // Clean up tensors
      tensor.dispose();
      predictions.dispose();

      // Map results to classes
      const classNames = this.generateClassNames();
      const predictionResults: PredictionResult[] = [];

      for (let i = 0; i < results.length; i++) {
        predictionResults.push({
          className: classNames[i],
          probability: results[i],
        });
      }

      // Sort by probability
      return predictionResults.sort((a, b) => b.probability - a.probability);
    } catch (error) {
      console.error('Prediction failed:', error);
      throw new Error('예측 중 오류가 발생했습니다.');
    }
  }

  private generateClassNames(): string[] {
    const classes: string[] = [];
    const letters = ['A', 'B', 'C', 'D', 'E'];
    
    for (const first of letters) {
      for (const second of letters) {
        classes.push(first + second);
        if (classes.length >= this.config.numClasses) {
          return classes;
        }
      }
    }
    
    return classes;
  }

  // Convert class names to lotto numbers
  static classToLottoNumber(className: string): number {
    // Map AA -> 1, AB -> 2, ... EI -> 45
    const firstChar = className.charCodeAt(0) - 65; // A=0, B=1, ...
    const secondChar = className.charCodeAt(1) - 65;
    return firstChar * 9 + secondChar + 1;
  }

  // Generate lotto numbers from predictions
  static generateLottoNumbers(predictions: PredictionResult[], count: number = 6): number[] {
    const numbers = new Set<number>();
    
    for (const prediction of predictions) {
      if (numbers.size >= count) break;
      
      const lottoNumber = this.classToLottoNumber(prediction.className);
      if (lottoNumber >= 1 && lottoNumber <= 45) {
        numbers.add(lottoNumber);
      }
    }

    // Fill with random numbers if needed
    while (numbers.size < count) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNum);
    }

    return Array.from(numbers).sort((a, b) => a - b);
  }

  dispose(): void {
    if (this.model) {
      this.model.dispose();
      this.model = null;
    }
  }
}