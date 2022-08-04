import { useParams } from 'react-router-dom'

const CountryReviewDetail = (props) => {

  const { countryname } = useParams()
 
  const review = props.reviews.find((review) => review.country === countryname)
  console.log(review);

  return (
      <div>
        <h3>Review Info:</h3>
          <h4>{review.name}</h4>
          <h6>
            <span>Lorem:</span>{review.lgbtqi_acceptance}
          </h6>
          <h6>
            <span>Lorem:</span>{review.racism_experience}
          </h6>
          <p>
            <span>Lorem:</span> {review.description}
          </p>
      </div>
    )
  }

export default CountryReviewDetail