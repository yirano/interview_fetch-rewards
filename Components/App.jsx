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
	const [displayId, setDisplayId] = useState()
	const [render, setRender] = useState(filtered)

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
	const handleFilter = (e) => {
		const copy = [...filtered]
		const filter = copy.filter(item => e.target.value === 'all' ? item : item.listId == e.target.value)
		setRender(filter)
	}
	return (
		<StyledContainer>
			<Menu handleFilter={handleFilter} displayId={displayId} />
			{filtered ?
				!render ? filtered.sort((a, b) => a.name.split(' ')[1] - b.name.split(' ')[1]).map(item => <Card data={item} key={item.id} />)
					: render.sort((a, b) => a.name.split(' ')[1] - b.name.split(' ')[1]).map(item => <Card data={item} key={item.id} />)
				: null}
		</StyledContainer>
	)
}
