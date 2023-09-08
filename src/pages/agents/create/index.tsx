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

import { createAgent } from 'apiSdk/agents';
import { agentValidationSchema } from 'validationSchema/agents';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { AgentInterface } from 'interfaces/agent';

function AgentCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AgentInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAgent(values);
      resetForm();
      router.push('/agents');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AgentInterface>({
    initialValues: {
      uid: '',
      name: '',
      system_prompt: '',
      context: '',
      domain: '',
      target: '',
      goal: '',
      extra_prompts: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: agentValidationSchema,
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
              label: 'Agents',
              link: '/agents',
            },
            {
              label: 'Create Agent',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Agent
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.uid}
            label={'Uid'}
            props={{
              name: 'uid',
              placeholder: 'Uid',
              value: formik.values?.uid,
              onChange: formik.handleChange,
            }}
          />

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
            error={formik.errors.system_prompt}
            label={'System Prompt'}
            props={{
              name: 'system_prompt',
              placeholder: 'System Prompt',
              value: formik.values?.system_prompt,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.context}
            label={'Context'}
            props={{
              name: 'context',
              placeholder: 'Context',
              value: formik.values?.context,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.domain}
            label={'Domain'}
            props={{
              name: 'domain',
              placeholder: 'Domain',
              value: formik.values?.domain,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.target}
            label={'Target'}
            props={{
              name: 'target',
              placeholder: 'Target',
              value: formik.values?.target,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.goal}
            label={'Goal'}
            props={{
              name: 'goal',
              placeholder: 'Goal',
              value: formik.values?.goal,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.extra_prompts}
            label={'Extra Prompts'}
            props={{
              name: 'extra_prompts',
              placeholder: 'Extra Prompts',
              value: formik.values?.extra_prompts,
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
              onClick={() => router.push('/agents')}
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
    entity: 'agent',
    operation: AccessOperationEnum.CREATE,
  }),
)(AgentCreatePage);
