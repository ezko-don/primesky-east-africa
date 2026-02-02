# Fix R2 CORS Configuration

## The Problem
Your R2 bucket is blocking requests from your website due to CORS (Cross-Origin Resource Sharing) restrictions.

## Solution: Configure CORS on Your R2 Bucket

### Step 1: Go to Your R2 Bucket Settings

1. Open: https://dash.cloudflare.com/e40e039279be1ccce2747577f2aa48fb/r2/default/buckets/primesky-media/settings

2. Scroll down to find **"CORS Policy"** section

### Step 2: Add CORS Configuration

Click **"Edit CORS Policy"** or **"Add CORS Policy"** and paste this JSON:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:8081",
      "http://localhost:5173",
      "http://localhost:3000",
      "https://primeskyeastafrica.com",
      "https://*.vercel.app",
      "https://*.netlify.app"
    ],
    "AllowedMethods": [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "HEAD"
    ],
    "AllowedHeaders": [
      "*"
    ],
    "ExposeHeaders": [
      "ETag",
      "Content-Length"
    ],
    "MaxAgeSeconds": 3600
  }
]
```

### Step 3: Enable Public Access (If Not Already Done)

1. In the same settings page, find **"Public Access"** section
2. Make sure **"Allow Public Access"** is enabled
3. Note your public URL: `https://pub-158012c9a83642869a2f756e0cad584d.r2.dev`

### Step 4: Save and Test

1. Click **"Save"** to apply the CORS policy
2. Go back to your Media Admin page: http://localhost:8081/media-admin
3. Click **"Test R2 Connection"** - it should now succeed ✅
4. Try uploading a file to verify everything works

## Alternative: If You Can't Find CORS Settings

If you don't see a CORS Policy section in the UI, you can set it via Cloudflare API:

1. Go to your Cloudflare API tokens: https://dash.cloudflare.com/profile/api-tokens
2. Use the R2 API to set CORS (requires API token with R2 permissions)

Or contact Cloudflare support for assistance.

## Verification

After setting CORS, refresh your browser and check:
- ✅ "Test R2 Connection" should succeed
- ✅ File uploads should work
- ✅ Portfolio should display media from R2

## Still Having Issues?

If CORS is configured but you still see errors:

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Hard refresh** the page (Ctrl+Shift+R)
3. **Check browser console** for specific error messages
4. **Verify bucket name** matches: `primesky-media`
5. **Verify public URL** is correct in your `.env` file

---

**Need help?** Contact: primeskyeastafrica@yahoo.com
