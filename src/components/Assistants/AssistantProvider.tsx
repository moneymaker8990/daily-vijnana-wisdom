import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { SpiritualGuide } from '../Chat';
import { MeditationScreen } from '../Timer/MeditationScreen';
import type { SpiritualGuideLaunchContext } from '@lib/spiritualGuide';

type SpiritualGuideRequest = SpiritualGuideLaunchContext & {
  requestId: string;
};

type AssistantContextValue = {
  openMeditation: () => void;
  closeMeditation: () => void;
  openSpiritualGuide: (context?: SpiritualGuideLaunchContext) => void;
  closeSpiritualGuide: () => void;
};

const AssistantContext = createContext<AssistantContextValue | null>(null);

type AssistantProviderProps = {
  children: ReactNode;
};

function createRequestId() {
  return `guide_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function AssistantProvider({ children }: AssistantProviderProps) {
  const [showMeditation, setShowMeditation] = useState(false);
  const [showSpiritualGuide, setShowSpiritualGuide] = useState(false);
  const [guideRequest, setGuideRequest] = useState<SpiritualGuideRequest | null>(null);

  const closeMeditation = useCallback(() => {
    setShowMeditation(false);
  }, []);

  const closeSpiritualGuide = useCallback(() => {
    setShowSpiritualGuide(false);
    setGuideRequest(null);
  }, []);

  const openMeditation = useCallback(() => {
    setShowSpiritualGuide(false);
    setGuideRequest(null);
    setShowMeditation(true);
  }, []);

  const openSpiritualGuide = useCallback((context?: SpiritualGuideLaunchContext) => {
    setShowMeditation(false);
    setGuideRequest(
      context
        ? {
            ...context,
            requestId: createRequestId(),
          }
        : null
    );
    setShowSpiritualGuide(true);
  }, []);

  const value = useMemo<AssistantContextValue>(
    () => ({
      openMeditation,
      closeMeditation,
      openSpiritualGuide,
      closeSpiritualGuide,
    }),
    [closeMeditation, closeSpiritualGuide, openMeditation, openSpiritualGuide]
  );

  return (
    <AssistantContext.Provider value={value}>
      {children}

      {showMeditation && <MeditationScreen onClose={closeMeditation} />}
      {showSpiritualGuide && (
        <SpiritualGuide onClose={closeSpiritualGuide} launchContext={guideRequest} />
      )}
    </AssistantContext.Provider>
  );
}

export function useAssistants() {
  const context = useContext(AssistantContext);

  if (!context) {
    throw new Error('useAssistants must be used within an AssistantProvider');
  }

  return context;
}
