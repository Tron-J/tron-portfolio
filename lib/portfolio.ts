/** Public profile configuration. Add only verified details intended for publication. */
export const portfolio = {
  name: "Tron",
  fullName: "Julius Joseph",
  role: "Hardware, Firmware & Software",
  email: "juliusjoseph574@gmail.com",
  github: "",
  linkedin: "",
  resumeUrl: "",
  siteUrl: "https://devtron-portfolio.vercel.app",
};

export const hasPublicContact = Boolean(portfolio.email || portfolio.github || portfolio.linkedin);
