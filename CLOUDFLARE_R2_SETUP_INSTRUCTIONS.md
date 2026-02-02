# Cloudflare R2 Setup Instructions for PrimeSky East Africa

## Your Account Information
- **Account ID**: `e40e039279be1ccce2747577f2aa48fb`
- **Dashboard**: https://dash.cloudflare.com/e40e039279be1ccce2747577f2aa48fb/r2

---

## Step 1: Create Your R2 Bucket

1. **Go to your R2 dashboard**: https://dash.cloudflare.com/e40e039279be1ccce2747577f2aa48fb/r2/new
2. Click **"Create bucket"**
3. **Bucket name**: `primesky-media` (or any name you prefer - must be unique)
4. **Location**: Choose the closest region to Kenya (e.g., `EEUR` for Eastern Europe or `APAC` for Asia Pacific)
5. Click **"Create bucket"**

---

## Step 2: Generate API Tokens

1. In your R2 dashboard, click on **"Manage R2 API Tokens"** in the right sidebar
   - Or go directly to: https://dash.cloudflare.com/e40e039279be1ccce2747577f2aa48fb/r2/api-tokens

2. Click **"Create API token"**

3. **Configure the token**:
   - **Token name**: `primesky-media-access`
   - **Permissions**: Select **"Object Read & Write"**
   - **TTL**: Leave as default (or set to never expire)
   - **Bucket restrictions**: Select your bucket (`primesky-media`)

4. Click **"Create API Token"**

5. **IMPORTANT**: Copy and save these credentials immediately (you won't see them again):
   - ✅ **Access Key ID** (looks like: `abc123def456...`)
   - ✅ **Secret Access Key** (looks like: `xyz789abc123...`)

---

## Step 3: Configure Public Access (Optional but Recommended)

To allow public viewing of your media without signed URLs:

1. Go to your bucket settings
2. Click on **"Settings"** tab
3. Under **"Public Access"**, click **"Allow Access"**
4. Click **"Connect Domain"** to add a custom domain (optional)
   - Or use the default R2.dev domain

Your public URL will be something like:
- `https://pub-xxxxx.r2.dev` (auto-generated)
- Or your custom domain if you set one up

---

## Step 4: Update Your .env File

Now update your `.env` file with the credentials:

```bash
# Cloudflare R2 Configuration
VITE_R2_ACCOUNT_ID=e40e039279be1ccce2747577f2aa48fb
VITE_R2_ACCESS_KEY_ID=your_access_key_id_here
VITE_R2_SECRET_ACCESS_KEY=your_secret_access_key_here
VITE_R2_BUCKET_NAME=primesky-media
VITE_R2_ENDPOINT=https://e40e039279be1ccce2747577f2aa48fb.r2.cloudflarestorage.com
VITE_R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

**Replace**:
- `your_access_key_id_here` → Your actual Access Key ID from Step 2
- `your_secret_access_key_here` → Your actual Secret Access Key from Step 2
- `primesky-media` → Your actual bucket name from Step 1
- `https://pub-xxxxx.r2.dev` → Your actual public URL from Step 3

---

## Step 5: Test the Connection

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the Media Admin page**:
   - Go to: `http://localhost:5173/media-admin` (or wherever your app runs)

3. **Test the connection**:
   - Click the **"Test R2 Connection"** button
   - You should see a success message if everything is configured correctly

4. **Upload a test file**:
   - Drag and drop an image or video
   - Check if it uploads successfully
   - Verify the file appears in your Cloudflare R2 bucket

---

## Step 6: Migrate Existing Media (Optional)

If you have existing media in the `public/` folder that you want to move to R2:

1. Use the Media Upload component to upload files
2. Update references in your code to use R2 URLs
3. Keep local files as backup until migration is complete

---

## Quick Reference

### Your R2 Endpoint Structure
```
https://e40e039279be1ccce2747577f2aa48fb.r2.cloudflarestorage.com
```

### File Organization in R2
Files will be organized by category:
- `weddings/` - Wedding photography and videos
- `real-estate/` - Property showcases
- `construction/` - Construction progress documentation
- `events/` - Event coverage
- `agriculture/` - Agricultural surveys
- `nature/` - Landscape and wildlife
- `travel/` - Tourism and travel content
- `urban/` - City and urban photography

### File Naming Convention
Files are automatically renamed with timestamps:
```
{category}/{timestamp}-{original-filename}
```
Example: `weddings/1738234567890-emma-andrey-wedding.mp4`

---

## Troubleshooting

### Connection Failed
- ✅ Verify your Access Key ID and Secret Access Key are correct
- ✅ Check that the bucket name matches exactly
- ✅ Ensure the API token has "Object Read & Write" permissions
- ✅ Confirm the endpoint URL uses your Account ID

### Upload Failed
- ✅ Check file size limits (10MB for images, 500MB for videos)
- ✅ Verify file type is allowed (jpg, png, mp4, mov, etc.)
- ✅ Ensure you have sufficient R2 storage quota

### Files Not Displaying
- ✅ Verify public access is enabled on your bucket
- ✅ Check that VITE_R2_PUBLIC_URL is set correctly
- ✅ Ensure CORS is configured if accessing from different domains

---

## Security Best Practices

1. ✅ **Never commit your `.env` file** to version control
2. ✅ **Use different API tokens** for development and production
3. ✅ **Rotate API tokens** periodically
4. ✅ **Set bucket permissions** to minimum required access
5. ✅ **Enable versioning** for important media files
6. ✅ **Set up lifecycle policies** to archive old content

---

## Cost Optimization

Cloudflare R2 offers:
- **Free tier**: 10 GB storage per month
- **No egress fees**: Unlike AWS S3
- **Affordable pricing**: $0.015/GB/month for storage

Tips to minimize costs:
- Delete unused files regularly
- Use appropriate file compression
- Implement lifecycle policies for archiving

---

## Next Steps

1. ✅ Create your R2 bucket
2. ✅ Generate API tokens
3. ✅ Update your `.env` file
4. ✅ Test the connection
5. ✅ Start uploading media
6. 🔲 Configure custom domain (optional)
7. 🔲 Set up automated backups
8. 🔲 Implement image optimization

---

## Support

- **Cloudflare R2 Docs**: https://developers.cloudflare.com/r2/
- **Cloudflare Community**: https://community.cloudflare.com/
- **PrimeSky Support**: primeskyeastafrica@yahoo.com

---

**Ready to get started?** Follow the steps above and your media will be stored securely in Cloudflare R2!
