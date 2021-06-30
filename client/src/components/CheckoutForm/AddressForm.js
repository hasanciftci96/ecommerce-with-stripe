import React, { useState, useEffect } from "react"
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core"
import { useForm, FormProvider } from "react-hook-form"
import FormInput from "./FormInput"
import { commerce } from "../../lib/commerce"

const AddressForm = ({ checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState("")
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState("")
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState("")
  const methods = useForm()

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
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
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    )

    console.log(countries)

    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0]) //gives us an array of keys of the countries object so essentially like AZ, AUS and so on
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [])

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit="">
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First Name" />
            <FormInput required name="lastName" label="Last Name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="Zip Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </Select>
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={} fullWidth onChange={}>
                <MenuItem key={} value={}>
                  Select me
                </MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
