const { Command } = require("commander");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const program = new Command();
require("dotenv").config();
program.name("hey").description("CLI to ask questions to AI").version("1.0.0");

program
  .command("hey")
  .description("ask question to AI from CLI")
  .argument("<string>", "string to ask")
  .action((str) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = str;
    async function ask(prompt) {
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
    }
    ask(prompt);
  });

program.parse();
