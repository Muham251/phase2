
name: frontend-development
description: Master modern frontend architecture, reusable component design, responsive layouts, and advanced styling techniques.
---

```

# Frontend Engineering & UI Development

## Instructions

### 1. **Page & Layout Architecture**

* **Semantic HTML:** Structure pages using meaningful elements (`<main>`, `<section>`, `<nav>`) to ensure accessibility and SEO optimization.
* **Grid & Flexbox Mastery:** Build complex, responsive layouts using CSS Grid for 2D structures and Flexbox for 1D alignment.
* **Viewport Management:** Ensure fluid scaling across devices using relative units (rem, em, vh/vw) and mobile-first media queries.

### 2. **Component-Based Development**

* **Atomic Design:** Break down the UI into atoms (buttons), molecules (search bars), and organisms (headers) for maximum reusability.
* **State Management:** Implement local and global state (e.g., Hooks, Context API, or Redux) to handle dynamic data and user interactions.
* **Prop-Driven Logic:** Build flexible components that adapt their appearance and behavior based on passed properties.

### 3. **Modern Styling & Design Systems**

* **CSS-in-JS or Utility-First CSS:** Use tools like Tailwind CSS or Styled Components to maintain scoped, scalable styles.
* **Design Tokens:** Standardize colors, typography, and spacing in a central theme file to ensure visual consistency.
* **Theming:** Implement dark/light mode support using CSS variables or theme providers.

## Best Practices

* **Accessibility (a11y):** Always check for high color contrast, use ARIA labels, and ensure keyboard navigability.
* **Performance Optimization:** Minimize bundle sizes, use lazy loading for images/routes, and avoid unnecessary re-renders.
* **Component Isolation:** Ensure styles in one component do not leak into and break others.
* **DRY (Don't Repeat Yourself):** Abstract repeated patterns into shared utility functions or generic components.
* **Browser Compatibility:** Test layouts across different engines (Chromium, WebKit, Gecko) to ensure uniform experience.

## Example Structure

```tsx
// Reusable Card Component
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  image: string;
}

const FeatureCard: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <article className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-6 transition-transform hover:scale-105">
      <img className="w-full h-48 object-cover rounded-md" src={image} alt={title} />
      <div className="py-4">
        <h3 className="font-bold text-xl mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Learn More
      </button>
    </article>
  );
};

export default FeatureCard;

