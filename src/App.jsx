import { useEffect, useRef, useState } from 'react'
import './App.css'
import { questions } from './data/questions'
import WelcomeCard from './components/WelcomeCard'
import QuizScreen from './components/QuizScreen'
import ResultCard from './components/ResultCard'
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
  const advanceTimeout = useRef(null)

  useEffect(() => {
    return () => {
      if (advanceTimeout.current) {
        clearTimeout(advanceTimeout.current)
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
    setStep('result')
  }

  const maxScore = calculateMaxScore(questions)
  const score = calculateScore(questions, answers)
  const lensResults = calculateLensResults(questions, answers)

  return (
    <main className="app-shell">
      {step === 'welcome' && <WelcomeCard onStart={startQuiz} />}

      {step === 'quiz' && (
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

      {step === 'result' && (
        <ResultCard
          score={score}
          maxScore={maxScore}
          lensResults={lensResults}
          onRestart={restartQuiz}
        />
      )}
    </main>
  )
}

export default App
