# Canivete

My personal hub of daily-use web apps, a Swiss Army knife for the small tools I reach for every day.

**[Live version](https://daviarendreis.github.io/Canivete/)**

## Why I built it

I had a handful of small apps I'd built for myself, scattered across different places. The problem wasn't the apps, it was the friction: opening and switching between them took just enough effort that I stopped using them. So I brought them all into a single hub, dropped the barrier to zero, and Canivete became a tool I actually use every day, pinned to my desktop.

It started in vanilla JavaScript and was rebuilt from scratch in React + TypeScript as I grew as a developer. The rebuild wasn't just a rewrite, it was a chance to make deliberate architecture decisions, which are the part of this project I'm most proud of (see [Architecture](#architecture-decisions)).

## What's inside

- **Hub** - a dashboard that surfaces a live summary of every app at a glance: the next priority task, how many habits are left today, the month's balance, the most recently edited note. One place to see where everything stands before diving in.
- **Todo** - a task list where each task carries a name, description, time and priority (low / medium / high). The hub reads these to show you what to do next.
- **Tracker** - a habit tracker with streaks. Each habit has its own name, color and streak count, plus a GitHub-style contribution graph, built by hand with CSS, to visualize consistency over time.
- **Finance** - transaction tracking with income and expenses. Add transactions through a form (description, amount, type, category), see your month balance, filter by category, and read your spending at a glance through a category breakdown chart.
- **Notes** - a note editor organized into notebooks, with three level navigation (notebooks -> notes in a notebook -> note content). Notes can be moved between notebooks and searched by title.

## Tech

- **React + TypeScript** - the foundation, rebuilt from an earlier vanilla JS version.
- **React Router** - nested routing, including the three level navigation inside Notes.
- **Context API** - shared state, lifted to the app root so the Hub dashboard can read from every app at once.
- **Radix UI** - accessible, composable interface primitives.
- **Recharts** - data visualization (the Finance category breakdown chart).
- **Day.js** - date handling across the apps.
- **localStorage** - client side persistence, with read time migration for evolving data shapes.

Deployed on GitHub Pages.

## Architecture decisions

The two decisions I put the most thought into:

**Data modeling by reference.** Entities point to each other by id rather than nesting. A note holds a `notebookId` instead of a notebook holding an array of notes, which keeps operations like moving a note between notebooks down to a single field change, and avoids duplicated state. The same relational thinking runs through the other apps.

**Read-time data migration.** As the data shape evolved (switching ids to UUIDs, adding `createdAt` / `updatedAt` to notes), older records already saved in `localStorage` would have broken. Instead of wiping them, the app migrates each record as it's read, so existing data upgrades itself transparently and nothing is lost between versions.

## Status

Fully rebuilt in React + TypeScript. All five apps - Hub, Todo, Tracker, Finance and Notes - are complete and live.

---

Built and maintained by [Davi Arend Reis](https://github.com/daviarendreis).