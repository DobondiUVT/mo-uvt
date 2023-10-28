import { saveSubject } from '@/actions'
import InputText from '@/components/Admin/Form/InputText'
import InputTextArea from '@/components/Admin/Form/InputTextArea'
import { Subject } from '@prisma/client'

const SubjectsForm = ({subject = null}: {subject?: Subject | null}) => {
  return (
    <form id="subjects-form" action={saveSubject}>
      <InputText
        label="Title"
        name="title"
        id="title"
        value={subject?.title}
      />
      <InputTextArea
        label="Description"
        name="description"
        id="description"
        value={subject?.description}
      />
      <button>Submit</button>
    </form>
  )
}

export default SubjectsForm
