import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

  /* ---------------------------------------------------
     LAYOUT-KONTEINERIT
  --------------------------------------------------- */

  // ScrollView:n contentContainerStyle
  scrollContainer: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: "8%",
    paddingTop: "8%",
    paddingBottom: "12%",
    alignItems: "center",
  },

  // Yleinen container (Add, Edit, Result)
  container: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: "8%",
    paddingTop: "8%",
    paddingBottom: "12%",
    alignItems: "center",
  },

  // Index-sivun listalle (vähemmän marginaalia)
  listContainer: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: "4%",
    paddingTop: "4%",
    paddingBottom: "8%",
  },

  /* ---------------------------------------------------
     TEKSTIT
  --------------------------------------------------- */

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#fff",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 6,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  /* ---------------------------------------------------
     INPUTIT & KUVAT
  --------------------------------------------------- */

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
    resizeMode: "cover",
  },

  /* ---------------------------------------------------
     TAUSTA
  --------------------------------------------------- */

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: -1,
  },

  /* ---------------------------------------------------
     UI-ELEMENTIT
  --------------------------------------------------- */

  buttonWrapper: {
    alignItems: "center",
    marginVertical: 10,
  },

  dropdownSpacing: {
    marginBottom: 20,
  },

  topRightIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
});