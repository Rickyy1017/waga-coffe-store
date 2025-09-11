import React from 'react';

interface Web3BackgroundProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  pattern?: 'blockchain' | 'particles' | 'gradient';
}

export function Web3Background({ 
  children, 
  intensity = 'medium',
  pattern = 'blockchain'
}: Web3BackgroundProps) {
  const intensityClass = {
    low: 'opacity-10',
    medium: 'opacity-20',
    high: 'opacity-30'
  }[intensity];

  const patternClass = {
    blockchain: 'blockchain-pattern',
    particles: 'particles-container',
    gradient: 'web3-gradient'
  }[pattern];

  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className={`absolute inset-0 ${patternClass} ${intensityClass} -z-10`}>
        {pattern === 'particles' && (
          <>
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${Math.random() * 4 + 6}s`
                }}
              />
            ))}
          </>
        )}
        
        {pattern === 'blockchain' && (
          <div className="absolute inset-0 animate-blockchain">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-20" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Floating crypto elements */}
      <div className="absolute top-10 left-10 animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="crypto-coin eth w-6 h-6" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
