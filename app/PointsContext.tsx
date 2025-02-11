// PointsContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';

interface PointsContextProps {
  points: number;
  addPoints: (pointsToAdd: number) => void;
  unlockedBadges: string[];
  newBadges: string[];
  clearNewBadges: () => void;
  completedMissions: string[];
  completeMission: (missionId: string, missionPoints: number) => void;
}

export const PointsContext = createContext<PointsContextProps>({
  points: 0,
  addPoints: () => {},
  unlockedBadges: [],
  newBadges: [],
  clearNewBadges: () => {},
  completedMissions: [],
  completeMission: () => {},
});

interface PointsProviderProps {
  children: ReactNode;
}

export const PointsProvider: React.FC<PointsProviderProps> = ({ children }) => {
  const [points, setPoints] = useState<number>(0);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  // Define thresholds for badges (adjust thresholds and badge names as needed)
  const badgeThresholds: { [badgeName: string]: number } = {
    'Super Member': 100,
    'Traveller': 300,
    'Reviewer': 700,
  };

  // Function to add points
  const addPoints = (pointsToAdd: number) => {
    setPoints((prev) => prev + pointsToAdd);
  };

  // Global function to mark a mission as completed and award its points.
  // This function updates the global completedMissions array and then adds points.
  const completeMission = (missionId: string, missionPoints: number) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions((prev) => [...prev, missionId]);
      addPoints(missionPoints);
    }
  };

  // Check for badge unlocks whenever points change.
  useEffect(() => {
    const newlyUnlocked: string[] = Object.entries(badgeThresholds)
      .filter(([badgeName, threshold]) => points >= threshold && !unlockedBadges.includes(badgeName))
      .map(([badgeName]) => badgeName);

    if (newlyUnlocked.length > 0) {
      setUnlockedBadges((prev) => [...prev, ...newlyUnlocked]);
      setNewBadges((prev) => [...prev, ...newlyUnlocked]);
      // No alert here—popups can be handled in the Missions screen using newBadges.
    }
  }, [points]);

  // Function to clear the newBadges array after the pop-up has been shown.
  const clearNewBadges = () => {
    setNewBadges([]);
  };

  return (
    <PointsContext.Provider
      value={{
        points,
        addPoints,
        unlockedBadges,
        newBadges,
        clearNewBadges,
        completedMissions,
        completeMission,
      }}
    >
      {children}
    </PointsContext.Provider>
  );
};
