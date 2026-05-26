'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { MOCK_CATEGORIES } from '@/lib/data/mock';
import { useUserStore } from '@/stores/userStore';

export default function SuggestPage() {
  const { initDemoUser, profile } = useUserStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) {
      initDemoUser();
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <TopBar />
        <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="h-16 w-16 rounded-full bg-teal/20 flex items-center justify-center mb-4"
          >
            <Check className="h-8 w-8 text-teal" />
          </motion.div>
          <h2 className="font-sora text-xl font-bold text-white mb-2">Suggestion Submitted!</h2>
          <p className="text-slate-400">Our team will review your market idea.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-4 lg:p-6 max-w-lg mx-auto w-full"
      >
        <h1 className="font-sora text-2xl font-bold text-white mb-2">Suggest a Market</h1>
        <p className="text-slate-400 text-sm mb-6">What event should Georgia be predicting on?</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Market Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Will X happen by Y date?"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-600 focus:border-teal/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe the event and how it should be resolved..."
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-slate-600 focus:border-teal/50 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Category</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg bg-elevated border border-white/10 px-4 py-3 text-white focus:border-teal/50 focus:outline-none"
            >
              <option value="">Select category</option>
              {MOCK_CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" size="lg" className="w-full">
            {profile ? 'Submit Suggestion' : 'Sign in & Submit'}
          </Button>
        </form>
      </motion.main>
    </>
  );
}
