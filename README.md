# Humanitarian Betterment Foundation

Next.js site with separate Nigeria and Canada experiences:

- `/` — choose Nigeria or Canada (modal)
- `/ng` — HBF Nigeria (programs, ECOSOC, Warri/Abuja, donate)
- `/ca` — HBF Canada Society (Surrey, programs & giving via www.hbfcanada.ca)

Official links:

- Nigeria: https://www.humanitarianbettermentf.org
- Canada: https://www.hbfcanada.ca

Legacy paths `/about`, `/programs`, and `/donate-nigeria` redirect to `/ng/*`.

```bash
npm run dev
```

Open http://127.0.0.1:5173/

## Admin

Desktop only: http://127.0.0.1:5173/admin

Hero images, donate account details, and events for Nigeria and Canada are stored in Supabase. Local secrets live in `.env` (not committed).
