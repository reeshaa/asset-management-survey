const GOOGLE_SHEET_ENDPOINT = import.meta.env.VITE_GOOGLE_SHEET_ENDPOINT
const USER_ID_KEY = 'quizUserId'

async function getUserId() {
  let id = localStorage.getItem(USER_ID_KEY)
  if (!id) {
    id = typeof crypto?.randomUUID === 'function'
      ? crypto.randomUUID()
      : `user-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    localStorage.setItem(USER_ID_KEY, id)
  }
  return id
}

export function getUserInfo() {
  return {
    userAgent: navigator.userAgent,
    screen: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer,
  };
}

async function getSubmissionCount() {
  const storedCount = parseInt(localStorage.getItem('quizSubmissionCount') ?? '0', 10)
  const nextSubmissionCount = Number.isFinite(storedCount) ? storedCount + 1 : 1
  localStorage.setItem('quizSubmissionCount', String(nextSubmissionCount))
  return nextSubmissionCount
}

export async function sendQuizData({ answers, score, maxScore, lensResults }) {
  const userInfo = getUserInfo();
  const submissionCount = await getSubmissionCount();
  const payload = {
    answers,
    score,
    maxScore,
    lensResults,
    submissionCount,
    userId: await getUserId(),
    ...userInfo,
  };
  console.log(payload);
  try {
    if (!GOOGLE_SHEET_ENDPOINT) {
      console.warn('Google Sheet endpoint is not configured.')
      return
    }

    const response = await fetch(GOOGLE_SHEET_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(payload),
    });

    if (response.type === 'opaque') {
      console.log('sendQuizData: request sent as opaque no-cors request', {
        type: response.type,
      });
    } else {
      console.error('sendQuizData: request failed', {
        status: response.status,
        statusText: response.statusText,
        type: response.type,
      });
    }
  } catch (err) {
    console.error('sendQuizData error:', err);
  }
}
