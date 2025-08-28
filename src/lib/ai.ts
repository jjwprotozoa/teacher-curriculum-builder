export async function generateWeeklyThemeOutline(prompt: string) {
  // TODO: call your /api/ai endpoint that proxies to Ollama or cloud
  // return await fetch('/api/ai', { method:'POST', body: JSON.stringify({ prompt })}).then(r=>r.json())
  return { ideas: ["Count to 10 with blocks", "Letter of the week: A", "Nature walk sorting"] }
}
