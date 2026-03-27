import Image from "next/image";

export default function OutputTextarea() {
  return (
    <section id="summary-output-section" className="flex flex-col w-full">
      <div id="summary-content" className="flex flex-col z-1">
        <textarea
          id="summary-output-area"
          placeholder="See summary here"
          aria-label="Summary of text"
          className="grow min-h-[8.75em] resize-none border hover:border-dashed p-[1em] mt-[0.8em] font-bold"
          disabled
        ></textarea>
        <div className="flex gap-3.5 w-full">
          <button
            id="copy-button"
            className="px-[1em] py-[0.875em] border h-[2.5em] flex items-center mt-4 cursor-pointer border-dashed hover:bg-[#222]"
            disabled
          >
            Copy
          </button>
          <button
            id="clear-button"
            className="px-[1em] py-[0.875em] border h-[2.5em] flex items-center mt-4 cursor-pointer border-dashed hover:bg-[#222]"
            disabled
          >
            Clear
          </button>
        </div>
      </div>
      <div
        id="loading-section"
        className="flex-column loading-section hidden"
        aria-live="polite"
      >
        <Image
          src="/loading-spinner.svg"
          alt="Loading spinner"
          width={50}
          height={50}
        />
        <div id="loading-message" className="loading-message">
          Summarizing...
        </div>
      </div>
      <div
        id="error-section"
        className="flex-column error-section"
        aria-live="assertive"
      >
        <div id="error-message" className="error-message"></div>
        <button
          id="dismiss-error-button"
          className="px-[1em] py-[0.875em] border h-[2.5em] flex items-center justify-center mt-4  cursor-pointer border-dashed hover:bg-[#222]"
        >
          Dismiss Error
        </button>
      </div>
    </section>
  );
}
