import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getListOfCollectorApi } from "../services/locationService";
import { getCurrentDate } from "../utils/generateCurrentDate";

const Filter = (props) => {

    const { handleSubmitData, clearSubmitData, showEntryDate, showAllCollector } = props
    const [collList, setCollList] = useState([]);
    const formik = useFormik({
        initialValues: {
            entrydate: getCurrentDate('-'),
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
                {
                    showEntryDate === true &&
                    <div>
                        <label htmlFor="entrydate">
                            Entry Date:
                        </label>
                        <input
                            type='date'
                            name="entrydate"
                            onChange={formik.handleChange}
                            value={formik.values.entrydate}
                        />
                    </div>
                }

                <div>
                    <label>
                        Collector:
                    </label>
                    <select
                        name="userId"
                        onChange={formik.handleChange}
                        value={formik.values.userId}>
                        {
                            showAllCollector === true && <option key={0} value={0}>All</option>
                        }
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

/**
 * first have two sidebar all and with date
 * with date has no all collector and has to plot all way points
 */