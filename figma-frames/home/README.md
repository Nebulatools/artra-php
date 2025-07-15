# ARTRA Home Page Implementation

This directory contains the complete responsive implementation of the ARTRA home page, transcribed directly from the provided Figma designs for both desktop and mobile versions.

## 📁 File Structure

```
home/
├── index.html          # Main HTML structure (responsive)
├── styles.css          # Complete CSS with mobile-first responsive design
├── script.js           # Interactive JavaScript functionality
└── README.md          # This documentation file
```

## 🎨 Design Source

**Figma Design References:**
- **Desktop Version**: `node-id=405-352` 
- **Mobile Version**: `node-id=422-940`
- **File Key**: `DEKCKQVlyUOgB5L0uCDw2i`

Both versions have been analyzed and combined into a single responsive implementation that adapts seamlessly between desktop and mobile layouts.

## 🚀 Features Implemented

### 📱 Responsive Design
- **Desktop**: Full layout with sidebar navigation, multi-column grids, and large imagery
- **Mobile**: Stacked layout, hamburger menu, optimized touch targets
- **Breakpoints**: 768px (tablet/mobile), 480px (small mobile)

### 🎯 Sections Included

1. **Fixed Header Navigation**
   - Centered logo with responsive design
   - Mobile hamburger menu (MENU/CLOSE toggle)
   - Backdrop blur effect on scroll
   - Smooth scroll behavior

2. **Animated Banner**
   - Scrolling text animation
   - Typography matches Figma specifications
   - Responsive font sizing

3. **Artwork Highlight**
   - Large featured artwork section
   - "NEW FRAMES." title overlay
   - Responsive image containers
   - Border styling matching Figma

4. **Highlights Grid**
   - Three main highlight cards:
     - "COMING SOON. EXHIBIT 1." with dual image layout
     - "DISCOVER OUR CATALOGUE." with single image
     - "ARTISTS & WORKS." with multi-image composition
   - Responsive grid that stacks on mobile
   - Precise positioning matching Figma layouts

5. **Top Picks Section**
   - "OUR TOP PICKS." title section
   - Clean typography and spacing

6. **Frame Collection Grid**
   - 8 frame items in responsive grid
   - Individual frame details (title, description, specs)
   - Colorful gradient backgrounds for each frame
   - Hover effects and click interactions
   - Mobile optimization with smaller grid items

7. **Spacer Section with Design Elements**
   - Grid patterns and circular elements
   - Centered quote section with rounded borders
   - Artistic layout matching Figma design

8. **Framing Studio Highlight**
   - Two-column layout (text + image)
   - "Learn About Us" CTA button
   - Yellow accent button styling (#EDF851)
   - Responsive stacking on mobile

9. **Gallery Highlight**
   - Reversed two-column layout
   - "Coming Soon" CTA button
   - Image positioning matching Figma

10. **Footer**
    - Multi-column responsive layout
    - Newsletter subscription form
    - Navigation links
    - Contact information
    - Copyright notice

### 🎭 Interactive Features

#### JavaScript Functionality
- **Mobile Menu Toggle**: MENU ↔ CLOSE state management
- **Smooth Scrolling**: For internal navigation links
- **Header Scroll Effects**: Background opacity and shadow changes
- **Frame Item Interactions**: Click feedback and hover effects
- **Newsletter Form**: Email validation and submission simulation
- **CTA Button Animations**: Scale effects on click
- **Keyboard Navigation**: Arrow keys for frame navigation, ESC for menu
- **Accessibility**: ARIA labels, tab indices, focus management
- **Scroll Animations**: Intersection Observer for element reveals
- **Notification System**: Toast notifications for user feedback
- **Error Handling**: Image loading, form validation, global errors

#### CSS Animations
- **Scroll Text**: Continuous banner text animation
- **Shimmer Effects**: Loading state animations
- **Hover Transitions**: Smooth transform and shadow effects
- **Click Feedback**: Scale animations on interaction
- **Fade In**: Elements appear on scroll

## 🎨 Design System

### Color Palette
- **Background**: `#F2F2F2` (Light gray)
- **Text**: `#000000` (Black)
- **CTA Accent**: `#EDF851` (Yellow)
- **Borders**: `#000000` (Black, 1px)

### Typography
- **Primary Font**: 'Inter' (sans-serif)
- **Secondary Font**: 'Century Old Style Std' (serif fallback: Times New Roman)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semi-bold)

### Layout Specifications
- **Max Width**: 1440px (desktop), 390px (mobile)
- **Grid System**: CSS Flexbox and Grid
- **Padding**: 40px (desktop), 24px (mobile), 20px (small mobile)
- **Gaps**: 24px standard, various for specific sections

## 📏 Responsive Breakpoints

```css
/* Desktop First */
@media (max-width: 768px) { /* Mobile/Tablet */ }
@media (max-width: 480px) { /* Small Mobile */ }
```

### Mobile Adaptations
- Header: Compressed padding, smaller logo
- Banner: Reduced font size (16px → 14px)
- Artwork: Smaller height (802px → 458px), adjusted title size
- Highlights: Stacked cards, full width
- Frames: Smaller grid items (340px → 195px)
- Content: Single column layouts
- Footer: Stacked sections, reduced gaps

## 🛠 Technical Implementation

### HTML Structure
- Semantic HTML5 elements
- Accessible markup with ARIA attributes
- Clean, maintainable structure
- Responsive images with placeholder divs

### CSS Architecture
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Custom properties for consistency
- Optimized animations and transitions
- Print-friendly styles

### JavaScript Features
- Vanilla JavaScript (no dependencies)
- Event delegation for performance
- Debounced scroll and resize handlers
- Intersection Observer for scroll animations
- Comprehensive error handling
- Analytics event tracking (placeholder)

## 🔧 Browser Compatibility

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Features Used**: CSS Grid, Flexbox, Intersection Observer, ES6+
- **Fallbacks**: Graceful degradation for older browsers

## 📈 Performance Optimizations

- **CSS**: Minimal repaints, efficient selectors
- **JavaScript**: Debounced events, lazy loading simulation
- **Images**: Placeholder system ready for actual images
- **Animations**: Hardware acceleration, reduced motion support

## 🎯 Accessibility Features

- **Keyboard Navigation**: Full tab and arrow key support
- **Screen Reader**: Semantic markup, ARIA labels
- **Focus Management**: Visible focus indicators
- **Color Contrast**: High contrast text and backgrounds
- **Reduced Motion**: Respects user preferences

## 🚀 Usage Instructions

### Local Development
```bash
# Open in browser
open index.html

# Or serve via local server
python -m http.server 8000
# Then visit: http://localhost:8000
```

### Integration Notes
For integration into the ARTRA PHP framework:

1. **Dynamic Content**: Replace static text with PHP variables
2. **Database**: Connect frame data to database queries
3. **Forms**: Implement actual newsletter subscription
4. **Images**: Replace placeholder gradients with real images
5. **Routing**: Integrate with PHP router system

## 📋 Future Enhancements

### Content Management
- [ ] Dynamic frame data from database
- [ ] Image upload and management system
- [ ] Newsletter integration with email service
- [ ] Multi-language support

### Performance
- [ ] Image lazy loading and optimization
- [ ] Service Worker for offline functionality
- [ ] Critical CSS inlining
- [ ] Resource preloading

### Features
- [ ] Advanced filtering for frames
- [ ] User accounts and favorites
- [ ] Shopping cart functionality
- [ ] Advanced animations with GSAP
- [ ] Dark mode toggle

## 🐛 Known Issues

- None currently identified

## 📝 Changelog

### v1.0.0 (Current)
- Initial implementation from Figma designs
- Complete responsive layout
- Interactive JavaScript functionality
- Accessibility features
- Mobile optimization

## 📞 Support

For questions or issues with this implementation, refer to the original Figma designs or contact the development team.

---

**Implementation Date**: January 15, 2025  
**Figma Design**: ARTRA — WEB DESIGN x CLARI (Copy)  
**Status**: ✅ Complete and Ready for Integration
