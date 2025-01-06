let lastRequestTime = 0;
const RATE_LIMIT_INTERVAL = 1000;

export async function rateLimiter() {
  const now = Date.now();

  if (now - lastRequestTime < RATE_LIMIT_INTERVAL) {
    throw new Error("Too many requests... Please wait a moment.");
  }

  lastRequestTime = now;

  try {
    return true;
  } catch (error) {
    throw error;
  }
}
