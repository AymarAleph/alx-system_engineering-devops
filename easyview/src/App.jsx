import React, { useState, useCallback } from 'react'
import EcranSaisie from './composants/EcranSaisie'
import Journal from './composants/Journal'
import Balance from './composants/Balance'
import GrandLivre from './composants/GrandLivre'
import './App.css'

export default function App() {
  const [operations, setOperations] = useState([])
  const [dossier, setDossier] = useState({
    nom: 'Nouveau dossier',
    tauxTva: 18,
    assujetti: true
  })
  const [ongletActif, setOngletActif] = useState('saisie')
  const [nomDossierEdition, setNomDossierEdition] = useState('')

  const handleOperationSaisie = useCallback((operation) => {
    setOperations(prev => [...prev, operation])
  }, [])

  const handleReinitialiser = useCallback(() => {
    if (window.confirm('Êtes-vous certain ? Cela supprimera toutes les opérations.')) {
      setOperations([])
    }
  }, [])

  const handleModifierNomDossier = useCallback((e) => {
    e.preventDefault()
    if (nomDossierEdition.trim()) {
      setDossier(prev => ({ ...prev, nom: nomDossierEdition }))
      setNomDossierEdition('')
    }
  }, [nomDossierEdition])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-gauche">
          <h1>easyview</h1>
          <p className="sous-titre">Logiciel comptable SYSCOHADA</p>
        </div>
        <div className="header-droit">
          <div className="dossier-info">
            <h2>{dossier.nom}</h2>
            <button
              className="btn-petit"
              onClick={() => setNomDossierEdition(dossier.nom)}
              title="Renommer le dossier"
            >
              ✎
            </button>
          </div>
          <p className="meta">
            {operations.length} opération{operations.length !== 1 ? 's' : ''} — TVA {dossier.tauxTva}%
          </p>
        </div>
      </header>

      {nomDossierEdition && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Renommer le dossier</h3>
            <form onSubmit={handleModifierNomDossier}>
              <input
                type="text"
                value={nomDossierEdition}
                onChange={e => setNomDossierEdition(e.target.value)}
                autoFocus
                className="input-modal"
              />
              <div className="modal-boutons">
                <button type="submit" className="btn-valider">Valider</button>
                <button
                  type="button"
                  className="btn-annuler"
                  onClick={() => setNomDossierEdition('')}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <nav className="app-nav">
        <button
          className={`nav-bouton ${ongletActif === 'saisie' ? 'actif' : ''}`}
          onClick={() => setOngletActif('saisie')}
        >
          Saisie (E-05)
        </button>
        <button
          className={`nav-bouton ${ongletActif === 'journal' ? 'actif' : ''}`}
          onClick={() => setOngletActif('journal')}
        >
          Journal (E-07)
        </button>
        <button
          className={`nav-bouton ${ongletActif === 'livre' ? 'actif' : ''}`}
          onClick={() => setOngletActif('livre')}
        >
          Grand Livre (E-08)
        </button>
        <button
          className={`nav-bouton ${ongletActif === 'balance' ? 'actif' : ''}`}
          onClick={() => setOngletActif('balance')}
        >
          Balance (E-09)
        </button>
        <button
          className="nav-bouton nav-reinit"
          onClick={handleReinitialiser}
          title="Réinitialiser toutes les opérations"
        >
          ↻ Réinit
        </button>
      </nav>

      <main className="app-main">
        {ongletActif === 'saisie' && (
          <EcranSaisie
            dossier={dossier}
            onOperationSaisie={handleOperationSaisie}
          />
        )}
        {ongletActif === 'journal' && (
          <Journal dossier={dossier} operations={operations} />
        )}
        {ongletActif === 'livre' && (
          <GrandLivre dossier={dossier} operations={operations} />
        )}
        {ongletActif === 'balance' && (
          <Balance dossier={dossier} operations={operations} />
        )}
      </main>
    </div>
  )
}
