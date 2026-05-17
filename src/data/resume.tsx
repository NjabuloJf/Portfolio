import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";

export const DATA = {
  name: "ɳʝαႦυʅσ ʝႦ",
  initials: "",
  url: "https://github.com/NjabuloJf/Njabulo-Jb",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description: "sᴏғᴛᴡᴀʀᴇ ᴇɴɢɪɴᴇᴇʀ ᴛᴜʀɴᴇᴅ ᴇɴᴛʀᴇᴘʀᴇɴᴇᴜʀ. ɪ ʟᴏᴠᴇ ʙᴜɪʟᴅɪɴɢ ᴛʜɪɴɢs ᴀɴᴅ ʜᴇʟᴘɪɴɢ ᴘᴇᴏᴘʟᴇ. ᴠᴇʀʏ ᴀᴄᴛɪᴠᴇ ᴏɴ ᴡʜᴀᴛsᴀᴘᴘ ʙᴜsɪɴᴇssᴇs.ᴄᴏɴᴛɪɴᴜᴇ ʙᴜɪʟᴅɪɴɢ ᴄᴏᴅᴇ ғᴏʀ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ. [ʙᴜɪʟᴅsᴘᴀᴄᴇ ʙᴏᴛ]",
  summary: "ᴀᴛ ᴛʜᴇ ᴇɴᴅ ᴏғ 2026, ᴄᴏɴᴛɪɴᴜᴇ ʙᴜɪʟᴅɪɴɢ ᴄᴏᴅᴇ ғᴏʀ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ. [ʙᴜɪʟᴅsᴘᴀᴄᴇ ʙᴏᴛ](ʜᴛᴛᴘs://ʙᴜɪʟᴅsᴘᴀᴄᴇ.sᴏ/sғ1).", 
    avatarUrl: "/me.png",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "Go", icon: Golang },
    { name: "Postgres", icon: Postgresql },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
    { name: "Java", icon: Java },
    { name: "C++", icon: Csharp },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/business", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "fanajb65@gmail.com",
    tel: "+26777821911",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/NjabuloJf/Njabulo-Jb",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.facebook.com/profile.php?id=100094314013209",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://www.instagram.com/njabulojb871?igsh=MTJ4cXZydW4yNHhpeg==",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "http://www.youtube.com/@Njabulo-JBOffice",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "ᴏᴡɴᴇʀ ɴᴀᴍᴇ",
      href: "/repository.html",
      badges: [],
      location: "Botswana",
      title: "ᴍʏ ɴᴀᴍᴇ ɪs ɴᴊᴀʙᴜʟᴏ",
      logoUrl: "/atomic.png",
      start: "age 20",
      end: "date Oct 20o5",
      description:
        "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
    },
    {
      company: "ᴍʏ ʙᴜsɪɴᴇss",
      href: "/business",
      badges: [],
      location: "Santa Clara, CA",
      title: "sᴏғᴛᴡᴀʀᴇ ᴇɴɢɪɴᴇᴇʀ",
      logoUrl: "/nvidia.png",
      start: "January 2024",
      end: "April 2026",
      description:
        "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
    },
    {
      company: "ᴍʏ ᴄᴏᴜɴᴛʀʏ",
      href: "/repository.html",
      badges: [],
      location: "Toronto, ON",
      title: "ʙᴏᴛsᴡᴀɴᴀ ᴀɴᴅ ᴢɪᴍʙᴀʙᴡᴇ",
      logoUrl: "/mitremedia.png",
      start: "see more",
      end: "my project in Botswana",
      description:
        "Designed and implemented a robust password encryption and browser cookie storage system in Ruby on Rails. Leveraged the Yahoo finance API to develop the dividend.com equity screener",
    },
  ],
  education: [
    {
      school: "ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴍʏ ᴘʀᴏᴊᴇᴄᴛ🙏💃",
      href: "/business",
      degree: "ᴛʜɪs ɪs ɴᴊᴀʙᴜʟᴏ ᴛᴇᴄʜ2026",
      logoUrl: "/buildspace.jpg",
      start: "",
      end: "2024 to updating 2026",
    },
  ],
  
  projects: [
    {
      title: "ɴᴊᴀʙᴜʟᴏ-ᴊʙ ʙᴏᴛ",
      href: "/njabulobot",
      dates: "last update February 2026 version ^4.12.9¬",
      active: true,
      description:
        "Njabulo Jb' WhatsApp bot multi-device repository (NjabuloJ/Njabulo-Jb) has gained over 80 stars, showcasing its popularity among developers. This bot enables seamless WhatsApp interactions across multiple devices.",
      technologies: [
        "NJABULO TECH",
        "WHATSAPP BOT",
        "CHATS BOT",
      ],
      links: [
        {
          type: "Njabulo-Jb",
          href: "/njabulobot",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "njabulobot.png",
    },
     {
      title: "ɢᴡᴍ-xᴍᴅ",
      href: "/gwmxmd",
      dates: "last update February 2026 version ^4.12.9¬",
      active: true,
      description:
        "GWM-XMD' WhatsApp bot multi-device repository (NjabuloJ/GWM-XMD) has gained over 80 stars, showcasing its popularity among developers. This bot enables seamless WhatsApp interactions across multiple devices.",
      technologies: [
        "GWM-XMD",
        "NJABULO TECH",
        "WHATSAPP BOT",
      ],
      links: [
        {
          type: "GWM-XMD",
          href: "/gwmxmd",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "gmx-xmd.png",
    },
    {
      title: "ᴛᴇʟᴇɢʀᴀᴍ ʙᴏᴛ",
      href: "/njabulo-telegrambot",
      dates: "last update Jeanunary 2026 version ^2.0.0¬",
      active: true,
      description:
        "Get the Njabulo Jb Telegram bot or clone is free .- a powerful multi-device solution with over 80+ stars on GitHub.",
      technologies: [
        "TELEGRAM BOT",
        "ONLINE",
        "NJABULO TECH",
      ],
      links: [
        {
          type: "Get Telegram Bot",
          href: "/njabulo-telegrambot",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "ib.png",
    },
    {
      title: "ᴍʏ ʙᴜsɪɴᴇss ᴜᴘᴅᴀᴛᴇ sᴇᴠɪᴇʀ",
      href: "/business",
      dates: "[MY BUSINESS] Available and update updated",
      active: true,
      description:
        "Welcome to Njabulo-Jb TECH! I am a full-stack developer specializing in WhatsApp and Telegram bot development, website creation, and e-commerce solutions. With over 80+ stars on GitHub and hundreds of satisfied customers.",
      technologies: [
        "BUSINESS",
        "MUKURU",
        "MONEY UI",
        "FMB Visa CARD",
      ],
      links: [
        {
          type: "My Business",
          href: "/business",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "mitremediaa.png",
    },
    {
      title: "ᴍᴇssᴀɢᴇ ᴏʀ ғᴏʟʟᴏᴡ ᴍᴇ",
      href: "/contacts",
      dates: "my media am in tiktok & Facebook & Instagram & YouTube",
      active: true,
      description:
        "Hey don't miss out! Follow me on Facebook, TikTok, YouTube, and Instagram for the latest updates and behind-the-scenes content!  Stay connected and let's vibe because text times you will free in project! .",
      technologies: [
        "NJABULO JB",
        "OWNER ME",
        "MESSAGE",
        "MEDIA",
      ],
      links: [
        {
          type: "Message Me",
          href: "/contacts",
          icon: <Icons.globe className="size-3" />,
        },
      ],
     image: "magic-ui.png", 
    },
  ],
  hackathons: [
    {
      title: "ᴄᴏᴍᴘᴜᴛᴇʀ sᴏғᴛᴡᴀʀᴇ",
      dates: "November 23rd - 25th, 2024",
      location: "Botswana' Gaborone",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image: "computer-software.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "ʜᴀᴄᴋ sᴏғᴛᴡᴀʀᴇ",
      dates: "September 14th - 16th, 2026",
      location: "Zimbabwe, bulawayo",
      description:
        "Developed a mobile application which delivers university campus wide events in real time to all students.",
      image: "hack-software.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "ɴᴊᴀʙᴜʟᴏ ᴊʙ",
      dates: "March 23rd - 24th, 2024",
      location: "bulawayo, Gaborone",
      description:
        "Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.",
      icon: "public",
      image: "me.png",
      links: [],
    
    },
    {
      title: "ɢɪᴛʜᴜʙ ᴄʟᴏɴᴇ",
      dates: "October 29, 2025",
      location: "Gaborone, Botswana",
      description:
        "Developed an internal widget for uploading assignments using Waterloo's portal app",
      image: "github-cline.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https:// github.com/NjabuloJf/Njabulo-Jb",
        },
      ],
    },
  ],
} as const;
