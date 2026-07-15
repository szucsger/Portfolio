//Change theme based on user preference and toggle state

const root = document.documentElement;
const themeToggleButton = document.getElementById("theme-toggle-btn");
const storageKey = "portfoliotheme";

function getInitialTheme() {
  const storedTheme = localStorage.getItem(storageKey);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }
  return "light";
}

function syncToggle(theme) {
  themeToggleButton.textContent = theme === "dark" ? "Light" : "Dark";
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem(storageKey, theme);
  syncToggle(theme);
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

themeToggleButton.addEventListener("click", () => {
  const newTheme =
    root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(newTheme);
});

//Change language based on user preference and toggle state
const langToggleButton = document.getElementById("lang-switch-btn");
const langStorageKey = "portfoliolanguage";

const translations = {
  brand: {
    en: "Frontend Dev",
    hu: "Frontend Fejlesztő",
  },
  "nav.about": {
    en: "About",
    hu: "Rólam",
  },
  "nav.tech": {
    en: "Tech Stack",
    hu: "Technológiák",
  },
  "nav.projects": {
    en: "Mini Projects",
    hu: "Mini Projektek",
  },
  "nav.contact": {
    en: "Contact",
    hu: "Kapcsolat",
  },
  "hero.lead": {
    en: "Designing and developing modern, user-friendly web experiences with the latest technologies.",
    hu: "Modern, felhasználóbarát webes élmények tervezése és fejlesztése a legújabb technológiákkal.",
  },
  "hero.ctaProjects": {
    en: "View Projects",
    hu: "Projektjeim",
  },
  "hero.ctaContact": {
    en: "Contact Me",
    hu: "Írj nekem",
  },
  "hero.ctaResume": {
    en: "Download Resume",
    hu: "Önéletrajz letöltése",
  },
  "hero.stat1.value": {
    en: "Junior",
    hu: "Junior",
  },
  "hero.stat1.label": {
    en: "Frontend developer",
    hu: "Frontend fejlesztő",
  },
  "hero.stat2.label": {
    en: "Developer journey started",
    hu: "A fejlesztői utam kezdete",
  },
  "hero.stat3.label": {
    en: "Practice projects",
    hu: "Gyakorló projektek",
  },
  "hero.status": {
    en: "Active Status",
    hu: "Aktív státusz",
  },
  "about.title": {
    en: "Growing as a Frontend Developer While Expanding Toward Full‑Stack Skills",
    hu: "Fejlődés frontend fejlesztőként, fullstack irányba bővülő tudással",
  },
  "about.intro": {
    en: "I started my journey in frontend development because I wanted to understand how modern web interfaces work in real projects. Since completing my training, I’ve been actively expanding my skills: I’m now learning full‑stack development and building small, practical applications where I can strengthen both my frontend knowledge and the backend fundamentals like server‑side logic and data handling. These hands‑on projects help me understand the full web development process and create modern, well‑structured applications with growing confidence.",
    hu: "Frontend fejlesztőként indultam, mert érdekelt, hogyan működnek a modern webes felületek valódi projektekben. A képzésem óta folyamatosan bővítem a tudásomat: jelenleg fullstack fejlesztést tanulok, és olyan kisebb, gyakorlati alkalmazásokat építek, ahol a frontend mellett a backend alapjait, a szerveroldali logikát és az adatkezelést is fejlesztem. Ezek a projektek segítenek jobban átlátni a webfejlesztés teljes folyamatát, és egyre magabiztosabban készíteni modern, jól felépített alkalmazásokat.",
  },
  "about.card1.title": {
    en: "Learning-First Approach",
    hu: "Tanulásközpontú szemlélet",
  },
  "about.card1.desc": {
    en: "I learn by building real projects and experimenting with new concepts. Every small project helps me understand the fundamentals better and grow step by step.",
    hu: "Valós projektek építésével és új ötletek kipróbálásával tanulok. Minden kisebb projekt segít jobban megérteni az alapokat és lépésről lépésre fejlődni.",
  },
  "about.card2.title": {
    en: "Continuous Improvement",
    hu: "Folyamatos fejlődés",
  },
  "about.card2.desc": {
    en: "I am committed to continuously improving my skills and knowledge. I regularly seek feedback, reflect on my work, and explore new technologies to stay up-to-date with industry trends.",
    hu: "Elkötelezett vagyok a készségeim és tudásom folyamatos fejlesztése mellett. Rendszeresen kérek visszajelzést, átgondolom a munkámat, és új technológiákat fedezek fel, hogy naprakész maradjak.",
  },
  "about.card3.title": {
    en: "Clean and Understandable Code",
    hu: "Tiszta és érthető kód",
  },
  "about.card3.desc": {
    en: "I prioritize writing clean, readable, and maintainable code. I believe that good code is not just about functionality but also about clarity and ease of understanding for other developers.",
    hu: "Előnyben részesítem a tiszta, jól olvasható és karbantartható kódot. Hiszem, hogy a jó kód nemcsak működik, hanem átlátható és más fejlesztők számára is könnyen érthető.",
  },
  "about.card4.title": {
    en: "Component-Based Thinking",
    hu: "Komponensalapú gondolkodás",
  },
  "about.card4.desc": {
    en: "I approach frontend development with a component-based mindset, breaking down interfaces into reusable, modular components. This approach enhances maintainability, scalability, and collaboration within development teams.",
    hu: "A frontend fejlesztéshez komponensalapú szemlélettel közelítek: a felületeket újrahasználható, moduláris elemekre bontom. Ez javítja a karbantarthatóságot, a skálázhatóságot és a csapatmunkát.",
  },
  "about.closing": {
    en: "My workflow is centered around clarity, usability, and continuous improvement. I believe that consistent practice and real-world experimentation are the keys to becoming a strong developer.",
    hu: "A munkafolyamatom középpontjában a letisztultság, a használhatóság és a folyamatos fejlődés áll. Hiszem, hogy a következetes gyakorlás és a valós kísérletezés vezet egy erős fejlesztővé.",
  },
  "tech.title": {
    en: "Tech Stack",
    hu: "Technológiai stack",
  },
  "tech.intro": {
    en: "The core technologies I rely on throughout my developer journey.",
    hu: "Azok a fő technológiák, amelyekre a fejlesztői utamon támaszkodom.",
  },
  "tech.card.html.title": {
    en: "HTML",
    hu: "HTML",
  },
  "tech.card.html.tag": {
    en: "Markup",
    hu: "Jelölőnyelv",
  },
  "tech.card.css.title": {
    en: "CSS",
    hu: "CSS",
  },
  "tech.card.css.tag": {
    en: "Styling",
    hu: "Stílus",
  },
  "tech.card.js.title": {
    en: "JavaScript",
    hu: "JavaScript",
  },
  "tech.card.js.tag": {
    en: "Language",
    hu: "Nyelv",
  },
  "tech.card.ts.title": {
    en: "TypeScript",
    hu: "TypeScript",
  },
  "tech.card.ts.tag": {
    en: "Language",
    hu: "Nyelv",
  },
  "tech.card.angular.title": {
    en: "Angular",
    hu: "Angular",
  },
  "tech.card.angular.tag": {
    en: "Framework",
    hu: "Keret",
  },
  "tech.card.php.title": {
    en: "PHP",
    hu: "PHP",
  },
  "tech.card.php.tag": {
    en: "Backend",
    hu: "Backend",
  },
  "tech.card.mysql.title": {
    en: "MySQL",
    hu: "MySQL",
  },
  "tech.card.mysql.tag": {
    en: "Database",
    hu: "Adatbázis",
  },
  "tech.card.csharp.title": {
    en: "C#",
    hu: "C#",
  },
  "tech.card.csharp.tag": {
    en: "Language",
    hu: "Nyelv",
  },
  "tech.card.github.title": {
    en: "GitHub",
    hu: "GitHub",
  },
  "tech.card.github.tag": {
    en: "Tools",
    hu: "Eszközök",
  },
  "tech.card.responsive.title": {
    en: "Responsive Design",
    hu: "Reszponzív design",
  },
  "tech.card.responsive.tag": {
    en: "UI/UX",
    hu: "UI/UX",
  },
  "projects.title": {
    en: "Learning Projects",
    hu: "Tanulási projektek",
  },
  "projects.intro": {
    en: "A selection of my latest works that showcase my skills and creativity",
    hu: "Válogatás a legfrissebb munkáimból, amelyek bemutatják a készségeimet és a kreativitásomat",
  },
  "projects.card1.title": {
    en: "JavaScript Practice Project - UFO Catcher Game",
    hu: "JavaScript gyakorló projekt - UFO Catcher játék",
  },
  "projects.card1.desc": {
    en: "A simple retro-style JavaScript game built to practice DOM manipulation, animations, collision detection, and game loop logic. This project helped me understand how interactive browser applications work.",
    hu: "Egy egyszerű, retro stílusú JavaScript játék, amelyet DOM-manipuláció, animációk, ütközésvizsgálat és játékkör-logika gyakorlására készítettem. A projekt segített megérteni, hogyan működnek az interaktív böngészős alkalmazások.",
  },
  "projects.card2.title": {
    en: "TypeScript Practice Project - Statistics Dashboard",
    hu: "TypeScript gyakorló projekt - Statisztikai dashboard",
  },
  "projects.card2.desc": {
    en: "A TypeScript-based dashboard that loads local JSON data, calculates basic statistics, and displays them using simple charts. This project helped me learn TypeScript interfaces, modules, and data handling.",
    hu: "Egy TypeScript-alapú dashboard, amely helyi JSON-adatokat tölt be, alapstatisztikákat számol, és egyszerű diagramokon jeleníti meg azokat. A projekt segített megtanulni a TypeScript interfészek, modulok és adatkezelés alapjait.",
  },
  "projects.card3.title": {
    en: "Frontend Mentor Landing Page",
    hu: "Frontend Mentor Landing Page",
  },
  "projects.card3.desc": {
    en: "I have successfully completed this Frontend Mentor landing page project, implementing full responsiveness, modern CSS layouts, and JavaScript-based interactivity. It was an excellent practice for sharpening my frontend skills and boosting my confidence.",
    hu: "Sikeresen elkészítettem ezt a Frontend Mentor landing page-et, megvalósítva a teljes reszponzivitást, a modern CSS elrendezéseket és a JavaScript-alapú interaktivitást. Kiváló gyakorlat volt a frontend készségeim fejlesztésére és a magabiztosságom növelésére.",
  },
  "projects.card4.title": {
    en: "Space tourism multi-page website",
    hu: "Űrutazás többoldalas weboldal",
  },
  "projects.card4.desc": {
    title: "Space tourism multi-page website",
    desc: "An immersive multi-page space tourism website built based on Frontend Mentor designs. This project focuses on handling complex responsive layouts, accessible navigation, and seamless state-switching using CSS and JavaScript.",
  },
  "projects.open": {
    en: "Open Project",
    hu: "Megnyitás",
  },
  "projects.repo": {
    en: "GitHub Repo",
    hu: "GitHub tárhely",
  },
  "next.title": {
    en: "What next?",
    hu: "Mi jön ezután?",
  },

  "next.intro": {
    en: "I am currently focusing on software development, gaining a clear understanding of how modern applications are created. Alongside my studies, I am deepening my knowledge of C#, PHP, and database management.",
    hu: "Jelenleg szoftverfejlesztői képzésen veszek részt, ahol jobban belelátok abba, hogyan áll össze egy alkalmazás. Emellett mélyítem a C#, PHP és adatbázis-kezelési ismereteimet.",
  },

  "next.card1.label": {
    en: "Studies",
    hu: "Képzés",
  },
  "next.card1.title": {
    en: "Software development studies",
    hu: "Szoftverfejlesztői képzés",
  },
  "next.card1.desc": {
    en: "I am learning the foundations of software development and gaining insight into how applications are designed, built, and improved.",
    hu: "A fejlesztés alapjait tanulom, és közben azt is látom, hogyan tervezik, építik és fejlesztik tovább az alkalmazásokat.",
  },
  "next.card2.label": {
    en: "Technologies",
    hu: "Technológiák",
  },
  "next.card2.title": {
    en: "Programming foundations",
    hu: "C# és PHP",
  },
  "next.card2.desc": {
    en: "I am learning the fundamentals of backend development to better understand how different parts of an application work together.",
    hu: "A backend fejlesztés alapjait tanulom, hogy jobban átlássam, hogyan működnek együtt egy alkalmazás különböző részei.",
  },
  "next.card3.label": {
    en: "Practice",
    hu: "Gyakorlat",
  },
  "next.card3.title": {
    en: "Project workflow",
    hu: "Fejlesztési munkafolyamat",
  },
  "next.card3.desc": {
    en: "I am also focusing on practical workflow habits, including planning, debugging, and building cleaner project structure.",
    hu: "Emellett a gyakorlati munkafolyamatokra figyelek, például a tervezésre, hibakeresésre és a rendezettebb projektstruktúra kialakítására.",
  },
  "contact.title": {
    en: "Let's Connect",
    hu: "Lépjünk kapcsolatba",
  },
  "contact.intro": {
    en: "If you'd like to collaborate, have feedback, or want to discuss a project idea, feel free to reach out. I'm always open to learning opportunities and new challenges.",
    hu: "Ha együttműködnél, visszajelzést adnál, vagy szeretnél megbeszélni egy projektötletet, nyugodtan keress meg. Mindig nyitott vagyok új tanulási lehetőségekre és kihívásokra.",
  },
  "contact.cardEmail.title": {
    en: "Email",
    hu: "Email",
  },
  "contact.cardEmail.desc": {
    en: "Write an email and I will respond within 24 hours.",
    hu: "Írj emailt, és 24 órán belül válaszolok.",
  },
  "contact.cardLocation.title": {
    en: "Location",
    hu: "Helyszín",
  },
  "contact.cardLocation.desc": {
    en: "Based in Szombathely area, available for remote work and collaboration.",
    hu: "Szombathely környékén élek, távmunkára és együttműködésre nyitott vagyok.",
  },
  "contact.cardSocial.title": {
    en: "Social",
    hu: "Közösségi",
  },
  "contact.cardSocial.desc": {
    en: "Connect with me on social media platforms for updates and networking.",
    hu: "Kövess közösségi platformokon frissítésekért és kapcsolatépítéshez.",
  },
  "contact.form.name": {
    en: "Your Name",
    hu: "Neved",
  },
  "contact.form.namePlaceholder": {
    en: "Your Name",
    hu: "Neved",
  },
  "contact.form.email": {
    en: "Your Email",
    hu: "Email címed",
  },
  "contact.form.emailPlaceholder": {
    en: "Your Email",
    hu: "Email címed",
  },
  "contact.form.message": {
    en: "Your Message",
    hu: "Üzeneted",
  },
  "contact.form.messagePlaceholder": {
    en: "Your Message",
    hu: "Üzeneted",
  },
  "contact.form.send": {
    en: "Send",
    hu: "Küldés",
  },
  "contact.popup.title": {
    en: "Message sent",
    hu: "Üzenet elküldve",
  },
  "contact.popup.desc": {
    en: "Thanks! Your message was sent successfully. I'll get back to you soon.",
    hu: "Köszönöm! Az üzeneted sikeresen elküldve. Hamarosan válaszolok.",
  },
  "contact.popup.close": {
    en: "Close",
    hu: "Bezárás",
  },
  "cta.title": {
    en: "Ready for the next project?",
    hu: "Készen állsz a következő projektre?",
  },
  "cta.desc": {
    en: "I'm open to junior frontend roles and happy to work on clean, modern projects.",
    hu: "Nyitott vagyok junior frontend lehetőségekre, és szívesen dolgozom letisztult, modern projekteken.",
  },
  "cta.button": {
    en: "Get in touch",
    hu: "Lépj kapcsolatba",
  },
  "footer.brand": {
    en: "Frontend Dev",
    hu: "Frontend Fejlesztő",
  },
  "footer.brandDesc": {
    en: "Modern web interfaces focused on clarity, performance and responsive user experience.",
    hu: "Modern webes felületek, a letisztultságra, teljesítményre és reszponzív felhasználói élményre fókuszálva.",
  },
  "footer.quickLinks": {
    en: "Quick Links",
    hu: "Gyors linkek",
  },
  "footer.linkHome": {
    en: "Home",
    hu: "Kezdőlap",
  },
  "footer.linkAbout": {
    en: "About",
    hu: "Rólam",
  },
  "footer.linkProjects": {
    en: "Projects",
    hu: "Projektek",
  },
  "footer.linkContact": {
    en: "Contact",
    hu: "Kapcsolat",
  },
  "footer.social": {
    en: "Social",
    hu: "Közösségi",
  },
  "footer.email": {
    en: "Email",
    hu: "Email",
  },
  "footer.copy": {
    en: "© 2026 Frontend Developer Portfolio. All rights reserved.",
    hu: "© 2026 Frontend fejlesztői portfólió. Minden jog fenntartva.",
  },
  "footer.made": {
    en: "Made with focus and consistency.",
    hu: "Fókusszal és következetességgel készült.",
  },
};

function getInitialLanguage() {
  const storedLang = localStorage.getItem(langStorageKey);
  if (storedLang === "en" || storedLang === "hu") {
    return storedLang;
  }
  return "en";
}

function syncLangToggle(lang) {
  langToggleButton.textContent = lang === "hu" ? "EN" : "HU";
}

function applyTranslations(lang) {
  const textNodes = document.querySelectorAll("[data-i18n]");
  textNodes.forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const value = translations[key]?.[lang];
    if (value) {
      node.textContent = value;
    }
  });

  const placeholderNodes = document.querySelectorAll("[data-i18n-placeholder]");
  placeholderNodes.forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    const value = translations[key]?.[lang];
    if (value) {
      node.setAttribute("placeholder", value);
    }
  });
}

// Download resume button functionality
const downloadResumeBtn = document.getElementById("download-resume");
function ChangeCVLink(lang = root.getAttribute("lang")) {
  if (!downloadResumeBtn) return;
  const resumePage = "cv.html";
  const codeLang = lang === "hu" ? "hu" : "en";
  const resumeLink = `${resumePage}?lang=${codeLang}`;
  downloadResumeBtn.setAttribute("href", resumeLink);
}

function applyLanguage(lang) {
  root.setAttribute("lang", lang);
  localStorage.setItem(langStorageKey, lang);
  syncLangToggle(lang);
  applyTranslations(lang);
  ChangeCVLink(lang);
}

const initialLanguage = getInitialLanguage();
applyLanguage(initialLanguage);

langToggleButton.addEventListener("click", () => {
  const newLanguage = root.getAttribute("lang") === "hu" ? "en" : "hu";
  applyLanguage(newLanguage);
});

// Form message submission handling
const contactForm = document.querySelector("#contact-form form");
const successPopup = document.getElementById("success-popup");
const successPopupCloseBtn = document.getElementById("success-popup-close");

function openSuccessPopup() {
  if (!successPopup || !successPopupCloseBtn) {
    return;
  }

  successPopup.classList.add("is-visible");
  successPopup.setAttribute("aria-hidden", "false");
  successPopupCloseBtn.focus();
}

function closeSuccessPopup() {
  if (!successPopup) {
    return;
  }

  successPopup.classList.remove("is-visible");
  successPopup.setAttribute("aria-hidden", "true");
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : "";
    const isHungarian = root.getAttribute("lang") === "hu";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = isHungarian ? "Küldés..." : "Sending...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      contactForm.reset();
      openSuccessPopup();
    } catch (error) {
      window.alert(
        isHungarian
          ? "Nem sikerült elküldeni az üzenetet. Próbáld meg újra később."
          : "The message could not be sent. Please try again later.",
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

if (successPopupCloseBtn) {
  successPopupCloseBtn.addEventListener("click", closeSuccessPopup);
}

if (successPopup) {
  successPopup.addEventListener("click", (event) => {
    if (event.target === successPopup) {
      closeSuccessPopup();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    successPopup?.classList.contains("is-visible")
  ) {
    closeSuccessPopup();
  }
});

// Mobile hamburger menu toggle
const hamburgerBtn = document.getElementById("hamburger-btn");
const headerMenu = document.querySelector(".header-right");
const navLinks = document.querySelectorAll(".navElements");

// Handle hamburger menu toggle
hamburgerBtn.addEventListener("click", () => {
  headerMenu.classList.toggle("nav-active");
  hamburgerBtn.classList.toggle("toggle");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    headerMenu.classList.remove("nav-active");
    hamburgerBtn.classList.remove("toggle");
  });
});
