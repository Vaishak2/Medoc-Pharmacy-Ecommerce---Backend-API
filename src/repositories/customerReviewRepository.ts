import { getRepository, LessThan, MoreThan } from 'typeorm';
import { CustomerReview } from '../models/customerReview';
import { CustomerReviewLike } from '../models/customerReviewLikes';

export const createCustomerReview = async (
  userId: number,
  productId: number,
  rating: number,
  customerImg: string[],
  reviewTitle: string,
  reviewDescription: string,
  is_like: boolean,
  like: number,
  dislike: number
) => {
  const customerReviewRepository = getRepository(CustomerReview);

  // Check if a review already exists for the same user and product
  const existingReview = await customerReviewRepository.findOne({
    where: {
      user: { id: userId },
      product: { id: productId },
    },
  });

  if (existingReview) {
    throw new Error('Review already exists');
  }

  const newReview = customerReviewRepository.create({
    user: { id: userId },
    product: { id: productId },
    rating,
    customer_img: customerImg,
    review_title: reviewTitle,
    review_description: reviewDescription,
    is_like,
    like,
    dislike,
  });

  await customerReviewRepository.save(newReview);
  return newReview;
};

// -------------------------------------------------------------------------------------------------------------

export const getCustomerReviews = async () => {
  const customerReviewRepository = getRepository(CustomerReview);
  return await customerReviewRepository.find({ relations: ['user', 'product'] });
};
// As of now not required
// export const getCustomerReviewsByUserId = async (userId: number) => {
//   const customerReviewRepository = getRepository(CustomerReview);
//   return await customerReviewRepository.find({
//     where: { user: { id: userId } },
//     relations: ['user', 'product'],
//   });
// };
// -------------------------------------------------------------------------------------------------------------

export const getReviewsByProductId = async (
  productId: number,
  pageNumber: number = 1,
  pageSize: number = 10,
  filter: string = 'mostHelpful' // Default filter
) => {
  const reviewRepository = getRepository(CustomerReview);

  // Calculate offset for pagination
  const offset = (pageNumber - 1) * pageSize;

  // Define the order and where conditions based on the filter
  let orderCondition: any = {};
  let whereCondition: any = { product: { id: productId } };

  switch (filter) {
    case 'mostRecent':
      orderCondition = { date: 'DESC' };
      break;
    case 'positive':
      orderCondition = { rating: 'DESC' };
      whereCondition.rating = MoreThan(2);
      break;
    case 'negative':
      orderCondition = { rating: 'ASC' };
      whereCondition.rating = LessThan(2);
      break;
    default: // 'mostHelpful'
      orderCondition = { like: 'DESC' };
      break;
  }

  // Fetch reviews with pagination and filtering
  const [reviews, totalReviews] = await reviewRepository.findAndCount({
    where: whereCondition,
    relations: ['product', 'user'],
    skip: offset,
    take: pageSize,
    order: orderCondition,
  });

  if (reviews.length === 0) {
    return {
      message: 'No reviews found for this product',
      totalRatingSum: 0,
      averageRating: 0,
      customerImages: [],
      reviews: [],
      totalReviews: 0,
      totalPages: 0,
      currentPage: pageNumber,
    };
  }

  // Calculate total rating sum and average rating
  const totalRatingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRatingSum / reviews.length;

  // Collect customer images
  const customerImages = reviews.flatMap(review => review.customer_img);

  // Prepare response data
  return {
    reviews: reviews.map(review => ({
      id: review.id,
      user_id: review.user.id,
      user_name: review.user.username,
      product_id: review.product.id,
      rating: review.rating.toFixed(1),
      customer_img: review.customer_img,
      review_title: review.review_title,
      review_description: review.review_description,
      is_like: review.is_like,
      is_dislike : review.is_dislike,
      like: review.like,
      dislike: review.dislike,
      date: review.date,
    })),
    totalRatingSum: parseFloat(totalRatingSum.toFixed(1)),
    averageRating: parseFloat(averageRating.toFixed(1)),
    customerImages,
    totalReviews,
    totalPages: Math.ceil(totalReviews / pageSize),
    currentPage: pageNumber,
  };
};

// -------------------------------------------------------------------------------------------------------------
// As of now not required
export const getReviewLikesDislikes = async (reviewId: number) => {
  const customerReviewRepository = getRepository(CustomerReview);
  const review = await customerReviewRepository.findOne({ where: { id: reviewId } });

  if (!review) {
    throw new Error('Review not found');
  }

  return { like: review.like, dislike: review.dislike };
};

// -------------------------------------------------------------------------------------------------------------


export const updateCustomerReviewIsLike = async (
  reviewId: number,
  userId: number,
  isLike: boolean | null,
  isDislike: boolean | null
) => {
  const customerReviewRepository = getRepository(CustomerReview);
  const customerReviewLikeRepository = getRepository(CustomerReviewLike);

  // Find the review
  const review = await customerReviewRepository.findOne({ where: { id: reviewId } });
  if (!review) {
    throw new Error('Review not found');
  }

  // Update like and dislike counts based on the provided changes
  if (isLike !== null) {
    if (isLike) {
      review.is_like = true;
      review.is_dislike = false
      review.like += 1;
      review.dislike = Math.max(0, review.dislike - 1); // Decrease dislike if it was previously disliked

    } else {
      // review.like = Math.max(0, review.like - 1); // Decrease like if it was previously liked

    }
  }

  if (isDislike !== null && isDislike !== false) {
    if (isDislike) {
      review.is_dislike = true;
      review.is_like = false;
      review.dislike += 1;
      review.like = Math.max(0, review.like - 1); // Decrease like if it was previously liked
    } else {
      // review.dislike = Math.max(0, review.dislike - 1); // Decrease dislike if it was previously disliked
    }
  }

  // Find or create a new like/dislike entry for the user and review
  let reviewLike = await customerReviewLikeRepository.findOne({
    where: { review: { id: reviewId }, user: { id: userId } }
  });

  if (reviewLike) {
    // If the user already liked/disliked the review, update the like/dislike status
    if (isLike !== null) reviewLike.isLike = isLike;
    if (isDislike !== null) reviewLike.isDislike = isDislike;
  } else {
    // If the user hasn't liked/disliked the review, create a new like/dislike entry
    reviewLike = customerReviewLikeRepository.create({
      review,
      user: { id: userId },
      isLike: isLike ?? false,      // Defaults to false if null
      isDislike: isDislike ?? false // Defaults to false if null
    });
  }
  await customerReviewLikeRepository.save(reviewLike);

  // Save the updated review
  await customerReviewRepository.save(review);

  return review;
};



// -------------------------------------------------------------------------------------------------------------

export const updateCustomerReview = async (
  reviewId: number,
  rating: number,
  customerImg: string[],
  reviewTitle: string,
  reviewDescription: string,
  is_like: boolean,
  like: number,
  dislike: number
) => {
  const customerReviewRepository = getRepository(CustomerReview);
  const review = await customerReviewRepository.findOne({ where: { id: reviewId } });

  if (!review) {
    throw new Error('Review not found');
  }

  review.rating = rating;
  review.customer_img = customerImg;
  review.review_title = reviewTitle;
  review.review_description = reviewDescription;
  review.is_like = is_like;
  review.like = like;
  review.dislike = dislike;

  await customerReviewRepository.save(review);
  return review;
};
// -------------------------------------------------------------------------------------------------------------
export const deleteReview = async (id: number) => {
  const reviewRepository = getRepository(CustomerReview);
  return await reviewRepository.delete(id);
};