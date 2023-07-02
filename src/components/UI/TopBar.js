import { Fragment } from "react";

const TopBar = (props) => {
    return (
        <Fragment>
            <header>
                <div className="flex space-between mx-32 mt-3 mb-12">
                    <div>
                        <h1 className="font-semibold text-3xl">Aimbrill Techinfo</h1>
                    </div>
                    <div className="ml-auto">
                        <button onClick={props.onClick} className="bg-purple-900 rounded-full tracking-wider text-white text-sm px-6 py-3 font-semibold hover:bg-purple-800">Employee List</button>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default TopBar;