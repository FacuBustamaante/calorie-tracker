import { useState, type ChangeEvent, type Dispatch, type FormEvent, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import type { Activity } from "../types"
import type { ActivityActions } from "../reducers/activity-reducer"
import type { ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState

}

const initialState : Activity = {
        id: uuidv4(),
        category: 1,
        name: "",
        calories: 0
    }

function Form({ dispatch, state } : FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        console.log(isNumberField)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? Number(e.target.value) : e.target.value
        })
    }

    const isValidActivitiy = () => {
        const { name, calories } = activity
        return name.trim() != '' && calories > 0
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: {newActivity: activity}})

        setActivity({
            ...initialState,
            id: uuidv4(),
        })
    }


    return (
        <form 
            className="space-y-5 bg-white p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría</label>
                <select 
                    id="category"
                    value={activity.category}
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad</label>
                <input 
                    type="text" 
                    id="name" 
                    className="border border-slate-300 p-2 rounded-lg" 
                    placeholder="Ej: Caminar, Jugo de naranja, Ensalada, Ejercicio, etc."
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Calorías</label>
                <input 
                    type="number" 
                    id="calories" 
                    className="border border-slate-300 p-2 rounded-lg" 
                    placeholder="Ej: 300"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>
            <input type="submit" value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
                className="bg-gray-800 rounded-lg disabled:opacity-10 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
                disabled={!isValidActivitiy()}
            />
        </form>
    )
}

export default Form