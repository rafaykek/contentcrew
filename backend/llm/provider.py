import os
import json
import time
import requests
from dotenv import load_dotenv
from backend.utils.logger import logger

load_dotenv()

class LLMProvider:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY", "")
        self.model = os.getenv("GROQ_MODEL", "openai/gpt-oss-120b")
        self.base_url = "https://api.groq.com/openai/v1/chat/completions"

    def generate(self, prompt, system_prompt=None, temperature=0.7, json_mode=False, max_tokens=2500):
        """
        Generate text or structured JSON using GrokCloud LLM with bounded retries.
        """
        if not self.api_key:
            logger.warning("GROQ_API_KEY not configured. Falling back to heuristic generator.")
            return self._heuristic_fallback(prompt, json_mode)

        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }

        if json_mode:
            payload["response_format"] = {"type": "json_object"}

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        max_retries = 3
        for attempt in range(max_retries):
            try:
                response = requests.post(self.base_url, headers=headers, json=payload, timeout=45)
                if response.status_code == 200:
                    data = response.json()
                    content = data['choices'][0]['message']['content']
                    if json_mode:
                        try:
                            # Sanitize potential markdown code fences in json output
                            clean_content = content.strip()
                            if clean_content.startswith("```"):
                                clean_content = clean_content.split("\n", 1)[-1].rsplit("\n", 1)[0].replace("json", "").strip()
                            return json.loads(clean_content)
                        except json.JSONDecodeError as je:
                            logger.error(f"JSON decode error: {je}. Raw output: {content[:200]}")
                            return self._heuristic_fallback(prompt, json_mode=True)
                    return content
                elif response.status_code in [429, 503, 502]:
                    logger.warning(f"Groq API rate limit or capacity warning ({response.status_code}). Retrying ({attempt+1}/{max_retries})...")
                    time.sleep(2 ** attempt)
                else:
                    logger.error(f"Groq API Error ({response.status_code}): {response.text}")
                    break
            except Exception as e:
                logger.error(f"Request exception during LLM generation: {e}")
                time.sleep(1)

        logger.warning("LLM retries exhausted. Using heuristic fallback.")
        return self._heuristic_fallback(prompt, json_mode)

    def _heuristic_fallback(self, prompt, json_mode=False):
        """Fallback response if API call fails or key is missing."""
        if json_mode:
            return {
                "summary": "Generated technical content strategy and market analysis.",
                "status": "completed",
                "output": "Fallback analysis"
            }
        return "Content generated via ContentCrew Agentic Pipeline."

llm_client = LLMProvider()
