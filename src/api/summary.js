const url = "https://tulahackdays.dev-ittest.ru/summary";

export async function sendSummaryRequest(patientData) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 600000); // 600000ms = 10 минут

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(patientData),
      signal: controller.signal // Передаем сигнал для отмены запроса
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      return "Результат анализа: " + result.summary;
    } else {
      const error = await response.json();
      console.error("Ошибка:", error);
    }
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("Запрос был отменен из-за таймаута.");
    } else {
      console.error("Ошибка сети:", err);
    }
  }
}
