```
  _____ _____ _______ ______   _____                     _                         _ 
 |_   _/ ____|__   __|  ____| / ____|                   | |                       | |
   | || |  __   | |  | |__   | (___   ___ ___  _ __ ___| |__   ___   __ _ _ __ __| |
   | || | |_ |  | |  |  __|   \___ \ / __/ _ \| '__/ _ \ '_ \ / _ \ / _` | '__/ _` |
  _| || |__| |  | |  | |      ____) | (_| (_) | | |  __/ |_) | (_) | (_| | | | (_| |
 |_____\_____|  |_|  |_|     |_____/ \___\___/|_|  \___|_.__/ \___/ \__,_|_|  \__,_|
                                                                                      
```

# 🎯 IGCTF Live Scoreboard

> Un tableau de scores en temps réel avec design cyberpunk pour CTFd - Thème Noël 2025

[![Live Demo](https://img.shields.io/badge/🌐-Live%20Demo-00ff00?style=for-the-badge)](https://aajax00.github.io/scoreboard_ctfd/)
[![CTFd](https://img.shields.io/badge/CTFd-Compatible-red?style=for-the-badge&logo=ghost)](https://ctfd.io)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## ✨ Features

### 🎨 Design Terminal Retro
- Interface style terminal hacker avec effet scanlines
- Animation de neige avec caractères ASCII (`0`, `1`, `*`, `{`, `}`, `❆`, `❄`)
- Police pixel art (Press Start 2P & Nabla)
- Couleurs néon vertes et rouges
- Effet de profondeur avec particules

### 📊 Affichage en Temps Réel
- **Top 20** du scoreboard actualisé toutes les 10 secondes
- **Statistiques live** :
  - 🏁 Flags soumis (total des résolutions)
  - 🎯 Nombre de challenges
  - 👥 Nombre de participants
- **Dernier flag validé** avec nom du joueur et timestamp
- **Compte à rebours** jusqu'à la fin du CTF avec barre de progression

### 🔔 Notifications Dynamiques
- **Pop-ups animées** lors de chaque flag validé
- **Son de notification** personnalisable (`christmas-sound.mp3`)
- **Animation de la ligne** du joueur qui change de position
- File d'attente des notifications

### 📈 Indicateurs de Performance
- **Flèches de tendance persistantes** :
  - 🟢 **↑** Montée dans le classement (vert)
  - 🔴 **↓** Descente dans le classement (rouge)
  - ⚪ **—** Position stable (blanc)
- Les flèches se mettent à jour en fonction des changements réels de position

### 🔋 Optimisations
- **Wake Lock API** : L'écran ne s'éteint pas pendant l'affichage
- **LocalStorage** : Persistance des flèches et du dernier flag après refresh
- **Optimisation CORS** : Utilise uniquement les APIs publiques CTFd

---

## 🚀 Installation & Déploiement

### Prérequis
- Un serveur CTFd accessible (ex: `https://igctfguardia.live`)
- Accès aux APIs publiques CTFd :
  - `/api/v1/scoreboard`
  - `/api/v1/challenges`

### Configuration

1. **Cloner le repository**
```bash
git clone https://github.com/aajax00/scoreboard_ctfd.git
cd scoreboard_ctfd
```

2. **Modifier les paramètres** dans `script.js` :
```javascript
// --- CONFIGURATION ---
const API_URL = 'https://VOTRE-CTFD.com/api/v1/scoreboard';
const CHALLENGES_API_URL = 'https://VOTRE-CTFD.com/api/v1/challenges';
const START_DATE = new Date("2025-11-29T10:00:00").getTime(); // Début du CTF
const END_DATE = new Date("2025-12-12T18:00:00").getTime();   // Fin du CTF
```

3. **Ajouter votre fichier audio** (optionnel)
   - Placez votre fichier audio `christmas-sound.mp3` dans le dossier racine
   - Format supporté : MP3

### Déploiement GitHub Pages

1. **Push vers GitHub**
```bash
git add .
git commit -m "Configure scoreboard"
git push origin main
```

2. **Activer GitHub Pages**
   - Allez dans `Settings` → `Pages`
   - Source : `Deploy from a branch`
   - Branch : `main` / `(root)`
   - Save

3. **Accéder au scoreboard**
   - URL : `https://VOTRE-USERNAME.github.io/scoreboard_ctfd/`

---

## 🎨 Personnalisation

### Changer les Couleurs
Dans `style.css` :
```css
:root {
    --bg-color: #050505;     /* Fond noir */
    --green: #0f0;           /* Vert néon */
    --dim-green: #004400;    /* Vert foncé */
    --red: #ff3333;          /* Rouge */
}
```

### Modifier le Logo
Remplacez l'URL du logo dans `index.html` :
```html
<img src="VOTRE-URL-LOGO.png" alt="CTF Logo" id="ctf-logo">
```

### Ajuster le Nombre de Participants Affichés
Dans `script.js`, fonction `renderTable()` :
```javascript
users.slice(0, 20) // Change 20 par le nombre souhaité
```

---

## 📡 APIs Utilisées

| Endpoint | Description | Auth |
|----------|-------------|------|
| `/api/v1/scoreboard` | Liste des participants et scores | ❌ Non |
| `/api/v1/challenges` | Liste des challenges avec solves | ❌ Non |

---

## 🛠️ Stack Technique

- **HTML5** - Structure
- **CSS3** - Animations & Design
- **Vanilla JavaScript** - Logique & APIs
- **LocalStorage API** - Persistance des données
- **Wake Lock API** - Empêche la mise en veille
- **Fetch API** - Requêtes HTTP

---

## 🎄 Thème de Noël

Ce scoreboard est conçu pour le **IGCTF 2025** avec un thème de Noël cyberpunk :
- ❄️ Effet de neige avec caractères de code
- 🎅 Notifications festives
- 🎵 Son de Noël lors des validations
- 🎁 Design terminal rétro-futuriste

---

## 📸 Screenshots

### Vue Principale
![Scoreboard](https://via.placeholder.com/800x400/050505/00ff00?text=IGCTF+Scoreboard)

### Notification de Flag
![Notification](https://via.placeholder.com/400x300/000000/ff3333?text=FLAG+VALIDE!)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- [CTFd](https://ctfd.io) pour la plateforme CTF
- [Google Fonts](https://fonts.google.com) pour les polices Press Start 2P et Nabla
- La communauté CTF pour l'inspiration

---

## 📞 Contact

**IGCTF Team** - [@CTFdio](https://twitter.com/ctfdio)

Project Link: [https://github.com/aajax00/scoreboard_ctfd](https://github.com/aajax00/scoreboard_ctfd)

---

```
  ███╗   ███╗ █████╗ ██████╗ ███████╗    ██╗    ██╗██╗████████╗██╗  ██╗    ██╗  ██╗ ██████╗ ██╗   ██╗███████╗
  ████╗ ████║██╔══██╗██╔══██╗██╔════╝    ██║    ██║██║╚══██╔══╝██║  ██║    ██║  ██║██╔═══██╗██║   ██║██╔════╝
  ██╔████╔██║███████║██║  ██║█████╗      ██║ █╗ ██║██║   ██║   ███████║    ███████║██║   ██║██║   ██║█████╗  
  ██║╚██╔╝██║██╔══██║██║  ██║██╔══╝      ██║███╗██║██║   ██║   ██╔══██║    ██╔══██║██║   ██║╚██╗ ██╔╝██╔══╝  
  ██║ ╚═╝ ██║██║  ██║██████╔╝███████╗    ╚███╔███╔╝██║   ██║   ██║  ██║    ██║  ██║╚██████╔╝ ╚████╔╝ ███████╗
  ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝     ╚══╝╚══╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝
```

**Happy Hacking! 🎯🔥**
