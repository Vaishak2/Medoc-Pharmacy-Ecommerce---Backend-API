import { Router } from 'express';
import {
    postCustomerReview,
    getAllCustomerReviews, 
    getReviewLikeDislikeCount, 
    updateCustomerReviewById, 
    updateCustomerReviewIsLikeById,
    getCustomerReviewsByProductId
} from '../controllers/customerReviewController';

const router = Router();

router.post('/customer-review', postCustomerReview);
router.put('/customer-review/:reviewId', updateCustomerReviewById); // Add this line for updating review++
router.get('/customer-reviews', getAllCustomerReviews);
router.get('/customer-reviews/:productId/:pageNumber', getCustomerReviewsByProductId);
// router.get('/customer-reviews/user/:userId', getCustomerReviewsByUserId);
// router.get('/customer-review/:reviewId/like-dislike', getReviewLikeDislikeCount);
router.put('/customer-review/:reviewId/isLike', updateCustomerReviewIsLikeById);

export default router;

