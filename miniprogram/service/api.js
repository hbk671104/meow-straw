import queryString from 'query-string'
import { fetch } from '../utils/util.js'

const base_url = 'https://api.thecatapi.com/v1'

export const search = (params = {}) => fetch(`${base_url}/images/search?${queryString.stringify(params)}`)

export const fetchBreed = (params = {}) => fetch(`${base_url}/breeds?${queryString.stringify(params)}`)

export const fetchCategory = (params = {}) => fetch(`${base_url}/categories?${queryString.stringify(params)}`)