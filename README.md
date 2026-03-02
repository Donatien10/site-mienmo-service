# MIENMO-SERVICE - Plateforme de Vente en Ligne

## 🎯 Description Générale

MIENMO-SERVICE est une plateforme de e-commerce statique complète permettant de gérer plusieurs catégories de produits : cartes de mariage, ordinateurs, voitures, pagnes baoulé et librairie. Le site offre un système de commande avec notification par email et WhatsApp.

## 🌟 Fonctionnalités Actuelles

### ✅ Fonctionnalités Implémentées

1. **Design Multi-catégories**
   - 5 catégories principales : Cartes, Ordinateurs, Voitures, Pagnes, Librairie
   - Thème de couleurs : Jaune (#FFD700), Bleu (#0066CC), Noir (#1A1A1A)
   - Design responsive et moderne

2. **Système de Commande**
   - Formulaire de commande avec validation
   - Calcul automatique du total
   - Sélection de la quantité et méthode de paiement
   - Validation en temps réel des champs

3. **Notifications**
   - Envoi d'email à mfesdona025@gmail.com avec tous les détails
   - Notification WhatsApp sur le numéro 0566015174
   - Numéro de commande unique généré automatiquement

4. **Navigation**
   - Menu de navigation sticky
   - Scroll fluide entre sections
   - Mise en surbrillance de la section active

5. **Informations de Contact**
   - Téléphone : 0758001824
   - WhatsApp : 0566015174
   - Email : mfesdona025@gmail.com

## 📁 Structure des Fichiers

```
/
├── index.html              # Page principale complète
├── css/
│   └── style.css          # Styles avec thème jaune/bleu/noir
├── js/
│   └── main.js            # JavaScript avec système de commande
└── README.md              # Documentation
```

## 🛍️ Catégories de Produits

### 1. Cartes
- Cartes de mariage personnalisées (500 FCFA)
- Cartes de visite professionnelles (250 FCFA)

### 2. Ordinateurs
- Ordinateur Portable HP Pavilion (450.000 FCFA)
- Souris sans fil USB (5.000 FCFA)

### 3. Voitures
- Toyota Corolla 2020 (3.500.000 FCFA)
- Location de voiture avec chauffeur (30.000 FCFA/jour)

### 4. Pagnes Baoulé
- Pagne traditionnel (15.000 FCFA)
- Ensemble pagne + foulard (20.000 FCFA)

### 5. Librairie
- Livres scolaires (2.500 FCFA)
- Cahiers 96 pages (1.000 FCFA)

## 💳 Méthodes de Paiement

- MTN Mobile Money
- Orange Money
- Paiement à la livraison

## 📧 Système de Notification

### Email
Lors d'une commande, un email est envoyé à mfesdona025@gmail.com contenant :
- Numéro de commande unique
- Détails du produit et prix
- Informations complètes du client
- Méthode de paiement choisie
- Date et heure de la commande

### WhatsApp
Notification instantanée sur WhatsApp avec :
- Nom du produit commandé
- Quantité et prix total
- Nom et téléphone du client
- Numéro de commande

## 🎨 Personnalisation des Couleurs

Le site utilise un thème de couleurs personnalisables via les variables CSS :

```css
:root {
    --primary-yellow: #FFD700;
    --primary-blue: #0066CC;
    --primary-black: #1A1A1A;
    --secondary-yellow: #FFA500;
    --secondary-blue: #004080;
}
```

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints pour :
- Desktop (1200px+)
- Tablette (768px - 1199px)
- Mobile (< 768px)

## 🚀 Fonctionnalités JavaScript

### Système de Commande
```javascript
// Ouvrir le modal de commande
openOrderModal('Nom du produit', 'Prix')

// Soumettre une commande
submitOrder(event)

// Calcul automatique du total
updateTotal()
```

### Navigation
```javascript
// Navigation fluide entre sections
initializeNavigation()

// Mise à jour de la navigation active
updateActiveNavigation()
```

### Notifications
```javascript
// Envoyer email de commande
sendOrderEmail(orderData)

// Envoyer notification WhatsApp
sendWhatsAppNotification(orderData)
```

## 📞 Informations de Contact

- **Téléphone** : 0758001824
- **WhatsApp** : 0566015174
- **Email** : mfesdona025@gmail.com
- **Nom du site** : MIENMO-SERVICE

## 🛠️ Installation et Utilisation

1. **Télécharger les fichiers**
   - Télécharger `index.html`, `css/style.css`, et `js/main.js`

2. **Ouvrir le site**
   - Ouvrir `index.html` dans un navigateur web
   - Le site fonctionne localement sans serveur

3. **Tester une commande**
   - Cliquer sur "Commander" sur n'importe quel produit
   - Remplir le formulaire de commande
   - Le système enverra automatiquement les notifications

## 🔧 Personnalisation

### Modifier les coordonnées
Dans `js/main.js`, modifier la constante CONFIG :
```javascript
const CONFIG = {
    EMAIL_TO: 'votre-email@gmail.com',
    WHATSAPP_NUMBER: '225votre-numero',
    COMPANY_NAME: 'VOTRE-ENTREPRISE'
};
```

### Ajouter de nouveaux produits
Dans `index.html`, ajouter un nouveau produit dans la section appropriée :
```html
<div class="product-card">
    <div class="product-image">
        <i class="fas fa-product-icon fa-3x"></i>
    </div>
    <h3>Nom du produit</h3>
    <p>Description du produit</p>
    <div class="price">Prix en FCFA</div>
    <button class="btn-order" onclick="openOrderModal('Nom', 'Prix')">Commander</button>
</div>
```

## 📊 Statistiques et Suivi

Le site génère automatiquement :
- Numéros de commande uniques
- Horodatage des commandes
- Logs de débogage dans la console

## 🛡️ Sécurité

- Validation côté client des formulaires
- Échappement des caractères spéciaux
- Vérification des numéros de téléphone

## 🎯 Améliorations Futures Recommandées

1. **Système de Gestion des Stocks**
   - Ajouter une base de données pour gérer les inventaires
   - Mise à jour automatique des quantités disponibles

2. **Espace Administrateur**
   - Tableau de bord pour gérer les commandes
   - Statistiques de ventes
   - Gestion des produits

3. **Paiement en Ligne**
   - Intégration avec des API de paiement (MTN, Orange)
   - Confirmation de paiement automatique

4. **Système de Comptes Clients**
   - Inscription et connexion
   - Historique des commandes
   - Suivi des livraisons

5. **Optimisations**
   - Images optimisées pour chaque produit
   - Cache navigateur
   - Performance mobile

## 📄 Licence

Ce projet est créé pour MIENMO-SERVICE et est destiné à un usage commercial.

## 🆘 Support

Pour toute question ou assistance :
- Téléphone : 0758001824
- WhatsApp : 0566015174
- Email : mfesdona025@gmail.com

---

**Dernière mise à jour :** Février 2024
**Version :** 1.0.0
**Auteur :** MIENMO-SERVICE