import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to Korean style
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// Validate lotto number
export function isValidLottoNumber(num: number): boolean {
  return num >= 1 && num <= 45;
}

// Generate random lotto numbers
export function generateRandomNumbers(count: number = 6): number[] {
  const numbers = new Set<number>();
  
  while (numbers.size < count) {
    const num = Math.floor(Math.random() * 45) + 1;
    numbers.add(num);
  }
  
  return Array.from(numbers).sort((a, b) => a - b);
}

// Format number with leading zero
export function formatNumber(num: number): string {
  return num.toString().padStart(2, '0');
}

// Get ball color based on number range
export function getBallColor(num: number): string {
  if (num <= 10) return 'bg-yellow-400';
  if (num <= 20) return 'bg-blue-400';
  if (num <= 30) return 'bg-red-400';
  if (num <= 40) return 'bg-gray-600';
  return 'bg-green-400';
}

// Compress image for upload
export async function compressImage(file: File, maxWidth: number = 800): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          0.8
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
}