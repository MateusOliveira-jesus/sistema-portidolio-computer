const { createApp } = Vue;

createApp({
  data() {
    return {
        backgrounds: [
      {
        id: 1,
        name: "Código",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80",
        opacity: 30
      },
      {
        id: 2,
        name: "Moderno",
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
        opacity: 40
      },
      {
        id: 3,
        name: "Abstrato",
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&q=80",
        opacity: 25
      },
      {
        id: 4,
        name: "Escritório",
        url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=80",
        opacity: 35
      },
      {
        id: 5,
        name: "Tecnologia",
        url: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1920&q=80",
        opacity: 30
      },
      {
        id: 6,
        name: "Futurista",
        url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
        opacity: 35
      }
    ],
    currentBackground: 0,
    backgroundInterval: null,
    backgroundAutoChange: true, 
      isDarkMode: true,
      currentTime: "00:00",
      currentDate: "01/01/2025",
      windows: [],
      nextWindowId: 1,
      clockInterval: null,
      contextMenu: {
        visible: false,
        x: 0,
        y: 0,
      },
      certifications: [
        {
          id: 1,
          title: "Laravel",
          platform: "Udemy",
          date: "Emitido em jun 2024",
          bgColor: "bg-purple-600/20",
          iconColor: "text-purple-500",
          dateColor: "text-cyan-400",
        },
        {
          id: 2,
          title: "API REST com PHP",
          platform: "Udemy",
          date: "Emitido em abr 2024",
          bgColor: "bg-blue-600/20",
          iconColor: "text-blue-500",
          dateColor: "text-cyan-400",
        },
        {
          id: 3,
          title: "HTML5",
          platform: "Alura",
          date: "Emitido em nov 2023",
          bgColor: "bg-orange-600/20",
          iconColor: "text-orange-500",
          dateColor: "text-cyan-400",
        },
        {
          id: 4,
          title: "Git Flow",
          platform: "Alura",
          date: "Emitido em nov 2023",
          bgColor: "bg-red-600/20",
          iconColor: "text-red-500",
          dateColor: "text-cyan-400",
        },
        {
          id: 5,
          title: "PHP do Básico ao Avançado",
          platform: "Alura",
          date: "Emitido em nov 2023",
          bgColor: "bg-purple-600/20",
          iconColor: "text-purple-500",
          dateColor: "text-cyan-400",
        },
        {
          id: 6,
          title: "HTML5 e CSS3 - Módulo 1",
          platform: "Curso em Vídeo",
          date: "Emitido em out 2023",
          bgColor: "bg-green-600/20",
          iconColor: "text-green-500",
          dateColor: "text-cyan-400",
          code: "CDC2F-C9E9-4",
        },
        {
          id: 7,
          title: "HTML5 e CSS3 - Módulo 2",
          platform: "Curso em Vídeo",
          date: "Emitido em out 2023",
          bgColor: "bg-green-600/20",
          iconColor: "text-green-500",
          dateColor: "text-cyan-400",
          code: "CDC2F-E776-6",
        },
        {
          id: 8,
          title: "Curso PHP",
          platform: "Curso em Vídeo",
          date: "Emitido em 2023",
          bgColor: "bg-purple-600/20",
          iconColor: "text-purple-500",
          dateColor: "text-cyan-400",
        },
      ],
      mobileMenuOpen: false,
      isMobile: false,
      touchStartTime: 0,
      devSkills: [
        { name: "PHP", level: 90 },
        { name: "Laravel", level: 85 },
        { name: "Vue.js", level: 75 },
        { name: "HTML5/CSS3", level: 88 },
        { name: "APIs RESTful", level: 82 },
      ],
      otherSkills: [
        { name: "MySQL", level: 85 },
        { name: "Oracle", level: 80 },
        { name: "Docker", level: 70 },
        { name: "Git/GitLab", level: 80 },
        { name: "Filament", level: 75 },
        { name: "Scrum/Kanban", level: 78 },
      ],
      apps: {
        linkedin: {
          title: "LinkedIn",
          icon: "fab fa-linkedin",
          bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
        },
        experience: {
          title: "Experiência",
          icon: "fas fa-briefcase",
          bgColor: "bg-gradient-to-br from-green-500 to-green-700",
        },
        skills: {
          title: "Habilidades",
          icon: "fas fa-code",
          bgColor: "bg-gradient-to-br from-purple-500 to-purple-700",
        },
        contact: {
          title: "Contato",
          icon: "fas fa-envelope",
          bgColor: "bg-gradient-to-br from-yellow-500 to-yellow-700",
        },
        about: {
          title: "Minha História",
          icon: "fas fa-heart",
          bgColor: "bg-gradient-to-br from-pink-500 to-pink-700",
        },
        certifications: {
          title: "Certificados",
          icon: "fas fa-certificate",
          bgColor: "bg-gradient-to-br from-red-500 to-red-700",
        },
      },
    };
  },

  mounted() {
    this.updateClock();
    this.clockInterval = setInterval(this.updateClock, 1000);

    if (window.innerWidth > 768) {
      this.openApp("linkedin");
    }

    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
    this.loadTheme();
     this.startBackgroundRotation();

    this.preloadBackgroundImages();
  },

  beforeUnmount() {
    if (this.clockInterval) clearInterval(this.clockInterval);
    window.removeEventListener("resize", this.checkMobile);
      this.stopBackgroundRotation();
  },

  methods: {
    startBackgroundRotation() {
    if (this.backgroundInterval) {
      clearInterval(this.backgroundInterval);
    }
    
    this.backgroundInterval = setInterval(() => {
      this.currentBackground = (this.currentBackground + 1) % this.backgrounds.length;
    }, 10000);
  },
  
  stopBackgroundRotation() {
    if (this.backgroundInterval) {
      clearInterval(this.backgroundInterval);
      this.backgroundInterval = null;
    }
  },
  
  toggleBackgroundRotation() {
    this.backgroundAutoChange = !this.backgroundAutoChange;
    if (this.backgroundAutoChange) {
      this.startBackgroundRotation();
    } else {
      this.stopBackgroundRotation();
    }
  },
  
  changeBackground(index) {
    this.currentBackground = index;
  },
    updateClock() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      this.currentDate = now.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },

    openApp(appId) {
      const app = this.apps[appId];
      if (!app) return;

      const existing = this.windows.find((w) => w.appId === appId);
      if (existing) {
        this.focusWindow(existing.id);
        existing.minimized = false;
        this.mobileMenuOpen = false;
        return;
      }

      // CORREÇÃO: Usar 'winObj' em vez de 'window' para evitar conflito
      const winObj = {
        id: this.nextWindowId++,
        appId: appId,
        title: app.title,
        icon: app.icon,
        iconBgColor: app.bgColor,
        x: this.isMobile ? 10 : 100 + this.windows.length * 30,
        y: this.isMobile ? 10 : 100 + this.windows.length * 30,
        width: 1000,
        height: 700,
        zIndex: 99999 + this.windows.length,
        minimized: false,
        maximized: false,
      };

      this.windows.push(winObj);
      this.windows.forEach((w, index) => {
        w.zIndex = 100 + index;
      });
      this.windows.sort((a, b) => a.zIndex - b.zIndex);

      this.closeContextMenu();
      this.mobileMenuOpen = false;
    },

    focusWindow(windowId) {
      // CORREÇÃO: Usar 'win' em vez de 'window'
      const win = this.windows.find((w) => w.id === windowId);
      if (!win) return;

      win.minimized = false;
      const maxZ = Math.max(...this.windows.map((w) => w.zIndex));
      win.zIndex = maxZ + 1;
      this.windows.sort((a, b) => a.zIndex - b.zIndex);
    },

    minimizeWindow(windowId) {
      // CORREÇÃO: Usar 'win' em vez de 'window'
      const win = this.windows.find((w) => w.id === windowId);
      if (win) win.minimized = !win.minimized;
    },

    maximizeWindow(windowId) {
      // CORREÇÃO: Usar 'win' em vez de 'window' e salvar dimensões da tela
      const win = this.windows.find((w) => w.id === windowId);
      if (win) {
        win.maximized = !win.maximized;
        if (win.maximized) {
          win.x = 0;
          win.y = 0;
          win.width = window.innerWidth; // window global
          win.height = window.innerHeight - (this.isMobile ? 120 : 80); // window global
        } else {
          win.width = this.isMobile ? window.innerWidth - 20 : 1000; // window global
          win.height = this.isMobile ? window.innerHeight - 150 : 700; // window global
        }
      }
    },

    closeWindow(windowId) {
      this.windows = this.windows.filter((w) => w.id !== windowId);
    },

    toggleWindow(windowId) {
      // CORREÇÃO: Usar 'win' em vez de 'window'
      const win = this.windows.find((w) => w.id === windowId);
      if (win) {
        win.minimized = !win.minimized;
        if (!win.minimized) this.focusWindow(windowId);
      }
    },

    startDrag(win, event) {
      // Parâmetro já é 'win'
      if (this.isMobile) return;

      event.preventDefault();
      const startX = event.clientX;
      const startY = event.clientY;
      const startLeft = win.x;
      const startTop = win.y;

      this.focusWindow(win.id);

      const onMove = (e) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        win.x = startLeft + dx;
        win.y = startTop + dy;
      };

      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },

    startTouchDrag(win, event) {
      // Parâmetro já é 'win'
      if (!this.isMobile) return;

      event.preventDefault();
      const touch = event.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      const startLeft = win.x;
      const startTop = win.y;

      this.focusWindow(win.id);

      const onMove = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        win.x = startLeft + dx;
        win.y = startTop + dy;
      };

      const onEnd = () => {
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onEnd);
      };

      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", onEnd);
    },

    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle("dark", this.isDarkMode);
      document.documentElement.classList.toggle("light", !this.isDarkMode);
      localStorage.setItem(
        "portfolio-theme",
        this.isDarkMode ? "dark" : "light"
      );
    },

    loadTheme() {
      const savedTheme = localStorage.getItem("portfolio-theme");
      if (savedTheme) {
        this.isDarkMode = savedTheme === "dark";
        document.documentElement.classList.toggle("dark", this.isDarkMode);
        document.documentElement.classList.toggle("light", !this.isDarkMode);
      }
    },

    showContextMenu(event) {
      if (this.isMobile) return;

      this.contextMenu = {
        visible: true,
        x: event.clientX,
        y: event.clientY,
      };
    },

    closeContextMenu() {
      this.contextMenu.visible = false;
    },

    refreshDesktop() {
      this.closeContextMenu();
      const activeWindow = this.windows.find((w) => !w.minimized);
      if (activeWindow) {
        this.focusWindow(activeWindow.id);
      }
    },

    openAllApps() {
      Object.keys(this.apps).forEach((appId) => {
        if (!this.windows.find((w) => w.appId === appId)) {
          this.openApp(appId);
        }
      });
      this.closeContextMenu();
      this.mobileMenuOpen = false;
    },

    checkMobile() {
      const screenWidth = window.innerWidth; // Salva em variável
      const screenHeight = window.innerHeight;

      //   this.isMobile = screenWidth <= 768;

      if (this.isMobile) {
        this.windows.forEach((win) => {
          // Usar 'win' para clareza
          if (!win.maximized) {
            win.width = screenWidth - 20; // Usa variável
            win.height = screenHeight - 150; // Usa variável
          }
        });
      }
    },

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
  },
}).mount("#app");
