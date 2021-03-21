import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Dashboard() {
	// let [ resources, setResources ] = useState([ {} ]);
	//     axios.get('')
	//   .then(function (response) {
	//     // handle success
	//     console.log(response);
	//   })
	//   .catch(function (error) {
	//     // handle error
	//     console.log(error);
	//   })
	//   .then(function () {
	//     // always executed
	//   });
	let url = 'https://bestresources.herokuapp.com/resource/';
	// let response = fetch(url);

	// let commits = response.JSON();
	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(null);

	useEffect(() => {
		const ac = new AbortController();
		axios(url)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data: ', error);
				setError(error);
			})
			.finally(() => {
				setLoading(false);
				 
			}).then(() => {
				ac.abort();
			});
			
	});
	if (loading) return 'Loading...';
	if (error) return 'Error!';
	let style = {
		margin: '20px',
		background: '#eeeeee',
        textDecoration: "none"
	};
	return (
		<div>
			<div>dashboard</div>
			<div>
				{data ? (
					data.map((x) => (
						<div style={style}>
							<a href={x.link} target="_blank" rel="noreferrer"> 
								<div>{x.title}</div>
							</a>
						</div>
					))
				) : null}
			</div>
		</div>
	);
}

export default Dashboard;
