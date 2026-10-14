# Taak: ActionMenu-component maken

## Doel

Het menu knop dus Edit en Delete, staat nu twee keer bijna precies hetzelfde in de code:

- [TextNoteCard.tsx](src/components/TextNoteCard.tsx)
- [ChecklistNoteCard.tsx](src/components/ChecklistNoteCard.tsx)

Ook de bijbehorende code staat dubbel: de `isMenuOpen` state, `menuRef`, de `useClickOutside` aanroep, `menuDotsIcon` en de imports van `DotsIcon`, `EditIcon` en `TrashIcon`.

Je haalt het menu uit beide kaarten en maakt er een herbruikbaar component van: `ActionMenu`.

## Waarom de state in ActionMenu hoort

"Is het menu open?" hoeft alleen het menu zelf te weten. De kaart hoeft dat niet te weten, en `App` al helemaal niet.
Dat is hetzelfde principe als bij Fase 5: state staat zo laag mogelijk, op de plek waar hij gebruikt wordt.

De kaart bepaalt nog wel OF het menu getoond wordt (`!isEditing`) en WAT Edit en Delete doen (via callback-props).

## Stappen

1. **Maak het bestand `src/components/ActionMenu.tsx`** met deze props:

   ```ts
   interface ActionMenuProps {
     label: string; // naam van de notitie, voor de aria-label
     color: "sky" | "emerald"; // kleur van de knop
     onEdit: () => void; // wat Edit doet
     onDelete: () => void; // wat Delete doet
   }
   ```

2. **Verhuis de menu-code** van `TextNoteCard` naar `ActionMenu`: `isMenuOpen`, `menuRef`, `useClickOutside`, de icon-imports en de JSX van het menu.

3. **Sluit het menu na een klik.** Bij Edit of Delete: eerst `setIsMenuOpen(false)`, dan `onEdit()` of `onDelete()`.

4. **Zet `<ActionMenu />` in `TextNoteCard`**, op de plek waar het menu stond (binnen `{!isEditing && ...}`).

5. **Doe hetzelfde in `ChecklistNoteCard`:** menu-code weghalen, `<ActionMenu />` ervoor in de plaats.

6. **Zet `alt=""` op alle drie de icons** (⋮, Edit, Delete). De knop zegt al wat hij doet, met tekst of een `aria-label`.

## Let op: Tailwind en dynamische classes

Dit werkt **niet**:

```tsx
className={`border-${color}-200 text-${color}-800`}
```

Tailwind zoekt in je code naar complete class-namen zoals `border-sky-200`. Een class die pas tijdens runtime in elkaar wordt gezet, vindt Tailwind niet, dus die CSS wordt nooit gemaakt.

Gebruik in plaats daarvan een object met de volledige class-namen:

```ts
const colorClasses = {
  sky: "border-sky-200 text-sky-800 hover:border-sky-300 hover:bg-sky-50 focus-visible:ring-sky-100",
  emerald:
    "border-emerald-200 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-50 focus-visible:ring-emerald-100",
};
```

en daarna `colorClasses[color]` in je `className`.

## Bonus

- **Escape sluit het menu.** Luister naar `keydown` en check `event.key === "Escape"`. Tip: je kunt `useClickOutside` als voorbeeld gebruiken.
- **Toegankelijkheid:** geef de menu knop `aria-expanded={isMenuOpen}` en `aria-haspopup="menu"`, zodat een screenreader weet dat er een menu open of dicht is.
