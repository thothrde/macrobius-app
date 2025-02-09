import React from 'react';
import type { Translations } from '../types/translations';
import MacrobiusApp from '../components/MacrobiusApp';

const translations: Translations = {
  title: "Macrobius Interactive",
  texts: "Texte",
  about: "Über",
  search: "Suche",
  searchPlaceholder: "Suche in den Texten...",
  textContent: "Hier erscheinen die Macrobius-Texte...",
  aboutContent: "Macrobius war ein römischer Philosoph und Grammatiker..."
};

export default function Home() {
  return <MacrobiusApp translations={translations} />;
}