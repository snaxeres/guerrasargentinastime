// ADVERTENCIA: Este script utiliza el SDK de cliente de Firebase.
// Para un entorno de producción, es MUCHO MÁS RECOMENDABLE usar firebase-admin.
// Este script es una adaptación para cumplir con las dependencias del proyecto.

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, writeBatch, doc, getDocs } = require("firebase/firestore");
const fs = require('fs');
const path = require('path');

// --- INSTRUCCIONES ---
// 1. Crea un archivo `.env.local` en la raíz del proyecto.
// 2. Copia el contenido de `.env.example` y rellena tus credenciales de Firebase.
// 3. Ejecuta este script con: npm run seed
// ---------------------

// Cargar variables de entorno
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8').split('\n');
    envConfig.forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value.length > 0) {
            process.env[key.trim()] = value.join('=').trim();
        }
    });
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
    console.error("\nERROR: No se encontraron las credenciales de Firebase en .env.local.");
    console.error("Por favor, sigue las instrucciones del README y del script.\n");
    process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const warsData = require('../src/data/wars.sample.json');

async function seedDatabase() {
  const warsCollectionRef = collection(db, 'wars');
  
  console.log('Borrando datos antiguos de la colección "wars"...');
  try {
    const querySnapshot = await getDocs(warsCollectionRef);
    const deleteBatch = writeBatch(db);
    querySnapshot.forEach((doc) => {
        deleteBatch.delete(doc.ref);
    });
    await deleteBatch.commit();
    console.log('Datos antiguos borrados.');
  } catch (error) {
    console.error('Error al borrar datos antiguos:', error);
    process.exit(1);
  }

  console.log('Subiendo nuevos datos...');
  
  const writeNewBatch = writeBatch(db);
  
  warsData.wars.forEach((war) => {
    const docRef = doc(warsCollectionRef, war.id);
    writeNewBatch.set(docRef, war);
  });
  
  try {
    await writeNewBatch.commit();
    console.log(`\n¡Éxito! Se han subido ${warsData.wars.length} documentos a Firestore.`);
    console.log('Ahora puedes iniciar la aplicación con: npm run dev\n');
    process.exit(0);
  } catch (error) {
    console.error('Error al subir los datos:', error);
    console.error("\n** POSIBLE SOLUCIÓN **");
    console.error("Asegúrate de que tus reglas de Firestore permitan la escritura.");
    console.error("Para un script de seeding, temporalmente puedes usar:");
    console.error("rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /{document=**} {\n      allow read, write: if true;\n    }\n  }\n}\n");
    process.exit(1);
  }
}

seedDatabase();
