export const formSchema = [
    {
        label: "Tipo Cliente",
        value:"type", 
        type:"select", 
        options:[
            {value:"", label:"Seleccione Tipo cliente"},
            {value:true, label:"Cliente"},
            {value:false, label:"Proovedor"},
        ]
    },
    {
        label: "Rut",
        value:"rut", 
        type:"text"
    },
    {
        label: "Razon Social",
        value:"razonsocial", 
        type:"text"
    },
    {
        label: "Giro",
        value:"giro", 
        type:"text"
    },
    {
        label: "Nombre",
        value:"name",
        type:"text"
    },
    {
        label: "Apellido",
        value:"lastName", 
        type:"text"
    },
    {
        label: "Email",
        value:"email", 
        type:"email"
    },
    {
        label: "Telefono",
        value:"phone", 
        type:"text"
    },
    {
        label: "Direccion",
        value:"address", 
        type:"text"
    },
    {
        label: "Ciudad",
        value:"Ciudad", 
        type:"text"
    },
    {
        label: "Comuna",
        value:"comuna", 
        type:"text"
    },
    {
        label: "Nota",
        value:"nota", 
        type:"text"
    },
    {
        label: "Con credito?",
        value:"withCredit", 
        type:"select", 
        options:[
            {value:"", label:"Seleccione Con credito?"},
            {value:true, label:"Si"},
            {value:false, label:"No"},
        ]
    },
    
]