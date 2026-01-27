import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Download, ExternalLink, ChevronDown, Moon, Sun } from 'lucide-react';

// Three.js background component
const ThreeBackground = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        const color = darkMode ? '0, 245, 255' : '124, 58, 237';
        ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const color = darkMode ? '0, 245, 255' : '124, 58, 237';
            ctx.strokeStyle = `rgba(${color}, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [darkMode]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, opacity: darkMode ? 0.4 : 0.3 }} />;
};

// Cursor trail effect
const CursorTrail = ({ darkMode }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const cursorColor = darkMode ? '#00f5ff' : '#7c3aed';

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: position.x - 10,
          top: position.y - 10,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: `2px solid ${cursorColor}`,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.15s ease, opacity 0.15s ease',
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          opacity: isHovering ? 0.8 : 0.5,
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: position.x - 3,
          top: position.y - 3,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: cursorColor,
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    </>
  );
};

const useTypewriter = (texts, speed = 80, deleteSpeed = 40, delay = 1200) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, speed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), delay);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length - 1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index, texts, speed, deleteSpeed, delay]);

  return displayText;
};


const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const typingText = useTypewriter([
    "Full-Stack Developer | Python - Django / Flask | Angular / ReactJs",
    "Python Full-Stack Developer",
    "Software Engineer Trainee"
  ]);


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();          
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = {
    'Frontend': ['React.js', 'Angular', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    'Backend': ['Python', 'Django', 'Flask', 'REST APIs'],
    'Database': ['MySQL', 'MongoDB', 'SQLite'],
    'Tools': ['Git', 'Docker', 'Firebase', 'GenAI', 'Genkit']
  };

  const experience = [
    {
      title: 'Software Engineer Trainee',
      company: 'Quest Innovative Solutions, Cochin',
      period: 'June 2024 - Dec 2025',
      points: [
        'Full-stack development using Django, React, Angular, and MySQL',
        'Responsive UI development following modern UX standards',
        'Backend–frontend integration for seamless workflows',
        'Mentoring interns in Python and web development',
        'Git-based team collaboration'
      ]
    },
    {
      title: 'Python Full-Stack Developer Intern',
      company: 'Quest Innovative Solutions, Cochin',
      period: 'Mar 2024 – June 2024',
      points: [
        'Student Management System with authentication and CRUD operations',
        'Mobile-friendly Bootstrap-based interfaces',
        'JavaScript 8×8 chessboard implementation',
        'Python Tkinter applications',
        'SQL query and schema optimization'
      ]
    },
    {
      title: 'Fire Alarm Technician',
      company: 'Naffco Electro Mechanical Co. (LLC), Abu Dhabi, U.A.E ',
      period: 'June 2023 – Feb 2024',
      points: [
        'Performed maintenance and servicing of fire alarm systems ',
        'Maintained central ba ery systems to ensure opera onal reliability ',
        'Conducted servicing of FM200 and foam-based fire suppression systems '
      ]
    }
  ];

  const projects = [
    {
      title: 'Air Quality Monitoring System',
      description: 'Real-time air quality monitoring application with data visualization and alerting capabilities',
      tech: ['Python', 'Django', 'React.Js', 'REST API', 'MySQL', 'Cryptography'],
      github: 'https://github.com/sh46on/Air-Monitoring-Dashboard'
    },
    {
      title: 'Smart Hiking – AI Powered Application',
      description: 'AI-powered hiking companion featuring route optimization, weather prediction, and safety recommendations',
      tech: ['Python', 'Django', 'GenAI', 'Copilot', 'OpenWeather', 'Daphne', 'Docker'],
      github: 'https://github.com/sh46on/Smart-AI-Hiking'
    },
    {
      title: 'HemoFlow+ – Blood Donation System',
      description: 'Comprehensive blood donation management platform connecting donors with recipients efficiently',
      tech: ['Django', 'MySQL', 'Javascript', 'Bootstrap', 'OpenStreetMap'],
      github: 'https://github.com/sh46on/HemoflowPlus'
    },
    {
      title: 'E-Voting System',
      description: 'Secure electronic voting platform with blockchain-inspired verification and real-time result tracking',
      tech: ['Python', 'Django', 'Sqlite3', 'Tensorflow', 'Javascript', 'dlib', 'WeasyPrint', 'Cmake', 'GTK3'],
      github: 'https://github.com/sh46on/E-Voting'
    },
    {
      title: 'Reverse-OLX',
      description: 'A Reverse OLX platform where buyers post their requirements and sellers respond with offers. Unlike traditional OLX-style listings, this app flips the flow',
      tech: ['Angular', 'Django', 'Sqlite3', 'daphne', 'Django-Rest-Framework'],
      github: 'https://github.com/sh46on/Reverse-OLX'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Commerce',
      field: 'Finance & Taxation',
      status: 'Pursuing',
      institution: 'Tandem College - Cochin, Mahatma Gandhi University'
    },
    {
      degree: 'Diploma',
      field: 'Industrial Electrical Engineering',
      status: '90%',
      institution: 'Little Flower Engineering Institute, Kalamassery'
    },
    {
      degree: 'Plus Two',
      field: 'Commerce with Computer Application',
      status: '60%',
      institution: 'Our Lady Of Mercy Higher Secondary School, Aroor'
    },
    {
      degree: 'SSLC',
      field: 'Kerala State Board',
      status: '72%',
      institution: 'Sacred Heart Higher Secondary School, Thevara'
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    // In production, place resume.pdf in public folder
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Sharon_K_Varghese_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      fontFamily: "'Space Grotesk', 'Rajdhani', monospace",
      background: darkMode
        ? '#05070f'
        : 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 25%, #fecaca 50%, #ddd6fe 75%, #bfdbfe 100%)',
      color: darkMode ? '#e0e0e0' : '#1f2937',
      minHeight: '100vh',
      position: 'relative',
      cursor: 'none'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          cursor: none !important;
        }
        
        body {
          overflow-x: hidden;
        }
        
        .glassmorphism {
          background: ${darkMode ? 'rgba(11, 15, 26, 0.7)' : 'rgba(255, 255, 255, 0.25)'};
          backdrop-filter: blur(20px);
          border: 1px solid ${darkMode ? 'rgba(0, 245, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'};
          border-radius: 16px;
          box-shadow: ${darkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)'};
        }
        
        .neon-glow {
          box-shadow: 0 0 20px ${darkMode ? 'rgba(0, 245, 255, 0.3)' : 'rgba(124, 58, 237, 0.3)'};
        }
        
        .neon-text {
          text-shadow: ${darkMode
          ? '0 0 10px rgba(0, 245, 255, 0.8), 0 0 20px rgba(0, 245, 255, 0.6), 0 0 30px rgba(0, 245, 255, 0.4)'
          : '0 0 10px rgba(124, 58, 237, 0.4), 0 0 20px rgba(124, 58, 237, 0.3)'
        };
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: ${darkMode
          ? '0 20px 40px rgba(0, 245, 255, 0.2)'
          : '0 20px 40px rgba(124, 58, 237, 0.15)'
        };
        }
        
        .magnetic-button {
          transition: transform 0.2s ease;
        }
        
        .magnetic-button:hover {
          transform: scale(1.05);
        }
        
        .scroll-indicator {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>

      <CursorTrail darkMode={darkMode} />
      <ThreeBackground darkMode={darkMode} />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: darkMode ? 'rgba(5, 7, 15, 0.95)' : 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${darkMode ? 'rgba(0, 245, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)'}`,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: darkMode ? 'transparent' : '#b91c1c',
          background: darkMode ? 'linear-gradient(135deg, #00f5ff, #a855f7)' : 'none',
          WebkitBackgroundClip: darkMode ? 'text' : 'unset',
          WebkitTextFillColor: darkMode ? 'transparent' : '#b91c1c',
          letterSpacing: '1px',
          textShadow: darkMode ? 'none' : '0 2px 5px rgba(185, 28, 28, 0.3)'
        }}>
          SV
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(item => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="magnetic-button"
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === item.toLowerCase()
                  ? (darkMode ? '#00f5ff' : '#dc2626')
                  : (darkMode ? '#e0e0e0' : '#6b7280'),
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'color 0.3s ease',
                letterSpacing: '0.5px',
                textShadow: darkMode ? 'none' : 'none'
              }}
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="magnetic-button"
            style={{
              background: darkMode ? 'rgba(0, 245, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
              border: `1px solid ${darkMode ? 'rgba(0, 245, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: darkMode ? '#00f5ff' : '#ffffff'
            }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: darkMode ? '#00f5ff' : '#ea580c',
            marginBottom: '1rem',
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textShadow: darkMode ? 'none' : '0 1px 3px rgba(234, 88, 12, 0.3)'
          }}>
            {/* Software Engineer Trainee */}
            Python Full-Stack Developer
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            lineHeight: 1.1,
            letterSpacing: '-2px',
            color: darkMode ? '#e0e0e0' : '#991b1b',
            textShadow: darkMode ? 'none' : '0 3px 15px rgba(153, 27, 27, 0.2)'
          }}>
            SHARON K VARGHESE
          </h1>

          {/* <div style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: darkMode ? '#00f5ff' : '#d97706',
            fontWeight: 600,
            marginBottom: '2rem',
            textShadow: darkMode 
              ? '0 0 10px rgba(0, 245, 255, 0.5)' 
              : '0 2px 8px rgba(217, 119, 6, 0.3)'
          }}>
            Python Full-Stack Developer
          </div> */}

          <div
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: darkMode ? '#00f5ff' : '#4f46e5',
              fontWeight: 600,
              marginBottom: '2rem',
              minHeight: '2.8rem',
              textShadow: darkMode
                ? '0 0 12px rgba(0,245,255,0.6)'
                : '0 2px 10px rgba(79,70,229,0.35)',
              letterSpacing: '0.5px'
            }}
          >
            {typingText}
            <span style={{
              marginLeft: '4px',
              opacity: 0.8,
              animation: 'blink 1s infinite'
            }}>|</span>
          </div>


          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            lineHeight: 1.8,
            color: darkMode ? '#b0b0b0' : '#374151',
            fontWeight: 400,
            textShadow: darkMode ? 'none' : 'none'
          }}>
            Building scalable, responsive, production-ready web applications with Django, ReactJs / Angular, and modern tech stacks
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => scrollToSection('projects')}
              className="magnetic-button"
              style={{
                padding: '1rem 2.5rem',
                background: darkMode
                  ? '#e0e0e0f2'
                  : 'linear-gradient(135deg, #9a593386, #b45309a3)',
                border: `2px solid ${darkMode ? '#00f7ff' : '#7c3aed'}`,
                borderRadius: '12px',
                color: '#374151',
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: darkMode
                  ? '0 10px 30px rgba(0, 245, 255, 0.4)'
                  : '0 10px 30px rgba(124, 58, 237, 0.3)',
                letterSpacing: '0.5px'
              }}
            >
              View Projects
            </button>

            <button
              onClick={downloadResume}
              className="magnetic-button"
              style={{
                padding: '1rem 2.5rem',
                background: 'transparent',
                border: `2px solid ${darkMode ? '#00f5ff' : '#7c3aed'}`,
                borderRadius: '12px',
                color: darkMode ? '#00f5ff' : '#7c3aed',
                fontSize: '1rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                letterSpacing: '0.5px'
              }}
            >
              <Download size={20} />
              Resume
            </button>
          </div>
        </div>

        <div className="scroll-indicator" style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: darkMode ? '#00f5ff' : '#dc2626',
          opacity: 0.7
        }}>
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            marginBottom: '3rem',
            color: darkMode ? '#00f5ff' : '#dc2626',
            letterSpacing: '-1px',
            textShadow: darkMode
              ? '0 0 20px rgba(0, 245, 255, 0.5)'
              : '0 2px 10px rgba(220, 38, 38, 0.25)'
          }}>
            About Me
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div className="glassmorphism animate-slide-in-left" style={{
              padding: '3rem',
              borderRadius: '24px',
              animationDelay: '0.2s',
              opacity: 0
            }}>
              <p style={{
                fontSize: '1.15rem',
                lineHeight: 2,
                color: darkMode ? '#c0c0c0' : '#1f2937',
                marginBottom: '1.5rem',
                fontWeight: 400
              }}>
                Results-driven Python Full-Stack Developer with hands-on experience building scalable, responsive, and production-ready web applications using Django, React, Angular, REST APIs, and modern databases.
              </p>

              <p style={{
                fontSize: '1.15rem',
                lineHeight: 2,
                color: darkMode ? '#c0c0c0' : '#1f2937',
                fontWeight: 400
              }}>
                Strong focus on performance, clean architecture, and user-focused design. Experienced in mentoring interns and delivering real-world production features.
              </p>
            </div>

            <div className="glassmorphism animate-slide-in-right" style={{
              padding: '3rem',
              borderRadius: '24px',
              animationDelay: '0.4s',
              opacity: 0
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div style={{
                    color: darkMode ? '#00f5ff' : '#dc2626',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    letterSpacing: '1px'
                  }}>
                    LOCATION
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    color: darkMode ? '#e0e0e0' : '#1f2937'
                  }}>Ernakulam, Kerala</div>
                </div>

                <div>
                  <div style={{
                    color: darkMode ? '#00f5ff' : '#dc2626',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    letterSpacing: '1px'
                  }}>
                    Phone
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    color: darkMode ? '#e0e0e0' : '#1f2937'
                  }}>+91 8848882030</div>
                </div>

                <div>
                  <div style={{
                    color: darkMode ? '#00f5ff' : '#dc2626',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    letterSpacing: '1px'
                  }}>
                    EMAIL
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    color: darkMode ? '#e0e0e0' : '#1f2937'
                  }}>sharonvarghese935@gmail.com</div>
                </div>


                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <a
                    href="https://github.com/sh46on"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button"
                    style={{
                      padding: '0.8rem',
                      background: darkMode ? 'rgba(0, 245, 255, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                      border: `1px solid ${darkMode ? '#00f5ff' : '#dc2626'}`,
                      borderRadius: '12px',
                      color: darkMode ? '#00f5ff' : '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    <Github size={24} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/sharon-varghese-38ba58325/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-button"
                    style={{
                      padding: '0.8rem',
                      background: darkMode ? 'rgba(168, 85, 247, 0.1)' : 'rgba(234, 88, 12, 0.1)',
                      border: `1px solid ${darkMode ? '#a855f7' : '#ea580c'}`,
                      borderRadius: '12px',
                      color: darkMode ? '#a855f7' : '#ea580c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    <Linkedin size={24} />
                  </a>

                  <a
                    href="mailto:sharonvarghese935@gmail.com"
                    className="magnetic-button"
                    style={{
                      padding: '0.8rem',
                      background: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(217, 119, 6, 0.1)',
                      border: `1px solid ${darkMode ? '#22c55e' : '#d97706'}`,
                      borderRadius: '12px',
                      color: darkMode ? '#22c55e' : '#d97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            marginBottom: '3rem',
            color: darkMode ? '#a855f7' : '#ea580c',
            letterSpacing: '-1px',
            textShadow: darkMode
              ? '0 0 20px rgba(168, 85, 247, 0.5)'
              : '0 2px 10px rgba(234, 88, 12, 0.25)'
          }}>
            Skills & Technologies
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {Object.entries(skills).map(([category, items], idx) => (
              <div
                key={category}
                className="glassmorphism hover-lift"
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: `${idx * 0.1}s`,
                  opacity: 0
                }}
              >
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  color: darkMode ? '#00f5ff' : '#ea580c',
                  letterSpacing: '0.5px',
                  textShadow: darkMode ? 'none' : '0 1px 3px rgba(234, 88, 12, 0.2)'
                }}>
                  {category}
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {items.map(skill => (
                    <span
                      key={skill}
                      style={{
                        padding: '0.5rem 1rem',
                        background: darkMode
                          ? 'rgba(0, 245, 255, 0.1)'
                          : 'rgba(255, 255, 255, 0.3)',
                        border: `1px solid ${darkMode ? 'rgba(0, 245, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: darkMode ? '#e0e0e0' : '#1f2937',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = darkMode
                          ? 'rgba(0, 245, 255, 0.2)'
                          : 'rgba(255, 255, 255, 0.5)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = darkMode
                          ? '0 5px 15px rgba(0, 245, 255, 0.3)'
                          : '0 5px 15px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = darkMode
                          ? 'rgba(0, 245, 255, 0.1)'
                          : 'rgba(255, 255, 255, 0.3)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            marginBottom: '3rem',
            color: darkMode ? '#22c55e' : '#d97706',
            letterSpacing: '-1px',
            textShadow: darkMode
              ? '0 0 20px rgba(34, 197, 94, 0.5)'
              : '0 2px 10px rgba(217, 119, 6, 0.25)'
          }}>
            Experience
          </h2>

          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '2px',
              background: darkMode
                ? 'linear-gradient(180deg, #00f5ff, #a855f7, #22c55e)'
                : 'linear-gradient(180deg, #7c3aed, #ec4899, #f59e0b)'
            }} />

            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="glassmorphism"
                style={{
                  marginBottom: '2rem',
                  padding: '2rem',
                  borderRadius: '20px',
                  position: 'relative',
                  marginLeft: '1rem',
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: `${idx * 0.2}s`,
                  opacity: 0
                }}
              >
                <div style={{
                  position: 'absolute',
                  left: '-2.5rem',
                  top: '2rem',
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '50%',
                  background: darkMode ? '#00f5ff' : '#7c3aed',
                  boxShadow: darkMode
                    ? '0 0 20px rgba(0, 245, 255, 0.8)'
                    : '0 0 20px rgba(124, 58, 237, 0.6)'
                }} />

                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    color: darkMode ? '#00f5ff' : '#d97706',
                    textShadow: darkMode ? 'none' : '0 1px 3px rgba(217, 119, 6, 0.2)'
                  }}>
                    {exp.title}
                  </h3>

                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    marginBottom: '0.5rem',
                    color: darkMode ? '#c0c0c0' : '#1f2937'
                  }}>
                    {exp.company}
                  </div>

                  <div style={{
                    fontSize: '0.95rem',
                    color: darkMode ? '#a855f7' : '#be123c',
                    fontWeight: 500,
                    textShadow: darkMode ? 'none' : 'none'
                  }}>
                    {exp.period}
                  </div>
                </div>

                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {exp.points.map((point, i) => (
                    <li key={i} style={{
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      color: darkMode ? '#b0b0b0' : '#1f2937',
                      paddingLeft: '1.5rem',
                      position: 'relative',
                      fontWeight: 400
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.6rem',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: darkMode ? '#22c55e' : '#f59e0b'
                      }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            marginBottom: '3rem',
            color: darkMode ? '#00f5ff' : '#be123c',
            letterSpacing: '-1px',
            textShadow: darkMode
              ? '0 0 20px rgba(0, 245, 255, 0.5)'
              : '0 2px 10px rgba(190, 18, 60, 0.25)'
          }}>
            Featured Projects
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="glassmorphism hover-lift"
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: `${idx * 0.1}s`,
                  opacity: 0
                }}
              >
                <div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    color: darkMode ? '#00f5ff' : '#be123c',
                    textShadow: darkMode ? 'none' : '0 1px 3px rgba(190, 18, 60, 0.2)'
                  }}>
                    {project.title}
                  </h3>

                  <p style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: darkMode ? '#b0b0b0' : '#1f2937',
                    marginBottom: '1.5rem',
                    fontWeight: 400
                  }}>
                    {project.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        style={{
                          padding: '0.4rem 0.8rem',
                          background: darkMode
                            ? 'rgba(168, 85, 247, 0.1)'
                            : 'rgba(255, 255, 255, 0.3)',
                          border: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255, 255, 255, 0.5)'}`,
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: darkMode ? '#a855f7' : '#1f2937'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-button"
                  style={{
                    padding: '0.8rem 1.5rem',
                    background: 'transparent',
                    border: `2px solid ${darkMode ? '#00f5ff' : '#7c3aed'}`,
                    borderRadius: '10px',
                    color: darkMode ? '#00f5ff' : '#7c3aed',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = darkMode
                      ? 'rgba(0, 245, 255, 0.1)'
                      : 'rgba(124, 58, 237, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <Github size={18} />
                  View on GitHub
                </a>
              </div>
            ))}

            {/* View More Card */}
            <div
              className="glassmorphism hover-lift"
              style={{
                padding: '2rem',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '300px',
                background: darkMode
                  ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.05), rgba(168, 85, 247, 0.05))'
                  : 'linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(236, 72, 153, 0.05))',
                animation: 'pulse 3s ease-in-out infinite'
              }}
            >
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: darkMode ? '#00f5ff' : '#be123c',
                textShadow: darkMode
                  ? '0 0 15px rgba(0, 245, 255, 0.6)'
                  : '0 2px 8px rgba(190, 18, 60, 0.3)'
              }}>
                Explore More
              </h3>

              <p style={{
                fontSize: '1rem',
                color: darkMode ? '#b0b0b0' : '#1f2937',
                marginBottom: '2rem',
                fontWeight: 400
              }}>
                Check out my complete portfolio on GitHub
              </p>

              <a
                href="https://github.com/sh46on"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-button"
                style={{
                  padding: '1rem 2rem',
                  background: darkMode
                    ? 'linear-gradient(135deg, #7c3aed, #ec4899)'
                    : 'linear-gradient(135deg, #7c3aed, #ec4899)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  boxShadow: darkMode
                    ? '0 10px 30px rgba(0, 245, 255, 0.3)'
                    : '0 10px 30px rgba(124, 58, 237, 0.2)'
                }}
              >
                <ExternalLink size={20} />
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            marginBottom: '3rem',
            color: darkMode ? '#a855f7' : '#c2410c',
            letterSpacing: '-1px',
            textShadow: darkMode
              ? '0 0 20px rgba(168, 85, 247, 0.5)'
              : '0 2px 10px rgba(194, 65, 12, 0.25)'
          }}>
            Education
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="glassmorphism hover-lift"
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: `${idx * 0.2}s`,
                  opacity: 0
                }}
              >
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: darkMode ? '#00f5ff' : '#c2410c',
                  textShadow: darkMode ? 'none' : '0 1px 3px rgba(194, 65, 12, 0.2)'
                }}>
                  {edu.degree}
                </h3>

                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                  color: darkMode ? '#c0c0c0' : '#1f2937'
                }}>
                  {edu.field}
                </div>

                {edu.institution && (
                  <div style={{
                    fontSize: '0.95rem',
                    color: darkMode ? '#b0b0b0' : '#1f2937',
                    marginBottom: '0.5rem',
                    fontWeight: 400
                  }}>
                    {edu.institution}
                  </div>
                )}

                <div style={{
                  fontSize: '1rem',
                  color: darkMode ? '#22c55e' : '#d97706',
                  fontWeight: 600,
                  marginTop: '1rem',
                  textShadow: darkMode ? 'none' : 'none'
                }}>
                  {edu.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            marginBottom: '2rem',
            color: darkMode ? '#00f5ff' : '#b91c1c',
            letterSpacing: '-1px',
            textShadow: darkMode
              ? '0 0 20px rgba(0, 245, 255, 0.5)'
              : '0 2px 10px rgba(185, 28, 28, 0.25)'
          }}>
            Let's Work Together
          </h2>

          <p style={{
            fontSize: '1.2rem',
            lineHeight: 1.8,
            color: darkMode ? '#b0b0b0' : '#374151',
            marginBottom: '3rem',
            fontWeight: 400,
            textShadow: darkMode ? 'none' : 'none'
          }}>
            Open to opportunities in Software Engineering, Full-Stack Development, and innovative product teams.
          </p>

          <div className="glassmorphism" style={{
            padding: '3rem',
            borderRadius: '24px',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div>
                <div style={{
                  color: darkMode ? '#00f5ff' : '#b91c1c',
                  fontSize: '0.9rem',
                  marginBottom: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textShadow: darkMode ? 'none' : 'none'
                }}>
                  EMAIL
                </div>
                <a
                  href="mailto:sharonvarghese935@gmail.com"
                  style={{
                    fontSize: '1.1rem',
                    color: darkMode ? '#e0e0e0' : '#1f2937',
                    textDecoration: 'none',
                    fontWeight: 400
                  }}
                >
                  sharonvarghese935@gmail.com
                </a>
              </div>

              <div>
                <div style={{
                  color: darkMode ? '#00f5ff' : '#b91c1c',
                  fontSize: '0.9rem',
                  marginBottom: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textShadow: darkMode ? 'none' : 'none'
                }}>
                  LOCATION
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  color: darkMode ? '#e0e0e0' : '#1f2937'
                }}>
                  Ernakulam, Kerala
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              marginTop: '2rem'
            }}>
              <a
                href="https://github.com/sh46on"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-button"
                style={{
                  padding: '1rem',
                  background: darkMode ? 'rgba(0, 245, 255, 0.1)' : 'rgba(185, 28, 28, 0.1)',
                  border: `2px solid ${darkMode ? '#00f5ff' : '#b91c1c'}`,
                  borderRadius: '12px',
                  color: darkMode ? '#00f5ff' : '#b91c1c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = darkMode
                    ? 'rgba(0, 245, 255, 0.2)'
                    : 'rgba(185, 28, 28, 0.2)';
                  e.target.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = darkMode
                    ? 'rgba(0, 245, 255, 0.1)'
                    : 'rgba(185, 28, 28, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <Github size={28} />
              </a>

              <a
                href="https://www.linkedin.com/in/sharon-varghese-38ba58325/"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-button"
                style={{
                  padding: '1rem',
                  background: darkMode ? 'rgba(168, 85, 247, 0.1)' : 'rgba(234, 88, 12, 0.1)',
                  border: `2px solid ${darkMode ? '#a855f7' : '#ea580c'}`,
                  borderRadius: '12px',
                  color: darkMode ? '#a855f7' : '#ea580c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = darkMode
                    ? 'rgba(168, 85, 247, 0.2)'
                    : 'rgba(234, 88, 12, 0.2)';
                  e.target.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = darkMode
                    ? 'rgba(168, 85, 247, 0.1)'
                    : 'rgba(234, 88, 12, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <Linkedin size={28} />
              </a>

              <a
                href="mailto:sharonvarghese935@gmail.com"
                className="magnetic-button"
                style={{
                  padding: '1rem',
                  background: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(217, 119, 6, 0.1)',
                  border: `2px solid ${darkMode ? '#22c55e' : '#d97706'}`,
                  borderRadius: '12px',
                  color: darkMode ? '#22c55e' : '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = darkMode
                    ? 'rgba(34, 197, 94, 0.2)'
                    : 'rgba(217, 119, 6, 0.2)';
                  e.target.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = darkMode
                    ? 'rgba(34, 197, 94, 0.1)'
                    : 'rgba(217, 119, 6, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <Mail size={28} />
              </a>
            </div>
          </div>

          <div style={{
            padding: '2rem',
            borderTop: `1px solid ${darkMode ? 'rgba(0, 245, 255, 0.1)' : 'rgba(220, 38, 38, 0.2)'}`,
            color: darkMode ? '#808080' : '#6b7280',
            fontSize: '0.95rem',
            fontWeight: 400,
            textShadow: darkMode ? 'none' : 'none'
          }}>
            © 2026 Sharon K Varghese. Crafted with precision and passion.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;