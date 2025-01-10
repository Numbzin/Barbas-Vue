interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

//arquivo .env na raiz
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY as string,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN as string,
  projectId: process.env.VUE_APP_PROJECT_ID as string,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET as string,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID as string,
  appId: process.env.VUE_APP_APP_ID as string,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID as string,
};

export default firebaseConfig;
