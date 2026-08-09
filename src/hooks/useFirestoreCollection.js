import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export function useFirestoreCollection(collectionName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      const timeoutId = setTimeout(() => {
        setLoading(false);
        setData([]);
      }, 0);

      return () => clearTimeout(timeoutId);
    }

    const q = query(
      collection(db, collectionName),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setData(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName, user, authLoading]);

  async function addItem(itemData) {
    await addDoc(collection(db, collectionName), {
      ...itemData,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    });
  }

  async function updateItem(id, updates) {
    const itemRef = doc(db, collectionName, id);
    await updateDoc(itemRef, updates);
  }

  async function deleteItem(id) {
    const itemRef = doc(db, collectionName, id);
    await deleteDoc(itemRef);
  }

  return { data, loading, addItem, updateItem, deleteItem };
}