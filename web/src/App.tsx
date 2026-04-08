import { useState } from 'react'
import InputForm from "./components/InputForm";
import Summary from "./components/Summary";
import Title from "./components/Title";


 
const DEFAULT_SUMMARY_LENGTH = 10


function App() {
  const [text, setText] = useState('')
    const [summaryLength, setSummaryLength] = useState(DEFAULT_SUMMARY_LENGTH)
    const [summary, setSummary] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
   
    async function handleSummarize() {
      setIsLoading(true)
      setSummary('')
      setError(null)
   
      try {
        const response = await fetch('http://localhost:8026/v1/api/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, summaryLength }),
        })
   
        if (!response.ok) {
          const { error: errMsg } = await response.json()
          throw new Error(errMsg)
        }
   
        const { summary: result } = await response.json()
        setSummary(result)
      } catch (err) {
        setError(
          `There was an error processing the text: ${err instanceof Error ? err.message : 'Unknown error'}`
        )
      } finally {
        setIsLoading(false)
      }
    }
   
    function handleClear() {
      setText('')
      setSummary('')
      setSummaryLength(DEFAULT_SUMMARY_LENGTH)
      setError(null)
    }
   
    function handleDismissError() {
      setError(null)
      handleClear()
    }
  return (
    <>
      <section className="min-h-screen flex flex-col items-center p-20 gap-4">
        <Title />
          <main className="w-full max-w-215 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputForm
                text={text}
                summaryLength={summaryLength}
                isLoading={isLoading}
                onTextChange={setText}
                onSummaryLengthChange={setSummaryLength}
                onSummarize={handleSummarize}
              />
              <Summary
                summary={summary}
                isLoading={isLoading}
                error={error}
                onClear={handleClear}
                onDismissError={handleDismissError}
          />
          </main>
      </section>
    </>
  );
}

export default App;
