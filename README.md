# DNS on Block
Ce document présente les méthodes d'installation et d'utilisation de notre projet. Il vous suffit de cloner le projet depuis ce github pour accéder aux services proposés

### Table des matières

1. Extension
	1. Installation
	2. Utilisation
2. Site Web
	1. Installation
	2. Utilisation

# Extension
## Installation
Pour utiliser notre extension, rendez vous dans le dossier *extension*.
L'extension ne fonctionne **qu'avec Firefox**. Pour l'installer taper dans la barre d'URL `about:debugging`.  Cliquez sur le lien "Ce Firefox". Le bouton *ajouter un module temporaire* permet d'installer l'extension. Naviguez jusqu'au dossier *extension* et sélectionnez le fichier `manifest.json`. Cela installera l'extension jusqu'à la prochaine fermeture du navigateur.
## Utilisation
L'utilisation de l'extension est basique. Pour chaque nom de domaine renseigné dans notre smart contract il vous faut taper `http://`suivit du nom de domaine en `.pfe`. **Attention sans `http://` l'extension ne peut pas reconnaître un nom de domaine en `.pfe`**

# Site Web
## Installation
L'installation du site web requiert `npm`et `nodejs`.
Rendez vous dans le dossier *SiteWeb* du git.
Pour installer et lancer le serveur, dans un terminal, tapez :
```bash
npm install
node index.js
```
Le site devrait alors tourner sur votre port `3000`.

### Metamask
Afin de vous connecter au site, veuillez installer l'extension [Metamask](https://metamask.io). 
Cela vous permettra de créer un wallet simplement.
Rendez vous dans réseaux et *Ajouter un réseau*. Il faudra renseigner le champs JsonRPC avec `https://data-seed-prebsc-1-s1.binance.org:8545/`.

### Obtenir des *TBNB* gratuitement
Afin de pouvoir effectuer des transactions sur notre site et la blockchain vous aurez besoin de *TBNB* (Test BNB).
Utilisant une blockchain de test, les *TBNB*  son obtenable sur le [BNB Faucet](https://testnet.binance.org/faucet-smart). Renseignez votre adresse publique trouvable dans *Metamask*, dans le champs du Faucet pour obtenir 0.2 *TBNB*. 

## Utilisation
Dans votre navigateur, rendez-vous sur `http://localhost:3000`.
Vous arriverez sur la page d'accueil du site. Pour utiliser les fonctions du site il faut se connecter à la blockchain avec le bouton connexion en haut à droite. Si la connexion s'effectue correctement, *Metamask* devrait apparaître et demander confirmation.

### Ajouter un nom de domaine à votre compte
Renseigner dans le champs prévu à cet effet votre nom de domaine. Puis cliquez sur le bouton *obtenir*. Une pop-up devrait apparaître pour vous indiquer si la transaction s'est bien passée.

> Il se peut que le compta admin ne possède plus de crédit pour créer votre nom de domaine, dans ce cas il faudra aussi recharger son adresse publique sur Faucet : 0xc96502936C79Ff1d61E00a8CBbD0352D732a31a7

 ### Changer l'adresse IP d'un nom de domaine
 Rendez vous sur la page `/dashboard`. Si vous êtes bien connecté, vos noms de domaines apparaîtrons dans la partie droite. Cliquer sur votre nom de domaine pour y appliquer une modification. 
 Le champs de texte vous permet de saisir votre nouvelle adresse IP. En cliquant sur le bouton de mise à jour *Update*, *Metamask* devrait apparaître pour vous demander de signer la transaction.
 Une fois la transaction validée vous pourrez accéder à cette nouvelle IP via votre nom de domaine ; en utilisant l'extension.
