const axios = require("axios");

module.exports = {
  config: {
    name: "darkcode",
    version: "1.0",
    author: "SaGor",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "AI code generator"
    },
    description: {
      en: "Generate programming code using prompt and language"
    },
    category: "ai",
    guide: {
      en: "{p}darkcode <language> | <prompt>"
    }
  },

  onStart: async function ({ message, args }) {
    const input = args.join(" ");

    if (!input.includes("|")) {
      return message.reply(
        "Format\n\nExample:\n darkcode php | login system"
      );
    }

    const [language, ask] = input.split("|").map(t => t.trim());

    if (!language || !ask) {
      return message.reply("Language and prompt");
    }

    try {
      const res = await axios.get(
        "https://lmnx9.appletolha.com/darkcode-ai/api.php",
        {
          params: {
            action: "gen_code",
            ask,
            language
          },
          timeout: 20000
        }
      );

      const d = res.data;
      if (!d.success || !d.response?.Data) {
        return message.reply("not generate");
      }

      const data = d.response.Data;

      const reply =
`🤖 AI Code Generator

📌 Title: ${data.title}
💻 Language: ${data.language}

📜 Code:
${data.code}

🧠 Explanation:
${data.explanation}
`;

      return message.reply(reply);

    } catch (err) {
      return message.reply("❌ API Error / Timeout");
    }
  }
};