import { Command } from "commander";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config();

const program = new Command();
program.name("hey").description("CLI to ask questions to AI").version("1.0.0");

program
  .command("hey")
  .description("ask question to AI from CLI")
  .argument("<string>", "string to ask")
  .action((str: string) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = str;

    async function ask(prompt: string): Promise<void> {
      try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
      } catch (error) {
        console.error("Error generating content:", error);
      }
    }

    ask(prompt);
  });

program.parse();
