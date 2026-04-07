import { useEffect, useState } from 'react';

type VisualViewportState = {
  height: number;
  offsetTop: number;
  keyboardInset: number;
};

function getViewportState(): VisualViewportState {
  if (typeof window === 'undefined') {
    return {
      height: 0,
      offsetTop: 0,
      keyboardInset: 0,
    };
  }

  const viewport = window.visualViewport;
  const height = viewport?.height ?? window.innerHeight;
  const offsetTop = viewport?.offsetTop ?? 0;
  const keyboardInset = Math.max(0, window.innerHeight - (height + offsetTop));

  return {
    height,
    offsetTop,
    keyboardInset,
  };
}

export function useVisualViewport() {
  const [state, setState] = useState<VisualViewportState>(() => getViewportState());

  useEffect(() => {
    const updateViewport = () => {
      setState(getViewportState());
    };

    updateViewport();

    const viewport = window.visualViewport;

    window.addEventListener('resize', updateViewport);
    viewport?.addEventListener('resize', updateViewport);
    viewport?.addEventListener('scroll', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      viewport?.removeEventListener('resize', updateViewport);
      viewport?.removeEventListener('scroll', updateViewport);
    };
  }, []);

  return state;
}
