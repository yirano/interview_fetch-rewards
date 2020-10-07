import React, { useEffect, useState } from "react"
import axios from "axios"

export const App = () => {
	const [ filtered, setFiltered ] = useState()
	useEffect(() => {
		axios
			.get("https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json")
			.then((res) => {
				setFiltered(
					res.data.filter((blank) => {
						return blank.name
					})
				)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])
	return (
		<div>
			<h1>App Component</h1>
		</div>
	)
}
