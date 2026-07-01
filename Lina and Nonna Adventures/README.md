# Lina & Nonna Adventures

A family mini-game collection built for Lina and Nonna to play together during summer visits. The project is designed as a GitHub Pages site using plain HTML, CSS, and JavaScript, which fits GitHub Pages' static hosting model well. [web:89][web:93][web:118]

## Project idea

This game hub is centered on family bonding, storytelling, food memories, and playful activities inspired by Lina and Nonna’s connection across Texas, with roots in Mexico and Italy. [cite:78]

Planned mini-games:

- Nonna’s Kitchen — memory matching with food, family photos, and recipe prompts.
- Trip from Dallas–Fort Worth to El Paso — a road-trip board game with story spaces.
- Memory Stories — a prompt spinner for family conversation.
- Picture Puzzle — a sliding puzzle using custom family art.
- Lina & Nonna Dress-Up — a dress-up activity using cutout character sprites. [cite:83]

## Tech stack

- HTML
- CSS
- JavaScript
- GitHub Pages for hosting static files directly from the repository. [web:89][web:93][web:118]

## Suggested folder structure

```text
lina-nonna-adventures/
├── index.html
├── README.md
├── css/
├── js/
├── assets/
└── data/
```

This project can start with a simple root `index.html`, and then grow into a cleaner modular structure as the mini-games become more detailed. GitHub Pages serves `index.html` as the default landing page for a static site. [web:108][web:116]

## GitHub Pages setup

1. Create a new public GitHub repository.
2. Add `index.html` and `README.md` to the repo root.
3. Push your files to the `main` branch.
4. In **Settings → Pages**, choose the `main` branch and the root folder as the source.
5. Wait for GitHub Pages to publish the site URL. [web:89][web:99][web:118]

## Development plan

1. Keep `index.html` as the game hub and main menu.
2. Move styles into `css/` and scripts into `js/`.
3. Store prompts, cards, and event data in separate files.
4. Add Lina and Nonna cutout sprites to the puzzle and dress-up activities. [cite:83]
5. Expand each mini-game one at a time.

## Notes

- Use relative asset paths like `./assets/characters/lina-cutout.png` so the site works correctly on GitHub Pages. [web:89][web:93]
- Keep the project static and browser-based for the simplest hosting and sharing workflow. [web:93][web:118]
- This project matches your ongoing pattern of building family-friendly mini-games for GitHub-hosted web experiences. [cite:1][cite:4][cite:78]
