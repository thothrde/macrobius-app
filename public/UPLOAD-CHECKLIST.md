# 📝 MACROBIUS IMAGES UPLOAD CHECKLIST

## 🚨 CRITICAL PRIORITY (App Breaking)

- [ ] `Astrolab.jpg` - Rotating astrolabe background
- [ ] `MacrobiusBottle.jpg` - Floating Macrobius portrait  
- [ ] `Rome-under.jpg` - Declining Roman Empire image
- [ ] `TychoAssistent.jpg` - Tycho Brahe & Pontanus

## 📚 HIGH PRIORITY (Educational Content)

- [ ] `mappa-mundi.jpg` - Medieval world map (small file ~41KB)
- [ ] `Symposion.jpg` - Ancient symposium scene
- [ ] `Macrobius-Portrait.jpg` - Alternative Macrobius portrait
- [ ] `Macrobius-universe.jpg` - Cosmological diagram
- [ ] `Macrobius-Weltkarte-neu.jpg` - Macrobius world map
- [ ] `Byzanz-Mosaik.jpeg` - Byzantine mosaic

## 🏛️ MEDIUM PRIORITY (Additional Cultural)

- [ ] `Johannes-Pontanus.JPG` - Johannes Isaac Pontanus portrait
- [ ] `MA-Uni-Astrolab.jpg` - University astrolabe
- [ ] `MacrobI.JPG` - Macrobius manuscript image
- [ ] `MacrobiRegal.jpg` - Macrobius regal portrait
- [ ] `Macrobius-Erdkarte.jpg` - Macrobius earth map
- [ ] `Macrobius-Zeichnung-Eklipse.jpg` - Eclipse drawing
- [ ] `Macrobius-and-Eustachius.jpg` - Macrobius with Eustachius
- [ ] `Planetarium-Foto.jpg` - Planetarium photograph
- [ ] `Symposion-2.jpg` - Alternative symposium scene
- [ ] `WandSymposion.jpg` - Wall symposium artwork
- [ ] `Screenshot 18.jpg` - Screenshot reference

## 🎬 VIDEOS (Large Files - Special Handling)

- [ ] `AppIntro.mov` (36MB) - App introduction video
- [ ] `Planetarium-Intro.mov` (44MB) - Planetarium introduction

## 🚀 QUICK UPLOAD COMMANDS

### For Essential Images:
```bash
# Navigate to repository root
cd /path/to/macrobius-app

# Copy essential images
cp /Volumes/CLAUDE-DATA/Macrobius-Github/Pics/Astrolab.jpg public/
cp /Volumes/CLAUDE-DATA/Macrobius-Github/Pics/MacrobiusBottle.jpg public/
cp /Volumes/CLAUDE-DATA/Macrobius-Github/Pics/Rome-under.jpg public/
cp /Volumes/CLAUDE-DATA/Macrobius-Github/Pics/TychoAssistent.jpg public/

# Add and commit
git add public/*.jpg
git commit -m "Add essential images - fix app visual breakdown"
git push
```

### For All Images at Once:
```bash
# Run the automated script
chmod +x scripts/upload-images.sh
./scripts/upload-images.sh

# Then commit all
git add public/
git commit -m "Add complete Macrobius image collection"
git push
```

### For Videos (requires Git LFS):
```bash
# Set up Git LFS first
git lfs install
git lfs track "*.mov"
git add .gitattributes

# Copy and add videos
cp /Volumes/CLAUDE-DATA/Macrobius-Github/Pics/*.mov public/
git add public/*.mov
git commit -m "Add Macrobius introduction videos via Git LFS"
git push
```

## 🎯 CURRENT STATUS

**App Status**: 🚨 BROKEN - Missing all images
**Fallback System**: ✅ ACTIVE - Using Unsplash CDN temporarily
**Upload Progress**: ❌ 0% - No images uploaded yet
**Priority**: 🚀 URGENT - Same day completion needed

## ✅ COMPLETION VERIFICATION

Once uploaded, verify by checking:
1. Live app at https://macrobius-app.vercel.app
2. All images load without fallback indicators
3. Rotating astrolabe background works
4. Floating Macrobius portrait appears
5. Hero section image gallery complete

---

**Last Updated**: July 18, 2025
**Total Assets**: 25+ images, 2 videos
**Estimated Upload Time**: 15-30 minutes
**Impact**: Transforms broken app to professional platform