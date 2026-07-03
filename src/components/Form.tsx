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


    const isFood = activity.category === 1

    return (
        <form
            className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                <span className="text-2xl">{isFood ? '🍽️' : '🏃'}</span>
                <h2 className="text-xl font-bold text-slate-800">
                    {isFood ? 'Registrar Comida' : 'Registrar Ejercicio'}
                </h2>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="category" className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Categoría
                </label>
                <select
                    id="category"
                    value={activity.category}
                    className="w-full border-2 border-slate-200 focus:border-emerald-400 focus:outline-none p-3 rounded-xl bg-white text-slate-700 font-medium transition-colors cursor-pointer"
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Actividad
                </label>
                <input
                    type="text"
                    id="name"
                    className="w-full border-2 border-slate-200 focus:border-emerald-400 focus:outline-none p-3 rounded-xl text-slate-700 font-medium transition-colors"
                    placeholder={isFood ? 'Ej: Ensalada, Jugo de naranja...' : 'Ej: Correr 30 min, Ciclismo...'}
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-1.5">
                <label htmlFor="calories" className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Calorías
                </label>
                <input
                    type="number"
                    id="calories"
                    className="w-full border-2 border-slate-200 focus:border-emerald-400 focus:outline-none p-3 rounded-xl text-slate-700 font-medium transition-colors"
                    placeholder="Ej: 300"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                className={`w-full py-3.5 px-6 font-bold text-white rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-sm uppercase tracking-wide ${
                    isFood
                        ? 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700'
                        : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
                }`}
                disabled={!isValidActivitiy()}
            >
                {isFood ? 'Guardar Comida' : 'Guardar Ejercicio'}
            </button>
        </form>
    )
}

export default Form