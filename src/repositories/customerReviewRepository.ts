import { getRepository } from 'typeorm';
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
  pageSize: number = 10
) => {
  const reviewRepository = getRepository(CustomerReview);

  // Calculate offset for pagination
  const offset = (pageNumber - 1) * pageSize;

  // Fetch reviews with pagination
  const [reviews, totalReviews] = await reviewRepository.findAndCount({
    where: { product: { id: productId } },
    relations: ['product', 'user'],
    skip: offset,
    take: pageSize,
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
  const review = await customerReviewRepository.findOne({where: { id : reviewId }});

  if (!review) {
    throw new Error('Review not found');
  }

  return { like: review.like, dislike: review.dislike };
};

// -------------------------------------------------------------------------------------------------------------

// export const updateCustomerReviewIsLike = async (reviewId: number, isLike: boolean) => {
//   const customerReviewRepository = getRepository(CustomerReview);
  
//   const review = await customerReviewRepository.findOne({ where: { id: reviewId } });

//   if (!review) {
//     throw new Error('Review not found');
//   }
//   // Adjust like and dislike counts based on the isLike value
//   if (isLike) {
//     review.like += 1;
//     review.dislike = Math.max(0, review.dislike - 1); // Ensure dislike doesn't go negative
//   } else {
//     review.dislike += 1;
//     review.like = Math.max(0, review.like - 1); // Ensure like doesn't go negative
//   }

//   // Update the is_like status
//   review.is_like = isLike;

//   await customerReviewRepository.save(review);

//   return review;
// };


export const updateCustomerReviewIsLike = async (reviewId: number, userId: number, isLike: boolean) => {
  const customerReviewRepository = getRepository(CustomerReview);
  const customerReviewLikeRepository = getRepository(CustomerReviewLike);

  // Find the review
  const review = await customerReviewRepository.findOne({ where: { id: reviewId } });
  if (!review) {
    throw new Error('Review not found');
  }

   // Update the is_like status
   review.is_like = isLike;

   // Update like and dislike counts based on the provided changes
   if (isLike) {
     review.like += 1;
     review.dislike = Math.max(0, review.dislike - 1);
   } else {
     review.dislike += 1;
     review.like = Math.max(0, review.like - 1);
   }
 
  // Find or create a new like/dislike entry for the user and review
  let reviewLike = await customerReviewLikeRepository.findOne({
    where: { review: { id: reviewId }, user: { id: userId } }
  });
  // console.log(reviewLike,"SSSSSSSSSSSS")

  if (reviewLike) {
    // If the user already liked/disliked the review, update the like status
    reviewLike.isLike = isLike;
  } else {
    // If the user hasn't liked/disliked the review, create a new like/dislike entry
    reviewLike = customerReviewLikeRepository.create({ review, user: { id: userId }, isLike });
  }
  await customerReviewLikeRepository.save(reviewLike);

  // // Recalculate like and dislike counts
  // const [likeCount, dislikeCount] = await Promise.all([
  //   customerReviewLikeRepository.count({ where: { review: { id: reviewId }, isLike: true } }),
  //   customerReviewLikeRepository.count({ where: { review: { id: reviewId }, isLike: false } })
  // ]);

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
    const review = await customerReviewRepository.findOne({where: { id : reviewId }});
  
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