import Rating from '@mui/material/Rating';

const RatingReadOnly= ({value}) => {
    return(
        <Rating name="half-rating-read" defaultValue={value} precision={0.01} readOnly size="large"/>
    )
}

export default RatingReadOnly