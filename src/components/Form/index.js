import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";


function FormComponent({schema, onSubmit}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <SoftBox p={2} component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                {
                    schema.map((f, i) => 
                        <Grid key={`formsControl${i}`}  item xs={12} md={6} xl={6}>
                            <SoftBox mb={2}>
                            { f.type == "select" 
                                ?   <>
                                    <select className="form-select"  {...register(f.value, { required: true })}>
                                        { f.options.map((o, k) => <option key={`oo${k}`}  value={o.value}>{o.label}</option> )}
                                    </select>
                                    {errors[`${f.value}`]?.type === 'required' && <small className="alert alert-danger" role="alert">{f.label} es requerido</small>}
                                    </>
                                    
                                :  <>

                                    <TextField InputProps={{ readOnly: f.readOnly}}  fullWidth label={f.label} variant="standard" value={f.value}
                                    {...register(f.value, { required: true })} aria-invalid={errors[`${f.value}`] ? "true" : "false"} 
                                    style={{paddingTop:"0.15rem"}}/>
                                    {errors[`${f.value}`]?.type === 'required' && <small className="alert alert-danger" role="alert">{f.label} es requerido</small>}
                                    </>
                            }
                            </SoftBox>
                        </Grid>
                    )
                }
            </Grid>
            <SoftBox mt={4} mb={1}>
                <SoftButton type="submit" variant="gradient" color="dark" style={{float:"right"}} >Guardar</SoftButton>
            </SoftBox>
        </SoftBox>
    );
}

FormComponent.propTypes = {
    schema: PropTypes.array,
    onSubmit: PropTypes.func,
  };

export default FormComponent;