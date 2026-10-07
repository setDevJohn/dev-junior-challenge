import type { CheckIn } from '../lib/schemas/checkin.schema'

type Props = {
  checkins: CheckIn[]
}

export function CheckinList({ checkins }: Props) {
  if (checkins.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500">
        Nenhum check-in na fila
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {checkins.map((checkin) => (
        <li
          key={checkin.id}
          className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm"
        >
          <span className="font-medium text-gray-900">{checkin.nome}</span>
          <span className="text-sm text-gray-500">
            {new Date(checkin.criadoEm).toLocaleTimeString('pt-BR')}
          </span>
        </li>
      ))}
    </ul>
  )
}
