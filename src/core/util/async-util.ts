async function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function afterDelay(ms: number, callback: () => void): Promise<void> {
  sleep(ms).finally(callback);
}

export const asyncUtil = {
  sleep,
  afterDelay,
};
