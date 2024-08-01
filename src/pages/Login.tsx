import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/Form/PHForm";
import PHInput from "../components/Form/PHInput";


const Login = () => {
    const navigate = useNavigate();
    // const { register, handleSubmit } = useForm({
    //     defaultValues: {
    //         id: "A-0001",
    //         password: "admin123"
    //     }
    // });

    const dispatch = useAppDispatch()

    const [login] = useLoginMutation();
    // console.log('Data ==>', data);
    // console.log('Error ==>', error);
    const defaultValues = {
        id: "A-0001",
        password: "admin123"
    }

    const onSubmit = async (data: FieldValues) => {
        console.log(data)
        const toastId = toast.loading("Logging Progress!")
        try {
            const userInfo = {
                id: data.id,
                password: data.password
            }
            const res = await login(userInfo).unwrap();
            const token = res.data.accessToken
            const user = verifyToken(token) as TUser
            dispatch(setUser({ user: user, token: token }))
            toast.success("User Login Successfully!", { id: toastId })
            navigate(`/${user.role}/dashboard`)
        } catch (error) {
            toast.error("Something went to Wrong", { id: toastId })
        }
    }
    return (
        <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <PHInput type="text" name="id" label={"ID: "} />
                <PHInput type="text" name="password" label={"Password: "} />
                <Button htmlType="submit">Login</Button>
            </PHForm>
        </Row>
    );
};

export default Login;