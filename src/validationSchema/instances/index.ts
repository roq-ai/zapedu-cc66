import * as yup from 'yup';

export const instanceValidationSchema = yup.object().shape({
  name: yup.string().required(),
  whatsapp_number: yup.string().required(),
  webhook_url: yup.string().nullable(),
  qr_code_url: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  agent_id: yup.string().nullable().required(),
});
