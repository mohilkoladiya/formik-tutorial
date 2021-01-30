import React from 'react'
import Button from 'react-bootstrap/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
    name: '',
    email: '',
    channel: ''
}
const onSubmit = values => {
    console.log("Form data", values);
}
const validate = values => {
    let errors = {}
    if (values.name === "") {
        errors.name = "Required"
    }
    if (values.email === "") {
        errors.email = "Required"
    } else if (!/^\w+([-+.'][^\s]\w+)*([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(values.email)) {
        errors.email = "Invalied Email"
    }
    if (values.channel === "") {
        errors.channel = "Required"
    }
    return errors
}
const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalied email formate').required('Required'),
    channel: Yup.string().required('Required'),
})
export default function Oldyoutubeform() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        // validate
        validationSchema
    })

    console.log("visited fields", formik.touched);
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div >
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                </div>

                <div>
                    <label htmlFor="email">E-mail</label >
                    <input type="email" id="email" name="email" value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                </div>

                <div>
                    <label htmlFor="channel">Channel</label>
                    <input type="channel" id="channel" name="channel" value={formik.values.channel}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.channel && formik.errors.channel ? <div className="error">{formik.errors.channel}</div> : null}
                </div>
                <br />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
} 
