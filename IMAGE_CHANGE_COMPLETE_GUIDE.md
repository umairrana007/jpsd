# Local Image Management Guide

I have successfully migrated all Unsplash images from your website to your local `public/images/` directory. This ensures your website can run entirely offline for images and gives you full control over them.

## Summary of Changes
1. **Downloaded All Images**: 60+ images were downloaded and saved to `public/images/`.
2. **Updated Code**: Every occurrence of `images.unsplash.com` in your code has been replaced with a local path like `/images/unsplash_N.jpg`.
3. **Fallback Image**: For any images that were broken (404) or failed to download, I've used a local fallback image `/images/fallback.jpg`.

## How to replace with your OWN images
If you have your own images that you want to show on the website, follow these steps:

1. **Find the Image**: Look at the file [IMAGE_URLS_REFERENCE.md](file:///c:/Users/Muhammad.Umair/Desktop/baitussalam/baitussalam/IMAGE_URLS_REFERENCE.md) to see which `unsplash_N.jpg` file corresponds to which section of your website.
2. **Prepare Your Image**: Rename your own image file to the corresponding local filename (e.g., rename your `medical_camp.jpg` to `unsplash_52.jpg`).
3. **Replace the File**: Copy your renamed image into `C:\Users\Muhammad.Umair\Desktop\baitussalam\baitussalam\public\images` and overwrite the existing one.
4. **Instant Update**: The website will now show your own image instead of the auto-downloaded one.

## Directory Location
All your images are here:
`C:\Users\Muhammad.Umair\Desktop\baitussalam\baitussalam\public\images`

> [!TIP]
> If you want to change an image for a specific section, you can also just search for the filename (like `unsplash_1.jpg`) in your code and change the path to whatever new filename you save in the `public/images` folder.
