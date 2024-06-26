import Banner from './Banner'

type FormNotificationProps = {
  state: {
    serverError?: string
    success?: string
  }
}

const FormNotification = ({ state }: FormNotificationProps) => {
  return (
    <>
      {state?.serverError && (
        <Banner title={state.serverError} type={'error'} />
      )}
      {state?.success && <Banner title={state.success} type={'success'} />}
    </>
  )
}

export default FormNotification
