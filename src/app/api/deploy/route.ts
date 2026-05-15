import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for active bots (in production, use a database)
const activeBots: Map<string, any> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, config, botId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    if (!sessionId.startsWith('GWM-XMD~')) {
      return NextResponse.json({ error: 'Session ID must start with GWM-XMD~' }, { status: 400 });
    }

    // Store bot configuration
    const botData = {
      id: botId || Date.now().toString(),
      sessionId,
      config,
      status: 'deploying',
      startedAt: new Date().toISOString(),
      repository: 'NjabuloJf/GWM-XMD'
    };

    activeBots.set(botData.id, botData);

    // Simulate deployment process
    setTimeout(() => {
      const bot = activeBots.get(botData.id);
      if (bot) {
        bot.status = 'running';
        activeBots.set(botData.id, bot);
      }
    }, 10000);

    return NextResponse.json({ 
      success: true, 
      message: 'Bot deployment started',
      botId: botData.id,
      status: 'deploying'
    });

  } catch (error) {
    console.error('Deployment error:', error);
    return NextResponse.json({ error: 'Deployment failed' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const botId = searchParams.get('botId');
  
  if (botId) {
    const bot = activeBots.get(botId);
    return NextResponse.json({ bot });
  }
  
  return NextResponse.json({ bots: Array.from(activeBots.values()) });
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const botId = searchParams.get('botId');
  
  if (botId) {
    activeBots.delete(botId);
    return NextResponse.json({ success: true, message: 'Bot stopped' });
  }
  
  return NextResponse.json({ error: 'Bot ID required' }, { status: 400 });
        }
