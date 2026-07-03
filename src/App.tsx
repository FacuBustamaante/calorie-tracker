import Form from "./components/Form"
import { useReducer, useEffect, useMemo } from "react"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities])

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md">
                <div className="max-w-4xl mx-auto px-5 py-5 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight">Contador de Calorías</h1>
                        <p className="text-emerald-100 text-sm mt-0.5">Registra tu alimentación y actividad física</p>
                    </div>
                    <button
                        className="bg-white/20 hover:bg-white/30 border border-white/30 px-4 py-2 font-semibold text-sm text-white rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        disabled={!canRestartApp}
                        onClick={() => dispatch({ type: 'restart-app' })}
                    >
                        Reiniciar
                    </button>
                </div>
            </header>

            <section className="bg-gradient-to-b from-teal-600 to-slate-50 py-12 px-5">
                <div className="max-w-4xl mx-auto">
                    <Form dispatch={dispatch} state={state} />
                </div>
            </section>

            <section className="py-10 px-5">
                <div className="max-w-4xl mx-auto">
                    <CalorieTracker activities={state.activities} />
                </div>
            </section>

            <section className="py-10 px-5 pb-16">
                <div className="max-w-4xl mx-auto">
                    <ActivityList activities={state.activities} dispatch={dispatch} />
                </div>
            </section>
        </div>
    )
}

export default App
