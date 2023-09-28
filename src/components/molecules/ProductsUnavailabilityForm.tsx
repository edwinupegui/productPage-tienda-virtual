import { Controller, useForm } from "react-hook-form";
import TextField from "../atoms/TextField";
import {
  EMAIL_VALIDATION,
  NAME_VALIDATION,
  PHONE_VALIDATION,
  WHITE_SPACE_VALIDATION,
} from "@/constants/forms.constants";
import Button from "../atoms/Button";

interface IProductsUnavailabilityForm {
  firstNames: string;
  lastNames: string;
  phoneNumber: string;
  email: string;
}

const ProductsUnavailabilityForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IProductsUnavailabilityForm>({ mode: "onChange" });

  const onSubmit = async (track: IProductsUnavailabilityForm) => {
    console.log(track);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex gap-3">
        <TextField
          fullwidth
          label="Nombre(s)"
          placeholder="Ingresa tus nombres"
          error={Boolean(errors.firstNames)}
          helperText={errors.firstNames && errors.firstNames.message}
          {...register("firstNames", {
            required: {
              value: true,
              message: "Ingrese un número de celular.",
            },
            ...NAME_VALIDATION,
          })}
        />
        <TextField
          fullwidth
          label="Apellidos(s)"
          placeholder="Ingresa tus apellidos"
          error={Boolean(errors.lastNames)}
          helperText={errors.lastNames && errors.lastNames.message}
          {...register("lastNames", {
            required: {
              value: true,
              message: "Ingrese un número de celular.",
            },
            ...NAME_VALIDATION,
          })}
        />
      </div>
      <TextField
        fullwidth
        type="number"
        label="Número de celular"
        placeholder="Ingresa tu número de celular"
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber && errors.phoneNumber.message}
        onKeyDown={WHITE_SPACE_VALIDATION}
        {...register("phoneNumber", {
          required: {
            value: true,
            message: "Ingrese un número de celular.",
          },
          ...PHONE_VALIDATION,
        })}
      />
      <TextField
        fullwidth
        label="Correo electrónico"
        placeholder="Ingresa tu número de celular"
        error={Boolean(errors.email)}
        helperText={errors.email && errors.email.message}
        {...register("email", {
          required: {
            value: true,
            message: "Ingrese un número de celular.",
          },
          ...EMAIL_VALIDATION,
        })}
      />
      <div className="w-full flex justify-end mt-2">
        <Button
          // loading={loading}
          disabled={!isValid}
          size="lg"
          color="info"
        >
          Crear notificación
        </Button>
      </div>
    </form>
  );
};

export default ProductsUnavailabilityForm;
