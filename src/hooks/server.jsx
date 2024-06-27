import { useEffect, useState } from 'react'
import axios from 'axios'

const fetchItems = (url) => {
  const [data, setData] = useState([])
  const getItems = async () => {
    const respond = await axios.get(url)
    setData(respond)
  }
  useEffect(() => {
    getItems()
  }, [url])

  return { data }
}

export default fetchItems
