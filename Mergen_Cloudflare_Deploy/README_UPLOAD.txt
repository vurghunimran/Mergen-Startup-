READY FOR DEPLOYMENT
====================

This folder contains all the files needed to publish the Mergen platform to Cloudflare Pages.

INSTRUCTIONS:
1. Go to the Cloudflare Dashboard > Pages.
2. Click "Create a project" > "Direct Upload".
3. Drag and drop this entire 'Mergen_Cloudflare_Deploy' folder into the upload area.
4. Click "Deploy Site".

FILES INCLUDED:
- index.html (Landing Page)
- client-auth.html / community-auth.html (Login/Signup)
- client-dashboard.html / community-dashboard.html (Dashboards)
- create-survey.html (Survey Creation Flow)
- js/ and css/ folders (Assets)

NOTE:
- This static deployment works with the "Mock Backend" automatically if no Supabase keys are provided.
- To enable the Real Backend, ensure your Supabase keys are set in 'js/supabase-config.js' before uploading, or configure Environment Variables in Cloudflare.
