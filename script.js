document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Professional Boot Sequence Animation
    const loader = document.getElementById('loader');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-container');
    const consoleOutput = document.getElementById('console-output');
    
    const bootSequence = [
        { text: "INIT: Booting Portfolio Kernel v3.4.1", delay: 100 },
        { text: "Mounting virtual file systems...", delay: 150 },
        { text: "[ OK ] Loaded base environment.", class: "success", delay: 100 },
        { text: "Resolving dependencies for 'Ardan_Pramudya_Profile'...", delay: 200 },
        { text: "Fetching packages: [====================] 100%", delay: 300 },
        { text: "[ OK ] Core modules compiled successfully.", class: "success", delay: 100 },
        { text: "Initializing cryptographic handshake...", delay: 150 },
        { text: "[ WARN ] Unknown incoming connection detected.", class: "warning", delay: 400 },
        { text: "Verifying signature...", delay: 200 },
        { text: "[ OK ] Identity verified. Access level: GUEST", class: "success", delay: 100 },
        { text: "Decrypting CV and UI assets...", delay: 150 },
        { text: "Execute: launch_portfolio.sh", class: "highlight", delay: 300 },
        { text: "System check passed. Welcome.", class: "highlight", delay: 500 }
    ];

    let currentLine = 0;
    
    function runBootSequence() {
        if (currentLine < bootSequence.length) {
            const line = bootSequence[currentLine];
            const p = document.createElement('p');
            p.innerHTML = `> ${line.text}`;
            if (line.class) p.classList.add(line.class);
            consoleOutput.appendChild(p);
            
            // Auto scroll to the bottom as text fills up
            const bootConsole = document.getElementById('boot-console');
            bootConsole.scrollTop = bootConsole.scrollHeight;
            
            currentLine++;
            setTimeout(runBootSequence, line.delay);
        } else {
            // Boot sequence finished, fade out loader
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    heroContent.classList.remove('hidden-init');
                    heroContent.classList.add('show-init');
                    if (heroImage) {
                        heroImage.classList.remove('hidden-init');
                        heroImage.classList.add('show-init');
                    }
                    setTimeout(startTyping, 600);
                }, 500);
            }, 800);
        }
    }
    
    // Start sequence
    setTimeout(runBootSequence, 300);

    // 2. Terminal Typing Effect
    const typewriterElement = document.getElementById('typewriter');
    const commands = [
        "npm start --portfolio",
        "python analyze_system.py",
        "figma export --ui-ux",
        "git commit -m 'Update CV data'",
        "ssh admin@ardan-pramudya.local"
    ];
    let cmdIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function startTyping() {
        const currentCmd = commands[cmdIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentCmd.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentCmd.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 30 : 80;

        if (!isDeleting && charIndex === currentCmd.length) {
            typingSpeed = 2000; // Pause after typing complete command
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            cmdIndex = (cmdIndex + 1) % commands.length;
            typingSpeed = 500; // Pause before new command
        }

        setTimeout(startTyping, typingSpeed);
    }

    // 3. Scroll Animations in Website
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Stop observing once shown
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => scrollObserver.observe(el));

    // 4. Navbar dynamic styling on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.borderBottom = '1px solid #222';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.borderBottom = '1px solid transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // 5. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 6. Hacker Text Decryption Effect (Hover)
    // ==========================================
    const hackerElements = document.querySelectorAll('.nav-links a, .project-title, .btn');
    const decodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>[]{}!?/\\';
    
    hackerElements.forEach(el => {
        // Store original text
        if (!el.dataset.original) {
            el.dataset.original = el.innerText;
        }

        el.addEventListener('mouseenter', () => {
            let iterations = 0;
            const originalText = el.dataset.original;
            
            clearInterval(el.interval);
            
            el.interval = setInterval(() => {
                el.innerText = originalText.split('')
                    .map((letter, index) => {
                        if(index < iterations) {
                            return originalText[index];
                        }
                        return decodeChars[Math.floor(Math.random() * decodeChars.length)];
                    })
                    .join('');
                
                if(iterations >= originalText.length){
                    clearInterval(el.interval);
                }
                
                // Speed of decryption
                iterations += 1 / 3;
            }, 30);
        });
    });

    // ==========================================
    // 6.5 3D Holographic UI & Card Hover Glow
    // ==========================================
    const cards3D = document.querySelectorAll('.project-card, .terminal-window, .code-snippet-box, .terminal-form, .boot-terminal');
    cards3D.forEach(card => {
        card.addEventListener('mousemove', e => {
            card.style.transition = 'none'; // Instant tracking
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // For glow effect
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // 3D Tilt Calculations
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -12; 
            const rotateY = ((x - centerX) / centerX) * 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            
            // Dynamic 3D lighting shadow
            const shadowX = rotateY * 1.5;
            const shadowY = rotateX * -1.5;
            card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 240, 255, 0.2)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.boxShadow = ''; // Revert to CSS default
        });
    });

    // ==========================================
    // 7. Elegant Professional Node Network
    // ==========================================
    const cyberCanvas = document.getElementById('cyber-canvas');
    if (cyberCanvas) {
        const ctx = cyberCanvas.getContext('2d');
        cyberCanvas.width = window.innerWidth;
        cyberCanvas.height = window.innerHeight;

        let particlesArray = [];
        let mouse = {
            x: null,
            y: null,
            radius: 150
        };

        window.addEventListener('mousemove', function(event) {
            mouse.x = event.x;
            mouse.y = event.y;
        });
        
        window.addEventListener('mouseout', function() {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        window.addEventListener('resize', function() {
            cyberCanvas.width = window.innerWidth;
            cyberCanvas.height = window.innerHeight;
            initNodes();
        });

        class NodeParticle {
            constructor() {
                this.x = Math.random() * cyberCanvas.width;
                this.y = Math.random() * cyberCanvas.height;
                this.size = Math.random() * 2 + 1; 
                this.speedX = (Math.random() - 0.5) * 0.5; // Very slow speed
                this.speedY = (Math.random() - 0.5) * 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges smoothly
                if (this.x > cyberCanvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > cyberCanvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        function initNodes() {
            particlesArray = [];
            // Clean, uncluttered number of particles
            let numberOfParticles = (cyberCanvas.height * cyberCanvas.width) / 12000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new NodeParticle());
            }
        }

        function animateNodes() {
            requestAnimationFrame(animateNodes);
            ctx.clearRect(0, 0, cyberCanvas.width, cyberCanvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                
                // Draw lines between close particles to form network
                for (let j = i; j < particlesArray.length; j++) {
                    let dx = particlesArray[i].x - particlesArray[j].x;
                    let dy = particlesArray[i].y - particlesArray[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 240, 255, ${0.2 - distance/600})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }

                // Interactive connection to mouse
                if (mouse.x != undefined) {
                    let dxMouse = particlesArray[i].x - mouse.x;
                    let dyMouse = particlesArray[i].y - mouse.y;
                    let distanceMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
                    if (distanceMouse < mouse.radius) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 - distanceMouse/(mouse.radius * 2.5)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        initNodes();
        animateNodes();
    }

    // ==========================================
    // 8. Button Ripple Click Effect
    // ==========================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            // Get click coordinates relative to button
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const circle = document.createElement('span');
            circle.classList.add('ripple');
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;

            // Remove existing ripples to prevent buildup
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            this.appendChild(circle);

            // Remove ripple after animation completes
            setTimeout(() => {
                circle.remove();
            }, 600);
        });
    });

    // ==========================================
    // 9. Dynamic Daily Visitor Counter (200 - 450)
    // ==========================================
    const visitorEl = document.getElementById('visitor-counter');
    if (visitorEl) {
        const today = new Date();
        const dateSeed = today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate();
        
        // Pseudo-random number generator based on the date
        const pseudoRandom = Math.abs(Math.sin(dateSeed) * 10000);
        
        // Base daily target between 200 and 400
        const dailyTarget = Math.floor((pseudoRandom - Math.floor(pseudoRandom)) * 201) + 200;
        
        // Add current hour to make the number grow dynamically throughout the day up to ~450
        const currentHour = today.getHours();
        const currentVisitors = dailyTarget + Math.floor(currentHour * 1.8);
        
        visitorEl.innerHTML = `Traffic: <span class="accent-cyan">${currentVisitors}</span> Daily Unique Visitors`;
    }

    // ==========================================
    // 10. Profile Image Crossfade Slideshow
    // ==========================================
    const heroImages = document.querySelectorAll('.hero-image');
    let currentHeroImgIndex = 0;
    
    if (heroImages.length > 1) {
        setInterval(() => {
            heroImages[currentHeroImgIndex].classList.remove('active');
            currentHeroImgIndex = (currentHeroImgIndex + 1) % heroImages.length;
            heroImages[currentHeroImgIndex].classList.add('active');
        }, 4000); // Crossfade every 4 seconds
    }
});
