#!/bin/bash

echo "🎨 SENTINEL - Contrast & Accessibility Test"
echo "==========================================="
echo ""

# Check if server is running
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    echo "✅ Server is running at http://localhost:3000"
else
    echo "🚀 Starting development server..."
    cd "/Users/santiribeiro/Dev projects/sentinel"
    npm run dev &
    SERVER_PID=$!
    sleep 3
    echo "✅ Server started (PID: $SERVER_PID)"
fi

echo ""
echo "🔍 Testing contrast improvements:"
echo ""
echo "📱 Navigation & UI:"
echo "   • Sidebar text visibility"
echo "   • Button hover states"
echo "   • Navigation badges"
echo "   • User section"
echo ""
echo "📊 Dashboard Content:"
echo "   • Overview metrics cards"
echo "   • Chart text and legends"
echo "   • Data table readability"
echo "   • Status indicators"
echo ""
echo "🌓 Dark Mode Features:"
echo "   • Click moon/sun icon in header to toggle"
echo "   • All text remains readable"
echo "   • Proper contrast in both modes"
echo ""
echo "🎯 Screens to Test:"
echo "   1. Overview - Executive dashboard"
echo "   2. Search - Advanced search interface"
echo "   3. Keywords - Keyword monitoring"
echo "   4. Analytics - Charts and reports"
echo "   5. Network - Network visualization"
echo "   6. Geographic - Province mapping"
echo "   7. Intelligence - AI insights"
echo "   8. Sources - Source management"
echo "   9. Alerts - Alert dashboard"
echo ""
echo "✨ What to Look For:"
echo "   • All text is clearly visible"
echo "   • No invisible or barely visible text"
echo "   • Smooth theme transitions"
echo "   • Consistent styling across screens"
echo ""
echo "🌐 Open: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop testing"

# Keep script running
while true; do
    sleep 1
done