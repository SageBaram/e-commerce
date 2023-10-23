import * as Yup from "yup";

export const authSignupSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, "Minimum 3 characters")
		.max(30, "Maximum 30 characters")
		.matches(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters are allowed")
		.required("Username is required"),
	password: Yup.string()
		.min(8, "Minimum 8 characters")
		.matches(/[a-z]/, "At least one lowercase char")
		.matches(/[A-Z]/, "At least one uppercase char")
		.matches(
			/[a-zA-Z]+[^a-zA-Z\s]+/,
			"At least 1 number or special char (@,!,#, etc).",
		)
		.required("Password is required"),
	confirmPassword: Yup.string().oneOf(
		[Yup.ref("password"), null],
		"Passwords must match",
	),
	email: Yup.string().email("Invalid email").required("Email is required"),
});

export const authLoginSchema = Yup.object().shape({
	identifier: Yup.string()
		.required("Email or Username is required")
		.test("is-email-or-username", "Invalid email or username", (value) => {
			return (
				Yup.string().email().isValidSync(value) ||
				Yup.string().min(3).isValidSync(value)
			);
		}),
	password: Yup.string().required("Password is required"),
});

export const logoutSchema = Yup.object().shape({
	token: Yup.string().required("Token is required"),
});
