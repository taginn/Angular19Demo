# Coding Standards for Angular (TypeScript) Projects

## 1. File and Folder Structure
- Use feature-based folder structure.
- Group related files (component, service, state, etc.) together.

## 2. Naming Conventions
- Use `camelCase` for variables and functions.
- Use `PascalCase` for classes, interfaces, and components.
- Use `kebab-case` for file and folder names.
- Suffix Angular components with `.component.ts`, services with `.service.ts`, and state files with `.actions.ts`, `.reducer.ts`, `.effects.ts`, `.selectors.ts`.

## 3. TypeScript Best Practices
- Always use explicit types for function parameters and return values.
- Prefer `interface` over `type` unless union/intersection types are needed.
- Avoid using `any`; use `unknown` or proper types instead.
- Use `readonly` for properties that should not change after initialization.

## 4. Angular Best Practices
- Use `OnPush` change detection for components unless otherwise justified.
- Use standalone components and providers where possible.
- Prefer `async` pipe in templates over manual subscriptions.
- Use `@Injectable({ providedIn: 'root' })` for services unless a different scope is required.
- Use `ngOnDestroy` to clean up subscriptions if not using `async` pipe.

## 5. NgRx Best Practices
- Use feature keys for state slices.
- Use `createAction`, `createReducer`, and `createSelector` APIs.
- Keep effects pure and side-effect free except for their intended purpose.
- Use facades to encapsulate store interactions for components.

## 6. Code Style
- Use single quotes for strings.
- Use trailing commas in multiline objects and arrays.
- Use 2 spaces for indentation.
- Limit line length to 120 characters.
- Add a newline at the end of each file.

## 7. Comments and Documentation
- Use JSDoc for public APIs and complex logic.
- Avoid redundant comments; code should be self-explanatory where possible.

## 8. Testing
- Write unit tests for all services, reducers, effects, and facades.
- Use `TestBed` for Angular testing.
- Use `provideMockStore` for NgRx store testing.
- Use `HttpClientTestingModule` for HTTP services.
- Use marble testing for effects.

## 9. Accessibility & Templates
- Use semantic HTML elements.
- Add `aria` attributes where appropriate.
- Use `*ngIf` and `*ngFor` with `async` pipe for observable data.

