import Header from "@/_components/header";
import InputTextarea from "@/_components/inputTextarea";
import OutputTextarea from "@/_components/outputTextarea";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#121212]">
      <section className="w-full max-w-2xl m-3 bg-[#1C1917] p-4 border border-dashed">
        <Header />
        <InputTextarea />
        <OutputTextarea />
      </section>
    </main>
  );
}
