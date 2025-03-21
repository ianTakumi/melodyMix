import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// Get all orders based on artist
export const getAllOrders = async (req, res, next) => {
  try {
    const { artistId } = req.params;

    if (!artistId) {
      return next({
        statusCode: 400,
        message: "Artist ID is required",
      });
    }

    const orders = await Order.find({
      artistId,
    })
      .populate("userId items.productId")
      .exec();

    res.status(200).json({
      success: true,
      message: "Successfully fetched all orders!",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    next({
      statusCode: 500,
      message: "An error occurred while fetching the orders",
      error: error.message,
    });
  }
};

// Get all orders for a user
export const getAllOrdersForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return next({
        statusCode: 400,
        message: "User ID is required",
      });
    }

    const orders = await Order.find({
      userId,
    })
      .populate("userId items.productId")
      .exec();

    res.status(200).json({
      success: true,
      message: "Successfully fetched all orders!",
      data: orders,
    });
  } catch (error) {
    console.log("Error fetching orders", error);
    next({
      statusCode: 500,
      message: "An error occured while fetching the orders ",
      error: error.message,
    });
  }
};

// Get single order
export const getOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate(
      "userId items.productId"
    );

    if (!order) {
      return next({
        statusCode: 404,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched order!",
      data: order,
    });
  } catch (error) {
    console.log("Error fetching orders", error);
    next({
      statusCode: 500,
      message: "An error occured while fetching the orders ",
      error: error.message,
    });
  }
};

// Create order
export const createOrder = async (req, res, next) => {
  try {
    const { userId, items, address, paymentMethod } = req.body;

    console.log(items);
    if (!items || !items.length || !address || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let artistOrders = {}; // Store orders per artist

    for (const item of items) {
      const { product_id, quantity } = item;

      // Fetch the product to get price and artistId
      const product = await Product.findById(product_id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${product_id} not found` });
      }

      const { artistId, price } = product;

      // Group products by artistId
      if (!artistOrders[artistId]) {
        artistOrders[artistId] = {
          userId,
          artistId,
          items: [],
          address,
          paymentMethod,
          totalPrice: 0,
        };
      }

      const itemTotal = price * quantity;
      artistOrders[artistId].items.push({
        productId: product_id,
        quantity,
        price,
      });

      artistOrders[artistId].totalPrice += itemTotal;
    }

    // Create separate orders per artist
    const createdOrders = [];
    for (const artistId in artistOrders) {
      const orderData = artistOrders[artistId];

      const order = new Order({
        ...orderData,
        paymentStatus: orderData.paymentMethod === "COD" ? "Pending" : "Paid",
      });

      await order.save();
      createdOrders.push(order);
    }

    res.status(201).json({
      success: true,
      message: "Successfully created orders!",
      data: createdOrders,
    });
  } catch (error) {
    console.error("Error creating order", error);
    next({
      statusCode: 500,
      message: "An error occurred while creating the order",
      error: error.message,
    });
  }
};

// Update order
export const updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return next({
        statusCode: 404,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated order!",
      data: order,
    });
  } catch (error) {
    console.log("Error updating order", error);
    next({
      statusCode: 500,
      message: "An error occured while updating the order ",
      error: error.message,
    });
  }
};
