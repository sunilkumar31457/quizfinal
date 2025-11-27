# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Docker

This project includes a Dockerfile to build and serve the Vite production build with nginx.

Build the image:

```powershell
docker build -t quiz-frontend:latest .
```

Run a container (frontend only):

```powershell
docker run --rm -p 80:80 --name quiz-frontend quiz-frontend:latest
```

If your backend runs outside the container on port 8081 (locally), the included `nginx.conf` forwards `/api` to `http://host.docker.internal:8081/` so the frontend can reach the backend from inside Docker on Windows.

Note for Linux users: `host.docker.internal` may not be available by default; use Docker's host-gateway feature when running the container:

```powershell
docker run --add-host=host.docker.internal:host-gateway --rm -p 80:80 --name quiz-frontend quiz-frontend:latest

Development Notes:
- Vite dev server listens on port 3000. We've added a `server.proxy` configuration to forward `/api` to `http://localhost:8081` during dev.
- At runtime, the frontend uses a relative path `/api` for backend calls by default. If you need to override the API base URL at build time, set `VITE_API_BASE_URL`:

```powershell
# build with a custom API base (e.g., to point to /api at runtime)
VITE_API_BASE_URL=/api npm run build
```

```


