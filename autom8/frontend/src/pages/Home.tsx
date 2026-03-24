import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ minWidth: '1280px' }}>
      {/* Header */}
      <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
        <span className="text-sm font-semibold text-foreground">AutoM8</span>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: '#16a34a' }}
            aria-label="Backend connected"
          />
          <span className="text-xs text-muted-foreground">Backend connected</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-[480px] w-full flex flex-col items-center text-center">
          {/* Display */}
          <h1 className="text-[28px] font-semibold text-foreground leading-[1.1]">
            AutoM8
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            SentinelOne Hyperautomation Playbook Builder
          </p>

          {/* Spacer */}
          <div className="h-6" />

          {/* Placeholder heading */}
          <h2 className="text-xl font-semibold text-foreground">
            Select a scenario to get started
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            AutoM8 will guide you through building a valid SentinelOne workflow JSON — no JSON required.
          </p>

          {/* Spacer */}
          <div className="h-6" />

          {/* CTA */}
          <Button
            disabled
            className="opacity-40 cursor-not-allowed"
            title="Available in Phase 3"
          >
            Get Started
          </Button>
        </div>
      </main>
    </div>
  )
}
