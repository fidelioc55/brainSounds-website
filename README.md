# BrainSounds

Sito statico del progetto BrainSounds, pronto per GitHub Pages. Non richiede installazioni, build, framework o servizi esterni.

## Aggiornare il sito su GitHub

1. Estrai questo archivio.
2. Carica **il contenuto** della cartella `brainSounds-website-main` nella stessa posizione in cui si trova l'attuale `index.html` del repository, sostituendo i file esistenti. Non aggiungere un ulteriore livello di cartelle.
3. Mantieni tutte le cartelle multimediali, inclusa `images/posters`.
4. Esegui il commit. Se GitHub Pages è già configurato, il sito verrà aggiornato dal normale processo di pubblicazione del repository.

## Anteprima locale

Apri `index.html` nel browser oppure, dalla cartella del progetto, esegui:

```bash
python3 -m http.server 8000
```

Poi apri http://localhost:8000.

## File principali

- `index.html`: testi, autori e affiliazioni, esempi audio, figure e collegamenti.
- `style.css`: layout, colori e regole per desktop e mobile.
- `script.js`: filtri, riproduzione audio esclusiva, sincronizzazione degli spettrogrammi, animazioni e ingrandimento figure.
- `images/posters/`: anteprime leggere degli spettrogrammi e delle sequenze di denoising.
- `audio_see/`, `denoise_gifs/`, `images/`: risorse originali preservate.

## Modifiche incluse

- Nuovo layout responsive, navigazione alle sezioni e gerarchia tipografica.
- Cinque autori e affiliazioni inseriti dall'immagine fornita, con contatto per Matteo Ciferri.
- Nove esempi audio confrontabili e filtrabili per tipo di suono.
- Avvio manuale dei media; un solo audio alla volta; spettrogramma associato all'ascolto. Con la preferenza di sistema per movimento ridotto, lo spettrogramma resta statico.
- Percorsi delle prime due GIF corretti e sei sequenze attivabili manualmente.
- Sezione sulle contribuzioni corticali, usando la figura già presente.
- Figure ingrandibili con dialogo richiudibile anche con Escape.
- Nessun CDN, font remoto o dipendenza JavaScript.

## Note editoriali

I collegamenti al paper OpenReview e al repository anonimo sono quelli del sito originale; non sono stati sostituiti con URL ipotetici. Sostituisci entrambi i link al codice in `index.html` quando avrai un repository pubblico definitivo.

Il testo introduttivo è una descrizione sintetica del framework, non un abstract ufficiale. Le quantità del dataset provengono dalla slide già inclusa. Le affiliazioni riproducono l'immagine fornita; la nota di contributo uguale è applicata agli asterischi di Nicola Toschi ed Elia Formisano.

Le etichette dei filtri raggruppano gli esempi per navigazione; non sostituiscono le sei categorie sperimentali del dataset.
