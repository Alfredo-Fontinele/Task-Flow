import * as yup from 'yup'

export const UserSchema = {
  create: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
  }),
  update: yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
  }),
}
