# 🔐 Crack the Code — Admin Console (React + Vite)

React/Vite admin dashboard for the Crack the Code event platform, deployed separately
from its backend (e.g. this app on Vercel, `server/` on Render).

## ⚠️ Required setup: point this app at your backend

This app and the backend in `server/` are **two separate deployments with two separate
URLs**. The frontend has no way to know where the backend lives unless you tell it —
so this step is mandatory, not optional.

1. Deploy `server/` (see below) and copy its public URL, e.g. `https://your-app.onrender.com`.
2. In your **Vercel project settings → Environment Variables**, add:
   ```
   VITE_API_BASE = https://your-app.onrender.com
   ```
   (no trailing slash)
3. **Redeploy** after adding/changing this variable. Vite bakes environment variables
   into the built JavaScript at *build time* — saving the variable alone does nothing
   until the app is rebuilt.

If you skip this, the login screen will show a warning banner (rather than failing
silently), and any request will fail with a clear message telling you what's wrong.

### "Request failed" checklist

If you still see an error after logging in:

- Open the browser DevTools → Network tab, retry, and check what URL the failed
  request actually went to. If it's your Vercel domain instead of your Render domain,
  `VITE_API_BASE` isn't set (or you didn't redeploy after setting it).
- Make sure the URL uses `https://`, matching this app's own protocol (a `https` page
  calling `http://` will be blocked as mixed content).
- If using Render's free tier, the backend spins down after 15 minutes of inactivity —
  the first request after that can take 30–60 seconds while it wakes up.
- Double-check the admin key you're typing matches `ADMIN_KEY` in the backend's
  environment variables exactly (case-sensitive, no extra spaces).

## Local development

```bash
npm install
cp .env.example .env.local   # then edit VITE_API_BASE to your local server, e.g. http://localhost:4000
npm run dev
```

## Deploying the backend (`server/`)

See `server/.env.example` for required environment variables (`ADMIN_KEY`,
optionally `GEMINI_API_KEY`). On Render: create a Web Service with root directory
`server`, build command `npm install`, start command `npm start`.

## Deploying this frontend

`vercel.json` is already configured for a Vite SPA (build command `npm run build`,
output directory `dist`, with a catch-all rewrite to `index.html` for client-side
routing). Just connect the repo to Vercel and set `VITE_API_BASE` as described above.
