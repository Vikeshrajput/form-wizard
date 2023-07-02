const SummaryFeild = (props) => {
    return (
        <div className="mt-4">
            <span className="mr-4">{props.feildName}</span><br />
            <div className={`${props.capatalize == undefined ? 'capitalize' : ''}`}>
                <div className="p-2 px-4 rounded-full mt-4 bg-transparent border-2 border-gray-300 text-semibold shadow-lg" id={props.id}>{props.feildData}</div>
            </div>
        </div>
    )
}

export default SummaryFeild