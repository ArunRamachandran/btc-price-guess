const API_URL = import.meta.env.VITE_AWS_API_URL;

export const syncScoreToAWS = async (userName: string, score: number) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, score }),
  });

  if (!response.ok) {
    throw new Error(`AWS Sync Failed: ${response.statusText}`);
  }

  return await response.json();
};