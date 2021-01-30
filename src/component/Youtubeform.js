import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import Texterror from './Texterror'

const initialValues = {
    name: 'vishvas',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ["", ""],
    contact: ['']
}
const savedValues = {
    name: 'Mohil',
    email: 'A@example.com',
    channel: 'react teaching',
    comments: 'welcome to formik',
    address: '50,surat',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ["", ""],
    contact: ['']
}
const onSubmit =( values ,onSubmitProps)=> {
    console.log("Form data", values);
    // console.log('submit props' , onSubmitProps);
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalied email formate').required('Required'),
    channel: Yup.string().required('Required'),
})
const validateComments = (values) => {
    let error
    if (!values) {
        error = "Required"
    }
    return error
}
export default function Youtubeform() {
    const [formValues , setFormValues] = useState(null)
    return (
        <Formik initialValues={formValues || initialValues} 
                validationSchema={validationSchema}
                onSubmit={onSubmit} /* validateOnChange={false} validateOnBlur={false} validateOnMount*/
                enableReinitialize>
            {formik => {
                // console.log('formik props', formik);
                return (
                    <Form>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <Field type="text" id="name" name="name" />
                            <ErrorMessage name="name" component={Texterror} />
                        </div>

                        <div>
                            <label htmlFor="email">E-mail</label >
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email">
                                {errorMsg => <div className="error">{errorMsg}</div>}
                            </ErrorMessage>
                        </div>

                        <div>
                            <label htmlFor="channel">Channel</label>
                            <Field type="text" id="channel" name="channel" placeholder="Youtube channel name" />
                            <ErrorMessage name="channel" component={Texterror} />
                        </div>
                        <div>

                            <label htmlFor="comments">Comments</label>
                            <Field as="textarea" type="text" id="comments" name="comments" validate={validateComments} />
                            <ErrorMessage name="comments" component={Texterror} />
                        </div>

                        <div>
                            <label htmlFor="address">Address</label>
                            <FastField name="address">
                                {props => {
                                    // console.log('Field rendered');
                                    const { field, form, meta } = props
                                    // console.log('render props', props)
                                    return (
                                        <div>
                                            <input id="address" type="text" {...field} />
                                            {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                        </div>
                                    )
                                }}
                            </FastField>
                        </div>

                        <div>
                            <label htmlFor="facebook">Facebook</label>
                            <Field type="text" id="facebook" name="social.facebook" />
                        </div>

                        <div>
                            <label htmlFor="twitter">Twitter</label>
                            <Field type="text" id="twitter" name="social.twitter" />
                        </div>

                        <div>
                            <label htmlFor="primrayph">Primary phone number</label>
                            <Field type="text" id="primrayph" name="phoneNumbers[0]" />
                        </div>

                        <div>
                            <label htmlFor="secondaryph">Secondary phone number</label>
                            <Field type="text" id="secondaryph" name="phoneNumbers[1]" />
                        </div>

                        <div>
                            <label htmlFor="contact">List of contact number</label>
                            <FieldArray name="contact" type="number" id="contact">
                                {fieldArrayProps => {
                                    const { push, remove, form } = fieldArrayProps
                                    const { values } = form
                                    const { contact } = values
                                    // console.log('Forms  errors', form.errors);
                                    return <div>
                                        {
                                            contact.map((contact, index) => (
                                                <div key={index}>
                                                    <Field name={`contact[${index}]`} />
                                                    {
                                                        index > 0 &&
                                                        <button type="button" onClick={() => remove(index)}>-</button>
                                                    }
                                                    <button type="button" onClick={() => push('')}>+</button>
                                                </div>
                                            ))}
                                    </div>
                                }}
                            </FieldArray>
                        </div>
                        <br /><br/>
                        {/* <Button type="button" onClick={() => formik.validateField('comments')}>Validate comments</Button>
                        <Button type="button" onClick={() => formik.validateForm('')}>Validate all</Button>
                         <br/><br/>       
                        <Button type="button" onClick={() => formik.setFieldTouched('comments')}>Visit comments</Button>
                        <Button type="button" onClick={() => formik.setTouched({name:true,
                                                                                email:true,
                                                                                channel:true,
                                                                                comments:true})}>Visit field</Button> */}
                        <button type="button" onClick={()=>setFormValues(savedValues)}>Load saved data</button>                                                                                    
                        <button type="reset">Reset</button>
                        <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</Button>
                    </Form>
                )
            }}
        </Formik>
    )
} 
