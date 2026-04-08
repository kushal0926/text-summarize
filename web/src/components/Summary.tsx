'use client'

import { useEffect, useRef, useState } from 'react'

const FEEDBACK_DISPLAY_TIME = 3000

type CopyStatus = 'idle' | 'success' | 'failure'

export interface SummaryProps {
  summary: string
  isLoading: boolean
  error: string | null
  onClear: () => void
  onDismissError: () => void
}

export default function Summary({
  summary,
  isLoading,
  error,
  onClear,
  onDismissError,
}: SummaryProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  const hasSummary = summary.trim() !== ''
  const showTextarea = !isLoading && !error

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopyStatus('success')
    } catch {
      setCopyStatus('failure')
    } finally {
      copyTimerRef.current = setTimeout(() => setCopyStatus('idle'), FEEDBACK_DISPLAY_TIME)
    }
  }

  const copyLabel =
    copyStatus === 'success' ? '😄 Copied' : copyStatus === 'failure' ? '😔 Failed' : 'Copy'

  return (
    <div className="bg-cream rounded-sm p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[0.6rem] font-bold tracking-[0.12em] text-[#5F5E5A] uppercase">
          Summary
        </span>
        {copyStatus === 'success' && (
          <span className="text-[0.6rem] font-bold text-[#0F6E56] bg-[#E1F5EE] rounded-md px-2 py-0.5 tracking-[0.06em]">
            Copied!
          </span>
        )}
      </div>

      {/* Output wrap */}
      <div className="relative flex-1 min-h-40 flex flex-col">
        {/* Summary textarea */}
        {showTextarea && (
          <textarea
            placeholder="Your summary will appear here…"
            aria-label="Summary of text"
            value={summary}
            disabled={!hasSummary}
            readOnly
            className="
              w-full h-full flex-1 min-h-40 resize-none
              border border-[#D3D1C7] rounded-sm
              bg-white p-3
              font-sans text-[0.9rem] text-[#0F0000]
              placeholder-[#B38443]
              focus:outline-none focus:border-[#9c9fe0]
              disabled:bg-[#F1EFE8] disabled:text-[#5F5E5A] disabled:cursor-not-allowed
            "
          />
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div
            aria-live="polite"
            className="absolute inset-0 z-20 bg-white/90 rounded-sm flex flex-col items-center justify-center gap-2"
          >
            <div
              className="w-8 h-8 rounded-full border-[3px] border-[#9c9fe0] animate-spin"
              style={{ borderTopColor: 'transparent' }}
            />
            <span className="text-[0.62rem] font-bold text-[#9c9fe0] tracking-widest">
              Summarizing…
            </span>
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div
            aria-live="assertive"
            className="absolute inset-0 z-30 bg-white/95 rounded-sm flex flex-col items-center justify-center p-4"
          >
            <div className="w-full bg-[#FCEBEB] border border-[#F09595] rounded-sm px-4 py-3 text-[0.72rem] text-[#A32D2D] leading-relaxed font-sans wrap-break-word">
              {error}
            </div>
            <button
              onClick={onDismissError}
              className="
                mt-2 w-full py-3 px-4 rounded-sm
                bg-transparent text-[#A32D2D] border border-[#F09595]
                font-[Orbitron,sans-serif] font-bold text-[0.72rem] tracking-[0.04em]
                hover:bg-[#FCEBEB] transition-colors duration-200
                cursor-pointer active:scale-[0.97]
              "
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Button row */}
      <div className="flex gap-2">
        <button
          disabled={!hasSummary || isLoading}
          onClick={handleCopy}
          className={`
            flex-1 py-3 px-4 rounded-sm
            font-[Orbitron,sans-serif] font-bold text-[0.72rem] tracking-[0.04em]
            border transition-all duration-200
            active:scale-[0.97] cursor-pointer
            disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
            ${
              copyStatus === 'success'
                ? 'bg-[#E1F5EE] text-[#0F6E56] border-[#0F6E56]'
                : copyStatus === 'failure'
                  ? 'bg-[#FCEBEB] text-[#A32D2D] border-[#F09595]'
                  : 'bg-[rgba(159,87,10,0.1)] text-[#9c9fe0] border-[#9c9fe0] hover:bg-[rgba(159,87,10,0.18)]'
            }
          `}
        >
          {copyLabel}
        </button>

        <button
          disabled={!hasSummary && !error}
          onClick={onClear}
          className="
            flex-1 py-3 px-4 rounded-sm
            font-[Orbitron,sans-serif] font-bold text-[0.72rem] tracking-[0.04em]
            bg-[rgba(159,87,10,0.1)] text-[#9c9fe0] border border-[#9c9fe0]
            hover:bg-[rgba(159,87,10,0.18)] transition-all duration-200
            active:scale-[0.97] cursor-pointer
            disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
          "
        >
          Clear
        </button>
      </div>
    </div>
  )
}