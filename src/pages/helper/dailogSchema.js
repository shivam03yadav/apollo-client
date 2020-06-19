import * as yup from 'yup';

const dailogSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'minimum 3 character is required'),
  email: yup
    .string()
    .trim()
    .matches(/^[\w.+-]+@gmail\.com$/, 'Email Address is a required field')
    .required(),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must contain 8 character, at least one Uppercase letter, one lowercase and one number',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Must match password'),
});

export default dailogSchema;
