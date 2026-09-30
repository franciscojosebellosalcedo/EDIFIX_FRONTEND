import { useAppSelector } from "../../hooks/use.selector";

const SubTopbar = () => {

    const component = useAppSelector((state) => state.layout.component);

    return (
        <div className="bg-white border-bottom">
            <div className="container-fluid px-3 py-3">
                {component}
            </div>
        </div>
    )
}

export default SubTopbar;