
// The Monday API key provided in the prompt
const MONDAY_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM3MzYzODQzMCwiYWFpIjoxMSwidWlkIjoxMzE2NTczLCJpYWQiOiIyMDI0LTA2LTE4VDE1OjMyOjMyLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSIsImFjdGlkIjo1NDM4MjUsInJnbiI6InVzZTEifQ.k1qFhdgWVtK-G2fcDz6fX1rrlnhe-wwIC9yTDpMChNo";
const BOARD_ID = "18393915976";

export async function submitToMonday(answers: { [key: number]: any }, score: number) {
  const timestamp = new Date().toISOString();
  const itemName = `Survey - ${timestamp}`;

  // Mapping answers to column values as requested
  const columnMappings: { [key: string]: string } = {
    "pregunta_1": String(answers[1] || ""),
    "pregunta_2": String(answers[2] || ""),
    "pregunta_3": String(answers[3] || ""),
    "pregunta_4": String(answers[4] || ""),
    "pregunta_5": String(answers[5] || ""),
    "pregunta_6": String(answers[6] || ""),
    "pregunta_7": String(answers[7] || ""),
    "score": String(score)
  };

  try {
    // Construct the column values object
    const updateValues: { [key: string]: any } = {};
    for (const [colId, value] of Object.entries(columnMappings)) {
      if (colId.startsWith("pregunta_") && colId !== "pregunta_7") {
        // For Status columns, we send an object with the label
        updateValues[colId] = { label: value };
      } else {
        // For Text columns (pregunta_7 and score)
        updateValues[colId] = value;
      }
    }

    // Stringify and escape for GraphQL
    const columnValuesJson = JSON.stringify(updateValues).replace(/"/g, '\\"');

    // Combined mutation to create item and set values
    // Using create_labels_if_missing: true to allow dynamic status creation
    const query = `
      mutation {
        create_item (
          board_id: ${BOARD_ID}, 
          item_name: "${itemName}", 
          column_values: "${columnValuesJson}",
          create_labels_if_missing: true
        ) {
          id
        }
      }
    `;

    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": MONDAY_TOKEN
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Monday API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      console.error("Monday GraphQL Errors:", result.errors);
      throw new Error(result.errors[0].message);
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Submission failed:", error);
    // Re-throw to be handled by the UI
    throw error;
  }
}
