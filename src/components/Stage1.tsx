import { useState } from 'react';
import { Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { Config } from '../types/config';

interface Stage1Props {
  config: Config['stage1'];
  onComplete: () => void;
}

export default function Stage1({ config, onComplete }: Stage1Props) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (passcode.toUpperCase() === config.passcode.toUpperCase()) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      setError(true);
      setPasscode('');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div
        className={`max-w-md w-full bg-gray-900/50 backdrop-blur-md border rounded-xl p-8 transition-all ${
          error ? 'animate-shake border-red-500' : success ? 'border-green-500 glow-cyan' : 'border-cyan-500/50'
        }`}
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Lock
              size={64}
              className={`transition-colors ${
                success ? 'text-green-400' : error ? 'text-red-400' : 'text-cyan-400'
              }`}
            />
            {success && (
              <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                <CheckCircle size={24} className="text-white" />
              </div>
            )}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 glow-text-cyan">
          Stage 1
        </h2>
        <p className="text-center text-cyan-300/70 mb-8 text-sm tracking-wider">
          SYSTEM ACCESS
        </p>

        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="text-red-400" size={20} />
            <span className="text-red-300 text-sm">ACCESS DENIED: Invalid passcode</span>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-500/20 border border-green-500 rounded-lg p-4 flex items-center gap-3 animate-pulse-slow">
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-green-300 text-sm">ACCESS GRANTED: Initializing...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-cyan-300 text-sm mb-2 tracking-wide">
              ENTER PASSCODE
            </label>
            <input
              type="text"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-black/50 border border-cyan-500/50 rounded-lg px-4 py-3 text-cyan-100 focus:outline-none focus:border-cyan-400 focus:glow-cyan transition-all uppercase tracking-widest text-center text-xl"
              placeholder="••••••"
              disabled={success}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={success}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-cyan"
          >
            {success ? 'ACCESS GRANTED' : 'AUTHENTICATE'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-cyan-500/20">
          <p className="text-xs text-center text-cyan-300/50 font-mono">
            SECURITY LEVEL: MAXIMUM
          </p>
        </div>
      </div>
    </div>
  );
}
