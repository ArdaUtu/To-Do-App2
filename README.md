# To-Do App

Een kleine React-applicatie voor het maken, bewerken en beheren van notities en checklists. De app maakt het eenvoudig om taken te volgen, tekstnotities aan te maken en checklist-items te markeren als afgerond.

## Functionaliteiten

- Tekstnotities aanmaken en verwijderen
- Checklist-notities met optionele beschrijving
- Checklist-items toevoegen, bewerken, aan/uitvinken en verwijderen
- Notitie-titels en inhoud aanpassen
- Responsieve interface met moderne UI
- Gebouwd met React + TypeScript + Vite

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS

## Voorbeeld van de structuur

```text
src/
├── App.tsx
├── components/
│   ├── AddNoteForm.tsx
│   ├── ChecklistEditForm.tsx
│   ├── ChecklistItemForm.tsx
│   ├── ChecklistItemRow.tsx
│   ├── ChecklistNoteCard.tsx
│   ├── ChecklistProgress.tsx
│   ├── NoteCard.tsx
│   ├── NoteList.tsx
│   ├── TextNoteCard.tsx
│   └── TextNoteEditForm.tsx
├── hooks/
│   └── useClickOutside.ts
├── images/
├── Types/
│   ├── noteUtils.ts
│   ├── types.ts
│   └── useNotes.ts
└── main.tsx
```

## Installatie

Zorg eerst dat je Node.js en npm hebt geïnstalleerd.

```bash
npm install
```

## Uitvoeren in development modus

```bash
npm run dev
```

Dan open je je browser op:

```text
http://localhost:5173
```

## Build

Voor een productiebuild:

```bash
npm run build
```

Om de productiebuild lokaal te bekijken:

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

## Gebruik

1. Kies een notietype: tekst of checklist.
2. Vul een titel in en een inhoud of beschrijving.
3. Klik op "Add" om de notitie toe te voegen.
4. Bewerk of verwijder notities via de kaartacties.
5. Voor checklist-items kun je deze aanvinken, bewerken of verwijderen.

## Opmerking

Deze app gebruikt lokaal state in React en bewaart de notities niet automatisch in de browser's localStorage. Als je wilt, kan ik hier ook nog een versie mee maken waarbij de notities blijven staan na een refresh.
