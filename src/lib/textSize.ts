import { STORAGE_KEYS } from '@lib/constants';

export type TextSize = 'small' | 'medium' | 'large';

export function getTextSize(): TextSize {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TEXT_SIZE);
    if (stored && ['small', 'medium', 'large'].includes(stored)) {
      return stored as TextSize;
    }
    return 'medium';
  } catch {
    return 'medium';
  }
}

export function setTextSize(size: TextSize): void {
  localStorage.setItem(STORAGE_KEYS.TEXT_SIZE, size);
}

export const textSizeClasses: Record<TextSize, { body: string; heading: string }> = {
  small: {
    body: 'text-xs md:text-sm',
    heading: 'text-lg md:text-xl',
  },
  medium: {
    body: 'text-sm md:text-base',
    heading: 'text-xl md:text-2xl',
  },
  large: {
    body: 'text-base md:text-lg',
    heading: 'text-2xl md:text-3xl',
  },
};








