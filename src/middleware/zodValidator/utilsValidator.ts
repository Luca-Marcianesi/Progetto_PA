import {z} from "zod"


export const ValidationMessages ={
    date: {
        mustBeOnHour : "La date deve essere all'ora esatta",
        fromBeforeTo: "La data di inizio deve precedere la data di fine",
    },
    string:{
        toShort: (min : number) => 'La stringa deve essere più lunga di ${min} caratteri',
        toLong: (min : number) => 'La stringa deve essere più corta di ${min} caratteri',
    },
    psw: {
        toShort: (min : number) => 'La password deve essere più lunga di ${min} caratteri',
    }
}

export const DateOnHourSchema = z.iso.datetime().refine((value) =>{
    const date = new Date(value);
    return date.getTime() === 0 && date.getSeconds() === 0;
},{
    message: ValidationMessages.date.mustBeOnHour,
}
)

export const refineFromBeforeToSchema = (from : string, to : string) =>{
    return (data: any) =>{
        if(!data[from] || !data[to]) return true;
        return new Date(data[from]) < new Date(data[to])
    }
}

export const GenericStringSchema = z.string()
    .min(6,{message: ValidationMessages.string.toShort(6)})
    .max(30,{message: ValidationMessages.string.toLong(30)})

export const PasswordSchema = z.string()
    .min(8,{message: ValidationMessages.psw.toShort(8)})

export const StandarIdSchema = z.number().int().positive()
    
