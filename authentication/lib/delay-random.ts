// Helper function to prevent brute force attacks alternative for rate limint for now
export default async function delayRandom(min: number, max: number) {
  const timeout = Math.random() * (max - min) + min;
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
