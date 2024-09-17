import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  try {
    await connectToDatabase();
    const { userId, prompt, tag } = await req.json();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Prompt creation failed" }), {
      status: 500,
    });
  }
};
