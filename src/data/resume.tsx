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
  url: "https://github.com",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description: "sᴏғᴛᴡᴀʀᴇ ᴇɴɢɪɴᴇᴇʀ ᴛᴜʀɴᴇᴅ ᴇɴᴛʀᴇᴘʀᴇɴᴇᴜʀ. ɪ ʟᴏᴠᴇ ʙᴜɪʟᴅɪɴɢ ᴛʜɪɴɢs ᴀɴᴅ ʜᴇʟᴘɪɴɢ ᴘᴇᴏᴘʟᴇ. ᴠᴇʀʏ ᴀᴄᴛɪᴠᴇ ᴏɴ ᴡʜᴀᴛsᴀᴘᴘ ʙᴜsɪɴᴇssᴇs.ᴄᴏɴᴛɪɴᴜᴇ ʙᴜɪʟᴅɪɴɢ ᴄᴏᴅᴇ ғᴏʀ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ. [ʙᴜɪʟᴅsᴘᴀᴄᴇ ʙᴏᴛ](https://com).",
  summary: "ᴀᴛ ᴛʜᴇ ᴇɴᴅ ᴏғ 2026, ᴄᴏɴᴛɪɴᴜᴇ ʙᴜɪʟᴅɪɴɢ ᴄᴏᴅᴇ ғᴏʀ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ. [ʙᴜɪʟᴅsᴘᴀᴄᴇ ʙᴏᴛ](https://buildspace.so/sf1).", 
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
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "fanajb65@gmail.com",
    tel: "+26777821911",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com",
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
      company: "Owner name",
      href: "/owner",
      badges: ["Meta AI Verified"],
      location: "Botswana",
      title: "My name is njabulo",
      logoUrl: "/atomic.png",
      start: "age 20",
      end: "date Oct 20o5",
      description:
        "Meta AI Verified - Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
    },
    {
      company: "My work",
      href: "/repository.html",
      badges: ["Meta AI Verified"],
      location: "Santa Clara, CA",
      title: "Software Engineer",
      logoUrl: "/nvidia.png",
      start: "January 2024",
      end: "April 2026",
      description:
        "Meta AI Verified - Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
    },
    {
      company: "My country",
      href: "/repository.html",
      badges: ["Meta AI Verified"],
      location: "Toronto, ON",
      title: "Botswana and Zimbabwe",
      logoUrl: "/mitremedia.png",
      start: "am born in Zimbabwe",
      end: "my project in Botswana",
      description:
        "Meta AI Verified - Designed and implemented a robust password encryption and browser cookie storage system in Ruby on Rails. Leveraged the Yahoo finance API to develop the dividend.com equity screener",
    },
  ],
  education: [
    {
      school: "welcome",
      href: "",
      degree: "Meta AI Verified",
      logoUrl: "/buildspace.jpg",
      start: "",
      end: "2024 to updating 2026",
    },
  ],
  
  projects: [
    {
      title: "ɴᴊᴀʙᴜʟᴏ-ᴊʙ ʙᴏᴛ",
      href: "/njabulobot",
      dates: "last update February 2026 version ^4.12.9",
      active: true,
      description:
        "Meta AI Verified - Njabulo Jb' WhatsApp bot multi-device repository (NjabuloJ/Njabulo-Jb) has gained over 80 stars, showcasing its popularity among developers. This bot enables seamless WhatsApp interactions across multiple devices.",
      technologies: [
        "Meta AI Verified",
        "NJABULO-JB",
        "njabulo tech",
        "bot online",
        "fana UI",
        "whatsapp chats",
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
      dates: "last update February 2026 version ^4.12.9",
      active: true,
      description:
        "Meta AI Verified - GWM-XMD' WhatsApp bot multi-device repository (NjabuloJ/GWM-XMD) has gained over 80 stars, showcasing its popularity among developers. This bot enables seamless WhatsApp interactions across multiple devices.",
      technologies: [
        "Meta AI Verified",
        "GWM-XMD",
        "njabulo ui",
        "bot online",
        "whatsapp chats",
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
      dates: "last update Jeanunary 2026 version ^2.0.0",
      active: true,
      description:
        "Meta AI Verified - Get the Njabulo Jb Telegram bot or clone is free .- a powerful multi-device solution with over 80+ stars on GitHub.",
      technologies: [
        "Meta AI Verified",
        "telegram bot",
        "online",
        "fana UI",
        "njabulo UI",
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
      title: "ᴍʏ ᴜᴘᴅᴀᴛᴇ sᴇʀᴠɪᴄᴇ",
      href: "/business",
      dates: "follow my channel and group chats got updated",
      active: true,
      description:
        "Meta AI Verified - Thanks for your support! Join my channels and groups to get the latest updates on Njabulo JB. Stay ahead with new features and more!.",
      technologies: [
        "Meta AI Verified",
        "njabulo.js",
        "channel join",
        "group join",
        "fana UI",
      ],
      links: [
        {
          type: "Group & Channel",
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
        "Meta AI Verified - Hey, don't miss out! Follow me on Facebook, TikTok, YouTube, and Instagram for the latest updates and behind-the-scenes content! Stay connected and let's vibe! .",
      technologies: [
        "Meta AI Verified",
        "njabulo.js",
        "tiktok",
        "facebook",
        "Instagram",
        "YouTube",
      ],
      links: [
        {
          type: "Me on Social Media",
          href: "/contacts",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "magic-ui.png", 
    },
  ],
  hackathons: [
    {
      title: "Computer software",
      dates: "November 23rd - 25th, 2024",
      location: "Botswana' Gaborone",
      description:
        "Meta AI Verified - Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image: "computer-software.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "hack software",
      dates: "September 14th - 16th, 203",
      location: "Zimbabwe, bulawayo",
      description:
        "Meta AI Verified - Developed a mobile application which delivers university campus wide events in real time to all students.",
      image: "hack-software.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Njabulo Jb",
      dates: "March 23rd - 24th, 2018",
      location: "bulawayo, Gaborone",
      description:
        "Meta AI Verified - Developed a mobile application which communicates a victims medical data from inside an ambulance to doctors at hospital.",
      icon: "public",
      image: "me.png",
      links: [],
    },
    {
      title: "github clone",
      dates: "October 29, 2025",
      location: "Gaborone, Botswana",
      description:
        "Meta AI Verified - Developed an internal widget for uploading assignments using Waterloo's portal app",
      image: "github-cline.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "/repository.html",
        },
      ],
    },
  ],
} as const;
