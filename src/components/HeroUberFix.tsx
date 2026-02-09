import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './hero-effects.css';

const HeroUberFix: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);
  const typingTextRef = useRef<HTMLSpanElement>(null);
  
  const styles = {
    hero: {
      position: 'relative' as const,
      background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #000000 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    contentContainer: {
      position: 'relative' as const,
      zIndex: 10,
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center',
    },
    titleContainer: {
      textAlign: isRTL ? 'right' as const : 'left' as const,
    },
    featuresContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2rem',
    },
    featureItem: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '1rem',
      padding: '1.5rem',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
    },
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles: Array<{
      x: number; y: number; size: number; speedX: number; speedY: number; color: string;
    }> = [];

    const colors = ['rgba(168, 85, 247, 0.6)', 'rgba(59, 130, 246, 0.6)', 'rgba(16, 185, 129, 0.6)'];

    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const mouse = { x: null as number | null, y: null as number | null, radius: 100 };
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.x; mouse.y = e.y; };
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawParticles = () => {
      particles.forEach(particle => {
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = particle.color.replace('0.6', '0.8');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const updateParticles = () => {
      particles.forEach(particle => {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            particle.x += forceDirectionX * force * 10;
            particle.y += forceDirectionY * force * 10;
          }
        }
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX = -particle.speedX;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY = -particle.speedY;
      });
    };

    // Animation loop is started below with proper cleanup

    createParticles();
    let animationId: number;
    const animateLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      connectParticles();
      drawParticles();
      animationId = requestAnimationFrame(animateLoop);
    };
    animationId = requestAnimationFrame(animateLoop);
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const text = t('hero.description');
    let index = 0;
    const speed = 50;

    const typeWriter = () => {
      if (index < text.length && typingTextRef.current) {
        typingTextRef.current.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
      }
    };
    if (typingTextRef.current) typingTextRef.current.innerHTML = '';
    setTimeout(typeWriter, 1000);
  }, [t, i18n.language]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      const orbs = [document.getElementById('orb1'), document.getElementById('orb2'), document.getElementById('orb3')];
      orbs.forEach((orb, index) => {
        if (orb) {
          const speed = 30 + index * 15;
          const x = (mouseX - 0.5) * speed;
          const y = (mouseY - 0.5) * speed;
          orb.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: '🏢', title: t('hero.feature1Title'), desc: t('hero.feature1Desc'), color: '#a855f7' },
    { icon: '👨‍🔧', title: t('hero.feature2Title'), desc: t('hero.feature2Desc'), color: '#3b82f6' },
    { icon: '📋', title: t('hero.feature3Title'), desc: t('hero.feature3Desc'), color: '#10b981' },
  ];

  return (
    <section className="hero-section" style={styles.hero} dir={isRTL ? 'rtl' : 'ltr'}>
      <canvas ref={canvasRef} className="particles-canvas absolute top-0 left-0 w-full h-full z-1" />
      <div className="parallax-layer-2 absolute inset-0 pointer-events-none">
        <div id="orb1" className="orb orb-1"></div>
        <div id="orb2" className="orb orb-2"></div>
        <div id="orb3" className="orb orb-3"></div>
      </div>

      <div style={styles.contentContainer}>
        <div style={styles.gridContainer}>
          <div style={styles.titleContainer}>
            <div className="hero-badge mb-8">
              <div className="badge-glow"></div>
              <span className="badge-text">{t('hero.badge')}</span>
            </div>

            <h1 className="hero-title mb-6">
              <span className="gradient-text text-6xl md:text-7xl lg:text-8xl font-black block">
                {t('hero.title')}
              </span>
              <span className="text-3xl md:text-4xl font-bold text-white/90 block mt-4">
                {t('hero.subtitle')}
              </span>
            </h1>

            <div className="hero-subtitle-container mb-10">
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                <span ref={typingTextRef}></span>
                <span id="cursor" className="cursor-animate">|</span>
              </p>
            </div>

            <div className="hero-buttons flex gap-4">
              <button className="animated-border-button">
                <span className="button-border"></span>
                <span className="button-content">
                  <span className="button-text">{t('hero.cta')}</span>
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
                  {t('hero.demo')}
                </span>
              </button>
            </div>
          </div>

          <div style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                style={styles.featureItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = isRTL ? 'translateX(10px)' : 'translateX(-10px)';
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div className="feature-header flex items-center gap-4 mb-4">
                  <div className="feature-icon text-3xl">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-white/70 text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse"><div className="scroll-wheel"></div></div>
        <span className="scroll-text">{t('hero.scroll')}</span>
      </div>

      <div ref={rippleContainerRef} className="ripple-container"></div>
    </section>
  );
};

export default HeroUberFix;
