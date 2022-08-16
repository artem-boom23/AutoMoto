export const InputArea = ({
                              name,
                              label,
                              icon = "create",
                              placeholder,
                              auto,
                              type="text",
                              handleInputChange
                        }) => {

    return (
        <>
            <label htmlFor={`${name}`}>{label}</label>
            <div className="input-group mb-3">
                <div className="input-group-text bg-dark">
                    <i className="material-icons">{icon}</i>
                </div>
                <input
                    type={type}
                    className="form-control"
                    placeholder={name}
                    value={auto[name]}
                    name={`${name}`}
                    onChange={handleInputChange}
                />
            </div>
        </>

    );
}