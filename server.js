const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* ==========================================
   1. MANUAL VISION PROFILE ENGINE
========================================== */

function getAccessibilityInstructions(visionType) {

  switch(visionType) {

    case "color_blindness":
      return `
Avoid relying on colour distinctions.
Add labels instead of colour-only meaning.
`;

    case "light_sensitivity":
      return `
Use dark-mode friendly formatting.
Reduce visual strain.
`;

    case "central_blindness":
      return `
Use strong headings.
Break content into short chunks.
Make audio-friendly structure.
`;

    case "low_vision":
      return `
Use large readable structure.
Short paragraphs.
Simple language.
`;

    default:
      return `
Improve readability and accessibility.
`;
  }
}

/* ==========================================
   2. AUTO ACCESSIBILITY DETECTION ENGINE
========================================== */

function autoDetectAccessibilityNeeds(text) {

  let suggestions = [];

  if(text.length > 500) {
    suggestions.push("Break content into shorter readable sections.");
  }

  if(text.includes("=") || text.includes("%")) {
    suggestions.push("Explain technical content simply.");
  }

  const lower = text.toLowerCase();
  if(lower.includes("red") || lower.includes("green") || lower.includes("blue")) {
    suggestions.push("Avoid colour-only meaning.");
  }

  return suggestions.join("\n");
}

/* ==========================================
   3. MAIN PROCESSING ENDPOINT
========================================== */

app.post("/process", async (req, res) => {

  const { text, visionType } = req.body;

  const manualInstructions = getAccessibilityInstructions(visionType);
  const autoInstructions = autoDetectAccessibilityNeeds(text);

  const prompt = `
You are an adaptive accessibility assistant.

Manual accessibility needs:
${manualInstructions}

Automatically detected improvements:
${autoInstructions}

Rewrite for accessibility:

${text}
`;

  try {

    const response = await fetch("https://api.openai.com/v1/chat/completions", {

      method: "POST",

      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })

    });

    const data = await response.json();

    res.json({
      result: data.choices[0].message.content
    });

  } catch(err) {

    console.error(err);

    res.status(500).json({
      error: "Processing failed"
    });
  }

});

/* ==========================================
   START SERVER
========================================== */

app.listen(3000, () => {
  console.log("ClearView backend running on port 3000");
});
