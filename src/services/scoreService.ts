export const syncScoreToAWS = async (userName: string, score: number) => {
  const response = await fetch("https://w8aaag9np1.execute-api.eu-north-1.amazonaws.com/update-score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, score }),
  });

  if (!response.ok) {
    throw new Error(`AWS Sync Failed: ${response.statusText}`);
  }

  return await response.json();
};