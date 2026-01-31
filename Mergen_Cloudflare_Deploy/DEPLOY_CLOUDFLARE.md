# How to Deploy Mergen to Cloudflare

You have two easy ways to deploy this project. The logical "Production Ready" files have been prepared in the **`dist`** folder for you.

## Option 1: Drag & Drop (Easiest)
1.  Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) and log in.
2.  Navigate to **Workers & Pages** > **Create Application** > **Pages** > **Upload Assets**.
3.  Name your project (e.g., `mergen-platform`).
4.  Open your project folder on your computer.
5.  **Drag and drop the entire `dist` folder** into the upload area.
6.  Click **Deploy Site**.

## Option 2: Connect to Git (Recommended for updates)
1.  Push this entire project to a GitHub repository.
2.  Go to Cloudflare Dashboard > **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
3.  Select your repository.
4.  Configure the build settings:
    *   **Framework preset**: None
    *   **Build command**: (Leave empty)
    *   **Build output directory**: `dist` (or just leave empty to deploy root, but `dist` is cleaner)
5.  Click **Save and Deploy**.

## Important: Environment Variables
Currently, the API keys (like Gemini) are stored client-side in the code for this demo.
For a live production app, you would typically use Cloudflare Workers or similar to hide these keys, but for this prototype, the current setup will work immediately after deployment.

## Verify Deployment
Once deployed, Cloudflare will give you a `*.pages.dev` URL.
Open it and test:
1.  **Sign Up** as a client.
2.  **Create** a survey.
3.  **Launch** it.
4.  **Log out** and check the Community view.
