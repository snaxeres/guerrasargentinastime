# **App Name**: Guerras Argentinas

## Core Features:

- Timeline Display: Display an interactive timeline of Argentine wars and conflicts from 1816 to the present.
- Conflict Cards: Show individual conflict cards with a title, period, and short summary.
- War Modal: Display detailed information about a conflict in a modal, including description, causes, consequences, images, and sources.
- Data Seeding: Load initial conflict data from a JSON file into Firestore.
- Firestore Integration: Connect to Firebase Firestore to retrieve and display war data.
- Search Functionality: Implement a search bar to find conflicts by name or year.
- Admin Mode Switch: A switch to allow the option to Add New wars and Conflicts. Must set config option during install, in a `.env` file. It allows the `add new wars` button to become visible.

## Style Guidelines:

- Primary color: A desaturated, warm beige (#F5F5DC) to mimic the look of aged parchment.
- Background color: An even lighter beige (#FAF9F6) to complement the primary color, creating a subtle contrast and aged feel.
- Accent color: A muted brown (#A67B5B) for headings and important details, evoking an antique encyclopedic vibe.
- Body and headline font: 'Literata' serif font for titles and body text, providing a classic and readable style.
- Use simple, historical-style icons to represent different conflict types.
- Mobile-first, responsive design to ensure compatibility across devices.
- Subtle transitions for smooth scrolling and modal opening/closing.