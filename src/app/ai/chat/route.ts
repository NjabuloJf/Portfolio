import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, model, apiKey, deepThink, webSearch, history } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 400 });
    }

    // Determine which API to use
    let apiUrl = "";
    let headers: any = {};
    let body: any = {};

    if (model.includes("deepseek")) {
      apiUrl = "https://api.deepseek.com/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      };
      body = {
        model: model,
        messages: [
          ...history,
          { role: "user", content: message }
        ],
        temperature: deepThink ? 0.1 : 0.7,
        stream: false
      };
    } else if (model.includes("gpt")) {
      apiUrl = "https://api.openai.com/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      };
      body = {
        model: model,
        messages: [
          ...history,
          { role: "user", content: message }
        ],
        temperature: 0.7
      };
    } else if (model.includes("llama")) {
      apiUrl = "https://api.groq.com/openai/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      };
      body = {
        model: model,
        messages: [
          ...history,
          { role: "user", content: message }
        ],
        temperature: 0.7
      };
    } else {
      // Fallback to DeepSeek
      apiUrl = "https://api.deepseek.com/v1/chat/completions";
      headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      };
      body = {
        model: "deepseek-chat",
        messages: [
          ...history,
          { role: "user", content: message }
        ]
      };
    }

    // Add web search context if enabled
    if (webSearch) {
      body.messages.unshift({
        role: "system",
        content: "You have web search capability. Provide up-to-date information from the web when asked about current events, news, or real-time information."
      });
    }

    // Add deep think instruction if enabled
    if (deepThink) {
      body.messages.unshift({
        role: "system",
        content: "You are in DeepThink mode. Take time to analyze the question thoroughly, consider multiple perspectives, and provide detailed, well-reasoned responses. Show your reasoning process."
      });
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: `API Error: ${error}` }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response from AI";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
        }
