# VMC Operator HMI - Startup Guidance

## 1. Project Overview
This project is a full-stack technical assignment for Primeform Labs. It simulates an industrial Human-Machine Interface (HMI) for a single Vertical Machining Center (VMC) operator. The application enforces a strict, unskippable startup sequence to ensure all machine checks, tooling, and workpiece setups are verified before allowing a machining operation to begin. 

## 2. Architecture & Technology Stack
The application uses a modern, decoupled architecture with a centralized state machine managed by the backend to prevent unauthorized state transitions.

**Frontend:**
* React (create-react-app)
* React Context API (State Management)
* Axios (API Integration)
* Pure CSS (Responsive Industrial UI)

**Backend:**
* Java 17
* Spring Boot 3.x (Spring Web, Spring Data JPA)
* Bean Validation
* Maven

**Database:**
* PostgreSQL (Local & Supabase for Production)

## 3. Folder Structure
```text
vmc-operator-hmi/
├── backend/                # Spring Boot REST API
│   ├── src/main/java/      # Controllers, Services, Repositories, Entities
│   └── src/main/resources/ # application.properties
├── frontend/               # React UI
│   ├── public/             
│   └── src/                # Components, Context, Pages, API Services
└── README.md               # Project documentation

##  4. Application Workflow & Mock Scenario
The application guides the operator through a locked sequential flow:
POWER ON → MACHINE CHECKS → TOOLS → WORKPIECE → READY REVIEW → OPERATION

Mock Manufacturing Scenario:

Operation: Face Milling - Aluminium Component (Qty: 10)

Material: Aluminium 6061-T6 (Drawing: PART-1001 Rev B)

CNC Program: VMC-PART-1001 Rev B

Fixture: VMC Precision Vice Fixture #01

Required Tools: T01 (Face Mill), T02 (End Mill), T03 (Drill)

## 5. Local Setup Instructions
Prerequisites
Java 17+

Node.js (v16+)

PostgreSQL (Running on port 5432)

Database Setup
Create a local PostgreSQL database named vmc_hmi with the credentials configured in backend/src/main/resources/application.properties.

Backend Setup
Navigate to the backend directory and run the Spring Boot application. The DataInitializer will automatically populate the mock scenario on the first run.

Bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
The API runs on http://localhost:8080 (or 8081 if configured).

Frontend Setup
Navigate to the frontend directory, install dependencies, and start the development server.

Bash
cd frontend
npm install
npm start
The UI runs on http://localhost:3000.

## 6. API Endpoints
The backend exposes the following REST APIs to manage the HMI state:

GET /api/readiness - Returns the overall readiness state map.

GET /api/machine-checks - Fetch all safety and control checks.

PUT /api/machine-checks/{id}/confirm - Confirm a specific check.

GET /api/tools - Fetch required tooling.

PUT /api/tools/{id}/confirm - Confirm a specific tool.

GET /api/workpiece - Fetch workpiece setup instructions.

PUT /api/workpiece/confirm - Confirm workpiece setup.

GET /api/operation - Get current operation status (READY, RUNNING, STOPPED).

POST /api/operation/start - Change state to RUNNING (fails if readiness is false).

POST /api/operation/stop - Change state to STOPPED (fails if not RUNNING).

## 7. Deployment Details
This full-stack application is deployed using cloud-native hosting for accessible review:

Database: Hosted on Supabase (PostgreSQL).

Backend: Hosted on Render as a Java web service.

Frontend: Hosted on Vercel as a static React build.