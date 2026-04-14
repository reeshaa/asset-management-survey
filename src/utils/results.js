export const calculateMaxScore = (questions) =>
  questions.reduce(
    (total, question) => total + Math.max(...question.options.map((option) => option.score)),
    0,
  )

export const calculateScore = (questions, answers) =>
  answers.reduce((total, answer, index) => {
    const question = questions[index]
    if (answer === null) return total
    return total + (question.options[answer]?.score ?? 0)
  }, 0)

const calculateLensTotalWeights = (questions) =>
  questions.reduce(
    (totals, question) => ({
      capabilities: totals.capabilities + question.lensWeights.capabilities,
      performance: totals.performance + question.lensWeights.performance,
      assurance: totals.assurance + question.lensWeights.assurance,
    }),
    { capabilities: 0, performance: 0, assurance: 0 },
  )

const normalizeAnswerScore = (question, answer) =>
  answer === null ? 0 : question.options[answer]?.score ?? 0

export const calculateLensScores = (questions, answers) => {
  const totalWeights = calculateLensTotalWeights(questions)

  const weightedSum = questions.reduce(
    (totals, question, index) => {
      const answerScore = normalizeAnswerScore(question, answers[index])
      return {
        capabilities: totals.capabilities + answerScore * question.lensWeights.capabilities,
        performance: totals.performance + answerScore * question.lensWeights.performance,
        assurance: totals.assurance + answerScore * question.lensWeights.assurance,
      }
    },
    { capabilities: 0, performance: 0, assurance: 0 },
  )

  return {
    capabilities: weightedSum.capabilities / totalWeights.capabilities,
    performance: weightedSum.performance / totalWeights.performance,
    assurance: weightedSum.assurance / totalWeights.assurance,
  }
}

export const getLensGrade = (value) =>
  value >= 2.5
    ? 'Excellent'
    : value >= 2.0
    ? 'Optimising'
    : value >= 1.5
    ? 'Competent'
    : value >= 1.0
    ? 'Developing'
    : value >= 0.5
    ? 'Aware'
    : 'Innocent'

export const calculateLensResults = (questions, answers) => {
  const lensScores = calculateLensScores(questions, answers)

  return {
    capabilities: {
      score: lensScores.capabilities,
      grade: getLensGrade(lensScores.capabilities),
    },
    performance: {
      score: lensScores.performance,
      grade: getLensGrade(lensScores.performance),
    },
    assurance: {
      score: lensScores.assurance,
      grade: getLensGrade(lensScores.assurance),
    },
  }
}
