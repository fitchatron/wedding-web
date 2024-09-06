import BaseLayout from "@/components/BaseLayout";
import BaseLabel from "@/components/inputs/BaseLabel";
import BaseServerInput from "@/components/inputs/BaseServerInput";
import { createRegistration } from "@/lib/actions";
// import { useActionState } from "react";

export default function Page() {
  // const [state, action, isPending] = useActionState(createRegistration, null);

  const states = [
    { name: "ACT", id: "act" },
    { name: "New South Wales", id: "nsw" },
    { name: "Northern Territory", id: "nt" },
    { name: "Queensland", id: "qld" },
    { name: "South Australia", id: "sa" },
    { name: "Tasmania", id: "tas" },
    { name: "Victoria", id: "vic" },
    { name: "Western Australia", id: "wa" },
  ];
  return (
    <div className="px-4 py-2">
      <h3>Register Details</h3>
      <p className="mb-4">
        Register your details so that you can stay up to date with what is
        happening with our wedding. If you are lucky, you might even get an
        invite 🍀.
      </p>
      <form
        action={createRegistration}
        className="grid gap-4 rounded border-2 p-4 md:grid-cols-2"
      >
        <BaseServerInput
          id="firstName"
          type="text"
          placeholder="Enter First Name"
          label={"First Name"}
          required={true}
        />
        <BaseServerInput
          id="lastName"
          type="text"
          placeholder="Enter Last Name"
          label={"Last Name"}
          required={true}
        />
        <BaseServerInput
          id="email"
          type="email"
          placeholder="hello@email.com"
          label={"Email"}
          required={true}
        />
        <BaseServerInput
          id="mobile"
          type="tel"
          placeholder="Enter Mobile"
          label={"Mobile"}
          required={true}
        />
        <section className="md:col-span-2">
          <h5>Address Info</h5>
          <p>
            Add your address to get physical mailouts. If not, we will email
            you.
          </p>
          <p className="text-xs">
            NOTE: There is no guarantee we will ever mail anything out.
          </p>
        </section>
        <BaseServerInput
          id="addressLineOne"
          type="text"
          placeholder="Address Line 1"
          label={"Address Line 1"}
        />
        <BaseServerInput
          id="addressLineTwo"
          type="text"
          placeholder="Address Line 1"
          label={"Address Line 1"}
        />
        <BaseServerInput
          id="suburb"
          type="text"
          placeholder="Suburb"
          label={"Suburb"}
        />
        <BaseServerInput
          id="postcode"
          type="text"
          placeholder="3000"
          label={"Postcode"}
        />
        <div>
          <BaseLabel htmlFor={"state"} label={"State"} />
          <select
            id="state"
            name="state"
            className="input-base h-[42px]"
            defaultValue=""
            aria-describedby="state-error"
          >
            <option value="" disabled>
              Select a state
            </option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <BaseServerInput
          id="state"
          type="text"
          placeholder="VIC"
          label={"State"}
        />
        <button className="btn primary md:col-span-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
