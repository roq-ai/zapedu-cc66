import * as yup from 'yup';

export const agentValidationSchema = yup.object().shape({
  uid: yup.string().required(),
  name: yup.string().required(),
  system_prompt: yup.string().nullable(),
  context: yup.string().nullable(),
  domain: yup.string().nullable(),
  target: yup.string().nullable(),
  goal: yup.string().nullable(),
  extra_prompts: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
