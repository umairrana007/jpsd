# Design System Specification: Editorial Glassmorphism

## 1. Overview & Creative North Star: "The Ethereal Guardian"

This design system is built upon the **Creative North Star of "The Ethereal Guardian."** In the charity space, we must balance the weight of global causes with the uplifting hope of a solution. We move away from the "flat and boxed" layouts of traditional web design, embracing a high-end editorial feel that mimics light passing through architectural glass.

The system breaks the template look through **intentional asymmetry** and **tonal depth**. Rather than rigid grids, we use overlapping glass panels and generous "breathing room" (white space) to create a sense of calm and prestige. Every element should feel like it is floating in a curated space, not locked into a spreadsheet.

---

## 2. Colors & Surface Philosophy

The palette transitions from the clinical to the soulful. We use Teal and Blue not as solid blocks, but as light-refracting gradients.

### The Palette (Material Design Tokens)
*   **Primary (Teal):** `#006a65` (Action) | `primary_container`: `#20b2aa` (Vibrancy)
*   **Secondary (Blue):** `#0060ac` (Trust) | `secondary_container`: `#68abff` (Highlight)
*   **Surface:** `#f9f9fb` (Base) | `surface_container_low`: `#f3f3f5` | `surface_container_high`: `#e8e8ea`
*   **Outline Variant:** `#bbc9c7` (Used only for Ghost Borders)

### The "No-Line" Rule
**Explicit Instruction:** Prohibit 1px solid, high-contrast borders for sectioning. Boundaries must be defined solely through background color shifts. A `surface-container-low` section sitting on a `surface` background creates a sophisticated "quiet" boundary.

### The Glass & Gradient Rule
To achieve "visual soul," main CTAs and Hero backgrounds must utilize gradients. 
*   **Signature Gradient:** Linear 135° from `primary` (#006a65) to `primary_container` (#20b2aa).
*   **Glassmorphism:** Use semi-transparent surface colors with `backdrop-filter: blur(12px)`. This integrates the UI into the background imagery.

---

## 3. Typography: Editorial Authority

We use **Inter** for its neutral, high-legibility structure and **Noto Nastaliq Urdu** for its calligraphic elegance in Urdu contexts.

*   **Display (Lg/Md/Sm):** Inter, 3.5rem to 2.25rem. Use `display-lg` for impact statistics (e.g., "1.2M Lives Saved"). Tighten letter-spacing to -0.02em.
*   **Headlines:** Inter, 2rem to 1.5rem. Headlines should lead the narrative. 
*   **Urdu Integration:** 
    *   **Headlines:** *Noto Nastaliq Urdu*. Scale 1.2x larger than English headlines to account for the script's height.
    *   **Body:** *Jameel Noori Nastaleeq*. Maintain generous line-height (`leading-relaxed`) to prevent script crowding.
*   **Body (Lg/Md/Sm):** Inter, 1rem to 0.75rem. Use `body-lg` for mission statements to ensure high-end readability.

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional shadows in favor of **Tonal Layering** and **Ambient Glows**.

### The Layering Principle
Depth is achieved by "stacking" surface tiers. Place a `surface_container_lowest` (#FFFFFF) card on a `surface_container_low` (#F3F3F5) section. This creates a "soft lift" that feels architectural rather than digital.

### The Ghost Border Fallback
If accessibility requires a container boundary, use the **Ghost Border**: