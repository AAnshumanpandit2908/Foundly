'use client';

import Component from '../../components/ui/cinematic-theme-switcher';

export default function ThemeDemoPage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#1d1e1f] transition-colors duration-700 ease-in-out">
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 transition-colors duration-700 ease-in-out">
        <h1 className="text-3xl font-bold dark:text-white">Theme Switcher Demo</h1>
        <Component />
      </div>
    </div>
  );
}
