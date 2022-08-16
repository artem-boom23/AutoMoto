export const InputAreaMoto = ({
                                  name,
                                  label,
                                  icon = "create",
                                  moto,
                                  handleInputChange,
                                  type = "text"

                              }) => {
    console.log("moto: ", moto)

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
                    value={moto[name]}
                    name={`${name}`}
                    onChange={handleInputChange}
                />
            </div>
        </>

    );
}