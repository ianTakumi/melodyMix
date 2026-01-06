import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

let db;

// ✅ Initialize Database
export const initDB = async () => {
  db = await SQLite.openDatabaseAsync("cart.db");
};

// ✅ Initialize Cart Table
export const initCartDB = async () => {
  if (!db) await initDB();
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cart (
        id TEXT PRIMARY KEY, 
        name TEXT NOT NULL, 
        price REAL NOT NULL, 
        category TEXT NOT NULL, 
        image TEXT, 
        stock INTEGER NOT NULL, 
        quantity INTEGER NOT NULL, 
        totalPrice REAL NOT NULL
      )
    `);
    console.log("✅ Cart table initialized");
  } catch (error) {
    console.error("❌ Error initializing cart database:", error);
  }
};

export const addToCart = async (product, quantity = 1) => {
  if (!db) {
    console.error("❌ Database is not initialized!");
    return;
  }

  const validQuantity = Number(quantity);
  if (isNaN(validQuantity) || validQuantity <= 0) {
    console.error("❌ Invalid quantity:", quantity);
    return;
  }

  const productData = {
    id: product._id,
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image?.url || null,
    stock: product.stock,
    quantity: validQuantity,
    totalPrice: product.price * validQuantity,
  };

  console.log("🛒 Product Data:", productData);

  try {
    // Check if the product is already in the cart
    const existingProduct = await db.getFirstAsync(
      "SELECT * FROM cart WHERE id = ?",
      [productData.id]
    );

    if (existingProduct) {
      // If the product exists, update the quantity and total price
      const newQuantity = existingProduct.quantity + validQuantity;
      const newTotalPrice = newQuantity * productData.price;

      await db.runAsync(
        `UPDATE cart SET quantity = ?, totalPrice = ? WHERE id = ?`,
        [newQuantity, newTotalPrice, productData.id]
      );

      console.log("🔄 Updated quantity in cart:", productData.name);
    } else {
      // If the product doesn't exist, insert it
      await db.runAsync(
        `INSERT INTO cart (id, name, price, category, image, stock, quantity, totalPrice)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          productData.id,
          productData.name,
          productData.price,
          productData.category,
          productData.image,
          productData.stock,
          productData.quantity,
          productData.totalPrice,
        ]
      );

      console.log("✅ Item added to cart:", productData.name);
    }
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
  }
};

export const checkCartTable = async () => {
  if (!db) await initDB();

  try {
    const result = await db.getAllAsync(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='cart'`
    );

    if (result.length === 0) {
      console.error("❌ Cart table does not exist!");
    } else {
      console.log("✅ Cart table exists!");
    }
  } catch (error) {
    console.error("❌ Error checking cart table:", error);
  }
};

// ✅ Delete the SQLite Database File
const deleteDatabase = async () => {
  const dbPath = `${FileSystem.documentDirectory}SQLite/cart.db`;

  try {
    await FileSystem.deleteAsync(dbPath, { idempotent: true });
    console.log("✅ Database deleted successfully");
  } catch (error) {
    console.error("❌ Error deleting database:", error);
  }
};

// ✅ Reset the Database (Delete + Reinitialize)
export const resetDatabase = async () => {
  await deleteDatabase(); // Step 1: Delete database
  await initDB(); // Step 2: Reinitialize database
  await initCartDB(); // Step 3: Recreate cart table
  console.log("✅ Database reinitialized successfully");
};

export const getCartItems = async () => {
  if (!db) {
    console.error("❌ Database is not initialized!");
    return [];
  }

  try {
    const cartItems = await db.getAllAsync("SELECT * FROM cart;");
    console.log("🛒 Cart Items:", cartItems);
    return cartItems;
  } catch (error) {
    console.error("❌ Error fetching cart items:", error);
    return [];
  }
};

export const clearCart = async () => {
  if (!db) {
    console.error("❌ Database is not initialized!");
    return;
  }

  try {
    await db.runAsync("DELETE FROM cart;");
    console.log("✅ Cart cleared successfully");
  } catch (error) {
    console.error("❌ Error clearing cart:", error);
  }
};
