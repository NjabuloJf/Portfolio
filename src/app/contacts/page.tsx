import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, Phone, Mail, MapPin, Clock, Globe, Heart } from "lucide-react";
import { ButtonszPairsZ } from "@/components/buttonsz-pairsz";
import { ContainsFeatures } from "@/components/contains-features";

export const metadata: Metadata = {
  title: "Contacts | Njabulo Jb Dev Tech",
  description: "Connect with Njabulo Jb Dev Tech on all social media platforms. WhatsApp, Telegram, TikTok, Facebook, YouTube, and more.",
  openGraph: {
    title: "Contacts - Njabulo Jb Dev Tech",
    description: "Get in touch with Njabulo Jb Dev Tech through various social media channels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacts - Njabulo Jb Dev Tech",
    description: "Connect on social media",
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function ContactsPage() {
  return (
    <section id="contacts">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Contact Us
            <span className="ml-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md px-2 py-1 text-sm">ɢᴇᴛ ɪɴ ᴛᴏᴜᴄʜ</span>
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          ᴄᴏɴɴᴇᴄᴛ ᴡɪᴛʜ ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴅᴇᴠ ᴛᴇᴄʜ ᴏɴ ᴀʟʟ sᴏᴄɪᴀʟ ᴍᴇᴅɪᴀ ᴘʟᴀᴛғᴏʀᴍs. ᴡᴇ'ʀᴇ ᴀᴠᴀɪʟᴀʙʟᴇ 24/7 ᴛᴏ ᴀssɪsᴛ ʏᴏᴜ ᴡɪᴛʜ ʏᴏᴜʀ ǫᴜᴇʀɪᴇs.
        </p>
      </BlurFade>

      {/* Quick Contact Info */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 border border-border rounded-lg text-center bg-card/30 hover:bg-accent/30 transition-all duration-200">
            <Phone className="size-6 mx-auto mb-2 text-green-500" />
            <p className="text-sm font-semibold">Phone/WhatsApp</p>
            <p className="text-xs text-muted-foreground">+26777821911</p>
            <p className="text-xs text-muted-foreground">Available 24/7</p>
          </div>
          <div className="p-4 border border-border rounded-lg text-center bg-card/30 hover:bg-accent/30 transition-all duration-200">
            <Mail className="size-6 mx-auto mb-2 text-blue-500" />
            <p className="text-sm font-semibold">Email</p>
            <p className="text-xs text-muted-foreground">fanajb65@gmail.com</p>
            <p className="text-xs text-muted-foreground">fanajb54@gmail.com</p>
          </div>
          <div className="p-4 border border-border rounded-lg text-center bg-card/30 hover:bg-accent/30 transition-all duration-200">
            <Clock className="size-6 mx-auto mb-2 text-purple-500" />
            <p className="text-sm font-semibold">Response Time</p>
            <p className="text-xs text-muted-foreground">&lt; 24 hours</p>
            <p className="text-xs text-muted-foreground">Priority for Premium</p>
          </div>
        </div>
      </BlurFade>

      {/* Social Media Buttons Component */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
        <ButtonszPairsZ />
      </BlurFade>

      {/* Features Component */}
      <BlurFade delay={BLUR_FADE_DELAY * 1.8}>
        <ContainsFeatures />
      </BlurFade>

      {/* Business Hours */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="mt-8 p-6 border border-border rounded-xl bg-gradient-to-br from-primary/5 to-transparent">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="size-5 text-primary" />
            Business Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 border-b border-border">
                <span className="text-sm font-medium">Monday - Friday</span>
                <span className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-border">
                <span className="text-sm font-medium">Saturday</span>
                <span className="text-sm text-muted-foreground">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between items-center p-2 border-b border-border">
                <span className="text-sm font-medium">Sunday</span>
                <span className="text-sm text-muted-foreground">Closed</span>
              </div>
            </div>
            <div className="p-3 bg-card/50 rounded-lg">
              <p className="text-sm font-medium mb-2">📌 Office Location</p>
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <MapPin className="size-3 mt-0.5 shrink-0" />
                123 Tech Street, Innovation Hub<br />
                Gaborone, Botswana<br />
                2196
              </p>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Map Section */}
      <BlurFade delay={BLUR_FADE_DELAY * 2.3}>
        <div className="mt-6 p-4 border border-border rounded-xl overflow-hidden">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Globe className="size-4" />
            Find Us
          </h3>
          <div className="bg-accent/20 h-48 rounded-lg flex items-center justify-center border border-border">
            <div className="text-center">
              <MapPin className="size-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Interactive Map Integration</p>
              <p className="text-xs text-muted-foreground">Gaborone , Botswana</p>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Support Options */}
      <BlurFade delay={BLUR_FADE_DELAY * 2.5}>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link
            href="/contacts/faq"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            FAQ
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/contacts/support"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            Support Ticket
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/contacts/report-bug"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            Report Bug
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </BlurFade>

      {/* Footer */}
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="mt-8 text-center p-4 border-t border-border">
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Heart className="size-3 text-red-500" />
            <span>Njabulo Jb Dev Tech - Connecting People Through Technology</span>
            <Heart className="size-3 text-red-500" />
          </div>
        </div>
      </BlurFade>
    </section>
  );
              }
