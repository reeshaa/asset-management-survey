const gradeLevels = [
  {
    key: 'Innocent',
    range: '0–0.5',
    description:
      'The organisation has not recognised the need for this requirement, and there is no evidence of commitment to put it in place.',
    variant: 'innocent',
  },
  {
    key: 'Aware',
    range: '0.5–1.0',
    description:
      'The organisation has identified the need for this requirement and there is evidence of intent to progress it.',
    variant: 'aware',
  },
  {
    key: 'Developing',
    range: '1.0–1.5',
    description:
      'The organisation has identified the means of systematically creating requirements and can demonstrate these are being progressed with credible plans in place.',
    variant: 'developing',
  },
  {
    key: 'Competent',
    range: '1.5–2.0',
    description:
      'The organisation can demonstrate that it systematically and consistently achieves relevant requirements.',
    variant: 'competent',
  },
  {
    key: 'Optimising',
    range: '2.0–2.5',
    description:
      'The organisation can demonstrate that it is systematically and consistently optimising its asset management practice in line with its objectives.',
    variant: 'optimising',
  },
  {
    key: 'Excellent',
    range: '2.5–3.0',
    description:
      'The organisation demonstrates that it employs the leading practices and achieves maximum value from the management of its assets.',
    variant: 'excellent',
  },
]

function ResultCard({ lensResults, onRestart }) {
  const activeGrades = new Set(Object.values(lensResults).map((result) => result.grade))
  const gradeMap = Object.fromEntries(gradeLevels.map((level) => [level.key, level]))

  return (
    <section className="quiz-card result-card">
      <span className="badge">Finished</span>
      <h1>Maturity grades</h1>
      <p className="result-intro">
        These are your three main grades — one for each assessment lens.
      </p>

      <div className="grade-scale">
        <div className="grade-scale__title">Grade key</div>
        <div className="grade-scale__list">
          {gradeLevels.map((level) => (
            <span
              key={level.key}
              className={`grade-chip grade-chip--${level.variant} ${
                activeGrades.has(level.key) ? 'grade-chip--active' : ''
              }`}
            >
              {level.key}
            </span>
          ))}
        </div>
      </div>

      <div className="lens-summary">
        {Object.entries(lensResults).map(([lens, result]) => {
          const variant = gradeMap[result.grade].variant
          return (
            <div key={lens} className={`lens-card lens-card--${variant}`}>
              <div className="lens-card__top">
                <div>
                  <div className="lens-card__title">
                    {lens.charAt(0).toUpperCase() + lens.slice(1)} lens
                  </div>
                  <div className="lens-card__subtitle">Grade</div>
                </div>
                <span className={`grade-pill grade-pill--${variant}`}>
                  {result.grade}
                </span>
              </div>
              <div className="lens-card__meta">
                <span>{gradeMap[result.grade].range}</span>
                <span>{result.score.toFixed(2)} weighted score</span>
              </div>
            </div>
          )
        })}
      </div>

      <button className="primary-button" onClick={onRestart}>
        Restart Quiz
      </button>
    </section>
  )
}

export default ResultCard
