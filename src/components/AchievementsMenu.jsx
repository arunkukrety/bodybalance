import React, { useState } from 'react';
import { achievements } from '../data/achievements';

export const AchievementsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const completedCount = achievements.filter(a => a.completed).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="card-glass p-4 hover:bg-white/5 transition-colors rounded-lg w-full text-left flex justify-between items-center"
      >
        <span className="text-lg font-semibold text-white">Achievements</span>
        <span className="text-muted-foreground">{completedCount}/{achievements.length}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-80 card-glass rounded-lg p-4 z-50 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  achievement.completed ? 'bg-success/10 border border-success/20' : 'bg-white/5'
                }`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  achievement.completed ? 'bg-success/20' : 'bg-white/10'
                }`}>
                  <span className="text-lg">{achievement.icon}</span>
                </div>
                <div>
                  <p className={`font-medium ${
                    achievement.completed ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {achievement.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
                {achievement.completed && (
                  <span className="ml-auto text-xs bg-success/20 text-success px-2 py-1 rounded-full">
                    Completed
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
