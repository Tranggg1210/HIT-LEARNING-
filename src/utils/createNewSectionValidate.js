import * as Yup from 'yup'

export const createNewSectionValidate = Yup.object({
  name: Yup.string().trim().required('Tên buổi học không được để trống'),
  description: Yup.string().trim().required('Mô tả buổi học không được để trống'),
})
