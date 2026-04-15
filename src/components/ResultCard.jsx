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

  const lensDefinitions = {
    capabilities: {
      label: 'Lens One',
      title: 'Capabilities',
      description:
        'Do you have the right people, systems and processes for what you need to deliver?',
      icon: '⚙️',
    },
    performance: {
      label: 'Lens Two',
      title: 'Performance',
      description:
        'Can you demonstrate with evidence that what you do delivers the outcomes your community expects?',
      icon: '📈',
    },
    assurance: {
      label: 'Lens Three',
      title: 'Assurance',
      description:
        'Can you prove that risks are understood, managed and proportionate to what matters?',
      icon: '🛡️',
    },
  }

  const lensOrder = ['capabilities', 'performance', 'assurance']

  return (
    <section className="quiz-card result-card">
      <span className="badge">Finished</span>
      <h1>Reflection results</h1>
      <p className="result-intro">
        These results reveal how much effort or engineering your organisation may
        need in each area. They are a reflection, not a final maturity score.
      </p>

      <div className="result-grid">
        {lensOrder.map((lens) => {
          const result = lensResults[lens]
          const definition = lensDefinitions[lens]
          const variant = gradeMap[result.grade].variant

          return (
            <article key={lens} className={`lens-panel lens-panel--${variant} lens-panel--${lens}`}>
              <div className="lens-panel__header">
                <span className="lens-panel__icon">{definition.icon}</span>
                <div>
                  <div className="lens-panel__small-label">{definition.label}</div>
                  <h2 className="lens-panel__title">{definition.title}</h2>
                </div>
              </div>

              <p className="lens-panel__desc">{definition.description}</p>

              <div className="lens-panel__scale">
                <div className="lens-panel__scale-row">
                  {gradeLevels.map((level) => (
                    <span
                      key={level.key}
                      className={`scale-segment scale-segment--${level.variant} ${
                        level.key === result.grade ? 'scale-segment--active' : ''
                      }`}
                    />
                  ))}
                </div>
                <div className="scale-labels">
                  <span>Innocent</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div className="lens-panel__footer">
                <span className={`grade-pill grade-pill--${variant}`}>
                  {result.grade}
                </span>
                <div className="lens-panel__score">
                  <span className="score-value">{result.score.toFixed(2)}</span>
                  <span className="score-label">Weighted score</span>
                </div>
              </div>
            </article>
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
