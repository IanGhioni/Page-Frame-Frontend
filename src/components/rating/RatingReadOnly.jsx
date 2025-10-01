import Rating from '@mui/material/Rating';

const RatingReadOnly= ({value, className}) => {
    return(
        <Rating name="half-rating-read" defaultValue={value} precision={0.1} readOnly size="large" className={className}/>
    )
}

export default RatingReadOnly