import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) =>
        activity.category === 1 ? total + activity.calories : total, 0), [activities])

    const caloriesBurned = useMemo(() => activities.reduce((total, activity) =>
        activity.category === 2 ? total + activity.calories : total, 0), [activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned])

    return (
        <div>
            <h2 className="text-2xl font-black text-slate-800 text-center mb-6">Resumen de Calorías</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                    colorClass="text-emerald-600"
                    bgClass="bg-emerald-50"
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Quemadas"
                    colorClass="text-orange-500"
                    bgClass="bg-orange-50"
                />
                <CalorieDisplay
                    calories={netCalories}
                    text="Balance neto"
                    colorClass={netCalories <= 0 ? 'text-emerald-600' : 'text-slate-800'}
                    bgClass="bg-white"
                />
            </div>
        </div>
    )
}

export default CalorieTracker
