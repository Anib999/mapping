import { SideBar } from "../common/SideBar"

const CommonLayout = (props) => {

    return (
        <>
            <div>
                <SideBar />
            </div>

            <div className="main">
                {props.children}
            </div>
        </>
    )

}

export default CommonLayout