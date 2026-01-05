
export async function submitToMonday(answers: { [key: number]: any }, score: number) {
  try {
    // Llamamos a nuestra propia función de Cloudflare en lugar de a la API externa directamente
    // Esto resuelve el problema de CORS (Failed to fetch)
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ answers, score })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error del servidor: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Error en la sumisión:", error);
    throw error;
  }
}
