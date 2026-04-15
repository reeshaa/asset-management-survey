function WelcomeCard({ onStart }) {
  return (
    <section className="quiz-card welcome-card">
      <div className="welcome-header">
        <span className="badge">Quick check</span>
        <h1>Is your asset management fit for purpose?</h1>
      </div>

      <div className="welcome-body">
        <p className="welcome-lead">
          16 quick MCQs to identify how mature your asset management practices are.
        </p>
        <p>Choose one option that best reflects your organisation.</p>
      </div>

      <div className="welcome-footer">
        <button className="primary-button" onClick={onStart}>
          Start Quiz {"→"}
        </button>
        <p className="small-text subtle-note">Created by Rahul Shenoy</p>
      </div>
    </section>
  )
}

export default WelcomeCard
