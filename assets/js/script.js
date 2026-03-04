"use strict";

/**
 * Universal Theme Sync Engine
 * Matches themes between index.html and Final.html
 */

const themeLibrary = [
    'linear-gradient(135deg, #FF61D2, #FE9090, #FFB8D1)',
    'linear-gradient(135deg, #FF1493, #FF69B4, #FFB6C1)',
    'linear-gradient(135deg, #8E2DE2, #4A00E0)',
    'linear-gradient(135deg, #00c6ff, #0072ff)',
    'linear-gradient(135deg, #f953c6, #b91d73)',
    'linear-gradient(135deg, #1D2671, #C33764)'
];

// LocalStorage se theme index uthao, default index 0 rahega
let activeIdx = localStorage.getItem('globalLoveThemeIdx') ? parseInt(localStorage.getItem('globalLoveThemeIdx')) : 0;

// Theme apply karne ka function
const syncBackground = () => {
    document.body.style.background = themeLibrary[activeIdx];
    document.body.style.backgroundSize = "400% 400%";
    localStorage.setItem('globalLoveThemeIdx', activeIdx);
};

// Instantly apply on script load (No white screen)
syncBackground();

// Setup event listeners for buttons
const initializeThemeButtons = () => {
    // Ye dono pages ke potential button selectors hain
    const buttons = document.querySelectorAll('.color-btn, #theme-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Next theme par switch karo
            activeIdx = (activeIdx + 1) % themeLibrary.length;
            syncBackground();
        });
    });
};

// DOM ready hone par buttons ko activate karo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeThemeButtons);
} else {
    initializeThemeButtons();
}
