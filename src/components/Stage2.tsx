import { Brain, ArrowRight } from 'lucide-react';
import { Config } from '../types/config';

interface Stage2Props {
  config: Config['stage2'];
  onComplete: () => void;
}

export default function Stage2({ config, onComplete }: Stage2Props) {
  const conversionLines = config.conversion_table.split('\n');
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="max-w-4xl w-full space-y-6">
        <div className="bg-gray-900/50 backdrop-blur-md border border-magenta-500/50 rounded-xl p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain size={48} className="text-magenta-400" />
            <h2 className="text-3xl font-bold glow-text-magenta">
              Stage 2
            </h2>
          </div>

          <p className="text-center text-magenta-300/70 mb-8 text-sm tracking-wider">
            LOGICAL RIDDLE
          </p>

          <div className="bg-black/50 border border-magenta-500/30 rounded-lg p-8 mb-6">
            <p className="text-2xl text-center text-magenta-100 leading-relaxed">
              "{config.riddle}"
            </p>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-magenta-500/50"></div>
            <span className="px-4 text-magenta-400 text-sm">CONVERSION TABLE</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-magenta-500/50"></div>
          </div>

          <div className="bg-black/70 border border-cyan-500/30 rounded-lg p-6 font-mono text-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-cyan-300">
              {conversionLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-md border border-purple-500/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
            <span className="text-2xl">→</span>
            Hint
          </h3>
          <div className="space-y-3 text-purple-100/80">
            <p className="leading-relaxed">
              Use the conversion table to encode your answer. The encoded result is the correct file name in Stage 3.
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={onComplete}
              className="group bg-gradient-to-r from-magenta-600 to-purple-600 hover:from-magenta-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-lg transition-all glow-magenta flex items-center gap-3"
            >
              PROCEED TO STAGE 3
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
