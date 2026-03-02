# Deal Scraper – Find Limited-Time Restaurant Deals

🍽️ Automatically finds limited-time restaurant deals on Instagram and displays them in a **responsive, mobile-friendly dashboard**, so users don’t have to scroll feeds or rely on email alerts.  

🚀 Features **daily automated scraping, mobile + desktop friendly UI, and dark mode** for a polished user experience.  

---

## Problem / Motivation

- Manually finding restaurant deals on Instagram is **time-consuming and inefficient** due to cluttered feeds and frequent scrolling.  
- Goal: Build a tool to **automate discovery**, save time, and make deal-finding effortless for users.  

---

## Solution / Project Overview

- **Scraping:** Automatically collects Instagram posts from restaurants and food influencers once per day via **Apify**.  
- **Filtering:** Detects deals using **keywords + regex** rules to identify limited-time promotions.
- **Inference:** Generates user-friendly deal titles from captions using an **LLM from Hugging Face**.   
- **Persistence:** Stores deals in a **PostgreSQL database** for easy browsing and filtering.  
- **Frontend:** Responsive dashboard built with **Next.js + Tailwind**, with dark mode, demo toggle, and deal badges.  
- **Image Hosting:** Downloads Instagram previews and hosts them reliably on **Cloudinary**.  
- **Scheduling:** Runs daily via **GitHub Actions**, avoiding cold-start issues with free hosting services.  

---

## Key Achievements / Impact

- **Saves time:** Users no longer need to follow Instagram accounts and scroll their feed manually.  
- **Accessible dashboard:** Works seamlessly on **mobile and desktop**, with dark/light mode.

---

## Tech Stack

- **Backend:** Node.js, TypeScript, Prisma, PostgreSQL  
- **Frontend:** Next.js, React, Tailwind CSS  
- **Deployment / Automation:** Netlify, Neon, Cloudinary, GitHub Actions
- **Additional Tools:** Apify for Instagram Scraping, Hugging Face for LLM inference (Meta/Llama-3.0-8B-Instruct)  

---

## Demo

[https://dealscraperwebpage.netlify.app](https://dealscraperwebpage.netlify.app/?demo=1)
