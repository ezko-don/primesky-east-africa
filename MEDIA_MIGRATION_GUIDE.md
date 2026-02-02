# Media Migration Guide: Public Folder → Cloudflare R2

## Overview

This guide will help you migrate your existing media files from the `public/` folder to Cloudflare R2 storage.

---

## Step 1: Upload Media to R2

### Using the Media Admin Interface

1. **Navigate to Media Admin**:
   ```
   http://localhost:8081/media-admin
   ```

2. **Select the appropriate category** for each file:
   - **Weddings** - Wedding videos and photos
   - **Travel** - Tourism and travel content (Zanzibar, etc.)
   - **Nature** - Wildlife, landscapes, Serengeti, Lake Natron
   - **Construction** - Construction progress, development
   - **Real Estate** - Property showcases, hotels
   - **Agriculture** - Farm surveys, agricultural content
   - **Urban** - City and urban photography
   - **Events** - Event coverage

3. **Upload files**:
   - Drag and drop files or click to browse
   - You can upload multiple files at once
   - Wait for upload confirmation

---

## Step 2: Media Files to Upload

Here's a list of your current media files organized by category:

### Weddings
- `EMMA + ANDREY 2.MP4`
- `sandor + grace.MP4`
- `Martin and Brenda met on Facebook in 2021...mp4`
- `The love ❤️🇨🇲 @georgeajr_ & 🇰🇪 @sallykyale 💍 .mp4`

### Travel & Tourism
- `All you need is a trip to Zanzibar.🇹🇿🏝️🏖️ (1).jpg`
- `All you need is a trip to Zanzibar.🇹🇿🏝️🏖️ (2).jpg`
- `trip to Zanzibar.🇹🇿🏝️🏖️.jpg`
- `zenji.mp4`

### Nature & Wildlife
- `L A K E  N A T R O N.mp4`
- `Serengeti - The vast plains .mp4`
- `masai mara.mp4`
- `Take a few seconds to breath .mp4`
- `The beauty of the crater with the majestic Mount Meru...mp4`
- `Shades Of Green    Arusha, Tanzania.mp4`
- `#tanzanai.jpg`
- `TIME7447.JPG`
- `IMG_4391.jpg`
- `seregeti..heic`

### Construction
- `construction.mp4`
- `Over a year of construction .mp4`
- `Our 2 Bedroom Villa at Blu Pearl...mp4`
- `MUONEKANO WA JUU WA MJI WA SERIKALI MTUMBA DODOMA.mp4`

### Real Estate
- `muthusovereignsuites.mp4`
- `masaki .mov`
- `views.mp4`
- `website .mp4`

### Agriculture
- `Rice farms view.jpg`

### Urban/Landmarks
- `The Torch Tower in Arusha, Tanzania...jpg`
- `kims#dronetanzania.webp`

---

## Step 3: Switch to R2-Powered Portfolio

Once you've uploaded your media to R2, you need to update your homepage to use the new Portfolio component.

### Update Index.tsx

Find your `src/pages/Index.tsx` file and replace the Portfolio import:

**Before:**
```typescript
import Portfolio from '@/components/Portfolio';
```

**After:**
```typescript
import PortfolioR2 from '@/components/PortfolioR2';
```

Then in the component usage, replace:
```typescript
<Portfolio />
```

With:
```typescript
<PortfolioR2 />
```

---

## Step 4: Verify Everything Works

1. **Check the portfolio section** on your homepage
2. **Verify all media loads** from R2
3. **Test filtering** by category
4. **Ensure videos play** correctly
5. **Check image loading** and quality

---

## Step 5: Clean Up (Optional)

Once you've verified everything works with R2:

1. **Keep backups** of your original files
2. **You can remove files from public folder** (but keep backups!)
3. **Update any other components** that reference local media

---

## Troubleshooting

### Media Not Showing
- ✅ Check that files are uploaded to R2 (visit Media Admin → Manage Media)
- ✅ Verify CORS is configured on your R2 bucket
- ✅ Ensure public access is enabled on the bucket
- ✅ Check browser console for errors

### Upload Fails
- ✅ Check file size limits (10MB images, 500MB videos)
- ✅ Verify R2 credentials in `.env` file
- ✅ Check internet connection
- ✅ Try uploading one file at a time

### Videos Won't Play
- ✅ Ensure video format is supported (MP4, MOV, WebM)
- ✅ Check that public URL is configured correctly
- ✅ Verify CORS settings allow video streaming

---

## Benefits of R2 Storage

✅ **Scalable** - No storage limits
✅ **Fast** - Global CDN delivery
✅ **Reliable** - 99.9% uptime
✅ **Cost-effective** - No egress fees
✅ **Organized** - Automatic categorization
✅ **Secure** - Access control and encryption

---

## Quick Upload Script (Optional)

If you want to upload files programmatically, you can use this approach:

1. Go to Media Admin
2. Select category
3. Drag and drop multiple files
4. Wait for all uploads to complete
5. Repeat for each category

---

## Support

Need help with migration?
- Check the R2 setup guide: `CLOUDFLARE_R2_SETUP_INSTRUCTIONS.md`
- Test R2 connection in Media Admin
- Contact: primeskyeastafrica@yahoo.com

---

**Ready to migrate?** Start uploading your media files to R2 and enjoy the benefits of cloud storage!
