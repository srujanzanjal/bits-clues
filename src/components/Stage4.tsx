import { useState } from 'react';
import { Shield, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { Config } from '../types/config';

interface Stage4Props {
  config: Config['stage4'];
}

export default function Stage4({ config }: Stage4Props) {
  const questions = config.quiz;
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  if (submitted) {
    const percentage = (score / questions.length) * 100;
    const isPerfect = score === questions.length;

    return (
      <div className="max-w-2xl mx-auto">
        <div className={`bg-gray-900/50 backdrop-blur-md border rounded-xl p-8 ${
          isPerfect ? 'border-green-500 glow-cyan' : 'border-purple-500/50'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy size={64} className={isPerfect ? 'text-green-400' : 'text-purple-400'} />
          </div>

          <h2 className="text-4xl font-bold text-center mb-4 glow-text-cyan">
            {isPerfect ? 'PERFECT SCORE!' : 'QUIZ COMPLETE'}
          </h2>

          <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-8 mb-6">
            <div className="text-center">
              <p className="text-cyan-300/70 text-sm mb-2">YOUR SCORE</p>
              <p className="text-6xl font-bold text-cyan-100 mb-2">
                {score}/{questions.length}
              </p>
              <p className="text-2xl text-cyan-300">
                {percentage.toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {questions.map((q) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`bg-black/30 border rounded-lg p-4 ${
                    isCorrect ? 'border-green-500/50' : 'border-red-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                    ) : (
                      <XCircle className="text-red-400 mt-1 flex-shrink-0" size={20} />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-cyan-100 mb-2">{q.question}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className={`px-2 py-1 rounded ${
                          isCorrect ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          Your answer: {q.choices[userAnswer]}
                        </span>
                        {!isCorrect && (
                          <span className="px-2 py-1 rounded bg-green-500/20 text-green-300">
                            Correct: {q.choices[q.correctIndex]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-gradient-to-r from-purple-600 to-magenta-600 hover:from-purple-500 hover:to-magenta-500 text-white font-bold py-3 rounded-lg transition-all glow-purple"
          >
            RETAKE QUIZ
          </button>

          <div className="mt-6 pt-6 border-t border-cyan-500/20 text-center">
            <p className="text-cyan-300/70 text-sm">
              {isPerfect
                ? 'Congratulations! You have mastered all stages!'
                : 'Challenge complete! Review your answers above.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield size={48} className="text-purple-400" />
          <h2 className="text-3xl font-bold glow-text-magenta">Stage 4</h2>
        </div>
        <p className="text-purple-300/70 text-sm tracking-wider">FINAL CHALLENGE</p>
        <p className="text-purple-100/60 mt-4">
          Test your knowledge of logic gates and boolean algebra
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="bg-gray-900/50 backdrop-blur-md border border-purple-500/30 rounded-xl p-6 hover:border-purple-400 transition-all"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/50">
                <span className="text-2xl font-bold text-purple-300">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-purple-100 mb-4 leading-relaxed">
                  {q.question}
                </h3>
                <div className="space-y-3">
                  {q.choices.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                        answers[q.id] === optionIndex
                          ? 'bg-cyan-500/20 border border-cyan-500'
                          : 'bg-black/30 border border-purple-500/20 hover:border-purple-500/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === optionIndex}
                        onChange={() => handleAnswerChange(q.id, optionIndex)}
                        className="w-5 h-5 text-cyan-500 focus:ring-cyan-500 focus:ring-2"
                      />
                      <span className={`text-sm ${
                        answers[q.id] === optionIndex ? 'text-cyan-100 font-bold' : 'text-purple-200'
                      }`}>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== questions.length}
          className="bg-gradient-to-r from-purple-600 to-magenta-600 hover:from-purple-500 hover:to-magenta-500 text-white font-bold py-4 px-12 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-purple text-lg"
        >
          SUBMIT ANSWERS
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-purple-300/50 text-sm">
          {Object.keys(answers).length}/{questions.length} questions answered
        </p>
      </div>
    </div>
  );
}
