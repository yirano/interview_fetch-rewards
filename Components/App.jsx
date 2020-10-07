import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from 'styled-components'
import Card from "./Card"
import Menu from "./Menu"

const StyledContainer = styled.div`
	width: 800px;
	margin: auto;
`

export const App = () => {
	const [filtered, setFiltered] = useState()
	const [filterBy, setFilterBy] = useState()
	const [displayId, setDisplayId] = useState()

	useEffect(() => {
		axios
			.get("https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json")
			.then((res) => {
				setFiltered(
					res.data
						.filter((blank) => {
							return blank.name
						})
						.sort((a, b) => a.listId - b.listId)
				)
				setDisplayId([...new Set(res.data.map(item => item.listId))].sort((a, b) => a - b))
			})
			.catch((err) => {
				console.log('Error fetching data --> ', err)
			})
	}, [])
	console.log(displayId)
	const handleFilter = (e) => {
		console.log('Select value --> ', e.target.value)
	}
	return (
		<StyledContainer>
			<Menu handleFilter={handleFilter} displayId={displayId} />
			{filtered ? filtered.sort((a, b) => a.name.split(' ')[1] - b.name.split(' ')[1]).map(item => <Card data={item} key={item.id} />) : null}
		</StyledContainer>
	)
}
