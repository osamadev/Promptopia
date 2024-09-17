import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

//Get prompt details by id
export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response(JSON.stringify({ message: "Prompt not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Prompt retrieval failed" }),
      {
        status: 500,
      }
    );
  }
};

//Patch or update the prompt

export const PATCH = async (request, { params }) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response(JSON.stringify({ message: "Prompt not found" }), {
        status: 404,
      });
    }
    const { prompt: newPrompt, tag: newTag } = await request.json();
    prompt.prompt = newPrompt;
    prompt.tag = newTag;
    await prompt.save();
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Prompt update failed" }), {
      status: 500,
    });
  }
};

//Delete the prompt
export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();
    await Prompt.findByIdAndDelete(params.id);
    return new Response(JSON.stringify({ message: "Prompt deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Prompt deletion failed" }), {
      status: 500,
    });
  }
};
