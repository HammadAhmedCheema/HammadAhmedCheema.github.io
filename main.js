// Cyber Samurai Portfolio - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Terminal Toggle
    const terminalToggle = document.querySelector('.terminal-toggle');
    const floatingTerminal = document.querySelector('.floating-terminal');
    terminalToggle.addEventListener('click', () => {
        floatingTerminal.classList.toggle('active');
        if (floatingTerminal.classList.contains('active')) {
            initTerminal();
        }
    });

    // Loading Screen Animation
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('fade-out');
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 1000);
    }, 2000);

    // Scroll Animations
    initScrollAnimations();

    // Skill Bar Animations
    animateSkillBars();

    // Counter Animations
    animateCounters();

    // Blood Drip Effects
    initBloodDrips();

    // Terminal Functionality
    function initTerminal() {
        const terminalOutput = document.getElementById('terminal-output');
        const commandInput = document.querySelector('.command-input');
        
        // Clear terminal
        terminalOutput.innerHTML = '';

        // Initial commands
        typeWriter(terminalOutput, 'Welcome to Cyber Samurai Terminal\n\n', () => {
            typeWriter(terminalOutput, 'Type "help" for available commands\n', () => {
                typeWriter(terminalOutput, '$_ ', () => {
                    commandInput.focus();
                });
            });
        });

        // Command handling
        commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = commandInput.value.trim();
                commandInput.value = '';
                
                // Echo command
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `<span class="prompt">$</span> ${command}`;
                terminalOutput.appendChild(commandLine);
                
                // Process command
                processCommand(command, terminalOutput);
                
                // Scroll to bottom
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }

    function processCommand(command, output) {
        const response = document.createElement('div');
        response.className = 'terminal-line output';
        
        switch(command.toLowerCase()) {
            case 'help':
                response.innerHTML = `Available commands:
                <br>• about - Show bio information
                <br>• skills - List technical skills
                <br>• contact - Show contact details
                <br>• clear - Clear terminal
                <br>• theme - Toggle dark/light mode`;
                break;
            case 'about':
                response.innerHTML = `Cyber Samurai - Digital Security Warrior
                <br>Specializing in offensive security, malware analysis, and purple team operations
                <br>Top 1% CTF player on TryHackMe & HackTheBox`;
                break;
            case 'skills':
                response.innerHTML = `• Reverse Engineering (Ghidra, IDA Pro, x64dbg)
                <br>• Exploit Development (ROP, Shellcoding)
                <br>• Malware Analysis (Static/Dynamic)
                <br>• Purple Teaming (MITRE ATT&CK, EDR Evasion)`;
                break;
            case 'contact':
                response.innerHTML = `Email: ronin@cybersamurai.com
                <br>Signal: +1 234-567-890
                <br>PGP: <a href="#" style="color:var(--color-accent)">View Key</a>`;
                break;
            case 'clear':
                output.innerHTML = '';
                return;
            case 'theme':
                toggleTheme();
                response.textContent = 'Theme toggled';
                break;
            default:
                response.textContent = `Command not found: ${command}`;
        }
        
        output.appendChild(response);
        typeWriter(output, '$_ ', () => {
            document.querySelector('.command-input').focus();
        });
    }

    function typeWriter(element, text, callback) {
        let i = 0;
        const speed = 20;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        
        type();
    }

    // Theme Management
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Scroll Animations
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.section-entrance');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Skill Bar Animations
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.getAttribute('data-level');
                    entry.target.style.width = `${level}%`;
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // Counter Animations
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = +entry.target.getAttribute('data-count');
                    const count = +entry.target.innerText;
                    const increment = target / 100;
                    
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count + increment);
                        setTimeout(() => animateCounter(entry.target, target), 10);
                    } else {
                        entry.target.innerText = target;
                    }
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    function animateCounter(element, target) {
        const count = +element.innerText;
        const increment = target / 100;
        
        if (count < target) {
            element.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(element, target), 10);
        } else {
            element.innerText = target;
        }
    }

    // Blood Drip Effects
    function initBloodDrips() {
        const bloodTriggers = document.querySelectorAll('.skill-item, .project-card');
        
        bloodTriggers.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const drip = item.querySelector('.blood-drip');
                if (drip) {
                    drip.style.height = '20px';
                    setTimeout(() => {
                        drip.style.height = '0';
                    }, 1000);
                }
            });
        });
    }

    // 3D Katana Model (using Three.js)
    function initKatanaModel() {
        const container = document.getElementById('katana-model');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xB22222, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Katana Model
        const loader = new THREE.GLTFLoader();
        loader.load(
            'assets/models/katana.glb',
            (gltf) => {
                const katana = gltf.scene;
                katana.position.y = -1;
                katana.rotation.y = Math.PI / 4;
                scene.add(katana);
                
                // Animation loop
                function animate() {
                    requestAnimationFrame(animate);
                    katana.rotation.y += 0.005;
                    renderer.render(scene, camera);
                }
                
                animate();
            },
            undefined,
            (error) => {
                console.error('Error loading katana model:', error);
            }
        );
        
        camera.position.z = 5;
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    // Initialize 3D model if Three.js is loaded
    if (typeof THREE !== 'undefined') {
        initKatanaModel();
    }
});

// Custom Cursor Effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    const trail = document.querySelector('.cursor-trail');
    
    if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    }
    
    if (trail) {
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        trail.style.opacity = '0.5';
        
        setTimeout(() => {
            trail.style.opacity = '0';
        }, 300);
    }
});

// Hover effects for cursor
const hoverElements = document.querySelectorAll('a, button, .nav-link, .project-link, .tool-item');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.querySelector('.custom-cursor').classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        document.querySelector('.custom-cursor').classList.remove('hover');
    });
});