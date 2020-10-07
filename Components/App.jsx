import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from 'styled-components'
import Card from "./Card"

const StyledContainer = styled.div`
	width: 800px;
	margin: auto;
`

export const App = () => {
	const [filtered, setFiltered] = useState()
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
			})
			.catch((err) => {
				console.log('Error fetching data --> ', err)
			})
	}, [])
	return (
		<StyledContainer>
			{filtered ? filtered.sort((a, b) => a.name.split(' ')[1] - b.name.split(' ')[1]).map(item => <Card data={item} key={item.id} />) : null}
		</StyledContainer>
	)
}
