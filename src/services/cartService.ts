import { getRepository } from 'typeorm';
import { Carts } from '../models/cart';
import { Product } from '../models/product';
import { User } from '../models/user';
import { Wishlist } from '../models/wishlistModel';
import { Notification } from '../models/notificationModel';
import Coupon from '../models/couponModel';
import { Address } from '../models/address';
import { Order } from '../models/orderModel';



export const addToCart = async (userId: number, productId: number, quantity: number, size:string) => {
    // try {
        const userRepository = getRepository(User);
        const productRepository = getRepository(Product);
        const cartRepository = getRepository(Carts);

        const user = await userRepository.findOne({ where: { id: userId } });
        const product = await productRepository.findOne({ where: { id: productId } });

        if (!user || !product) {
            return { message: 'User or Product not found' };
        }

        const cartItem = await cartRepository.findOne({ where: { user: { id: userId }, product: { id: productId } } });

        if (cartItem) {
            // return { message: 'Product already in cart' };
        } else {
            const newCartItem = cartRepository.create({ user, product, quantity, size });
            await cartRepository.save(newCartItem);

            product.isCart = true;
            await productRepository.save(product);

            const { id, quantity: cartQuantity } = newCartItem;

            return {
             
                    cartItem: {
                        id,
                        quantity: cartQuantity,
                        productId: product.id,
                        userId: user.id
                    }
                
            };
        }
    // } catch (error) {
    //     console.error('Error adding product to cart:', error);
    //     return { message: 'Error adding product to cart', error:( error as Error).message };
    // }
};

export const removeFromCart = async (userId: number, productId: number) => {
    try {
        const userRepository = getRepository(User);
        const productRepository = getRepository(Product);
        const cartRepository = getRepository(Carts);

        const user = await userRepository.findOne({ where: { id: userId } });
        const product = await productRepository.findOne({ where: { id: productId } });

        if (!user || !product) {
            return { message: 'User or Product not found' };
        }

        const cartItem = await cartRepository.findOne({ where: { user: { id: userId }, product: { id: productId } } });

        if (!cartItem) {
            return { message: 'Cart item not found' };
        }

        await cartRepository.remove(cartItem);

        product.isCart = false;
        await productRepository.save(product);

        return { message: 'Product removed from cart successfully' };
    } catch (error) {
        console.error('Error removing product from cart:', error);
        return { message: 'Error removing product from cart', error: (error as Error).message };
    }
};

export const getCartDetails = async (userId: number, pageNumber: number, couponId?: number, couponAmount?: number) => {
    const cartRepository = getRepository(Carts);
    const couponRepository = getRepository(Coupon);
    const userRepository = getRepository(User);

    const pageSize = 10;
    const skip = (pageNumber - 1) * pageSize;

    const [cartItems, total] = await cartRepository.findAndCount({
        where: { user: { id: userId } },
        relations: ['product', 'user'],
        skip,
        take: pageSize
    });

    let subTotal = 0;
    let totalSavings = 0;
    cartItems.forEach(item => {
        const productPrice = item.product.price;
        const productQuantity = item.quantity;

        subTotal += productPrice * productQuantity;

        const beforePrice = item.product.beforePrice ? parseFloat(item.product.beforePrice) : productPrice;
        totalSavings += (beforePrice - productPrice) * productQuantity;
    });

    let couponDiscount = 0;
    if (couponId) {
        const coupon = await couponRepository.findOne({ where: { id: couponId, user: { id: userId } } });
        if (coupon && couponAmount) {
            couponDiscount = couponAmount;
            // Disable the coupon for the user
            coupon.is_applied = false;
            await couponRepository.save(coupon);
        }
    }

    const totalAmount = subTotal - couponDiscount;
    const taxes = Math.ceil(totalAmount * 0.05); // Assuming 5% tax rate

    return {
        cartItems,
        subTotal,
        totalSavings,
        couponDiscount,
        taxes,
        totalAmount: totalAmount + taxes,
        total,
        pageNumber,
        pageSize
    };
};

export const applyCoupon = (subTotal: number, couponDiscount: number) => {
    const totalSavings = subTotal * (couponDiscount / 100);
    const totalAmount = subTotal - totalSavings;
    return {
        totalSavings,
        totalAmount,
        couponDiscount
    };
};
export const updateCart = async (userId: number, productId: number, quantity: number, size: string) => {
    const cartRepository = getRepository(Carts);
    const productRepository = getRepository(Product);
    const cartItem = await cartRepository.findOne({ where: { user: { id: userId }, product: { id: productId } } });
    const product = await productRepository.findOne({
        where: { id: productId }
    });
  
    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    if (!product) {
        throw new Error('Product not found');
    }
  
    cartItem.quantity = quantity;
    cartItem.size = size;
    product.selectedSize= size;

    productRepository.save(product)
  
    return await cartRepository.save(cartItem);
  };

  export const getCountsByUserId = async (userId: number) => {
    const cartRepository = getRepository(Carts);
    const wishlistRepository = getRepository(Wishlist);
    const notificationRepository = getRepository(Notification);
  
    const cartCount = await cartRepository.count({ where:{ user: { id: userId } }});
    const wishlistCount = await wishlistRepository.count({ where: { user: { id: userId } }});
    const notificationCount = await notificationRepository.count({ where: { user: { id: userId } }});
  
    return {
      cartCount,
      wishlistCount,
      notificationCount,
    };
  };

  export const placeOrderFromCart = async (cartId: number) => {
    const cartRepository = getRepository(Carts);
    const orderRepository = getRepository(Order);
    const addressRepository = getRepository(Address);

    // Fetch the cart details using cartId
    const cart = await cartRepository.findOne({ where: { id: cartId }, relations: ['product', 'user'] });

    if (!cart) {
        throw new Error('Cart not found');
    }

    const user = cart.user;
    const product = cart.product;

    // Assume address is linked to the user (you can modify this if the address is directly linked to the cart)
    const address = await addressRepository.findOne({ where: { userId: user.id } });

    if (!address) {
        throw new Error('Address not found');
    }

    // Create a new order
    const newOrder = new Order(); // Create an empty Order instance

    // Assign values to the new order instance
    newOrder.user = user;
    newOrder.product = product;
    newOrder.address = address;
    newOrder.status = 'Pending'; // Or any default status you want to set
    newOrder.payment_method = 'Cash On Delivery'; // Or any default payment method you want to set
    newOrder.subTotal = cart.product.price * cart.quantity;
    newOrder.totalSavings = (cart.product.beforePrice ? parseFloat(cart.product.beforePrice) : cart.product.price) - cart.product.price;
    newOrder.totalAmount = cart.product.price * cart.quantity; // Calculate based on cart details
    newOrder.taxes = Math.ceil(cart.product.price * cart.quantity * 0.05); // Assuming 5% tax rate
    newOrder.couponDiscount = 0; // Set coupon discount if needed

    // Save the new order to the database
    await orderRepository.save(newOrder);

    // Optionally, clear the cart after placing the order
    await cartRepository.delete({ id: cartId });

    return newOrder;
};

export const placeOrderForUser = async (userId: number) => {
    const cartRepository = getRepository(Carts);
    const orderRepository = getRepository(Order);
    const addressRepository = getRepository(Address);


    // Fetch all cart items for the user
    const cartItems = await cartRepository.find({ where: { user: { id: userId } }, relations: ['product', 'user'] });

    if (cartItems.length === 0) {
        throw new Error('No items found in the cart for this user');
    }

    // Assume address is linked to the user (you can modify this if the address is directly linked to the cart)
    const address = await addressRepository.findOne({ where: { userId } });

    if (!address) {
        throw new Error('Address not found');
    }

    const orders = [];

    for (const cart of cartItems) {
        const user = cart.user;
        const product = cart.product;

        // Create a new order for each cart item
        const newOrder = new Order(); // Create an empty Order instance

        // Assign values to the new order instance
        newOrder.user = user;
        newOrder.product = product;
        newOrder.address = address;
        newOrder.status = 'Pending'; // Or any default status you want to set
        newOrder.payment_method = 'Cash On Delivery'; // Or any default payment method you want to set
        newOrder.subTotal = cart.product.price * cart.quantity;
        newOrder.totalSavings = (cart.product.beforePrice ? parseFloat(cart.product.beforePrice) : cart.product.price) - cart.product.price;
        newOrder.totalAmount = cart.product.price * cart.quantity; // Calculate based on cart details
        newOrder.taxes = Math.ceil(cart.product.price * cart.quantity * 0.05); // Assuming 5% tax rate
        newOrder.couponDiscount = 0; // Set coupon discount if needed

        // Save the new order to the database
        const savedOrder = await orderRepository.save(newOrder);
        orders.push(savedOrder);
    }

    // Optionally, clear the cart after placing the orders
    await cartRepository.delete({ user: { id: userId } });

    // return orders;
};