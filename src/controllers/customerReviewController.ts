import { Request, Response } from 'express';
import {
  createCustomerReview,
  deleteReview,
  getCustomerReviews,
  //   getCustomerReviewsByUserId,
  getReviewLikesDislikes,
  getReviewsByProductId,
  updateCustomerReview,
  updateCustomerReviewIsLike
} from '../repositories/customerReviewRepository';

export const postCustomerReview = async (req: Request, res: Response) => {
  const {
    userId,
    productId,
    rating,
    customerImg,
    reviewTitle,
    reviewDescription,
    isLike,
    like,
    dislike
  } = req.body;

  try {
    const newReview = await createCustomerReview(
      Number(userId),
      Number(productId),
      Number(rating),
      customerImg,
      reviewTitle,
      reviewDescription,
      isLike,
      Number(like),
      Number(dislike)
    );
    res.status(201).json({ message: 'Review created successfully', data: newReview });
  } catch (error) {
    if ((error as Error).message === 'Review already exists') {
      res.status(409).json({ message: 'Review already exists' });
    } else {
      res.status(500).json({ message: 'Error creating review', error });
    }
  }
};
// -------------------------------------------------------------------------------------------------------------

export const getAllCustomerReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await getCustomerReviews();
    res.status(200).json({ message: 'Success', data: reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

// export const getCustomerReviewsByUserId = async (req: Request, res: Response) => {
//   const { userId } = req.params;

//   try {
//     const reviews = await getCustomerReviewsByUserId(Number(userId));
//     res.status(200).json({ message: 'Success', data: reviews });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching reviews by user ID', error });
//   }
// };
// -------------------------------------------------------------------------------------------------------------

export const getReviewLikeDislikeCount = async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  try {
    const likeDislikeCount = await getReviewLikesDislikes(Number(reviewId));
    res.status(200).json({ message: 'Success', data: likeDislikeCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching like/dislike count', error });
  }
};

export const updateCustomerReviewIsLikeById = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const { isLike , userId } = req.body;
  // const userId = req.user.id; // Assuming you have user information in the request

  try {
    const updatedReview = await updateCustomerReviewIsLike(Number(reviewId), userId, Boolean(isLike));
    res.status(200).json({
      message: 'Review like status updated successfully',
      data: updatedReview,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating review like status',
      error:(error as Error).message,
    });
  }
};
// -------------------------------------------------------------------------------------------------------------

export const getCustomerReviewsByProductId = async (req: Request, res: Response) => {
  const { productId, pageNumber } = req.params;
  const { pageSize = 10, filter } = req.query;

  try {
    const reviewsData = await getReviewsByProductId(
      Number(productId),
      Number(pageNumber),
      Number(pageSize),
      String(filter)
    );

    res.json({
      message: 'Reviews fetched successfully',
      data: reviewsData,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching reviews',
      error: (error as Error).message,
    });
  }
};
// -------------------------------------------------------------------------------------------------------------

export const updateCustomerReviewById = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const {
    rating,
    customerImg,
    reviewTitle,
    reviewDescription,
    isLike,
    like,
    dislike
  } = req.body;

  try {
    const updatedReview = await updateCustomerReview(
      Number(reviewId),
      rating,
      customerImg,
      reviewTitle,
      reviewDescription,
      isLike,
      Number(like),
      Number(dislike)
    );
    res.status(200).json({ message: 'Review updated successfully', data: updatedReview });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error });
  }
};
// -------------------------------------------------------------------------------------------------------------

export const deleteCustomerReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteReview(Number(id));
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};
