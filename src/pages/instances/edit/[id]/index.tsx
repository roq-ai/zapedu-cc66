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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getInstanceById, updateInstanceById } from 'apiSdk/instances';
import { instanceValidationSchema } from 'validationSchema/instances';
import { InstanceInterface } from 'interfaces/instance';
import { UserInterface } from 'interfaces/user';
import { AgentInterface } from 'interfaces/agent';
import { getUsers } from 'apiSdk/users';
import { getAgents } from 'apiSdk/agents';

function InstanceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<InstanceInterface>(
    () => (id ? `/instances/${id}` : null),
    () => getInstanceById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: InstanceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateInstanceById(id, values);
      mutate(updated);
      resetForm();
      router.push('/instances');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<InstanceInterface>({
    initialValues: data,
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
              label: 'Update Instance',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Instance
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(InstanceEditPage);
