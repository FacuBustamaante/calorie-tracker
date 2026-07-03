import type { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo, type Dispatch } from "react"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import type { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[]
    dispatch: Dispatch<ActivityActions>
}

function ActivityList({ activities, dispatch }: ActivityListProps) {

    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.find(cat => cat.id === category)?.name ?? ''
    , [])

    return (
        <div>
            <h2 className="text-2xl font-black text-slate-800 text-center mb-6">Comida y Actividades</h2>

            {activities.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                    <p className="text-5xl mb-4">🥗</p>
                    <p className="font-semibold text-lg">No hay actividades registradas aún</p>
                    <p className="text-sm mt-1">Agrega tu primera comida o ejercicio arriba</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {activities.map(activity => (
                        <div
                            key={activity.id}
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex justify-between items-center hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="space-y-1.5">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${
                                    activity.category === 1 ? 'bg-emerald-500' : 'bg-orange-500'
                                }`}>
                                    {categoryName(activity.category)}
                                </span>
                                <p className="text-lg font-bold text-slate-800">{activity.name}</p>
                                <p className="font-black text-2xl text-emerald-600 tabular-nums">
                                    {activity.calories}
                                    <span className="text-sm font-semibold text-slate-400 ml-1">kcal</span>
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
                                    className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors duration-150 cursor-pointer"
                                    title="Editar"
                                >
                                    <PencilSquareIcon className="h-5 w-5 text-slate-500" />
                                </button>
                                <button
                                    onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}
                                    className="p-2.5 rounded-xl hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                                    title="Eliminar"
                                >
                                    <XCircleIcon className="h-5 w-5 text-red-400" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ActivityList
