# TravLin Travel Design System Guidelines

## MANDATORY DESIGN CONSISTENCY

**ALWAYS use the standardized design system classes from `/styles/globals.css` for complete visual consistency across the entire website.**

---

## Typography Hierarchy (REQUIRED)

### Headings - Use These Classes ONLY
* **Main page headings:** `section-heading` (H1 equivalent)
* **Section subheadings:** `section-subheading` (H2 equivalent)  
* **Component headings:** `component-heading` (H3 equivalent)

### Text Content - Use These Classes ONLY
* **Large descriptions:** `text-description-large` (hero text, major introductions)
* **Standard descriptions:** `text-description` (regular section text)
* **Small descriptions:** `text-description-small` (captions, details)

---

## Section Spacing (REQUIRED)

### Section Containers - Use These Classes ONLY
* **Large sections:** `section-spacing-large` (hero, testimonials, major features)
* **Standard sections:** `section-spacing` (most content sections)
* **Small sections:** `section-spacing-small` (compact content)

### Content Containers - Use These Classes ONLY
* **Main content:** `content-container` (max-width: 1280px)
* **Narrow content:** `content-container-narrow` (max-width: 1024px)
* **Text content:** `content-container-text` (max-width: 768px)

---

## Separator Lines (REQUIRED)

### Standard Separators - Use These Classes ONLY
* **Major section breaks:** `section-divider` (replaces SectionDivider component)
* **Content separation:** `content-separator` (standard gray gradient)
* **Small breaks:** `content-separator-short` (minimal separation)
* **Brand separators:** Use thick colorful gradient separator (inline style with h-1 height)

---

## Section Backgrounds (REQUIRED)

### Background Classes - Use These ONLY
* **Default:** `section-white`
* **Alternating:** `section-light` 
* **Brand tints:** `section-blue-tint`, `section-orange-tint`, `section-yellow-tint`
* **Gradients:** `section-gradient-blue`, `section-gradient-subtle`

---

## Margin Standards (REQUIRED)

### Margin Classes - Use These ONLY
* **Large margins:** `margin-y-large`, `margin-bottom-large`
* **Standard margins:** `margin-y`, `margin-bottom`
* **Small margins:** `margin-y-small`, `margin-bottom-small`

---

## Button & Layout Standards (REQUIRED)

### Button Groups
* **Standard:** `button-group` (normal spacing)
* **Large:** `button-group-large` (extra spacing for important buttons)

### Card Layouts
* **Standard:** `card-grid` (280px min columns)
* **Large:** `card-grid-large` (320px min columns)
* **Small:** `card-grid-small` (240px min columns)

---

## Brand Colors (REQUIRED)

### CSS Variables - Use These ONLY
* **Primary Blue:** `var(--brand-blue)` (#0075CC)
* **Orange:** `var(--brand-orange)` (#ED7D31)
* **Yellow:** `var(--brand-yellow)` (#FFC000)
* **Grays:** `var(--gray-50)` through `var(--gray-900)`

---

## Button Standards (REQUIRED)

### Button Classes - Use These ONLY
* **Standard buttons:** `travlin-button-standard`
* **Color variants:** `travlin-button-blue`, `travlin-button-orange`, `travlin-button-yellow`
* **Square edges:** All buttons must have `border-radius: 0` or `border-radius: 4px` maximum

---

## IMPLEMENTATION RULES

### ALWAYS Follow This Pattern:
```html
<section className="section-spacing section-white">
  <div className="content-container">
    <div className="section-divider"></div>
    <h2 className="section-heading">Section Title</h2>
    <p className="text-description-large">Section description</p>
    <div className="content-separator"></div>
    <!-- Section content -->
    <div className="button-group">
      <!-- Buttons here -->
    </div>
  </div>
</section>
```

### NEVER Use:
* Hardcoded Tailwind spacing classes (mb-8, py-16, etc.)
* Hardcoded font sizes (text-xl, text-2xl, etc.)
* Hardcoded colors instead of CSS variables
* Inline styles for spacing or typography
* Custom margin/padding values
* Rounded buttons (border-radius > 4px)

---

## Responsive Behavior

All design system classes are **automatically responsive** using `clamp()` functions:
* Typography scales smoothly from mobile to desktop
* Spacing adjusts proportionally across breakpoints  
* Containers adapt to screen size automatically
* No additional responsive classes needed

---

## Quality Assurance

Before implementing any component, ensure:
- [ ] Uses standardized heading classes
- [ ] Uses standardized text classes  
- [ ] Uses standardized spacing classes
- [ ] Uses standardized container classes
- [ ] Uses standardized separator classes
- [ ] Uses CSS variables for colors
- [ ] Follows square-edge button design
- [ ] Maintains consistent visual hierarchy

**This design system ensures perfect consistency across the entire TravLin Travel website.**