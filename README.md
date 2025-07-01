# Evershapes Website 🏔

Site web React avec animations 3D et interface moderne.

## 🚀 Démarrage rapide

```bash
# Cloner le projet
git clone https://github.com/evershapes/evershapes-website.git
cd evershapes-website

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## 📦 Commandes disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualiser le build
npm run lint     # Vérifier le code
npm run deploy   # Déployer sur GitHub Pages
```

## 🛠 Technologies principales

**Core**
- React 19.1.0
- Vite 6.3.5
- TypeScript

**3D & Animations**
- Three.js 0.177.0
- @react-three/fiber 9.1.2
- @react-three/drei 10.3.0
- react-spring 10.0.1

**UI & Styling**
- Tailwind CSS 4.1.10
- Radix UI Navigation
- Lucide React (icônes)
- Class Variance Authority

## 📁 Structure du projet

Pour voir l'arborescence du projet dans Git Bash :

```bash
find . -not -path "./node_modules*" -not -path "./.git*"
```

Structure du projet :
```
evershapes-website/
├── src/
│   ├── components/          # Composants React
│   │   ├── cliff_parallax_base.jsx
│   │   ├── GLTFViewer_*.jsx # Viewers 3D Three.js
│   │   ├── navbar.jsx
│   │   ├── footer.jsx
│   │   └── *_section.jsx    # Sections de page
│   ├── content/             # Contenu JSON
│   ├── utils/               # Utilitaires (card, modal)
│   ├── assets/              # Logos et SVG
│   └── App.jsx
├── public/
│   ├── images/              # Gallery + assets visuels
│   ├── scene/               # Modèles 3D (.gltf)
│   └── webFonts/            # Police Brice custom
├── components/ui/           # Composants UI (Radix)
└── lib/                     # Utilitaires partagés
```

## 🏔 Développé par Evershapes
