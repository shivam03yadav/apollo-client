import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is a required field').min(3),
  sport: yup.string().required('Sport is a required field'),
  cricket: yup.string().when('sport', { is: 'cricket', then: yup.string().required('What you do is a required field') }),
  football: yup.string().when('sport', { is: 'football', then: yup.string().required('What you do is a required field') }),
});

export default schema;
