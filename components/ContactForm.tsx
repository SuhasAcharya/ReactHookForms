"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";

interface ContactFormProps {
  name: string;
  email: string;
  message: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});

const ContactForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: ContactFormProps) => {
    console.log(formData);
    alert(JSON.stringify(formData));
  };

  return (
    <div className="h-full flex justify-center items-center bg-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col gap-y-10 justify-center items-center"
      >
        <div className="flex gap-x-4 justify-center items-center">
          <label htmlFor="name">Name:</label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className={`${
                  errors.name && `border-[1px] border-red-600`
                }  p-4 h-[40px] w-[70vh] rounded-[8px] border-[1px] border-gray-400 focus:outline-none`}
                {...field}
              />
            )}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex  gap-x-4 justify-center items-center">
          <label htmlFor="email">Email:</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className={`${
                  errors.email && `border-[1px] border-red-600`
                } p-4 h-[40px] w-[70vh] rounded-[8px] border-[1px] border-gray-400 focus:outline-none`}
                {...field}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex gap-x-4 justify-center items-center">
          <label htmlFor="message">Message:</label>
          <Controller
            name="message"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                className={`${
                  errors.message && `border-[1px] border-red-600`
                } p-4 h-[80px] w-[70vh] rounded-[8px] border-[1px] border-gray-400 focus:outline-none`}
                {...field}
              />
            )}
          />
          {errors.message && (
            <p className="text-red-500">{errors.message.message}</p>
          )}
        </div>

        <button
          className="h-[40px] w-[50%] rounded-[8px] bg-slate-600 text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
