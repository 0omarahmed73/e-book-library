import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useLocalStorage from "use-local-storage";
export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDVDgNW2ARViwB0CWq3TJPmEd-cZkrxmpQ",
    authDomain: "e-book-383d3.firebaseapp.com",
    projectId: "e-book-383d3",
    storageBucket: "e-book-383d3.appspot.com",
    messagingSenderId: "392246776100",
    appId: "1:392246776100:web:06cb130e6c12e76c35e3b1",
  };
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [userLogged, setUserLogged] = useState(null);
  const [error, setError] = useState(null);
  const [searchItems, setSearchItems] = useState([]);
  const [categoriesBook, setCategoriesBook] = useState([]);
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
  const [topBooks, setTopBooks] = useState(
    Array.from({ length: 10 }, () => ({
      author: "Author",
      title: "Title",
      description: "Description",
      image: "https://covers.openlibrary.org/b/olid/OL7353617M-L.jpg",
    }))
  );
  console.log(cartItems);
  useEffect(() => {
    const setAuthPersistence = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (error) {
        console.error("Error setting auth persistence:", error);
      }
    };

    setAuthPersistence();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogged(user.email.split("@")[0]);
      } else {
        setUserLogged(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  console.log("User logged in:", userLogged);
  const fetchTopBooks = async ({ setLoading }) => {
    try {
      setError(null);
      setLoading(true);
      // Intentionally incorrect URL to simulate an error
      const response = await fetch(
        "https://openlibrary.org/subjects/science_fiction.json?limit=10"
      );

      if (!response.ok) {
        setError("An error occurred while fetching top books");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (!data.works) {
        setError("Invalid response format");
        setLoading(false);
        return;
      }

      setTopBooks(() => {
        return data.works.map((book, i) => {
          const id = book.cover_edition_key || book.edition_key || "OL7353617M";
          const author =
            book.authors && book.authors[0]
              ? book.authors[0].name
              : "Unknown Author";
          const image = book.lending_edition
            ? `https://covers.openlibrary.org/b/olid/${book.lending_edition}-L.jpg`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKBy5Ilf73CAs_rS3Q-seUA7bWwordFduMA&s";
          const title = book.title || "No Title Available";
          const description =
            book.description ||
            "lorem ipsum dsadsa dsadsadas sdasdsa dsadasas sadsasas jklfdd qqwe  dasdasas";

          return {
            id,
            author,
            title,
            description,
            image,
            selected: i === 0,
          };
        });
      });

      setLoading(false);
    } catch (error) {
      console.error("An error occurred while fetching top books:", error);
      toast.error("An error occurred while fetching top books");
      setError("An error occurred while fetching top books");
      setLoading(false);
    }
  };
  const fetchSearchItems = async ({ setLoading, query }) => {
    console.log("Searching for:", query);
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=10`
      );

      if (!response.ok) {
        setError("An error occurred while fetching top books");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (!data.docs || data.docs.length === 0) {
        setError("No books found");
        setLoading(false);
        return;
      }

      setSearchItems(() => {
        return data.docs.map((book, i) => {
          const id = book.cover_edition_key || book.edition_key || "OL7353617M";
          const author = book.author_name
            ? book.author_name[0]
            : "Unknown Author";
          const image = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKBy5Ilf73CAs_rS3Q-seUA7bWwordFduMA&s"; // Use cover_i for cover image
          const title = book.title || "No Title Available";
          const description = book.description || "No description available";

          return {
            id,
            author,
            title,
            description,
            image,
          };
        });
      });

      setLoading(false);
    } catch (error) {
      console.error("An error occurred while fetching top books:", error);
      setError("An error occurred while fetching top books");
      setLoading(false);
    }
  };

  const fetchCategoriesBooks = async ({ setLoading, category }) => {
    console.log("Searching for:", category);
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        `https://openlibrary.org/subjects/${category.toLowerCase()}.json?limit=10`
      );

      if (!response.ok) {
        setError("An error occurred while fetching top books");
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (!data.works || data.works.length === 0) {
        setError("No books found");
        setLoading(false);
        return;
      }

      setCategoriesBook(() => {
        return data.works.map((book, i) => {
          const id = book.cover_edition_key || book.edition_key || "OL7353617M";
          const author =
            book.authors && book.authors[0]
              ? book.authors[0].name
              : "Unknown Author";
          const image = book.lending_edition
            ? `https://covers.openlibrary.org/b/olid/${book.lending_edition}-L.jpg`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKBy5Ilf73CAs_rS3Q-seUA7bWwordFduMA&s";
          const title = book.title || "No Title Available";
          const description = book.description || "No description available";

          return {
            id,
            author,
            title,
            description,
            image,
          };
        });
      });

      setLoading(false);
    } catch (error) {
      console.error("An error occurred while fetching top books:", error);
      setError("An error occurred while fetching top books");
      setLoading(false);
    }
  };
  const addToCart = ({ item, quantity }) => {
    console.log("Adding to cart:", item);
    if (cartItems.find((book) => book.id === item.id)) {
      toast.error("Book already in cart");
      return;
    } else {
      setCartItems([...cartItems, { ...item, quantity, user: userLogged }]);
      toast.success("Book added to cart");
    }
  };
  const loginWithEmailAndPassword = async ({ setLoading, email, password }) => {
    try {
      setLoading(true);
      setError(null);
      const user = await signInWithEmailAndPassword(auth, email, password);
      setUserLogged(user.user.email.split("@")[0]);
      console.log("User logged in:", user);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      console.log("Error object:", error); // Log the entire error object for debugging

      let errorMessage = "An error occurred while logging in";

      // Check for specific Firebase error codes
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This user has been disabled.";
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUserLogged(false);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred while logging out:", error);
      setError("An error occurred while logging out");
      toast.error("An error occurred while logging out");
    }
  };

  const createUserWithEmailAndPassword = async ({
    setLoading,
    email,
    password,
  }) => {
    try {
      setLoading(true);
      setError(null);
      const user = await firebaseCreateUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserLogged(user.user.email.split("@")[0]);
      console.log("User created:", user);
      toast.success("User created successfully");
    } catch (error) {
      console.error("An error occurred while creating user:", error);
      let errorMessage = "An error occurred while creating user";

      // Check for specific Firebase error codes
      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "The email address is already in use by another account.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage = "Email/password accounts are not enabled.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak.";
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUserLogged(user.email.split("@")[0]);
      console.log("User logged in:", user);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      setError("An error occurred while logging in");
      toast.error("An error occurred while logging in");
    }
  };
  const addFavoriteItem = async ({ item }) => {
    try {
      const db = getFirestore(app);
      const docRef = await addDoc(collection(db, "favorites"), {
        ...item,
        user: userLogged,
      });
      console.log("Document written with ID: ", docRef.id);
      toast.success("Book added to favorites");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("An error occurred while adding book to favorites");
    }
  };
  const removeItemsFromCart = ({ item }) => {
    const newCartItems = cartItems.filter((book) => book.id !== item.id);
    setCartItems(newCartItems);
    toast.success("Book removed from cart");
  };
  const setupFavoritesListener = () => {
    if (!userLogged) return;

    const db = getFirestore(app);
    const favoritesCollection = collection(db, "favorites");
    const q = query(favoritesCollection, where("user", "==", userLogged));

    return onSnapshot(
      q,
      (snapshot) => {
        const updatedFavorites = snapshot.docs.map((doc) => doc.data());
        setFavoriteItems(updatedFavorites);
      },
      (error) => {
        console.error("Error fetching favorites:", error);
        toast.error("An error occurred while fetching favorite books");
      }
    );
  };
  const getFavoriteItemsByUser = async () => {
    try {
      const db = getFirestore(app);
      const favoritesCollection = collection(db, "favorites");
      const q = query(favoritesCollection, where("user", "==", userLogged));
      const querySnapshot = await getDocs(q);
      const favoriteItems = querySnapshot.docs.map((doc) => doc.data());
      console.log("Favorite items:", favoriteItems);
      setFavoriteItems(favoriteItems);
    } catch (error) {
      console.error("Error getting documents: ", error);
      toast.error("An error occurred while fetching favorite books");
    }
  };

  const removeFavoriteItem = async ({ item }) => {
    console.log("Removing item:", item);
    try {
      const db = getFirestore();
      const favoritesCollection = collection(db, "favorites");
      const q = query(
        favoritesCollection,
        where("user", "==", userLogged),
        where("id", "==", item.id)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        try {
          await deleteDoc(doc.ref);
        } catch (error) {
          console.error("Error deleting document:", error);
          toast.error("An error occurred while removing book from favorites");
        }
      });

      toast.success("Book removed from favorites");
    } catch (error) {
      console.error("Error getting documents: ", error);
      toast.error("An error occurred while removing book from favorites");
    }
  };

  return (
    <BooksContext.Provider
      value={{
        fetchTopBooks,
        topBooks,
        setTopBooks,
        error,
        fetchSearchItems,
        searchItems,
        setSearchItems,
        fetchCategoriesBooks,
        categoriesBook,
        setError,
        addToCart,
        loginWithEmailAndPassword,
        userLogged,
        logout,
        createUserWithEmailAndPassword,
        cartItems,
        addFavoriteItem,
        loginWithGoogle,
        removeItemsFromCart,
        getFavoriteItemsByUser,
        favoriteItems,
        setupFavoritesListener,
        removeFavoriteItem,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
