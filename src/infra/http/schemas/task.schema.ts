import * as yup from 'yup'

export const TaskSchema = {
  create: yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    user_id: yup.string().required(),
    status: yup.string().required('status must be a todo, doing or done'),
  }),
  update: yup.object().shape({
    title: yup.string().notRequired(),
    description: yup.string().notRequired(),
    user_id: yup.string().required(),
    status: yup.string().notRequired(),
  }),
}
