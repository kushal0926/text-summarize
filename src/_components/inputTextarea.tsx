export default function InputTextarea() {
  return (
    <section className="flex flex-col w-full">
      <textarea
        placeholder="paste your text here to summarize"
        aria-label="paste your text here to summarize"
        className="w-full grow min-h-[8.75em] resize-none border hover:border-dashed p-[0.8em_0.6em] mt-[0.8em] font-bold"
      ></textarea>
      <div className="flex justify-between gap-3.5 w-full">
        <div
          id="summary-length-container"
          className="flex flex-col justify-between items-center font-bold flex-[0.8]"
        >
          <div className="flex items-center gap-[0.4em] mt-4 w-full">
            <span className="summary-length-min-label">1</span>
            <input
              type="range"
              id="summary-length-input"
              className="grow h-[0.8em] rounded "
              min="1"
              max="100"
              value="10"
              aria-labelledby="summary-length-text"
              disabled
            />
            <span className="summary-length-max-label">100</span>
          </div>
          <span id="summary-length-text" className="text-[0.7rem]">
            Summary Length: 10 Words
          </span>
        </div>
        <button
          id="summarize-button"
          className="px-[1em] py-[0.875em] border h-[2.5em] flex items-center justify-center mt-4 cursor-pointer border-dashed hover:bg-[#222]"
          disabled
        >
          <span className="font-bold">Summarize</span>
        </button>
      </div>
    </section>
  );
}
