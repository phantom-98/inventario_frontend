import { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../actions/userActions";
import { getDataforDashAction } from "../../actions/helperActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  //  dispatch(getDataforDashAction())

  const loginUser = (user) => dispatch(loginAction(user));

  const submitLogin = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      return;
    }
    const userRes = await loginUser({ email, password });
    if (userRes && userRes.token) {
      location.href = "/dashboard";
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario sin accesos",
      });
    }
  };

  return (
    <CoverLayout title="Bienvenido" description="Ingresa correo y password" image={curved9}>
      <SoftBox component="form" role="form" onSubmit={submitLogin}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>
            Ingresar
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
