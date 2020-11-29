import * as yup from 'yup';

const checkFileSize = file => {
  let valid = true;
  const size = file[0].size / 1024 / 1024;
  if (size > 5) valid = false;
  return valid;
};

const checkFileType = file => {
  let valid = true;
  const type = file[0].type;
  if (!['image/png', 'image/jpeg', 'image/jpg'].includes(type)) valid = false;
  return valid;
};

export const postSchema = yup.object().shape({
  postImage: yup
    .mixed()
    .required('file is required!')
    .test('fileSize', 'max to 5Mb image size!', checkFileSize)
    .test(
      'fileFormat',
      'supported image formats jpeg, jpg, png!',
      checkFileType
    ),
  postDescription: yup
    .string()
    .required('description is required!')
    .max(1000, 'max 1000 characters!'),
});
