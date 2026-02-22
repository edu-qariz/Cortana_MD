<div align="center">

```
╭────────────────────────────╮
│ ░█▀▀░█▀█░█▀▄░▀█▀░█▀█░█▀█░█▀█ │
│ ░█░░░█░█░█▀▄░░█░░█▀█░█░█░█▀█ │
│ ░▀▀▀░▀▀▀░▀░▀░░▀░░▀░▀░▀░▀░▀░▀ │
╰─────[ HOSTED EDITION ]─────╯
```

# CORTANA MD — WhatsApp Bot

**The most advanced WhatsApp Multi-Device bot. Self-host it on your own server.**

[![Deploy](https://img.shields.io/badge/Deploy-Now-brightgreen?style=for-the-badge)](#-deploy)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](#)

</div>

---

## ⚡ Features
- 🤖 **Full WhatsApp Bot** — Group management, AI, stickers, downloads & more
- 🔄 **Auto-Updates** — Automatically downloads the latest version every 60 seconds
- 📱 **Easy Pairing** — Link via phone number (no QR code needed!)
- 💻 **Self-Hosted** — Runs on YOUR server, YOUR resources
- 🔒 **Secure** — Your sessions stay on your server

---

## 🚀 Deploy

### Option 1: Pterodactyl / VPS Panel
> **Get a panel:** [Bot-Hosting.net](https://bot-hosting.net/?aff=1240477149576826890)

1. Create a new **Node.js** server on your panel
2. Upload or clone this repository
3. Set the startup command to `npm start`
4. Click **Start** and follow the pairing instructions in the console

### Option 2: Katabump
> **Get hosting:** [Katabump Dashboard](https://dashboard.katabump.com/auth/login#629473)

1. Create a new bot instance
2. Connect this GitHub repository
3. Click **Deploy** and follow the pairing instructions

### Option 3: Render
1. Fork this repository
2. Go to [Render.com](https://render.com) → **New Web Service**
3. Connect your GitHub fork
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `npm start`
6. Deploy!

### Option 4: Heroku
1. Fork this repository
2. Go to [Heroku](https://heroku.com) → **Create New App**
3. Connect your GitHub fork
4. Deploy!

### Option 5: Manual (Any VPS)
```bash
git clone https://github.com/edu-qariz/Cortana_MD.git
cd Cortana_MD
npm install
npm start
```

---

## 📱 Linking Your Bot

When you start the bot for the first time, you'll see:

```
╭────────────────────────────╮
│ ░█▀▀░█▀█░█▀▄░▀█▀░█▀█░█▀█░█▀█ │
│ ░█░░░█░█░█▀▄░░█░░█▀█░█░█░█▀█ │
│ ░▀▀▀░▀▀▀░▀░▀░░▀░░▀░▀░▀░▀░▀░▀ │
╰─────[ HOSTED EDITION ]─────╯
⚠️ No session found! Let's link your bot.
📱 Enter your WhatsApp number (e.g., 255619406167): 
```

1. Enter your phone number (with country code, no `+`)
2. You'll receive a **Pairing Code** (e.g., `A1B2-C3D4`)
3. On your phone: **WhatsApp → Settings → Linked Devices → Link a Device**
4. Choose **Link with Phone Number** and enter the code
5. Done! Your bot is now live 🎉

---

## ⚙️ Configuration

You can set these environment variables on your hosting panel:

| Variable | Default | Description |
|----------|---------|-------------|
| `PREFIX` | `.` | Command prefix (e.g., `.menu`) |
| `SESSION_DIR` | `./session` | Where session files are saved |

---

## 🔄 Auto-Updates

Cortana MD **automatically updates itself**! Every 60 seconds, it checks for new versions. When an update is found:
1. Downloads the latest version
2. Restarts the bot
3. You're running the newest features instantly!

No manual action needed.

---

## 📋 Commands

Type `.menu` in any chat to see all available commands.

---

## ❓ Support

- **Telegram:** [@cortabortz](https://t.me/cortabortz)

---

<div align="center">

**Made with 💀 by CORTANA**

</div>
