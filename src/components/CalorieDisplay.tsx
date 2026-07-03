type CalorieDisplayProps = {
    calories: number
    text: string
    colorClass?: string
    bgClass?: string
}

const CalorieDisplay = ({ calories, text, colorClass = 'text-slate-800', bgClass = 'bg-white' }: CalorieDisplayProps) => {
    return (
        <div className={`${bgClass} rounded-2xl border border-slate-100 shadow-sm p-6 text-center flex-1`}>
            <span className={`text-5xl font-black block tabular-nums ${colorClass}`}>{calories}</span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 block">{text}</span>
        </div>
    )
}

export default CalorieDisplay
