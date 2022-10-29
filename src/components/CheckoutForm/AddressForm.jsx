import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Form, Card } from "react-bootstrap";
import { commerce } from '../../lib/commerce';
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, nextStep }) => {
    // console.log("Checkout token id=", checkoutToken.id)
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
    const [shippingSubDivison, setShippingSubDivison] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const [formState, setFormState] = useState(true);

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const subDivisions = Object.entries(shippingSubDivisions).map(([code, name]) => ({ id: code, label: name }));
    const fetchShippingSubDivisions = async (countryCode) => {
        // console.log("Inside fetchShippingSubDivisions........", countryCode)
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubDivisions(subdivisions);
        // console.log("Subdivisions---------", subdivisions);
        setShippingSubDivison(Object.keys(subdivisions)[0]);
        formik.values.subDivision = Object.keys(subdivisions)[0];
    }

    // console.log("options%%%%%%%%%", shippingOptions);
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - ${sO.price.formatted_with_symbol}` }))
    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const getOptions = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        setShippingOptions(getOptions);
        // console.log("Fetch shipping option**********",getOptions[0].id);
        setShippingOption(getOptions[0].id);
        formik.values.option = getOptions[0].id
    }
    const handleSelectChange = (e, handleState) => {
        // console.log("Inside handle  change ###########")
        formik.handleChange(e);
        // console.log("field value change", e.target.value);
        handleState(e.target.value);
    }
    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, [])

    useEffect(() => {
        // console.log("Shipping subdicions-------", shippingCountry)
        if (shippingCountry) fetchShippingSubDivisions(shippingCountry)
    }, [shippingCountry]);

    useEffect(() => {
        // console.log("Inside fetching iptions useeffect************")
        if (shippingSubDivison) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivison);
    }, [shippingSubDivison])

    //     useEffect(() => {
    //         console.log("useeffect shipping country...........");
    // if(formik.values.country) setShippingCountry(formik.values.country)
    //     },[formik.values.country])

    // console.log("Shipping Country, Division, options:", shippingCountry, shippingSubDivison,shippingOption);
    // const cn = "US";
    // const acn = shippingCountry;
    // console.log("acn..............", typeof cn)
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            country: "AU",
            subDivision: "ACT",
            option: "International - $20"
        },
        validationSchema: Yup.object({
            // firstName: Yup.string()
            //     .max(15, "Must be 15 characters or less")
            //     .required("Required"),
            // lastName: Yup.string()
            //     .max(20, "Must be 20 characters or less")
            //     .required("Required"),
            // email: Yup.string()
            //     .email("Invalid email address")
            //     .required("Required")
        }),
        onSubmit: values => {
            // console.log("All values:", values)
            // alert(JSON.stringify(values, null, 2));
            nextStep(values);

            // setFormState(values);
        }
    });
    // if(!shippingCountry) return "Loading.........."
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <Card style={{ padding: "20px" }}>
                <Container>
                    <Form onSubmit={formik.handleSubmit}>
                        <h4>Address Form </h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: "8%", paddingTop: "15px" }}>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name *</Form.Label>
                                <Form.Control
                                    name="firstName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                />
                                <Form.Text className="text-danger">
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div className="text-danger">{formik.errors.firstName}</div>
                                    ) : null}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name *</Form.Label>
                                <Form.Control
                                    name="lastName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}
                                />
                                <Form.Text className="text-danger">
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div className="text-danger">{formik.errors.lastName}</div>
                                    ) : null}
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: "8%", paddingTop: "10px" }}>
                            <Form.Group controlId="address">
                                <Form.Label>Address *</Form.Label>
                                <Form.Control
                                    name="address"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                />
                                <Form.Text className="text-danger">
                                    {formik.touched.address && formik.errors.address ? (
                                        <div className="text-danger">{formik.errors.address}</div>
                                    ) : null}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email *</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                <Form.Text className="text-danger">
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-danger">{formik.errors.email}</div>
                                    ) : null}
                                </Form.Text>
                            </Form.Group>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: "8%", paddingTop: "10px" }}>
                            <Form.Group controlId="address">
                                <Form.Label>City *</Form.Label>
                                <Form.Control
                                    name="city"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                />
                                <Form.Text className="text-danger">
                                    {formik.touched.city && formik.errors.city ? (
                                        <div className="text-danger">{formik.errors.city}</div>
                                    ) : null}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>ZIP/Postal code *</Form.Label>
                                <Form.Control
                                    name="zip"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.zip}
                                />
                                <Form.Text className="text-danger">
                                    {formik.touched.zip && formik.errors.zip ? (
                                        <div className="text-danger">{formik.errors.email}</div>
                                    ) : null}
                                </Form.Text>
                            </Form.Group>

                        </div>
                        <div style={{ paddingTop: "10px" }}>
                            <Form.Group controlId="country">
                                <Form.Label>Shipping Country *</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    // onClick={() => console.log("Inside jsx tag..............",formik.values.country)} 
                                    // onChange={(e) => {
                                    //     formik.handleChange(e);
                                    //     console.log("field value change", e.target.value);
                                    //     setShippingCountry(e.target.value);
                                    // }}
                                    onChange={(e) => handleSelectChange(e, setShippingCountry)}
                                    name="country"
                                    onBlur={formik.handleBlur}
                                    value={formik.values.country}>

                                    {countries.map((eachCountry) => (
                                        <option key={eachCountry.id} value={eachCountry.id}>{eachCountry.label}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="subDivision">
                                <Form.Label>Shipping SubDivision *</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    // onChange={(e) => {
                                    //     formik.handleChange(e);
                                    //     console.log("field value change", e.target.value);
                                    //     setShippingSubDivison(e.target.value);
                                    // }}
                                    onChange={(e) => handleSelectChange(e, setShippingSubDivison)}
                                    name="subDivision"
                                    onBlur={formik.handleBlur}
                                    value={formik.values.subDivision}>
                                    {subDivisions.map((eachSubDivision) => (
                                        <option key={eachSubDivision.id} value={eachSubDivision.id}>{eachSubDivision.label}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div style={{ paddingTop: "10px" }}>
                            <Form.Group controlId="option">
                                <Form.Label>Shipping Options *</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    // onChange={(e) => {
                                    //     formik.handleChange(e);
                                    //     console.log("field value change", e.target.value);
                                    //     setShippingOption(e.target.value);
                                    // }}
                                    onChange={(e) => handleSelectChange(e, setShippingOption)}
                                    name="option"
                                    onBlur={formik.handleBlur}
                                    value={formik.values.option}>

                                    {options.map((eachOption) => (
                                        <option key={eachOption.id} value={eachOption.id}>{eachOption.label}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "20px" }}>
                            <Link to="/cart" style={{ textDecoration: "none" }}> <Button variant="primary">
                                Back to cart
                            </Button></Link>
                            <Button
                                variant="primary"
                                type="submit"
                            // onClick={nextStep}
                            // onClick={values => setFormState(values)}
                            // disabled={formState}
                            >
                                Next
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Card>
        </div>
    )
}

export default AddressForm