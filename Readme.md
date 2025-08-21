

https://github.com/user-attachments/assets/98624602-a962-4d06-997b-2828067f3ab8


# Summary 

A Tennis app to allow users to record their game scores and analyze player performance.
This is a project dedicated to Chi and Wilson for helping out with their tennis team score records, better UX than excel spreadsheet and authentication system. 

# Architecture 
- Front-End: React-Native with Expo template
- Back-End: Google Firebase service

# Build Guide

## Prerequisites
- Node.js and Yarn
- A Firebase project

## Frontend
1.  Install dependencies:
    ```bash
    yarn install
    ```
2.  Start the development server:
    ```bash
    yarn start
    ```

## Backend

This project uses Firebase services (Auth, Firestore, Functions). To run the backend locally for development, you need to set up the Firebase Emulator Suite.

1.  **Install Firebase CLI:** If you don't have it, install it globally.
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase:**
    ```bash
    firebase login
    ```

3.  **Initialize Firebase in your project:** If you haven't already, run this command from your project root and select Firestore, Functions, and Emulators when prompted. This will create a `firebase.json` file.
    ```bash
    firebase init
    ```

4.  **Start the emulators:** This will download the emulator binaries the first time you run it.
    ```bash
    firebase setup:emulators:firestore # if firebase cannot connect to .jar file with cloud
    firebase emulators:start
    ```

# Packages

This project uses:
- `firebase`: `10.6.0`
- `react-native`: `0.74.5`
