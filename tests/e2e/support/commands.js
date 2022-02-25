// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDa6RQibKeQ6rAxgxEaSofOCVfP9-NmoIc",
  authDomain: "gallery-8ea08.firebaseapp.com",
  projectId: "gallery-8ea08",
  storageBucket: "gallery-8ea08.appspot.com",
  messagingSenderId: "105668786956",
  appId: "1:105668786956:web:65d7d9486ddbc04b6ee729"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// -- This is a parent command --
Cypress.Commands.add("login", () => {
  cy.fixture('user').then(({ email, password }) => {
    return firebase.default.auth().signInWithEmailAndPassword(email, password)
  })
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
