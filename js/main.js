// Configuration
const CONFIG = {
    EMAIL_TO: 'mfesdona025@gmail.com',
    EMAIL_SUBJECT: 'Nouvelle commande MIENMO-SERVICE',
    WHATSAPP_NUMBER: '2250566015174',
    COMPANY_NAME: 'MIENMO-SERVICE'
};

// État de l'application
let currentOrder = {};

// Initialisation du site
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    console.log('MIENMO-SERVICE - Site initialisé avec succès');
});

// Navigation smooth scroll
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Retirer la classe active de tous les liens
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Obtenir la cible du lien
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajustement pour la nav fixe
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mise à jour de la navigation au scroll
    window.addEventListener('scroll', updateActiveNavigation);
}

// Mise à jour de la navigation active selon le scroll
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Effets de scroll
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animateElements = document.querySelectorAll('.category-card, .product-card');
    animateElements.forEach(el => observer.observe(el));
}

// Ouvrir le modal de commande
function openOrderModal(productName, price) {
    const modal = document.getElementById('orderModal');
    const productNameInput = document.getElementById('productName');
    const priceInput = document.getElementById('price');
    
    // Remplir les informations du produit
    productNameInput.value = productName;
    priceInput.value = price;
    
    // Calculer le total initial
    updateTotal();
    
    // Afficher le modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Stocker les informations de la commande actuelle
    currentOrder = {
        productName: productName,
        price: price,
        timestamp: new Date().toISOString()
    };
}

// Fermer le modal de commande
function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Réinitialiser le formulaire
    document.getElementById('orderForm').reset();
}

// Mettre à jour le total
function updateTotal() {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const priceText = document.getElementById('price').value;
    const price = parseFloat(priceText.replace(/[^0-9]/g, ''));
    const total = quantity * price;
    
    document.getElementById('total').value = total.toLocaleString() + ' FCFA';
}

// Soumettre la commande
async function submitOrder(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const orderData = {
        productName: formData.get('productName'),
        price: formData.get('price'),
        quantity: formData.get('quantity'),
        total: document.getElementById('total').value,
        customerName: formData.get('customerName'),
        customerPhone: formData.get('customerPhone'),
        customerEmail: formData.get('customerEmail') || 'Non fourni',
        customerAddress: formData.get('customerAddress'),
        paymentMethod: formData.get('paymentMethod'),
        notes: formData.get('notes') || 'Aucune note',
        orderDate: new Date().toLocaleString('fr-FR'),
        orderId: generateOrderId()
    };
    
    // Afficher l'état de chargement
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    
    try {
        // Envoyer l'email
        await sendOrderEmail(orderData);
        
        // Envoyer la notification WhatsApp
        await sendWhatsAppNotification(orderData);
        
        // Fermer le modal de commande
        closeOrderModal();
        
        // Afficher le modal de succès
        showSuccessModal();
        
        console.log('Commande envoyée avec succès:', orderData);
        
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la commande:', error);
        alert('Une erreur est survenue lors de l\'envoi de votre commande. Veuillez réessayer ou nous contacter directement.');
    } finally {
        // Réinitialiser le bouton
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Générer un ID de commande unique
function generateOrderId() {
    const date = new Date();
    const dateStr = date.getFullYear().toString() + 
                   (date.getMonth() + 1).toString().padStart(2, '0') + 
                   date.getDate().toString().padStart(2, '0');
    const randomStr = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `CMD-${dateStr}-${randomStr}`;
}

// Envoyer l'email de commande
async function sendOrderEmail(orderData) {
    const emailBody = `
NOUVELLE COMMANDE - ${CONFIG.COMPANY_NAME}
=====================================

📋 DÉTAILS DE LA COMMANDE:
• Numéro de commande: ${orderData.orderId}
• Date: ${orderData.orderDate}
• Produit: ${orderData.productName}
• Prix unitaire: ${orderData.price}
• Quantité: ${orderData.quantity}
• Total: ${orderData.total}

👤 INFORMATIONS CLIENT:
• Nom: ${orderData.customerName}
• Téléphone: ${orderData.customerPhone}
• Email: ${orderData.customerEmail}
• Adresse: ${orderData.customerAddress}

💳 MODE DE PAIEMENT:
• ${getPaymentMethodName(orderData.paymentMethod)}

📝 NOTES:
${orderData.notes}

=====================================
Ce message a été envoyé depuis le site web ${CONFIG.COMPANY_NAME}
    `.trim();
    
    // Utiliser EmailJS pour envoyer l'email
    if (typeof emailjs !== 'undefined') {
        try {
            await emailjs.send('service_default', 'template_order', {
                to_email: CONFIG.EMAIL_TO,
                subject: `${CONFIG.EMAIL_SUBJECT} - ${orderData.orderId}`,
                message: emailBody,
                customer_name: orderData.customerName,
                customer_phone: orderData.customerPhone,
                product_name: orderData.productName,
                quantity: orderData.quantity,
                total: orderData.total,
                order_id: orderData.orderId
            });
            return true;
        } catch (error) {
            console.error('Erreur EmailJS:', error);
            // Fallback vers mailto
            return sendEmailViaMailto(orderData, emailBody);
        }
    } else {
        // Fallback vers mailto
        return sendEmailViaMailto(orderData, emailBody);
    }
}

// Envoyer l'email via mailto (fallback)
function sendEmailViaMailto(orderData, emailBody) {
    const subject = encodeURIComponent(`${CONFIG.EMAIL_SUBJECT} - ${orderData.orderId}`);
    const body = encodeURIComponent(emailBody);
    
    window.location.href = `mailto:${CONFIG.EMAIL_TO}?subject=${subject}&body=${body}`;
    return Promise.resolve(true);
}

// Envoyer la notification WhatsApp
async function sendWhatsAppNotification(orderData) {
    const message = `
Nouvelle commande sur ${CONFIG.COMPANY_NAME}:

${orderData.productName}
Quantité: ${orderData.quantity}
Total: ${orderData.total}

Client: ${orderData.customerName}
Téléphone: ${orderData.customerPhone}

Commande: ${orderData.orderId}
    `.trim();
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
    return Promise.resolve(true);
}

// Obtenir le nom de la méthode de paiement
function getPaymentMethodName(method) {
    const methods = {
        'mtn': 'MTN Mobile Money',
        'orange': 'Orange Money',
        'cash': 'Paiement à la livraison'
    };
    return methods[method] || method;
}

// Afficher le modal de succès
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fermer le modal de succès
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fermer les modals en cliquant en dehors
document.addEventListener('click', function(event) {
    const orderModal = document.getElementById('orderModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === orderModal) {
        closeOrderModal();
    }
    if (event.target === successModal) {
        closeSuccessModal();
    }
});

// Fermer les modals avec la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeOrderModal();
        closeSuccessModal();
    }
});

// Validation du formulaire en temps réel
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orderForm');
    if (form) {
        // Validation du téléphone
        const phoneInput = document.getElementById('customerPhone');
        phoneInput.addEventListener('input', function() {
            // Accepter uniquement les chiffres et les espaces
            this.value = this.value.replace(/[^0-9\s]/g, '');
        });
        
        // Validation de la quantité
        const quantityInput = document.getElementById('quantity');
        quantityInput.addEventListener('change', function() {
            if (this.value < 1) {
                this.value = 1;
            }
            updateTotal();
        });
    }
});

// Fonction utilitaire pour formater les prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0
    }).format(price);
}

// Fonction pour obtenir la date actuelle formatée
function getCurrentDateTime() {
    return new Date().toLocaleString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Fonction pour afficher une notification toast (alternative aux alert)
function showToast(message, type = 'info') {
    // Créer l'élément toast s'il n'existe pas
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 3000;
            max-width: 350px;
        `;
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        background: ${type === 'success' ? '#28A745' : type === 'error' ? '#DC3545' : '#0066CC'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Animation d'entrée
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Logos et branding
const SITE_BRANDING = {
    name: 'MIENMO-SERVICE',
    tagline: 'Vente en ligne - Livraison partout',
    colors: {
        primary: '#FFD700', // Jaune
        secondary: '#0066CC', // Bleu
        accent: '#1A1A1A' // Noir
    },
    contact: {
        phone: '0758001824',
        whatsapp: '0566015174',
        email: 'mfesdona025@gmail.com'
    }
};

// Export pour utilisation externe
window.MIENMO_SERVICE = {
    openOrderModal,
    closeOrderModal,
    submitOrder,
    showToast,
    formatPrice,
    CONFIG,
    SITE_BRANDING
};

console.log('🚀 MIENMO-SERVICE - Système de commande en ligne chargé');
console.log('📞 Contact: 0758001824 | WhatsApp: 0566015174');
console.log('📧 Email: mfesdona025@gmail.com');