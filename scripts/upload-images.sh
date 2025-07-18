#!/bin/bash

# 🎨 MACROBIUS IMAGES UPLOAD SCRIPT
# This script copies all images and videos from the source directory to the public folder

echo "🎨 Starting Macrobius Images Upload..."

# Define source and destination paths
SOURCE_DIR="/Volumes/CLAUDE-DATA/Macrobius-Github/Pics"
DEST_DIR="./public"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Error: Source directory not found: $SOURCE_DIR"
    exit 1
fi

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

echo "📁 Source: $SOURCE_DIR"
echo "📁 Destination: $DEST_DIR"
echo ""

# Function to copy and report file sizes
copy_file() {
    local file="$1"
    local filename=$(basename "$file")
    local size=$(ls -lh "$file" | awk '{print $5}')
    
    cp "$file" "$DEST_DIR/"
    if [ $? -eq 0 ]; then
        echo "✅ Copied: $filename ($size)"
    else
        echo "❌ Failed: $filename"
    fi
}

echo "🚀 Copying ESSENTIAL images first..."
echo "========================="

# Copy essential images first (app-breaking if missing)
ESSENTIAL_FILES=(
    "Astrolab.jpg"
    "MacrobiusBottle.jpg" 
    "Rome-under.jpg"
    "TychoAssistent.jpg"
)

for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -f "$SOURCE_DIR/$file" ]; then
        copy_file "$SOURCE_DIR/$file"
    else
        echo "⚠️  Missing essential file: $file"
    fi
done

echo ""
echo "📚 Copying EDUCATIONAL images..."
echo "=============================="

# Copy all other images
for file in "$SOURCE_DIR"/*.{jpg,jpeg,JPG,JPEG}; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        # Skip if already copied in essential files
        if [[ ! " ${ESSENTIAL_FILES[@]} " =~ " ${filename} " ]]; then
            copy_file "$file"
        fi
    fi
done

echo ""
echo "🎬 Processing VIDEOS (large files)..."
echo "==================================="

# Handle videos separately (may need Git LFS)
for file in "$SOURCE_DIR"/*.mov; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        size=$(ls -lh "$file" | awk '{print $5}')
        
        echo "📹 Found video: $filename ($size)"
        echo "   ⚠️  Large file - may need Git LFS setup"
        
        # Copy video but warn about size
        copy_file "$file"
    fi
done

echo ""
echo "📊 UPLOAD SUMMARY"
echo "================="
echo "📁 Total files in destination:"
ls -la "$DEST_DIR"/*.{jpg,jpeg,JPG,JPEG,mov} 2>/dev/null | wc -l
echo ""
echo "💾 Total size of copied files:"
du -sh "$DEST_DIR" 2>/dev/null
echo ""
echo "✅ Image upload script completed!"
echo ""
echo "🚀 NEXT STEPS:"
echo "1. git add public/"
echo "2. git commit -m 'Add all Macrobius images and videos'"
echo "3. git push"
echo ""
echo "⚠️  For videos >50MB, consider setting up Git LFS first:"
echo "   git lfs install"
echo "   git lfs track '*.mov'"
echo "   git add .gitattributes"
