
const OptionsFilterRol = () => {
    return (
        <>
            <label className="form-label small fw-semibold">
                Estado
            </label>

            <select
                className="form-select"
                value={""}
                onChange={(e) =>
                    console.log(e.target.value)
                    
                }
            >
                <option value="all">
                    Todos
                </option>

                <option value="active">
                    Activos
                </option>

                <option value="inactive">
                    Inactivos
                </option>
            </select>
        </>
    )
}

export default OptionsFilterRol;