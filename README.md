## VitalSync – Healthcare Management Dashboard

## Overview

VitalSync is a healthcare management dashboard built using Next.js, Supabase, Zustand, Tailwind CSS, and Recharts.

The application allows healthcare staff to securely manage patient records through a complete CRUD workflow while providing visual analytics for patient status monitoring.

This project was developed as part of Sprint 15 – Feature Complete Deliverable.

---

## Features Implemented

### Authentication

* User Registration using Supabase Auth
* User Login
* User Logout
* Protected Dashboard Route
* Session-based Authentication

---

## Patient Management (CRUD)

### Create

Users can add new patients with:

* Patient Name
* Age
* Disease
* Treatment Status

Data is stored in Supabase Database.

---

### Read

After login:

* Patient records are fetched from Supabase
* Only records belonging to the logged-in user are displayed
* Data is rendered in a dynamic table

---

### Update

Users can:

* Click Edit
* Auto-fill patient data into the form
* Update patient information
* Save changes directly to Supabase

---

### Delete

Users can:

* Delete any patient record
* Confirmation prompt before deletion
* Table updates instantly without page refresh

---

## Data Ownership & Security

Row Level Security (RLS) is enabled in Supabase.

Each patient record stores:

```sql
user_id
```

Users can only:

* View their own patients
* Create their own patients
* Update their own patients
* Delete their own patients

---

## Dashboard Analytics

Analytics are generated dynamically from patient records.

### Patient Status Chart

Implemented using Recharts.

Displays:

* Recovered Patients
* Critical Patients
* Under Treatment Patients

Chart updates automatically when patient data changes.

---

## Tech Stack

### Frontend

* Next.js 16
* React
* Tailwind CSS

### State Management

* Zustand

### Backend as a Service

* Supabase Auth
* Supabase PostgreSQL Database

### Charts

* Recharts

### Deployment

* Vercel

---

## Project Structure

```bash
src
│
├── app
│   ├── dashboard
│   ├── login
│   ├── register
│   └── components
│       ├── PatientForm.jsx
│       ├── PatientTable.jsx
│       └── PatientChart.jsx
│
├── lib
│   └── supabase.js
│
└── store
    └── authStore.js
```

---

## Local Setup

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create:

```env
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### Run Project

```bash
npm run dev
```

Application runs at:

```bash
http://localhost:3000
```

---

## Sprint 15 Deliverables Completed

### Phase 1

* Authentication
* Create Patient
* Read Patient Records

### Phase 2

* Edit Patient
* Delete Patient

### Phase 3

* Dynamic Data Aggregation
* Patient Status Analytics
* Recharts Visualization

---

## Future Improvements

* Appointment Management Module
* Doctor Management
* Prescription Tracking
* Advanced Dashboard KPIs
* Better UI/UX Design
* Responsive Mobile Layout
* Real-time Notifications

---

## Author

Utsav Raj

Sprint 15 – Feature Complete Submission

Healthcare Dashboard MVP – VitalSync

---

# Deployment Links

## GitHub Repository
https://github.com/utsavraj2245925/Sprint-14-The-Walking-Skeleton-VitalSync

## Live Deployment
https://sprint-14-the-walking-skeleton-vita.vercel.app/

---

# Author
Utsav Raj
B.Tech CSE (AIML)
Suresh Gyan Vihar UniversityThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sprint 15 Enhancements

### AI Feature
- Integrated Google Gemini AI
- Generates professional patient summaries

### Responsive Design
- Mobile-friendly dashboard
- Hamburger navigation menu
- Responsive analytics chart

### UX Improvements
- Toast notifications
- Loading state indicators
- Empty state UI
- Improved table responsivenessgit