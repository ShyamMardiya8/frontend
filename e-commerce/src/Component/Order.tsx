import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { User, Mail, Home, MapPin, Phone } from "lucide-react";
import { SiGooglepay } from "react-icons/si";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ORDER } from "../controllers/functions";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  customer_name: Yup.string().required("Name is required"),
  customer_email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Enter a valid 6-digit pincode")
    .required("Pincode is required"),
    phone_number: Yup.string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
  paymentMethod: Yup.string().required("Please select a payment method"),
});

const handleOrder = async (payload : any) => {
  try{
    const response = await ORDER(payload)
    if (response) {
      toast.success("order successfully", {position : "top-right"})
    }
  }
  catch(err){

  }
}
const Order = ({order} : any) => {
  const formik = useFormik({
    initialValues: {
      customer_name: "",
      customer_email: "",
      address: "",
      city: "",
      pincode: "",
      phone_number: "",
      paymentMethod: "",
    },
    validationSchema,
    onSubmit: (values, {resetForm}) => {
      console.log("values", {...values, order})
      const totalOrder = {...values, order}
      handleOrder(totalOrder)
      resetForm()
    },
  });

  console.log("order", order)
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl border border-gray-200 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8">Place Your Order</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name & Email */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <label className="flex items-center gap-2 text-sm font-semibold mb-1">
                <User size={16} /> Name
              </label>
              <TextField
                fullWidth
                name="customer_name"
                variant="outlined"
                size="small"
                onChange={formik.handleChange}
                value={formik.values.customer_name}
                error={formik.touched.customer_name && Boolean(formik.errors.customer_name)}
                helperText={formik.touched.customer_name && formik.errors.customer_name}
              />
            </div>
            <div className="w-full">
              <label className="flex items-center gap-2 text-sm font-semibold mb-1">
                <Mail size={16} /> Email
              </label>
              <TextField
                fullWidth
                name="customer_email"
                variant="outlined"
                size="small"
                onChange={formik.handleChange}
                value={formik.values.customer_email}
                error={formik.touched.customer_email && Boolean(formik.errors.customer_email)}
                helperText={formik.touched.customer_email && formik.errors.customer_email}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-1">
              <Home size={16} /> Address
            </label>
            <TextField
              fullWidth
              name="address"
              variant="outlined"
              size="small"
              onChange={formik.handleChange}
              value={formik.values.address}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </div>

          {/* City & Pincode */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <label className="flex items-center gap-2 text-sm font-semibold mb-1">
                <MapPin size={16} /> City
              </label>
              <TextField
                fullWidth
                name="city"
                variant="outlined"
                size="small"
                onChange={formik.handleChange}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </div>
            <div className="w-full">
              <label className="flex items-center gap-2 text-sm font-semibold mb-1">
                <MapPin size={16} /> Pincode
              </label>
              <TextField
                fullWidth
                name="pincode"
                variant="outlined"
                size="small"
                onChange={formik.handleChange}
                value={formik.values.pincode}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-1">
              <Phone size={16} /> Phone Number
            </label>
            <TextField
              fullWidth
              name="phone_number"
              variant="outlined"
              size="small"
              onChange={formik.handleChange}
              value={formik.values.phone_number}
              error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
              helperText={formik.touched.phone_number && formik.errors.phone_number}
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-sm font-semibold mb-2 block">Payment Method</label>
            <RadioGroup
              name="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              className="flex flex-col sm:flex-row gap-4"
            >
              <FormControlLabel
                value="cod"
                control={<Radio />}
                disabled
                label={
                  <span className="flex items-center gap-2">
                    <FaMoneyBillAlt className="text-green-600" /> Cash on Delivery
                  </span>
                }
              />
              <FormControlLabel
                value="upi"
                control={<Radio />}
                label={
                  <span className="flex items-center gap-2">
                    <SiGooglepay className="text-blue-600" /> UPI (Google Pay / Paytm)
                  </span>
                }
              />
            </RadioGroup>
            {formik.touched.paymentMethod && formik.errors.paymentMethod && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.paymentMethod}</p>
            )}
          </div>

          {/* Submit */}
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                fontWeight: 600,
                py: 1.5,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            >
              Submit Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Order;