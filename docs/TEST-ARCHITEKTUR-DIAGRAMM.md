# Test-Architektur Diagramm - BMI App

## 1. Übersicht - Test-Pyramide

```mermaid
graph TB
    subgraph "Test-Pyramide"
        A[E2E Tests<br/>3 Dateien<br/>Playwright] 
        B[Integration Tests<br/>7 Dateien<br/>Jest]
        C[Unit Tests<br/>11 Dateien<br/>Vitest]
    end
    
    A -->|weniger Tests| B
    B -->|mehr Tests| C
    
    style A fill:#ffcccc
    style B fill:#ffffcc
    style C fill:#ccffcc
```

## 2. Test-Übersicht - Alle Test-Dateien

```mermaid
graph TB
    subgraph "Frontend Tests (Vitest)"
        F1[Login.test.jsx]
        F2[Register.test.jsx]
        F3[Dashboard.test.jsx]
        F4[BmiCalculator.test.jsx]
        F5[Statistics.test.jsx]
        F6[Programs.test.jsx]
        F7[Profile.test.jsx]
        F8[Accessibility.test.jsx]
        F9[AuthContext.test.jsx]
        F10[ProtectedRoute.test.jsx]
        F11[Navigation.test.jsx]
    end
    
    subgraph "Backend Tests (Jest)"
        B1[auth.test.js]
        B2[bmi.test.js]
        B3[stats.test.js]
        B4[calculateBMI.test.js]
        B5[validation.test.js]
        B6[security.test.js]
        B7[performance.test.js]
    end
    
    subgraph "E2E Tests (Playwright)"
        E1[auth.spec.js]
        E2[bmi-flow.spec.js]
        E3[navigation.spec.js]
    end
    
    style F1 fill:#c8e6c9
    style F2 fill:#c8e6c9
    style F3 fill:#c8e6c9
    style F4 fill:#c8e6c9
    style F5 fill:#c8e6c9
    style F6 fill:#c8e6c9
    style F7 fill:#c8e6c9
    style F8 fill:#c8e6c9
    style F9 fill:#c8e6c9
    style F10 fill:#c8e6c9
    style F11 fill:#c8e6c9
    style B1 fill:#fff9c4
    style B2 fill:#fff9c4
    style B3 fill:#fff9c4
    style B4 fill:#fff9c4
    style B5 fill:#fff9c4
    style B6 fill:#fff9c4
    style B7 fill:#fff9c4
    style E1 fill:#ffcccc
    style E2 fill:#ffcccc
    style E3 fill:#ffcccc
```

## 3. Frontend Tests - Detaillierte Struktur

```mermaid
graph TB
    subgraph "Pages Tests"
        P1[Login.test.jsx<br/>- Form Rendering<br/>- Form Submission<br/>- Error Handling<br/>- Navigation]
        P2[Register.test.jsx<br/>- Form Rendering<br/>- Registration Flow<br/>- Validation<br/>- Error Messages]
        P3[Dashboard.test.jsx<br/>- User Data Display<br/>- Component Rendering<br/>- Navigation Links]
        P4[BmiCalculator.test.jsx<br/>- Form Input<br/>- BMI Calculation<br/>- Result Display<br/>- API Integration]
        P5[Statistics.test.jsx<br/>- Chart Rendering<br/>- Data Display<br/>- Empty State]
        P6[Programs.test.jsx<br/>- Program List<br/>- Program Creation<br/>- Program Display]
        P7[Profile.test.jsx<br/>- Profile Display<br/>- Profile Update<br/>- Form Validation]
        P8[Accessibility.test.jsx<br/>- ARIA Labels<br/>- Keyboard Navigation<br/>- Screen Reader]
    end
    
    subgraph "Components Tests"
        C1[ProtectedRoute.test.jsx<br/>- Auth Check<br/>- Redirect Logic<br/>- Route Protection]
        C2[Navigation.test.jsx<br/>- Link Rendering<br/>- Logout Function<br/>- Active State]
    end
    
    subgraph "Context Tests"
        CT1[AuthContext.test.jsx<br/>- Login Function<br/>- Register Function<br/>- Logout Function<br/>- Token Management<br/>- State Persistence]
    end
    
    P1 --> CT1
    P2 --> CT1
    P3 --> CT1
    P4 --> CT1
    P5 --> CT1
    P6 --> CT1
    P7 --> CT1
    P3 --> C1
    P4 --> C1
    P5 --> C1
    P6 --> C1
    P7 --> C1
    P3 --> C2
    P4 --> C2
    P5 --> C2
    P6 --> C2
    P7 --> C2
    
    style P1 fill:#c8e6c9
    style P2 fill:#c8e6c9
    style P3 fill:#c8e6c9
    style P4 fill:#c8e6c9
    style P5 fill:#c8e6c9
    style P6 fill:#c8e6c9
    style P7 fill:#c8e6c9
    style P8 fill:#c8e6c9
    style C1 fill:#a5d6a7
    style C2 fill:#a5d6a7
    style CT1 fill:#81c784
```

## 4. Backend Tests - Detaillierte Struktur

```mermaid
graph TB
    subgraph "API Route Tests"
        A1[auth.test.js<br/>- POST /api/auth/register<br/>- POST /api/auth/login<br/>- GET /api/auth/me<br/>- Password Hashing<br/>- JWT Generation<br/>- Error Handling]
        A2[bmi.test.js<br/>- POST /api/bmi<br/>- GET /api/bmi/history<br/>- BMI Calculation<br/>- Data Validation<br/>- Database Storage]
        A3[stats.test.js<br/>- GET /api/stats/summary<br/>- GET /api/stats/detailed<br/>- Data Aggregation<br/>- Statistics Calculation]
    end
    
    subgraph "Utility Tests"
        U1[calculateBMI.test.js<br/>- BMI Formula<br/>- Status Categories<br/>- Edge Cases<br/>- Invalid Input]
    end
    
    subgraph "Validation Tests"
        V1[validation.test.js<br/>- Email Validation<br/>- Password Validation<br/>- Input Sanitization<br/>- Type Checking]
    end
    
    subgraph "Security Tests"
        S1[security.test.js<br/>- JWT Verification<br/>- Token Expiration<br/>- Unauthorized Access<br/>- SQL Injection<br/>- XSS Prevention<br/>- Password Security]
    end
    
    subgraph "Performance Tests"
        P1[performance.test.js<br/>- Response Time<br/>- Throughput<br/>- Database Queries<br/>- Concurrent Requests<br/>- Load Testing]
    end
    
    A1 --> U1
    A2 --> U1
    A1 --> V1
    A2 --> V1
    A1 --> S1
    A2 --> S1
    A3 --> S1
    A1 --> P1
    A2 --> P1
    A3 --> P1
    
    style A1 fill:#fff9c4
    style A2 fill:#fff9c4
    style A3 fill:#fff9c4
    style U1 fill:#ffe082
    style V1 fill:#ffe082
    style S1 fill:#ffccbc
    style P1 fill:#b2ebf2
```

## 5. E2E Tests - Detaillierte Struktur

```mermaid
graph TB
    subgraph "E2E Tests (Playwright)"
        E1[auth.spec.js<br/>- User Registration<br/>- User Login<br/>- Invalid Login<br/>- Error Messages]
        E2[bmi-flow.spec.js<br/>- BMI Calculation<br/>- Result Display<br/>- Statistics Navigation<br/>- Programs Navigation]
        E3[navigation.spec.js<br/>- Page Navigation<br/>- Route Protection<br/>- Logout Flow<br/>- Protected Routes]
    end
    
    subgraph "Browser Support"
        B1[Chromium]
        B2[Firefox]
        B3[WebKit]
    end
    
    E1 --> B1
    E1 --> B2
    E1 --> B3
    E2 --> B1
    E2 --> B2
    E2 --> B3
    E3 --> B1
    E3 --> B2
    E3 --> B3
    
    style E1 fill:#ffcccc
    style E2 fill:#ffcccc
    style E3 fill:#ffcccc
    style B1 fill:#e1bee7
    style B2 fill:#e1bee7
    style B3 fill:#e1bee7
```

## 6. Test-Abhängigkeiten und Ausführungsreihenfolge

```mermaid
graph LR
    subgraph "CI/CD Pipeline"
        L[Lint Stage] --> T[Test Stage]
        T --> B[Build Stage]
        B --> E[E2E Stage]
    end
    
    subgraph "Test Stage - Parallel"
        T1[Frontend Unit Tests<br/>Vitest<br/>11 Dateien]
        T2[Backend Unit/Integration Tests<br/>Jest<br/>7 Dateien]
    end
    
    subgraph "E2E Stage"
        E1[Start Backend Server]
        E2[Start Frontend Server]
        E3[Run E2E Tests<br/>Playwright<br/>3 Dateien]
    end
    
    T --> T1
    T --> T2
    E --> E1
    E --> E2
    E1 --> E3
    E2 --> E3
    
    style T1 fill:#c8e6c9
    style T2 fill:#fff9c4
    style E3 fill:#ffcccc
```

## 7. Test-Coverage Übersicht

```mermaid
pie title Test-Verteilung
    "Frontend Unit Tests" : 11
    "Backend Tests" : 7
    "E2E Tests" : 3
```

## 8. Test-Szenarien - Detaillierte Übersicht

```mermaid
mindmap
  root((Test-Szenarien))
    Frontend Tests
      Login
        Form Rendering
        Valid Credentials
        Invalid Credentials
        Error Messages
        Navigation
      Register
        Form Rendering
        Successful Registration
        Validation Errors
        Duplicate Email
      Dashboard
        User Data Display
        Component Rendering
        Navigation
      BMI Calculator
        Form Input
        Calculation
        Result Display
        API Integration
      Statistics
        Chart Rendering
        Data Display
        Empty State
      Programs
        Program List
        Program Creation
      Profile
        Profile Display
        Profile Update
      Accessibility
        ARIA Labels
        Keyboard Navigation
        Screen Reader
    Backend Tests
      Authentication
        Registration
        Login
        JWT Generation
        Password Hashing
      BMI API
        Calculation
        Storage
        History
      Statistics
        Summary
        Detailed Stats
        Aggregation
      Security
        JWT Verification
        Unauthorized Access
        SQL Injection
        XSS Prevention
      Performance
        Response Time
        Throughput
        Load Testing
      Validation
        Email Validation
        Password Validation
        Input Sanitization
    E2E Tests
      Authentication Flow
        Registration
        Login
        Logout
        Error Handling
      BMI Flow
        Calculation
        Statistics
        Programs
      Navigation
        Page Navigation
        Route Protection
        Protected Routes
```

## 9. Test-Frameworks und Tools

```mermaid
graph TB
    subgraph "Frontend Testing"
        F1[Vitest<br/>Test Runner]
        F2[Testing Library<br/>Component Testing]
        F3[User Event<br/>User Interaction]
        F4[Jest DOM<br/>DOM Matchers]
        F5[Jest Axe<br/>Accessibility]
    end
    
    subgraph "Backend Testing"
        B1[Jest<br/>Test Runner]
        B2[Supertest<br/>HTTP Testing]
        B3[SQLite Memory<br/>Test Database]
    end
    
    subgraph "E2E Testing"
        E1[Playwright<br/>Browser Automation]
        E2[Chromium<br/>Browser]
        E3[Firefox<br/>Browser]
        E4[WebKit<br/>Browser]
    end
    
    F1 --> F2
    F1 --> F3
    F1 --> F4
    F1 --> F5
    B1 --> B2
    B1 --> B3
    E1 --> E2
    E1 --> E3
    E1 --> E4
    
    style F1 fill:#c8e6c9
    style B1 fill:#fff9c4
    style E1 fill:#ffcccc
```

## 10. Test-Statistiken

### Frontend Tests (Vitest)
- **Anzahl Test-Dateien**: 11
- **Test-Framework**: Vitest 4.0.7
- **Coverage**: 97.1%
- **Test-Typen**: Unit Tests, Component Tests, Integration Tests

### Backend Tests (Jest)
- **Anzahl Test-Dateien**: 7
- **Test-Framework**: Jest 30.2.0
- **Test-Typen**: Unit Tests, Integration Tests, Performance Tests, Security Tests
- **Anzahl Tests**: ~77 Tests (inkl. 18 Performance-Tests)

### E2E Tests (Playwright)
- **Anzahl Test-Dateien**: 3
- **Test-Framework**: Playwright
- **Browser**: Chromium, Firefox, WebKit
- **Test-Typen**: End-to-End Tests, User Flow Tests

## 11. Test-Ausführung im CI/CD

```mermaid
sequenceDiagram
    participant CI as CI/CD Pipeline
    participant FT as Frontend Tests
    participant BT as Backend Tests
    participant E2E as E2E Tests
    participant BE as Backend Server
    participant FE as Frontend Server
    
    CI->>FT: npm test (Vitest)
    CI->>BT: npm test (Jest)
    FT-->>CI: ✅ 11 Test-Dateien
    BT-->>CI: ✅ 7 Test-Dateien
    
    CI->>BE: Start Backend (Port 3000)
    CI->>FE: Start Frontend (Port 5173)
    BE-->>CI: ✅ Server Ready
    FE-->>CI: ✅ Server Ready
    
    CI->>E2E: npx playwright test
    E2E->>BE: HTTP Requests
    E2E->>FE: Browser Automation
    E2E-->>CI: ✅ 3 Test-Dateien
```

## 12. Test-Kategorien

| Kategorie | Anzahl | Framework | Typ |
|-----------|--------|-----------|-----|
| **Frontend Unit Tests** | 11 | Vitest | Unit, Component |
| **Backend Unit Tests** | 4 | Jest | Unit, Integration |
| **Backend Security Tests** | 1 | Jest | Security |
| **Backend Performance Tests** | 1 | Jest | Performance |
| **Backend Validation Tests** | 1 | Jest | Validation |
| **E2E Tests** | 3 | Playwright | End-to-End |
| **TOTAL** | **21** | - | - |

## Legende

- 🟢 **Grün**: Frontend Tests (Vitest)
- 🟡 **Gelb**: Backend Tests (Jest)
- 🔴 **Rosa**: E2E Tests (Playwright)
- 🔵 **Blau**: Tools/Frameworks

## Zusammenfassung

Das Projekt umfasst **21 Test-Dateien** mit insgesamt **~150+ Tests**:

- **11 Frontend Test-Dateien** (Vitest) - Unit und Component Tests
- **7 Backend Test-Dateien** (Jest) - Unit, Integration, Security, Performance Tests
- **3 E2E Test-Dateien** (Playwright) - End-to-End Tests mit 3 Browsern

Alle Tests werden automatisch im CI/CD Pipeline ausgeführt und tragen zur Qualitätssicherung der Anwendung bei.



