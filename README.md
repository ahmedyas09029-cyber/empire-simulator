# KORELI - Plateforme Vidéo Sociale

Une plateforme de partage vidéo style TikTok construite avec Vite, React, et Supabase.

## 🚀 Fonctionnalités

- **Feed Vidéo Vertical** - Scroll infini de vidéos avec auto-play intelligent
- **Upload de Vidéos** - Déployer vos vidéos directement vers le cloud
- **Chat en Temps Réel** - Messagerie instantanée avec tous les utilisateurs
- **Recherche d'Agents** - Trouvez d'autres utilisateurs par email
- **Profil Utilisateur** - Gérez votre compte et vos informations
- **Authentification Sécurisée** - Email/Password avec Supabase Auth

## 📋 Stack Technique

- **Frontend** - React 18 + Vite
- **Styling** - Tailwind CSS
- **Backend** - Supabase (PostgreSQL + Auth)
- **Storage** - Supabase Storage pour les vidéos
- **Realtime** - Supabase Realtime pour le chat

## 🛠️ Installation

```bash
npm install
npm run dev
```

## 📦 Build

```bash
npm run build
npm run preview
```

## 📁 Structure du Projet

```
src/
├── components/        # Composants React
│   ├── Auth.jsx      # Écran de connexion
│   ├── VideoFeed.jsx # Feed vidéo principal
│   ├── Sidebar.jsx   # Barre latérale de navigation
│   ├── Panel.jsx     # Panneau coulissant
│   ├── Upload.jsx    # Formulaire d'upload
│   ├── Chat.jsx      # Système de chat
│   ├── Search.jsx    # Recherche d'utilisateurs
│   └── Profile.jsx   # Profil utilisateur
├── hooks/
│   └── useAuth.js    # Hook d'authentification
├── lib/
│   └── supabase.js   # Client Supabase
├── App.jsx           # Composant principal
├── main.jsx          # Point d'entrée
└── index.css         # Styles globaux
```

## 🔐 Authentification

L'app utilise Supabase Auth avec email/password. Les utilisateurs doivent :
1. Créer un compte avec leur email
2. Se connecter pour accéder à la plateforme
3. Le profil est créé automatiquement lors du signup

## 📹 Gestion des Vidéos

Les vidéos sont stockées dans Supabase Storage et les métadonnées dans la table `posts`.

## 💬 Realtime Chat

Le chat utilise Supabase Realtime pour recevoir les nouveaux messages instantanément.

## 🔒 Sécurité

- Row Level Security (RLS) activé sur toutes les tables
- Authentification requise pour accéder au contenu
- Les utilisateurs ne peuvent modifier que leurs propres données
