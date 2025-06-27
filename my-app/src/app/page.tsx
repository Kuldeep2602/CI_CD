'use client';

import { useState, useEffect } from 'react';

export default function BirthdayWishes() {
  const [name, setName] = useState('');
  const [showWish, setShowWish] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setShowWish(true);
      setConfetti(true);
      // Stop confetti after 3 seconds
      setTimeout(() => setConfetti(false), 3000);
    }
  };

  const resetWish = () => {
    setShowWish(false);
    setName('');
    setConfetti(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Confetti */}
      {confetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-bounce ${
                ['bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-red-400'][i % 5]
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 text-center">
        {!showWish ? (
          // Input Form
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🎉</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Birthday Wishes
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter the birthday person's name"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-gray-800 text-center text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg text-lg"
              >
                Create Birthday Wish 🎂
              </button>
            </form>
          </div>
        ) : (
          // Birthday Wish Display
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto">
            <div className="text-6xl mb-4 animate-bounce">🎂</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-pulse">
              Happy Birthday!
            </h1>
            <h2 className="text-3xl font-bold text-purple-600 mb-6">
              {name} 🎉
            </h2>
            <div className="space-y-4 text-gray-700 text-lg mb-8">
              <p className="animate-fade-in">
                🌟 May your special day be filled with happiness, love, and wonderful surprises!
              </p>
              <p className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                🎈 Wishing you a year ahead filled with joy, success, and amazing adventures!
              </p>
              <p className="animate-fade-in" style={{ animationDelay: '1s' }}>
                🎁 Hope all your birthday dreams and wishes come true!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetWish}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-6 rounded-2xl hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Create Another Wish ✨
              </button>
              <button
                onClick={() => setConfetti(true)}
                className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-3 px-6 rounded-2xl hover:from-yellow-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                More Confetti! 🎊
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
