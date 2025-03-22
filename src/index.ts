import { Agentica } from "@agentica/core";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import typia from "typia";

import { GithubService } from "@wrtnlabs/connector-github";

dotenv.config();

export const agent = new Agentica({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    }),
    model: "gpt-4o-mini",
  },
  controllers: [
    {
      name: "Github Connector",
      protocol: "class",
      application: typia.llm.application<GithubService, "chatgpt">(),
      execute: new GithubService({
        secret: process.env.GITHUB_ACCESS_TOKEN!,
        aws: {},
      }),
    },
  ],
});

const main = async () => {
  console.log(await agent.conversate("What can you do?"));
};

main();
