import React, { useState, useEffect } from "react"
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import { useForm, FormProvider } from "react-hook-form"
import FormInput from "./FormInput"
import { commerce } from "../../lib/commerce"

const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState("")
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState("")
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState("")
    const methods = useForm()

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        //uncomment code below to see how it works
        id: code,
        label: name,
    }))

    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({
        id: code,
        label: name,
    }))

    const options = shippingOptions.map((sO) => ({
        //sO stands for shippingOption
        id: sO.id,
        label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
    }))

    //Uncomment below to see how the .map in jsx works

    // //Since we are getting an object we cant loop over them like we do with arrays so we have to turn it into an array
    // console.log("the object is below")
    // console.log(shippingCountries)

    // //this gives the values of keys and values of the object but in a very wierd format
    // const mixedArrays = Object.entries(shippingCountries)
    // console.log("fucked up arrays below")
    // console.log(mixedArrays)

    // //this final version makes a single array from the messed up arrays on top
    // //although they are all different object, because we setState as an array they will be objects inside an array
    // const properArray = Object.entries(shippingCountries).map(([code, name]) => ({
    //   id: code,
    //   label: name,
    // }))
    // console.log("singular normal array below")
    // console.log(properArray)

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

        console.log("setShippingCountries countries list is:   ")
        console.log(countries)

        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0]) //the country the user just selected, because remember its an array with 2 elements one country code and the other full country name
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)

        console.log("setShippingSubdivisions subdivisions list is:   ")
        console.log(subdivisions)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince })

        console.log("setShippingOptions options list is:   ")
        console.log(options)
        setShippingOptions(options)
        setShippingOption(options[0].id) //hata var burda error code
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit((data) =>
                        next({
                            ...data,
                            shippingCountry,
                            shippingSubdivision,
                            shippingOption,
                        })
                    )}
                >
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label="First Name" />
                        <FormInput required name="lastName" label="Last Name" />
                        <FormInput required name="address1" label="Address" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="City" />
                        <FormInput required name="zip" label="Zip Code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button component={Link} to="/cart" variant="outlined">
                            Back to Cart
                        </Button>
                        <Button type="submit " variant="contained" color="primary">
                            Next
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
