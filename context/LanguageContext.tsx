"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "EN" | "HR";

type LanguageContextValue = {
  lang: Lang;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "EN",
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("EN");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "HR" || stored === "EN") setLang(stored);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "EN" ? "HR" : "EN";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
