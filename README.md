# HarryPotterPort
Pircel Tech Test

A simple houses list showdown, from the Harry Potter Universe, web application where users can: 
 - view the extended list of the houses and their properties.
 - search the list using a simple search input field that sends the search query to the backend. The backend responds with a filtered, shorter list of results that match the search criteria.
 - search among the traits of each house.
 
 Built with Next.js/TailwindCSS on the frontend and Node.js/Express on the backend.

1. On _load_ the user is presented with a complete list of all hoyses AND an search input to type and search for houses inside that list:
   - Typing will wait for a few second and if the input hasn't changed a querry will be sent to fetch the filterd list of houses.
   - If between a predifined time the inputs changes, a cancel singal is being sent to cancel the previous request and sent a new one with the new search input.
2. When a querry has been sent and while the data are being fetched:
   - Aa spinner next to the input field indicates the waiting time.
   - Additionally, a skeleton page of card in a grid is being shown for better UX.
3. When a question arrives on the server side, we are filter the cached list for specific substrings inside the name of the houses and, based on the matched ones, we determine the list as a response.
4. The reponse arrives in the next app and at that point a next list of houses is being stored using zustand and displayed to the user.
5. Each house card has an inner input filed, which gets the input and filters the list of traits of each house.

Note: a fake delay has been added in the node.js app (server-side), when processing the server-response, to give the user the belief that we are actually acting on the related information, also a small debounce hook has been used to limit the input field changes.

## How to run

1. **Install all dependencies:**

- Node.js v22.15.0 or higher required

  ```bash
  npm run install:all
  ```

2. **Set up environment variables (in reality this is optional, there are default fallbacks):**

   ```bash
   # In the backend directory
   cp .env.example .env
   ```

   This will create a `.env` file with the necessary environment variables. Make sure to update any values if needed.

3. **Start both frontend and backend servers:**
   ```bash
   npm run start
   ```

The application will be available at:

- Frontend: [http://localhost:4200](http://localhost:3000)
- Backend: [http://localhost:3002](http://localhost:3002)

### Additional Commands

- **Clean up all node_modules:**
  ```bash
  npm run cleanup
  ```
  This will remove all `node_modules` directories from the root, backend, and frontend folders. Useful for doing a clean reinstall of dependencies.

## How to test

### Frontend

Tests are written using `jest`.

To run frontend tests:

```bash
cd front_end && npm run test
```

### Backend

Tests are written using `jest`.

To run backend tests:

```bash
cd back_end && npm run test
```

Tests cover:

- Prompt validation
- Response matching
- Front end filtering

### File structure (simplified)

```
├─ README.md
├─ package-lock.json
├─ package.json
├─ back_end
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ server.js
│  ├─ jest.config.js
│  └─ src
│     ├─ app.js
│     ├─ cahce
|     │  └─ house.cache.js
│     ├─ controllers
│     │  ├─ house.controller.test.js
│     │  └─ house.controller.js
│     └─ routes
│        └─ housesRoutes.js
└─ front_end
   ├─ README.md
   ├─ eslint.config.mjs
   ├─ jest.config.js
   ├─ jest.setup.js
   ├─ next-env.d.ts
   ├─ next.config.ts
   ├─ package-lock.json
   ├─ package.json
   ├─ postcss.config.mjs
   ├─ tailwind.config.js
   ├─ tsconfig.json
   └─ src
      ├─ components
      │  ├─ houseCard.tsx
      │  ├─ houseCard.test.tsx
      │  ├─ houseCardSkeleton.tsx
      │  ├─ houseCardSkeletonGrid.tsx      
      │  ├─ houseList.tsx
      │  ├─ searchInput.tsx
      │  ├─ spinnerComponent.tsx
      |  └─ snapshots
      |     └─ houseCard.test.tsx.snap
      ├─ content
      |  ├─ houses.content.ts
      |  └─ index.ts
      ├─ hooks
      │  ├─ useDebounce.ts
      │  ├─ useContent.ts
      │  └─ useHouses.ts
      ├─ models
      │  ├─ head.interface.ts
      │  ├─ content.interface.ts
      │  ├─ house.interface.ts
      │  └─ trait.interface.ts
      ├─ store
      |  └─ house.store.ts
      └─ pages
         ├─ _app.tsx
         ├─ globals.css
         └─ index.tsx

```

### Tech stack

- Next.JS v15
- Node.JS
- Express.JS
- Tailwind
- Jest
- Zustand

### Environmental Variables

Frontend:

| Name                  | Description      |
| --------------------- | ---------------- |
| `NEXT_PUBLIC_API_URL` | local server uri |

Backend:

| Name                  | Description       |
| --------------------- | ----------------- |
| `PORT`                | local server port |
| `CACHE_URL`           | data server api   |

## Optimization

- Used AbortController to cancel the request, if the search input changes withing specific time.
- Used Zustand to store data that multiple components can access without passing props but with a simple hook, so there is no need to thread data through components.
- Used URLSearchParams and next/navigation to keep search input in sync with query stringa and to update searchValue from URL on load/navigation
- Updated router.push to update the URL without full page reload on search input change.
- Refactored backend to separate routing (`house.routes.js`) from business logic (`house.controller.js`)
- Skeleton grid along with spinner component for better UX.
- Used a clean module-based architecture for search functionality.
- Used tailwind to customized all of the components and make it responsible to different resolutions.
- Jest test were introduced to evaluate the back end and the front end after significant changes. 

## Future Work
