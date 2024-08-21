import { Button, Col, Flex } from "antd";
import PHForm from "../components/Form/PHForm";
import PHInput from "../components/Form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";


const ChangePassword = () => {
    const navigate = useNavigate()
    const [changePassword] = useChangePasswordMutation();
    const dispatch = useAppDispatch()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const newPasswordData = {
            ...data
        }
        const result = await changePassword(newPasswordData);

        if (result?.data?.success) {
            toast.success(result?.data?.message)
            dispatch(logout());
            navigate('/login')
        }

    }
    return (
        <Flex justify="center" align="middle" style={{ height: "100vh", paddingTop: "15%" }}>
            <Col span={20} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHForm onSubmit={onSubmit}>
                    <PHInput type="text" name="oldPassword" label={"Old Password: "} />
                    <PHInput type="text" name="newPassword" label={"New Password: "} />
                    <Button htmlType="submit">Change Password</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default ChangePassword;