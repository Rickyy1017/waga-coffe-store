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
