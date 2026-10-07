import { z } from 'zod'

export const checkinSchema = z.object({
  cpf: z
    .string()
    .refine((value) => value.replace(/\D/g, '').length === 11, {
      message: 'CPF deve ter 11 dígitos',
    }),
})

export type CheckinFormData = z.infer<typeof checkinSchema>

export type CheckIn = {
  id: string
  cpf: string
  nome: string
  criadoEm: string
}
