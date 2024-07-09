import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            id: "A-0001",
            password: "admin123"
        }
    });
    const dispatch = useAppDispatch()

    const [login] = useLoginMutation();
    // console.log('Data ==>', data);
    // console.log('Error ==>', error);

    const onSubmit = async (data: FieldValues) => {
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <label htmlFor="id">ID: </label>
                    <input type="text" id="id" {...register('id')} />
                </div>
                <div className="">
                    <label htmlFor="id">Password: </label>
                    <input type="text" id="password" {...register('password')} />
                </div>
                <Button htmlType="submit">Login</Button>
            </form>
        </div>
    );
};

export default Login;