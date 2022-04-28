import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getListOfCollectorApi } from "../services/locationService";

const Filter = (props) => {

    const { handleSubmitData, clearSubmitData } = props
    const [collList, setCollList] = useState([]);
    const formik = useFormik({
        initialValues: {
            entrydate: "",
            userId: 0
        },
        onSubmit: values => {
            handleSubmitData(values)
        }
    });

    const handleClear = () => {
        formik.resetForm()
        clearSubmitData(true)
    }

    useEffect(() => {
        getListOfCollectorApi(val => {
            setCollList(val);
        })
    }, [])


    return (
        <>
            <form className="form-inline" onSubmit={formik.handleSubmit}>
                {/* <div>
                    <label htmlFor="entrydate">
                        Entry Date:
                    </label>
                    <input
                        type='date'
                        name="entrydate"
                        onChange={formik.handleChange}
                        value={formik.values.entrydate}
                    />
                </div> */}

                <div>
                    <label>
                        Collector:
                    </label>
                    <select
                        name="userId"
                        onChange={formik.handleChange}
                        value={formik.values.userId}>
                        <option key={0} value={0}>All</option>
                        {
                            collList.map(res => {
                                return (
                                    <option key={res?.UserId} value={res?.UserId}>{res?.UserName}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="buttonAlignment">
                    <button className="button-4" type="submit">Load</button>

                    <button className="button-4" type="button" onClick={handleClear}>Clear</button>
                </div>
            </form>
        </>
    )

}

export default Filter