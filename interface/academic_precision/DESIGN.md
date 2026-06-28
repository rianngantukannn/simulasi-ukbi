---
name: Academic Precision
colors:
  surface: '#faf9fb'
  surface-dim: '#dbd9dc'
  surface-bright: '#faf9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f6'
  surface-container: '#efedf0'
  surface-container-high: '#e9e8ea'
  surface-container-highest: '#e3e2e5'
  on-surface: '#1b1c1e'
  on-surface-variant: '#43474d'
  inverse-surface: '#2f3033'
  inverse-on-surface: '#f2f0f3'
  outline: '#74777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#49607e'
  primary: '#000f22'
  on-primary: '#ffffff'
  primary-container: '#0a2540'
  on-primary-container: '#768dad'
  inverse-primary: '#b0c8eb'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#1a0b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#381d00'
  on-tertiary-container: '#ae835a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#b0c8eb'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#314865'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdcbe'
  tertiary-fixed-dim: '#eebd90'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#613f1c'
  background: '#faf9fb'
  on-background: '#1b1c1e'
  surface-variant: '#e3e2e5'
typography:
  display:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
  mono-timer:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 2rem
  stack-gap: 1.5rem
  grid-gutter: 1rem
  sidebar-width: 320px
---

## Brand & Style
The brand personality is authoritative, focused, and impartial, reflecting the rigorous nature of language proficiency testing. The design system targets test-takers and administrators who require a zero-distraction environment to ensure maximum cognitive performance.

The visual style is **High-Contrast Minimalism**. It prioritizes clarity over decoration, using ample whitespace and a restricted color palette to reduce "UI noise." Layouts are engineered to be non-scrolling where possible, treating the browser viewport as a focused cockpit. The aesthetic is professional and academic, leveraging flat design principles with subtle tonal layering to guide the user’s eye toward the content of the examination.

## Colors
The palette is rooted in **Deep Blue (#0A2540)** to project stability and authority. 

- **Primary Deep Blue**: Used for critical navigation, headers, and primary actions.
- **Background Soft Gray**: A neutral base that reduces eye strain compared to pure white during long testing sessions.
- **Secondary White**: Reserved for "Workspaces" (question cards and content areas) to create a clear mental separation between the platform and the test content.
- **Functional Accents**: Green is used exclusively for "Completed/Saved" states, while Amber is reserved for "Flagged/Doubtful" markers, providing instant status recognition in the navigation tracker.

## Typography
**Inter** is the sole typeface, chosen for its exceptional legibility and neutral character. 

- **Headings**: Use bold weights with tight letter spacing for an impactful, modern look.
- **Body Text**: Uses a slightly increased line height (1.6) and a 110% contrast ratio against the background to ensure readability during long reading passages.
- **Technical Elements**: The exam timer uses a monospaced font (JetBrains Mono) to prevent character jumping as numbers change.
- **Mobile scaling**: On devices smaller than 768px, `display` scales down to `headline-lg` to maintain focus without overwhelming the screen.

## Layout & Spacing
The system utilizes a **fixed-height, split-pane layout** to prevent scrolling of the main interface.

1.  **Main Workspace**: A central column for question content, utilizing a max-width of 800px to maintain optimal line lengths for reading.
2.  **Global Header**: Fixed at the top, containing the progress bar and timer.
3.  **Sticky Sidebar/Footer**: For navigation trackers (question grid).

Spacings are based on a 4px baseline, but large-scale layouts favor `2rem` (32px) margins to create a sense of calm and openness. The focus is on "concentration blocks"—distinct areas of the screen that don't shift as the user moves between questions.

## Elevation & Depth
In alignment with the flat design philosophy, depth is conveyed through **Tonal Separation** and **Thin Outlines** rather than heavy shadows.

- **Level 0 (Background)**: Soft Gray (#F4F6F8).
- **Level 1 (Surface)**: Pure White (#FFFFFF) with a 1px border (#E2E8F0). This is used for the active question card.
- **Level 2 (Active/Focus)**: A 2px Deep Blue border. No shadows are used, ensuring the interface feels "crisp" and institutional.
- **Backdrop Blurs**: Used only for modal dialogs (e.g., "Submit Exam" confirmation) to maintain context without visual clutter.

## Shapes
A "Rounded" strategy (8px/0.5rem) is used for all primary containers and interactive elements. This softens the high-contrast aesthetic, making the professional environment feel approachable rather than punishing. 

- **Question Cards**: 1rem (16px) corner radius.
- **Buttons and Inputs**: 0.5rem (8px) corner radius.
- **Navigation Tracker Chips**: Fully rounded (pill) for circular status indicators.

## Components
- **Question Cards**: White background, 1px light gray border, 1.5rem internal padding. Headlines always in Primary Deep Blue.
- **Navigation Tracker**: A grid of small squares. 
    - *Default*: Light gray border, transparent fill.
    - *Answered*: Primary Deep Blue fill, white text.
    - *Flagged*: Amber fill, white text.
- **Primary Buttons**: Deep Blue background, white text. No gradients. 100% width on mobile, auto-width on desktop.
- **Choice Selectors (Radio/Check)**: Custom styled large-format buttons. When selected, the entire container gains a 2px Deep Blue border and a very light blue tint.
- **Minimalist Audio Player**: A slim horizontal bar. Progress is shown via a Deep Blue line. No complex "scrubbing" (unless allowed by exam rules), only a Play/Pause toggle and a clear "Listening" status indicator.
- **Progress Bar**: Fixed at the very top of the viewport. A thin 4px line that moves across the full width of the screen in Primary Deep Blue.