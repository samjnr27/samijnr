// Variables globale
let monPanier = JSON.parse(localStorage.getItem('monPanier')) || [];

// Fonction pour ajouter une pizza au panier
function ajouterPizza(idPizza, nomPizza, prixPizza, imagePizza) {
    // Récupérer la quantité
    const nombrePizza = parseInt(document.querySelector('.quantite input').value);
    
    // Verifier si la pizza existe déjà
    const pizzaExistante = monPanier.find(pizza => pizza.id === idPizza);
    
    if (pizzaExistante) {
        pizzaExistante.quantite += nombrePizza;
    } else {
        monPanier.push({ 
            id: idPizza, 
            nom: nomPizza, 
            prix: prixPizza, 
            image: imagePizza, 
            quantite: nombrePizza 
        });
    }
    
    // Sauvegarder
    localStorage.setItem('monPanier', JSON.stringify(monPanier));
    mettreAJourNombrePanier();
    alert('Pizza ajoutée au panier !');
}

// Fonction pour mettre à jour le nombre affiché
function mettreAJourNombrePanier() {
    const nombreTotal = monPanier.reduce((total, pizza) => total + pizza.quantite, 0);
    const affichageNombre = document.getElementById('nombre-panier');
    if (affichageNombre) {
        affichageNombre.textContent = nombreTotal;
    }
}

// Fonction pour afficher le panier
function afficherPanier() {
    const listePizzas = document.getElementById('liste-panier');
    const panierVide = document.getElementById('message-vide');
    const totalPanier = document.getElementById('total-panier');
    
    if (!listePizzas) return;
    
    if (monPanier.length === 0) {
        panierVide.style.display = 'block';
        listePizzas.style.display = 'none';
        totalPanier.style.display = 'none';
        return;
    }
    
    panierVide.style.display = 'none';
    listePizzas.style.display = 'block';
    totalPanier.style.display = 'block';
    
    listePizzas.innerHTML = monPanier.map(pizza => `
        <div class="pizza-panier">
            <img src="${pizza.image}" alt="${pizza.nom}">
            <div class="infos-pizza">
                <h3>${pizza.nom}</h3>
                <p>Prix : ${pizza.prix}€</p>
                <p>Quantité : ${pizza.quantite}</p>
                <p>Total : ${(pizza.prix * pizza.quantite).toFixed(2)}€</p>
            </div>
            <button onclick="supprimerPizza('${pizza.id}')" class="bouton-supprimer">
                Supprimer
            </button>
        </div>
    `).join('');
    
    const prixTotal = monPanier.reduce((total, pizza) => total + (pizza.prix * pizza.quantite), 0);
    document.getElementById('prix-total').textContent = prixTotal.toFixed(2);
}

// Fonction pour supprimer une pizza
function supprimerPizza(idPizza) {
    monPanier = monPanier.filter(pizza => pizza.id !== idPizza);
    localStorage.setItem('monPanier', JSON.stringify(monPanier));
    mettreAJourNombrePanier();
    afficherPanier();
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    mettreAJourNombrePanier();
    afficherPanier();
    
    // Gestion des boutons + et -
    const boutonMoins = document.querySelector('.moins');
    const boutonPlus = document.querySelector('.plus');
    const champQuantite = document.querySelector('.quantite input');
    
    if (boutonMoins && boutonPlus && champQuantite) {
        boutonMoins.addEventListener('click', () => {
            const valeurActuelle = parseInt(champQuantite.value);
            if (valeurActuelle > 1) {
                champQuantite.value = valeurActuelle - 1;
            }
        });
        
        boutonPlus.addEventListener('click', () => {
            const valeurActuelle = parseInt(champQuantite.value);
            champQuantite.value = valeurActuelle + 1;
        });
    }
});

// Gestion de la commande
document.getElementById('commander')?.addEventListener('click', function() {
    if (monPanier.length === 0) {
        alert('Votre panier est vide');
        return;
    }

    const nouvelleCommande = {
        date: new Date().toLocaleString(),
        pizzas: [...monPanier],
        prixTotal: monPanier.reduce((total, pizza) => total + (pizza.prix * pizza.quantite), 0),
        etat: 'en attente'
    };

    const listeCommandes = JSON.parse(localStorage.getItem('commandes')) || [];
    listeCommandes.push(nouvelleCommande);
    localStorage.setItem('commandes', JSON.stringify(listeCommandes));

    monPanier = [];
    localStorage.setItem('monPanier', JSON.stringify(monPanier));

    window.location.href = 'confirmation.html';
}); 
