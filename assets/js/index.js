/**
 * Project: Love Gallery V10 (Final Verified)
 * Developer: Anmol Jaisinghani (Atharv)
 * Logic: Particle systems, theme cycles, and autoplay-ready audio logic.
 */

"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // --- State & Config ---
    const heartSymbols = ['💖', '💗', '💓', '💝', '💕', '✨', '🌸'];
    const themeLibrary = [
        'linear-gradient(135deg, #FF61D2, #FE9090, #FFB8D1)',
        'linear-gradient(135deg, #FF1493, #FF69B4, #FFB6C1)',
        'linear-gradient(135deg, #8E2DE2, #4A00E0)',
        'linear-gradient(135deg, #00c6ff, #0072ff)',
        'linear-gradient(135deg, #f953c6, #b91d73)',
        'linear-gradient(135deg, #1D2671, #C33764)'
    ];

    let activeTheme = 0;
    const bgMusic = document.getElementById('background-music');
    const musicBtn = document.querySelector('.music-btn');

    /**
     * Engine: Heart Spawner
     * Creates randomized heart elements that float behind the UI.
     */
    const createParticle = () => {
        const heart = document.createElement('div');
        heart.className = 'particle-heart';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        const leftPos = Math.random() * 100;
        const duration = Math.random() * 3 + 4;
        const size = Math.random() * 1.5 + 1;

        heart.style.left = `${leftPos}vw`;
        heart.style.fontSize = `${size}rem`;
        heart.style.animationDuration = `${duration}s`;

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), duration * 1000);
    };

    setInterval(createParticle, 450);

    /**
     * Logic: Theme Cycler
     */
    const themeBtn = document.querySelector('.color-btn');
    themeBtn.addEventListener('click', () => {
        activeTheme = (activeTheme + 1) % themeLibrary.length;
        document.body.style.background = themeLibrary[activeTheme];
        document.body.style.backgroundSize = "400% 400%";
        console.log(`[Atharv-System]: Theme transitioned to palette ${activeTheme}`);
    });

    /**
     * FIXED Logic: Audio Controller (Autoplay Compatible)
     * Handles browser restrictions by triggering on first interaction.
     */
    const handleMusicPlay = () => {
        bgMusic.play().then(() => {
            musicBtn.innerHTML = 'Pause Song ⏸️';
        }).catch(err => {
            console.log("Autoplay blocked. Interaction required.");
        });
    };

    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            handleMusicPlay();
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = 'Play Our Song 🎵';
        }
    });

    // Pehla click poori body par kahin bhi ho, music start ho jayega agar autoplay block hua toh
    document.body.addEventListener('click', () => {
        if (bgMusic.paused) handleMusicPlay();
    }, { once: true });

    /**
     * Logic: Navigation to Next Page
     */
    const mainBtn = document.querySelector('.main-btn');
    mainBtn.addEventListener('click', () => {
        document.body.style.transition = "opacity 0.8s ease-in-out";
        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = 'Final.html';
        }, 800);
    });

    /**
     * Logic: Subtle 3D Card Tilt
     */
    const card = document.querySelector('.glass-container');
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const xRotation = (window.innerHeight / 2 - e.pageY) / 25;
            const yRotation = (e.pageX - window.innerWidth / 2) / 25;
            card.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        }
    });

});
