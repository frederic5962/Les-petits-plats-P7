import globals from "globals";
import pluginJs from "@eslint/js"; // Ajoute cette ligne

// Configuration ESLint pour le projet
export default [
  {
    // Options de langage
    languageOptions: {
      globals: {
        // Définir les variables globales ici
        window: true,
        document: true,
      },
    },
    // Étendre la configuration recommandée par ESLint
    extends: "eslint:recommended",
    // Options du parseur
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    // Règles personnalisées
    rules: {
      "no-console": "off", // Désactiver la règle "no-console"
      indent: ["error", 2], // Indentation de 2 espaces
      quotes: ["error", "single"], // Utiliser des guillemets simples
    },
  },
  // Plugins
  pluginJs.configs.recommended,
];