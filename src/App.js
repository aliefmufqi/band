import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Instagram, 
  MessageCircle, 
  Mail, 
  ChevronRight, 
  Music, 
  Headphones,
  ArrowDown
} from 'lucide-react';

// --- CUSTOM HOOK FOR SCROLL REVEAL ANIMATION ---
const useScrollReveal = (options = { threshold: 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};

// --- REVEAL COMPONENT ---
const Reveal = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const [ref, isVisible] = useScrollReveal();
  
  const baseClasses = "transition-all duration-1000 ease-out";
  let transformClass = "";
  
  if (!isVisible) {
    if (direction === 'up') transformClass = "translate-y-20 opacity-0";
    if (direction === 'down') transformClass = "-translate-y-20 opacity-0";
    if (direction === 'left') transformClass = "translate-x-20 opacity-0";
    if (direction === 'right') transformClass = "-translate-x-20 opacity-0";
    if (direction === 'scale') transformClass = "scale-90 opacity-0";
  } else {
    transformClass = "translate-y-0 translate-x-0 scale-100 opacity-100";
  }

  return (
    <div ref={ref} className={`${baseClasses} ${transformClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// --- FLOATING PARTICLES COMPONENT ---
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-purple-500/20 blur-xl animate-float"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}
        />
      ))}
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Simulasi loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // --- DATA ---
  const members = [
    { name: "KHIBRAN ABDI DZILJALAN", role: "Vocalist", img: "/images/Embe.jpeg" },
    { name: "DICKY ALAMSYAH", role: "Lead Guitar", img: "/images/balmon.jpeg" },
    { name: "HILMI FAHRI RAMDANI", role: "Rhythm Guitar", img: "/images/hilmi.jpeg" },
    { name: "DHIYA FARSHAD RAYA", role: "Bassist", img: "/images/dhiya.jpeg" },
    { name: "FAIZ NAJMI ARKAN", role: "Keyboardist", img: "/images/faiz.jpeg" },
    { name: "RINENGGO IMAN SANTOSO", role: "DRUMMER", img: "/images/rinenggo.jpeg" },
  ];

  const latestSingle = {
    title: "Say It Till I Believe",
    date: "",
    description: "Dengarkan single terbaru kami. Sebuah perjalanan sonik melintasi dimensi dengan distorsi berat dan synth futuristik.",
    cover: "/images/Cover.jpg",
    // CARA MENGGANTI LAGU: Ganti URL di bawah ini dengan file lagu Anda (misal: "./audio/lagu-baru.mp3")
    audioSrc: "/audio/lagu.mp3"
  };

  // --- STYLES ---
  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700&family=Syncopate:wght@400;700&display=swap');

    :root {
      --neon-purple: #a855f7;
      --neon-blue: #3b82f6;
    }

    body {
      background-color: #030303;
      color: white;
      font-family: 'Space Grotesk', sans-serif;
      overflow-x: hidden;
    }

    .font-syncopate {
      font-family: 'Syncopate', sans-serif;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #000;
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--neon-purple);
      box-shadow: 0 0 10px var(--neon-purple);
    }

    /* Animations */
    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-30px) scale(1.05); }
    }
    .animate-float {
      animation: float 15s ease-in-out infinite;
    }

    @keyframes waveform {
      0% { height: 5px; }
      50% { height: 100%; }
      100% { height: 5px; }
    }
    .waveform-bar {
      animation: waveform 1s ease-in-out infinite;
    }

    /* Custom Audio Player Styling for Dark Mode */
    audio {
      filter: invert(90%) hue-rotate(180deg);
      opacity: 0.8;
      transition: opacity 0.3s;
    }
    audio:hover {
      opacity: 1;
    }

    @keyframes pulse-glow {
      0%, 100% { text-shadow: 0 0 10px rgba(168,85,247,0.5), 0 0 20px rgba(168,85,247,0.3); }
      50% { text-shadow: 0 0 20px rgba(168,85,247,0.8), 0 0 40px rgba(168,85,247,0.5); }
    }
    .animate-pulse-glow {
      animation: pulse-glow 2s infinite;
    }
  `;

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
        <style>{customStyles}</style>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-pulse"></div>
        <Music className="w-16 h-16 text-purple-500 animate-bounce mb-4 drop-shadow-[0_0_15px_rgba(168,85,247,1)]" />
        <h1 className="text-4xl md:text-6xl font-syncopate font-bold tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse-glow">
          JACK<span className="text-white">ن</span> SON
        </h1>
        <div className="w-48 h-1 bg-gray-800 mt-8 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-[pulse_1s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#030303] min-h-screen selection:bg-purple-500/30">
      <style>{customStyles}</style>
      
      {/* Background Elements */}
      <Particles />
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black pointer-events-none z-0"></div>

      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-10">
        {/* Parallax Background - Tampilan foto ditimpa tulisan */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540039155732-6804d603cc10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
        ></div>
        
        {/* Gradient Overlay - Menggelapkan foto agar tulisan menonjol */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#030303]"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <Reveal direction="down">
            <p className="text-purple-400 font-syncopate tracking-[0.5em] text-sm md:text-base mb-4 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
              • ELECTRONIC ROCK
            </p>
          </Reveal>
          
          <Reveal delay={200}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-syncopate font-bold mb-6 tracking-tighter">
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">JACK</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]">ن</span>SON
            </h1>
          </Reveal>
          
          <Reveal direction="up" delay={400}>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Membawa Anda ke dimensi lain melalui perpaduan distorsi rock modern dan atmosfer sintesis masa depan.
            </p>
          </Reveal>

          <Reveal direction="up" delay={600} className="flex flex-col sm:flex-row gap-6">
            <a href="#about" className="group relative px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-syncopate text-sm font-bold tracking-wider rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative flex items-center gap-2">
                EXPLORE BAND <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a href="#music" className="group px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 hover:border-blue-500 text-white font-syncopate text-sm font-bold tracking-wider rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              <span className="flex items-center gap-2">
                <Headphones size={18} className="group-hover:text-blue-400 transition-colors" /> LISTEN MUSIC
              </span>
            </a>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <ArrowDown size={24} className="text-purple-400" />
        </div>
      </section>

      {/* --- 2. ABOUT THE BAND --- */}
      <section id="about" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Left */}
          <Reveal direction="right" className="w-full lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="/images/band.jpeg"
                alt="Foto Grup Band" 
                className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover w-full h-[500px]"
              />
              {/* Glassmorphism Badge */}
              
            </div>
          </Reveal>

          {/* Text Right */}
          <Reveal direction="left" className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-syncopate font-bold">
              INTRO<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">DUCTION</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
            Jacknson adalah band bergenre alternative rock dengan sentuhan emo yang menghadirkan warna musik penuh emosi, energi, dan kejujuran dalam setiap karya. <strong className="text-white">JACK ن SON </strong>Terbentuk dari keresahan dan cerita nyata tentang kehidupan, cinta, kehilangan, dan perjalanan pendewasaan.
            </p>
            <p className="text-gray-400 leading-relaxed">
            JACK ن SON  membawa pengalaman yang relate bagi para pendengarnya.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-500/50 transition-colors group">
                <h4 className="font-syncopate text-purple-400 text-sm mb-1 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">GENRE</h4>
                <p className="text-lg font-bold">Rock</p>
              </div>
              
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- 3. BAND MEMBERS --- */}
      <section className="relative py-24 px-6 md:px-12 bg-black/50 z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal direction="down" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-syncopate font-bold mb-4">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">SQUAD</span>
            </h2>
            <p className="text-gray-400">Jiwa dan mesin di balik suara JACK ن SON</p>
          </Reveal>

          {/* Grid Layout for 5 members: 3 on top, 2 on bottom centered */}
          <div className="flex flex-wrap justify-center gap-8">
            {members.map((member, index) => (
              <Reveal 
                key={index} 
                direction="scale" 
                delay={index * 150}
                className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] max-w-[320px]"
              >
                <div className="group relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:-translate-y-2">
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity"></div>
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-purple-400 font-syncopate text-xs tracking-[0.2em] mb-2">{member.role}</p>
                      <h3 className="text-2xl font-bold tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-white to-purple-200 transition-all">
                        {member.name}
                      </h3>
                      
                      {/* Neon line decoration */}
                      <div className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 mt-4 group-hover:w-full transition-all duration-700 delay-100"></div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. MUSIC SECTION (LATEST RELEASE) --- */}
      <section id="music" className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <Reveal className="mb-16">
          <h2 className="text-4xl md:text-5xl font-syncopate font-bold mb-4">
            LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">RELEASE</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Cover Art */}
          <Reveal direction="right" className="w-full lg:w-1/2">
            <div className="relative group w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-blue-500/40 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src={latestSingle.cover} 
                alt="Latest Single Cover" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </Reveal>

          {/* Details & Audio Player */}
          <Reveal direction="left" className="w-full lg:w-1/2 flex flex-col justify-center">
            <p className="text-purple-400 font-syncopate tracking-[0.2em] mb-4">{latestSingle.date}</p>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">{latestSingle.title}</h3>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
              {latestSingle.description}
            </p>

            {/* REAL AUDIO PLAYER */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <Music size={24} className="text-purple-500" />
                <span className="font-semibold text-lg">Now Playing</span>
              </div>
              
              {/* CARA MEMASUKAN LAGU: File audioSrc sudah diatur di bagian DATA di atas */}
              <audio 
                controls 
                className="w-full h-12 rounded-lg outline-none"
                controlsList="nodownload"
              >
                <source src={latestSingle.audioSrc} type="audio/mpeg" />
                Browser Anda tidak mendukung elemen audio.
              </audio>
            </div>
          </Reveal>
        </div>
      </section>

      

      {/* --- 6. BOOKING SECTION --- */}
      <section id="booking" className="relative py-32 px-6 overflow-hidden z-10">
        {/* Abstract Glowing Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-20 rounded-[3rem] shadow-2xl">
          <Reveal direction="down">
            <h2 className="text-4xl md:text-6xl font-syncopate font-bold mb-6">
              BOOK OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse-glow">BAND</span>
            </h2>
            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              Bawa pengalaman musik elektronik rock tak terlupakan ke acara Anda. Hubungi manajemen kami untuk booking, press, atau kolaborasi.
            </p>
          </Reveal>

          <Reveal direction="up" className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://wa.me/6282116935883" className="group relative px-8 py-5 bg-black border border-green-500 hover:bg-green-500/10 text-white font-syncopate text-sm font-bold tracking-wider rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              <span className="relative z-10 flex items-center justify-center gap-3">
                <MessageCircle size={20} className="text-green-400 group-hover:text-green-300" /> WHATSAPP BOOKING
              </span>
            </a>
            
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Jacknsonn@gmail.com"  className="group relative px-8 py-5 bg-purple-600 hover:bg-purple-500 text-white font-syncopate text-sm font-bold tracking-wider rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]">
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Mail size={20} /> EMAIL BOOKING
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* --- 7. FOOTER --- */}
      <footer className="relative bg-[#020202] pt-16 pb-8 border-t border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-3xl font-syncopate font-bold tracking-[0.3em] mb-8 text-white">
            JACK<span className="text-purple-500">ن SON</span>
          </h2>
          
          <div className="flex gap-6 mb-12">
            <a href="https://instagram.com/jacknson_"className="p-3 bg-white/5 rounded-full hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              <Instagram size={24} />
            </a>
            <a href="https://wa.me/6282116935883" className="p-3 bg-white/5 rounded-full hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]">
              <MessageCircle size={24} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Jacknsonn@gmail.com" className="p-3 bg-white/5 rounded-full hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <Mail size={24} />
            </a>
          </div>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
          
          <p className="text-gray-600 text-sm font-syncopate tracking-widest text-center">
            &copy; {new Date().getFullYear()} JACK ن SON. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}