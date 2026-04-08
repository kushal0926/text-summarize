import { useEffect, useRef } from 'react'

export interface InputFormProps {
  text: string
  summaryLength: number
  isLoading: boolean
  onTextChange: (value: string) => void
  onSummaryLengthChange: (value: number) => void
  onSummarize: () => void
}

export default function InputForm({
  text,
  summaryLength,
  isLoading,
  onTextChange,
  onSummaryLengthChange,
  onSummarize,
}: InputFormProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [])

  const hasText = text.trim() !== ''
  const wordLabel = summaryLength === 1 ? 'word' : 'words'

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setTimeout(() => {
      if (textAreaRef.current) textAreaRef.current.scrollTop = 0
    }, 0)
    onTextChange(value)
  }

  return (
    <div className="bg-cream rounded-sm p-5 flex flex-col gap-3">
      <span className="text-l  text-gray-500 uppercase text-start orb">
        Input
      </span>

      <textarea
        ref={textAreaRef}
        placeholder="paste your text here…"
        aria-label="paste text here to summarize"
        value={text}
        onChange={handleTextChange}
        disabled={isLoading}
        className="
          w-full flex-1 min-h-40 resize-none
          border border-[#D3D1C7] rounded-sm
          bg-[#FCD9D3] p-3
          font-sans text-[0.9rem] text-ink
          placeholder-[#B38443]
          transition-colors duration-200
          focus:outline-none focus:border-[#9c9fe0]
          disabled:bg-[#F1EFE8] disabled:text-[#5F5E5A] disabled:cursor-not-allowed
        "
      />

      <div className={`flex items-center gap-3 ${!hasText ? 'opacity-50' : ''}`}>
        <span className="text-[0.6rem] font-bold text-[#5F5E5A] whitespace-nowrap tracking-[0.08em]">
          Length
        </span>
        <input
          type="range"
          min={1}
          max={100}
          value={summaryLength}
          step={1}
          aria-labelledby="summary-length-text"
          disabled={!hasText || isLoading}
          onChange={(e) => onSummaryLengthChange(Number(e.target.value))}
          className="
            flex-1 h-1.5 rounded-full appearance-none cursor-pointer
            bg-[#9c9fe0]
            disabled:bg-[#D3D1C7] disabled:cursor-not-allowed
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4.5
            [&::-webkit-slider-thumb]:h-4.5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-[#9c9fe0]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-colors
            disabled:[&::-webkit-slider-thumb]:bg-[#B38443]
            disabled:[&::-webkit-slider-thumb]:cursor-not-allowed
          "
        />
        <span
          id="summary-length-text"
          className="text-[0.65rem] font-bold text-[#9c9fe0] min-w-13 text-right whitespace-nowrap"
        >
          {summaryLength} {wordLabel}
        </span>
      </div>

      <button
        disabled={!hasText || isLoading}
        onClick={onSummarize}
        className="
          w-full py-3 px-4 rounded-sm
          font-[Orbitron,sans-serif] font-bold text-[0.72rem] tracking-[0.04em]
          bg-[#9c9fe0] text-[#0F0000]
          transition-all duration-200
          active:scale-[0.97] cursor-pointer
          hover:enabled:bg-[#8a8dd0]
          disabled:bg-[#D3D1C7] disabled:text-[#888780] disabled:cursor-not-allowed disabled:transform-none
        "
      >
        Summarize
      </button>
    </div>
  )
}