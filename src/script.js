// Macintosh II Theme Configuration for Tailwind
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                // Macintosh II (1987) Palette
                macBlue: '#009DDC',
                macPurple: '#963D97',
                macRed: '#E03A3E',
                macOrange: '#F5821F',
                macGreen: '#61BB46',
                macYellow: '#FDB827',

                // Category Mappings
                blog: '#009DDC',      // Mac Blue
                events: '#963D97',    // Mac Purple
                projects: '#E03A3E',  // Mac Red

                // Custom background systems
                platinumBeige: '#E9E6DF', // Macintosh II warm case beige
                charcoalBlack: '#0D0D0E', // Sleek dark slate

                // Actionable Link colors matching light/dark contrast needs
                darkLink: '#4fa3f7',
                lightLink: '#0066CC'
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const statusLed = document.getElementById('status-led');
    const toggleLabel = document.getElementById('toggle-label');
    const htmlElement = document.documentElement;
    const orbImage = document.getElementById('orb-image');

    // Theme management (defaulting to Platinum / Light mode)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        updateUI(true);
    } else {
        htmlElement.classList.remove('dark');
        updateUI(false);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = htmlElement.classList.contains('dark');
            if (isDark) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                updateUI(false);
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateUI(true);
            }
        });
    }

    function updateUI(isDark) {
        if (isDark) {
            if (toggleLabel) toggleLabel.textContent = 'dark';
            if (statusLed) statusLed.style.backgroundColor = '#61BB46'; // Classic Green LED
            if (orbImage) {
                orbImage.src = 'https://placehold.co/256x256/0D0D0E/963D97?text=placeholder';
            }
        } else {
            if (toggleLabel) toggleLabel.textContent = 'light';
            if (statusLed) statusLed.style.backgroundColor = '#E03A3E'; // Retro red/orange warning LED
            if (orbImage) {
                orbImage.src = 'https://placehold.co/256x256/E9E6DF/963D97?text=placeholder';
            }
        }
    }

    // SPA Hash-Based Routing Engine
    function handleRoute() {
        const hash = window.location.hash;
        const aboutSection = document.getElementById('about-section');
        const backBtnNav = document.getElementById('back-to-home');
        const pageLabel = document.getElementById('current-page-label');
        const categories = ['projects', 'blog', 'events'];

        // Special handling for PGP/about views
        if (hash === '#/about') {
            if (aboutSection) aboutSection.classList.remove('hidden');
            if (backBtnNav) backBtnNav.classList.remove('hidden');
            if (pageLabel) pageLabel.textContent = 'about';
            categories.forEach(cat => {
                const sec = document.getElementById(`section-${cat}`);
                if (sec) sec.classList.add('hidden');
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Category routing engine
        if (hash.startsWith('#/')) {
            const activeCategory = hash.substring(2); // e.g. "blog"
            if (categories.includes(activeCategory)) {
                // Hide about section
                if (aboutSection) aboutSection.classList.add('hidden');
                // Show retro back navigation
                if (backBtnNav) backBtnNav.classList.remove('hidden');
                if (pageLabel) pageLabel.textContent = activeCategory;

                // Toggle visibility of each list node with clean layout transitions
                categories.forEach(cat => {
                    const sec = document.getElementById(`section-${cat}`);
                    if (sec) {
                        if (cat === activeCategory) {
                            sec.classList.remove('hidden');
                            sec.style.opacity = '1';
                        } else {
                            sec.classList.add('hidden');
                        }
                    }
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
        }

        // Standard Dashboard Overview Routing (home or fallback)
        if (aboutSection) aboutSection.classList.remove('hidden');
        if (backBtnNav) backBtnNav.classList.add('hidden');
        categories.forEach(cat => {
            const sec = document.getElementById(`section-${cat}`);
            if (sec) {
                sec.classList.remove('hidden');
                sec.style.opacity = '1';
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Connect SPA listeners to history shifts
    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Execute route check on initial script load
});