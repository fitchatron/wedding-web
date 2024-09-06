"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const RegistrationFormSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1).trim(),
  lastName: z.string().min(1).trim(),
  email: z.string().email().trim(),
  mobile: z
    .string()
    .regex(new RegExp(/^04\d{8}$/), "Invalid phone number")
    .trim(),
  addressLineOne: z.string().trim().optional(),
  addressLineTwo: z.string().trim().optional(),
  suburb: z.string().trim().optional(),
  postcode: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return val.length === 4;
      },
      {
        message:
          "A postcode needs to be 4 digits. We're not mailing internationally!",
      },
    ),
  state: z
    .enum(["", "act", "nsw", "nt", "qld", "sa", "tas", "vic", "wa"])
    .optional(),
  //   plusOne: z.boolean(),
  //   plusOneFirstName: z.string(),
  //   plusOneLastName: z.string(),
});

const CreateRegistrationFormSchema = RegistrationFormSchema.omit({
  id: true,
});

export async function createRegistration(formData: FormData) {
  const { success, data, error } = CreateRegistrationFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    mobile: formData.get("mobile")?.toString().replaceAll(" ", ""),
    addressLineOne: formData.get("addressLineOne"),
    addressLineTwo: formData.get("addressLineTwo"),
    suburb: formData.get("suburb"),
    postcode: formData.get("postcode"),
    state: formData.get("state"),
  });

  if (!success) {
    console.log(error.flatten().fieldErrors);

    return {
      success,
      message: error.flatten().fieldErrors,
    };
  }

  const newRegistration = parseRegistration(data);
  console.log(newRegistration);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  revalidatePath("/admin/registrations");
  redirect("/");
}

function parseRegistration(data: {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  addressLineOne?: string | undefined;
  addressLineTwo?: string | undefined;
  suburb?: string | undefined;
  postcode?: string | undefined;
  state?: string | undefined;
}) {
  const hasAddress =
    data.addressLineOne && data.suburb && data.postcode && data.state;

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    mobile: data.mobile,
    ...(hasAddress && {
      addressLineOne: data.addressLineOne,
      addressLineTwo: data.addressLineTwo,
      suburb: data.suburb,
      postcode: data.postcode,
      state: data.state,
    }),
  };
}
