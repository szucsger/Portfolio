//Change theme based on user preference and toggle state

const root = document.documentElement;
const themeToggleCheckbox = document.getElementById("theme-toggle");
const storageKey = "portfoliotheme";

function getInitialTheme() {
  const storedTheme = localStorage.getItem(storageKey);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }
  return "light";
}

function syncToggle(theme) {
  themeToggleCheckbox.checked = theme === "dark";
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem(storageKey, theme);
  syncToggle(theme);
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

themeToggleCheckbox.addEventListener("change", () => {
  const newTheme = themeToggleCheckbox.checked ? "dark" : "light";
  applyTheme(newTheme);
});

//Change language based on user preference and toggle state
const langToggleCheckbox = document.getElementById("lang-toggle");
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
    hu: "Lépj kapcsolatba",
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
    en: "Frontend journey started",
    hu: "A frontend utam kezdete",
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
    en: "Growing Through Practice and Passion for Frontend Development",
    hu: "Fejlődés gyakorlással és frontend iránti szenvedéllyel",
  },
  "about.intro": {
    en: "I started my frontend journey with a strong desire to understand how modern web interfaces are built. Since completing my training, I've been actively practicing by creating small, focused projects that help me strengthen my problem-solving skills and deepen my understanding of UI/UX principles.",
    hu: "Frontend utamat erős kíváncsisággal kezdtem, hogy megértsem, hogyan épülnek fel a modern webes felületek. A képzésem befejezése óta aktívan gyakorlok kisebb, célzott projektekkel, amelyek fejlesztik a problémamegoldó képességemet és mélyítik a UI/UX szemléletemet.",
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
    en: "My workflow is centered around clarity, usability, and continuous improvement. I believe that consistent practice and real-world experimentation are the keys to becoming a strong frontend developer.",
    hu: "A munkafolyamatom középpontjában a letisztultság, a használhatóság és a folyamatos fejlődés áll. Hiszem, hogy a következetes gyakorlás és a valós kísérletezés vezet egy erős frontend fejlesztővé.",
  },
  "tech.title": {
    en: "Tech Stack",
    hu: "Technológiai stack",
  },
  "tech.intro": {
    en: "Core technologies I use in my frontend learning journey.",
    hu: "Azok a fő technológiák, amelyeket a frontend tanulási utamon használok.",
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
    en: "Angular Practice Project - Coming Soon",
    hu: "Angular gyakorló projekt - Hamarosan",
  },
  "projects.card3.desc": {
    en: "An upcoming Angular practice project where I will apply component-based architecture, routing, and service-based data handling. This will be my next step in becoming more confident with Angular.",
    hu: "Egy közelgő Angular gyakorló projekt, amelyben komponensalapú architektúrával, routinggal és service-alapú adatkezeléssel fogok dolgozni. Ez lesz a következő lépés az Angular magabiztosabb használata felé.",
  },
  "projects.repo": {
    en: "GitHub Repo",
    hu: "GitHub tárhely",
  },
  "contact.title": {
    en: "Let's Connect",
    hu: "Kapcsolódjunk",
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
  "cta.title": {
    en: "Ready for the next project?",
    hu: "Készen állsz a következő projektre?",
  },
  "cta.desc": {
    en: "Let's build something clean, modern and useful together. I'm open to junior frontend opportunities.",
    hu: "Építsünk együtt valami letisztultat, modernet és hasznosat. Nyitott vagyok junior frontend lehetőségekre.",
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
  langToggleCheckbox.checked = lang === "hu";
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

function applyLanguage(lang) {
  root.setAttribute("lang", lang);
  localStorage.setItem(langStorageKey, lang);
  syncLangToggle(lang);
  applyTranslations(lang);
}

const initialLanguage = getInitialLanguage();
applyLanguage(initialLanguage);

langToggleCheckbox.addEventListener("change", () => {
  const newLanguage = langToggleCheckbox.checked ? "hu" : "en";
  applyLanguage(newLanguage);
});
