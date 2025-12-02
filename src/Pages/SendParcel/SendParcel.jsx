import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    // watch,
    control,
    // formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const [serviceCenter, setServiceCenter] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    fetch("./serviceCenter.json")
      .then((data) => data.json())
      .then((data) => setServiceCenter(data));
  }, []);

  const regionsDuplicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // const senderRegion = watch("senderRegion");

  // explore useMemo useCallback
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((r) => r.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const parcelWeight = parseFloat(data.parcelWeight);
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minimumCharge = isSameDistrict ? 110 : 150;
        const extraWeight = data.parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minimumCharge + extraCharge;
      }
    }

    // console.log(isSameDistrict)
    // console.log(isDocument);
    console.log(cost);

    data.cost = cost;

    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue Payment.",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel data", res.data);

          if (res.data.insertedId) {

            navigate('/dashboard/my-parcels')

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel has created. Please pay!",
              showConfirmButton: false,
              timer: 2500,
            });

          }
        });
      }
    });
  };

  return (
    <div className="bg-white p-10 rounded-2xl mb-10">
      <h1 className="headings">Send A Parcel</h1>

      <div className="divider"></div>
      <h1 className="content-title mb-8">Enter your parcel details</h1>

      <form className="mb-10" onSubmit={handleSubmit(handleSendParcel)}>
        {/* label type */}
        <div className="space-x-5">
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="not-document"
              className="radio"
            />
            Not-Document
          </label>
        </div>

        {/* parcel info name and weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight (KG)"
            />
          </fieldset>
        </div>

        {/* two columns */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* sender details */}
          <aside className="">
            <h2 className="content-title my-5">Sender Details</h2>

            <fieldset className="fieldset">
              {/* sender Name */}
              <label className="label text-sm font-semibold text-secondary">
                Sender Name
              </label>
              <input
                type="text"
                {...register("senderName")}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Sender Name"
              />

              {/* sender email */}
              <label className="label text-sm font-semibold text-secondary">
                Sender Email
              </label>
              <input
                type="text"
                {...register("senderEmail")}
                defaultValue={user?.email}
                readOnly
                className="input w-full"
                placeholder="Sender Email"
              />

              {/* sender region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold text-secondary">
                  Sender Region
                </legend>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* sender district */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold text-secondary">
                  Sender District
                </legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtsByRegion(senderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Address */}
              <label className="label text-sm font-semibold text-secondary">
                Address
              </label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Address"
              />

              {/* sender Phone no */}
              <label className="label text-sm font-semibold text-secondary">
                Sender Phone No
              </label>
              <input
                type="number"
                {...register("senderPhoneNo")}
                className="input w-full"
                placeholder="Sender Phone No"
              />

              {/* Pickup instruction */}
              <label className="label text-sm font-semibold text-secondary">
                Pickup Instruction
              </label>
              <textarea
                type="textarea"
                {...register("pickupInstruction")}
                className="textarea h-24 w-full"
                placeholder="Pickup Instruction"
              ></textarea>
            </fieldset>
          </aside>

          {/* receiver details */}
          <aside className="">
            <h2 className="content-title my-5">Receiver Details</h2>

            <fieldset className="fieldset">
              {/* receiver Name */}
              <label className="label text-sm font-semibold text-secondary">
                Receiver Name
              </label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver Name"
              />

              {/* receiver email */}
              <label className="label text-sm font-semibold text-secondary">
                Receiver Email
              </label>
              <input
                type="text"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="Receiver Email"
              />

              {/* receiver region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold text-secondary">
                  Receiver Region
                </legend>
                <select
                  {...register("receiverRegion")}
                  defaultValue="Pick a region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* receiver district */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold text-secondary">
                  Receiver District
                </legend>
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtsByRegion(receiverRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Address */}
              <label className="label text-sm font-semibold text-secondary">
                Address
              </label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Address"
              />

              {/* receiver Phone no */}
              <label className="label text-sm font-semibold text-secondary">
                Receiver Phone No
              </label>
              <input
                type="number"
                {...register("receiverPhoneNo")}
                className="input w-full"
                placeholder="Receiver Phone No"
              />

              {/* receiver district
              <label className="label text-sm font-semibold text-secondary">
                Receiver District
              </label>
              <input
                type="text"
                {...register("receiverDistrict")}
                className="input w-full"
                placeholder="Receiver District"
              /> */}

              {/* Pickup instruction */}
              <label className="label text-sm font-semibold text-secondary">
                Delivery Instruction
              </label>
              <textarea
                type="textarea"
                {...register("deliveryInstruction")}
                className="textarea h-24 w-full"
                placeholder="Delivery Instruction"
              ></textarea>
            </fieldset>
          </aside>
        </section>

        <p className="my-10 font-semibold test-lg">
          * PickUp Time 4pm-7pm Approx.
        </p>

        <button
          type="submit"
          className="btn bg-primary text-secondary font-bold text-lg"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
