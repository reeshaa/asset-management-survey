import capabilitiesLogo from '../assets/capabilities.png'
import performanceLogo from '../assets/performance.png'
import assuranceLogo from '../assets/assurance.png'
import auxiliumLogo from '../assets/auxilium.png'
import GradeInnocentLogo from '../assets/grades/1_innocent.png'
import GradeAwareLogo from '../assets/grades/2_aware.png'
import GradeDevelopingLogo from '../assets/grades/3_developing.png'
import GradeCompetentLogo from '../assets/grades/4_competent.png'
import GradeOptimizingLogo from '../assets/grades/5_optimizing.png'
import GradeExcellentLogo from '../assets/grades/6_excellent.png'

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
  const gradeMap = Object.fromEntries(gradeLevels.map((level) => [level.key, level]))

  const lensDefinitions = {
    capabilities: {
      label: 'Lens One',
      title: 'Capabilities',
      description:
        'Do you have the right people, systems and processes for what you need to deliver?',
      icon: capabilitiesLogo,
    },
    performance: {
      label: 'Lens Two',
      title: 'Performance',
      description:
        'Can you demonstrate with evidence that what you do delivers the outcomes your community expects?',
      icon: performanceLogo,
    },
    assurance: {
      label: 'Lens Three',
      title: 'Assurance',
      description:
        'Can you prove that risks are understood, managed and proportionate to what matters?',
      icon: assuranceLogo,
    },
  }

  const gradeIcons = {
    Innocent: GradeInnocentLogo,
    Aware: GradeAwareLogo,
    Developing: GradeDevelopingLogo,
    Competent: GradeCompetentLogo,
    Optimising: GradeOptimizingLogo,
    Excellent: GradeExcellentLogo,
  }

  const lensOrder = ['capabilities', 'performance', 'assurance']

  return (
    <section className="quiz-card result-card">
      <h1>Results</h1>

      <div className="result-grid">
        {lensOrder.map((lens) => {
          const result = lensResults[lens]
          const definition = lensDefinitions[lens]
          const variant = gradeMap[result.grade].variant

          return (
            <article key={lens} className={`lens-panel lens-panel--${variant} lens-panel--${lens}`}>
              <div className="lens-panel__header">
                <span className="lens-panel__icon">
                  <img src={definition.icon} alt={`${definition.title} logo`} />
                </span>
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
                <span className={`grade-pill `}>
                  <img src={gradeIcons[result.grade]} alt={`${result.grade} grade`} />
                  <span className="grade-pill__label">{result.grade}</span>
                </span>
              </div>
            </article>
          )
        })}
      </div>

      <button className="primary-button" onClick={onRestart}>
        Restart Quiz
      </button>

      <footer className="result-footer">
        <a href="https://www.auxilium.co.nz/" target="_blank" rel="noreferrer" className="logo-link">
          <img src={auxiliumLogo} alt="Auxilium logo" className="footer-logo" />
        </a>
        <p className="small-text result-footer-note">Ideation by Rahul Shenoy</p>
      </footer>
    </section>
  )
}

export default ResultCard
