const GOOGLE_SHEET_ENDPOINT = import.meta.env.VITE_GOOGLE_SHEET_ENDPOINT

export function getUserInfo() {
  return {
    userAgent: navigator.userAgent,
    screen: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer,
  };
}

export async function sendQuizData({ answers, score, maxScore, lensResults }) {
  const userInfo = getUserInfo();
  const payload = {
    answers,
    score,
    maxScore,
    lensResults,
    ...userInfo,
  };
  try {
    if (!GOOGLE_SHEET_ENDPOINT) {
      console.warn('Google Sheet endpoint is not configured.')
      return
    }

    await fetch(GOOGLE_SHEET_ENDPOINT, {
      method: 'POST',
      mode: "no-cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Optionally handle error (e.g., log or ignore)
  }
}
