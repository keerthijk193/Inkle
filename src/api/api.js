import axios from 'axios'

const BASE = 'https://685013d7e7c42cfd17974a33.mockapi.io'

export async function getTaxes() {
	const res = await axios.get(`${BASE}/taxes`)
	return res.data
}

export async function getCountries() {
	const res = await axios.get(`${BASE}/countries`)
	return res.data
}

export async function updateTax(id, payload) {
	const res = await axios.put(`${BASE}/taxes/${id}`, payload)
	return res.data
}

export default { getTaxes, getCountries, updateTax }

