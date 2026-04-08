const Title = () => {
  return (
    <>
      <header className="w-full max-w-215 flex items-center gap-4 px-5 py-3 bg-cream text-ink rounded backdrop-blur">
        <div className="flex flex-col text-start">
          <span className="font-normal text-ink opacity-65 tracking-[0.12em]">
            text
          </span>
          <span className="orb text-xl font-bold text-ink leading-[1.1]">
            Summarizer
          </span>
        </div>
      </header>
    </>
  );
};

export default Title;
