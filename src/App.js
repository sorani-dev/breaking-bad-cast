import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CharacterGrid from './components/characters/CharacterGrid'
import Header from './components/ui/Header'
import Search from './components/ui/Search'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setIsLoading(true)
    const getItems = async () => {
      try {
        const result = await axios.get(`https://www.breakingbadapi.com/api/characters?name=${query}`)
        setItems(result.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getItems()
  }, [query])

  return (
    <div className='container'>
      <Header />
      <Search getQuery={q => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  )
}

export default App
