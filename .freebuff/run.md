# Run Doc — Adweit Manwatkar Portfolio (Vite + React + Tailwind v4 + Framer Motion)

## Reproduce artifacts

```bash
# from project root (C:\Users\Tanisq\OneDrive\Desktop\Portfolio)
npm install
```

That's all — no `.env` files exist, and none are required. All content
(identity, links, projects, education, skills) lives in `src/content.js`;
the portrait URL can be swapped there (or point it at `/portrait.jpg`
placed in `public/` — the `Portrait` component falls back to an AM
monogram if the remote image can't load, e.g. LinkedIn CDN blocks
hotlinking).

## Run the server (dev)

```bash
npm run dev -- --port 5199 --strictPort
```

- Default port 5173 is avoided in case another thread/user has it busy;
  5199 has been used consistently and the current server (pid 7804)
  serves `http://localhost:5199/`.
- Log to `.freebuff/preview-*.log` when starting detached.
- Detach recipe (Windows PowerShell, per preview_state):

```powershell
powershell -NoProfile -Command "(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev','--','--port','5199','--strictPort' -RedirectStandardOutput '.freebuff\preview-run.log' -RedirectStandardError '.freebuff\preview-run.log.err' -WindowStyle Hidden -PassThru).Id"
```

(Start-Process requires stdout and stderr to go to DIFFERENT files.)

## Production build

```bash
npm run build   # outputs dist/
npm run preview # serve dist/ locally
```
