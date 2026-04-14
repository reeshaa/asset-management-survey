// src/data/questions.js
export const questions = [
  {
    question: "Your asset portfolio includes…",
    options: [
      { text: "A small number of asset groups, with mostly routine planning needs", score: 0 },
      { text: "Several asset groups, needing regular planning and prioritisation", score: 1 },
      { text: "A broad range of asset groups, needing different planning approaches", score: 2 },
      { text: "Many asset groups with competing needs, requiring strong long-term planning", score: 3 },
    ],
    lensWeights: { capabilities: 45, performance: 30, assurance: 25 },
  },
  {
    question: "The services these assets support are…",
    options: [
      { text: "Useful services where short interruptions can usually be managed", score: 0 },
      { text: "Important services where some disruption is manageable", score: 1 },
      { text: "Key services that need to work reliably day to day", score: 2 },
      { text: "Essential services where disruption is hard to tolerate", score: 3 },
    ],
    lensWeights: { capabilities: 20, performance: 50, assurance: 30 },
  },
  {
    question: "The importance of these services is…",
    options: [
      { text: "Mainly local or operational", score: 0 },
      { text: "Important to parts of the community or organisation", score: 1 },
      { text: "Important to everyday wellbeing or core operations", score: 2 },
      { text: "Critical to public wellbeing, confidence, or continuity", score: 3 },
    ],
    lensWeights: { capabilities: 20, performance: 40, assurance: 40 },
  },
  {
    question: "If these services are disrupted or fail…",
    options: [
      { text: "The impact is inconvenient but manageable", score: 0 },
      { text: "The impact is noticeable and takes effort to recover from", score: 1 },
      { text: "The impact is serious for service, cost, or community outcomes", score: 2 },
      { text: "The impact is severe for safety, trust, or continuity", score: 3 },
    ],
    lensWeights: { capabilities: 15, performance: 35, assurance: 50 },
  },
  {
    question: "The world around you is…",
    options: [
      { text: "Fairly steady and predictable", score: 0 },
      { text: "Changing, but at a manageable pace", score: 1 },
      { text: "Changing in ways that affect priorities and decisions", score: 2 },
      { text: "Changing fast and often forcing plans to adjust", score: 3 },
    ],
    lensWeights: { capabilities: 35, performance: 40, assurance: 25 },
  },
  {
    question: "Delivering these services depends on…",
    options: [
      { text: "Mostly one part of the organisation", score: 0 },
      { text: "A few teams working together", score: 1 },
      { text: "Many teams staying aligned", score: 2 },
      { text: "The organisation and its partners working together consistently", score: 3 },
    ],
    lensWeights: { capabilities: 40, performance: 35, assurance: 25 },
  },
  {
    question: "Service delivery relies on…",
    options: [
      { text: "Mostly your own people and direct control", score: 0 },
      { text: "Some support from contractors or suppliers", score: 1 },
      { text: "Regular reliance on outside providers", score: 2 },
      { text: "Strong reliance on multiple outside parties working well together", score: 3 },
    ],
    lensWeights: { capabilities: 35, performance: 30, assurance: 35 },
  },
  {
    question: "The choices you face are…",
    options: [
      { text: "Usually straightforward", score: 0 },
      { text: "Sometimes difficult, but manageable", score: 1 },
      { text: "Often difficult and important to get right", score: 2 },
      { text: "Regularly high-stakes and likely to shape long-term outcomes", score: 3 },
    ],
    lensWeights: { capabilities: 25, performance: 40, assurance: 35 },
  },
  {
    question: "Good asset decisions need…",
    options: [
      { text: "A general understanding of who does what", score: 0 },
      { text: "Clear responsibility in the main areas", score: 1 },
      { text: "Clear roles across most important decisions", score: 2 },
      { text: "Clear accountability from frontline to leadership", score: 3 },
    ],
    lensWeights: { capabilities: 45, performance: 20, assurance: 35 },
  },
  {
    question: "To manage assets well, you need…",
    options: [
      { text: "Practical day-to-day knowledge", score: 0 },
      { text: "Some specialist skills in key areas", score: 1 },
      { text: "Strong technical and planning skills across several areas", score: 2 },
      { text: "Deep specialist capability supported by strong leadership", score: 3 },
    ],
    lensWeights: { capabilities: 55, performance: 25, assurance: 20 },
  },
  {
    question: "To stay ahead, you need…",
    options: [
      { text: "Enough effort to deal with current issues", score: 0 },
      { text: "Some time to look ahead", score: 1 },
      { text: "Strong forward planning as well as day-to-day delivery", score: 2 },
      { text: "Real capacity to plan, renew, adapt, and improve over time", score: 3 },
    ],
    lensWeights: { capabilities: 50, performance: 30, assurance: 20 },
  },
  {
    question: "To work well across the organisation, you need…",
    options: [
      { text: "A few basic rules that people understand", score: 0 },
      { text: "Clear ways of working in the main areas", score: 1 },
      { text: "Consistent standards and processes across most areas", score: 2 },
      { text: "Strong organisation-wide discipline in how work is done", score: 3 },
    ],
    lensWeights: { capabilities: 40, performance: 25, assurance: 35 },
  },
  {
    question: "Good decisions depend on information that is…",
    options: [
      { text: "Basic, but enough for most decisions", score: 0 },
      { text: "Reliable in the main areas", score: 1 },
      { text: "Good enough for important choices and trade-offs", score: 2 },
      { text: "Trusted, joined-up, and strong enough for major decisions", score: 3 },
    ],
    lensWeights: { capabilities: 35, performance: 40, assurance: 25 },
  },
  {
    question: "In your context, risk needs to be managed…",
    options: [
      { text: "At a practical working level", score: 0 },
      { text: "Carefully in the main risk areas", score: 1 },
      { text: "Strongly across service, compliance, and safety", score: 2 },
      { text: "Very strongly across safety, compliance, environment, and reputation", score: 3 },
    ],
    lensWeights: { capabilities: 20, performance: 20, assurance: 60 },
  },
  {
    question: "Your assets and services need to…",
    options: [
      { text: "Cope with normal interruptions", score: 0 },
      { text: "Keep most services going through routine disruptions", score: 1 },
      { text: "Keep important services going through major disruption", score: 2 },
      { text: "Protect critical services and recover quickly under pressure", score: 3 },
    ],
    lensWeights: { capabilities: 20, performance: 45, assurance: 35 },
  },
  {
    question: "Leaders and stakeholders need…",
    options: [
      { text: "General confidence that things are under control", score: 0 },
      { text: "Reasonable confidence for key decisions", score: 1 },
      { text: "Strong confidence that performance, risk, and investment are being managed well", score: 2 },
      { text: "High confidence, backed by clear evidence and control", score: 3 },
    ],
    lensWeights: { capabilities: 20, performance: 25, assurance: 55 },
  },
];