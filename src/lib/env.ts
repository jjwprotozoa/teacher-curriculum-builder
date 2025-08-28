export const env = {
  DATABASE_URL: process.env.DATABASE_URL || "file:./dev.db",
  CLOUD_AI_ENABLED: process.env.CLOUD_AI_ENABLED === "true",
  OLLAMA_BASE_URL: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || "",
};
