import Link from 'next/link';
import { TrendingUp, BarChart3, Target, Zap } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <nav className="border-b border-neutral-200 bg-white/80 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-neutral-900 p-2 dark:bg-neutral-100">
                <TrendingUp className="h-5 w-5 text-white dark:text-neutral-900" />
              </div>
              <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Grippi
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/campaigns"
                className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                View Campaigns
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
              <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Campaign Analytics Dashboard
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl dark:text-neutral-100">
              Monitor your campaigns
              <br />
              <span className="bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-100 dark:to-neutral-400">
                with precision
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              Track performance metrics, analyze campaign data, and make informed
              decisions with real-time insights. Everything you need to optimize
              your advertising strategy.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/campaigns"
                className="group inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-neutral-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                View Campaigns
                <BarChart3 className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-3">
            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700">
              <div className="rounded-full bg-blue-50 p-3 w-fit dark:bg-blue-500/10">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Real-time Tracking
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Monitor clicks, impressions, and costs as they happen with
                live campaign data.
              </p>
            </div>

            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700">
              <div className="rounded-full bg-emerald-50 p-3 w-fit dark:bg-emerald-500/10">
                <BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Detailed Analytics
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Get comprehensive insights with metrics formatted for easy
                understanding and comparison.
              </p>
            </div>

            <div className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700">
              <div className="rounded-full bg-violet-50 p-3 w-fit dark:bg-violet-500/10">
                <TrendingUp className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Smart Filtering
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Filter campaigns by status to focus on what matters most to
                your business goals.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} Grippi Campaign Analytics. Built with Next.js.
          </p>
        </div>
      </footer>
    </div>
  );
}
