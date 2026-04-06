# 🚀 Quick Reference - Urdu Font Implementation

## For Developers

### How to Use Urdu Font in Components

**Method 1: Automatic (Recommended)**
```tsx
// Just use the language context
import { useLanguage } from '@/contexts/LanguageContext';

const { language, setLanguage } = useLanguage();

// When language is 'ur', Noto Nastaliq Urdu is automatically applied
return <div>Your content here</div>;
```

**Method 2: Manual Override**
```tsx
// Add urdu-text class for specific elements
<div className="urdu-text">
  آپ کا اردو مواد یہاں
</div>
```

### Custom Hook Usage
```tsx
import { useUrduFont } from '@/hooks/useUrduFont';

const { isUrdu, toggleUrdu, fontClass } = useUrduFont();

return (
  <button onClick={toggleUrdu}>
    {isUrdu ? 'English' : 'اردو'}
  </button>
);
```

---

## CSS Classes Available

| Class | Purpose | Example |
|-------|---------|---------|
| `urdu-text` | Apply Urdu font manually | `<p className="urdu-text">` |
| `font-urdu` | Via hook (conditional) | `<div className={fontClass}>` |
| `[dir="rtl"]` | Auto-applied when Urdu | Global selector |

---

## Key Files

| File | Purpose |
|------|---------|
| `globals.css` | Global styles & RTL rules |
| `LanguageContext.tsx` | Language state management |
| `FontLoader.tsx` | Font preloading |
| `useUrduFont.ts` | Custom hook |
| `UrduFontTest.tsx` | Test component |

---

## Testing Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

---

## Common Patterns

### Language Toggle Button
```tsx
<button
  onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
  className={`px-4 py-2 rounded ${
    language === 'ur' ? 'bg-green-600 text-white' : 'bg-gray-200'
  }`}
>
  {language === 'ur' ? 'English' : 'اردو'}
</button>
```

### Conditional Styling
```tsx
<div className={language === 'ur' ? 'text-right' : 'text-left'}>
  {language === 'ur' ? 'دائیں طرف' : 'Left aligned'}
</div>
```

---

## Gotchas ⚠️

1. **Don't hardcode `text-align: left`** - breaks RTL
2. **Avoid fixed widths** - Urdu text may need more space
3. **Check flexbox directions** - use `rtl:` prefix if needed
4. **Test on mobile** - verify touch targets are accessible

---

## Performance Tips

1. **First visit**: Font loads from CDN (~200-500ms)
2. **Return visits**: Font loads from cache (<50ms)
3. **Optimization**: Consider local hosting if needed
4. **Monitoring**: Track Core Web Vitals in production

---

## Debug Checklist

- [ ] Font not loading? → Check Network tab
- [ ] Layout broken? → Inspect RTL CSS rules
- [ ] Text overlapping? → Verify line-heights
- [ ] Wrong font? → Clear browser cache
- [ ] Mobile issues? → Test responsive breakpoints

---

## Resources

- **Google Fonts**: https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu
- **Unicode Range**: U+0600-06FF (Arabic/Urdu)
- **Documentation**: See `URDU_FONT_IMPLEMENTATION.md`
- **Test Component**: Import `UrduFontTest` for verification

---

**Quick Test**: Open any page, click "UR" button, verify font changes! ✅
