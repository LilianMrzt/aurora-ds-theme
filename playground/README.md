# Aurora Theme - Playground

Mini application React de développement pour tester la librairie `@aurora-ds/theme` en temps réel.

## 🚀 Lancement

Depuis la racine du projet :

```bash
# Installer les dépendances (si ce n'est pas déjà fait)
npm install

# Lancer le playground
npm run playground
```

L'application s'ouvrira automatiquement sur [http://localhost:3000](http://localhost:3000).

## 🔄 Hot Module Replacement (HMR)

Le playground utilise Vite avec le HMR. Toute modification dans :
- `src/` (code source de la librairie)
- `playground/src/` (code du playground)

...sera automatiquement reflétée dans le navigateur sans rechargement complet.

## 📁 Structure

```
playground/
├── index.html          # Point d'entrée HTML
├── vite.config.ts      # Configuration Vite
├── tsconfig.json       # Configuration TypeScript
└── src/
    ├── main.tsx        # Point d'entrée React
    └── App.tsx         # Application de démonstration
```

## 🧪 Utilisation

Le fichier `App.tsx` contient des exemples d'utilisation de :

- `createTheme()` - Création de thème personnalisé
- `ThemeProvider` / `useTheme` - Gestion du contexte thème
- `createStyles()` - Création de styles typés
- `keyframes()` - Animations CSS
- `colors` - Palettes de couleurs prédéfinies

Modifiez ce fichier pour tester de nouvelles fonctionnalités ou débugger des problèmes.

## ⚠️ Notes

- Ce dossier n'est **pas inclus** dans le build de la librairie
- Il n'est pas non plus publié sur npm (voir `files` dans `package.json`)
