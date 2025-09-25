import {z} from "zod"

// Custom error messagges
export const ValidationMessages ={
    date: {
        mustBeOnHour : "La date deve essere all'ora esatta",
        fromBeforeTo: "La data di inizio deve precedere la data di fine",
        invalid: "Formato data invalido"
    },
    string:{
        toShort: (min : number) => 'La stringa deve essere più lunga di ${min} caratteri',
        toLong: (min : number) => 'La stringa deve essere più corta di ${min} caratteri',
    },
    psw: {
        toShort: (min : number) => 'La password deve essere più lunga di ${min} caratteri',
    }
}


// Schema  for standar date
export const DateOnHourSchema = z.coerce.date()
  .refine((date) => !isNaN(date.getTime()), {
    message: "Data invalida",
  })
  .refine(
    (date) => date.getMinutes() === 0 && date.getSeconds() === 0,
    { message: ValidationMessages.date.mustBeOnHour }
  );




export const GenericStringSchema = z.string()
    .min(6,{message: ValidationMessages.string.toShort(6)})
    .max(30,{message: ValidationMessages.string.toLong(30)})

export const PasswordSchema = z.string()
    .min(8,{message: ValidationMessages.psw.toShort(8)})

export const StandarIdSchema = z.coerce.number().int().positive()
    
