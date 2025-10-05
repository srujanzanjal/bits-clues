import { useState, useEffect } from 'react';
import { FileCode, Lock, Unlock, AlertCircle, CheckCircle, X, ArrowLeft } from 'lucide-react';
import { Config } from '../types/config';

interface Stage3Props {
  config: Config['stage3'];
  onComplete: () => void;
  onBack: () => void;
}

interface EncryptedFile {
  id: string;
  name: string;
}

export default function Stage3({ config, onComplete, onBack }: Stage3Props) {
  const [files, setFiles] = useState<EncryptedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const shuffled = [...config.files].sort(() => Math.random() - 0.5);
    setFiles(shuffled.map((name, index) => ({ id: `file-${index}`, name })));
  }, [config.files]);

  const handleDecrypt = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.toUpperCase() !== config.file_password.toUpperCase()) {
      setError('Invalid decryption key');
      setPassword('');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (selectedFile === config.correct_filename) {
      setSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setError('Sorry — wrong file.');
      setSelectedFile(null);
      setPassword('');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FileCode size={48} className="text-cyan-400" />
          <h2 className="text-3xl font-bold glow-text-cyan">Stage 3</h2>
        </div>
        <p className="text-cyan-300/70 text-sm tracking-wider">
          ENCRYPTED FILE SYSTEM
        </p>
        <p className="text-cyan-100/60 mt-4 max-w-2xl mx-auto">
          Select and decrypt the correct file using the encoded answer from Stage 2
        </p>
        <div className="mt-6">
          <button
            onClick={onBack}
            disabled={success}
            className="inline-flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500 text-purple-300 font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={18} />
            Back to Stage 2
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 max-w-md mx-auto bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-center gap-3 animate-shake">
          <AlertCircle className="text-red-400" size={24} />
          <span className="text-red-300 font-bold">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-8 max-w-md mx-auto bg-green-500/20 border border-green-500 rounded-lg p-4 flex items-center gap-3 animate-pulse-slow">
          <CheckCircle className="text-green-400" size={24} />
          <span className="text-green-300 font-bold">File decrypted successfully! Loading Stage 4...</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 hover:glow-cyan transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Lock className="text-cyan-400" size={24} />
                </div>
                <div>
                  <p className="text-xs text-cyan-300/50 uppercase tracking-wider">
                    Encrypted
                  </p>
                  <p className="text-cyan-100 font-mono font-bold">{file.name}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-cyan-500/20 pt-4 mt-4">
              <div className="flex items-center gap-2 mb-3 text-xs text-cyan-300/70">
                <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse"></div>
                <span>LOCKED</span>
              </div>
              <button
                onClick={() => setSelectedFile(file.name)}
                disabled={success}
                className="w-full bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500 text-cyan-300 font-bold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Unlock size={16} />
                DECRYPT
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedFile && !success && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-magenta-500 rounded-xl p-8 max-w-md w-full glow-magenta animate-pulse-slow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-magenta-300">Decrypt File</h3>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPassword('');
                }}
                className="text-magenta-400 hover:text-magenta-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="bg-black/50 border border-magenta-500/30 rounded-lg p-4 mb-6">
              <p className="text-magenta-100 font-mono text-center text-lg">
                {selectedFile}
              </p>
            </div>

            <form onSubmit={handleDecrypt} className="space-y-6">
              <div>
                <label className="block text-magenta-300 text-sm mb-2 tracking-wide">
                  DECRYPTION KEY
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-magenta-500/50 rounded-lg px-4 py-3 text-magenta-100 focus:outline-none focus:border-magenta-400 focus:glow-magenta transition-all uppercase tracking-widest text-center"
                  placeholder="Enter password"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPassword('');
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-3 rounded-lg transition-all"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-magenta-600 to-magenta-500 hover:from-magenta-500 hover:to-magenta-400 text-white font-bold py-3 rounded-lg transition-all"
                >
                  DECRYPT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
