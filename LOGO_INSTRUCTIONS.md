# 🖼️ How to Add JPSD Logo

## Current Status
The website is currently using `/public/logo.png` as the logo placeholder.

## Steps to Add Official JPSD Logo

### Option 1: Download from JPSD Website

1. **Visit JPSD Website**: 
   - Go to https://jpsd.org.pk/

2. **Find the Logo**:
   - Right-click on the JPSD logo in the header
   - Select "Save image as..." or "Save picture as..."

3. **Save the Logo**:
   - Save it with the name: `logo.png`
   - Location: `c:\Users\Muhammad.Umair\Desktop\baitussalam\baitussalam\public\`

4. **Replace Existing File**:
   - If prompted, choose to replace the existing `logo.png` file

### Option 2: Manual Creation

If you have the official JPSD logo file:

1. **Copy the Logo File**
2. **Navigate to**: `c:\Users\Muhammad.Umair\Desktop\baitussalam\baitussalam\public\`
3. **Paste and Rename**: Name it exactly `logo.png` (all lowercase)

### Option 3: Use Logo from Footer

The footer already references `/logo.png`, so once you add the file there, it will automatically appear throughout the site.

## Recommended Logo Specifications

- **Format**: PNG (with transparent background preferred)
- **Size**: Approximately 300x100 pixels or similar aspect ratio
- **File Size**: Keep it under 100KB for fast loading
- **Background**: Transparent (.png) works best

## Where the Logo Appears

Once added, the JPSD logo will automatically display in:

1. ✅ **Website Header/Navbar** - Main navigation
2. ✅ **Footer** - Bottom of every page
3. ✅ **Admin Dashboard** - Admin layouts
4. ✅ **Donor Portal** - Donor layouts
5. ✅ **Volunteer Portal** - Volunteer layouts

## Testing

After adding the logo:

1. Run the development server: `npm run dev`
2. Visit: http://localhost:3000
3. Check if the logo appears correctly in the header and footer
4. Test on both desktop and mobile views

## Troubleshooting

**Logo not showing?**
- Check file name is exactly `logo.png` (case-sensitive)
- Verify file is in the correct folder: `/public/`
- Clear browser cache and refresh
- Check browser console for any image loading errors

**Logo looks stretched or distorted?**
- Ensure logo has appropriate dimensions
- Consider creating different sizes for different layouts
- The current implementation uses Next.js Image component which handles responsive sizing

---

**Note**: The website currently uses placeholder images from Unsplash for various sections. You can replace these with actual JPSD event photos by:
1. Downloading images from jpsd.org.pk
2. Adding them to `/public/images/` folder
3. Updating the image paths in `mockData.ts`
