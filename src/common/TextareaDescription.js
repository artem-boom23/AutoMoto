export const TextareaDescription = ({object,
                                    handleInputChange}
) => {
    return (
        <>
            <label htmlFor="description">Write a Description:</label>
            <textarea
                rows="3"
                className="form-control mb-3"
                placeholder="Write a Description"
                name="description"
                value={object.description}
                onChange={handleInputChange}
            ></textarea>
        </>
    )
}