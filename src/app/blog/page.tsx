import BlurFade from "@/components/magicui/blur-fade";
import { allPosts } from "content-collections";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";
import { ChevronRight, Download, Copy, Server, Clock, Bot, Shield, Zap, Database, Cloud } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | GWM-XMD WhatsApp Bot",
  description: "Thoughts on software development, life, and more. GWM-XMD WhatsApp Bot deployment and management.",
  openGraph: {
    title: "Blog | GWM-XMD WhatsApp Bot",
    description: "Thoughts on software development, life, and more. GWM-XMD WhatsApp Bot deployment and management.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | GWM-XMD WhatsApp Bot",
    description: "Thoughts on software development, life, and more.",
  },
};

const PAGE_SIZE = 5;
const BLUR_FADE_DELAY = 0.04;

// Button Pair Component
function ButtonPair() {
  const handleCopyEnv = async () => {
    const envTemplate = `# GWM-XMD WhatsApp Bot Configuration
# Generated on: ${new Date().toLocaleString()}

# Bot Configuration
BOT_NAME=GWM-XMD
PREFIX=.
OWNER_NUMBER=1234567890
SESSION_ID=your_session_id_here

# API Keys
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key

# Database
MONGODB_URI=mongodb://localhost:27017/gwm-xmd
REDIS_URL=redis://localhost:6379

# Deployment
PORT=3000
NODE_ENV=production

# UptimeRobot
UPTIMEROBOT_API_KEY=your_uptimerobot_key
MONITOR_URL=https://your-app-url.herokuapp.com

# Features
ENABLE_AI=true
ENABLE_GAMES=true
ENABLE_DOWNLOADER=true
ENABLE_GROUP_TOOLS=true
ENABLE_ANTI_LINK=true
ENABLE_AUTO_REACT=true
ENABLE_AUTO_STATUS_VIEW=true

# Webhook
WEBHOOK_URL=https://your-webhook-url.com
WEBHOOK_SECRET=your_webhook_secret

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000

# Logging
LOG_LEVEL=info
ENABLE_DEBUG=false`;

    try {
      await navigator.clipboard.writeText(envTemplate);
      alert("✅ .env template copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("❌ Failed to copy. Please copy manually.");
    }
  };

  const handleDownloadEnv = () => {
    const envContent = `# GWM-XMD WhatsApp Bot Configuration
# Generated on: ${new Date().toLocaleString()}

# Bot Configuration
BOT_NAME=GWM-XMD
PREFIX=.
OWNER_NUMBER=1234567890
SESSION_ID=your_session_id_here

# API Keys
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key

# Database
MONGODB_URI=mongodb://localhost:27017/gwm-xmd
REDIS_URL=redis://localhost:6379

# Deployment
PORT=3000
NODE_ENV=production

# UptimeRobot
UPTIMEROBOT_API_KEY=your_uptimerobot_key
MONITOR_URL=https://your-app-url.herokuapp.com

# Features
ENABLE_AI=true
ENABLE_GAMES=true
ENABLE_DOWNLOADER=true
ENABLE_GROUP_TOOLS=true
ENABLE_ANTI_LINK=true
ENABLE_AUTO_REACT=true
ENABLE_AUTO_STATUS_VIEW=true

# Webhook
WEBHOOK_URL=https://your-webhook-url.com
WEBHOOK_SECRET=your_webhook_secret

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000

# Logging
LOG_LEVEL=info
ENABLE_DEBUG=false`;

    const blob = new Blob([envContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".env";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("✅ .env file downloaded!");
  };

  const deployToHeroku = () => {
    window.open("https://heroku.com/deploy?template=https://github.com/yourusername/gwm-xmd-wa-bot", "_blank");
  };

  const deployToRender = () => {
    window.open("https://render.com/deploy?repo=https://github.com/yourusername/gwm-xmd-wa-bot", "_blank");
  };

  const setupUptimeBot = () => {
    window.open("https://uptimerobot.com/dashboard", "_blank");
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Main Button Pair */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopyEnv}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Copy className="size-4" />
          Copy .env
        </button>
        <button
          onClick={handleDownloadEnv}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Download className="size-4" />
          Download .env
        </button>
      </div>

      {/* Deployment Buttons */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Deploy to:</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={deployToHeroku}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Cloud className="size-4 text-purple-600" />
            Heroku
          </button>
          <button
            onClick={deployToRender}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Server className="size-4 text-blue-600" />
            Render
          </button>
          <button
            onClick={setupUptimeBot}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-all duration-200"
          >
            <Clock className="size-4 text-green-600" />
            UptimeRobot
          </button>
        </div>
      </div>
    </div>
  );
}

// GWM-XMD Features Component
function GWMXFeatures() {
  const features = [
    { icon: <Bot className="size-5" />, name: "AI Chatbot", description: "OpenAI & Groq integration for smart responses" },
    { icon: <Database className="size-5" />, name: "Database Support", description: "MongoDB & Redis for data persistence" },
    { icon: <Zap className="size-5" />, name: "Media Downloader", description: "Download videos, music, and images" },
    { icon: <Shield className="size-5" />, name: "Anti-Link & Anti-Spam", description: "Protect groups from spam" },
    { icon: <Server className="size-5" />, name: "Group Management", description: "Welcome, goodbye, and moderation tools" },
    { icon: <Clock className="size-5" />, name: "Auto Status View", description: "Automatic status viewer" },
  ];

  return (
    <div className="mb-6 p-4 border border-border rounded-xl bg-card/50">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Bot className="size-5" />
        GWM-XMD WhatsApp Bot Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent/30 transition-colors">
            <span className="text-primary">{feature.icon}</span>
            <div>
              <p className="text-sm font-medium">{feature.name}</p>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  const posts = allPosts;
  const sortedPosts = [...posts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginatedPosts, pagination } = paginate(sortedPosts, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Blog <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">{sortedPosts.length} posts</span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          GWM-XMD WhatsApp Bot - Advanced WhatsApp bot with AI, games, and group management features.
        </p>
      </BlurFade>

      {/* Button Pair and Features Section */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
        <ButtonPair />
        <GWMXFeatures />
      </BlurFade>

      {paginatedPosts.length > 0 ? (
        <>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-col gap-5">
              {paginatedPosts.map((post, id) => {
                const slug = post._meta.path.replace(/\.mdx$/, "");
                const indexNumber = (pagination.page - 1) * PAGE_SIZE + id + 1;
                return (
                  <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={slug}>
                    <Link
                      className="flex items-start gap-x-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      href={`/blog/${slug}`}
                    >
                      <span className="text-xs font-mono tabular-nums font-medium mt-[5px]">
                        {String(indexNumber).padStart(2, "0")}.
                      </span>
                      <div className="flex flex-col gap-y-2 flex-1">
                        <p className="tracking-tight text-lg font-medium">
                          <span className="group-hover:text-foreground transition-colors">
                            {post.title}
                            <ChevronRight
                              className="ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                              aria-hidden
                            />
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {post.publishedAt}
                        </p>
                      </div>
                    </Link>
                  </BlurFade>
                );
              })}
            </div>
          </BlurFade>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex gap-3 flex-row items-center justify-between mt-8">
                <div className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </div>
                <div className="flex gap-2 sm:justify-end">
                  {pagination.hasPreviousPage ? (
                    <Link
                      href={`/blog?page=${pagination.page - 1}`}
                      className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Previous
                    </Link>
                  ) : (
                    <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      Previous
                    </span>
                  )}
                  {pagination.hasNextPage ? (
                    <Link
                      href={`/blog?page=${pagination.page + 1}`}
                      className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Next
                    </Link>
                  ) : (
                    <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      Next
                    </span>
                  )}
                </div>
              </div>
            </BlurFade>
          )}
        </>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              No blog posts yet. Check back soon!
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
    }
