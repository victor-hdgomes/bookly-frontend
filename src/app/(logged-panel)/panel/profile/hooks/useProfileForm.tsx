import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const defaultValues = {
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    photo: '',
    address: '',
    phone: '',
    status: '',
    timezone: '',
    workingHours: [
        { day: 'Segunda', start: '', end: '' },
        { day: 'Terça', start: '', end: '' },
        { day: 'Quarta', start: '', end: '' },
        { day: 'Quinta', start: '', end: '' },
        { day: 'Sexta', start: '', end: '' },
        { day: 'Sábado', start: '', end: '' },
        { day: 'Domingo', start: '', end: '' },
    ],
}

const workingHourSchema = z.object({
    day: z.string(),
    start: z.string().min(1, { message: 'Horário inicial obrigatório' }),
    end: z.string().min(1, { message: 'Horário final obrigatório' }),
});

const profileSchema = z.object({
    firstName: z.string().min(1, { message: "O primeiro nome é obrigatório" }),
    lastName: z.string().min(1, { message: "O sobrenome é obrigatório" }),
    displayName: z.string().min(1, { message: "O nome de exibição é obrigatório" }),
    email: z.string().email({ message: "Email inválido" }),
    photo: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.string().optional(),
    timezone: z.string().min(1, { message: "O time zone é obrigatório" }),
    workingHours: z.array(workingHourSchema),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm(options?: { defaultValues?: Partial<ProfileFormData> }) {
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: options?.defaultValues ?? defaultValues,
    });
}
