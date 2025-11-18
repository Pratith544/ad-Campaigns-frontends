'use client';

import { ChevronDown } from 'lucide-react';
import { CampaignStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

interface FilterDropdownProps {
  value: CampaignStatus;
  onChange: (value: CampaignStatus) => void;
}

const options: CampaignStatus[] = ['All', 'Active', 'Paused'];

export function FilterDropdown({ value, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:border-neutral-700"
      >
        Status: {value}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-40 rounded-lg border border-neutral-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:border-neutral-800 dark:bg-neutral-950 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={cn(
                  'block w-full px-4 py-2 text-left text-sm transition-colors',
                  value === option
                    ? 'bg-neutral-100 text-neutral-900 font-medium dark:bg-neutral-900 dark:text-neutral-100'
                    : 'text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900'
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
