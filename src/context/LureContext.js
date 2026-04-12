import { createContext, useContext, useEffect, useState } from "react";
import { getLures, saveLures, deleteLure as storageDelete } from "../storage/lureStorage";

const LureContext = createContext();

export function LureProvider({ children }) {
  const [lures, setLures] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadLures() {
    setLoading(true);
    const data = await getLures();
    setLures(data || []);
    setLoading(false);
  }

  // Lisää tai päivitä uistin
  async function addLure(lure) {
    setLures((prev) => {
      const exists = prev.find((l) => l.id === lure.id);

      let newList;
      if (exists) {
        newList = prev.map((l) => (l.id === lure.id ? lure : l));
      } else {
        newList = [...prev, lure];
      }

      saveLures(newList);
      return newList;
    });
  }

  // Poista uistin
  async function deleteLure(id) {
    setLures((prev) => {
      const newList = prev.filter((l) => l.id !== id);
      saveLures(newList);
      return newList;
    });

    await storageDelete(id);
  }

  useEffect(() => {
    loadLures();
  }, []);

  return (
    <LureContext.Provider
      value={{
        lures,
        loading,
        addLure,
        deleteLure,
        reload: loadLures,
      }}
    >
      {children}
    </LureContext.Provider>
  );
}

export function useLureContext() {
  return useContext(LureContext);
}