function WelcomeCard({ onStart }) {
  return (
    <section className="quiz-card welcome-card">
      <span className="badge">Welcome</span>
      <h1>Asset Management Quiz</h1>
      <p>Answer 16 questions and see your result at the end.</p>
      <button className="primary-button" onClick={onStart}>
        Start Quiz
      </button>
    </section>
  )
}

export default WelcomeCard
