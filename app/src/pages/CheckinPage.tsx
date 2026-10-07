import { CheckinForm } from '../components/CheckinForm'

export function CheckinPage() {
  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <div className="flex flex-col gap-6 mx-auto w-full max-w-md translate-y-[-10%]">
        <div>
          <h2 className="font-semibold text-gray-900 text-xl">
            Novo check-in
          </h2>
          <p className="text-gray-500 text-sm">
            Informe o CPF do paciente para registrar a chegada.
          </p>
        </div>

        <CheckinForm />
      </div>
    </div>
  )
}
