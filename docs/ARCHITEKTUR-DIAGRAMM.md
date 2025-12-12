# UML Architekturdiagramm - BMI App

## 1. Komponentendiagramm - Gesamtarchitektur

```mermaid
graph TB
    subgraph "Frontend (React + Vite)"
        A[Browser] --> B[React App]
        B --> C[AuthContext]
        B --> D[Router]
        D --> E[LoginPage]
        D --> F[RegisterPage]
        D --> G[ProtectedRoute]
        G --> H[Dashboard]
        G --> I[BmiCalculator]
        G --> J[Statistics]
        G --> K[Programs]
        G --> L[Profile]
        B --> M[Navigation]
        C --> N[localStorage]
    end
    
    subgraph "Backend (Express.js)"
        O[Express Server] --> P[AuthRoutes]
        O --> Q[BmiRoutes]
        O --> R[StatsRoutes]
        O --> S[TestRoutes]
        P --> T[AuthMiddleware]
        Q --> T
        R --> T
        T --> U[JWT Verification]
    end
    
    subgraph "Datenbank (SQLite)"
        V[(users)]
        W[(bmi_records)]
        X[(weight_goals)]
        Y[(user_programs)]
    end
    
    B -->|HTTP/REST API| O
    P --> V
    Q --> V
    Q --> W
    R --> V
    R --> W
    R --> X
    S --> V
    S --> W
    S --> X
    S --> Y
    
    style A fill:#e1f5ff
    style B fill:#c8e6c9
    style O fill:#fff9c4
    style V fill:#f8bbd0
    style W fill:#f8bbd0
    style X fill:#f8bbd0
    style Y fill:#f8bbd0
```

## 2. Klassendiagramm - Frontend Komponenten

```mermaid
classDiagram
    class App {
        +Routes routes
        +render()
    }
    
    class AuthContext {
        +user: Object
        +token: String
        +loading: Boolean
        +error: String
        +login(email, password)
        +register(name, email, password)
        +logout()
        +updateUser(user)
        +clearError()
    }
    
    class ProtectedRoute {
        +children: Component
        +checkAuth()
        +redirectToLogin()
    }
    
    class Navigation {
        +links: Array
        +handleLogout()
        +render()
    }
    
    class LoginPage {
        +formData: Object
        +handleSubmit()
        +handleChange()
        +render()
    }
    
    class RegisterPage {
        +formData: Object
        +handleSubmit()
        +handleChange()
        +render()
    }
    
    class Dashboard {
        +user: Object
        +fetchUserData()
        +render()
    }
    
    class BmiCalculator {
        +formData: Object
        +result: Object
        +handleSubmit()
        +handleChange()
        +calculateBMI()
        +render()
    }
    
    class Statistics {
        +stats: Object
        +chartData: Array
        +fetchStatistics()
        +render()
    }
    
    class Programs {
        +programs: Array
        +fetchPrograms()
        +createProgram()
        +render()
    }
    
    class Profile {
        +user: Object
        +formData: Object
        +updateProfile()
        +render()
    }
    
    App --> AuthContext : uses
    App --> ProtectedRoute : uses
    App --> LoginPage : routes to
    App --> RegisterPage : routes to
    ProtectedRoute --> Dashboard : protects
    ProtectedRoute --> BmiCalculator : protects
    ProtectedRoute --> Statistics : protects
    ProtectedRoute --> Programs : protects
    ProtectedRoute --> Profile : protects
    LoginPage --> AuthContext : uses
    RegisterPage --> AuthContext : uses
    Dashboard --> AuthContext : uses
    BmiCalculator --> AuthContext : uses
    Statistics --> AuthContext : uses
    Programs --> AuthContext : uses
    Profile --> AuthContext : uses
    Dashboard --> Navigation : contains
    BmiCalculator --> Navigation : contains
    Statistics --> Navigation : contains
    Programs --> Navigation : contains
    Profile --> Navigation : contains
```

## 3. Klassendiagramm - Backend Architektur

```mermaid
classDiagram
    class ExpressServer {
        +app: Express
        +PORT: Number
        +useCORS()
        +useJSON()
        +registerRoutes()
        +startServer()
    }
    
    class AuthRoutes {
        +router: Router
        +register(db)
        +login(db)
        +getMe(db)
        +hashPassword(password)
        +verifyPassword(password, hash)
        +generateToken(user)
    }
    
    class BmiRoutes {
        +router: Router
        +calculateBMI(db)
        +getBMIHistory(db)
        +validateBMIInput(data)
    }
    
    class StatsRoutes {
        +router: Router
        +getSummary(db)
        +getDetailedStats(db)
        +aggregateData(db)
    }
    
    class TestRoutes {
        +router: Router
        +testDatabase(db)
        +testConnection(db)
    }
    
    class AuthMiddleware {
        +verifyToken(token)
        +extractToken(req)
        +authenticate(req, res, next)
    }
    
    class Database {
        +db: SQLiteDatabase
        +initDB()
        +createTables()
        +exec(query)
        +all(query)
        +get(query)
        +run(query)
    }
    
    class CalculateBMI {
        +calculate(weight, height)
        +getStatus(bmi)
        +getCategory(bmi)
    }
    
    ExpressServer --> AuthRoutes : uses
    ExpressServer --> BmiRoutes : uses
    ExpressServer --> StatsRoutes : uses
    ExpressServer --> TestRoutes : uses
    AuthRoutes --> Database : queries
    BmiRoutes --> Database : queries
    StatsRoutes --> Database : queries
    TestRoutes --> Database : queries
    AuthRoutes --> AuthMiddleware : uses
    BmiRoutes --> AuthMiddleware : uses
    StatsRoutes --> AuthMiddleware : uses
    BmiRoutes --> CalculateBMI : uses
```

## 4. Datenbankmodell (ER-Diagramm)

```mermaid
erDiagram
    USERS ||--o{ BMI_RECORDS : "hat"
    USERS ||--o{ WEIGHT_GOALS : "hat"
    USERS ||--o{ USER_PROGRAMS : "hat"
    
    USERS {
        int id PK
        string name
        string email UK
        string password
        string gender
        date birth_date
        float height
        datetime created_at
    }
    
    BMI_RECORDS {
        int id PK
        string name
        string email
        int age
        float height
        float weight
        float bmi
        string status
        int user_id FK
        datetime created_at
    }
    
    WEIGHT_GOALS {
        int id PK
        int user_id FK
        float target_weight
        float current_weight
        date target_date
        string status
        datetime created_at
    }
    
    USER_PROGRAMS {
        int id PK
        int user_id FK
        string program_type
        string program_name
        string description
        date start_date
        date end_date
        string status
        datetime created_at
    }
```

## 5. Sequenzdiagramm - Authentifizierung

```mermaid
sequenceDiagram
    participant U as Benutzer
    participant F as Frontend
    participant A as AuthContext
    participant B as Backend
    participant DB as Datenbank
    
    U->>F: Öffnet Login-Seite
    U->>F: Gibt Email/Passwort ein
    U->>F: Klickt "Anmelden"
    F->>A: login(email, password)
    A->>B: POST /api/auth/login
    B->>DB: SELECT user WHERE email
    DB-->>B: User-Daten
    B->>B: verifyPassword()
    B->>B: generateToken()
    B-->>A: {user, token}
    A->>A: persistAuthState()
    A->>A: setUser(user)
    A-->>F: Authentifizierung erfolgreich
    F->>F: Navigiere zu Dashboard
```

## 6. Sequenzdiagramm - BMI-Berechnung

```mermaid
sequenceDiagram
    participant U as Benutzer
    participant F as BmiCalculator
    participant A as AuthContext
    participant B as Backend
    participant C as CalculateBMI
    participant DB as Datenbank
    
    U->>F: Gibt Gewicht/Größe ein
    U->>F: Klickt "Berechnen"
    F->>A: getToken()
    A-->>F: JWT Token
    F->>B: POST /api/bmi (mit Token)
    B->>B: AuthMiddleware.verifyToken()
    B->>B: extractUserFromToken()
    B->>C: calculate(weight, height)
    C-->>B: {bmi, status, category}
    B->>DB: INSERT INTO bmi_records
    DB-->>B: Record erstellt
    B-->>F: {bmi, status, category, ...}
    F->>F: Zeige Ergebnis
```

## 7. Deployment-Architektur

```mermaid
graph TB
    subgraph "CI/CD Pipeline"
        A[Git Push] --> B[GitHub/GitLab/Jenkins]
        B --> C[Lint Stage]
        B --> D[Test Stage]
        B --> E[Build Stage]
        B --> F[E2E Test Stage]
        B --> G[Deploy Stage]
    end
    
    subgraph "Development"
        H[Docker Compose Dev] --> I[Frontend Dev Server<br/>Port 5173]
        H --> J[Backend Server<br/>Port 3000]
        I --> K[Vite HMR]
    end
    
    subgraph "Production"
        L[Nginx] --> M[Frontend Build<br/>Static Files]
        N[Node.js] --> O[Backend Server<br/>Port 3000]
        P[(SQLite Database)]
    end
    
    G -->|Deploy| L
    G -->|Deploy| N
    M --> O
    O --> P
    
    style A fill:#e1f5ff
    style B fill:#c8e6c9
    style H fill:#fff9c4
    style L fill:#f8bbd0
    style N fill:#f8bbd0
    style P fill:#f8bbd0
```

## 8. Paketdiagramm - Abhängigkeiten

```mermaid
graph LR
    subgraph "Frontend Dependencies"
        A[React 19.1.1]
        B[React Router DOM 7.0.2]
        C[Recharts 2.12.7]
        D[Vite 7.1.7]
        E[Vitest 4.0.7]
        F[Playwright]
    end
    
    subgraph "Backend Dependencies"
        G[Express 5.1.0]
        H[SQLite 5.1.1]
        I[JWT 9.0.2]
        J[bcryptjs 2.4.3]
        K[CORS 2.8.5]
        L[Jest 30.2.0]
    end
    
    A --> B
    A --> C
    D --> A
    E --> A
    F --> A
    G --> H
    G --> I
    G --> J
    G --> K
    L --> G
```

## 9. Aktivitätsdiagramm - Benutzerfluss

```mermaid
flowchart TD
    Start([Benutzer startet App]) --> CheckAuth{Authentifiziert?}
    CheckAuth -->|Nein| Login[Login/Registrierung]
    CheckAuth -->|Ja| Dashboard[Dashboard]
    Login --> Register{Registrierung?}
    Register -->|Ja| CreateAccount[Account erstellen]
    Register -->|Nein| Authenticate[Anmelden]
    CreateAccount --> Authenticate
    Authenticate --> Dashboard
    Dashboard --> BMI[BMI Rechner]
    Dashboard --> Stats[Statistiken]
    Dashboard --> Programs[Programme]
    Dashboard --> Profile[Profil]
    BMI --> Calculate[BMI berechnen]
    Calculate --> Save[Ergebnis speichern]
    Save --> Stats
    Stats --> ViewCharts[Charts anzeigen]
    Programs --> CreateProgram[Programm erstellen]
    Profile --> UpdateProfile[Profil aktualisieren]
    ViewCharts --> Dashboard
    CreateProgram --> Dashboard
    UpdateProfile --> Dashboard
    Dashboard --> Logout[Abmelden]
    Logout --> Start
```

## 10. Übersicht - Technologie-Stack

```mermaid
mindmap
  root((BMI App))
    Frontend
      React 19
      Vite
      React Router
      Recharts
      Context API
      LocalStorage
    Backend
      Express.js
      Node.js
      REST API
      JWT Auth
      bcrypt
    Datenbank
      SQLite
      WAL Mode
      4 Tabellen
    Testing
      Vitest
      Jest
      Playwright
      Testing Library
    CI/CD
      GitHub Actions
      GitLab CI
      Jenkins
      Docker
    Deployment
      Docker Compose
      Nginx
      Development
      Production
```

## Legende

- **Grün**: Frontend-Komponenten
- **Gelb**: Backend-Komponenten
- **Rosa**: Datenbank-Komponenten
- **Blau**: Externe Services/User

## Technische Details

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.0.2
- **State Management**: Context API + LocalStorage
- **Charts**: Recharts 2.12.7
- **Port**: 5173 (Development)

### Backend
- **Framework**: Express.js 5.1.0
- **Runtime**: Node.js 20
- **Authentifizierung**: JWT (jsonwebtoken 9.0.2)
- **Passwort-Hashing**: bcryptjs 2.4.3
- **CORS**: cors 2.8.5
- **Port**: 3000

### Datenbank
- **Typ**: SQLite 5.1.1
- **Modus**: WAL (Write-Ahead Logging)
- **Tabellen**: users, bmi_records, weight_goals, user_programs

### Testing
- **Frontend**: Vitest 4.0.7, Testing Library
- **Backend**: Jest 30.2.0
- **E2E**: Playwright (Chromium, Firefox, WebKit)

### CI/CD
- **Plattformen**: GitHub Actions, GitLab CI, Jenkins
- **Stages**: Lint, Test, Build, E2E, Deploy
- **Containerisierung**: Docker, Docker Compose

