document.addEventListener('DOMContentLoaded', () => {

    // --- PARTICLE EFFECT ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = '❤️'; // You can change this to 🌸 or ✨
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';

        document.getElementById('particles-container').appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Spawn hearts periodically
    setInterval(createHeart, 300);

    // --- LANDING PAGE TRANSITION ---
    const startBtn = document.getElementById('start-btn');
    const landing = document.getElementById('landing');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('bg-music');

    startBtn.addEventListener('click', () => {
        // Try to play music (browser policy might require user interaction first, which this click provides)
        music.play().catch(e => console.log("Audio play failed: ", e));
        music.volume = 0.5; // Set volume to 50%

        // Fade out landing
        landing.style.opacity = '0';

        // Wait for fade out then switch visibility
        setTimeout(() => {
            landing.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';

            // Fade in main content
            setTimeout(() => {
                mainContent.style.transition = 'opacity 1.5s ease';
                mainContent.style.opacity = '1';

                // Trigger typing animation after main content loads
                // (Optional: trigger purely by scroll, but we can setup the last section logic here)
            }, 100);

        }, 1000); // Matches CSS transition time
    });

    // --- SCROLL ANIMATIONS (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Special check for final section to start typing
                if (entry.target.id === 'final-message') {
                    startTypingEffect();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-on-scroll, .memory-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // Also observe final section for typing trigger
    observer.observe(document.getElementById('final-message'));


    // --- TYPING EFFECT ---
    const typeWriterElement = document.getElementById('typewriter-text');
    const finalBigText = document.querySelector('.big-love-text');
    const textToType = "To the girl who makes my world brighter...\nThank you for being you.\nI love you more than words can say.\nRemember Fufu is always there for youu \nCelebrating my special day with my special ONE \nYou are not just someone I love — you are my comfort, my happiness, and my favorite reason to smile.\nEvery laugh we share, every memory we create, and every little moment with you is something I deeply cherish.\nToday is all about you — the most wonderful person in my world\nlove you my Bujuku!❤️";
    let typeIndex = 0;
    let hasTyped = false;

    function startTypingEffect() {
        if (hasTyped) return;
        hasTyped = true;

        function type() {
            if (typeIndex < textToType.length) {
                const char = textToType.charAt(typeIndex);
                if (char === '\n') {
                    typeWriterElement.innerHTML += '<br>';
                } else {
                    typeWriterElement.innerHTML += char;
                }
                typeIndex++;
                setTimeout(type, 30); // Typing speed
            } else {
                // Show "Happy Birthday" after typing finishes
                setTimeout(() => {
                    finalBigText.classList.add('show');
                    launchConfetti(); // Optional bonus
                }, 500);
            }
        }
        type();
    }

    // --- DYNAMIC_GALLERY_POPULATION ---
    const allFiles = [
        "20241109_111843.jpg", "20241109_113932.jpg", "20250221_082515.jpg", "20250408_101118.jpg",
        "20250817_151750.jpg", "20250817_151845.jpg", "20250817_151920.jpg", "20260114_182342.jpg",
        "20260127_085304.jpg", "20260129_113537.jpg", "IMG-20231026-WA0009.jpg",
        "IMG-20241114-WA0008.jpg", "IMG-20250519-WA0440.jpg", "IMG-20250815-WA0005.jpg",
        "IMG20251207121854.jpg", "IMG_20241020_232453_0772.jpg", "IMG_20250317_193127_0203.jpg",
        "IMG_20250322_083850.jpg", "IMG_20251027_235736.jpg", "Snapchat-1027797250.jpg",
        "Snapchat-1153680887.jpg", "Snapchat-1202527589.mp4", "Snapchat-1213762512.mp4",
        "Snapchat-1302988080.mp4", "Snapchat-1410216347.jpg", "Snapchat-1460729092.mp4",
        "Snapchat-1487036757.jpg", "Snapchat-1525384848.jpg", "Snapchat-1529344382.mp4",
        "Snapchat-1535099299.mp4", "Snapchat-1575889930.mp4", "Snapchat-1599454522.mp4",
        "Snapchat-1628150306.jpg", "Snapchat-1651100973.mp4", "Snapchat-1713742694.jpg",
        "Snapchat-1755977263.jpg", "Snapchat-1764219285.jpg", "Snapchat-1905250959.jpg",
        "Snapchat-1972914067.jpg", "Snapchat-2076956149.jpg", "Snapchat-2096176804.mp4",
        "Snapchat-319162733.jpg", "Snapchat-388330092.mp4", "Snapchat-550166489.mp4",
        "Snapchat-669507767.mp4", "Snapchat-701619525.jpg", "Snapchat-760390405.jpg",
        "Snapchat-76407495.jpg", "Snapchat-826197708.jpg", "Snapchat-961634269.jpg",
        "Snapchat-971373996.mp4", "VID_183430422_230920_708.mp4",
        "WhatsApp Image 2025-09-07 at 10.44.51 PM.jpeg",
        "WhatsApp Image 2025-09-07 at 12.00.14 AM.jpeg",
        "WhatsApp Image 2026-02-04 at 8.43.54 PM.jpeg",
        "WhatsApp Image 2026-02-04 at 8.43.57 PM.jpeg",
        "WhatsApp Video 2026-02-04 at 8.43.52 PM.mp4",
        "WhatsApp Video 2026-02-04 at 8.43.57 PM.mp4",
        "adventures.jpg", "just_us.jpg", "special_day.jpg", "sweet_moment.jpg"
    ];

    // Separate images and videos
    const images = allFiles.filter(f => !f.endsWith('.mp4'));
    const videos = allFiles.filter(f => f.endsWith('.mp4'));

    // Shuffle independently
    images.sort(() => Math.random() - 0.5);
    videos.sort(() => Math.random() - 0.5);

    // Interleave: 3-4 images then 1 video
    const interleavedFiles = [];
    let imgIndex = 0;
    let vidIndex = 0;

    while (imgIndex < images.length || vidIndex < videos.length) {
        // Add 3 to 4 images
        const count = Math.floor(Math.random() * 2) + 3; // 3 or 4
        for (let i = 0; i < count && imgIndex < images.length; i++) {
            interleavedFiles.push(images[imgIndex++]);
        }
        // Add 1 video if available
        if (vidIndex < videos.length) {
            interleavedFiles.push(videos[vidIndex++]);
        }
    }

    // Quotes to intersperse
    const loveQuotes = [
        "Every moment with you is magic.✨",
        "You will always be my chellakutty🌍",
        "My heart is perfect because you are in it. (MY bujukaaari)❤️",
        "Yevaloo azhagaa iruke paaru thangamanii😍",
        "In a sea of people, my eyes will always search for you👀",
        "love all your craziness my bujuku babyyyy💖",
        "Forever is a long time, but I wouldn't mind spending it by your side for the rest of my life⏳",
        "You are the best thing that ever happened to me(MY POKKISHAM) 🎁",
        "With you, everything is better.(MY BRIGHTEEE)🌸",
        "All the love fufu has is only for bujukuuu😍",
        "My bujuku babyyyyyyyyyyyyyyyyyyyyy🌍"
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    let quoteIndex = 0;

    interleavedFiles.forEach((file, index) => {
        // Insert a quote every 6 items (adjust frequency as needed)
        if (index > 0 && index % 6 === 0) {
            const quoteItem = document.createElement('div');
            quoteItem.classList.add('gallery-item', 'gallery-quote', 'fade-in-on-scroll');

            // Randomly make some quotes wide
            if (Math.random() > 0.5) quoteItem.classList.add('wide');

            const quoteText = document.createElement('p');
            quoteText.textContent = loveQuotes[quoteIndex % loveQuotes.length];
            quoteItem.appendChild(quoteText);

            galleryGrid.appendChild(quoteItem);
            quoteIndex++;
        }

        const item = document.createElement('div');
        item.classList.add('gallery-item', 'fade-in-on-scroll');

        const isVideo = file.endsWith('.mp4');

        // Logic: Videos are double size (big), photos are random
        if (isVideo) {
            item.classList.add('big');
        } else {
            const rand = Math.random();
            if (rand > 0.8) item.classList.add('big');
            else if (rand > 0.6) item.classList.add('wide');
            else if (rand > 0.4) item.classList.add('tall');
        }

        // Add random stagger connection
        if (index % 3 === 1) item.classList.add('delay-1');
        if (index % 3 === 2) item.classList.add('delay-2');

        let mediaEl;
        if (isVideo) {
            mediaEl = document.createElement('video');
            mediaEl.src = `assets/${file}`;
            mediaEl.muted = true;
            mediaEl.loop = true;
            mediaEl.onmouseover = function () { this.play(); };
            mediaEl.onmouseout = function () { this.pause(); };
        } else {
            mediaEl = document.createElement('img');
            mediaEl.src = `assets/${file}`;
            mediaEl.alt = "Beautiful Moment";
            mediaEl.loading = "lazy";
        }

        mediaEl.onerror = function () { this.parentElement.style.display = 'none'; };

        // Click to match lightbox logic
        mediaEl.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            if (isVideo) {
                const videoClone = mediaEl.cloneNode(true);
                videoClone.controls = true;
                videoClone.muted = false;
                videoClone.autoplay = true;

                lightboxImg.style.display = 'none';
                let existingVideo = document.getElementById('lightbox-video');
                if (existingVideo) existingVideo.remove();

                videoClone.id = 'lightbox-video';
                videoClone.classList.add('lightbox-content');
                lightbox.appendChild(videoClone);
            } else {
                let existingVideo = document.getElementById('lightbox-video');
                if (existingVideo) existingVideo.remove();

                lightboxImg.style.display = 'block';
                lightboxImg.src = mediaEl.src;
            }
        });

        item.appendChild(mediaEl);
        galleryGrid.appendChild(item);
    });

    // Re-run observer for new elements
    document.querySelectorAll('.gallery-item').forEach(el => {
        observer.observe(el);
    });

    // --- LIGHTBOX GALLERY (Updated to handle closing video) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    // (Note: Click listeners for dynamic items added above in loop)

    function closeLightbox() {
        lightbox.style.display = 'none';
        let existingVideo = document.getElementById('lightbox-video');
        if (existingVideo) {
            existingVideo.pause();
            existingVideo.remove();
        }
    }

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // --- RELATIONSHIP TIMER ---
    const startDate = new Date("2024-10-07T00:00:00"); // REPLACE WITH YOUR START DATE

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('years').innerText = years;
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    // --- CONFETTI FUNCTION ---
    function launchConfetti() {
        // Simple confetti using existing particles or new DOM elements
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.innerText = ['🎉', '🎊', '✨', '🎂', '💖'][Math.floor(Math.random() * 5)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10vh';
            confetti.style.fontSize = (Math.random() * 20 + 20) + 'px';
            confetti.style.zIndex = '1000';
            confetti.style.transition = 'top 3s ease-in, transform 3s ease';
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.style.top = '110vh';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            }, 100);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    }

    // --- INTERACTIVE CAKE ---
    const cake = document.getElementById('cake');
    const flame = document.querySelector('.flame');

    cake.addEventListener('click', () => {
        if (!flame.classList.contains('blown')) {
            flame.classList.add('blown');
            launchConfetti();

            // Show Cartoon Popups
            document.querySelectorAll('.cartoon-popup').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('pop-visible');
                }, index * 200);
            });

            // Show Wish Form after a short delay
            setTimeout(() => {
                document.getElementById('wish-container').classList.add('visible');
                // Auto-scroll to form smoothly
                document.getElementById('wish-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 2000);
        }
    });

    // --- SEND WISH LOGIC (EmailJS) ---
    document.getElementById('send-wish-btn').addEventListener('click', () => {
        const messageBox = document.getElementById('wish-message');
        const message = messageBox.value;
        const btn = document.getElementById('send-wish-btn');

        if (message.trim() === "") {
            alert("Please write something sweet first! 📝");
            return;
        }

        btn.innerText = "Sending... 🚀";
        btn.disabled = true;

        // EMAILJS CONFIGURATION
        const serviceID = "service_v2fkqzq";   // REPLACE THIS
        const templateID = "template_h8tnoa1"; // REPLACE THIS

        const templateParams = {
            message: message,
            to_name: "My Love", // Optional: customize based on template variables
        };

        emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
                btn.innerText = "Sent! 💌";
                alert("Your wish has been sent to me! I love you! ❤️");
                messageBox.value = "";
                setTimeout(() => {
                    btn.innerText = "Make My Wish 💌";
                    btn.disabled = false;
                }, 3000);
            }, (err) => {
                btn.innerText = "Failed ❌";
                btn.disabled = false;
                alert(JSON.stringify(err));
                console.error('FAILED...', err);
            });
    });

});
