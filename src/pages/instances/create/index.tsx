import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createInstance } from 'apiSdk/instances';
import { instanceValidationSchema } from 'validationSchema/instances';
import { UserInterface } from 'interfaces/user';
import { AgentInterface } from 'interfaces/agent';
import { getUsers } from 'apiSdk/users';
import { getAgents } from 'apiSdk/agents';
import { InstanceInterface } from 'interfaces/instance';

function InstanceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InstanceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInstance(values);
      resetForm();
      router.push('/instances');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InstanceInterface>({
    initialValues: {
      name: '',
      whatsapp_number: '',
      webhook_url: '',
      qr_code_url: '',
      user_id: (router.query.user_id as string) ?? null,
      agent_id: (router.query.agent_id as string) ?? null,
    },
    validationSchema: instanceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Instances',
              link: '/instances',
            },
            {
              label: 'Create Instance',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Instance
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.whatsapp_number}
            label={'Whatsapp Number'}
            props={{
              name: 'whatsapp_number',
              placeholder: 'Whatsapp Number',
              value: formik.values?.whatsapp_number,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.webhook_url}
            label={'Webhook Url'}
            props={{
              name: 'webhook_url',
              placeholder: 'Webhook Url',
              value: formik.values?.webhook_url,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.qr_code_url}
            label={'Qr Code Url'}
            props={{
              name: 'qr_code_url',
              placeholder: 'Qr Code Url',
              value: formik.values?.qr_code_url,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<AgentInterface>
            formik={formik}
            name={'agent_id'}
            label={'Select Agent'}
            placeholder={'Select Agent'}
            fetcher={getAgents}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/instances')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'instance',
    operation: AccessOperationEnum.CREATE,
  }),
)(InstanceCreatePage);
