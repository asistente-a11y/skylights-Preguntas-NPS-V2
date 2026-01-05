
export async function onRequestPost(context) {
  const { request } = context;
  
  try {
    const body = await request.json();
    const { answers, score } = body;

    const MONDAY_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM3MzYzODQzMCwiYWFpIjoxMSwidWlkIjoxMzE2NTczLCJpYWQiOiIyMDI0LTA2LTE4VDE1OjMyOjMyLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSIsImFjdGlkIjo1NDM4MjUsInJnbiI6InVzZTEifQ.k1qFhdgWVtK-G2fcDz6fX1rrlnhe-wwIC9yTDpMChNo";
    const BOARD_ID = "18393915976";

    const timestamp = new Date().toISOString();
    const itemName = `Survey - ${timestamp}`;

    const updateValues = {
      "pregunta_1": { label: String(answers[1] || "") },
      "pregunta_2": { label: String(answers[2] || "") },
      "pregunta_3": { label: String(answers[3] || "") },
      "pregunta_4": { label: String(answers[4] || "") },
      "pregunta_5": { label: String(answers[5] || "") },
      "pregunta_6": { label: String(answers[6] || "") },
      "pregunta_7": String(answers[7] || ""),
      "score": String(score)
    };

    const columnValuesJson = JSON.stringify(updateValues).replace(/"/g, '\\"');

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

    const mondayResponse = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": MONDAY_TOKEN
      },
      body: JSON.stringify({ query })
    });

    const result = await mondayResponse.json();

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
      status: mondayResponse.status
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
