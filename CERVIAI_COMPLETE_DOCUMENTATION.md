# CERVIAI - Documentation Complète du Système

## 📋 Vue d'ensemble

**CERVIAI** est une plateforme de gestion et d'analyse prédictive des données de santé pour le dépistage du cancer du col de l'utérus (HPV) au Sénégal. L'application permet la collecte de données, l'analyse par IA, la gestion des structures de santé, et le suivi des campagnes de dépistage.

### Objectifs principaux
- Faciliter la collecte de données de dépistage HPV
- Fournir des analyses prédictives par IA pour identifier les cas à risque
- Gérer les structures de santé et leur géolocalisation
- Suivre les campagnes de dépistage par région
- Permettre aux patientes de consulter leurs résultats
- Générer des rapports pour le ministère de la santé

---

## 🎨 Design System

### Palette de couleurs

\`\`\`css
/* Couleurs principales */
--background: 0 0% 98%           /* Blanc cassé #FAFAFA */
--foreground: 222 47% 11%        /* Texte principal #0F172A */

--primary: 186 100% 47%          /* Bleu turquoise #00B8D4 */
--primary-foreground: 0 0% 100%  /* Blanc sur primary */

--secondary: 330 81% 60%         /* Rose clair #EC4899 */
--secondary-foreground: 0 0% 100%

--accent: 340 82% 75%            /* Or rose/Lavande #F5A3C7 */
--accent-foreground: 222 47% 11%

--muted: 210 40% 96%             /* Gris doux #F1F5F9 */
--muted-foreground: 215 16% 47%  /* Gris texte #64748B */

--card: 0 0% 100%                /* Blanc pur */
--card-foreground: 222 47% 11%

--border: 214 32% 91%            /* Bordures #E2E8F0 */
--input: 214 32% 91%
--ring: 186 100% 47%             /* Focus ring */

--radius: 0.75rem                /* Border radius 12px */

/* Couleurs de risque */
--risk-low: 142 76% 36%          /* Vert #16A34A */
--risk-medium: 38 92% 50%        /* Orange #F59E0B */
--risk-high: 0 84% 60%           /* Rouge #EF4444 */
\`\`\`

### Typographie

\`\`\`css
/* Police principale */
font-family: 'Inter', sans-serif;

/* Tailles */
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
--text-2xl: 1.5rem      /* 24px */
--text-3xl: 1.875rem    /* 30px */
--text-4xl: 2.25rem     /* 36px */

/* Poids */
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
\`\`\`

### Composants UI (shadcn/ui)

Tous les composants utilisent shadcn/ui avec Tailwind CSS :
- Button (variants: default, destructive, outline, secondary, ghost, link)
- Card (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- Input, Textarea, Select
- Dialog, AlertDialog
- Badge (variants: default, secondary, destructive, outline)
- Table
- Tabs
- Avatar
- Dropdown Menu
- Toast (notifications)

---

## 👥 Système d'authentification et rôles

### Rôles utilisateurs

1. **Admin** (`admin`)
   - Supervise tout le système
   - Gère les comptes utilisateurs
   - Crée et suit les campagnes de dépistage
   - Gère les structures de santé
   - Consulte les statistiques globales
   - Exporte les rapports

2. **Médecin/Gynécologue** (`medecin`)
   - Collecte les données de dépistage
   - Consulte les résultats d'analyse IA
   - Accède aux dossiers patients
   - Génère des rapports médicaux

3. **Agent de santé/Sage-femme** (`agent`)
   - Collecte les données de dépistage
   - Enregistre les patientes
   - Consulte les résultats de base
   - Lié à une structure de santé spécifique

4. **Chercheur/Épidémiologiste** (`chercheur`)
   - Accède aux données anonymisées
   - Effectue des analyses statistiques
   - Exporte des données pour recherche
   - Consulte les tendances épidémiologiques

5. **Patiente** (`patiente`)
   - Consulte ses propres résultats
   - Accède à son historique de dépistage
   - Reçoit des recommandations personnalisées

### Système d'authentification

**Stockage** : localStorage (pour le prototype)
- `cerviai_user` : Utilisateur connecté
- `cerviai_users` : Liste des utilisateurs enregistrés

**Fonctions principales** :
\`\`\`typescript
login(email: string, password: string, role: UserRole): User | null
register(userData: RegisterData): User
logout(): void
getCurrentUser(): User | null
updateUser(userId: string, updates: Partial<User>): void
\`\`\`

**Modèle User** :
\`\`\`typescript
interface User {
  id: string
  email: string
  password: string  // En production: hashé
  name: string
  role: 'admin' | 'medecin' | 'agent' | 'chercheur' | 'patiente'
  
  // Champs spécifiques selon le rôle
  numeroOrdre?: string        // Médecin
  specialite?: string         // Médecin
  structureId?: string        // Agent, Médecin
  region?: string             // Agent
  institution?: string        // Chercheur
  domaineRecherche?: string   // Chercheur
  telephone?: string          // Tous
  dateNaissance?: string      // Patiente
}
\`\`\`

---

## 📊 Modèles de données

### Patient

\`\`\`typescript
interface Patient {
  id: string
  nom: string
  prenom: string
  age: number
  telephone: string
  region: string
  structureId?: string
  structureName?: string
  
  // Données médicales
  statutHPV: 'positif' | 'negatif' | 'en_attente'
  typeHPV?: string[]
  chargeVirale?: 'faible' | 'moyenne' | 'elevee'
  symptomes: string[]
  antecedents: string
  dateDepistage: string
  
  // Analyse IA
  scoreRisque: number  // 0-100
  niveauRisque: 'faible' | 'modere' | 'eleve'
  recommandations: string[]
  
  // Métadonnées
  collectePar: string  // ID de l'agent/médecin
  dateCreation: string
  derniereModification: string
}
\`\`\`

### Structure de santé

\`\`\`typescript
interface Structure {
  id: string
  nom: string
  type: 'hopital' | 'centre_sante' | 'poste_sante' | 'clinique'
  region: string
  departement: string
  commune: string
  adresse: string
  
  // Géolocalisation
  latitude: number
  longitude: number
  
  // Informations
  telephone: string
  email?: string
  effectif: number
  equipements: string[]
  
  // Statistiques
  nombreDepistages: number
  tauxPositivite: number
  dernierDepistage?: string
  
  dateCreation: string
}
\`\`\`

### Campagne de dépistage

\`\`\`typescript
interface Campaign {
  id: string
  nom: string
  description: string
  region: string
  departements: string[]
  
  // Dates
  dateDebut: string
  dateFin: string
  statut: 'planifiee' | 'en_cours' | 'terminee' | 'annulee'
  
  // Objectifs
  objectifDepistages: number
  depistagesRealises: number
  tauxRealisation: number
  
  // Structures participantes
  structuresIds: string[]
  
  // Résultats
  casPositifs: number
  casNegatifs: number
  casEnAttente: number
  tauxPositivite: number
  
  // Métadonnées
  creePar: string  // ID admin
  dateCreation: string
  derniereModification: string
}
\`\`\`

### Notification

\`\`\`typescript
interface Notification {
  id: string
  type: 'high_risk' | 'campaign' | 'system' | 'reminder'
  titre: string
  message: string
  patientId?: string
  patientName?: string
  riskScore?: number
  dateCreation: string
  lue: boolean
  priority: 'low' | 'medium' | 'high'
}
\`\`\`

---

## 🗂️ Architecture et structure des fichiers

### Structure Next.js/React (référence pour Angular)

\`\`\`
app/
├── page.tsx                    # Page d'accueil (login)
├── layout.tsx                  # Layout principal avec Inter font
├── globals.css                 # Styles globaux + Tailwind config
├── login/page.tsx              # Page de connexion
├── register/page.tsx           # Page d'inscription
├── home/page.tsx               # Dashboard d'accueil (après login)
├── dashboard/page.tsx          # Dashboard admin
├── collect/page.tsx            # Collecte de données
├── patients/page.tsx           # Liste des patientes
├── ai-analysis/page.tsx        # Analyse IA des patientes
├── structures/page.tsx         # Gestion des structures
├── campaigns/page.tsx          # Gestion des campagnes
├── reports/page.tsx            # Rapports et exports
├── research/page.tsx           # Analyses pour chercheurs
├── chatbot/page.tsx            # Chatbot de sensibilisation
├── settings/page.tsx           # Paramètres utilisateur
├── mes-resultats/page.tsx      # Résultats pour patientes
└── users/page.tsx              # Gestion des utilisateurs (admin)

components/
├── app-layout.tsx              # Layout avec sidebar et header
├── protected-route.tsx         # Guard pour routes protégées
├── login-form.tsx              # Formulaire de connexion
├── register-form.tsx           # Formulaire d'inscription (multi-rôles)
├── welcome-dashboard.tsx       # Dashboard d'accueil
├── admin-dashboard.tsx         # Dashboard administrateur
├── patients-list.tsx           # Liste des patientes avec filtres
├── ai-analysis-page.tsx        # Page d'analyse IA
├── structures-management.tsx   # Gestion des structures
├── structures-map.tsx          # Carte interactive des structures
├── campaigns-management.tsx    # Gestion des campagnes
├── notifications-panel.tsx     # Panneau de notifications
├── data-collection-form.tsx    # Formulaire de collecte (ancien)
├── forms/
│   ├── medecin-form.tsx       # Formulaire de dépistage
│   ├── chercheur-form.tsx     # Formulaire recherche
│   └── laborantin-form.tsx    # Formulaire labo (legacy)
├── dashboard/
│   ├── dashboard-stats.tsx    # Cartes statistiques
│   ├── data-visualization.tsx # Graphiques
│   └── recent-data.tsx        # Données récentes
└── ui/                         # Composants shadcn/ui
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── select.tsx
    ├── dialog.tsx
    ├── badge.tsx
    ├── table.tsx
    └── ... (autres composants shadcn)

lib/
├── auth.ts                     # Service d'authentification
├── patients-context.tsx        # Context pour les patientes
├── structures-context.tsx      # Context pour les structures
└── utils.ts                    # Utilitaires (cn, etc.)
\`\`\`

---

## 🔄 Flux utilisateur par rôle

### 1. Agent de santé

**Connexion** → `/home`

**Actions principales** :
1. **Collecter des données** (`/collect`)
   - Remplir le formulaire de dépistage
   - Enregistrer une nouvelle patiente
   - La patiente apparaît dans `/patients`

2. **Consulter les patientes** (`/patients`)
   - Voir la liste des patientes
   - Filtrer par région, statut HPV, niveau de risque
   - Rechercher par nom
   - Voir les détails d'une patiente

3. **Voir les analyses IA** (`/ai-analysis`)
   - Consulter les scores de risque
   - Voir les recommandations
   - Identifier les cas prioritaires

4. **Paramètres** (`/settings`)
   - Modifier son profil
   - Changer son mot de passe

### 2. Médecin/Gynécologue

**Connexion** → `/dashboard`

**Actions principales** :
1. **Dashboard** (`/dashboard`)
   - Voir les statistiques globales
   - Consulter les cas récents
   - Voir les alertes de cas à haut risque

2. **Collecter des données** (`/collect`)
   - Même que l'agent de santé
   - Accès à plus de champs médicaux

3. **Consulter les patientes** (`/patients`)
   - Accès complet aux dossiers
   - Modifier les données médicales
   - Ajouter des notes

4. **Analyse IA** (`/ai-analysis`)
   - Voir les prédictions détaillées
   - Valider ou ajuster les recommandations

5. **Rapports** (`/reports`)
   - Générer des rapports médicaux
   - Exporter des données

### 3. Chercheur/Épidémiologiste

**Connexion** → `/research`

**Actions principales** :
1. **Analyses statistiques** (`/research`)
   - Consulter les tendances épidémiologiques
   - Voir les graphiques par région
   - Analyser les taux de positivité

2. **Consulter les données** (`/patients`)
   - Accès aux données anonymisées
   - Filtres avancés
   - Export pour analyse

3. **Rapports** (`/reports`)
   - Générer des rapports de recherche
   - Exporter en CSV/Excel

### 4. Administrateur

**Connexion** → `/dashboard`

**Actions principales** :
1. **Dashboard global** (`/dashboard`)
   - Vue d'ensemble du système
   - Statistiques globales
   - Alertes système

2. **Gestion des utilisateurs** (`/users`)
   - Créer des comptes
   - Modifier les rôles
   - Activer/désactiver des comptes

3. **Gestion des structures** (`/structures`)
   - Ajouter des structures de santé
   - Géolocaliser les structures
   - Voir les statistiques par structure
   - Carte interactive

4. **Gestion des campagnes** (`/campaigns`)
   - Créer des campagnes de dépistage
   - Suivre la progression
   - Assigner des structures
   - Voir les résultats

5. **Rapports globaux** (`/reports`)
   - Exporter pour le ministère
   - Statistiques nationales
   - Analyses par région

### 5. Patiente

**Connexion** → `/mes-resultats`

**Actions principales** :
1. **Consulter ses résultats** (`/mes-resultats`)
   - Voir son statut HPV
   - Consulter son score de risque
   - Lire les recommandations
   - Voir son historique

2. **Chatbot** (`/chatbot`)
   - Poser des questions sur le HPV
   - Recevoir des informations de sensibilisation

---

## 📄 Pages détaillées

### 1. Page de connexion (`/login`)

**Composant** : `LoginForm`

**Fonctionnalités** :
- Sélection du rôle (dropdown)
- Champ email
- Champ mot de passe
- Bouton "Se connecter"
- Lien "Je m'inscris" → `/register`
- Validation des champs
- Messages d'erreur (email/mot de passe incorrect)

**Redirection après connexion** :
- Admin → `/dashboard`
- Médecin → `/dashboard`
- Chercheur → `/research`
- Agent → `/home`
- Patiente → `/mes-resultats`

**Utilisateurs de démonstration** :
\`\`\`typescript
{
  email: "admin@cerviai.sn",
  password: "admin123",
  role: "admin"
},
{
  email: "dr.diop@cerviai.sn",
  password: "medecin123",
  role: "medecin"
},
{
  email: "agent@cerviai.sn",
  password: "agent123",
  role: "agent"
},
{
  email: "chercheur@cerviai.sn",
  password: "chercheur123",
  role: "chercheur"
},
{
  email: "patiente@cerviai.sn",
  password: "patiente123",
  role: "patiente"
}
\`\`\`

### 2. Page d'inscription (`/register`)

**Composant** : `RegisterForm`

**Étapes** :
1. Sélection du rôle (4 cartes cliquables)
2. Formulaire spécifique au rôle

**Formulaires par rôle** :

**Médecin/Gynécologue** :
- Nom, Prénom
- Email, Mot de passe, Confirmation
- Numéro d'ordre des médecins
- Spécialité (Gynécologie, Oncologie, etc.)
- Structure de santé (select)
- Téléphone

**Agent de santé** :
- Nom, Prénom
- Email, Mot de passe, Confirmation
- Structure de santé (select)
- Région (select)
- Téléphone

**Chercheur/Épidémiologiste** :
- Nom, Prénom
- Email, Mot de passe, Confirmation
- Institution de recherche
- Domaine de recherche
- Téléphone

**Patiente** :
- Nom, Prénom
- Email, Mot de passe, Confirmation
- Date de naissance
- Téléphone

**Validation** :
- Email unique
- Mot de passe min 6 caractères
- Tous les champs requis remplis

**Après inscription** :
- Message de succès
- Redirection vers `/login` après 2 secondes

### 3. Dashboard d'accueil (`/home`)

**Composant** : `WelcomeDashboard`

**Rôles autorisés** : admin, medecin, chercheur, agent

**Sections** :

**Header** :
- Message de bienvenue personnalisé
- Date du jour
- Rôle de l'utilisateur

**Cartes statistiques** (4 cartes) :
1. Total patientes dépistées
2. Cas positifs HPV
3. Taux de positivité
4. Cas à haut risque

**Graphique** :
- Évolution des dépistages (ligne)
- Par mois sur 6 mois

**Actions rapides** (boutons) :
- "Nouvelle collecte" → `/collect`
- "Voir les patientes" → `/patients`
- "Analyse IA" → `/ai-analysis`

**Alertes** :
- Liste des patientes à haut risque
- Avec nom, score, et bouton "Voir détails"

### 4. Dashboard Admin (`/dashboard`)

**Composant** : `AdminDashboard`

**Rôles autorisés** : admin, medecin, chercheur

**Sections** :

**Statistiques globales** (6 cartes) :
1. Total dépistages
2. Cas positifs
3. Cas négatifs
4. Taux de positivité
5. Structures actives
6. Campagnes en cours

**Graphiques** :
1. Dépistages par région (bar chart)
2. Évolution mensuelle (line chart)
3. Répartition par type HPV (pie chart)
4. Taux de positivité par région (bar chart)

**Tableau** :
- Données récentes (10 dernières patientes)
- Colonnes : Nom, Âge, Région, Statut HPV, Score risque, Date

**Actions admin** :
- "Gérer les utilisateurs" → `/users`
- "Gérer les structures" → `/structures`
- "Gérer les campagnes" → `/campaigns`
- "Exporter les rapports" → `/reports`

### 5. Collecte de données (`/collect`)

**Composant** : `MedecinForm`

**Rôles autorisés** : agent, medecin, chercheur

**Formulaire** (sections) :

**Informations personnelles** :
- Nom (requis)
- Prénom (requis)
- Âge (requis, min 18)
- Téléphone (requis)
- Région (select, requis)
- Structure de santé (select, auto-rempli pour agents)

**Données de dépistage** :
- Statut HPV (select: positif/négatif/en_attente, requis)
- Type HPV (multi-select: HPV 16, 18, 31, 33, 45, 52, 58, autres)
- Charge virale (select: faible/moyenne/élevée)
- Date de dépistage (date picker, requis)

**Informations cliniques** :
- Symptômes (checkboxes):
  - Saignements anormaux
  - Douleurs pelviennes
  - Pertes vaginales
  - Douleurs pendant les rapports
  - Aucun symptôme
- Antécédents médicaux (textarea)

**Analyse IA automatique** :
Après soumission, calcul automatique de :
- Score de risque (0-100)
- Niveau de risque (faible/modéré/élevé)
- Recommandations personnalisées

**Validation** :
- Tous les champs requis remplis
- Âge >= 18
- Téléphone au format valide
- Si HPV positif, type HPV requis

**Après soumission** :
- Message de succès
- Ajout au contexte patients
- Notification si haut risque
- Redirection vers `/patients` après 2 secondes

### 6. Liste des patientes (`/patients`)

**Composant** : `PatientsList`

**Rôles autorisés** : admin, medecin, chercheur, agent

**Fonctionnalités** :

**Filtres** :
- Recherche par nom/prénom (input)
- Filtre par région (select)
- Filtre par statut HPV (select: tous/positif/négatif/en_attente)
- Filtre par niveau de risque (select: tous/faible/modéré/élevé)

**Actions** :
- Bouton "Exporter en CSV"
- Bouton "Nouvelle collecte" → `/collect`

**Tableau** :
Colonnes :
- Nom complet
- Âge
- Téléphone
- Région
- Structure
- Statut HPV (badge coloré)
- Score de risque (badge coloré)
- Date de dépistage
- Actions (bouton "Voir détails")

**Pagination** :
- 10 patientes par page
- Boutons précédent/suivant
- Affichage "Page X sur Y"

**Badge de statut HPV** :
- Positif : rouge
- Négatif : vert
- En attente : jaune

**Badge de risque** :
- Faible (0-33) : vert
- Modéré (34-66) : orange
- Élevé (67-100) : rouge

**Export CSV** :
Colonnes exportées :
- Nom, Prénom, Âge, Téléphone, Région, Structure
- Statut HPV, Type HPV, Charge virale
- Score risque, Niveau risque
- Symptômes, Antécédents
- Date dépistage, Collecté par

### 7. Analyse IA (`/ai-analysis`)

**Composant** : `AIAnalysisPage`

**Rôles autorisés** : admin, medecin, agent

**Sections** :

**Statistiques IA** (3 cartes) :
1. Score de risque moyen
2. Cas à haut risque (nombre)
3. Précision du modèle (%)

**Filtres** :
- Par niveau de risque (tabs: Tous/Élevé/Modéré/Faible)
- Recherche par nom

**Liste des patientes** :
Affichage par carte :
- Photo/Avatar
- Nom complet
- Âge, Région
- Score de risque (grand, coloré)
- Niveau de risque (badge)
- Statut HPV
- Date de dépistage
- Bouton "Voir détails IA"

**Détails IA** (dialog) :
- Informations patiente
- Score de risque détaillé
- Facteurs de risque identifiés
- Recommandations personnalisées :
  - Suivi médical
  - Examens complémentaires
  - Traitement suggéré
  - Fréquence de suivi

**Algorithme de calcul du score** :
\`\`\`typescript
// Facteurs de risque
let score = 0

// Statut HPV (40 points)
if (statutHPV === 'positif') score += 40

// Type HPV à haut risque (20 points)
if (typeHPV.includes('HPV 16') || typeHPV.includes('HPV 18')) {
  score += 20
}

// Charge virale (15 points)
if (chargeVirale === 'elevee') score += 15
else if (chargeVirale === 'moyenne') score += 8

// Symptômes (25 points)
const symptomesRisque = [
  'Saignements anormaux',
  'Douleurs pelviennes',
  'Pertes vaginales'
]
const symptomesPresents = symptomes.filter(s => 
  symptomesRisque.includes(s)
).length
score += symptomesPresents * 8

// Âge (facteur multiplicateur)
if (age > 50) score *= 1.1
else if (age < 25) score *= 0.9

// Normaliser sur 100
score = Math.min(100, Math.round(score))

// Niveau de risque
let niveau: 'faible' | 'modere' | 'eleve'
if (score < 34) niveau = 'faible'
else if (score < 67) niveau = 'modere'
else niveau = 'eleve'

return { score, niveau }
\`\`\`

### 8. Gestion des structures (`/structures`)

**Composant** : `StructuresManagement`

**Rôles autorisés** : admin

**Sections** :

**Header** :
- Titre "Structures de santé"
- Bouton "Ajouter une structure"
- Statistiques : Total structures, Structures actives

**Carte interactive** :
- Carte du Sénégal (SVG ou Leaflet)
- Marqueurs pour chaque structure
- Couleur selon le nombre de dépistages :
  - Vert : > 100 dépistages
  - Orange : 50-100 dépistages
  - Rouge : < 50 dépistages
- Clic sur marqueur → Popup avec infos structure

**Filtres** :
- Par région (select)
- Par type (select: tous/hôpital/centre/poste/clinique)
- Recherche par nom

**Liste des structures** :
Affichage par carte :
- Nom de la structure
- Type (badge)
- Région, Département, Commune
- Adresse
- Téléphone
- Nombre de dépistages
- Taux de positivité
- Effectif
- Boutons : "Voir détails", "Modifier", "Supprimer"

**Dialog "Ajouter une structure"** :
Formulaire :
- Nom (requis)
- Type (select: hôpital/centre_sante/poste_sante/clinique)
- Région (select, requis)
- Département (requis)
- Commune (requis)
- Adresse (requis)
- Téléphone (requis)
- Email
- Effectif (nombre)
- Équipements (multi-select):
  - Colposcope
  - Cryothérapie
  - Laboratoire HPV
  - Échographie
  - Salle d'opération
- Latitude (nombre, requis)
- Longitude (nombre, requis)

**Régions du Sénégal** :
- Dakar
- Thiès
- Diourbel
- Fatick
- Kaolack
- Kaffrine
- Kolda
- Louga
- Matam
- Saint-Louis
- Sédhiou
- Tambacounda
- Kédougou
- Ziguinchor

**Statistiques par structure** :
- Nombre total de dépistages
- Cas positifs / négatifs
- Taux de positivité
- Dernier dépistage
- Agents assignés

### 9. Gestion des campagnes (`/campaigns`)

**Composant** : `CampaignsManagement`

**Rôles autorisés** : admin

**Sections** :

**Header** :
- Titre "Campagnes de dépistage"
- Bouton "Créer une campagne"
- Statistiques : Campagnes actives, Total dépistages

**Filtres** :
- Par statut (tabs: Toutes/Planifiées/En cours/Terminées)
- Par région (select)

**Liste des campagnes** :
Affichage par carte :
- Nom de la campagne
- Description
- Région
- Statut (badge coloré)
- Dates (début - fin)
- Progression (barre de progression)
  - X / Y dépistages réalisés
  - Pourcentage
- Résultats :
  - Cas positifs
  - Cas négatifs
  - Taux de positivité
- Structures participantes (nombre)
- Boutons : "Voir détails", "Modifier", "Terminer"

**Dialog "Créer une campagne"** :
Formulaire :
- Nom (requis)
- Description (textarea, requis)
- Région (select, requis)
- Départements (multi-select, requis)
- Date de début (date picker, requis)
- Date de fin (date picker, requis)
- Objectif de dépistages (nombre, requis)
- Structures participantes (multi-select, requis)

**Statuts de campagne** :
- Planifiée (gris) : Date de début future
- En cours (bleu) : Entre date début et fin
- Terminée (vert) : Date de fin passée
- Annulée (rouge) : Annulée manuellement

**Détails d'une campagne** :
- Informations générales
- Progression détaillée
- Liste des structures participantes
- Statistiques par structure
- Graphique d'évolution
- Export des résultats

### 10. Notifications (`NotificationsPanel`)

**Composant** : `NotificationsPanel` (dans header)

**Déclenchement** :
- Icône cloche dans le header
- Badge avec nombre de notifications non lues
- Clic → Panneau déroulant

**Types de notifications** :

**1. Cas à haut risque** :
- Déclenchée automatiquement quand score >= 67
- Titre : "Cas à haut risque détecté"
- Message : "Patiente [Nom] - Score de risque : [X]/100"
- Priorité : high
- Couleur : rouge

**2. Campagne** :
- Nouvelle campagne créée
- Campagne terminée
- Objectif atteint
- Priorité : medium
- Couleur : bleu

**3. Système** :
- Mises à jour
- Maintenance
- Priorité : low
- Couleur : gris

**4. Rappel** :
- Suivi de patiente
- Rendez-vous
- Priorité : medium
- Couleur : orange

**Affichage** :
- Liste des notifications (max 10 récentes)
- Icône selon le type
- Titre en gras
- Message
- Date relative ("Il y a 2h")
- Badge "Non lu" si non lue
- Bouton "Marquer comme lu"
- Bouton "Tout marquer comme lu"

**Stockage** :
- localStorage : `cerviai_notifications`
- Persistance entre sessions

### 11. Rapports (`/reports`)

**Composant** : `ReportsData`

**Rôles autorisés** : admin, medecin, chercheur

**Sections** :

**Types de rapports** :

**1. Rapport global** :
- Statistiques nationales
- Tous les dépistages
- Toutes les régions
- Export PDF/Excel

**2. Rapport par région** :
- Sélection de la région
- Statistiques régionales
- Comparaison avec la moyenne nationale

**3. Rapport par structure** :
- Sélection de la structure
- Performance de la structure
- Comparaison avec d'autres structures

**4. Rapport par période** :
- Sélection date début/fin
- Évolution temporelle
- Tendances

**Données incluses** :
- Nombre total de dépistages
- Cas positifs / négatifs / en attente
- Taux de positivité
- Répartition par type HPV
- Répartition par âge
- Répartition par région
- Cas à haut risque
- Graphiques et visualisations

**Formats d'export** :
- PDF (pour impression)
- Excel (pour analyse)
- CSV (pour import)

**Boutons d'action** :
- "Générer le rapport"
- "Exporter en PDF"
- "Exporter en Excel"
- "Exporter en CSV"

### 12. Recherche (`/research`)

**Composant** : `ResearchAnalysis`

**Rôles autorisés** : chercheur

**Sections** :

**Analyses épidémiologiques** :

**1. Tendances temporelles** :
- Graphique d'évolution des cas
- Par mois/trimestre/année
- Comparaison entre régions

**2. Répartition géographique** :
- Carte de chaleur par région
- Taux de prévalence
- Zones à risque

**3. Analyses démographiques** :
- Répartition par âge
- Facteurs de risque
- Corrélations

**4. Types HPV** :
- Prévalence par type
- Co-infections
- Évolution

**Outils d'analyse** :
- Filtres avancés
- Sélection de variables
- Graphiques personnalisables
- Export de données anonymisées

**Données anonymisées** :
- Pas de noms/prénoms
- Pas de téléphones
- Identifiants anonymes
- Données agrégées

### 13. Chatbot (`/chatbot`)

**Composant** : `ChatbotSensibilisation`

**Rôles autorisés** : tous

**Fonctionnalités** :

**Interface de chat** :
- Zone de messages
- Input pour taper
- Bouton envoyer
- Avatar du bot

**Questions prédéfinies** (boutons rapides) :
- "Qu'est-ce que le HPV ?"
- "Comment se transmet le HPV ?"
- "Quels sont les symptômes ?"
- "Comment se faire dépister ?"
- "Où trouver un centre de dépistage ?"
- "Le dépistage est-il gratuit ?"

**Réponses du bot** :
- Informations sur le HPV
- Prévention
- Dépistage
- Traitement
- Liens vers ressources
- Localisation des centres

**Ton** :
- Bienveillant
- Éducatif
- Rassurant
- Accessible

### 14. Paramètres (`/settings`)

**Composant** : `SettingsPage`

**Rôles autorisés** : tous

**Sections** :

**1. Profil** :
- Photo de profil
- Nom, Prénom
- Email (non modifiable)
- Téléphone
- Bouton "Enregistrer"

**2. Sécurité** :
- Changer le mot de passe
  - Ancien mot de passe
  - Nouveau mot de passe
  - Confirmer nouveau mot de passe
- Bouton "Mettre à jour"

**3. Notifications** :
- Activer/désactiver les notifications
- Types de notifications à recevoir
- Fréquence

**4. Préférences** :
- Langue (Français/Wolof)
- Thème (Clair/Sombre) - optionnel
- Format de date

**5. Informations spécifiques au rôle** :
- Agent : Structure assignée, Région
- Médecin : Numéro d'ordre, Spécialité, Structure
- Chercheur : Institution, Domaine de recherche

### 15. Mes résultats (`/mes-resultats`)

**Composant** : Page spécifique patiente

**Rôles autorisés** : patiente

**Sections** :

**Header** :
- Message de bienvenue
- Nom de la patiente

**Dernier résultat** (carte principale) :
- Statut HPV (grand badge coloré)
- Date du dépistage
- Score de risque (si positif)
- Niveau de risque (si positif)

**Recommandations** :
- Liste des recommandations personnalisées
- Prochaines étapes
- Conseils de prévention

**Historique** :
- Liste des dépistages précédents
- Date, Statut, Score
- Évolution dans le temps

**Actions** :
- "Prendre rendez-vous"
- "Contacter mon médecin"
- "En savoir plus" → `/chatbot`

**Informations rassurantes** :
- Messages bienveillants
- Explications claires
- Ressources d'aide

### 16. Gestion des utilisateurs (`/users`)

**Composant** : `UserManagement`

**Rôles autorisés** : admin

**Sections** :

**Header** :
- Titre "Gestion des utilisateurs"
- Bouton "Créer un utilisateur"
- Statistiques : Total utilisateurs, Par rôle

**Filtres** :
- Par rôle (tabs: Tous/Admin/Médecin/Agent/Chercheur/Patiente)
- Par statut (Actif/Inactif)
- Recherche par nom/email

**Tableau des utilisateurs** :
Colonnes :
- Nom complet
- Email
- Rôle (badge)
- Structure (si applicable)
- Statut (badge: Actif/Inactif)
- Date de création
- Actions : "Modifier", "Désactiver/Activer", "Supprimer"

**Dialog "Créer un utilisateur"** :
- Même formulaire que l'inscription
- Admin peut créer pour tous les rôles
- Génération automatique de mot de passe temporaire

**Dialog "Modifier un utilisateur"** :
- Modifier les informations
- Changer le rôle
- Réinitialiser le mot de passe
- Activer/désactiver le compte

---

## 🎯 Fonctionnalités clés

### 1. Système de géolocalisation

**Structures de santé** :
- Chaque structure a latitude/longitude
- Affichage sur carte interactive
- Marqueurs colorés selon performance
- Popup avec informations au clic

**Carte du Sénégal** :
- SVG ou Leaflet/Mapbox
- Régions cliquables
- Zoom sur région
- Filtres par région

**Statistiques géographiques** :
- Dépistages par région
- Taux de positivité par région
- Couverture géographique
- Zones prioritaires

### 2. Analyse prédictive par IA

**Calcul du score de risque** :
- Algorithme basé sur :
  - Statut HPV
  - Type HPV
  - Charge virale
  - Symptômes
  - Âge
  - Antécédents

**Recommandations automatiques** :
- Basées sur le score de risque
- Personnalisées par patiente
- Incluent :
  - Fréquence de suivi
  - Examens complémentaires
  - Traitement suggéré
  - Prévention

**Notifications automatiques** :
- Alerte si score >= 67
- Notification aux médecins/agents
- Priorisation des cas

### 3. Gestion des campagnes

**Création de campagne** :
- Définition des objectifs
- Sélection des régions/départements
- Assignation des structures
- Dates de début/fin

**Suivi en temps réel** :
- Progression (%)
- Dépistages réalisés vs objectif
- Résultats (positifs/négatifs)
- Performance par structure

**Clôture de campagne** :
- Rapport final
- Statistiques complètes
- Export des résultats
- Archivage

### 4. Export et rapports

**Formats supportés** :
- CSV : Données brutes
- Excel : Tableaux formatés
- PDF : Rapports imprimables

**Types de données exportables** :
- Liste des patientes
- Statistiques globales
- Données par région
- Données par structure
- Résultats de campagne

**Personnalisation** :
- Sélection des colonnes
- Filtres appliqués
- Période temporelle
- Format de date

### 5. Notifications en temps réel

**Déclencheurs** :
- Nouveau cas à haut risque
- Nouvelle campagne
- Objectif de campagne atteint
- Rappel de suivi

**Affichage** :
- Badge sur icône cloche
- Panneau déroulant
- Liste des notifications
- Marquer comme lu

**Persistance** :
- Stockage localStorage
- Synchronisation entre sessions
- Historique des notifications

---

## 🔧 Services et Contextes

### 1. AuthService (`lib/auth.ts`)

**Fonctions** :

\`\`\`typescript
// Connexion
login(email: string, password: string, role: UserRole): User | null

// Inscription
register(userData: RegisterData): User

// Déconnexion
logout(): void

// Utilisateur actuel
getCurrentUser(): User | null

// Mise à jour utilisateur
updateUser(userId: string, updates: Partial<User>): void

// Vérification de rôle
hasRole(user: User, allowedRoles: UserRole[]): boolean

// Chargement des utilisateurs
loadUsers(): User[]

// Sauvegarde des utilisateurs
saveUsers(users: User[]): void
\`\`\`

**Stockage** :
- `cerviai_user` : Utilisateur connecté
- `cerviai_users` : Liste des utilisateurs

**Utilisateurs de démonstration** :
- 5 utilisateurs (1 par rôle)
- Mots de passe simples pour démo

### 2. PatientsContext (`lib/patients-context.tsx`)

**État** :
\`\`\`typescript
interface PatientsContextType {
  patients: Patient[]
  addPatient: (patient: Omit<Patient, 'id'>) => void
  updatePatient: (id: string, updates: Partial<Patient>) => void
  deletePatient: (id: string) => void
  getPatientById: (id: string) => Patient | undefined
  getPatientsByRegion: (region: string) => Patient[]
  getPatientsByRisk: (risk: 'faible' | 'modere' | 'eleve') => Patient[]
}
\`\`\`

**Fonctions** :

\`\`\`typescript
// Ajouter une patiente
addPatient(patient: Omit<Patient, 'id'>): void {
  const newPatient = {
    ...patient,
    id: generateId(),
    dateCreation: new Date().toISOString(),
    derniereModification: new Date().toISOString()
  }
  
  // Calculer le score de risque
  const { score, niveau } = calculateRiskScore(newPatient)
  newPatient.scoreRisque = score
  newPatient.niveauRisque = niveau
  newPatient.recommandations = generateRecommendations(newPatient)
  
  // Ajouter au state
  setPatients([...patients, newPatient])
  
  // Sauvegarder
  saveToLocalStorage([...patients, newPatient])
  
  // Notification si haut risque
  if (niveau === 'eleve') {
    createNotification({
      type: 'high_risk',
      patientId: newPatient.id,
      patientName: `${newPatient.nom} ${newPatient.prenom}`,
      riskScore: score
    })
  }
}

// Mettre à jour une patiente
updatePatient(id: string, updates: Partial<Patient>): void

// Supprimer une patiente
deletePatient(id: string): void

// Récupérer par ID
getPatientById(id: string): Patient | undefined

// Filtrer par région
getPatientsByRegion(region: string): Patient[]

// Filtrer par niveau de risque
getPatientsByRisk(risk: 'faible' | 'modere' | 'eleve'): Patient[]
\`\`\`

**Stockage** :
- `cerviai_patients` : Liste des patientes

**Données de démonstration** :
- 15 patientes avec données variées
- Différentes régions
- Différents statuts HPV
- Différents niveaux de risque

### 3. StructuresContext (`lib/structures-context.tsx`)

**État** :
\`\`\`typescript
interface StructuresContextType {
  structures: Structure[]
  addStructure: (structure: Omit<Structure, 'id'>) => void
  updateStructure: (id: string, updates: Partial<Structure>) => void
  deleteStructure: (id: string) => void
  getStructureById: (id: string) => Structure | undefined
  getStructuresByRegion: (region: string) => Structure[]
  updateStructureStats: (structureId: string) => void
}
\`\`\`

**Fonctions** :

\`\`\`typescript
// Ajouter une structure
addStructure(structure: Omit<Structure, 'id'>): void

// Mettre à jour une structure
updateStructure(id: string, updates: Partial<Structure>): void

// Supprimer une structure
deleteStructure(id: string): void

// Récupérer par ID
getStructureById(id: string): Structure | undefined

// Filtrer par région
getStructuresByRegion(region: string): Structure[]

// Mettre à jour les statistiques
updateStructureStats(structureId: string): void {
  // Compter les dépistages de cette structure
  const depistages = patients.filter(p => p.structureId === structureId)
  const positifs = depistages.filter(p => p.statutHPV === 'positif')
  
  updateStructure(structureId, {
    nombreDepistages: depistages.length,
    tauxPositivite: (positifs.length / depistages.length) * 100,
    dernierDepistage: depistages[depistages.length - 1]?.dateDepistage
  })
}
\`\`\`

**Stockage** :
- `cerviai_structures` : Liste des structures

**Données de démonstration** :
- 20 structures réparties dans les régions
- Différents types (hôpital, centre, poste, clinique)
- Coordonnées GPS réelles du Sénégal
- Statistiques variées

### 4. CampaignsContext (à créer)

**État** :
\`\`\`typescript
interface CampaignsContextType {
  campaigns: Campaign[]
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
  getCampaignById: (id: string) => Campaign | undefined
  getCampaignsByRegion: (region: string) => Campaign[]
  updateCampaignProgress: (campaignId: string) => void
}
\`\`\`

### 5. NotificationsContext (à créer)

**État** :
\`\`\`typescript
interface NotificationsContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  getUnreadCount: () => number
}
\`\`\`

---

## 🛠️ Utilitaires

### 1. Calcul du score de risque

\`\`\`typescript
function calculateRiskScore(patient: Patient): { score: number, niveau: 'faible' | 'modere' | 'eleve' } {
  let score = 0
  
  // Statut HPV (40 points)
  if (patient.statutHPV === 'positif') {
    score += 40
  }
  
  // Type HPV à haut risque (20 points)
  const highRiskTypes = ['HPV 16', 'HPV 18']
  if (patient.typeHPV?.some(type => highRiskTypes.includes(type))) {
    score += 20
  }
  
  // Charge virale (15 points)
  if (patient.chargeVirale === 'elevee') {
    score += 15
  } else if (patient.chargeVirale === 'moyenne') {
    score += 8
  }
  
  // Symptômes (25 points max)
  const symptomesRisque = [
    'Saignements anormaux',
    'Douleurs pelviennes',
    'Pertes vaginales'
  ]
  const symptomesPresents = patient.symptomes.filter(s => 
    symptomesRisque.includes(s)
  ).length
  score += Math.min(25, symptomesPresents * 8)
  
  // Facteur âge
  if (patient.age > 50) {
    score *= 1.1
  } else if (patient.age < 25) {
    score *= 0.9
  }
  
  // Normaliser sur 100
  score = Math.min(100, Math.round(score))
  
  // Déterminer le niveau
  let niveau: 'faible' | 'modere' | 'eleve'
  if (score < 34) {
    niveau = 'faible'
  } else if (score < 67) {
    niveau = 'modere'
  } else {
    niveau = 'eleve'
  }
  
  return { score, niveau }
}
\`\`\`

### 2. Génération de recommandations

\`\`\`typescript
function generateRecommendations(patient: Patient): string[] {
  const recommendations: string[] = []
  
  if (patient.niveauRisque === 'eleve') {
    recommendations.push('Consultation gynécologique urgente recommandée')
    recommendations.push('Colposcopie avec biopsie à réaliser')
    recommendations.push('Suivi tous les 3 mois')
    recommendations.push('Traitement antiviral à considérer')
  } else if (patient.niveauRisque === 'modere') {
    recommendations.push('Consultation gynécologique dans les 2 semaines')
    recommendations.push('Colposcopie recommandée')
    recommendations.push('Suivi tous les 6 mois')
    recommendations.push('Vaccination HPV si éligible')
  } else {
    recommendations.push('Suivi de routine annuel')
    recommendations.push('Dépistage HPV tous les 3 ans')
    recommendations.push('Vaccination HPV recommandée')
    recommendations.push('Maintenir un mode de vie sain')
  }
  
  // Recommandations spécifiques aux symptômes
  if (patient.symptomes.includes('Saignements anormaux')) {
    recommendations.push('Échographie pelvienne recommandée')
  }
  
  if (patient.symptomes.includes('Douleurs pelviennes')) {
    recommendations.push('Examen clinique approfondi nécessaire')
  }
  
  return recommendations
}
\`\`\`

### 3. Export CSV

\`\`\`typescript
function exportToCSV(patients: Patient[], filename: string): void {
  // Headers
  const headers = [
    'Nom', 'Prénom', 'Âge', 'Téléphone', 'Région', 'Structure',
    'Statut HPV', 'Type HPV', 'Charge virale',
    'Score risque', 'Niveau risque',
    'Symptômes', 'Antécédents',
    'Date dépistage', 'Collecté par'
  ]
  
  // Rows
  const rows = patients.map(p => [
    p.nom,
    p.prenom,
    p.age,
    p.telephone,
    p.region,
    p.structureName || '',
    p.statutHPV,
    p.typeHPV?.join('; ') || '',
    p.chargeVirale || '',
    p.scoreRisque,
    p.niveauRisque,
    p.symptomes.join('; '),
    p.antecedents,
    p.dateDepistage,
    p.collectePar
  ])
  
  // Créer le CSV
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n')
  
  // Télécharger
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}
\`\`\`

### 4. Génération d'ID unique

\`\`\`typescript
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
\`\`\`

### 5. Formatage de date

\`\`\`typescript
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'À l\'instant'
  if (diffMins < 60) return `Il y a ${diffMins} min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays < 7) return `Il y a ${diffDays}j`
  return formatDate(dateString)
}
\`\`\`

---

## 📱 Responsive Design

### Breakpoints Tailwind

\`\`\`css
/* Mobile first */
sm: 640px   /* Tablettes portrait */
md: 768px   /* Tablettes paysage */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
\`\`\`

### Layout responsive

**Sidebar** :
- Desktop (lg+) : Sidebar fixe à gauche (256px)
- Mobile (< lg) : Sidebar cachée, menu hamburger
- Overlay sur mobile quand ouvert

**Grilles** :
- Mobile : 1 colonne
- Tablette : 2 colonnes
- Desktop : 3-4 colonnes

**Tableaux** :
- Desktop : Tableau complet
- Mobile : Cartes empilées

**Formulaires** :
- Desktop : 2 colonnes
- Mobile : 1 colonne

---

## 🔐 Sécurité

### Authentification

**Prototype (localStorage)** :
- Stockage en clair (démo uniquement)
- Pas de token JWT
- Pas de refresh token

**Production (recommandations)** :
- Backend avec JWT
- Refresh tokens
- Mots de passe hashés (bcrypt)
- HTTPS obligatoire
- Rate limiting
- CORS configuré

### Autorisation

**Guards par rôle** :
- Vérification côté client (prototype)
- À implémenter côté serveur (production)

**Données sensibles** :
- Anonymisation pour chercheurs
- Accès restreint par rôle
- Logs d'accès (production)

### Validation

**Côté client** :
- Validation des formulaires
- Messages d'erreur clairs
- Prévention XSS (React échappe automatiquement)

**Côté serveur (production)** :
- Validation stricte
- Sanitization des inputs
- Protection CSRF

---

## 🚀 Déploiement

### Environnements

**Développement** :
- localhost:3000
- Hot reload
- Données mockées

**Staging** :
- Vercel preview
- Données de test
- Tests E2E

**Production** :
- Vercel production
- Backend API réel
- Base de données réelle
- Monitoring

### Variables d'environnement

\`\`\`env
# API
NEXT_PUBLIC_API_URL=https://api.cerviai.sn

# Auth
NEXT_PUBLIC_JWT_SECRET=xxx

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=xxx

# Analytics
NEXT_PUBLIC_GA_ID=xxx
\`\`\`

---

## 📚 Dépendances

### Core

\`\`\`json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.0.0"
}
\`\`\`

### UI

\`\`\`json
{
  "tailwindcss": "^4.0.0",
  "@radix-ui/react-*": "latest",
  "lucide-react": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
\`\`\`

### Charts

\`\`\`json
{
  "recharts": "^2.10.0"
}
\`\`\`

### Forms

\`\`\`json
{
  "react-hook-form": "^7.48.0",
  "@hookform/resolvers": "^3.3.0",
  "zod": "^3.22.0"
}
\`\`\`

### Utils

\`\`\`json
{
  "date-fns": "^2.30.0"
}
\`\`\`

---

## 🎯 Prochaines étapes (recommandations)

### Phase 1 : Backend API

1. **Créer API REST** (Node.js/Express ou Spring Boot)
   - Endpoints CRUD pour patients
   - Endpoints CRUD pour structures
   - Endpoints CRUD pour campagnes
   - Endpoints CRUD pour utilisateurs

2. **Base de données** (PostgreSQL)
   - Schéma complet
   - Migrations
   - Seeds

3. **Authentification**
   - JWT
   - Refresh tokens
   - Rôles et permissions

### Phase 2 : Fonctionnalités avancées

1. **Analyse IA réelle**
   - Modèle ML pour prédiction
   - API Python (FastAPI)
   - Intégration avec frontend

2. **Notifications push**
   - WebSockets ou Server-Sent Events
   - Notifications navigateur
   - Emails

3. **Mode hors-ligne**
   - Service Worker
   - IndexedDB
   - Synchronisation

### Phase 3 : Optimisations

1. **Performance**
   - Lazy loading
   - Code splitting
   - Image optimization
   - Caching

2. **SEO**
   - Meta tags
   - Sitemap
   - Structured data

3. **Monitoring**
   - Error tracking (Sentry)
   - Analytics (Google Analytics)
   - Performance monitoring

---

## 📞 Support

Pour toute question sur cette documentation ou l'application CERVIAI, contactez l'équipe de développement.

---

**Version** : 1.0.0  
**Date** : Janvier 2025  
**Auteur** : v0 by Vercel
