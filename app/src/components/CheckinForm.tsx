import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { checkinSchema, type CheckinFormData } from '../lib/schemas/checkin.schema'
import { api } from '../lib/services/api'
import { getApiErrorMessage } from '../lib/utils/axios-errors'
import { maskCpf } from '../lib/utils/masks'

const DEFAULT_VALUES: CheckinFormData = {
  cpf: '',
}

export function CheckinForm() {
  const [sucesso, setSucesso] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CheckinFormData>({
    resolver: zodResolver(checkinSchema),
    defaultValues: DEFAULT_VALUES,
  })

  async function onSubmit(data: CheckinFormData) {
    setSucesso(false)
    try {
      await api.post('/checkin', { cpf: data.cpf })
      reset()
      setSucesso(true)
    } catch (err) {
      setError('cpf', {
        type: 'manual',
        message: getApiErrorMessage(err, 'Não foi possível registrar o check-in'),
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cpf" className="font-medium text-gray-700 text-sm">
          CPF do paciente
        </label>
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <input
              id="cpf"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={field.value}
              onChange={(e) => field.onChange(maskCpf(e.target.value))}
              className="px-3 py-2.5 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 transition-colors"
            />
          )}
        />
        {errors.cpf && (
          <span className="text-red-600 text-sm">{errors.cpf.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2.5 rounded-lg font-medium text-white text-sm transition-colors cursor-pointer"
      >
        {isSubmitting ? 'Registrando...' : 'Fazer check-in'}
      </button>

      {sucesso && (
        <span className="text-green-600 text-sm">
          Check-in registrado com sucesso.
        </span>
      )}
    </form>
  )
}
