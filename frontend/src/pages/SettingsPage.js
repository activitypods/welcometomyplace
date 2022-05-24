import React from 'react';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import { email, required, useAuthProvider, useNotify, useTranslate, } from 'react-admin';
import { SimpleForm, TextInput } from 'react-admin';
import { Container } from '@material-ui/core';
import HeaderTitle from '../layout/HeaderTitle';

const validateEmail = [required(), email('app.validation.email')]
const validateConfirmNewPassword = [(value, { newPassword, confirmNewPassword }) => {
	if (!newPassword) return;

	if (newPassword !== confirmNewPassword) {
		return 'app.validation.confirmNewPassword'
	}
	return;
}];


const SettingsPage = () => {
	const translate = useTranslate();
	const notify = useNotify();
	const { identity } = useCheckAuthenticated();
	const authProvider = useAuthProvider();

	const [formDefaultValue, setFormDefaultValue] = React.useState({
		email: "",
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: ""
	})

	React.useEffect(() => {
		authProvider.getAccountSettings().then((res) => {
			setFormDefaultValue({ ...formDefaultValue, email: res.email })
		});
		// eslint-disable-next-line
	}, [setFormDefaultValue, authProvider])

	if (!identity?.id) return null;

	return (
		<>
			<HeaderTitle>
				{translate('app.page.settings')}
			</HeaderTitle>
			<Container>
				<SimpleForm initialValues={formDefaultValue}
					save={(params) => {
						authProvider.updateAccountSettings({ ...params }).then(() => {
							notify('auth.message.account_settings_updated', 'success');
						}).catch((error) => {
							notify(error.message, 'error');
						})
					}}
				>
					<TextInput source="email" type="email" validate={validateEmail} />
					<TextInput source="currentPassword" type="password" validate={required()} />
					<TextInput source="newPassword" type="password" />
					<TextInput source="confirmNewPassword" type="password" validate={validateConfirmNewPassword} />
				</SimpleForm>

			</Container>
		</>
	)

};


export default SettingsPage;