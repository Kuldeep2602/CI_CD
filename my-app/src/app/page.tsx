'use client';

import { useState, useEffect } from 'react';

// Types for our enhanced features
interface Theme {
  id: string;
  name: string;
  gradient: string;
  primaryColor: string;
  secondaryColor: string;
  emoji: string;
}

interface VirtualGift {
  id: string;
  name: string;
  emoji: string;
  description: string;
  animation: string;
}

interface ScheduledGreeting {
  id: string;
  recipientName: string;
  recipientEmail: string;
  birthdayDate: string;
  selectedTheme: string;
  selectedGift: string;
  customMessage: string;
  created: string;
}

export default function BirthdayWishes() {
  // Basic state
  const [name, setName] = useState('');
  const [showWish, setShowWish] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'create' | 'countdown' | 'schedule' | 'gallery'>('home');
  
  // Customization state
  const [selectedTheme, setSelectedTheme] = useState('classic');
  const [selectedFont, setSelectedFont] = useState('font-serif');
  const [selectedGift, setSelectedGift] = useState('cake');
  const [customMessage, setCustomMessage] = useState('');
  
  // Countdown state
  const [targetDate, setTargetDate] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Scheduling state
  const [recipientEmail, setRecipientEmail] = useState('');
  const [scheduledGreetings, setScheduledGreetings] = useState<ScheduledGreeting[]>([]);

  // Available themes
  const themes: Theme[] = [
    { id: 'classic', name: 'Classic', gradient: 'from-pink-400 via-purple-500 to-indigo-600', primaryColor: 'purple-600', secondaryColor: 'pink-500', emoji: '🎂' },
    { id: 'sunset', name: 'Sunset', gradient: 'from-orange-400 via-red-500 to-pink-600', primaryColor: 'red-600', secondaryColor: 'orange-500', emoji: '🌅' },
    { id: 'ocean', name: 'Ocean', gradient: 'from-blue-400 via-cyan-500 to-teal-600', primaryColor: 'blue-600', secondaryColor: 'cyan-500', emoji: '🌊' },
    { id: 'forest', name: 'Forest', gradient: 'from-green-400 via-emerald-500 to-teal-600', primaryColor: 'green-600', secondaryColor: 'emerald-500', emoji: '🌲' },
    { id: 'galaxy', name: 'Galaxy', gradient: 'from-purple-900 via-blue-900 to-indigo-900', primaryColor: 'purple-400', secondaryColor: 'blue-400', emoji: '🌌' },
    { id: 'rainbow', name: 'Rainbow', gradient: 'from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400', primaryColor: 'purple-600', secondaryColor: 'rainbow', emoji: '🌈' }
  ];

  // Available fonts
  const fonts = [
    { id: 'font-serif', name: 'Serif', class: 'font-serif' },
    { id: 'font-sans', name: 'Sans', class: 'font-sans' },
    { id: 'font-mono', name: 'Mono', class: 'font-mono' },
    { id: 'font-cursive', name: 'Cursive', class: 'font-bold italic' }
  ];

  // Virtual gifts
  const virtualGifts: VirtualGift[] = [
    { id: 'cake', name: 'Birthday Cake', emoji: '🎂', description: 'A delicious birthday cake', animation: 'animate-bounce' },
    { id: 'flowers', name: 'Flower Bouquet', emoji: '💐', description: 'Beautiful fresh flowers', animation: 'animate-pulse' },
    { id: 'balloon', name: 'Balloons', emoji: '🎈', description: 'Colorful party balloons', animation: 'animate-bounce' },
    { id: 'gift', name: 'Gift Box', emoji: '🎁', description: 'Mystery gift box', animation: 'animate-spin' },
    { id: 'diamond', name: 'Diamond', emoji: '💎', description: 'Sparkling diamond', animation: 'animate-ping' },
    { id: 'crown', name: 'Crown', emoji: '👑', description: 'Royal crown', animation: 'animate-pulse' },
    { id: 'heart', name: 'Love', emoji: '❤️', description: 'Pure love and affection', animation: 'animate-pulse' },
    { id: 'star', name: 'Shooting Star', emoji: '⭐', description: 'Make a wish!', animation: 'animate-ping' }
  ];

  // Load scheduled greetings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('scheduledGreetings');
    if (saved) {
      setScheduledGreetings(JSON.parse(saved));
    }
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (targetDate && currentView === 'countdown') {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const difference = target - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [targetDate, currentView]);

  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0];
  const currentGift = virtualGifts.find(g => g.id === selectedGift) || virtualGifts[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setShowWish(true);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    }
  };

  const resetWish = () => {
    setShowWish(false);
    setName('');
    setConfetti(false);
  };

  const scheduleGreeting = () => {
    if (name.trim() && recipientEmail.trim() && targetDate) {
      const newGreeting: ScheduledGreeting = {
        id: Date.now().toString(),
        recipientName: name,
        recipientEmail,
        birthdayDate: targetDate,
        selectedTheme,
        selectedGift,
        customMessage,
        created: new Date().toISOString()
      };
      
      const updated = [...scheduledGreetings, newGreeting];
      setScheduledGreetings(updated);
      localStorage.setItem('scheduledGreetings', JSON.stringify(updated));
      
      alert('🎉 Greeting scheduled successfully!');
      setCurrentView('gallery');
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient} flex flex-col relative overflow-hidden`}>
      {/* Navigation */}
      <nav className="relative z-20 p-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2">
          {[
            { id: 'home', label: '🏠 Home', icon: '🏠' },
            { id: 'create', label: '🎨 Customize', icon: '🎨' },
            { id: 'countdown', label: '⏰ Countdown', icon: '⏰' },
            { id: 'schedule', label: '📅 Schedule', icon: '📅' },
            { id: 'gallery', label: '🖼️ Gallery', icon: '🖼️' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as 'home' | 'create' | 'countdown' | 'schedule' | 'gallery')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-white/90 text-gray-800 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Confetti */}
      {confetti && (
        <div className="absolute inset-0 pointer-events-none z-30">
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

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-4xl">
          {currentView === 'home' && renderHomeView()}
          {currentView === 'create' && renderCreateView()}
          {currentView === 'countdown' && renderCountdownView()}
          {currentView === 'schedule' && renderScheduleView()}
          {currentView === 'gallery' && renderGalleryView()}
        </div>
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
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );

  // Render functions for different views
  function renderHomeView() {
    return !showWish ? (
      <div className="text-center">
        <div className={`bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-md mx-auto ${selectedFont}`}>
          <div className="text-6xl mb-4">{currentTheme.emoji}</div>
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
            </div>          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-2xl hover:scale-105 transform transition-all duration-200 shadow-lg text-lg"
          >
            Create Birthday Wish 🎂
          </button>
          </form>
          <div className="mt-6 text-sm text-gray-600">
            💡 Try the other tabs for more features!
          </div>
        </div>
      </div>
    ) : (
      <div className={`text-center ${selectedFont}`}>
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto">
          <div className={`text-6xl mb-4 ${currentGift.animation}`}>{currentGift.emoji}</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-pulse">
            Happy Birthday!
          </h1>
          <h2 className="text-3xl font-bold text-purple-800 mb-6">
            {name} 🎉
          </h2>
          <div className="space-y-4 text-gray-700 text-lg mb-8">
            {customMessage ? (
              <p className="animate-fade-in text-xl italic">
                {customMessage}
              </p>
            ) : (
              <>
                <p className="animate-fade-in">
                  🌟 May your special day be filled with happiness, love, and wonderful surprises!
                </p>
                <p className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  🎈 Wishing you a year ahead filled with joy, success, and amazing adventures!
                </p>
                <p className="animate-fade-in" style={{ animationDelay: '1s' }}>
                  🎁 Hope all your birthday dreams and wishes come true!
                </p>
              </>
            )}
          </div>
          <div className="mb-6">
            <div className="text-lg text-gray-600 mb-2">Your Virtual Gift:</div>
            <div className={`text-4xl ${currentGift.animation} inline-block`}>{currentGift.emoji}</div>
            <div className="text-sm text-gray-500 mt-2">{currentGift.description}</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetWish}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-6 rounded-2xl hover:scale-105 transform transition-all duration-200 shadow-lg"
            >
              Create Another Wish ✨
            </button>
            <button
              onClick={() => setConfetti(true)}
              className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold py-3 px-6 rounded-2xl hover:scale-105 transform transition-all duration-200 shadow-lg"
            >
              More Confetti! 🎊
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderCreateView() {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🎨 Customize Your Greeting</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customization Panel */}
          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Theme</h3>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedTheme === theme.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-full h-12 rounded-lg bg-gradient-to-r ${theme.gradient} mb-2`}></div>
                    <div className="text-sm font-medium">{theme.emoji} {theme.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Selection */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Font</h3>
              <div className="grid grid-cols-2 gap-3">
                {fonts.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setSelectedFont(font.class)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${font.class} ${
                      selectedFont === font.class
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Virtual Gift Selection */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Virtual Gift</h3>
              <div className="grid grid-cols-4 gap-3">
                {virtualGifts.map((gift) => (
                  <button
                    key={gift.id}
                    onClick={() => setSelectedGift(gift.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                      selectedGift === gift.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    title={gift.description}
                  >
                    <div className={`text-2xl ${gift.animation}`}>{gift.emoji}</div>
                    <div className="text-xs mt-1">{gift.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Custom Message</h3>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Add your personalized birthday message..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-800 resize-none"
                rows={4}
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Preview</h3>
            <div className={`bg-gradient-to-br ${currentTheme.gradient} rounded-xl p-6 text-white ${selectedFont}`}>
              <div className={`text-4xl mb-3 ${currentGift.animation}`}>{currentGift.emoji}</div>
              <div className="text-2xl font-bold mb-2">Happy Birthday!</div>
              <div className="text-xl mb-4">{name || 'Your Friend'} 🎉</div>
              {customMessage ? (
                <div className="text-sm italic">{customMessage}</div>
              ) : (
                <div className="text-sm">🌟 May your special day be filled with joy!</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentView('home')}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-8 rounded-2xl hover:scale-105 transform transition-all duration-200 shadow-lg"
          >
            Apply Customizations ✨
          </button>
        </div>
      </div>
    );
  }

  function renderCountdownView() {
    return (
      <div className="text-center">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">⏰ Birthday Countdown</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birthday Person&apos;s Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-800 text-center"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birthday Date & Time
              </label>
              <input
                type="datetime-local"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-800 text-center"
              />
            </div>

            {targetDate && (
              <div className="mt-8">
                <div className="text-lg font-medium text-gray-700 mb-4">
                  Time until {name || "the birthday"}:
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds }
                  ].map((item) => (
                    <div key={item.label} className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-4">
                      <div className="text-3xl font-bold">{item.value}</div>
                      <div className="text-sm font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>

                {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
                  <div className="mt-6 text-4xl animate-bounce text-yellow-600 font-bold">🎉 IT&apos;S BIRTHDAY TIME! 🎂</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function renderScheduleView() {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">📅 Schedule Greeting</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient&apos;s Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="recipient@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Birthday Date & Time
            </label>
            <input
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal Message
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Add a personal birthday message..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-800 resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-800"
              >
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.emoji} {theme.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Virtual Gift</label>
              <select
                value={selectedGift}
                onChange={(e) => setSelectedGift(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-800"
              >
                {virtualGifts.map((gift) => (
                  <option key={gift.id} value={gift.id}>
                    {gift.emoji} {gift.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={scheduleGreeting}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-2xl hover:scale-105 transform transition-all duration-200 shadow-lg"
          >
            📅 Schedule Greeting
          </button>

          <div className="text-sm text-gray-600 text-center">
            💡 Scheduled greetings are stored locally in your browser
          </div>
        </div>
      </div>
    );
  }

  function renderGalleryView() {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🖼️ Scheduled Greetings Gallery</h2>
        
        {scheduledGreetings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <div className="text-xl text-gray-600 mb-4">No scheduled greetings yet</div>
            <div className="text-gray-500">Use the Schedule tab to create your first automated greeting!</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scheduledGreetings.map((greeting) => {
              const theme = themes.find(t => t.id === greeting.selectedTheme) || themes[0];
              const gift = virtualGifts.find(g => g.id === greeting.selectedGift) || virtualGifts[0];
              const birthDate = new Date(greeting.birthdayDate);
              const isUpcoming = birthDate > new Date();
              
              return (
                <div key={greeting.id} className="border rounded-xl p-6 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{theme.emoji}</span>
                      <div>
                        <div className="font-semibold">{greeting.recipientName}</div>
                        <div className="text-sm text-gray-500">{greeting.recipientEmail}</div>
                      </div>
                    </div>
                    <div className={`text-2xl ${gift.animation}`}>{gift.emoji}</div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Birthday:</strong> {birthDate.toLocaleDateString()} at {birthDate.toLocaleTimeString()}
                  </div>
                  
                  <div className={`inline-block px-3 py-1 rounded-full text-sm ${
                    isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isUpcoming ? '⏰ Scheduled' : '✅ Past'}
                  </div>
                  
                  {greeting.customMessage && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 italic">&ldquo;{greeting.customMessage}&rdquo;</div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => {
                      const updated = scheduledGreetings.filter(g => g.id !== greeting.id);
                      setScheduledGreetings(updated);
                      localStorage.setItem('scheduledGreetings', JSON.stringify(updated));
                    }}
                    className="mt-4 text-red-500 hover:text-red-700 text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
