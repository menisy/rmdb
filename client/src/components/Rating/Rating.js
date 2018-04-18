import React, { Component } from 'react'
import StarRatings from 'react-star-ratings'

class Rating extends Component {
    constructor(props){
      super(props)
      this.changeRating = this.changeRating.bind(this)
    }

    shouldComponentUpdate = () => {
      return true
    }

    changeRating = ( newRating ) => {
      this.props.onRating(newRating);
    }

    render() {
      let starWidget
      if(this.props.editable){
        starWidget = <StarRatings
                        rating={this.props.rating}
                        starDimension="1.5rem"
                        starSpacing=".1rem"
                        starRatedColor="#febf02"
                        starEmptyColor="#999"
                        starHoverColor="#fe7602"
                        changeRating={this.changeRating}
                      />
      }else{
        starWidget = <StarRatings
                        rating={this.props.rating}
                        starDimension="1.5rem"
                        starSpacing=".1rem"
                        starRatedColor="#febf02"
                        starEmptyColor="#999"
                      />
      }
      return (
        <div className="rating d-inline">
          {starWidget}
        </div>
      );
    }
}

export default Rating