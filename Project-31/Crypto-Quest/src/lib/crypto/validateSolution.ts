export function validateSolution(userAnswer: string, originalText: string) {
  const val = userAnswer.toLowerCase().replace(/[^a-z]/g, "") ===
  originalText.toLowerCase().replace(/[^a-z]/g, "").split(" ").join("")

  return val;
}
