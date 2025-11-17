'use client';

import { useState, useEffect } from 'react';
import SplashScreen from '../components/SplashScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import OnboardingScreen from '../components/OnboardingScreen';
import QuizScreen from '../components/QuizScreen';
import UploadScreen from '../components/UploadScreen';
import ResultScreen from '../components/ResultScreen';
import ProjectsScreen from '../components/ProjectsScreen';
import ProfileScreen from '../components/ProfileScreen';
import SettingsScreen from '../components/SettingsScreen';
import ClientAreaScreen from '../components/ClientAreaScreen';
import Navigation from '../components/Navigation';

export default function AppPage() {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [showNavigation, setShowNavigation] = useState(false);
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    
    const savedPreferences = localStorage.getItem('decorax_preferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }

    const hasSeenOnboarding = localStorage.getItem('decorax_onboarding_complete');
    if (hasSeenOnboarding) {
      setCurrentScreen('quiz');
      setShowNavigation(false);
    }
  }, []);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    
    if (['projects', 'profile', 'settings', 'client-area'].includes(screen)) {
      setShowNavigation(true);
    } else {
      setShowNavigation(false);
    }
  };

  const handleQuizComplete = (answers: Record<string, string>) => {
    setPreferences(answers);
    localStorage.setItem('decorax_preferences', JSON.stringify(answers));
    setCurrentScreen('upload');
  };

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setCurrentScreen('result');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#D4AF37] text-2xl font-bold animate-pulse">
          DecoraX Pro
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={() => setCurrentScreen('welcome')} />
      )}
      {currentScreen === 'welcome' && (
        <WelcomeScreen 
          onStart={() => setCurrentScreen('onboarding')}
          onClientArea={() => setCurrentScreen('client-area')}
        />
      )}
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={() => setCurrentScreen('quiz')} />
      )}
      {currentScreen === 'quiz' && (
        <QuizScreen onComplete={handleQuizComplete} />
      )}
      {currentScreen === 'upload' && (
        <UploadScreen onUpload={handleImageUpload} />
      )}
      {currentScreen === 'result' && (
        <ResultScreen 
          originalImage={uploadedImage} 
          preferences={preferences}
          onNewProject={() => setCurrentScreen('quiz')}
        />
      )}
      {currentScreen === 'projects' && (
        <ProjectsScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === 'profile' && (
        <ProfileScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === 'client-area' && (
        <ClientAreaScreen onBack={() => setCurrentScreen('quiz')} />
      )}

      {showNavigation && (
        <Navigation 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate} 
        />
      )}
    </div>
  );
}
