import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
    border-bottom: 1px solid black;
    padding: 0 20px;
`
const Card = (props) => {
    const { name, id } = props.data
    return (
        <StyledCard>
            <p>{name}</p>
            <p>{id}</p>
        </StyledCard>
    )
}

export default Card
