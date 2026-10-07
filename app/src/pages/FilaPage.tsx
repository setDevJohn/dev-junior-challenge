import { useCallback, useEffect, useState } from 'react'
import { CheckinList } from '../components/CheckinList'
import type { CheckIn } from '../lib/schemas/checkin.schema'
import { api } from '../lib/services/api'
import { getApiErrorMessage } from '../lib/utils/axios-errors'

export function FilaPage() {
  const [checkins, setCheckins] = useState<CheckIn[]>([])
  const [erro, setErro] = useState<string | null>(null)

  const carregarFila = useCallback(async () => {
    try {
      const { data } = await api.get<CheckIn[]>('/checkin')
      setCheckins(data)
      setErro(null)
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Não foi possível carregar a fila'))
    }
  }, [])

  useEffect(() => {
    carregarFila()
  }, [carregarFila])

  async function limparFila() {
    try {
      await api.delete('/checkin')
      await carregarFila()
    } catch (err) {
      setErro(getApiErrorMessage(err, 'Não foi possível limpar a fila'))
    }
  }

  return (
    <div className="flex flex-col gap-6 mx-auto max-w-2xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-gray-900 text-xl">
            Fila de pacientes
          </h2>
          <p className="text-gray-500 text-sm">
            Pacientes aguardando atendimento, em ordem de chegada.
          </p>
        </div>

        <button
          type="button"
          onClick={limparFila}
          className="hover:bg-red-50 px-3 py-2 border border-red-200 rounded-lg font-medium text-red-600 text-sm transition-colors cursor-pointer"
        >
          Limpar lista (modo dev)
        </button>
      </div>

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <CheckinList checkins={checkins} />
    </div>
  )
}
