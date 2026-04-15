function QuizScreen({
  question,
  currentQuestion,
  totalQuestions,
  selectedOption,
  isAdvancing,
  readyToSubmit,
  onSelectOption,
  onBack,
  onSubmit,
}) {
  return (
    <section className="quiz-card quiz-screen">
      <div className="quiz-header">
        <span className="badge">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h2>{question.question}</h2>

      <div className="options-list">
        {question.options.map((option, index) => (
          <button
            key={option.text}
            type="button"
            className={`option-button ${selectedOption === index ? 'selected' : ''} ${
              isAdvancing && selectedOption === index ? 'selected-animate' : ''
            }`}
            onClick={() => onSelectOption(index)}
            disabled={isAdvancing}
          >
            {option.text}
          </button>
        ))}
      </div>

      <div className="quiz-actions">
        {currentQuestion > 0 && (
          <button
            type="button"
            className="secondary-button"
            onClick={onBack}
            disabled={isAdvancing}
          >
            ← Previous
          </button>
        )}

        {readyToSubmit && (
          <button
            type="button"
            className="primary-button"
            onClick={onSubmit}
            disabled={isAdvancing}
          >
            Submit
          </button>
        )}
      </div>
    </section>
  )
}

export default QuizScreen
