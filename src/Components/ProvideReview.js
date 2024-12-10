import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const StarRating = ({ setReview, reviewValue }) => {
    const [rating, setRating] = useState(reviewValue || 0);
  
    const handleRating = (value) => {
      setRating(value);
      setReview(value); // Set the review state to the selected star rating
    };
  
    return (
      <div>
        {[...Array(10)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              style={{ cursor: 'pointer', color: starValue <= rating ? 'gold' : 'gray' }}
              onClick={() => handleRating(starValue)}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  };

  
function ProvideReview() {
    const [Fullname, setsetFullname] = useState('');
    const [ServiceCategory, setServiceCategory] = useState('');
    const [review1, setReview1] = useState('');
    const [review2, setReview2] = useState('');
    const [review3, setReview3] = useState('');
    const [description, setDescription] = useState('');
  
    const [Error, setError] = useState(false);
  
    const addReview = async () => {
      if (!Fullname || !ServiceCategory || !review1 || !review2 || !review3 || !description) {
        setError(true);
        return false;
      }
      //const userId = JSON.parse(localStorage.getItem('User'))._id;
  
      let result = await fetch('http://localhost:5000/add-review', {
        method: 'post',
        body: JSON.stringify({ Fullname, ServiceCategory, review1, review2, review3, description }),
        headers: { 'Content-type': 'application/json' }
      });
      result = await result.json();
      // navigate("/")
    };
  
    return (
      <div>
        <h1>Candidate Review</h1>
  
        <input
          type='text'
          placeholder='Enter candidate name'
          onChange={(e) => setsetFullname(e.target.value)}
          value={Fullname}
        />
        {Error && !Fullname && <span>Enter valid name</span>}
  
        <input
          type='text'
          placeholder='Enter candidate category'
          onChange={(e) => setServiceCategory(e.target.value)}
          value={ServiceCategory}
        />
        {Error && !ServiceCategory && <span>Enter valid domain</span>}
  
        {/* Star rating for Review 1 */}
        <h3>Review 1</h3>
        <StarRating setReview={setReview1} reviewValue={review1} />
        {Error && !review1 && <span>Enter valid review</span>}
  
        {/* Star rating for Review 2 */}
        <h3>Review 2</h3>
        <StarRating setReview={setReview2} reviewValue={review2} />
        {Error && !review2 && <span>Enter valid review</span>}
  
        {/* Star rating for Review 3 */}
        <h3>Review 3</h3>
        <StarRating setReview={setReview3} reviewValue={review3} />
        {Error && !review3 && <span>Enter valid review</span>}
  
        <input
          type='text'
          placeholder='Overall candidate (text input)'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        {Error && !description && <span>Enter valid description</span>}
  
        <button type='button' onClick={addReview}>
          Add review
        </button>
        <Link to='/ReviewSuccesful'>Next</Link>
      </div>
    );
  }

export default ProvideReview
