import React from 'react'

const Menu = (props) => {
    console.log(props)
    return (
        <div>
            <select id="selectId" name="selectId" onChange={(e) => props.handleFilter(e)}>
                <option disabled selected value>-- Filter by List ID --</option>
                <option value="all">All</option>
                {props.displayId ? props.displayId.map(id => {
                    return <option value={id}>{id}</option>
                }) : null}
            </select>
        </div>
    )
}

export default Menu
