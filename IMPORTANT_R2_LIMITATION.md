# Important: R2 Browser Upload Limitation

## The Problem

The AWS SDK for JavaScript (which we're using for R2) **cannot work directly in the browser** due to CORS restrictions. This is a security limitation of how S3-compatible APIs work.

## Current Situation

- ✅ R2 credentials are configured correctly
- ✅ R2 bucket exists and is set up
- ❌ Browser cannot directly upload to R2 using AWS SDK
- ❌ CORS configuration on R2 won't fix this for SDK uploads

## Solutions

### Option 1: Backend API (Recommended for Production)

Create a backend server (Node.js, Python, etc.) that:
1. Receives files from your frontend
2. Uploads them to R2 using the AWS SDK
3. Returns the public URL to the frontend

**Pros:**
- Secure (credentials stay on server)
- Full control over uploads
- Can add validation, processing, etc.

**Cons:**
- Requires backend infrastructure
- More complex setup

### Option 2: Presigned URLs (Simpler, but requires backend)

Your backend generates presigned URLs that allow direct browser uploads:
1. Frontend requests a presigned URL from your backend
2. Backend generates URL using R2 credentials
3. Frontend uploads directly to R2 using the presigned URL
4. No credentials exposed to browser

**Pros:**
- Direct uploads to R2
- Credentials stay secure
- Less bandwidth on your server

**Cons:**
- Still requires a backend endpoint

### Option 3: Cloudflare Workers (Best for Cloudflare R2)

Use Cloudflare Workers as your backend:
1. Create a Worker that handles uploads
2. Worker has access to R2 directly
3. Frontend sends files to Worker
4. Worker uploads to R2

**Pros:**
- Serverless (no server to manage)
- Integrated with Cloudflare
- Fast and scalable
- Free tier available

**Cons:**
- Requires learning Cloudflare Workers

### Option 4: Manual Upload via Media Admin

For now, you can:
1. Use the Media Admin interface to upload files
2. Files get stored locally or you manually upload to R2
3. Update the portfolio to use R2 public URLs

## Recommended Next Steps

### Immediate Solution (For Testing):

1. **Manually upload files to R2** via Cloudflare Dashboard:
   - Go to: https://dash.cloudflare.com/e40e039279be1ccce2747577f2aa48fb/r2/default/buckets/primesky-media
   - Click "Upload Files"
   - Organize by folders: `weddings/`, `travel/`, `nature/`, etc.

2. **Enable Public Access** on your bucket

3. **Your portfolio will automatically display** files from R2 using the public URL

### Long-term Solution:

Implement a Cloudflare Worker for uploads. I can help you create this if needed.

## Example Cloudflare Worker Code

```javascript
export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      const formData = await request.formData();
      const file = formData.get('file');
      const category = formData.get('category');
      
      // Upload to R2
      await env.MY_BUCKET.put(`${category}/${file.name}`, file.stream());
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('Method not allowed', { status: 405 });
  }
};
```

## Current Workaround

For now, the portfolio component will work if you:
1. Upload files directly via Cloudflare Dashboard
2. Ensure public access is enabled
3. Files will display using your public URL: `https://pub-158012c9a83642869a2f756e0cad584d.r2.dev`

---

**Need help setting up a backend or Cloudflare Worker?** Let me know and I can guide you through it!
