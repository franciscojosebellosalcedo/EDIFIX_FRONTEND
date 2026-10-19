import type { FC } from "react"
import Loading from "./Loading"

type Props = {
    value: string
    setValue: Function
    placeholder: string
    onSearch: () => void
    loading: boolean
}

const Search: FC<Props> = ({
    value,
    placeholder,
    setValue,
    loading,
    onSearch
}) => {
    return (
        <div className="input-group">

            <button
                style={{
                    cursor: value.trim() ? "pointer" : "auto"
                }}
                disabled={!value.trim()}
                onClick={onSearch}
                className={`input-group-text ${value.trim()
                    ? "bg-primary bg-opacity-10 border-primary"
                    : "bg-white"
                    }`}
            >
                {
                    loading ? <Loading withouthText={true} /> :
                        <i
                            className={`bi bi-search ${value.trim() ? "text-primary" : "text-muted"}`}
                        />
                }
            </button>

            <input
                type="search"
                className="form-control"
                placeholder={ placeholder }
                value={value}
                onChange={(event) =>

                    setValue(event.target.value)

                }
            />

        </div>
    )
}

export default Search