# Todo App

This simple React application lets you manage a list of tasks. It uses React's UMD builds so no build step is required.

## Development

Install dependencies:

```bash
npm install
```

This project requires **Node.js 20.11.1** or later. If you use `nvm`, you can run:

```bash
nvm install 20.11.1
nvm use 20.11.1
```

Run a local server to view the app:

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploying to Vercel

You can deploy the app as a static site with the Vercel CLI:

```bash
npm install
npx vercel --prod
```

When prompted, choose **Other** as the framework and leave the build command
empty. Set the output directory to `.` (the project root). Vercel will then
host `index.html` and `app.js` directly.
