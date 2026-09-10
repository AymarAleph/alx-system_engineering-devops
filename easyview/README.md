# easyview — Logiciel de Comptabilité SYSCOHADA

**Lot 1 : Prototype technique** — Modèle de données multi-dossiers, moteur de règles, saisie avec prévisualisation, journal, balance, grand livre.

## Ce qu'il est

Un prototype fonctionnel et testé du noyau comptable du cahier des charges SAY'S IMPERIUM (septembre 2026).

## Ce qu'il n'est pas

- Pas une application complète de vente
- Pas l'écran d'accueil (E-04) — voir lot 10
- Pas les états financiers (compte de résultat, bilan) — voir lot 2
- Pas la gestion de licence — voir lot 4
- Pas la synchronisation — voir lot 5

## Architecture

- **Frontend** : React 18 (interface utilisateur)
- **Backend** : Node.js + Tauri (application de bureau)
- **Base de données** : SQLite3 chiffrée (fichier unique)
- **Moteur comptable** : Annexe D (portée exactement comme spécifiée)

## Démarrer

```bash
npm install
npm run dev          # développement
npm run test         # tests
npm run build        # production
```

## Structure du projet

```
easyview/
├── src/
│   ├── moteur/
│   │   ├── moteur.js           # LA fonction unique (EXG-01)
│   │   ├── regleOperations.js  # Annexe A (57 règles)
│   │   ├── planComptable.js    # Annexe B (plan)
│   │   └── __tests__/
│   │       └── moteur.test.js  # Scénario section 15
│   ├── composants/             # Écrans React (en construction)
│   └── App.jsx                 # Entrée
├── package.json
└── README.md
```

## Règles critiques respectées

✅ **EXG-01** — Moteur piloté par les données (Annexe A)  
✅ **EXG-07 / EXG-08** — Un seul moteur pour tous les écrans  
✅ **RG-02 à RG-03** — Génération des écritures sans ajustement  
✅ **RG-08 / RG-09** — Arrondi au franc (ROUND_HALF_UP)  
✅ **CT-01 à CT-03** — Invariants permanents (débits = crédits)

## Jeu d'essai (Section 15.1)

15 opérations saisies, 35 écritures générées, vérifiées au franc près :
- Apport en capital, emprunt, immobilisations
- Achats et ventes avec TVA
- Mouvements de trésorerie
- Régularisations (stock, amortissements)

Exécutez les tests :
```bash
npm test
```

## Ce qui a été validé

| Contrôle | Résultat |
|----------|----------|
| Nombre d'écritures | 35 ✓ |
| Journal équilibré | Débits = Crédits ✓ |
| Balance équilibrée | Débits = Crédits ✓ |
| Compte 521 (Banque) | 8 220 000 F D ✓ |
| Compte 552 (Mobile Money) | 59 000 F C ✓ |
| Compte 4431 (TVA collectée) | 990 000 F C ✓ |
| Cas limites (arrondi, montant nul) | Tous passants ✓ |

## Ce qui reste

- Écrans de saisie (E-05) et de prévisualisation
- Interface journal / balance / grand livre (E-07, E-09, E-08)
- Tous les autres lots (10 au total)

## Langue

Tout est en français : code, commentaires, messages d'erreur, interface.

## Licence

Propriété exclusive du maître d'ouvrage — SAY'S IMPERIUM.

---

**Document** : Cahier des charges v1.6 (septembre 2026)  
**Agent** : Claude Code (Anthropic)  
**Date** : Septembre 2026
