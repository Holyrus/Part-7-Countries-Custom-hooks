import { useState, useEffect } from "react"
import axios from "axios"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchCountry = async () => {
      if (!name) return
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        )
        console.log(response)
        if (response) {
          setCountry({
            data: {
              name: response.data.name.common,
              capital: response.data.capital[0],
              population: response.data.population,
              flag: response.data.flags.svg,
            },
          })
        } else {
          setCountry(null)
        }
      } catch (error) {
        setCountry(null)
      }
    }
    fetchCountry()
  }, [name])
  
  console.log(country)
  return country
}