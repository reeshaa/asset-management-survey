import { sendQuizData } from './utils/sheets'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { DNA } from 'react-loader-spinner'
import { questions } from './data/questions'
import WelcomeCard from './components/WelcomeCard'
import QuizScreen from './components/QuizScreen'
import ResultCard from './components/ResultCard'
import Footer from './components/Footer'
import {
  calculateLensResults,
  calculateMaxScore,
  calculateScore,
} from './utils/results'

function App() {
  const totalQuestions = questions.length
  const [step, setStep] = useState('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null))
  const [isAdvancing, setIsAdvancing] = useState(false)
  const [readyToSubmit, setReadyToSubmit] = useState(false)
  const [isLoadingResult, setIsLoadingResult] = useState(false)
  const advanceTimeout = useRef(null)
  const resultTimeout = useRef(null)
  // const loadingInterval = useRef(null)

  useEffect(() => {
    return () => {
      if (advanceTimeout.current) {
        clearTimeout(advanceTimeout.current)
      }
      if (resultTimeout.current) {
        clearTimeout(resultTimeout.current)
      }
    }
  }, [])

  const clearAdvance = () => {
    if (advanceTimeout.current) {
      clearTimeout(advanceTimeout.current)
      advanceTimeout.current = null
    }
  }

  const startQuiz = () => {
    clearAdvance()
    setStep('quiz')
    setCurrentQuestion(0)
    setAnswers(Array(totalQuestions).fill(null))
    setIsAdvancing(false)
  }

  const selectOption = (index) => {
    if (isAdvancing) return

    setAnswers((prev) => {
      const next = [...prev]
      next[currentQuestion] = index
      return next
    })
    setIsAdvancing(true)
    setReadyToSubmit(false)

    const nextQuestionIndex = currentQuestion + 1
    const isLastQuestion = currentQuestion === totalQuestions - 1

    advanceTimeout.current = setTimeout(() => {
      setIsAdvancing(false)
      advanceTimeout.current = null
      if (isLastQuestion) {
        setReadyToSubmit(true)
      } else {
        setCurrentQuestion(nextQuestionIndex)
      }
    }, 550)
  }

  const goBack = () => {
    if (currentQuestion === 0 || isAdvancing) return
    if (readyToSubmit) {
      setReadyToSubmit(false)
    }
    setCurrentQuestion((index) => index - 1)
  }

  const restartQuiz = () => {
    clearAdvance()
    setStep('welcome')
    setCurrentQuestion(0)
    setAnswers(Array(totalQuestions).fill(null))
    setIsAdvancing(false)
    setReadyToSubmit(false)
  }

  const submitQuiz = () => {
    clearAdvance()
    setReadyToSubmit(false)
    setIsLoadingResult(true)

    // Send data to Google Sheets (fire and forget)
    sendQuizData({
      answers,
      score: calculateScore(questions, answers),
      maxScore: calculateMaxScore(questions),
      lensResults: calculateLensResults(questions, answers),
    });

    resultTimeout.current = setTimeout(() => {
      setIsLoadingResult(false)
      setStep('result')
      resultTimeout.current = null
    }, 2800)
  }

  const maxScore = calculateMaxScore(questions)
  const score = calculateScore(questions, answers)
  const lensResults = calculateLensResults(questions, answers)

  return (
    <div className="app-root">
      <main className="app-shell">
      {step === 'welcome' && <WelcomeCard onStart={startQuiz} />}

      {step === 'quiz' && !isLoadingResult && (
        <QuizScreen
          question={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          selectedOption={answers[currentQuestion]}
          isAdvancing={isAdvancing}
          readyToSubmit={readyToSubmit}
          onSelectOption={selectOption}
          onBack={goBack}
          onSubmit={submitQuiz}
        />
      )}

      {isLoadingResult && (
        <section className="quiz-card loading-card">
          <span className="badge">Processing</span>
          <h1>Computing maturity lens results</h1>
          <p className="result-intro">
            Calculating your maturity lens score from the responses you provided.
          </p>
          <div className="loading-aiwait" aria-label="Loading">
            <DNA
              visible={true}
              height={96}
              width={96}
              ariaLabel="dna-loading"
              wrapperStyle={{ margin: '0 auto' }}
              wrapperClass="dna-wrapper"
            />
            <span className="aiwait-loader-label">Analyzing answers, please wait...</span>
          </div>
        </section>
      )}

      {step === 'result' && !isLoadingResult && (
        <ResultCard
          score={score}
          maxScore={maxScore}
          lensResults={lensResults}
          onRestart={restartQuiz}
        />
      )}
      </main>
      <Footer />
    </div>
  )
}

export default App
