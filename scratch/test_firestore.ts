
import { db, auth } from './src/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

async function testFirestore() {
  console.log("Checking Firestore connectivity...");
  if (!db) {
    console.error("Firestore (db) is not initialized. Check your environment variables.");
    return;
  }

  try {
    const testCol = collection(db, 'test_connection');
    await addDoc(testCol, { timestamp: new Date(), message: "Testing connectivity from antigravity" });
    console.log("SUCCESS: Firestore write successful!");
  } catch (error) {
    console.error("FAILURE: Firestore write failed.", error);
  }
}

testFirestore();
