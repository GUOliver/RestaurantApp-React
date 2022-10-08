import React from 'react'

import '../styles/Card.css'
import editIcon from '../assets/edit.svg'
import { ReactComponent as Star } from '../assets/star.svg'

// Finally to access this state in our Card 
// component, declare a props argument
const Card = (props) => {

    const renderStars = (numStars) => {
        let stars = [] // Declare an empty array
        for (let i = 0; i < numStars; i++) {
          // Add a new Star component to the stars array.
          stars.push(
            <Star key={i} className='starIcon' />
          )
        }
        return stars
    }

    return (
        <div className='card'>
          <img className="iconBtn editBtn" src={editIcon} alt="Edit place info"></img>
          <h3>{props.info.name}</h3>
          <h4>{props.info.tags.join(" • ")}</h4>
          <h4>{props.info.address}</h4>
          <h4>
            {/* target="blank" makes the link open in a new tab */}
            <a href={props.info.website} target="blank">
              machiavelli.com.au
            </a>
          </h4>
          <p>{props.info.notes}</p>
          <div className="metricsContainer">
            <div className="ratingContainer">
              {props.info.rating > 0 ? (
                <>
                  Rating {props.info.rating}/5
                  {renderStars(props.info.rating)}
                </>
              ) : (
                "Not rated yet"
              )}
            </div>
            <div className="visitsContainer">
              {props.info.visits > 0 ? (
                `Visited ${props.info.visits} times`
              ) : (
                "Not visited yet"
              )}
            </div>
          </div>
        </div>
    )
}

export default Card