# Update Portfolio with Your R2 Files

## Current Status
✅ Portfolio component is ready to display R2 media
✅ R2 public URL is configured: `https://pub-158012c9a83642869a2f756e0cad584d.r2.dev`

## What You Need to Do

Based on your R2 screenshot, I can see you have files in these folders:
- **Construction/** - 1 directory
- **Farm/** - 1 directory  
- **Nature/** - 1 directory
- **Real-estate/** - 1 directory
- **weddings/** - 1 directory

Plus some individual files:
- `L A K E N A | R O M A N I A.mp4` (video)
- `Rice farms view.jpeg` (image)
- `Take a few seconds to breath .mp4` (video)
- `kimali@orentanzania.webp` (image)
- `serengeti..heic` (image)

## Step 1: List All Your Files

Go to your R2 bucket and note down the **exact path** for each file, including:
- Folder name (case-sensitive!)
- File name (with extension)

For example:
```
weddings/wedding-video-1.mp4
Nature/serengeti.heic
Real-estate/property-tour.mp4
```

## Step 2: Update the Portfolio Component

Open: `src/components/PortfolioPublic.tsx`

Find the `mediaItems` array (around line 17) and add your files like this:

```typescript
const mediaItems: MediaItem[] = [
  // Weddings
  {
    filename: 'weddings/your-actual-filename.mp4',
    title: 'Beautiful Wedding Title',
    category: 'weddings',
    type: 'video',
    description: 'Your description here'
  },
  
  // Nature
  {
    filename: 'Nature/serengeti..heic',
    title: 'Serengeti Wildlife',
    category: 'nature',
    type: 'image',
    description: 'Wildlife photography'
  },
  
  // Add more files...
];
```

## Step 3: Category Mapping

Make sure to use these category names:
- `weddings` - Wedding videos and photos
- `nature` - Wildlife, landscapes
- `real-estate` - Properties, buildings
- `construction` - Construction progress
- `agriculture` - Farm content (maps to your "Farm" folder)

## Step 4: File Type Detection

The component automatically detects file types:
- **Videos**: `.mp4`, `.mov`, `.avi`, `.webm`
- **Images**: Everything else (`.jpg`, `.jpeg`, `.png`, `.webp`, `.heic`, etc.)

## Quick Template

Here's a template for each file:

```typescript
{
  filename: 'FOLDER/EXACT-FILENAME.ext',  // Must match R2 exactly!
  title: 'Display Title',
  category: 'weddings|nature|real-estate|construction|agriculture',
  type: 'video|image',
  description: 'Brief description of the content'
},
```

## Example Based on Your Files

```typescript
const mediaItems: MediaItem[] = [
  {
    filename: 'L A K E N A | R O M A N I A.mp4',
    title: 'Lake Natron Romania',
    category: 'weddings',
    type: 'video',
    description: 'Beautiful wedding ceremony at Lake Natron'
  },
  {
    filename: 'Nature/serengeti..heic',
    title: 'Serengeti Wildlife',
    category: 'nature',
    type: 'image',
    description: 'Stunning wildlife photography'
  },
  {
    filename: 'Real-estate/Rice farms view.jpeg',
    title: 'Rice Farms Aerial View',
    category: 'real-estate',
    type: 'image',
    description: 'Aerial view of rice farming fields'
  },
  {
    filename: 'Nature/Take a few seconds to breath .mp4',
    title: 'Peaceful Nature Moments',
    category: 'nature',
    type: 'video',
    description: 'Serene aerial meditation'
  },
  {
    filename: 'Nature/kimali@orentanzania.webp',
    title: 'Tanzania Wildlife',
    category: 'nature',
    type: 'image',
    description: 'Professional wildlife photography'
  },
];
```

## Need Help?

If you want me to update the portfolio for you, please provide:
1. A list of all your R2 files with their exact paths
2. Titles you want to display for each
3. Brief descriptions

Or you can click into each folder in your R2 dashboard and tell me what files are inside each folder!

---

Once updated, refresh your browser and the portfolio will display all your R2 media! 🎉
