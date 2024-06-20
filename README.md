# JobApp
**Leonardoken D'ALESSIO et Karl ENGELBRECHT**
## __ATTENTION !__
Afin de faire tourner le projet après l'avoir cloné, il est absolument nécéssaire de créer un fichier `db.js` dans le dossier `models` de la forme suivante : 
```javascript
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "...", //ou localhost
    user: "...",
    password: "...",
    database: "..."
});

module.exports = pool;
```


## Structure du Projet
### 1. Livrables
Les livrables du projet se trouvent dans le dossier `livrables`. Ce dossier contient notamment la partie conception, l'analyse sécurité,et un compte-rendu des tests.
### 2. Modèles
Les modèles du projet se trouvent dans le dossier `models`.
Ce dossier contient aussi le fichier de connection `db.js` vers la base de données.
### 3. Routes
Les routes se trouvent dans le dossier `routes`.
#### 3.1 Dossier `uploads`
Ce dossier  sert à garder temporairement des fichiers avant de les sauvegarder définitivement dans la base de données.
#### 3.2 `index.js`
Contient les routes pour la page d'entrée, ainsi que les différentes routes pour login et créer un compte.
#### 3.3 `users.js`
Contient la route qui gère exclusivement la création de compte dans la base de données.
#### 3.4 `admins.js`
Contient les routes pour les administrateurs
#### 3.4 `recruiters.js`
Contient les routes pour les recruteurs
#### 3.4 `applicants.js`
Contient les routes pour les candidats

### 4. Tests
Le dossier `test` contient tous les tests unitaires.
Chaque fichier de test unitaire a pour nom `nomDuModel.test.js`.
Le fichier `routes.test.js` contient les tests de routes.

### 5. Vues
Le dossier `views` contient les vues en EJS de notre projet.
#### 5.1 Vues `admin`
Vues administrateur
#### 5.2 Vues `applicant`
Vues candidat
#### 5.3 Vues `recruiter`
Vues recruteur

### 6. `app.js`
Fichier principal de l'application, contient notamment la logique de création de sessions.



