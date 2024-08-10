import * as Yup from 'yup'

export const courseValidation = Yup.object({
  folderName: Yup.string().trim().required('Tên khoá học không được để trống'),
  describe: Yup.string().trim().required('Mô tả khoá học không được để trống'),
  upload: Yup.mixed().required('Vui lòng chọn một ảnh hoặc video'),
})
