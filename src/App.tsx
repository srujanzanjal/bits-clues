import { useState } from 'react';
import { Lock, Shield, FileCode, Brain, Loader2 } from 'lucide-react';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';
import Stage4 from './components/Stage4';
import { useConfig } from './hooks/useConfig';

function App() {
  const [currentStage, setCurrentStage] = useState(1);
  const { config, loading, error } = useConfig();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-cyan-400 mx-auto mb-4" size={48} />
          <p className="text-cyan-300">Loading configuration...</p>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>Failed to load configuration</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  const stages = [
    { number: 1, title: 'System Access', icon: Lock },
    { number: 2, title: 'Riddle', icon: Brain },
    { number: 3, title: 'Encrypted Files', icon: FileCode },
    { number: 4, title: 'Quiz', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-cyan-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-magenta-950/20"></div>

      <div className="relative z-10">
        <header className="border-b border-cyan-500/30 bg-black/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h1 className="text-4xl font-bold glow-text-cyan">
                BITS & CLUES
              </h1>
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem('bitsclues_stage4_result');
                    localStorage.removeItem('bitsclues_submissions');
                    localStorage.removeItem('bitsclues_team');
                  } catch {}
                  setCurrentStage(1);
                }}
                className="text-xs md:text-sm px-3 py-2 rounded border border-cyan-500/40 hover:border-cyan-400 bg-black/30"
                title="Clear saved progress and restart"
              >
                Reset Progress
              </button>
            </div>

            <div className="flex justify-center gap-2 md:gap-4">
              {stages.map((stage) => {
                const Icon = stage.icon;
                const isActive = currentStage === stage.number;
                const isCompleted = currentStage > stage.number;

                return (
                  <div
                    key={stage.number}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 border-cyan-500 glow-cyan'
                        : isCompleted
                        ? 'bg-green-500/20 border-green-500'
                        : 'bg-gray-800/30 border-gray-700'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="hidden md:inline text-sm font-medium">
                      {stage.title}
                    </span>
                    <span className="text-xs opacity-70">
                      {stage.number}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          {currentStage === 1 && <Stage1 config={config.stage1} onComplete={() => setCurrentStage(2)} />}
          {currentStage === 2 && <Stage2 config={config.stage2} onComplete={() => setCurrentStage(3)} />}
          {currentStage === 3 && <Stage3 config={config.stage3} onComplete={() => setCurrentStage(4)} onBack={() => setCurrentStage(2)} />}
          {currentStage === 4 && <Stage4 config={config.stage4} />}
        </main>

        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-magenta-500 to-purple-500 opacity-50"></div>
      </div>
    </div>
  );
}

export default App;
