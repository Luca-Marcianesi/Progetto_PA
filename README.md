# Progetto Programmazione avanzata

![Logo del Progetto](https://github.com/Luca-Marcianesi/Progetto_PA/blob/main/doc/Logo.png)

## Tecnologie utilizzate

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![GitHub Desktop](https://img.shields.io/badge/GitHub_Desktop-8034A9?style=for-the-badge&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=white)

## Introduzione
Questo progetto consiste nello sviluppo di un back-end in TypeScript per la gestione delle prenotazioni di risorse condivise, come GPU o altri dispositivi in un sistema HPC. L’app consente agli utenti autenticati di creare richieste di prenotazione, verificare la disponibilità degli slot. Gli amministratori possono approvare o rigettare le richieste, gestire calendari e monitorare lo stato delle prenotazioni.

## Funzionalita
---
### Autenticazione e Autorizzazione
- Autenticazione utenti tramite JWT con algoritmo RS256 
- Cifratura delle password con algoritmo SHA256
- Accesso alle risorse basato sul ruolo dell'utente

### Middleware Input Validation
. Validazione degli dati in ingresso
- Validazione tramite ZOD Schemas
- Controllo vincoli logici

### Gestione degli errori 
- Gestione degli errori personalizzata
- ErrorHander

### Database Interactions
- Persistenza dei dati tramite database PostGres
- CRUD
- Cancellazione leggera(Sequelize Paranoid)
- Sequelize Model

### Gestione Calendari e Prenoazioni
- Creazione dei calendari
- Visualizzazione calendario
- Gestione e cancellazione dei calendari
- Creazione prenotazioni
- Controlli di stato e sovrapposizioni
- Addebito token
- Visualizzazione e filtraggio prenotazioni


### Extra
- Test con Jest sulle validazioni

## Teconlogie
---
- Framework : Express
- Runtime Enviroment : Node.js
- Package Manager : Npm
- Language : TypeScript
- Database : PostgreSQL
- ORM : Sequelize
- Authentication : JWT with RS256
- Input Validator : ZOD
- Testing : Jest, Postman
- Containerization : Docker, Docker Compose

## Installazione
----
### Fase di sviluppo
<pre> docker compose -f docker-compose.dev.yaml up --build </pre>

### Fase di produzione
<pre>docker compose -f docker-compose.prod.yaml up --build -d</pre>

## Requisiti
- È necessario avere installato Docker Engine sulla macchina locale
- Generare la chiave pubblica e quella privata
- Creare la cartella "key" allo stesso livello di src e inserire le chiavi generate

### Comandi

## Documnetazione delle rotte

## Database
### Tables
- Users : Utenti registrati all'applicazione
- Calendars : Calendari con associata una risorsa ed un periodo di disponibilità
- Requests : Prenotazioni per gli slot temporali dei calendari
- Resources : Risorsa assegnabili ai calendari

### E-R Database
![E-R](https://github.com/Luca-Marcianesi/Progetto_PA/blob/main/doc/database%20diagramm.png)

### Migrations e Seeds
Il database viene inizializzato a partire da un file di migrazioni [00_migration.sql]([percorso/del/file.txt](https://github.com/Luca-Marcianesi/Progetto_PA/blob/main/src/database/00_migration.sql)) e valorizzato da uno di seed [01_seed.sql](https://github.com/Luca-Marcianesi/Progetto_PA/blob/main/src/database/01_seed.sql)
## Architettura
┌─────────────────────────────────────────────────────┐
│                     Router                          │ ← Route definitions
├─────────────────────────────────────────────────────┤
|                   Middleware                        |Authorization/Authentication/Validation
|_____________________________________________________|
|                                                     |
│                   Controllers                       │ ← Request handling
├─────────────────────────────────────────────────────┤
│                    Services                         │ ← Business logic
├─────────────────────────────────────────────────────┤
│                  Domain Model                       │ ← Core domain entities
├─────────────────────────────────────────────────────┤
│                  Repositories                       │ ← Data access
├─────────────────────────────────────────────────────┤
│                      DAO                            │ ← Database operations
├─────────────────────────────────────────────────────┤
│                     Models                          │ ← ORM / Sequelize models
├─────────────────────────────────────────────────────┤
│                    Database                         │ ← Persistent storage
└─────────────────────────────────────────────────────┘
- Router: Riceve la richiesta HTTP dal client e le instrada verso il controller
- Middleware : Autenticazione, autorizzazione, validazione prima del controller
- Controllers : Gestiscono la richiesta specifica
- Services : Business logic dell’applicazione.
  - Il service usa i Domain Model per applicare le regole di business e trasformare i dati in       base al contesto applicativo.
-Domain Model : Definisce le entità centrali e la logica di dominio
- Repositories : Forniscono un’astrazione per accedere ai dati.
- DAO (Data Access Object) : Implementa le operazioni di basso livello sul database.
- Models (Sequelize): Definiscono la struttura delle tabelle del database.
- Database : Memorizza in maniera persistente i dati.

# Design Pattern Utilizzati
1. SIGLETON
---
Il pattern Singleton è stato utilizzao per la gestione del database [database.ts]([https://github.com/Luca-Marcianesi/Progetto_PA/blob/main/src/database/01_seed.sql](https://github.com/Luca-Marcianesi/Progetto_PA/blob/main/src/database/database.ts)) perché garantisce che esista una sola istanza della connessione durante l’esecuzione dell’applicazione. In questo modo:
- si evita di creare connessioni multiple e costose,
- si centralizza il punto di accesso al database,
- si semplifica la gestione delle risorse e la sincronizzazione.
- 
```ts
let sequelize: Sequelize | null = null;

// Return always the same instance of Sequelize using the Singleton Pattern
export const getDatabase = (): Sequelize => {
  if (!sequelize) {
    sequelize = new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD || "",
      {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        dialect: "postgres",
        logging: false,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        retry: {
          max: 5,
        },
      }
    );
  }
  return sequelize;
};
```

2. CHAIN OF RESPONSABILITY
### Struttura del pattern
Il CoR permette di strutturare una catena di **handlers** , ognuno dei quali esegue un controllo specifico.  
- Ogni handler decide se gestire la richiesta o passarla al successivo nella catena.    
- La catena può essere facilmente estesa o modificata senza alterare il codice esistente.  
- viene usato quando ci sono più controlli da effettuare in sequenza  
 
### Nel nostro caso
- **Autenticazione e Validazione**: Veine verificato il token, authenticato l'utente in base al ruolo, validati gli input e chiamata la funzione del controller
 ``` ts
    router.post("/calendar",
    verifyToken,
    authenticate([ADMIN_ROLE]),
    validateBodySchema(CreateCalendarSchema),
    calendar_controller.createCalendar);
```
- **Refund policies**: ogni politica (es. tempi, condizioni, eccezioni) viene valutata come step della catena.
  Interfaccia e classe astratta
  ```ts
  export interface RefundPolicyHandler {
    setNext(handler: RefundPolicyHandler): RefundPolicyHandler;
    calculate(reservation: DomainReservation, costPerHour: number): number;
  }
  export abstract class AbstractRefundPolicyHandler implements RefundPolicyHandler {
      private nextHandler: RefundPolicyHandler | null = null;
  
      public setNext(handler: RefundPolicyHandler): RefundPolicyHandler {
          this.nextHandler = handler;
          return handler;
      }
  

      public calculate(reservation: DomainReservation, costPerHour: number): number {
          const result = this.apply(reservation, costPerHour);
          if (result !== null) return result;
          if (this.nextHandler) return this.nextHandler.calculate(reservation, costPerHour);
          return 0;
      }
  
      protected abstract apply(reservation: DomainReservation, costPerHour: number): number | null;
  }
  ```
  Esempio di handler
  ```ts 
  export class OngoingReservationRefundHandler extends AbstractRefundPolicyHandler {
    protected apply(reservation: DomainReservation, costPerHour: number): number | null {
        const now = new Date();

        if (now >= reservation.start && now < reservation.end) {
            const unusedHours = reservation.getHoursNotUsed();
            const refund = (unusedHours * costPerHour) - 2; 
            return Math.max(refund, 0); // Take the max for not returning negative tokens
        }

        return null; // next handler
    }
  }
  ```
  Esempio costruzione catena
  ```ts
  export function buildRefundPolicyChain(): RefundPolicyHandler {
        const invalidCanceld = new InvalidOrCancelReservatioHandler();
        const ongoing = new OngoingReservationRefundHandler();
        const future = new FutureReservationRefundHandler();
        const noRefund = new NoRefundHandler();

        invalidCanceld.setNext(ongoing).setNext(future).setNext(noRefund);
        return ongoing;
    }
   ```
  

In questo modo la logica rimane **scalabile, leggibile e facilmente estendibile**.



## Progettazione

### Use Case
![Use case diagramm](https://github.com/Luca-Marcianesi/Progetto_PA/blob/main/doc/Use%20Case%20Diagramm.drawio.png)

### Diagrammi delle sequenze

## Test
Per lanciare i test da terminale:

<pre>npm test </pre>

