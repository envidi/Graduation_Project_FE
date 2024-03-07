import { useEffect, useState } from 'react'
import axios from 'axios'
import FoodType from '@/Interface/food'
import BarLoader from 'react-spinners/BarLoader'

export const FoodSection = () => {
    const override = {
        display: 'block',
        margin: '1.6rem auto',
    }
    const [foods, setFoods] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/food`
                )
                setFoods(response.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const foodOptions = foods.map((food: FoodType) => (
        <div key={food._id} className="food-item">
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>{`$${food.price.toFixed(2)}`}</p>
            <button onClick={() => (food)}>Add to cart</button>
        </div>


    ))
    return (
        <div>
            <div className="form-item-heading">Select a movie</div>
            {loading && <BarLoader cssOverride={override} color="#eb3656" />}
            {!loading && <div className="form-movie-options">{foodOptions}</div>}
        </div>
    )
}