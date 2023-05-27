import { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../actions/userActions"
import { useDispatch, useSelector } from "react-redux";


function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();

  const cargando = useSelector(state => state.user.loading)
  const error = useSelector(state => state.user.error)
  

  const loginUser = (user)=> dispatch(loginAction(user))
  
  const submitLogin = e =>{
      e.preventDefault();
      console.log("asd");

      if(email.trim() === '' ||  password.trim() === ''){
          return;
      }
      
      loginUser({
          email,
          password
      });

      navigate("/dashboard");
  }


  return (
    <CoverLayout title="Bienvenido" description="Ingresa correo y password" image={curved9} >
      <SoftBox component="form" role="form" onSubmit={submitLogin}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton type="submit" variant="gradient" color="info" fullWidth>Ingresar</SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
