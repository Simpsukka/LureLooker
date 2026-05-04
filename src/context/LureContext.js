import { createContext, useContext, useEffect, useState } from "react";
import {
  getLures,
  saveLures,
  deleteLure as storageDelete,
} from "../storage/lureStorage";

const LureContext = createContext();

export function LureProvider({ children }) {
  const [lures, setLures] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------------------------------------------
     Lataa uistimet tallennuksesta
  --------------------------------------------------- */
  async function loadLures() {
    setLoading(true);
    const data = await getLures();
    setLures(data || []);
    setLoading(false);
  }

  /* ---------------------------------------------------
     Lisää tai päivitä uistin
  --------------------------------------------------- */
  async function addLure(lure) {
    setLures((prev) => {
      const id = String(lure.id);
      const exists = prev.some((l) => String(l.id) === id);

      const updatedList = exists
        ? prev.map((l) => (String(l.id) === id ? lure : l))
        : [...prev, lure];

      // Tallennus
      saveLures(updatedList);

      return updatedList;
    });
  }

  /* ---------------------------------------------------
     Poista uistin
  --------------------------------------------------- */
  async function deleteLure(id) {
    const idStr = String(id);

    setLures((prev) => {
      const updatedList = prev.filter((l) => String(l.id) !== idStr);

      // Tallennus
      saveLures(updatedList);

      return updatedList;
    });

    // Poista myös tallennuksesta
    await storageDelete(idStr);
  }

  /* ---------------------------------------------------
     Lataa uistimet käynnistyksessä
  --------------------------------------------------- */
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