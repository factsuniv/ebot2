export interface ScriptStep {
  prompt: string;
  userResponseOptions: string[];
}

export type SalesScript = ScriptStep[];

const salesScripts: SalesScript[] = [
  // Script 1: Initial Greeting and Qualification
  [
    {
      prompt: "Hello! Thanks for your interest in our product. Are you looking to improve your team's productivity?",
      userResponseOptions: ["Yes, tell me more.", "No, not right now.", "What kind of product is this?"],
    },
    {
      prompt: "Great! Our product helps teams streamline their workflow and automate repetitive tasks. Are you currently using any project management tools?",
      userResponseOptions: ["Yes, we use [Tool Name].", "No, we're looking for a solution.", "What are the key features?"],
    },
    {
      prompt: "Okay. Our product integrates seamlessly with many popular tools and offers features like [Feature 1], [Feature 2], and [Feature 3]. Would you be interested in a personalized demo?",
      userResponseOptions: ["Yes, schedule a demo.", "No, send me more information.", "What's the pricing?"],
    },
  ],
  // Script 2: Addressing Pain Points
  [
    {
      prompt: "Hi there! Many of our customers find it challenging to manage multiple projects simultaneously. Is that something your team struggles with?",
      userResponseOptions: ["Yes, that's a major pain point.", "No, we have a good system in place.", "How can your product help?"],
    },
    {
      prompt: "I understand. Our product provides a centralized platform to track progress, assign tasks, and collaborate effectively, which can significantly reduce the stress of managing multiple projects. Would you like to see how it works?",
      userResponseOptions: ["Yes, show me a demo.", "No, I'm not interested.", "What are the benefits for my team?"],
    },
    {
      prompt: "By using our product, teams like yours have reported a 25% increase in efficiency and a significant reduction in missed deadlines. We can set up a quick demo to show you exactly how it can benefit your team. How does that sound?",
      userResponseOptions: ["Sounds good, let's do it.", "I need to think about it.", "Can you send me some case studies?"],
    },
  ],
];

export default salesScripts;
