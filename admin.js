// Identifiants administrateur
const IDENTIFIANT_ADMIN = "admin";
const MOTDEPASSE_ADMIN = "admin123";

// Fonction de connexion
function connexionAdmin(evenement) {
    evenement.preventDefault();
    const identifiant = document.getElementById('identifiant').value;
    const motDePasse = document.getElementById('motdepasse').value;

    if (identifiant === IDENTIFIANT_ADMIN && motDePasse === MOTDEPASSE_ADMIN) {
        localStorage.setItem('adminConnecte', 'true');
        window.location.href = 'admin-dashboard.html';
    } else {
        alert('Identifiants incorrects');
    }
}

// Vérifier si l'admin est connecté
function verifierAdmin() {
    if (!localStorage.getItem('adminConnecte') && !window.location.href.includes('admin-login.html')) {
        window.location.href = 'admin-login.html';
    }
}

// Déconnexion
function deconnexion() {
    localStorage.removeItem('adminConnecte');
    window.location.href = 'admin-login.html';
}

function afficherCommandes() {
    const listeCommandes = JSON.parse(localStorage.getItem('commandes')) || [];
    const conteneurCommandes = document.getElementById('liste-commandes');
    
    if (listeCommandes.length === 0) {
        conteneurCommandes.innerHTML = '<p>Aucune commande en attente</p>';
        return;
    }

    conteneurCommandes.innerHTML = listeCommandes.map((commande, index) => `
        <div class="commande">
            <div class="infos-commande">
                <h3>Commande #${index + 1}</h3>
                <p>Date: ${commande.date}</p>
                <p>Total: ${commande.prixTotal.toFixed(2)}€</p>
                <h4>Pizzas:</h4>
                <ul>
                    ${commande.pizzas.map(pizza => `
                        <li>${pizza.quantite}x ${pizza.nom} - ${pizza.prix.toFixed(2)}€</li>
                    `).join('')}
                </ul>
            </div>
            <div class="actions-commande">
                <button onclick="validerCommande(${index})" class="bouton-valider">Valider</button>
                <button onclick="supprimerCommande(${index})" class="bouton-supprimer">Supprimer</button>
            </div>
        </div>
    `).join('');
}



// Valider une commande
function validerCommande(numeroCommande) {
    const listeCommandes = JSON.parse(localStorage.getItem('commandes')) || [];
    listeCommandes.splice(numeroCommande, 1);
    localStorage.setItem('commandes', JSON.stringify(listeCommandes));
    afficherCommandes();
}

// Supprimer une commande
function supprimerCommande(numeroCommande) {
    if (confirm('Voulez-vous vraiment supprimer cette commande ?')) {
        const listeCommandes = JSON.parse(localStorage.getItem('commandes')) || [];
        listeCommandes.splice(numeroCommande, 1);
        localStorage.setItem('commandes', JSON.stringify(listeCommandes));
        afficherCommandes();
    }
}

// Initialisation
if (document.querySelector('.admin-dashboard')) {
    verifierAdmin();
    afficherCommandes();
} 

function afficherCommandes() {
    const listeCommandes = JSON.parse(localStorage.getItem('commandes')) || [];
    const conteneurCommandes = document.getElementById('liste-commandes');
    
    if (listeCommandes.length === 0) {
        conteneurCommandes.innerHTML = '<p>Aucune commande en attente</p>';
        return;
    }

    conteneurCommandes.innerHTML = listeCommandes.map((commande, index) => `
        <div class="commande">
            <div class="infos-commande">
                <h3>Commande #${index + 1}</h3>
                <p>Date: ${commande.date}</p>
                <p>Total: ${commande.prixTotal.toFixed(2)}€</p>
                <h4>Pizzas:</h4>
                <ul>
                    ${commande.pizzas.map(pizza => `
                        <li>${pizza.quantite}x ${pizza.nom} - ${pizza.prix.toFixed(2)}€</li>
                    `).join('')}
                </ul>
            </div>
            <div class="actions-commande">
                <button onclick="validerCommande(${index})" class="bouton-valider">Valider</button>
                <button onclick="supprimerCommande(${index})" class="bouton-supprimer">Supprimer</button>
            </div>
        </div>
    `).join('');
}
