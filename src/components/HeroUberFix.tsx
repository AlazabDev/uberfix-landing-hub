import React, { useEffect, useRef, useState } from 'react';
import './hero-effects.css';

const HeroUberFix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [stats, setStats] = useState({
    performance: 0,
    users: 0,
    satisfaction: 0
  });

  // Particle System
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Particle configuration
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      baseX: number;
      baseY: number;
      density: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(168, 85, 247, 0.6)',
      'rgba(59, 130, 246, 0.6)',
      'rgba(236, 72, 153, 0.6)',
      'rgba(139, 92, 246, 0.6)',
    ];

    // Create particles
    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          density: Math.random() * 30 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Mouse interaction
    const mouse = { x: null as number | null, y: null as number | null, radius: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Ripple effect
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (rippleContainerRef.current) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        rippleContainerRef.current.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 1500);
      }
    };

    // Connect particles with lines
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = 1 - distance / 120;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Draw particles
    const drawParticles = () => {
      particles.forEach(particle => {
        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Inner core
        ctx.fillStyle = particle.color.replace('0.6', '1');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Update particles
    const updateParticles = () => {
      particles.forEach(particle => {
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            particle.x += forceDirectionX * force * particle.density;
            particle.y += forceDirectionY * force * particle.density;
          }
        }

        // Return to base position
        const dx = particle.baseX - particle.x;
        const dy = particle.baseY - particle.y;
        particle.x += dx * 0.05 + particle.speedX;
        particle.y += dy * 0.05 + particle.speedY;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.baseX = Math.random() * canvas.width;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.baseY = Math.random() * canvas.height;
        }
      });
    };

    // Animation loop
    const animate = () => {
      if (!isVisible) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      connectParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    // Initialize
    createParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [isVisible]);

  // Animate stats counter
  useEffect(() => {
    const animateCounter = (targetValue: number, setter: (value: number) => void) => {
      let startValue = 0;
      const duration = 2000;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);
        
        setter(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setter(targetValue);
        }
      };

      requestAnimationFrame(step);
    };

    const timer = setTimeout(() => {
      animateCounter(99, (value) => setStats(prev => ({ ...prev, performance: value })));
      animateCounter(50, (value) => setStats(prev => ({ ...prev, users: value })));
      animateCounter(100, (value) => setStats(prev => ({ ...prev, satisfaction: value })));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const canvas = canvasRef.current;
      const orbs = [
        document.getElementById('orb1'),
        document.getElementById('orb2'),
        document.getElementById('orb3'),
      ];

      if (canvas) {
        canvas.style.transform = `translateY(${scrolled * 0.3}px)`;
      }

      orbs.forEach((orb, index) => {
        if (orb) {
          const speed = 0.4 + index * 0.1;
          orb.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move parallax for orbs
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      const orbs = [
        document.getElementById('orb1'),
        document.getElementById('orb2'),
        document.getElementById('orb3'),
      ];

      orbs.forEach((orb, index) => {
        if (orb) {
          const speed = 20 + index * 10;
          const x = (mouseX - 0.5) * speed;
          const y = (mouseY - 0.5) * speed;
          const scrollOffset = window.pageYOffset * (0.4 + index * 0.1);
          orb.style.transform = `translateY(${scrollOffset}px) translate(${x}px, ${y}px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth scroll for anchor links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    const targetElement = document.getElementById(targetId || '');
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="particles-canvas absolute top-0 left-0 w-full h-full z-1"
      />

      {/* Parallax Orbs */}
      <div className="parallax-layer-2 absolute inset-0 pointer-events-none">
        <div id="orb1" className="orb orb-1"></div>
        <div id="orb2" className="orb orb-2"></div>
        <div id="orb3" className="orb orb-3"></div>
      </div>

      {/* Main Content */}
      <div className="parallax-layer-3 relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Animated Badge */}
        <div className="hero-badge">
          <div className="badge-glow"></div>
          <span className="badge-text">🚀 الجيل القادم من إدارة الصيانة</span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title">
          <span className="title-line-1 block mb-2">
            <span className="gradient-text text-5xl md:text-7xl lg:text-8xl font-black">
              UberFix
            </span>
          </span>
          <span className="title-line-2 block">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold">
              إدارة الصيانة الذكية
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          استمتع بتجربة فريدة في إدارة عقارك التجاري أو السكني. نقدم حلولاً عملية للحفاظ على عقارك في أفضل حالة.
        </p>

        {/* Features */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          <div className="feature-card p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <div className="feature-icon text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-bold mb-2">إدارة صيانة الفروع</h3>
            <p className="text-white/70">إدارة مركزية لجميع عمليات الصيانة في فروعك</p>
          </div>
          
          <div className="feature-card p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300">
            <div className="feature-icon text-4xl mb-4">👨‍🔧</div>
            <h3 className="text-xl font-bold mb-2">إدارة الفنيين</h3>
            <p className="text-white/70">تنظيم وتوزيع المهام على الفنيين بكفاءة</p>
          </div>
          
          <div className="feature-card p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300">
            <div className="feature-icon text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-2">إدارة طلبات الصيانة</h3>
            <p className="text-white/70">تتبع ومعالجة طلبات الصيانة بسهولة</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-buttons">
          <button className="animated-border-button" id="primaryBtn">
            <span className="button-border"></span>
            <span className="button-content">
              <span className="button-text">ابدأ رحلتك الآن</span>
              <svg className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <span className="button-glow"></span>
          </button>

          <button className="secondary-button">
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              شاهد العرض التوضيحي
            </span>
          </button>
        </div>

        {/* Stats Section */}
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-value">{stats.performance}%</div>
            <div className="stat-label">كفاءة الأداء</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-value">{stats.users}K+</div>
            <div className="stat-label">مستخدم</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-value">{stats.satisfaction}%</div>
            <div className="stat-label">رضا العملاء</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span className="scroll-text">قم بالتمرير للاستكشاف</span>
      </div>

      {/* Ripple Effect Container */}
      <div ref={rippleContainerRef} className="ripple-container"></div>
    </section>
  );
};

export default HeroUberFix;
